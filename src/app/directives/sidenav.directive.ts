import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appSidenav]',
  exportAs: 'appSidenav'
})
export class SidenavDirective {

  @HostBinding('class.is-open') click = false;
  constructor() { }


  @HostListener('click') onClic() {
    this.click = !this.click;
  }

}
