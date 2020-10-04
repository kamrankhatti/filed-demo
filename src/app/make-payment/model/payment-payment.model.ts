import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { expiryMonthValidator, expiryYearValidator } from '../../../shared/validators';

export class MakePaymentModel {
  static form(): FormGroup {
    const fb = new FormBuilder();

    /* Although on client side its always a bit tricky to validate credit card
      I tried to use regex to validate several CC pattern i.e Visa, Master, American Express
      Diners Club, Discover and JCB.
      Ofcource the actual validation would always be on back end side.
    */
    const ccPattern = '^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|↵\n' +
      '(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])↵\n' +
      '[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$';

    return fb.group({
      expiry_year: ['', expiryYearValidator],
      expiry_month: ['', expiryMonthValidator],
      cvc: ['', [Validators.pattern('^[0-9]{3}$')]],
      card_number: ['', [Validators.required, Validators.pattern(ccPattern)]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*$'), Validators.maxLength(30)]],
    });
  }
}
