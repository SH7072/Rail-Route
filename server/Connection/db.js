var mysql = require('mysql2');

 const con = mysql.createConnection({
  host: "192.168.0.107",
  user: "root",
  password: "my_secret_password",
  port: 6033,
  database : 'app_db'

});



module.exports = {con}