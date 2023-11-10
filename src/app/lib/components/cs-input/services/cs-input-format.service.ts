import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsInputFormatService {
  constructor() {}

  titleCaseFormat(input: HTMLInputElement) {
    input.value = input.value
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  phoneFormat(input: HTMLInputElement, countryCode: string) {
    input.value = input.value.replace(countryCode + ' ', '');
    input.value = input.value
      .replace(/\D+/g, '') // filter digits
      .replace(/(\d{3})(\d{3})((\d{4}))/, '($1) $2-$3'); //set format
    if (countryCode) {
      input.value = countryCode + ' ' + input.value;
    }
  }

  currencyFormat(
    input: HTMLInputElement,
    currencyCode: string,
    decimalSpots: number
  ) {
    const valueSplit = input.value.split('.');

    if (valueSplit.length > 1) {
      //means we have decimals
      let [left_side, right_side] = valueSplit;

      left_side = this.groupByCommas(left_side);

      right_side = this.preventLetters(right_side);

      //limit right side decimals
      right_side = right_side.substring(0, decimalSpots);

      //join the two parts
      input.value = left_side + '.' + right_side;
    } else {
      input.value = this.groupByCommas(input.value);
    }

    if (currencyCode) {
      input.value = currencyCode + input.value;
    }
  }

  preventLetters(value: string) {
    return value.replace(/\D+/g, '');
  }

  groupByCommas(value: string) {
    return this.preventLetters(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  currencyToNumber(value: string, currencySymbol = '$') {
    return parseFloat(
      value.replace(currencySymbol, '').replace(/[^0-9.-]+/g, '')
    );
  }
}
