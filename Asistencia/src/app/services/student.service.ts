import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Student } from '../models/student';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StudentService{
	// CHANGE SERVER ADRESS HERE
	private url: string = "http://localhost:3000/api";
	constructor(private http: Http) {}

	//Reads all students
	readStudents(): Observable<any> {
		return this.http.get(this.url + '/student').map(x => x.json());
	}
	
	//Mongo id or '_id'
	readStudentById(id: string): Observable<any>{
		return this.http.get(this.url + "/student/" + id).map(x => x.json());
	}
}
