import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, NgForm} from '@angular/forms';


import { Note,UserDetails } from '../_models/index';
import { Console } from '@angular/core/src/console';

import{HomeComponent}from '../home/index';
import {  AuthenticationService, NoteService,AlertService,UserService } from '../_services/index';

import {Http,Response} from '@angular/http';

import { MaterialModule } from '../MaterialModule';
import { log, debug } from 'util';

@Component({
  selector: 'app-dialog-content-collaborator',
  templateUrl: './dialog-content-collaborator.component.html',
  styleUrls: ['./dialog-content-collaborator.css']
})
export class DialogContentComponentCollaborator implements OnInit {

  public note:Note;
  emailList:[number,string];

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private noteService: NoteService,
    private userService:UserService,
    public dialogRef: MatDialogRef<DialogContentComponentCollaborator>,
    @Inject(MAT_DIALOG_DATA) public data:{note:Note}
  ) {  }



 defaultpic='/assets/icon/defaultpic.jpg';
 removeImg='/assets/icon/clear.svg';
colors = [{
    color: '#f26f75',
    path: 'assets/icon/Red.png'
  }, {
    color: '#fcff77',
    path: 'assets/icon/lightyellow.png'
  }, {
    color: '#80ff80',
    path: '/assets/icon/green.png'
  }, {
    color: '#9ee0ff',
    path: '/assets/icon/blue.png'
  }, {
    color: '#7daaf2',
    path: '/assets/icon/darkblue.png'
  }, {
    color: '#9966ff',
    path: '/assets/icon/purple.png'
  }, {
    color: '#ff99cc',
    path: '/assets/icon/pink.png'
  }, {
    color: '#bfbfbf',
    path: '/assets/icon/grey.png'
  }, {
    color: '#ffffff',
    path: '/assets/icon/white.png'
  }
];


    ngOnInit() {
      this.note=this.data.note;
      this.getEmailList();
      this.getUser();
      this.getCollabUsers(this.note);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    this.dialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

    updateNote(note:Note){
      console.log(note);
      this.noteService.updateNote(note)
     .subscribe(
     data => {
       console.log("note updated ");
       //console.log(data);
       this.alertService.success("Note added !!!");
     },
     error => {
       console.log(error);
     });
    }


getEmailList(){
 this.userService.getAllEmail()
  .subscribe(
    data => {
      this.emailList = JSON.parse(data['_body']);
      console.log(this.emailList);
   },
   error => {
     console.log("notes error");
     console.log(error);
   });
 
}

email:String;
//select email from drop down
collaboratUser:string;
onChange(note:Note,$event) {
  console.log("in collaborator user::::"+$event);
  console.log(note);
  console.log(this.collaboratUser);
  this.collaborate(note,$event);
}

collaborate(note:Note,email){
 this.noteService.collaborate(note,email)
 .subscribe(
  data => {
    console.log("collaborate response::");
    console.log(data);
    this.getCollabUsers(note);
    location.reload();

 },
 error => {
   console.log("notes error");
   console.log(error);
 });
}

loggedinUser:UserDetails;
getUser(){
  this.noteService.getLoggeUser()
  .subscribe(
   data => {
     this.loggedinUser=JSON.parse(data['_body']);
  },
  error => {
    console.log("getLoggeUser error");
    console.log(error);
    
  });
}

usersCollaborated: UserDetails[] = [];
/*****GET COLLABERATED USES OF NOTE */
getCollabUsers(note:Note){
  console.log("getCollabUsers ::::::");
  console.log(note);
  this.noteService.getCollabUsers(note)
  .subscribe(
   data => {
     console.log("getCollabUsers response:: !!!!!!");
     console.log(JSON.parse(data['_body']));
     this.usersCollaborated=JSON.parse(data['_body']);
     console.log(this.usersCollaborated);
    //  console.log(_body.email);
  },
  error => {
    console.log("getCollabUsers error");
    console.log(error);
    this.getCollabUsers(note);

  });

}

removeCollaborator(note:Note,email){
  this.noteService.removeCollaborator(note,email)
  .subscribe(
   data => {
     console.log("removeCollaborator response: !!!!!!!!");
     console.log(data);
     this.getCollabUsers(note);
     location.reload();

  },
  error => {
    console.log("removeCollaborator error");
    console.log(error);
    this.getCollabUsers(note);

  });
}
 

}
