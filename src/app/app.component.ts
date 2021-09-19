import { Component } from '@angular/core';

@Component({
  selector: 'adr-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  get sizes(): ('small' | 'medium' | 'large')[] {
    return ['small', 'medium', 'large'];
  }

  get outlineds(): boolean [] {
    return [true, false];
  }

  get colors(): ('primary' | 'accent' | 'warn')[] {
    return ['primary', 'accent', 'warn'];
  }
}
