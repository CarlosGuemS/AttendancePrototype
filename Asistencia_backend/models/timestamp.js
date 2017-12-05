var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Timestamp object used to represent each time a student signs in or off.
var TimeStampSchema = new Schema({

	id: //Student id
	{
		type: String,
		required: true
	},
	time:
	{
		type: Number,
		required: true
	},
	pardoned: //Only used if pardoned
	{
		type: Boolean,
		required: false
	},
	comment: //Only used if pardoned
	{
		type: String,
		required: false
	}

},
{
	collection: "Timestamps" //Collection for timestamps only.
});

module.exports = mongoose.model('TimeStamp', TimeStampSchema);
