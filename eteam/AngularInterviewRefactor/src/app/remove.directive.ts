import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[nowrapper]',
})
export class RemoveDirective {
  constructor(private el: ElementRef) {
    const parentElement = el.nativeElement.parentElement;
    const element = el.nativeElement;
    parentElement.removeChild(element);
    parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
    parentElement.parentNode.removeChild(parentElement);
  }
}
