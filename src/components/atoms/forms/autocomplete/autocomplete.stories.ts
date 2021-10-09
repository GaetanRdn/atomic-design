import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/angular";
import { AutocompleteComponent } from "./autocomplete.component";
import { AutocompleteModule } from "./autocomplete.module";

export default {
  title: "atoms/forms/autocomplete",
  component: AutocompleteComponent,
} as Meta<AutocompleteComponent<string>>;

const template: Story<AutocompleteComponent<string>> = (
  args: AutocompleteComponent<string>
) => ({
  moduleMetadata: {
    imports: [AutocompleteModule],
  },
  props: {
    ...args,
    valueChange: action("valueChange"),
  },
  template: `
  <adr-autocomplete [value]="value" 
  [options]="options" 
  [required]="required" 
  (valueChange)="valueChange($event)">
  </adr-autocomplete>`,
});

export const basic = template.bind({});
basic.args = {
  options: ["Gaetan", "Soren", "Bernard"],
  value: "",
};
