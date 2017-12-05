import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Student } from '../models/student';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

//Component which shows a list of students and allows one student to be selected to be seen in detail.
export class StudentListComponent implements OnInit {
	//An input in the webpage in order to search for a Student using an ID
	private input: FormGroup = null;

	//Student List Data
	@Input() students: Student[];

	//Sends either an error message of an index to obtain more details of a student
	@Output() studentDetail: EventEmitter<any> = new EventEmitter();

	//Settings for the ng2 Smart Table, imported component
	settings = {
      actions: {
          add: false,
          edit: false,
          delete: false
      },
      columns: {
        id: {
          title: 'Student ID',
          editable: false
        },
        primerNombre: {
          title: 'Primer Nombre',
          editable: false
        },
        segundoNombre: {
          title: 'Segundo Nombre',
          editable: false
        },
        apellidoPaterno: {
            title: "Apellido Paterno",
          editable: false
        },
        apellidoMaterno: {
            title: "Apellido Materno",
          editable: false
        }
      }
    };

    constructor(
        private _fb: FormBuilder
    ) {
    	this.input = this._fb.group({
            id: ['', Validators.required] //Student ID
        });
    }

  ngOnInit() {
  	
  }

  //Gets input from the Groupform and searches if a student with the given id exists
  //If it does, returns the index in the array
  //If it doesn't, returns an error message

  //This method is used when using the search block
  selectStudent(){
  	this.emitStudent(this.input.value.id.trim());
  }
  //This method is used when clicking directly at the table
  secondarySelectStudent(event){
    this.emitStudent(event.data.id);
  }
  //This method is the one that actually handles the student selection
  emitStudent(id):void{
    var i
    for(i = 0; i < this.students.length; i++){
        if (this.students[i].id == id){
            break;
        }
    }
    if (i >= this.students.length) {
        this.studentDetail.emit("Error, no student found with ID: " + id);
        return null;
    }
    else {
      /*
        Since the two student list arrays are equal on both the app.component and the sutdent-list.component
        It returns the position of the array where the selected student is found.
      */
      this.studentDetail.emit(i);
    }
  }
}
