import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Subject } from "../models/subject";

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TimeStampService{
	// CHANGE SERVER ADRESS HERE
	private url: string = "http://localhost:3000/api";
	constructor(private http: Http) {}

	//Obtains the raw timestamps
	//Student id or simply 'id'
	readTimeStampsbyId(id: string): Observable<any>{
		return this.http.get(this.url + "/timestamp/" + id);
	}

	//Partial timestamp body, the rest is correctly formatted at the backend
	createTimeStamp(body): Observable<any>{
		return this.http.post(this.url + "/timestamp", body).map(x => x.json());
	}

	//Delete timestamp by Mongo id or '_id'
	deleteTimeStamp(id: string): Observable<any>{
		return this.http.delete(this.url + "/timestamp/" + id).map(x => x.json());
	}

	//Delete timestamp by Mongo id or '_id', body only contains new comment.
	updateTimeStamp(id: string, body): Observable<any>{
		return this.http.post(this.url + "/timestamp/" + id, body).map(x => x.json());
	}

	//Obtains the list of classes atttended, missed and pardoned
	readFilteredTimeStampsbyId(id: string): Observable<any>{
		return this.http.get(this.url + "/timedata/" + id).map(x => x.json());
	}
}