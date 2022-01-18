import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable()
export class dataService {
    serviceURL = "http://localhost:6001";
    authHeaders = {
        'Content-Type': 'application/json; charset=utf-8',
        "Authorization": ""
    }
    constructor(
        private httpClient: HttpClient) {

    }

    getUsers() {
        return this.httpClient.get<any[]>(this.serviceURL + "/getUsers");
        // return this.httpClient.get<any[]>(this.serviceURL + "/getdevices",{ headers: new HttpHeaders(this.authHeaders) });
    }

    addUser(data) {
        // this.authHeaders.Authorization = "";
        return this.httpClient.post<any[]>(this.serviceURL + "/insertUser", data);
        // return this.httpClient.post<any[]>(this.serviceURL + "/adddevice", data, { headers: new HttpHeaders(this.authHeaders) });
    }

    updateUser(data) {
        return this.httpClient.post<any[]>(this.serviceURL + "/updateUser", data);
    }
    deleteUser(data) {
        return this.httpClient.post<any[]>(this.serviceURL + "/deleteUser", data);
    }
    findUser(data) {
        return this.httpClient.post<any[]>(this.serviceURL + "/findUser", data);
    }

}