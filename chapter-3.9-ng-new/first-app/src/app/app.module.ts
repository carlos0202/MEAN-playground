import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { HeaderComponent } from './header/header.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';

import { CourseService } from './course.service';
import { FirstComponentContainerComponent } from './first-component-container/first-component-container.component';

const appRoutes: Routes = [
  { path: 'list', component: TaskListComponent },
  { path: 'create', component: TaskCreateComponent },
  { path: 'first-form', component: FirstComponentContainerComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    FirstFormComponent,
    HeaderComponent,
    TaskListComponent,
    TaskCreateComponent,
    FirstComponentContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
