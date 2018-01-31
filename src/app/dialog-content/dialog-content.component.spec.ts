import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentComponentHome } from './dialog-content.component';

describe('DialogContentComponentHome', () => {
  let component: DialogContentComponentHome;
  let fixture: ComponentFixture<DialogContentComponentHome>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentComponentHome ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentComponentHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
