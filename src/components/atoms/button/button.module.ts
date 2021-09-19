import { NgModule } from '@angular/core';
import { ButtonDirective } from 'src/components/atoms/button/button.directive';

@NgModule({
  declarations: [ButtonDirective],
  exports: [ButtonDirective]
})
export class ButtonModule {
}
