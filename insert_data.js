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
  var sql = "INSERT INTO tb_users (name,email,number,city,message) VALUES ('Test', 'abc@g.com', '9090909090', 'Mumbai', 'Testing')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`1 record inserted`);
  });
});