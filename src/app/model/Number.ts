import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'farsiNumber'
})
export class FarsiNumberPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '';
    }
    
    const farsiDigits: { [key: string]: string } = {
      '0': '۰',
      '1': '۱',
      '2': '۲',
      '3': '۳',
      '4': '۴',
      '5': '۵',
      '6': '۶',
      '7': '۷',
      '8': '۸',
      '9': '۹'
    };

    const integerValue = Math.trunc(Number(value)); // Truncate the decimal part
    return String(integerValue).replace(/\d/g, (digit) => farsiDigits[digit]);
  }
}
