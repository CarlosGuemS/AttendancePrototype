var timestamp = require("./timestamp.functions");
var Seminar = timestamp.Seminar;
var exports = {};

/* Method that creates the subject object (with lesson in order)
   The subject is hardcoded as such since only one subject is considered for the prototype
   Later one the project must be updated to support for more subjects, and to create the
   subject object automatically, for example using iCal files.
*/
exports.createSubject = function() {
	var listDates = [];
	for(i = 3; i < 25; i += 7) {
		listDates.push(new Seminar(
			new Date(2017, 9, i+1, 16, 30, 0, 0),
			new Date(2017, 9, i+1, 18, 0, 0, 0)
		));
		listDates.push(new Seminar(
			new Date(2017, 9, i+2, 15, 0, 0, 0),
			new Date(2017, 9, i+2, 16, 30, 0, 0)
		));
	}
	listDates.push(new Seminar(
		new Date(2017, 10, 1, 16, 30, 0, 0),
		new Date(2017, 10, 1, 18, 0, 0, 0)
	));
	listDates.push(new Seminar(
		new Date(2017, 10, 2, 15, 0, 0, 0),
		new Date(2017, 10, 2, 16, 30, 0, 0)
	));
	for(i = 7; i < 29; i += 7) {
		listDates.push(new Seminar(
			new Date(2017, 10, i+1, 16, 30, 0, 0),
			new Date(2017, 10, i+1, 18, 0, 0, 0)
		));
		listDates.push(new Seminar(
			new Date(2017, 10, i+2, 15, 0, 0, 0),
			new Date(2017, 10, i+2, 16, 30, 0, 0)
		));
	}
	for(i = 5; i < 20; i += 7) {
		listDates.push(new Seminar(
			new Date(2017, 11, i+1, 16, 30, 0, 0),
			new Date(2017, 11, i+1, 18, 0, 0, 0)
		));
		listDates.push(new Seminar(
			new Date(2017, 11, i+2, 15, 0, 0, 0),
			new Date(2017, 11, i+2, 16, 30, 0, 0)
		));
	}
	return {name: "SUBJECT NAME", seminars: listDates};
}

//Method used to create a set of timestamps for debugging purposes only
exports.testTimeStamp = function() {
	var listDates = [];
	for(i = 3; i < 25; i += 7) {
		listDates.push(new Date(2017, 9, i+1, 16, 32, 0, 0));
		listDates.push(new Date(2017, 9, i+1, 17, 58, 0, 0));
		listDates.push(new Date(2017, 9, i+2, 15, 2, 0, 0));
		listDates.push(new Date(2017, 9, i+2, 16, 28, 0, 0));
	}
	listDates.push(new Date(2017, 10, 1, 16, 32, 0, 0));
	listDates.push(new Date(2017, 10, 2, 15, 15, 0, 0));
	for(i = 7; i < 29; i += 7) {
		listDates.push(new Date(2017, 10, i+1, 16, 32, 0, 0));
		listDates.push(new Date(2017, 10, i+1, 18, 0, 30, 0));
		listDates.push(new Date(2017, 10, i+2, 15, 2, 0, 0));
		listDates.push(new Date(2017, 10, i+2, 16, 28, 0, 0));
	}
	for(i = 5; i < 20; i += 7) {
		listDates.push(new Date(2017, 11, i+1, 16, 32, 0, 0));
		listDates.push(new Date(2017, 11, i+1, 17, 58, 0, 0));
		listDates.push(new Date(2017, 11, i+2, 15, 20, 0, 0));
		listDates.push(new Date(2017, 11, i+2, 16, 28, 0, 0));
	}
	return listDates;
}

module.exports = exports;