require('dotenv').config();//For make our .env available
const {Pool} = require('pg') ;//To require the pg module in order to communicate with our database

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
}); //Connect to our database

module.exports = {pool}; 