import { Component, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TemplateLookup } from '../../../core/tests/template-lookup';
import { InputDirective } from './input.directive';

describe('InputDirective', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDirective, BasicComponent, ReadonlyComponent, DisabledComponent]
    });
  });

  describe('Basic input', () => {
    let templateLookup: TemplateLookup<BasicComponent>;

    beforeEach(() => {
      templateLookup = new TemplateLookup(TestBed.createComponent(BasicComponent));
    });

    test('Check default state', () => {
      // WHEN
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });

    test.each(['value1', 'value2'])('should set value %s', (value: string) => {
      // GIVEN
      templateLookup.hostComponent.value = value;

      // WHEN
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
      expect(templateLookup.query<HTMLInputElement>('input').value).toEqual(value);
    });

    test.each(['value1', 'value2'])('should update parent value on change, expect %s', (value: string) => {
      // GIVEN
      templateLookup.detectChanges();

      // WHEN
      triggerInputValue(templateLookup, value);
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
      expect(templateLookup.hostComponent.value).toEqual(value);
    });

    test('check class on focus', () => {
      // GIVEN
      templateLookup.detectChanges();

      // WHEN
      let input: DebugElement = templateLookup.get('input');
      input.triggerEventHandler('focus', input.nativeElement);
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });

    test('when focused then check class on blur', () => {
      // GIVEN
      let input: DebugElement = templateLookup.get('input');
      input.triggerEventHandler('focus', input.nativeElement);
      templateLookup.detectChanges();

      // WHEN
      input.triggerEventHandler('blur', input.nativeElement);
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });
  });

  describe('Readonly input', () => {
    let templateLookup: TemplateLookup<ReadonlyComponent>;

    beforeEach(() => {
      templateLookup = new TemplateLookup(TestBed.createComponent(ReadonlyComponent));

      templateLookup.detectChanges();
    });

    test('do not emit change', () => {
      // WHEN
      triggerInputValue(templateLookup, 'value');
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
      expect(templateLookup.hostComponent.value).toBeNull();
    });

    test('when focus then check dont have focused class', () => {
      // GIVEN
      templateLookup.detectChanges();

      // WHEN
      let input: DebugElement = templateLookup.get('input');
      input.triggerEventHandler('focus', input.nativeElement);
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });
  });

  describe('Disabled input', () => {
    let templateLookup: TemplateLookup<DisabledComponent>;

    beforeEach(() => {
      templateLookup = new TemplateLookup(TestBed.createComponent(DisabledComponent));

      templateLookup.detectChanges();
    });

    test('do not emit change', () => {
      // WHEN
      triggerInputValue(templateLookup, 'value');
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
      expect(templateLookup.hostComponent.value).toBeNull();
    });

    test('when focus then check dont have focused class', () => {
      // GIVEN
      templateLookup.detectChanges();

      // WHEN
      let input: DebugElement = templateLookup.get('input');
      input.triggerEventHandler('focus', input.nativeElement);
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });
  });
});

const triggerInputValue = (templateLookup: TemplateLookup<unknown>, value: any): void => {
  let input: DebugElement = templateLookup.get('input');
  input.nativeElement.value = value;
  input.triggerEventHandler('input', { target: input.nativeElement });
};

@Component({
  template: `<input adrInput [(value)]="value" />`
})
class BasicComponent {
  public value!: string;
}

@Component({
  template: `<input adrInput readonly [(value)]="value" />`
})
class ReadonlyComponent {
  public value = null;
}

@Component({
  template: `<input adrInput disabled [(value)]="value" />`
})
class DisabledComponent {
  public value = null;
}
