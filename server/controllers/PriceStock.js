const PriceStock = require("../models/PriceStock");
const User = require("../models/User");

exports.updateCurrPrice = async (req, res) => {
    try {
        //get data from body
        const { symbol , cprice } = req.body;

        const stockDetails = await PriceStock.find({stockSymbol:symbol});
        if (stockDetails.length === 0) {
            // If stock details not found, create a new entry
            await PriceStock.create({
                stockSymbol: symbol,
                current_price: cprice,
            });
        } else {
            // If stock details found, update the current price
            const stockDetail = stockDetails[0];
            stockDetail.current_price = cprice;
            await stockDetail.save();
        }

        return res.status(200).json({
            success: true,
            message: "Symbol price updated",
            toastMessage: "Price Updated ",
        });
            
    } catch (error) {
        console.log("Price updation failed", error);
        return res.status(500).json({
            success: false,
            message: "Price updation failed",
            toastMessage: "Technical Error! ",
            error: error,
        });
    }
};

exports.updatePortfolioAmt=async(req,res)=>{
    try{
        const users=await User.find({},{portfolio:true,portfolioBalance:true}).populate('portfolio');
        
        // Iterate through each user
        for (let user of users) {
            let totalPortfolioValue = 0;

            // Iterate through each stock in the user's portfolio
            for (let stock of user.portfolio) {
                // Fetch the current price of the stock
                const priceData = await PriceStock.findOne({ stockSymbol: stock.stockSymbol });

                if (priceData) {
                    // Calculate the current value of the stock
                    const stockValue = priceData.current_price * stock.quantity;
                    totalPortfolioValue += stockValue;
                } else {
                    console.log(`Price data not found for stock symbol: ${stock.symbol}`);
                }
            }

            // Update the user's portfolio balance
            user.portfolioBalance = totalPortfolioValue;
            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Portfolio values updated successfully',
            toastMessage: 'Portfolio values updated successfully'
        });

    }
    catch(error){
        console.log('Problem occured while updating portfolio values',error);
        return res.status(500).json({
            success:false,
            message:'Portfolio value updation failed',
            toastMessage:'Portfolio value updation failed',
            error:error
        })
    }
}
