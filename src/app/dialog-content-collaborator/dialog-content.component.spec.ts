import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentComponentCollaborator } from './dialog-content.component';

describe('DialogContentComponentCollaborator', () => {
  let component: DialogContentComponentCollaborator;
  let fixture: ComponentFixture<DialogContentComponentCollaborator>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentComponentCollaborator ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentComponentCollaborator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
