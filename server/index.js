// setting up express server

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import dbConfig from './config/dbConfig.js';  // necessary to import

// importing routes

import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

// loading data from .env

dotenv.config();

// creating an express app

const app = express();

// parsing incoming request data - Middleware Plugin

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());

// setting up routes

app.use("/server/auth", authRoute);

// starting the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
})   