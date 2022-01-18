import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dataService } from '../service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: dataService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.valid) {
      let data = {
        "name": this.loginForm.value.username,
        "password": this.loginForm.value.password,
      }
      this._dataService.findUser(data).subscribe(
        result => {
          if (result && result.length) {
            this.router.navigate(['/users']);
            localStorage.setItem("user", JSON.stringify(result[0]))
          }
          else {
            alert("invalid username/password")
          }

        }
      )
    }
    else {
      alert("fill all deatils")
    }
  }
}