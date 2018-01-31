import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

   @Component({
     selector: 'toastr-component',
    template: '<button class="btn btn-default" (click)="showSuccess()">Toastr Tester</button>',

   })
   export class ToastrComponent {

     constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
       console.log("tostr constructor");
        this.toastr.setRootViewContainerRef(vcr);
     }

     showSuccess() {
       console.log("tostr");
       this.toastr.success('!', 'Success!');
     }

     showError() {
       this.toastr.error('This is not good!', 'Oops!');
     }

     showWarning() {
       this.toastr.warning('You are being warned.', 'Alert!');
     }

     showInfo() {
       this.toastr.info('Just some information for you.');
     }

     showCustom() {
       this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
     }
   }
