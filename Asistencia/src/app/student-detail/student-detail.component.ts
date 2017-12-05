import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/student';
import { Subject } from '../models/subject';
import { Seminar } from '../models/seminar';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})

//Component that allows to see one Student's information in detail
export class StudentDetailComponent implements OnChanges {

	//Student object
	@Input() selectedStudent: Student = null;
	//Student's timetables
  @Input() selStudentTimeStampsPard;
  @Input() selStudentTimeStampsNPard;
  //Student's Filtered timetables
  @Input() selStudentFilteredTimeStamps: Subject;

  //Set of output signals
  @Output() createTimeStamp: EventEmitter<any> = new EventEmitter();
  @Output() updateTimeStamp: EventEmitter<any> = new EventEmitter();
  @Output() deleteTimeStamp: EventEmitter<any> = new EventEmitter();
    
  constructor(){
  }

  ngOnChanges() {
  }
  // Modifies the comment on the exception
  handleCommentUpdate(event){
    this.updateTimeStamp.emit(event);
  }
  // Handles the creation of an exception
  handleCreateTimeStamp(event){
    //Cambiar timestamp
    var d = new Date();
    d.setUTCFullYear(parseInt(event.substring(0, 4)));
    d.setUTCMonth(parseInt(event.substring(5, 7)) - 1);
    d.setUTCDate(parseInt(event.substring(8, 10)));
    d.setUTCHours(parseInt(event.substring(11, 13)));
    d.setUTCMinutes(parseInt(event.substring(14, 16)));
    d.setUTCSeconds(0);
    d.setUTCMilliseconds(0);

    var temp = {
      id: this.selectedStudent.id,
      time: (d.getTime() / 1000)
    }
    this.createTimeStamp.emit(temp);
  }
  //Handles the delection of a exception
  handleDeleteTimeStamp(event){
    this.deleteTimeStamp.emit(event.id);
  }

}
