import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ IonicModule, FormsModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('Component instance', () => {

    it('should define \'typedTxt\' output EventEmitter', () => {
      expect(component.typedTxt).toBeDefined();
    });

    it('should define \'clear\' input boolean', () => {
      expect(component.clear).toBeFalsy();
    });

    it('should define \'onChange\' method', () => {
      expect(component.onChange).toBeDefined();
    });

    it('should define \'resetInput\' method', () => {
      expect(component.resetInput).toBeDefined();
    });

    it('should define \'content\' property bound to the ion-element', () => {
      expect(component.content).toBeDefined();
    });

    it('should clear the ion-input when the Input clear property changed value is defined', () => {

      const hostElement = fixture.nativeElement;
      const inputElement: HTMLIonInputElement = hostElement.querySelector('ion-input');
      const contentValue = 'My toto task';

      spyOn(component, 'ngOnChanges').and.callThrough();
      spyOn(component, 'resetInput').and.callThrough();

      inputElement.value = contentValue;
      inputElement.dispatchEvent(new Event('ionChange'));

      fixture.detectChanges();

      expect(component.content).toEqual(contentValue);

      component.clear = undefined;
      component.ngOnChanges({
        clear: undefined
      });
      fixture.detectChanges();

      expect(component.ngOnChanges).toHaveBeenCalled();
      expect(component.resetInput).not.toHaveBeenCalled();

      expect(component.content).toEqual(contentValue);
      expect(inputElement.getAttribute('ng-reflect-model')).toEqual(contentValue);

      component.clear = true;
      component.ngOnChanges({
        clear: new SimpleChange(undefined, true, false)
      });
      fixture.detectChanges();

      expect(component.ngOnChanges).toHaveBeenCalled();
      expect(component.resetInput).toHaveBeenCalled();

      expect(component.content).toEqual('');
      expect(inputElement.getAttribute('ng-reflect-model')).toEqual('');
    });

    it('should clear the ion-input when resetInput method is called', () => {

      const hostElement = fixture.nativeElement;
      const inputElement: HTMLIonInputElement = hostElement.querySelector('ion-input');
      const contentValue = 'My toto task';

      spyOn(component, 'ngOnChanges').and.callThrough();
      spyOn(component, 'resetInput').and.callThrough();

      inputElement.value = contentValue;
      inputElement.dispatchEvent(new Event('ionChange'));

      fixture.detectChanges();

      expect(component.content).toEqual(contentValue);

      component.clear = true;
      component.ngOnChanges({
        clear: new SimpleChange(undefined, true, false)
      });
      fixture.detectChanges();

      expect(component.ngOnChanges).toHaveBeenCalled();
      expect(component.resetInput).toHaveBeenCalled();

      expect(component.content).toEqual('');
      expect(inputElement.getAttribute('ng-reflect-model')).toEqual('');

    });

    it('should emit txtTyped event when the input content changed', (done: DoneFn) => {

      const nativeEl: HTMLElement = fixture.nativeElement;
      const newContent = 'My Task';
      nativeEl.querySelector('ion-input').value = newContent;

      spyOn(component, 'onChange').and.callThrough();

      component.typedTxt.subscribe(content => {
        expect(content).toEqual(newContent);
        done();
      });

      nativeEl.querySelector('ion-input').dispatchEvent(new Event('ionChange'));

      fixture.detectChanges();

      expect(component.onChange).toHaveBeenCalled();
    });

  });

  describe('Component HMTL', () => {

    it('should have an HTML ion-input element', () => {
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.querySelectorAll('ion-input').length).toEqual(1);
    });

    it('should have ion-input element with a debounce of 150ms', () => {

      const nativeEl: HTMLElement = fixture.nativeElement;
      const ionInput = nativeEl.querySelector('ion-input');

      expect(ionInput.getAttribute('ng-reflect-debounce')).toEqual('150');
    });

    it('should be synced with \'content\' bound property', () => {

      const nativeEl: HTMLElement = fixture.nativeElement;
      const inputElement: HTMLIonInputElement = nativeEl.querySelector('ion-input');
      const valueSynced = 'My Task';

      expect(component.content).toEqual('');

      inputElement.value = valueSynced;
      inputElement.dispatchEvent(new Event('ionChange'));

      fixture.detectChanges();

      expect(component.content).toEqual(valueSynced);

      component.content = 'synced content';
      fixture.detectChanges();

      expect(inputElement.getAttribute('ng-reflect-model')).toEqual(component.content);
    });

  });

});
