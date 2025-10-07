export default async function fetchFilteredIndices() {
    try {
        const response = await fetch('http://localhost:5000/filtered_indices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // Passing an empty object as the request body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log(data);
        return data; // Return the fetched data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}