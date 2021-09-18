import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'button[adButton]',
  host: {
    class: 'ad-button',
    '[class.ad-small]': 'size === "small"',
    '[class.ad-medium]': 'size === "medium"',
    '[class.ad-large]': 'size === "large"',
    '[class.outlined]': 'outlined',
    '[class.ad-primary]': 'color === "primary"',
    '[class.ad-accent]': 'color === "accent"',
    '[class.ad-warn]': 'color === "warn"'
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
