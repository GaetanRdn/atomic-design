import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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
export class AutocompleteComponent<T> implements OnChanges {
  @Input()
  public options: T[] = [];

  @Input()
  public value: T | null = null;

  @Input()
  @CoerceBoolean()
  public required: boolean = false;

  @Output()
  public readonly valueChange: EventEmitter<T | null> = new EventEmitter<T | null>();

  private _displayedValues$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(
    this.options
  );

  public displayedValues$: Observable<
    T[]
  > = this._displayedValues$.asObservable();

  private _isOpen = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  public displayOptionFn: (option: T) => string = (option: T): string =>
    (option as unknown) as string;

  constructor(private _elementRef: ElementRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this._displayedValues$.next(changes.options.currentValue);
    }
  }

  @HostListener("document:click", ["$event.target"])
  public onClick(event: EventTarget): void {
    if (!this._elementRef.nativeElement.contains(event)) {
      this._isOpen = false;
    }
  }

  public openPanel(): void {
    this._isOpen = true;
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
    this._displayedValues$.next(
      this.options.filter((option: T) =>
        this.displayOptionFn(option).includes(inputValue)
      )
    );
  }
}
