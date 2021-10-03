import { componentWrapperDecorator, Meta, Story } from "@storybook/angular";
import { InputDirective } from "src/components/atoms/forms/input/input.directive";
import { LabelComponent } from "src/components/atoms/forms/label/label.component";

export default {
  title: "atoms/forms/label",
  component: LabelComponent,
  decorators: [componentWrapperDecorator(LabelComponent)],
} as Meta;

const BasicTemplate: Story<LabelComponent> = (args) => ({
  moduleMetadata: { declarations: [InputDirective] },
  template: `<adr-label>{{ ngContent }}</adr-label>`,
  props: { ...args },
});

export const Default = BasicTemplate.bind({});
Default.args = {
  ngContent: "Un label",
};
