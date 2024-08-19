const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const PORT = 7873;
const app = express();
const trainRoutes = require("./Routes/Trains");
const { con } = require("./Connection/db");
// const {connect }=require("./convertToJSON");

// var apm = require('elastic-apm-node').start({
//   serviceName: 'my-service-name',

//   secretToken: '',

//   serverUrl: 'http://10.1.4.171:8200',

//   environment: 'my-environment'
// })
const { client } = require("./Connection/elasticSearch");
// db connection
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!! to SQL");
});
// elastic search connection
client
  .ping()
  .then(() => console.log("Connect to Elastic Search Successful"))
  .catch((err) => {
    throw new Error(err);
  });

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);
async function fuzzyStation(stationName) {
  const searchQuery = {
    index: "test2",
    body: {
      query: {
        "body" : {
          "size" :10
        }
      }
    }
  };

}
    

// console.log(response)
// const result=fuzzyStation("bpl");
// console.log(result);
//routes
app.use("/trains", trainRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello from Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening to server on Port ${PORT}`);
});
