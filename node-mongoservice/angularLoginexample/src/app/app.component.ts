import { Component } from '@angular/core';
import { dataService } from './service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularhttp';
  constructor(private _dataService: dataService) {
  }
}
