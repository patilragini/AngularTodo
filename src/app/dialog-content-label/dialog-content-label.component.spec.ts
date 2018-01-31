import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentComponentLabel } from './dialog-content-label.component';

describe('DialogContentComponentLabel', () => {
  let component: DialogContentComponentLabel;
  let fixture: ComponentFixture<DialogContentComponentLabel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentComponentLabel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentComponentLabel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
