import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AutoUnsubscribe } from "src/components/core/common/auto-unsubscribe.decorator";
import { CoerceBoolean } from "src/components/core/common/coerce-boolean-inputs.decorator";

@Directive({
  selector: "input[adrCheckbox][type=checkbox]",
  host: {
    class: "adr-checkbox",
    "[attr.checked]": "checked || null",
    "[attr.readonly]": "readonly || null",
    "[attr.disabled]": "disabled || null",
    "[class.adr-checked]": "checked || null",
    "[class.adr-readonly]": "readonly || null",
    "[class.adr-disabled]": "disabled || null",
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxDirective, multi: true },
  ],
})
@AutoUnsubscribe()
export class CheckboxDirective<T> implements ControlValueAccessor {
  @Input()
  @HostBinding("attr.value")
  public value: T | null = null;

  @Input()
  @CoerceBoolean()
  public checked?: boolean;

  @Input()
  @CoerceBoolean()
  public readonly?: boolean;

  // TIPS: HTMLInputElement.indeterminate = true;

  @Input()
  @CoerceBoolean()
  public disabled?: boolean;

  @Output()
  public readonly valueChange: EventEmitter<T | null> = new EventEmitter<T | null>();

  public writeValue(obj: any): void {
    this.checked = obj !== null && obj !== undefined;
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected _onChange = (_: any): void => {};

  protected _onTouched = (): void => {};

  /**
   * @internal private usage
   */
  @HostListener("click")
  public onChange(): void {
    if (!this.readonly) {
      this._onTouched();
      this.checked = !this.checked;
      const emittedValue: T | null = this.checked ? this.value : null;
      this.valueChange.emit(emittedValue);
      this._onChange(emittedValue);
    }
  }
}
