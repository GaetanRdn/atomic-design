import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import { Observable } from 'rxjs';
import { InputDirective } from 'src/components/atoms/forms/input/input.directive';

@Component({
  selector: 'adr-input-dummy',
  template: `
      <input adrInput [disabled]="disabled" [readonly]="readonly" [value]="value" (valueChange)="valueChange.emit($event)" />`
})
class InputDummyComponent {
  @Input()
  public value: any;

  @Input()
  public readonly: boolean = false;

  @Input()
  public disabled: boolean = false;

  @Output()
  public valueChange: EventEmitter<any> = new EventEmitter<any>();
}

export default {
  title: 'atoms/forms/input',
  argTypes: {
    value: { control: { type: 'text' } }
  }
} as Meta;

const BasicTemplate: Story<InputDummyComponent> = (args) => ({
  props: {
    ...args,
    valueChange: action('log')
  },
  moduleMetadata: { declarations: [InputDirective] },
  component: InputDummyComponent
});

export const Default = BasicTemplate.bind({});

/** Reactive forms **/

@Component({
  selector: 'adr-input-form-dummy',
  template: `
      <input adrInput [readonly]="readonly" [formControl]="formControl" />`
})
class InputReactiveFormDummyComponent {
  @Input()
  public readonly: boolean = false;

  public formControl: FormControl = new FormControl(this['value']);

  @Output()
  public formValueChange: Observable<any> = this.formControl.valueChanges;

  @Input()
  set value(value: any) {
    this.formControl.setValue(value);
  }

  @Input()
  set disabled(disabled: boolean) {
    disabled ? this.formControl.disable() : this.formControl.enable();
  }
}

const ReactiveTemplate: Story<InputReactiveFormDummyComponent> = (args) => ({
  props: {
    ...args,
    formValueChange: action('log')
  },
  moduleMetadata: { declarations: [InputDirective], imports: [ReactiveFormsModule] },
  component: InputReactiveFormDummyComponent
});

export const ReactiveForm = ReactiveTemplate.bind({});
