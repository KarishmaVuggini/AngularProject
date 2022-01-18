import { Component, OnInit } from '@angular/core';
import { dataService } from '../service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'angularhttp';
  userList = [];
  deviceId = "0"

  userForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    contactno: new FormControl("", [Validators.required])
  });


  constructor(private _dataService: dataService, private router: Router,) {

    this.getUserList();

  }
  ngOnInit(): void {

  }

  addDevice() {
    if (this.userForm.valid) {
      let data = {
        "username": this.userForm.value.username,
        "email": this.userForm.value.email,
        "contactno": this.userForm.value.contactno
      }
      this._dataService.addUser(data).subscribe(
        result => {
          this.deviceId = "0"
          this.userForm.reset();
          this.getUserList();

        }
      )
    }
    else {
      alert("fill all deatils")
    }


  }

  editDevice(device) {
    debugger
    this.deviceId = device._id;
    // let data = {
    //   "username": this.userForm.value.username,
    //   "email": this.userForm.value.email,
    //   "contactNo": this.userForm.value.contactNo
    // }
    this.userForm.patchValue({
      "username": device.username,
      "email": device.email,
      "contactno": device.contactno
    })
  }

  updateDevice() {
    let data = {
      "id": this.deviceId,
      "name": this.userForm.value.username,
      "email": this.userForm.value.email,
      "contactno": this.userForm.value.contactNo
    }
    this._dataService.updateUser(data).subscribe(
      result => {
        this.userForm.reset();
        this.deviceId = "0";
        this.getUserList();
      }
    )
  }

  deleteDevice(device) {
    let data = {
      "id": device._id
    }
    this._dataService.deleteUser(data).subscribe(
      result => {
        this.getUserList();
      }
    )
  }

  getUserList() {
    this._dataService.getUsers().subscribe(result => {
      console.log(result)
      this.userList = result
    })
  }

  logout() {
    localStorage.removeItem('user');
    // this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
