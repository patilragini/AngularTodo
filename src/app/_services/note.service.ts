import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
//import {header.interceptor} from '../_helpers/index';
import { Observable } from 'rxjs';

import { UserDetails } from '../_models/index';
import { Note } from '../_models/index';
import{Label}from '../dialog-content-label/Label';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class NoteService {
  public addNoteUrl = "http://localhost:8080/ToDo/addNote";
  public getNotesUrl = "http://localhost:8080/ToDo/getNotes";
  public updateNotesUrl ="http://localhost:8080/ToDo/update";
  public emailList="http://localhost:8080/ToDo/getUserList";
  public collaborateUserUrl="http://localhost:8080/ToDo/collaborate";
  public getUserUrl="http://localhost:8080/ToDo/getUser";
public getCollabUserUrl="http://localhost:8080/ToDo/getCollabUser";
public removeCollaboratorUrl="http://localhost:8080/ToDo/removeCollaborator";
public getAllLabelurl="http://localhost:8080/ToDo/getAllLabel";
public addLabelurl="http://localhost:8080/ToDo/addlabel";
public deleteLabelurl="http://localhost:8080/ToDo/deleteLabel";



  constructor(private http: Http) {
  }

  getTokenLocalStorage() {
    var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', localStorage.getItem("token"));
    return headers;
  }
  getNotes() {
    var headers = this.getTokenLocalStorage();
    return this.http.get(this.getNotesUrl, { headers: headers });
  }

  updateNote(note: Note) {
    console.log(note);
    var headers = this.getTokenLocalStorage();
    return this.http.post(this.updateNotesUrl, note, { headers: headers });

  }

  createNote(note: Note) {
    console.log(localStorage.getItem("token"));

    var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', localStorage.getItem("token"));
    console.log(headers);
    //    var headers=this.getTokenLocalStorage();
    return this.http.post(this.addNoteUrl, note, { headers: headers });
  }

  getAllEmail(){
    var headers = this.getTokenLocalStorage();
   this.http.get(this.emailList,{ headers: headers });
  }


  //******COLLABORATOR********//
  collaborate(note:Note,email){
    var headers = this.getTokenLocalStorage();
    headers.set('email',email);
    return this.http.post(this.collaborateUserUrl,note,{ headers: headers });
  }
//****** get logged in user from token*****//
  getLoggeUser(){
    var headers = this.getTokenLocalStorage();
    return this.http.get(this.getUserUrl,{ headers: headers });
  }


  getCollabUsers(note:Note){
    console.log(note);
    var headers = this.getTokenLocalStorage();
    return this.http.post(this.getCollabUserUrl, note,{ headers: headers });
  }

  removeCollaborator(note:Note,email){
    
    var headers = this.getTokenLocalStorage();
    headers.set('email',email);
    return this.http.post(this.removeCollaboratorUrl,note,{ headers: headers });
  }
  getallLabel(){
    var headers = this.getTokenLocalStorage();
    return this.http.get(this.getAllLabelurl, { headers: headers });
   }

   label:string;
   addLabel(newLabel){ 
     console.log(newLabel);
  var headers = this.getTokenLocalStorage();
  return this.http.post(this.addLabelurl,newLabel, { headers: headers });
   }
  //DELETE LABEL PERMANENTLLY FROM LIST
   deleteLabel(deletelabel:Label){
    console.log("SREVICE deleteLabel ");
    console.log(deletelabel);
    var headers = this.getTokenLocalStorage();
    return this.http.post(this.deleteLabelurl,deletelabel, { headers: headers });
    
   }
  //  addLabelNote(note:Note,label:Label){
  //   console.log("service deleteLabel ");
  //   var headers = this.getTokenLocalStorage();
  //   return this.http.post(this.deleteLabelNoteurl,label, { headers: headers });


  //  }

   
}
