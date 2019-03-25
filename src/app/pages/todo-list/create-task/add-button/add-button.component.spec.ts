import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonPage } from './add-button.page';

describe('AddButtonPage', () => {
  let component: AddButtonPage;
  let fixture: ComponentFixture<AddButtonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddButtonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButtonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
