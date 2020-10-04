import {FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

/**
 * Expiry date month custom validators which validates following cases:
 * 1. Empty month value
 * 2. Exact two numbers i.e 01, 05...
 * 3. Shouldn't be 0 or negative
 * 4. Shouldn't be > than 12 to mark it invalid month
 */
export const expiryMonthValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const month = control.value;
  const regex = RegExp('^[0-9]{2}$');

  return month === '' || !regex.test(month) || +month < 1 || +month > 12 ? { error: true } : null;
};

/**
 * Expiry date year custom validators which validates following cases:
 * 1. Empty year value,
 * 2. Full year i.e 2020, 2021...
 * 3. Shouldn't be past year
 * 4. Max year validation (set to 2040)
 */
export const expiryYearValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const maxYear = 2040;
  const year = control.value;
  const regex = RegExp('^[0-9]{4}$');
  const currentYear = new Date().getFullYear();

  return year === '' || !regex.test(year) || +year < currentYear || year > maxYear ? { error: true } : null;
};

/**
 * Expiry date validator (many other approaches to validate date not in past I used a pretty simple logic to achieve it)
 * This method validates selected month and year not in past.
 */
export const expiryDateValidator = (month: number, year: number): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return +year === currentYear ? +month > currentMonth : true;
};

