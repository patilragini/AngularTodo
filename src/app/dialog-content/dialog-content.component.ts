import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, NgForm} from '@angular/forms';


import { Note } from '../_models/index';
import { Console } from '@angular/core/src/console';

import{HomeComponent}from '../home/index';
import {  AuthenticationService, NoteService,AlertService,UserService } from '../_services/index';

import {Http,Response} from '@angular/http';

import { MaterialModule } from '../MaterialModule';
import { log, debug } from 'util';
// import MaterialDateTimePicker from 'material-datetime-picker';
// import  'rxjs/add/observable/interval';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponentHome implements OnInit {

  public note:Note;
  emailList:[number,string];
  //email:string;



  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private noteService: NoteService,
    private userService:UserService,
    public dialogRef: MatDialogRef<DialogContentComponentHome>,
    @Inject(MAT_DIALOG_DATA) public data:{note:Note}
  ) {  }



moreImg='/assets/icon/more.svg';
  pinImg = '/assets/icon/pin.svg';
  pinedImg = '/assets/icon/pinblue.svg';
  archiveImg = '/assets/icon/archive.svg';
  trashImg = '/assets/icon/delete.svg';
  colorPalet = '/assets/icon/color.svg';
  imageupload = '/assets/icon/uploadImg.svg';
 remender='/assets/icon/remender.svg';

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

date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: true,
		format: 'yyyy-mm-dd',
		defaultOpen: true
	}
    ngOnInit() {
      this.note=this.data.note;
      this.getEmailList();
      
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
       this.alertService.success("Note updated !!!");
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


onDateSelect($event){
  this.note.reminder=$event;
  this.updateNote(this.note);
  console.log($event);
}
}
