import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDirective } from './button.directive';

describe('ButtonDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ButtonDirective, HostComponent]
    }).createComponent(HostComponent);
  });

  test('should create default button', async () => {
    // WHEN
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    // THEN
    expect(fixture.debugElement.children[0].nativeElement).toMatchSnapshot();
  });

  test.each([
    'small',
    'medium',
    'large'
  ] as ('small' | 'medium' | 'large')[])('when size is %s then check snapshot', (size: 'small' | 'medium' | 'large') => {
    // GIVEN
    fixture.componentInstance.size = size;

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(fixture.debugElement.children[0].nativeElement).toMatchSnapshot();
  });

  test.each([true, false])('when outlined is set to %s then check snapshot', (outlined: boolean) => {
    // GIVEN
    fixture.componentInstance.outlined = outlined;

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(fixture.debugElement.children[0].nativeElement).toMatchSnapshot();
  });

  test.each([
    'primary',
    'accent',
    'warn'
  ] as ('primary' | 'accent' | 'warn')[])('when color is %s then check snapshot', (color: 'primary' | 'accent' | 'warn') => {
    // GIVEN
    fixture.componentInstance.color = color;

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(fixture.debugElement.children[0].nativeElement).toMatchSnapshot();
  });
});

@Component({
  template: `
      <button adButton [size]="size" [outlined]="outlined" [color]="color">Click Me</button>`
})
class HostComponent {
  public size?: 'small' | 'medium' | 'large';

  public outlined?: boolean;

  public color?: 'primary' | 'accent' | 'warn';
}
