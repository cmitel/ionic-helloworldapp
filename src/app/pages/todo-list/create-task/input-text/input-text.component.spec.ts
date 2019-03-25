import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextPage } from './input-text.page';

describe('InputTextPage', () => {
  let component: InputTextPage;
  let fixture: ComponentFixture<InputTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
