
//Local functions

//Insertion sort to sort timestamp array
insertionSort = function(dates){
	//console.log(dates);
    var temp;
    for(var i = 1; i < dates.length; i++){
      var j = i;
      //console.log(dates[(j-1)].time + " > " + dates[j].time + " = " + (dates[(j-1)].time > dates[j].time));
      while( j > 0 && dates[(j-1)].time > dates[j].time){
        //console.log("Before: " + dates[j-1].time + "\t" + dates[j].time);
        temp = dates[j];
        dates[j] = dates[j-1];
        dates[j-1] = temp;
        //console.log("After: " + dates[j-1].time + "\t" + dates[j].time);
        j--;
      }
    }
    //console.log("Results = " + dates[0].time + dates[1].time);
    return dates;
}

//Method that find the difference in time between two dates in milliseconds
dateSubstraction = function(a, b){
	return a.getTime() - b.getTime();
}

//Global functions
var exports = {}

//Seminar object constructor
exports.Seminar = function Seminar(timeStart, timeEnd) {
	this.timeStart = timeStart;
	this.timeEnd = timeEnd;
	/* STATUS CODE
	   0 -> Yet to be done
	   1 -> In time
	   2 -> Skipped
	   3 -> Late by OFFSET
	   4 -> Uncompleted / Left early

	   BOOLEAN VALUE PARDONED
	   If true, then the teacher has added a timestamp
	   Used to pardon students that justified missing a class or similar
	*/
	this.status = 0; //Only used  if pardoned = false
	this.pardoned = false; 
	this.comment = undefined; //Only used  if pardoned = true
	this.id = undefined; //Only used  if pardoned = true
	this.offset = undefined; //Only used  if pardoned = false; calculated in minutes

	this.setInTime = function(){
		this.status = 1;
	}
	this.setSkipped = function(){
		this.status = 2;
	}
	this.setLeftEarly = function(){
		this.status = 4;
	}
	this.setLate = function(offset){
		this.status = 3;
		this.offset = Math.round(offset / 60000);
	}
	this.setPardoned = function(id, comment){
		this.status = 1;
		this.pardoned = true;
		this.comment = comment;
		this.id = id;
	}
}

/* Methods that obtains the timstamps from the database
  And javascript dates are obtained.
  Also, timestamps are split in between the ones refering to normal timestamps and pardoned timestamps */
exports.formatRawTimeStamps = function(timestamps){
	var date, timestamp, date, formatedDate;
	var result = {
		pardoned: [],
		notPardoned: []
	}
  	for (var i = 0; i < timestamps.length; i++){
  		// Creation of a date object
   		timestamp = parseInt(timestamps[i].time * 1000);
   		date = new Date(timestamp);
   		//Clasification between pardoned timestamps and not
   		if(timestamps[i].pardoned && timestamps[i].pardoned == true){
   			formatedDate = {
   				time: date,
   				id: timestamps[i]._id
   			}
   			if(timestamps[i].comment){
   				formatedDate.comment = timestamps[i].comment;
   			}
   			result.pardoned.push(formatedDate);
   		} else {
   			formatedDate = {
   				time: date,
   			}
   			result.notPardoned.push(formatedDate);
   		}
   }
   //In order to then check attendance, timestamps are ordered.
   result.pardoned = insertionSort(result.pardoned);
   result.notPardoned = insertionSort(result.notPardoned);
   return result;
}

/*
  This methods obtains a list of normal timestamps and a subject.
  The timestamps and seminars arrays are ordered in chronological order
  The method will check in both arrays simultaneously, making sure that for
  each seminar there's at least one timestamp and the beginning of the seminar and
  another one at the end.
*/
exports.formatFilteredData = function(timeStamps, subject){
	var i = 0; //index for TimeStamps
	var j = 0; //index for subject.seminars
	const LATE = 3 * 60 * 1000; //Margin of error before the student arrives late to class. 3 minutes
	const SKIPPED = 10 * LATE; //Margin before the student skipped the class. 30 minutes
	const INTIME = -LATE; //Margin before/after the class starts/ends. 3 minutes

	//Recovers both arrays. When at least one is completed, the loop ends
	//Similar to merge sort.
	while(i < timeStamps.length && j < subject.seminars.length){;
		//Time difference between the selected timestamp and seminar start.
		var temp1 = dateSubstraction(timeStamps[i].time, subject.seminars[j].timeStart);

		//Removes timestamps before the seminar started
		if (temp1 < INTIME) {
			i++;
		//Checks if the student has skipped the selected seminar
		} else if(temp1 > SKIPPED) {
			subject.seminars[j].setSkipped();
			j++;
		} else {
			//Reachen this point, the seminar was attended
			var n = i + 1;
			while(n < timeStamps.length){
				//Time difference between the next timestamp and seminar ended
				var temp2 = dateSubstraction(subject.seminars[j].timeEnd, timeStamps[n].time);

				if(temp2 > LATE){
					//Unvalid timestamp (student ticked twice, or too early)
					n++;
				} else if(temp2 < INTIME) {
					//Skipped seminar
					subject.seminars[j].setLeftEarly();
					i = n;
					break;
				} else {
					//Remained at the seminar
					if(temp1 <= LATE){
						//Student arrived in time
						subject.seminars[j].setInTime();
					} else {
						//Student arrived late
						subject.seminars[j].setLate(temp1);
					}
					i = n + 1;
					break;
				}
			}
			/*
			  In the case all timestamps are consumed it means that the student forgot to
			  sign off. In such case, we assume that he left the seminar early.
			*/
			if(n >= timeStamps.length){
				subject.seminars[j].setLeftEarly();
				i = n;
			}
			j++;
		}
	}
	//The remaining seminars that have already transpassed are marked skipped
	//The others are marked as yet to be completed.
	while(j < subject.seminars.length){
		temp1 = dateSubstraction(new Date(), subject.seminars[j].timeStart);
		if(temp1 > SKIPPED){
			subject.seminars[j].setSkipped();
			j++;
		} else {
			break;
		}
	}
	//Remaning timestamps are discarded, as they are unecessary.
	return subject;
}

/*
  This methods obtains a list of pardoned timestamps and a subject.
  The timestamps and seminars arrays are ordered in chronological order.
  This method is called after formatFilteredData.
  The method will check in both arrays simultaneously, making sure that for
  each seminar there is or isn't a pardoned timestamp
*/
exports.formatFilteredData2 = function(timeStamps, subject){
	var i = 0; //for TimeStamps
	var j = 0; //for subject.seminars
	const LATE = 3 * 60 * 1000; //Margin of error before the student arrives late to class. 3 minutes
	const SKIPPED = 10 * LATE; //Margin before the student skipped the class. 30 minutes
	const INTIME = -LATE; //Margin before/after the class starts/ends. 3 minutes

	while(i < timeStamps.length && j < subject.seminars.length){
		//Removes timestamps before the class started
		var temp1 = dateSubstraction(timeStamps[i].time, subject.seminars[j].timeStart);

		if (temp1 < INTIME) {
			i++;
		} else if(temp1 > SKIPPED){
			j++;
		} else {
			//Timestamp refers to selected timestmp.
			subject.seminars[j].setPardoned(timeStamps[i].id, timeStamps[i].comment);
			i++;
			j++;
		}
	}
	return subject;
}

module.exports = exports;