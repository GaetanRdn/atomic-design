import { Meta, Story } from '@storybook/angular';
import { LabelComponent } from 'src/components/atoms/forms/label/label.component';

export default {
  title: 'atoms/forms/label',
  component: LabelComponent,
  parameters: {
    jest: ['label.component.spec.ts'],
  },
} as Meta<LabelComponent>;

const BasicTemplate: Story<LabelComponent> = (args) => ({
  template: `<adr-label>{{ ngContent }}</adr-label>`,
  props: { ...args },
});

export const Default = BasicTemplate.bind({});
Default.args = {
  ngContent: 'Un label',
};
