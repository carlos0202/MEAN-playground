import { Component } from '@angular/core';

interface userData {
  name: string;
  status: string;
  displayPassword: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'first-app';
  dataToChild: string = "Hello From AppComponent";
  receivedData: userData = null;
}
