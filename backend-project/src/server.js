const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();

const { testConnection } = require("./config/db");
const authRouter = require('./router/auth');
const CarRouter = require('./router/car');
const ServicesRouter = require('./router/Servises');
const ServiceRecord = require('./router/SerciseRecord');


app.use(express.json());
app.use(cors());


app.use('/api',authRouter);
app.use('/api',CarRouter);
app.use('/api', ServicesRouter);
app.use('/api',ServiceRecord);

// test DB before starting server
testConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})