# AttendancePrototype
MEAN stack project used to measure the atendance of students into a given subject.
The project is divided into the backend, which uses Node, Express and Mongoose; the frontend, which uses Angular; and the database which uses MongoDB.

## Goal
This project is part of a bigger project to be used in class to measure assistance.

The students would sign in and off when entering and exiting class through RFID. Each student had its own tag, included in the university's ID, and the in the class there was reader that would send an entry to the database of the student's id and a timestamp. All of this code was done in a separate program, and it is not needed to understand this one.

Once the values are stored in a database, this project provides a user-interface to read data from the database, filter it and show the attendance data of specific students. As is stands, the project is implemented to read the attendance of only one subject. The subject is divided into seminars, each of which a student can arrive on time, late, left the seminar early or entirely skipped the seminar.

__Note that the data related to the students and the subject is not public. As such, this code has been modified to remove such information, and instead has been replaced with generic data.__

## Download and installation

You must have node, mongoDB and angular installed. By default, the project uses a database called 'Attendance' and the collections 'Students' and 'Timestamps'. One collection stores information about the students, and the other collections stores all the timestamps.

To install simply:
- Download the files as given
- Execute `npm install` inside each directory
- Use `node index.js` to run the backend and then `ng serve` to run the frontend
- Optionally, you can download some sample values into your database. Inside the same directory the files are located, use the command `mongoimport` to import _students.json_ into the 'Students' collection and _timestamps.json_ into the 'Timestamps' collection.

## Quick overview
Most of the code is heavily commented. This description summarizes the structure of the entire program.

### Backend
The methods inside the files within the directory 'controllers' are the ones which handle the HTTP requests. To function, they call methods from the 'functions' directory. The 'models' directory conatains the mongoose schemas used to read and write data into database.

### Frontend
- app component: backbone of the front end, tying up the other components that make up the project. It is the only class which injects the classes used to communicate with the backend, for simplicity.
- services directory: contains the TimeStampService and the StudentService classes, the ones that create HTTP messages and handles their response.
- student-list component: Shows a table with all the students stored in the database, and allows to select one to see in more detail.
- student-detail component: From the student selected in the student-list component, it displays all student information and shows the schedule of the subject. It also shows if the student arrived on time, late, left the seminar early or skipped it.
