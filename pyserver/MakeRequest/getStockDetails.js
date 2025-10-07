// getStockDetails.js
export default async function fetchStockDetails(symbol) {
    try {
        const response = await fetch('http://localhost:3000/stock_details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symbol: symbol })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch stock details');
        }

        // Parse JSON data and return it
        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Re-throw the error to handle it in the calling component
    }
}


