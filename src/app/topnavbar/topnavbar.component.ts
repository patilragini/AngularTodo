import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/index';

import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService,UserService,NoteService } from '../_services/index';
import{DialogContentComponentLabel} from '../dialog-content-label/dialog-content-label.component';
import{Note,UserDetails} from '../_models/index'
@Component({
  moduleId: module.id.toString(),
  selector:"topnavbar",
  templateUrl: 'topnavbar.component.html',
  styleUrls: ['topnavbar.css'],
})

export class TopnavbarComponent implements OnInit  {

  constructor(
    
    private noteService:NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    public dialog: MatDialog, dialogsmall: MatDialog
  ) {  }

  ngOnInit() {
    this.getUser();
  }

   defaultImg='/assets/icon/flower.jpg';
   searchImg='/assets/icon/searchicon.png';
   logoutImg='/assets/icon/logout.png';
   remender='/assets/icon/remender.svg';
   note='/assets/icon/notes.png';
   label='/assets/icon/label.svg';
   trashImg = '/assets/icon/delete.svg';
   archiveImg = '/assets/icon/archive.svg';
   settingimg='/assets/icon/setting.png';

  logout(){
    console.log("logout");
    localStorage.removeItem('token');
     this.router.navigate(['/login']);
  }

  moveContainer(){

//localStorage.setItem('widthContainer',initial);
  }

  
  dialogResult='';

  openDialoglabel(): void {
    console.log("openDialoglabel open note:: ");
    let dialogRef = this.dialog.open(DialogContentComponentLabel, {
      //get label
       });
       dialogRef.afterClosed().subscribe(result => {
     //  console.log(`Dialog closed: ${result}`);
       this.dialogResult = result;
        });

 }
  
loggedinUser:UserDetails;
getUser(){
  this.noteService.getLoggeUser()
  .subscribe(
   data => {
     console.log("nav user");
     this.loggedinUser=JSON.parse(data['_body']);
     console.log(this.loggedinUser);
  },
  error => {
    console.log("getLoggeUser error");
    console.log(error);
    
  });
}








    }
