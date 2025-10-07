from flask import Flask, request, jsonify,render_template
from nsepython import nse_eq
from datetime import datetime, timedelta
from nselib import capital_market
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


def get_stock_current_price(symbol):
    try:
        stock_data = nse_eq(symbol)
        if 'priceInfo' in stock_data:
            last_price = stock_data['priceInfo'].get('lastPrice', 'N/A')
            change = stock_data['priceInfo'].get('change', 'N/A')
            p_change = stock_data['priceInfo'].get('pChange', 'N/A')
            return {
                'symbol': symbol,
                'lastPrice': last_price,
                'change': change,
                'pChange': p_change
            }
        else:
            return {'error': 'No price information available for the provided symbol'}
    except Exception as e:
        return {'error': str(e)}


def get_stock_details(symbol):
    try:
        stock_data = nse_eq(symbol)
        if stock_data:
            company_name = stock_data['info'].get('companyName', 'N/A')
            prev_close = stock_data['priceInfo'].get('previousClose', 'N/A')
            day_range_high = stock_data['priceInfo'].get('intraDayHighLow', {}).get('max', 'N/A')
            day_range_low = stock_data['priceInfo'].get('intraDayHighLow', {}).get('min', 'N/A')
            year_range_high = stock_data['priceInfo'].get('weekHighLow', {}).get('max', 'N/A')
            year_range_low = stock_data['priceInfo'].get('weekHighLow', {}).get('min', 'N/A')
            market_cap = stock_data['securityInfo'].get('issuedSize', 'N/A')
            average_vol = stock_data['preOpenMarket'].get('totalTradedVolume', 'N/A')
            industry = stock_data['metadata'].get('industry', 'N/A')
            pd_sector_pe = stock_data['metadata'].get('pdSectorPe', 'N/A')
            face_value = stock_data['securityInfo'].get('faceValue', 'N/A')
            issued_size = stock_data['securityInfo'].get('issuedSize', 'N/A')

            return {
                'companyName': company_name,
                'prevClose': prev_close,
                'dayRange': {'high': day_range_high, 'low': day_range_low},
                'yearRange': {'high': year_range_high, 'low': year_range_low},
                'marketCap': market_cap,
                'averageVol': average_vol,
                'industry': industry,
                'pdSectorPe': pd_sector_pe,
                'faceValue': face_value,
                'issuedSize': issued_size
            }
        else:
            return {'error': 'Failed to fetch stock information'}
    except Exception as e:
        return {'error': str(e)}


def get_price_volume_data(symbol):
    try:
        # Calculate from_date as 5 years ago
        from_date = (datetime.now() - timedelta(days=365 * 5)).strftime('%d-%m-%Y')
        # Calculate to_date as today's date
        to_date = datetime.now().strftime('%d-%m-%Y')
        data = capital_market.price_volume_and_deliverable_position_data(symbol=symbol, from_date=from_date,
                                                                         to_date=to_date)
        dates = data['Date']
        prevClose = data['PrevClose']
        result = []
        for date_str, prev_close in zip(dates, prevClose):
            date_obj = datetime.strptime(date_str, '%d-%b-%Y')
            timestamp_seconds = date_obj.timestamp()
            result.append({
                'timestamp': int(timestamp_seconds),
                'prevclose': prev_close
            })
        return {'previous_close': result}
    except Exception as e:
        return {'error': str(e)}


def get_indices():
    try:
        data = capital_market.market_watch_all_indices()
        last = data['last']
        index_symbol = data['indexSymbol']
        result = []
        for sym, lst in zip(index_symbol, last):
            result.append({
                'last': int(lst),
                'indexSymbol': sym
            })
        return result
    except Exception as e:
        return {'error': str(e)}


def filter_indices():
    try:
        # Fetch data from capital_market
        data = capital_market.market_watch_all_indices()
        df = pd.DataFrame(data)

        # List of desired index values
        desired_indexes = ['NIFTY 50', 'NIFTY 100', 'NIFTY 200', 'NIFTY 500', 'NIFTY MIDCAP 50', 'NIFTY SMALLCAP 50',
                           'NIFTY MICROCAP 250', 'NIFTY BANK', 'NIFTY AUTO', 'NIFTY FMCG', 'NIFTY HEALTHCARE INDEX',
                           'NIFTY OIL & GAS']

        # Filter rows with desired index values
        filtered_df = df[df['index'].isin(desired_indexes)]

        # Select desired columns
        desired_columns = ['index', 'indexSymbol', 'last', 'variation', 'percentChange', 'yearHigh', 'yearLow', 'pe',
                           'oneYearAgo', 'oneMonthAgo', 'oneWeekAgo', 'pb', 'dy']
        filtered_df = filtered_df[desired_columns]

        # Convert DataFrame to JSON
        filtered_data = filtered_df.to_dict(orient='records')

        return filtered_data
    except Exception as e:
        return {'error': str(e)}


@app.route('/stock_current_price', methods=['POST'])
def stock_current_price():
    data = request.json
    symbol = data.get('symbol')
    if symbol:
        return jsonify(get_stock_current_price(symbol))
    else:
        return jsonify({'error': 'Symbol parameter is missing in the request'})


@app.route('/stock_details', methods=['POST'])
def stock_details():
    data = request.json
    symbol = data.get('symbol')
    if symbol:
        return jsonify(get_stock_details(symbol))
    else:
        return jsonify({'error': 'Symbol parameter is missing in the request'})


@app.route('/prev_close_data', methods=['POST'])
def prev_close_data():
    data = request.json
    symbol = data.get('symbol')
    if symbol:
        response_data = get_price_volume_data(symbol)
        return jsonify(response_data)
    else:
        return jsonify({'error': 'Missing symbol parameter in the request'})


@app.route('/get_indices', methods=['POST'])
def indices():
    response_data = get_indices()
    return jsonify(response_data)


@app.route('/filtered_indices', methods=['POST'])
def filtered_indices():
    filtered_data = filter_indices()
    return jsonify(filtered_data)

@app.route('/')
def home():
    return render_template('pyhtm.html')


# Gunicorn command to run the app
command = 'gunicorn -b :6000 --reload app:app'

# Remove the app.run() line when deploying with Gunicorn
# if __name__ == '__main__':
#     app.run(port=6000, debug=True)
