import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormatoMoneda]'
})
export class FormatoMonedaDirective {

  constructor(private el: ElementRef, private currencyPipe:CurrencyPipe) { }

  @HostListener('input') onInput(){
    let valorInput = this.el.nativeElement.value;
    let pc = {style: 'decimal'};

    let format = valorInput.toLocaleString(undefined, pc)
    this.el.nativeElement.value = format;
  }

}
