require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  //database: process.env.DB_DATABASE,
  database:"bloodshare",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// console.log(process.env.DB_PASSWORD);


module.exports = pool;
