const fetch = require("node-fetch");
// import fetch from "node-fetch";
const fs=require("fs");
const {con}=require("../Connection/db")
const URLS = {
  getStationInfoURL:
    "https://cdn.jsdelivr.net/gh/corover/assets@t52/askdisha-bucket/stations.json",
  getStationInfoHeader: {
    accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "if-none-match": 'W/"27266f-MtZDyNWhF6GzMFd+b8yGoNThf8o"',
    "sec-ch-ua":
      '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
  },
};
exports.scrapeStationInfo = async (req, res, next) => {
  try {
    
    const resp2= await fetch("https://cdn.jsdelivr.net/gh/corover/assets@t52/askdisha-bucket/stations.json")
    console.log("hi body:", resp2);
    const data=await resp2.json()
    // fs.writeFile("stationData.json",JSON.stringify(data),
    //     err => {
    //         // Checking for errors 
    //         if (err) throw err;
    //         // Success 
    //         console.log("Done writing");
    //     }); 
  
    const stationData = fs.readFileSync("stationData.json");
    const stData = JSON.parse(stationData);
    // console.log(stData);
    
    stData.forEach(station=>{

      // console.log(station);
      let location={
        "lat":station.latitude,
        "lon":station.longitude
      }
      console.log(location);
      const values= [station.name,station.code,JSON.stringify(station.utterances),station.name_hi,station.district,station.state,station.trainCount,station.latitude,station.longitude,station.address]
      if(station.latitude==""||station.longitude=="")
      {
        return;
      }
      const q1=`INSERT INTO stationObj (stationName,stationCode,utterances,nameHindi,district,state,trainCount,location,address) 
      VALUES (?,?,?,?,?,?,?,?,?,?)`
      
      // con.query(q1, values, (err, result) => {
      //       if (err) {
      //           console.log("There is an error in  pushing the train data to sql", err);
      //           throw err;
      //         }
      //         console.log("Train Data inserted Successfully in Sql", result);
      //       });
          
        })
  
    res.status(200).json({
        message: "Station List",
        data: data,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
