import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputModule } from "src/components/atoms/forms/input/input.module";
import { AutocompleteComponent } from "./autocomplete.component";

@NgModule({
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent],
  imports: [CommonModule, InputModule],
})
export class AutocompleteModule {}
