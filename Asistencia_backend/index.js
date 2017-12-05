const express = require('express'),
		  app = express(),
		  bodyParser  = require("body-parser"),
    	mongoose = require('mongoose'),
    	cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    return res.status(500).send({error:500, message:"Syntax Error in input data."});
  } else {
    next();
  }
});

// Enable CORS
app.use(cors());

var router = require('./router');
app.use('/api', router);  //http://localhost:3000/api


// Run the server and connect to db Attendance
var db_string = 'mongodb://localhost:27017/Attendance';

mongoose.connect(db_string, function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://0.0.0.0:3000");
  });
});



