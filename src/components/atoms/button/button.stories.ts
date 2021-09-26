import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, Story } from '@storybook/angular';
import { ButtonDirective } from 'src/components/atoms/button/button.directive';

@Component({
  selector: 'adr-dummy',
  template: `
      <button adrButton [size]="size" [outlined]="outlined" [color]="color">Click</button>`
})
class DummyComponent {
  @Input()
  public size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  public outlined: boolean = false;

  @Input()
  public color: 'primary' | 'accent' | 'warn' = 'primary';
}

export default {
  title: 'atoms/button',
  component: DummyComponent
} as Meta;

const Template: Story<DummyComponent> = (args) => ({
  props: args, moduleMetadata: { declarations: [ButtonDirective], imports: [CommonModule] }
});

export const Default = Template.bind({});

