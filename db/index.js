const mysql = require('mysql');
const {MYSQL_CONFIG} = require('../config/db');

function exec(sql,data) {
   return new Promise(function(resolve,reject){
      let connect = mysql.createConnection(MYSQL_CONFIG);
      connect.connect();
      connect.query(sql,data,(err,result,fields)=>{
         if(err) reject(err);
         resolve(result);
         connect.end();
      });

   });

}
module.exports = {
   exec,
   escape:mysql.escape
};