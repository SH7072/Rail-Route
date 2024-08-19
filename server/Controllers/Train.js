const { con } = require("../Connection/db");
const { client } = require("../Connection/elasticSearch");

// db logic
function fetchTrain(trainNumber) {
  const query = `select * from trainInfo WHERE trainNumber = ?`;
  return new Promise((resolve, reject) => {
    con.query(query, trainNumber, async (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
function fetchStationInfo(stationCode) {
  const query = `select * from stationList WHERE stationCode = ?`;
  return new Promise((resolve, reject) => {
    con.query(query, stationCode, async (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
async function fuzzyStation(stationName) {
  let response = await client.search({
    index: 'stationlist',
    body :{
      "query":{
        "bool":{
          "should":[
            {
              "fuzzy":{
                "stationname":{
                  "value":`${stationName}`
                }
              },
            },
            {
                "match":{
                  "stationcode":`${stationName}`
                }
            },  
          ]
        }
      },
      "size" :1000
    }
  });
  return response;
  
}
async function fuzzyTrain(trainName) {

  let response = await client.search({
    index: 'trainlist',
    body :{
      "query":{
        "bool":{
          "should":[
            {
              "fuzzy":{
                "trainname":{
                  "value":`${trainName}`,
                  "fuzziness":2
                }
              },
            },
            {
              "match_phrase":{
                "trainname":`${trainName}`
              }
            }
          ]
        }
      },
      "size" :1000
    }
  });
  return response;
}
async function getStationList(stn)
{
  // 50 km
  let response = await client.search({
    index: 'test2',
    body :{
      "query": {"bool":{
        "must": [
          {
            "geo_distance": {
              "distance": "50km",
              "location": {
                "lat": `${stn.location.latitude}`,
                "lon": `${stn.location.longitude}`
              }
            }
          }
        ]
      }},
      "size": 2000
    }
  })
  return response;
}
async function getTrainList(srcStationList, destStationList, date) {
  // sql join query for src list and dest list intersection and date match

  let srcStnCodeList=[];
  srcStationList.hits.hits.forEach(stn => {
    srcStnCodeList.push(stn._source.stationcode);
  });
  let destStnCodeList = [];
  destStationList.hits.hits.forEach(stn => {
    destStnCodeList.push(stn._source.stationcode);
  });
  console.log(srcStnCodeList, destStnCodeList);
  const srcStnCodes = srcStnCodeList.map(code => `'${code}'`).join(", ");
  const destStnCodes = destStnCodeList.map(code => `'${code}'`).join(", ");

  const query = `select Distinct a.trainNumber, a.trainName, a.stationFrom, a.stationTo, a.arrivalTime, a.departureTime, a.currStationCode from  trainSchedule as a Join trainSchedule as b on a.trainNumber = b.trainNumber where a.currStationCode in (${srcStnCodes}) and b.currStationCode in (${destStnCodes}) `;
  return new Promise((resolve, reject) => {
    con.query(query, async (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

}
// api controllers
exports.getTrainRoute = async (req, res, next) => {
  try {
    const { trainNumber } = req.params;

    const result = await fetchTrain(trainNumber);

    console.log(result[0]);

    res.status(200).json({
      message: "Train Information",
      data: result[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getStationInfo=async (req,res,next)=>{
  const {stationCode} = req.body;
  if(!stationCode)
  {
    throw new Error("This field is required");
  }
  const result = await fetchStationInfo(stationCode);
  console.log(result);
  res.status(200).json({
    message: "station Info ",
    data: result,
  });
}
exports.getTrainsBetweenStation = async (req, res, next) => {
  try {
    const { srcStation, destStation, date } = req.body;
    if (!srcStation || !destStation || !date) {
      throw new Error(" All the fields are required !!! ");
    }
    console.log(srcStation, destStation, date, "-----------------");
    const src = await fetchStationInfo(srcStation);
    const dest = await fetchStationInfo(destStation);
    if(src.length==0 || dest.length==0)
    {
      throw new Error("Invalid station code");
    }
    const srcList=await getStationList(src[0]);
    const destList=await getStationList(dest[0]);
    // console.log(srcList.hits, "-----------------SRC------------------");
    // console.log(destList.hits, "-----------------DEST------------------");
    const result = await getTrainList(srcList, destList, date);
    console.log(result);
    res.status(200).json({
      message: "Train List ",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getFuzzyStationList = async (req, res, next) => {
  const  {stationName}  = req.body;
  if(!stationName)
  {
    throw new Error("This field is required");
  }
  
  const result = await fuzzyStation(stationName);
  const resp=result.hits.hits;
  res.status(200).json({
    message: "station List ",
    data: resp,
  });
};
exports.getFuzzyTrainList=async(req,res,next)=>{
  const {trainName} = req.body;
  if(!trainName)
  {
    throw new Error("This field is required");
  }
  const result = await fuzzyTrain(trainName);
  console.log(result.hits.hits);
  res.status(200).json({
    message: "Train List ",
    data: result,
  });
}
