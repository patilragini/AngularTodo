import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {UserDetails} from '../_models/index';
//import {header.interceptor} from '../_helpers/index'

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public  loginUserUrl="http://localhost:8080/ToDo/login";

   constructor(private http: HttpClient) { }


    login(user: UserDetails) {
        //const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'

        // var UserDetails{};
        //  UserDetails.email=email;
        //   UserDetails.password=password;
        console.log("in auth service"+user);
         return this.http.post(this.loginUserUrl, user);

    }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    // }
}
