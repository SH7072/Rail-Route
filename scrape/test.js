const fs=require("fs");
const jsData = fs.readFileSync("trainData.json");
const axios=require("axios");
// const request=require("request")
async function makeHttpRequest(number) {
    try {
        // Make the HTTP request
        const response = await axios.get(`http://10.1.4.175:7873/trains/getTrainRoute/${number}`);

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

async function getAllTrainsData(){
    
    const trainData = JSON.parse(jsData);
    await Promise.all(trainData.map(async (data)=>{
        try {
            const trainNumber=data.trainNumber;

            const resp=await makeHttpRequest(trainNumber);
            console.log(`For train number ${trainNumber} this is the resp:`,resp);
        } catch (error) {
            console.error(`Error in Processing train ${error}`);
        }
    }))
    // await trainData.forEach(async (data) => {
    //     const trainNumber = await data.trainNumber;
    //     // const trainNumber=94219
    //     // setTimeout(async()=>{
    //         console.log(trainNumber);

    // })
}
getAllTrainsData();