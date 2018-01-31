import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, NgForm } from '@angular/forms';


import { Note, UserDetails } from '../_models/index';
import { Console } from '@angular/core/src/console';

import { HomeComponent } from '../home/index';
import { AuthenticationService, NoteService, AlertService, UserService } from '../_services/index';

import { Http, Response } from '@angular/http';

import { MaterialModule } from '../MaterialModule';
import { log, debug } from 'util';
import { Label } from './Label';

@Component({
  selector: 'app-dialog-content-label',
  templateUrl: './dialog-content-label-component.html',
  styleUrls: ['./dialog-content-label.css'],

})
export class DialogContentComponentLabel implements OnInit {

  public note: Note;
  emailList: [number, string];
  label: Array<Label>;
  newTodo: string;
  todos: any;
  todoObj: any;

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private noteService: NoteService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogContentComponentLabel>,
    @Inject(MAT_DIALOG_DATA) public data: { note: Note }
  ) {
    this.newTodo = '';
     this.todos = [];
     this.label=[]
  }


  removeImg = '/assets/icon/clear.svg';
  ngOnInit() {
    this.getUser();
    this.getAllLabel();
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
  //***** add label */
// addTodo(event) {
//   this.todoObj = {
//     newTodo: this.newTodo,
//     completed: false
//   }
//   this.todos.push(this.todoObj);
//   this.newTodo = '';
//   event.preventDefault();
// }
// deleteTodo(index) {
//   this.todos.splice(index, 1);
// }
// deleteSelectedTodos() {
//   //need ES5 to reverse loop in order to splice by index
//   for(var i=(this.todos.length -1); i > -1; i--) {
//     if(this.todos[i].completed) {
//       this.todos.splice(i, 1);
//     }
//   }
// }
deleteLabel:Label;

removeLabel(deleteLabel){
 console.log("deleteLabel");
 console.log(deleteLabel);
 this.noteService.deleteLabel(deleteLabel)
  .subscribe(
    data => {
    this.loggedinUser=JSON.parse(data['_body']);
    this.getAllLabel();
 },
 error => {
   console.log("getLoggeUser error");
   console.log(error);
 });
}


  newlabel:string;
  addLabel(labelname){
    console.log("add label"+labelname);
    let label = new Label(labelname);
     console.log(label);
    this.noteService.addLabel(label)
    .subscribe(
      data => {
        this.loggedinUser=JSON.parse(data['_body']);
        this.getAllLabel();
     },
     error => {
    console.log("getLoggeUser error");
       console.log(error);

     });
    } 

    //***** GET ALL LABELS OF USER IN ARRAY *****/
    labelsList:Label[]=[];
    getAllLabel(){
      this.noteService.getallLabel()
      .subscribe(
        data => {
          console.log(data);
          this.labelsList = JSON.parse(data['_body']);
          debugger;
          console.log("LABELS OF USRE ::");
          console.log(this.labelsList);
        },
        error => {
          console.log("getLoggeUser error");
          console.log(error);
  
        });
    }



  loggedinUser: UserDetails;
  getUser() {
    this.noteService.getLoggeUser()
      .subscribe(
      data => {
        this.loggedinUser = JSON.parse(data['_body']);
      },
      error => {
        console.log("getLoggeUser error");
        console.log(error);

      });
  }


}
