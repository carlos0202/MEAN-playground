import { Injectable } from '@angular/core';
import { Course } from './models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  getCourses() : Array<Course> {
    return [
      {'id': 1, 'name': 'MEAN Stack', 'duration': '7 Weeks'},
      {'id': 2, 'name': 'MERN Stack', 'duration': '5 Weeks'},
      {'id': 3, 'name': 'LEAN Stack', 'duration': '10 Weeks'},
    ];
  }
}
