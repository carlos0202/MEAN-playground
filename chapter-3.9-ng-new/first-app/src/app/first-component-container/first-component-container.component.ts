import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/userData';

@Component({
  selector: 'app-first-component-container',
  templateUrl: './first-component-container.component.html',
  styleUrls: ['./first-component-container.component.css']
})
export class FirstComponentContainerComponent implements OnInit {

  dataToChild: string = "Hello From AppComponent";
  receivedData: UserData = null;

  constructor() { }

  ngOnInit(): void {
  }

}
