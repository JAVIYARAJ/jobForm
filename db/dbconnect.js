let mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database:"design"
});


con.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log("Database is connected Successsfully");
});
module.exports = con;
