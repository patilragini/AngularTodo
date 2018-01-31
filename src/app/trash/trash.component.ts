import { Component, OnInit } from '@angular/core';

import { UserDetails } from '../_models/index';
import { UserService } from '../_services/index';
import {Note } from '../_models/index';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService,NoteService } from '../_services/index';
import { MaterialModule } from '../MaterialModule';
//Dialog maodule
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {TopnavbarComponent} from'../topnavbar/topnavbar.component';

//import {Component} from 'angular2/core'
//import {ColorPickerService} from 'angular2-color-picker';

//import { IColorPickerConfiguration } from 'ng2-color-picker';

@Component({
  // selector:'ct-navbar',
    moduleId: module.id.toString(),
    templateUrl: 'trash.component.html',
      styleUrls:['addCard.css'],
})

export class TrashComponent implements OnInit {
  model: any = {};
  notes:Note[]=[];
  users: UserDetails[] = [];

  pinImg='/assets/icon/pin.svg';
  pinedImg='/assets/icon/pinblue.svg';
  archiveImg='/assets/icon/archive.svg';
  trashImg='/assets/icon/delete.svg';
  colorPalet='/assets/icon/color.svg';
  imageupload='/assets/icon/uploadImg.svg';

  // color=[{"Red":"/assets/icon/red.png",
  //         "Blue":}]
    colors=  [ {
        						color : '#f26f75',
        						path : 'assets/icon/Red.png'
        					}, {
        						color : '#fcff77',
        						path : 'assets/icon/lightyellow.png'
        					}, {
        						color : '#80ff80',
        						path : '/assets/icon/green.png'
        					}, {
        						color : '#9ee0ff',
        						path : '/assets/icon/blue.png'
        					}, {
        						color : '#7daaf2',
        						path : '/assets/icon/darkblue.png'
        					}, {
        						color : '#9966ff',
        						path : '/assets/icon/purple.png'
        					}, {
        						color : '#ff99cc',
        						path : '/assets/icon/pink.png'
        					}, {
        						color : '#bfbfbf',
        						path : '/assets/icon/grey.png'
        					}, {
        						color : '#ffffff',
        						path : '/assets/icon/white.png'
        					}

        					];
//  public pickerOptions: IColorPickerConfiguration;

 //== images = [ 'pin': './angularTodo/assets/icon/pin.svg'];
    constructor(
      private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private noteService:NoteService,
      ) { }

    ngOnInit() {
      this.getAllNotes();
    }


    //get all anotes
    getAllNotes(){
    console.log("in get notes");
  this.noteService.getNotes()
  .subscribe(
    data => {
      console.log("notes get");
    this.notes=JSON.parse(data._body);
    //  console.log("notes array"+this.title);
    //  console.log("1230"+this.notes.title);
    },
    error => {
      console.log("notes error");
      console.log(error);
    });
    }

trashUntrash(note,value){
  note.trash=value;
  this.updateNote(note);
}

updateNote(note){
console.log("in update note!!!");
console.log(note);
this.noteService.updateNote(note)
.subscribe(
    data => {
      console.log("note updated ");
      //console.log(data);
      this.getAllNotes();
    },
    error => {
        console.log(error);
        this.alertService.error(error);
        this.getAllNotes();
    });
}



}
