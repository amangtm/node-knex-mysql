const knex = require("knex");
require('dotenv').config();
const path= require('path')
module.exports= {
  development:{
    client: "mysql",
    connection: {
      host: process.env.MY_SQL_HOST,
      user: process.env.MY_SQL_USER,
      password: process.env.MY_SQL_PASSWORD,
      database: process.env.MY_SQL_DB_NAME,
    },
    migrations:{
      directory: path.join(__dirname ,'/db/migrations/')
    },
    seeds:{
      directory: path.join(__dirname, '/db/seeds/')
    }
  },
};
// console.log(process.env.MY_SQL_USER);
