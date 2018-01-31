import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { Http, Headers, Response } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent,ToastrComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, NoteService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { TrashComponent } from './trash/index';
import{SearchComponent}from'./search/index';
import { ArchiveComponent } from './archive/index';

import { DialogContentComponentHome } from './dialog-content/dialog-content.component';
import{DialogContentComponentCollaborator} from'./dialog-content-collaborator/dialog-content.component';
import{DialogContentComponentLabel} from'./dialog-content-label/dialog-content-label.component';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MaterialModule } from './MaterialModule';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageUploadModule } from "angular2-image-upload";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
//import {MatDividerModule} from '@angular/material/divider';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';


@NgModule({
  imports: [
    Ng2FilterPipeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    Ng2DropdownModule,
    MatSidenavModule,
    MatToolbarModule,
    AngularDateTimePickerModule,
    // MatDialogModule,
  ImageUploadModule.forRoot(),
  ToastModule.forRoot(),

      //   ColorPickerModule,
    // ColorPickerModule,
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    TrashComponent,
    ArchiveComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    TopnavbarComponent,
    SidenavbarComponent,
    ToastrComponent,
    DialogContentComponentCollaborator,
    DialogContentComponentHome,
    DialogContentComponentLabel
    
    // ModalComponent,
  ],
  entryComponents: [
    DialogContentComponentHome,
    DialogContentComponentCollaborator,
    DialogContentComponentLabel
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    //        ModalService,
    NoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }

  ],
  exports: [
    MaterialModule,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
