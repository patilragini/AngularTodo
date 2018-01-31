import { Component } from '@angular/core';
//import {Component} from 'angular2/core'

import { Router } from '@angular/router';
//import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular2/http';


import { AlertService, UserService } from '../_services/index';

@Component({
  //selector:"register",
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
    styleUrls:['register.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        console.log(this.model.mobilenumber);
        this.userService.create(this.model)
              .subscribe(
                data => {
                    console.log(data);
                      if(data.responseMessage==200){
                        this.alertService.success('Registration successfull click link in email to activate account', true);
                        this.loading = false;
                        this.router.navigate(['/login']);
                    }
                    else{
                      console.log(data);
                    this.loading = false;
                    this.alertService.success('Registration successfull click link in email to activate account', true);
                    this.router.navigate(['/login']);

                }},
                error => {
                    this.alertService.error("Error");
                    this.loading = false;
                    this.router.navigate(['/login']);

                });
    }
}
