var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// This object reprents a student
var StudentSchema = new Schema({

    id: //Student id
    {
        type: String,
        required: true
    },
    apellidoPaterno:
    {
        type: String,
        required: false 
    },
    apellidoMaterno:
    {
        type: String,
        required: false 
    },
    primerNombre:
    {
        type: String,
        required: false 
    },
    segundoNombre:
    {
        type: String,
        required: false
    },
    dni: //Spanish national identification number.
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    rfid: //This parameter is used by the program that the students use to sign in and off
    {
        type: String,
        required: true
    }

},
{
    collection: "Students" //Collection where students are saved
});

module.exports = mongoose.model('Student', StudentSchema);
