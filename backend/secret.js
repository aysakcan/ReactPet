const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user :  'root',
    password :  'asd123',
    database :  'onlinestoredb',
});
module.exports = connection;