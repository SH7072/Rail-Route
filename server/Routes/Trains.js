const express = require("express");
// const {}=require("../fetchRequest/trainList");
const { scrapeStationInfo } = require("../fetchRequest/getStationDetails");
const { scrapeTrainList, scrapeTrainRoute } = require("../fetchRequest/trainList");
const { getReq } = require("../fetchRequest/getTrainsBetweenStations");
const router = express.Router();
const { getTrainRoute,getTrainsBetweenStation, getFuzzyStationList, getFuzzyTrainList, getStationInfo } = require("../Controllers/Train");

// scraping apis
router.get("/scrapeStationInfo", scrapeStationInfo);
router.get("/scrapeTrainList", scrapeTrainList);
router.get("/scrapeTrainRoute/:trainNumber", scrapeTrainRoute);
router.get("/getReq", getReq);

// show information  by train number --done
router.get("/getTrainRoute/:trainNumber", getTrainRoute);


// show all trains between station on a particular date
// --> find all the trains which cross any station which is in 60km radius with the source 
//     and destination and display the list of trains filter those on the basis of date  
router.post("/getTrainsBetweenStation",getTrainsBetweenStation); 

// show information by station code --
router.post("/getStationInfo",getStationInfo);

// fuzzy search train name
router.post("/getFuzzyTrainList",getFuzzyTrainList);
// fuzzy search station name
router.post("/getFuzzyStationList",getFuzzyStationList);

//

module.exports = router;

// trainNo, trainStartStation, trainEndStation, trainStationCode, stationNumber, arrival, departure
// id, trainNo, trainStartStationCode,trainEndStationCode,currStationCode,stationNumber,departure,arrival
