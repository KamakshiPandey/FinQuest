export default async function fetchCurrentPrice(symbol) {
    try {
        const response = await fetch('http://localhost:3000/stock_current_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symbol: symbol })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
}
