var app = require('express');

var studentsController = require('./controllers/student.controller');
var timestampsController = require("./controllers/timestamp.controller");

var router = app.Router();

router.route('/student')
    .get(studentsController.readAllStudentsWithFilter)
router.route('/student/:id')
    .get(studentsController.readStudentById);

router.route('/timestamp/:id')
	.get(timestampsController.readTimeStampsByStudentId)
    .post(timestampsController.updateTimeStampById)
    .delete(timestampsController.deleteTimeStampById);
    
router.route('/timestamp')
    .post(timestampsController.createTimeStamp);

router.route('/timedata/:id')
	.get(timestampsController.obtainFilteredData);

router.all('*', function(req, res){
    return res.status(404).json({error: 404, message:"Not Found"});
});

module.exports = router;