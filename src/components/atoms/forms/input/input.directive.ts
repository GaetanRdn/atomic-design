import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { AutoUnsubscribe } from '../../../core/common/auto-unsubscribe.decorator';
import { CoerceBoolean } from '../../../core/common/coerce-boolean-inputs.decorator';

@Directive({
  selector: 'input[adrInput]',
  host: {
    class: 'adr-input',
    '[class.adr-focused]': 'focused || null',
    '[class.adr-readonly]': 'readonly || null',
    '[class.adr-disabled]': 'disabled || null'
  }
})
@AutoUnsubscribe()
export class InputDirective {
  @HostBinding('attr.value')
  @Input()
  public value: any;

  @Input()
  @HostBinding('readonly')
  @CoerceBoolean()
  public readonly: boolean = false;

  @Input()
  @HostBinding('disabled')
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
}
