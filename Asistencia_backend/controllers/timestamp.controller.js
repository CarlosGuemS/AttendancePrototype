var TimeStamp = require("../models/timestamp");
const TimeStampFunctions = require("../functions/timestamp.functions");
const CreateFunctions = require("../functions/create.functions");
var exports = {}

//local function for date management

//function used for debugging
/*exports.readAllTimeStamps = function(req, res){
	TimeStamp.find()
		.select("time -_id")
		.exec(function (err, timestamps){
			return res.json(timestamps);
		});
}*/

//Reads a student id, returns raw timestamps
exports.readTimeStampsByStudentId = function(req, res){
	TimeStamp.find()
		.where('id').equals(req.params.id)
		//.select("time -_id")
		.exec(function(err, timestamps){
			if(err) return res.status(500).json({error:500, message:"Database error or invalid input data"});
			var dates = TimeStampFunctions.formatRawTimeStamps(timestamps);

           	return res.json(dates);
		});
}

/* Reads a student id, returns a subject object.
   The subject is made of classes that the student could've attended, missed, skipped
   (arriving but leaving before the class ended) or arrived late.
   The teacher also can to add 'pardons' or exceptions. These are timestamps created by
   the teacher, so it can handle unexpected scenarios (ex: justified missed class)
*/
exports.obtainFilteredData =  function(req, res){
	TimeStamp.find()
		.where('id').equals(req.params.id)
		.exec(function(err, timestamps){
			if(err) return res.status(500).json({error:500, message:"Database error or invalid input data"});

			var timeStamps = TimeStampFunctions.formatRawTimeStamps(timestamps);

      //Subject is created
			var subject = CreateFunctions.createSubject();

      //This method handles normal timestamps, created when the students sign in
			subject = TimeStampFunctions.formatFilteredData(timeStamps.notPardoned, subject);
      //This method handles pardons, timestamps created by teachers
			subject = TimeStampFunctions.formatFilteredData2(timeStamps.pardoned, subject);
			return res.json(subject);
		});
}

/*
  Creates a 'pardon' timestamp.
  Recieves a partial timestamp, and it gets completed into a 'pardoned' timestamp
*/
exports.createTimeStamp = function(req, res) {
    var body = req.body;
    var timeStamp;
    try {
        body.pardoned = true;
        body.comment = "";
        timeStamp = new TimeStamp(body); //timestamp created
    } catch(err) {
        return res.status(500).json({error:500, message:"Invalid input data"});
    }

    timeStamp.save(function(err) {
        if(err) return res.status(500).json({error:500, message:"Database error or invalid input data"});

        res.json({ok:200, message:" Create Operation performed"});
    });
}

/*
  Changes the comment value of a 'pardoned' timestamp. Timestamps are identified by the Mongo Object ID or '_id'
  The only value in the body of the request is the new comment.
*/
exports.updateTimeStampById = function(req, res) {
    TimeStamp.findOne()
        .where('_id').equals(req.params.id)
        .exec(function(err, timeStamp) {
           if(err) return res.status(500).json({error:500, message:"Database error or invalid input data"});
           timeStamp.comment = req.body.val;
           timeStamp.save(function(err) {
                if(err) return res.status(500).json({error:500, message:"Database error or invalid input data"});
                res.json({ok:200, message:" Update Operation performed"});
           });
        });
}

// Deletes a 'pardoned' timestamp
exports.deleteTimeStampById = function(req, res) {
    TimeStamp.findOne()
    .where('_id').equals(req.params.id)
    .remove()
    .exec(function(err, timeStamp) {
       if(err) return res.status(404).json({error:404, message:"TimeStamp data not found"});
       return res.json({ok:200, message:"Data TimeStamp removed."}); 
    });
}

module.exports = exports;