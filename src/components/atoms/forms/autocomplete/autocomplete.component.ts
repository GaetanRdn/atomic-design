import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  DisplayFn,
  OpenOn,
} from "src/components/atoms/forms/autocomplete/autocomplete.models";
import { CoerceBoolean } from "src/components/core/common/coerce-boolean-inputs.decorator";

@Component({
  selector: "adr-autocomplete",
  host: {
    "[class.adr-opened]": "isOpen",
    "[attr.required]": "required || null",
  },
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent<T> {
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

  constructor(private _elementRef: ElementRef) {}

  @Input()
  public displayOptionFn: DisplayFn<T> = (option: T): string =>
    (option as unknown) as string;

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

    if (this.value !== option) {
      this.value = option;
      hasChanged = true;
    } else if (!this.required) {
      this.value = null;
      hasChanged = true;
    }

    if (hasChanged) {
      this._isOpen = false;
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
}
