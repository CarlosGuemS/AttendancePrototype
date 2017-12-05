import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { Seminar } from "../models/seminar";

@Component({
  selector: 'app-timestamp-edit',
  templateUrl: './timestamp-edit.component.html'
})
export class TimestampEditComponent implements OnChanges {

	//Original value
	@Input() originalContent: Seminar;

	//FormBuilder
	private input: FormGroup = null;

	//Output
	@Output() result: EventEmitter<any> = new EventEmitter();

  constructor(
        private _fb: FormBuilder
    ) { 
  		this.input = this._fb.group({
	            value: ['']
	        });
  }

  ngOnChanges(changes: any) {
  	this.input = this._fb.group({
            value: [this.originalContent.comment]
        });
  }
  //Will output the value inside the form when enter is pressed
  outputData(event){
  	if(event.keyCode == 13) {
      var temp = {
        val: this.input.value.value,
        id: this.originalContent.id
      }
  		this.result.emit(temp);
  	}
  }

}
