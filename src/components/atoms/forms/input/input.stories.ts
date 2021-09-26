import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import { InputDirective } from 'src/components/atoms/forms/input/input.directive';

@Component({
  selector: 'adr-dummy',
  template: `
      <input adrInput [disabled]="disabled" [readonly]="readonly" [value]="value" (valueChange)="valueChange.emit($event)" />`
})
class InputComponent {
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
  component: InputComponent,
  argTypes: {
    value: { control: { type: 'text' } }
  }
} as Meta;

const Template: Story<InputComponent> = (args) => ({
  props: { ...args, valueChange: action('log') }, moduleMetadata: { declarations: [InputDirective], imports: [CommonModule] }
});

export const Default = Template.bind({});

