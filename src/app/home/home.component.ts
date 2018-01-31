import { Component, OnInit,Input } from '@angular/core';

import { UserDetails,customResponse } from '../_models/index';
import { UserService } from '../_services/index';
import { Note,Label } from '../_models/index';

import { Router, ActivatedRoute } from '@angular/router';
import {  AuthenticationService, NoteService,AlertService } from '../_services/index';
import { MaterialModule } from '../MaterialModule';
//Dialog maodule
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TopnavbarComponent } from '../topnavbar/topnavbar.component';
import {MatChipInputEvent} from '@angular/material';

import{DialogContentComponentLabel} from '../dialog-content-label/dialog-content-label.component';

import { DialogContentComponentHome } from '../dialog-content/dialog-content.component';
import{DialogContentComponentCollaborator}from'../dialog-content-collaborator/dialog-content.component';
// import{HomeDialogComponent} from './index';

import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'home.component.html',
  styleUrls: ['addCard.css']
})

export class HomeComponent implements OnInit {
  private timer;
  //chip remove
  removable: boolean = true;

  model: any = {};

  modelLabel : Label[] =new Array();
  notes: Note[] = [];
  users: UserDetails[] = [];
  @Input() note:Note;


moreImg='/assets/icon/more.svg';
  pinImg = '/assets/icon/pin.svg';
  pinedImg = '/assets/icon/pinblue.svg';
  archiveImg = '/assets/icon/archive.svg';
  trashImg = '/assets/icon/delete.svg';
  colorPalet = '/assets/icon/color.svg';
  imageupload = '/assets/icon/uploadImg.svg';
  remender='/assets/icon/remender.svg';
  collaboratorImg='/assets/icon/collaborator.svg';
  clearImg='/assets/icon/clear.svg';

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

  //  public pickerOptions: IColorPickerConfiguration;

  //== images = [ 'pin': './angularTodo/assets/icon/pin.svg'];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private noteService: NoteService,
    private alertService: AlertService,
    public dialog: MatDialog,    dialogsmall: MatDialog
  ) { }


  ngOnInit() {
    this.getAllNotes();
    this.getAllLabel();
    this.timer = Observable.timer(10000);
    this.timer.subscribe((t) => this.checkReminder());  
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
  getEmailList(){
    this.userService.getAllEmail()
      .subscribe(
       data => {
         console.log(data);
       },
       error => {
         console.log("notes error");
         console.log(error);
       });

    }
    public date: Date = new Date();
     checkReminder(){
       console.log("in interial11111");
      this.date = new Date();
      console.log(this.date);
       console.log("interval reminder");
       console.log(this.notes);
       var i;
       for( i=0;i<this.notes.length;i++){
       if(this.notes[i].reminder!=null)
       {
       // this.alertService.success("Reminder ");
       }
      }
       console.log(this.notes);
     }
     copynote(notecopy){

      let note=new Note();
      note.title = notecopy.title;
      note.body = notecopy.body;
      note.color="";
      note.isPinned=false;
      note.isArchive=false;
      note.isTrash=false;
          this.noteService.createNote(note)
        .subscribe(
        data => {
          console.log("note entered ");
          console.log(data);
          this.model.title = "";
          this.model.body = "";
          let msg="Note updated !!!";
          this.alertService.success("Note added !!!");
          this.getAllNotes();
          location.reload();
  
        },
        error => {
          console.log(error);
          this.model.title = "";
          this.model.body = "";
          this.alertService.error(error);
          this.getAllNotes();
        });
      this.getAllNotes();

      
     }


     
  openDialogHome(noteopen): void {
    console.log("Dialog open note:: "+noteopen);
    let dialogRef = this.dialog.open(DialogContentComponentHome, {
      width: '600px',
      data: {
        note:noteopen,
      }
    });

        dialogRef.afterClosed().subscribe(result => {
          // console.log(`Dialog closed: ${result}`);
          this.dialogResult = result;
        });

      }



      openDialogcollaborator(noteopen): void {
        console.log("openDialogcollaborator open note:: "+noteopen);
        let dialogRef = this.dialog.open(DialogContentComponentCollaborator, {
          data: {
            note:noteopen,
          }
        });
    
            dialogRef.afterClosed().subscribe(result => {
              // console.log(`Dialog closed: ${result}`);
              this.dialogResult = result;
            });
    
          }


  handleInputChange(event,note) {
    var image = event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!image.type.match(pattern)) {
      console.error('File is not an image');
      // alert message FOR improper input
      return;
    }
    console.log("image.name ::::: "+image.name);
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let newFile;
      let fr = new FileReader();
      fr.onload = (event: any) => {
        let base64 = event.target.result
        console.log(base64);
        note.image=base64;
        this.updateNote(note);
        // let img = base64.split(',')[1]
        // let blob = new Blob([window.atob(img)], { type: 'image/jpeg' })
      console.log("**************BLOB IMAGE ***************************");
      }
      fr.readAsDataURL(file)
      console.log(file)
      console.log(newFile)

    }

  }

  //************BLOB TO FILE CONVERSION***************************

  //blobToFile(blob: Blob, fileName: string): File {
  //       let b: any = blob;
  //       b.lastModified = moment.now();
  //       b.lastModifiedDate = new Date();
  //       b.name = fileName;
  //       b.webkitRelativePath="";
  //       return <File>blob
  //   }

  //get all anotes
  getAllNotes() {
    console.log("in get notes");
    this.noteService.getNotes()
      .subscribe(
      data => {
        console.log("notes updated get");
        this.notes = JSON.parse(data['_body']);
      console.log(this.notes);
      },
      error => {
        console.log("notes error");
        console.log(error);
      });
  }
  //update note
  pinUnpin(note, value) {
    note.pinned = value;
    this.updateNote(note);
  }
  archiveUnarchive(note, value) {
    note.archive = value;
    this.updateNote(note);
  }
  trashUntrash(note, value) {
    note.trash = value;
    this.updateNote(note);
  }

  updateNote(note) {
    console.log("in update note!!!");
    console.log(note);
       this.noteService.updateNote(note)
      .subscribe(
      data => {
        console.log("note updated ");
        //console.log(data);
        this.getAllNotes();
        // location.reload();

      },
      error => {
        console.log(error);
        this.getAllNotes();
      });
  }

  //add note
//note = new Note;

  addNote() {
    let note=new Note();
    console.log("in create note" + this.model.title + " :: " + this.model.body);
    note.title = this.model.title;
    note.body = this.model.body;
    console.log(note);
    var currentUser = (localStorage.getItem('token'));
    this.noteService.createNote(note)
      .subscribe(
      data => {
        console.log("note entered ");
        console.log(data);
        this.model.title = "";
        this.model.body = "";
        let msg="Note updated !!!";
        this.alertService.success("Note added !!!");
        this.getAllNotes();
        location.reload();

      },
      error => {
        console.log(error);
        this.model.title = "";
        this.model.body = "";
        this.alertService.error(error);
        this.getAllNotes();
      });
    this.getAllNotes();

  }
 //***** GET ALL LABELS OF USER IN ARRAY *****/
 labelsList:Label[]=[];
    getAllLabel(){
      this.noteService.getallLabel()
      .subscribe(
        data => {
          console.log(data);
          this.labelsList = JSON.parse(data['_body']);
          console.log("LABELS OF USRE ::");
          console.log(this.labelsList);
        },
        error => {
          console.log("getLoggeUser error");
          console.log(error);
  
        });
    }

remove(note,label: Label): void {
    console.log(label);
    console.log(label.labelId);
    var index = -1;
    var i=0;
  for ( i = 0; i<note.labels.length;i++) {
    if (note.labels[i] === label.labelId) {
      console.log(index);
      index = i;
      break;
    }
  }
    if (index == -1) {
  console.log("push");
  } else {
    note.labels.splice(index, 1);
    this.updateNote(note)
  }
  }

changeCheckBox(e,note,label:Label) {
      console.log(label);
      console.log(label.labelId);
      var index = -1;
      var i=0;
    for ( i = 0; i<note.labels.length;i++) {
      if (note.labels[i] === label.labelId) {
        console.log(index);
        index = i;
        break;
      }
    }
      if (index == -1) {
      note.labels.push(label.labelId);
      console.log( note.labels);
      this.updateNote(note)
    } else {
      note.labels.splice(index, 1);
      this.updateNote(note)
    }
   }
   
   
logout() {
    console.log("logout");
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
