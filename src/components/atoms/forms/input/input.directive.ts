import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { CoerceBoolean } from '../../../core/common/coerce-boolean-inputs.decorator';

@Directive({
  selector: 'input[adrInput]',
  host: {
    class: 'adr-input',
    '[class.adr-focused]': 'focused || null'
  }
})
export class InputDirective implements OnDestroy {
  @HostBinding('attr.value')
  @Input()
  public value: any;

  @Input()
  @CoerceBoolean()
  public readonly: boolean = false;

  @Input()
  @CoerceBoolean()
  public disabled: boolean = false;

  @Output()
  public valueChange: EventEmitter<any> = new EventEmitter<any>();

  private _focused: boolean = false;

  get focused(): boolean {
    return this._focused;
  }

  @HostListener('input', ['$event.target.value'])
  public onInput(value: any): void {
    if (!this.readonly && !this.disabled) {
      this.valueChange.emit(value);
    }
  }

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  public onToggleFocus(focused: boolean): void {
    if (!this.readonly && !this.disabled) {
      this._focused = focused;
    }
  }

  public ngOnDestroy(): void {
    this.valueChange.unsubscribe();
  }
}
