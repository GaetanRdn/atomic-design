import { Component, DebugElement } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { TemplateLookup } from "src/components/core/tests/template-lookup";
import { AutocompleteComponent } from "./autocomplete.component";
import { AutocompleteModule } from "./autocomplete.module";

describe("AutocompleteComponent", () => {
  let templateLookup: TemplateLookup<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, RequiredHostComponent],
      imports: [AutocompleteModule],
    });
  });

  describe("Basic", () => {
    beforeEach(() => {
      templateLookup = new TemplateLookup<HostComponent>(
        TestBed.createComponent(HostComponent)
      );

      templateLookup.detectChanges();
    });

    test("should create", () => {
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });

    test("when focus then options panel is open", () => {
      // WHEN
      templateLookup.query("input").focus();
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });

    test("when click on option then panel is closed", () => {
      // GIVEN
      templateLookup.query("input").focus();
      templateLookup.detectChanges();

      // WHEN
      templateLookup.query(".adr-option:last-child").click();
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });

    test("when click on option then check value", () => {
      // GIVEN
      templateLookup.query("input").focus();
      templateLookup.detectChanges();

      // WHEN
      templateLookup.query(".adr-option:last-child").click();
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.getComponent(AutocompleteComponent).value).toEqual(
        "Gaetan"
      );
      expect(templateLookup.hostComponent.value).toEqual("Gaetan");
    });

    test("when click on selected option then value is null", () => {
      // GIVEN
      templateLookup.query("input").focus();
      templateLookup.detectChanges();

      // WHEN
      templateLookup.query(".adr-option:first-child").click();
      templateLookup.detectChanges();

      // THEN
      expect(
        templateLookup.getComponent(AutocompleteComponent).value
      ).toBeNull();
      expect(templateLookup.hostComponent.value).toBeNull();
    });

    test("when click outside then options panel is closed", () => {
      // GIVEN
      templateLookup.query("input").focus();
      templateLookup.detectChanges();

      // WHEN
      templateLookup.query(".outside").click();
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });

    test("when input value then displayed options are filtered", () => {
      // GIVEN
      const input: DebugElement = templateLookup.get("input");
      input.nativeElement.value = "G";
      input.triggerEventHandler("input", { target: input.nativeElement });

      // WHEN
      templateLookup.query("input").focus();
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });
  });

  describe("Required", () => {
    beforeEach(() => {
      templateLookup = new TemplateLookup<RequiredHostComponent>(
        TestBed.createComponent(RequiredHostComponent)
      );

      templateLookup.detectChanges();
    });

    test("should create", () => {
      expect(templateLookup.firstChildElement).toMatchSnapshot();
    });

    test("when required and click on selected option then value does not change", () => {
      // GIVEN
      jest.spyOn(
        templateLookup.getComponent(AutocompleteComponent).valueChange,
        "emit"
      );
      templateLookup.query("input").focus();
      templateLookup.detectChanges();

      // WHEN
      templateLookup.query(".adr-option:first-child").click();
      templateLookup.detectChanges();

      // THEN
      expect(templateLookup.firstChildElement).toMatchSnapshot();
      expect(
        templateLookup.getComponent(AutocompleteComponent).valueChange.emit
      ).not.toBeCalled();
      expect(templateLookup.getComponent(AutocompleteComponent).value).toEqual(
        "Soren"
      );
      expect(templateLookup.hostComponent.value).toEqual("Soren");
    });
  });
});

@Component({
  template: ` <adr-autocomplete
      [options]="options"
      [(value)]="value"
    ></adr-autocomplete>
    <span class="outside"></span>`,
})
class HostComponent {
  public options: string[] = ["Soren", "Gaetan"];

  public value: string = "Soren";
}

@Component({
  template: ` <adr-autocomplete
      [options]="options"
      [(value)]="value"
      required
    ></adr-autocomplete>
    <span class="outside"></span>`,
})
class RequiredHostComponent {
  public options: string[] = ["Soren", "Gaetan"];

  public value: string = "Soren";
}
