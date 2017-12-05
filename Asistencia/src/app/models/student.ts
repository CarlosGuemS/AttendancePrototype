export class Student{
	//Sutdent details
	constructor(
		public _id?: string,
		public id?: string,
		public apellidoPaterno?: string,
		public apellidoMaterno?: string,
		public primerNombre?: string,
		public segundoNombre?: string,
		public dni?: string, //Spanish National Identification Number
		public email?: string,
		public rfid?: string //Id used by anoth program so that the student can 'check in' during class
							 //Handled by another application outside this project
		){};
}