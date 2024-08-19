const fs = require("fs");
const jsData = fs.readFileSync("trainData.json");
const axios = require("axios");
const request = require("request");
const { resolve } = require("path");
async function delay(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, number);
  });
}
async function makeHttpRequest(number) {
  try {
    // Make the HTTP request
    const response = await axios.get(
      `http://localhost:7873/trains/getTrainRoute/${number}`
    );

    // Process the response
    console.log(`Response for number ${number}:`, response.data);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error(`Error for number ${number}:`, error);
    throw error;
  }
}

async function getAllTrainsData() {
  const trainData = JSON.parse(jsData);
  for (let i = 0; i < trainData.length; i++) {
    try {
      const trainNumber = trainData[i].trainNumber;
      const resp = await makeHttpRequest(trainNumber);
      fs.appendFile("completedTrains.json", `${trainNumber}\n`, 'utf8', (err) => {
        if (err) {
            // Handle error appending file
            console.error('Error appending file:', err);
            return;
        }
        console.log('Data appended to file successfully.');
    });
      console.log(`For train number ${trainNumber} this is the resp:`, resp);

      await delay(Math.ceil(Math.random() * 5000));
    } catch (error) {
      console.error(`Error in Processing train ${error}`);
    }
  }
  
}
getAllTrainsData();
