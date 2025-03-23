import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:mousedown', ['$event'])
  public onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    
    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit();
    }
  }
}