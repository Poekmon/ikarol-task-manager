// server for Task Manager application
// modules for server
// express for routing
var express=require('express');
var app=express();
// mongoose for working with MongoDB
var mongoose =require('mongoose');
// path for ability to get path
var path=require('path');
// connecting to MongoDB server
mongoose.connect('localhost:27017/tasks');
// getting model
require('./db.model.js');
var Task=mongoose.model('Tasks');
// task collection
var taskCol=mongoose.connection.collection('task');
// bodyParser for getting body attributes
var bodyParser=require('body-parser');
// getting static files
app.use(express.static(path.join(__dirname, '/../client/app/')));
app.use(express.static(path.join(__dirname, '/../client/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// starting server on 8080 port
app.listen(8080);
//load routes
app.use(require('./routes'));
// display this when server starts
console.log('listening');
