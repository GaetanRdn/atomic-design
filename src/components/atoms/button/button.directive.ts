import { Directive, Input, NgModule } from '@angular/core';
import { CoerceBoolean } from '../../core/common/coerce-boolean-inputs.decorator';

@Directive({
  selector: 'button[adrButton]',
  // standalone: true,
  host: {
    class: 'adr-button',
    '[class.adr-small]': 'size === "small"',
    '[class.adr-medium]': 'size === "medium"',
    '[class.adr-large]': 'size === "large"',
    '[class.adr-outlined]': 'outlined',
    '[class.adr-primary]': 'color === "primary"',
    '[class.adr-accent]': 'color === "accent"',
    '[class.adr-warn]': 'color === "warn"',
  },
})
export class ButtonDirective {
  @Input()
  public size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  @CoerceBoolean()
  public outlined?: boolean;

  @Input()
  public color: 'primary' | 'accent' | 'warn' = 'primary';
}

@NgModule({
  declarations: [ButtonDirective],
  exports: [ButtonDirective],
})
export class ButtonModule {}
