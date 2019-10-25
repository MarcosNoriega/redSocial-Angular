const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//database
require('../db');

//config
app.set('port', process.env.PORT | 3000);


//middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api', require('../routes'));




module.exports = app;