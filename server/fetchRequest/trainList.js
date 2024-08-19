const fetch = require("node-fetch");
const { con } = require("../Connection/db");
const fs = require("fs");

exports.scrapeTrainList = async (req, res, next) => {
  try {
    const resp = await fetch("https://www.irctc.co.in/eticketing/trainList", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.0",
        bmirak: "webbm",
        "content-language": "en",
        "content-type": "application/x-www-form-urlencoded",
        greq: "1711436916167",
        "sec-ch-ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
      referrer: "https://www.irctc.co.in/nget/booking/check-train-schedule",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    });

    const data = await resp.text();
    const q1 = `INSERT INTO trainList (trainNumber,trainName) VALUES (?,?)
                ON DUPLICATE KEY UPDATE trainName=VALUES(trainName)`;
    const jsData = fs.readFileSync("trainData.json");
    const trainData = JSON.parse(jsData);
    
    trainData.forEach((data) => {
      console.log(data);
      const values = [data.trainNumber, data.trainName];
      // con.query(q1, values, (err, result) => {
      //   if (err) {
      //     console.log(
      //       "There is an error in  pushing the train data to sql",
      //       err
      //     );
      //     throw err;
      //   }
      //   console.log("Train Data inserted Successfully in Sql", result);
      // });
    });

    res.status(200).json({
      message: "Train List",
      data: data,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.scrapeTrainRoute = async (req, res, next) => {
  try {
    const { trainNumber } = req.params;

    const resp = await fetch(
      `https://www.irctc.co.in/eticketing/protected/mapps1/trnscheduleenquiry/${trainNumber}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.0",
          bmirak: "webbm",
          "content-language": "en",
          "content-type": "application/x-www-form-urlencoded",
          greq: Date.now(),
          "sec-ch-ua":
            '"Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          Referer: "https://www.irctc.co.in/nget/booking/check-train-schedule",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    const dt = await resp.json();
    // console.log(dt);
    if (!resp) {
      const error = new Error("Train Not Found");
      throw error;
    }
    const q2 = `INSERT INTO trainInfo ( trainNumber, trainName, stationFrom, stationTo, trainRunsOnMon, trainRunsOnTue, trainRunsOnWed, trainRunsOnThu, trainRunsOnFri, trainRunsOnSat, trainRunsOnSun, stationList) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    const q1 = `INSERT INTO trainSchedule (trainNumber,trainName,stationFrom,stationTo,trainRunsOnMon,trainRunsOnTue,trainRunsOnWed,trainRunsOnThu,trainRunsOnFri,trainRunsOnSat,trainRunsOnSun,currStationCode,currStationName,arrivalTime,departureTime,distance,dayCount,stnSerialNumber) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const obj = [
      dt.trainNumber,
      dt.trainName,
      dt.stationFrom,
      dt.stationTo,
      dt.trainRunsOnMon,
      dt.trainRunsOnTue,
      dt.trainRunsOnWed,
      dt.trainRunsOnThu,
      dt.trainRunsOnFri,
      dt.trainRunsOnSat,
      dt.trainRunsOnSun,
      JSON.stringify(dt.stationList),
    ];
    console.log(obj);
    con.query(q2, obj, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res);
      }
    });
    // dt.stationList.forEach((stn) => {
    //   console.log(stn);
    //   const values = [
    //     dt.trainNumber,
    //     dt.trainName,
    //     dt.stationFrom,
    //     dt.stationTo,
    //     dt.trainRunsOnMon,
    //     dt.trainRunsOnTue,
    //     dt.trainRunsOnWed,
    //     dt.trainRunsOnThu,
    //     dt.trainRunsOnFri,
    //     dt.trainRunsOnSat,
    //     dt.trainRunsOnSun,
    //     stn.stationCode,
    //     stn.stationName,
    //     stn.arrivalTime === "--" ? null : stn.arrivalTime,
    //     stn.departureTime === "--" ? null : stn.departureTime,
    //     stn.distance,
    //     stn.dayCount,
    //     stn.stnSerialNumber,
    //   ];
    // con.query(q1, values, (err, result) => {
    //   if (err) {
    //     console.log(
    //       "There is an error in  pushing the train data to sql",
    //       err
    //     );
    //     throw err;
    //   }
    //   console.log("Train Data inserted Successfully in Sql", result);
    // });
    // });
    res.status(200).json({
      message: "Station List",
      data: dt,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
