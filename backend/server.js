const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001; 
const app = express();
const router = express.Router();

//MongoDb

const databaseRoute =
//add our MongoDB in here 

mongoose.connect(databaseRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('I am connected!'));

db.on('error', console.error.bind(console, 'not connected :( -->'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

//add in routes & methods here


app.use("/api", router);

app.listen(API_PORT, () => console.log('Im up on port ${API_PORT}'));
