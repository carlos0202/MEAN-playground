import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { FormsModule } from '@angular/forms';
import { CourseService } from './course.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FirstFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
