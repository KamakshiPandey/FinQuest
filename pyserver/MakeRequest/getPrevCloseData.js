export default async function fetchPrevCloseData(symbol) {
    try {
        const response = await fetch('http://localhost:5000/prev_close_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symbol: symbol })
        });
 
        if (!response.ok) {
            throw new Error('Failed to fetch previous close data');
        }

        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Re-throw the error to handle it in the calling component
    }
}
