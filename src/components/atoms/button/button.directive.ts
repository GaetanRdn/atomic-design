import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'button[adrButton]',
  host: {
    class: 'adr-button',
    '[class.adr-small]': 'size === "small"',
    '[class.adr-medium]': 'size === "medium"',
    '[class.adr-large]': 'size === "large"',
    '[class.adr-outlined]': 'outlined',
    '[class.adr-primary]': 'color === "primary"',
    '[class.adr-accent]': 'color === "accent"',
    '[class.adr-warn]': 'color === "warn"'
  }
})
export class ButtonDirective {
  @Input()
  public size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  public outlined: boolean = false;

  @Input()
  public color?: 'primary' | 'accent' | 'warn';
}
