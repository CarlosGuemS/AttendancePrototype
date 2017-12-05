var Student = require('../models/student');

var exports = {}

//Returns Student Detail using the Mongo Object ID
exports.readStudentById = function(req, res) {
    console.log("Test");
    Student.findOne()
        .where('_id').equals(req.params.id)
        .exec(function(err, student) {
           if(err) return res.status(500).json({error:500, message:"Database error or invalid input data"});

           return res.json(student); 
        });
}

//Returns the list of students.
exports.readAllStudentsWithFilter = function(req, res) {
    var selected_fields = 'id apellidoPaterno apellidoMaterno primerNombre segundoNombre dni email rfid';

    var query = Student.find({}, selected_fields);
    if (req.query.id)
        query=query.where("id").equals(req.query.id);
    if (req.query.apellidoPaterno)
        query=query.where("apellidoPaterno").equals(req.query.apellidoPaterno);
    if (req.query.apellidoMaterno)
        query=query.where("apellidoMaterno").equals(req.query.apellidoMaterno);
    if (req.query.primerNombre)
        query=query.where("primerNombre").equals(req.query.primerNombre);
    if (req.query.segundoNombre)
        query=query.where("segundoNombre").equals(req.query.segundoNombre);
    if (req.query.dni)
        query=query.where("dni").equals(req.query.dni);
    if (req.query.email)
        query=query.where("email").equals(req.query.email);
    if (req.query.rfid)
        query=query.where("rfid").equals(req.query.rfid);

    query.exec(function(err, student) {
        if(err) return res.status(500).json({error:500, message:"Database error or invalid input data"});

        return res.json(student);
    });

}

/* There's no need to create, delete or update students as they are already provided to
   be added into the database */


module.exports = exports;
