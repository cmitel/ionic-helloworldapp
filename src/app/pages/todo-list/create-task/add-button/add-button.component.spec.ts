import { IonicModule } from '@ionic/angular';
import { AddButtonComponent } from './add-button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;
  let compElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;
    compElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should exists', () => {
    expect(component).toBeTruthy();
  });

  it('should define one ion-button element', () => {
    expect(compElement.querySelectorAll('ion-button').length).toEqual(1);
  });

  it('should disable the button element by default', () => {
    const el: HTMLElement = compElement.querySelector('ion-button');
    expect(el.getAttribute('ng-reflect-disabled')).toBeTruthy();
  });

  it('should enable the button element once an event received from outside', () => {
    const el: HTMLElement = compElement.querySelector('ion-button');
    component.enableBtn = true;
    fixture.detectChanges();
    expect(el.getAttribute('ng-reflect-disabled')).toBe('false');
    component.enableBtn = false;
    fixture.detectChanges();
    expect(el.getAttribute('ng-reflect-disabled')).toBe('true');
  });

  it('should define the add method', () => {
    expect(component.add).toBeDefined();
  });

  it('should have a boolean property to control button state', () => {
    expect(component.enableBtn).toBeDefined();
    expect(component.enableBtn).toBeFalsy();
  });

  it('should have the boolean property equals to FALSE when the button is enabled', () => {
    const el: HTMLElement = compElement.querySelector('ion-button');
    const value = el.getAttribute('ng-reflect-disabled') === 'false' ? false : true;
    expect(component.enableBtn).not.toEqual(value);
  });

  it('should have the boolean property equals to TRUE when the button is disabled', () => {
    const el: HTMLElement = compElement.querySelector('ion-button');
    component.enableBtn = true;
    fixture.detectChanges();
    const value = el.getAttribute('ng-reflect-disabled') === 'false' ? false : true;
    expect(component.enableBtn).not.toEqual(value);
  });

  it('should dispatch the pressed event', (done: DoneFn) => {

    component.pressed.subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });

    component.add();
  });

});
