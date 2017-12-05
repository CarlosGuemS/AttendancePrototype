import { Seminar } from "./seminar";
export class Subject{
	//Represents a subject
	constructor(
		public name?: string,
		public seminars?: Seminar[]
		){};
}