import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';



@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls:['login.css']
})

export class LoginComponent {
    model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    login() {
        // console.log("login component.ts"+this.model.email+""+this.model.password+"::::::::"+this.model);
        this.loading = true;
        console.log(this.model);
        this.authenticationService.login(this.model)
            .subscribe(
                data => {
                   console.log("login  data");
                  console.log(data.responseMessage);
                  let token=data.responseMessage;
                     //console.log(JSON.parse(data['_body']));
                         this.alertService.success('Login successfull', true);
                         if(token!=null){
                         this.loading = false;
                         localStorage.setItem('token',  token);
                        this.alertService.success("LOgin done !!!");
                         this.router.navigate(['/home']);
                     }
                     else{
                        this.loading = false;
                        this.alertService.success("User do not exists!!! check email password agin and re-enter", true);
                     }
              },
                error => {
                    console.log(error);
                    this.loading = false;
                    this.alertService.error("Error in login try again !!!");
                });

    }

}
