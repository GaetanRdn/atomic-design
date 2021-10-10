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
  [openOn]="openOn"
  [options]="options" 
  [required]="required" 
  [disabled]="disabled" 
  (valueChange)="valueChange($event)">
  </adr-autocomplete>`,
});

export const basic = template.bind({});
basic.args = {
  options: ["Gaetan", "Soren", "Bernard"],
  value: "",
};

interface Person {
  id: number;
  firstName: string;
  name: string;
}

const objectsValuesTemplate: Story<AutocompleteComponent<Person>> = (
  args: AutocompleteComponent<Person>
) => ({
  moduleMetadata: {
    imports: [AutocompleteModule],
  },
  props: {
    ...args,
    valueChange: action("valueChange"),
    displayOptionFn: (option: Person): string =>
      `${option.firstName} - ${option.name}`,
  },
  template: `
  <adr-autocomplete [value]="value"
  [openOn]="openOn"
  [options]="options" 
  [required]="required" 
  [disabled]="disabled"
  (valueChange)="valueChange($event)"
  [displayOptionFn]="displayOptionFn">
  </adr-autocomplete>`,
});

export const complexValues = objectsValuesTemplate.bind({});
complexValues.args = {
  options: [
    { id: 1, firstName: "Gaetan", name: "Redin" },
    { id: 2, firstName: "Soren", name: "Redin" },
    { id: 3, firstName: "Lord", name: "Voldemor" },
  ],
  value: { id: 2, firstName: "Soren", name: "Redin" },
};