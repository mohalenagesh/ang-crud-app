var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'angular-app-2'
  });

  connection.connect(),
  
module.exports = {
    conn : connection,
}