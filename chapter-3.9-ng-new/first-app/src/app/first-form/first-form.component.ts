import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit {

  status: string;
  name: string;
  user: string;
  displayPassword: boolean;
  lightStatus: string;
  names: string;
  courses: Array<Course>;

  @Input() dataFromParent: string;

  @Output() childEvent = new EventEmitter();

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.setDefaultForm();
    this.courses = this.courseService.getCourses();
    console.log(this.courses);
  }

  checkNSendForm(email: string): void {
    console.log(email);
    this.status = "Starting to validate form to be submitted";
  }

  setDefaultForm(): void {
    this.name = "Enter a name...";
    this.status = "Form not submitted yet!!";
    this.displayPassword = false;
    this.lightStatus = "GREEN";
    this.names = "Carl,Peter,John";
  }

  onSendDataToParent(): void {
    this.childEvent.emit(
      {
        name: this.name,
        status: this.status,
        displayPassword: this.displayPassword
      }
    );
  }
}
