import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  TrackByFunction,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import {
  CreateOptionFn,
  DisplayFn,
  IdentityFn,
  OpenOn,
} from "src/components/atoms/forms/autocomplete/autocomplete.models";
import { AutoUnsubscribe } from "src/components/core/common/auto-unsubscribe.decorator";
import { CoerceBoolean } from "src/components/core/common/coerce-boolean-inputs.decorator";

@Component({
  selector: "adr-autocomplete",
  host: {
    "[class.adr-opened]": "isOpen",
    "[class.adr-disabled]": "disabled",
    "[attr.required]": "required || null",
    "[attr.disabled]": "disabled || null",
  },
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsubscribe()
export class AutocompleteComponent<T> implements ControlValueAccessor {
  @Input()
  set options(options: T[]) {
    this._options = (options || []).sort((a: T, b: T) =>
      this.displayOptionFn(a) < this.displayOptionFn(b) ? -1 : 1
    );

    this._displayedValues$.next(this._options);
  }

  private _options: T[] = [];

  @Input()
  public value: T | null = null;

  @Input()
  @CoerceBoolean()
  public required: boolean = false;

  @Input()
  public openOn: OpenOn = "focus";

  @Input()
  @CoerceBoolean()
  public disabled?: boolean;

  @Input()
  public displayOptionFn: DisplayFn<T> = (option: T): string =>
    (option as unknown) as string;

  @Input()
  public createOptionFn: CreateOptionFn<T> = (option: string): T =>
    (option as unknown) as T;

  @Input()
  public identityFn: IdentityFn<T> = (value: T): any => value;

  public trackByFn: TrackByFunction<T> = (_: number, value: T) =>
    this.identityFn(value);

  @Output()
  public readonly valueChange: EventEmitter<T | null> = new EventEmitter<T | null>();

  private _displayedValues$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(
    this.options
  );

  public displayedValues$: Observable<
    T[]
  > = this._displayedValues$.asObservable();

  get displayedValue(): string {
    return this.value !== null ? this.displayOptionFn(this.value) : "";
  }

  private _isOpen: boolean = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  constructor(
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  @HostListener("document:click", ["$event.target"])
  public onClick(event: EventTarget): void {
    if (!this._elementRef.nativeElement.contains(event)) {
      this._isOpen = false;
    }
  }

  public openPanel(): void {
    if (this.openOn === "focus") {
      this._isOpen = true;
    }
  }

  public select(option: T): void {
    let hasChanged = false;

    if (
      this.value === null ||
      this.identityFn(this.value) !== this.identityFn(option)
    ) {
      this.value = option;
      hasChanged = true;
    } else if (!this.required) {
      this.value = null;
      hasChanged = true;
    }

    if (hasChanged) {
      this._isOpen = false;
      this._onChange(this.value);
      this._onTouched();
      this.valueChange.emit(this.value);
    }
  }

  public filterOptions(inputValue: string): void {
    if (this.openOn === "input" && !this.isOpen) {
      this._isOpen = true;
    }
    this._displayedValues$.next(
      this._options.filter((option: T) =>
        this.displayOptionFn(option)
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase())
      )
    );
  }

  public isSelected(option: T): boolean {
    return (
      this.value !== null &&
      this.identityFn(this.value) === this.identityFn(option)
    );
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  protected _onChange: (_: T | null) => void = (_: T | null): void => {};

  protected _onTouched: () => void = (): void => {};

  public createOption(value: string): void {
    if (typeof this.createOptionFn === "function") {
      this.value = this.createOptionFn(value);
      this._isOpen = false;
      this._onChange(this.value);
      this._onTouched();
      this.valueChange.emit(this.value);
    }
  }
}
