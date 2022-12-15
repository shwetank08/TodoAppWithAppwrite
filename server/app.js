require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const app = express();
const todo = require('./routes/todo');

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use('/',todo)

module.exports = app;