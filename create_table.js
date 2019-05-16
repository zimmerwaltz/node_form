var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin@123#",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: "db_users"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
    
var sql = "CREATE TABLE tb_users (id INT(11) AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), number VARCHAR(255), city VARCHAR(255), message VARCHAR(255), PRIMARY KEY(id))";
    
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});