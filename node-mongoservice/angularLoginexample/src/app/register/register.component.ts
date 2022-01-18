import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dataService } from '../service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  userForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    contactno: new FormControl("", [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: dataService
  ) { }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
  }


  registerUser() {
    if (this.userForm.valid) {
      let data = {
        "name": this.userForm.value.username,
        "email": this.userForm.value.email,
        "contactno": this.userForm.value.contactno,
        "password": this.userForm.value.password
      }
      this._dataService.addUser(data).subscribe(
        result => {
          this.userForm.reset();
        }
      )
    }
    else {
      alert("fill all deatils")
    }
  }


}
