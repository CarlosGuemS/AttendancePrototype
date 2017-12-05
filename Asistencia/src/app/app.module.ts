import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { StudentService } from './services/student.service';
import { TimeStampService } from './services/timestamp.service';

import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { TimestampEditComponent } from './timestamp-edit/timestamp-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent,
    TimestampEditComponent
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentService,
    TimeStampService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }