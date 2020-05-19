import { Injectable } from '@angular/core';
import { Course } from './models/course';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'assets/data/courses.json';
   }

  getCourses() : Observable<Array<Course>> {
    return this.http
      .get<Array<Course>>(this.url)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message);
  }
}
