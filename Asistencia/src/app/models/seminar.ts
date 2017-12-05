export class Seminar{
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
	constructor(
		public timeStart?: Date,
		public timeEnd?: Date,
		public status?: number, //Not used if pardoned
		public offset?: number, //Not used if pardoned
		public pardoned?: boolean,
		public comment?: String, //Only used if pardoned
		public id?: string //Only used if pardoned
		){};
}