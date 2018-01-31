import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { UserDetails } from '../_models/index';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class UserService {
  //  public  registerUserUrl="http://localhost:8082/TodoApp/register";
  public registerUserUrl = "http://localhost:8080/ToDo/userRegister";
public emailList="http://localhost:8080/ToDo/getUserList";

  constructor(private http: Http) {
  }
  //*****************Registration************************
  create(user: UserDetails) {
    console.log(user);
    console.log("in create user" + user);
    return this.http.post(this.registerUserUrl, user);
  }

  getTokenLocalStorage() {
    var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', localStorage.getItem("token"));
    return headers;
  }

  getAllEmail(){
    var headers = this.getTokenLocalStorage();
  return this.http.get(this.emailList,{ headers: headers });
  }
  


}
