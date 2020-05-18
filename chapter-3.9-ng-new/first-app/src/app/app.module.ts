import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { FormsModule } from '@angular/forms';
import { CourseService } from './course.service';

@NgModule({
  declarations: [
    AppComponent,
    FirstFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
