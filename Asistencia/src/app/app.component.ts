import { Component } from '@angular/core';
import { Student } from './models/student';
import { Subject } from './models/subject';
import { StudentService } from './services/student.service';
import { TimeStampService } from './services/timestamp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	//Variables that show the components
	private showStudentList: boolean = false;
	private showStudentDetail: boolean = false;
	public loadingStudentDetail: boolean = true;

	// List of students. NOTE: empty it if not allowed to see its contents
	private studentList: Student[];
	//Error message if a student doesn't exist
	public studentErrorDetail: string;
	// Student to see more in detail. NOTE: empty it if not allowed to see its contents
	private studentDetail: Student; 
	// StudentDetail's TimeStamps NOTE: empty it if not allowed to see its contents
	private studentTimeStampsPard;
	private studentTimeStampsNPard;
	// StudentDetail's Filtered TimeStamps TO FUTURE ME: empty it if not allowed to see its contents
	private studentFilteredTimeStamps: Subject;

	constructor(
		private _studentService: StudentService,
		private _timeStampService: TimeStampService
	){
		_studentService.readStudents().subscribe(res => {
             this.studentList = res;
             this.showStudentList = true;
             this.loadingStudentDetail = false;
             //This is only temporal
             this.correctDNI();
        });
	};

	//When it obtains an event from the student list
	//It prepares to show the student detail or an error message
	handleStudentDetail(event){
		this.showStudentDetail = false;
		this.loadingStudentDetail = true;
		switch (typeof event){
			//Error message
			case "string":
				this.studentDetail = null;
				this.studentErrorDetail = event;
				this.loadingStudentDetail = false;
				break;
			//Number to obtain a student from the students array
			case "number":
				this.loadingStudentDetail = true;
				this.studentErrorDetail = null;
				this.studentDetail = this.studentList[event];
				//TimeStamps are now read
				this.loadStudentDetail();
				break;
		}
	}
	//Method in order to load the Details of a given student	
	loadStudentDetail(){
		this._timeStampService.readTimeStampsbyId(this.studentDetail.id).subscribe(res => {
            var temp = JSON.parse(res._body);
			this.studentTimeStampsNPard = temp.notPardoned;
	        this.studentTimeStampsPard = temp.pardoned;
			
			//TimeStamps are now filtered
	        this._timeStampService.readFilteredTimeStampsbyId(this.studentDetail.id).subscribe(res => {
	            this.studentFilteredTimeStamps = res;
	            this.loadingStudentDetail = false;
	            this.showStudentDetail = true;
	        });
	    });
	}

	//Temporal method that takes care of the last D in some DNIs
	correctDNI(){
		for(var i = 0; i < this.studentList.length; i++){
			if(this.studentList[i].dni.charAt(this.studentList[i].dni.length - 1) == "D")
				this.studentList[i].dni = this.studentList[i].dni.substring(0, this.studentList[i].dni.length - 1);
		}
	}
	//Creates a custom timestamp
	handleTimeStampCreation(event){
		this._timeStampService.createTimeStamp(event).subscribe(res => {
				//Studen Details
				this.loadStudentDetail();
		});
	}
	//Modifies a custom timestamp
	handleTimeStampUpdate(event){
		this._timeStampService.updateTimeStamp(event.id, {val: event.val}).subscribe(res => {
				this.loadStudentDetail();
		});
	}
	//Removes a custom timestamp
	handleTimeStampDeletion(event){
		this._timeStampService.deleteTimeStamp(event).subscribe(res => {
			this.loadStudentDetail();
		});
	}
}
