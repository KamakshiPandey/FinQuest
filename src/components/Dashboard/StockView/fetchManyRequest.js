import fs from 'fs';
import { symbolMapping } from "./../../../data/Symbol.js";
import fetchCurrentPrice from "./../../../../pyserver/MakeRequest/getStockCurrentPrice.js";
import cron from 'node-cron';

const responseFilePath = 'responseFile.txt';

let isFetchingData = false; // Flag to indicate whether data fetching is in progress
let stopFlag = false; // Flag to indicate whether to stop the function

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchAndSaveData() {
    try {
        if (isFetchingData) {
            console.log('Data fetching is already in progress. Skipping...');
            return; // Exit if data fetching is already in progress
        }
        isFetchingData = true; // Set flag to indicate data fetching is in progress

        let responses = [];

        // Start time of the task
        const startTime = new Date().getTime();

        // Loop through symbolMapping and create promises for each request
        for (let i = 0; i < symbolMapping.length; i++) {
            if (stopFlag) {
                console.log('Stopping fetchAndSaveData function...');
                break; // Exit the loop if stopFlag is true
            }

            const symbol = symbolMapping[i].SYMBOL;
            const name = symbolMapping[i].COMPANY_NAME;
            
            // Log symbol, name, and number
            console.log(`Fetching data for stock ${i + 1}: Symbol: ${symbol}, Name: ${name}`);

            // Make API request for current price
            const response = await fetchCurrentPrice(symbol);
            responses.push(response);
            
            // Random delay of 3-5 seconds
            await delay(getRandomDelay(3, 5) * 1000);

            // Check if it's time to stop
            const currentTime = new Date().getTime();
            if (currentTime - startTime >= 60000) { // Stop after 1 minute
                console.log('Time limit reached. Stopping fetchAndSaveData function...');
                stopFlag = true;
            }
        }

        // Save responses to file
        fs.writeFileSync(responseFilePath, JSON.stringify(responses, null, 2));
        console.log('Responses stored in responseFile.txt');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        isFetchingData = false; // Reset flag after data fetching is completed
    }
}

// Define the time to run the task (3:08 pm to 3:09 pm)
const startTime = '40';
const endTime = '41';
const task = cron.schedule(`${startTime}-${endTime} 15 * * *`, async () => {
    console.log(`Task started at 3:${startTime} pm`);
    await fetchAndSaveData();
    console.log(`Task completed at 3:${endTime} pm`);
    console.log('Stopping the task...');
    task.stop(); // Stop the cron task after completion
});
