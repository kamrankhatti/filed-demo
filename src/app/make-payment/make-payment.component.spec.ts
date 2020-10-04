import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentService } from './make-payment.service';
import { MakePaymentComponent } from './make-payment.component';
import { mockPaymentDetails, MockMakePaymentService } from './model';


describe('MakePaymentComponent', () => {
  let component: MakePaymentComponent;
  let fixture: ComponentFixture<MakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentComponent ],
      providers: [{ provide: MakePaymentService, useClass: MockMakePaymentService }],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // CARD HOLDER NAME Validations
  describe('CARD HOLDER NAME', () => {
    it('should fail no name provide', () => {
      expect(component.form.get('name').invalid).toBe(true);
    });

    it('should fail - exceed max characters', () => {
      const name = 'a'.repeat(31);
      component.form.get('name').setValue(name);

      expect(component.form.get('name').invalid).toBe(true);
    });

    it('should fail - invalid name only string allowed', () => {
      const name = 'John1234';
      component.form.get('name').setValue(name);

      expect(component.form.get('name').invalid).toBe(true);
    });

    it('should pass - has name with limit chars', () => {
      const name = 'a'.repeat(30);
      component.form.get('name').setValue(name);

      expect(component.form.get('name').invalid).toBe(false);
    });
  });

  // CREDIT CARD VALIDATIONS
  describe('CARD HOLDER NAME', () => {
    it('should fail no card number provide', () => {
      expect(component.form.get('card_number').invalid).toBe(true);
    });

    it('should fail - invalid card only number allowed', () => {
      const cc = 'test';
      component.form.get('card_number').setValue(cc);

      expect(component.form.get('card_number').invalid).toBe(true);
    });

    it('should fail - invalid card not match with pattern', () => {
      const cc = '0123458585';
      component.form.get('card_number').setValue(cc);

      expect(component.form.get('card_number').invalid).toBe(true);
    });

    it('should pass - valid card number', () => {
      const cc = '4111111111111111';
      component.form.get('card_number').setValue(cc);

      expect(component.form.get('card_number').invalid).toBe(false);
    });
  });

  // EXPIRY MONTH VALIDATIONS
  describe('EXPIRY MONTH', () => {
    it('should fail no expiry month provide', () => {
      expect(component.form.get('expiry_month').invalid).toBe(true);
    });

    it('should fail - invalid expiry month only number allowed', () => {
      const month = 'test';
      component.form.get('expiry_month').setValue(month);

      expect(component.form.get('expiry_month').invalid).toBe(true);
    });

    it('should fail - invalid expiry month not match with pattern', () => {
      const month = '13';
      component.form.get('expiry_month').setValue(month);

      expect(component.form.get('expiry_month').invalid).toBe(true);
    });

    it('should pass - valid expiry month', () => {
      const month = '12';
      component.form.get('expiry_month').setValue(month);

      expect(component.form.get('expiry_month').invalid).toBe(false);
    });
  });

  // EXPIRY YEAR VALIDATIONS
  describe('EXPIRY YEAR', () => {
    it('should fail no expiry year provide', () => {
      expect(component.form.get('expiry_year').invalid).toBe(true);
    });

    it('should fail - invalid expiry year only number allowed', () => {
      const year = 'test';
      component.form.get('expiry_year').setValue(year);

      expect(component.form.get('expiry_year').invalid).toBe(true);
    });

    it('should fail - invalid expiry year cant be in past', () => {
      const year = '2018';
      component.form.get('expiry_year').setValue(year);

      expect(component.form.get('expiry_year').invalid).toBe(true);
    });

    it('should pass - valid year', () => {
      const year = '2021';
      component.form.get('expiry_year').setValue(year);

      expect(component.form.get('expiry_year').invalid).toBe(false);
    });
  });

  // AMOUNT VALIDATIONS
  describe('AMOUNT', () => {
    it('should fail no amount provide', () => {
      expect(component.form.get('amount').invalid).toBe(true);
    });

    it('should pass - valid amount', () => {
      const amount = '100';
      component.form.get('amount').setValue(amount);

      expect(component.form.get('amount').invalid).toBe(false);
    });
  });

  // CVC VALIDATIONS
  describe('CVC', () => {
    it('should fail - invalid value provide', () => {
      const cvc = 'abcs';
      component.form.get('cvc').setValue(cvc);
      expect(component.form.get('cvc').invalid).toBe(true);
    });

    it('should pass - no value provide (optional)', () => {
      expect(component.form.get('cvc').invalid).toBe(false);
    });

    it('should pass - valid cvc', () => {
      const cvc = '123';
      component.form.get('cvc').setValue(cvc);

      expect(component.form.get('cvc').invalid).toBe(false);
    });
  });

  // FORM SUBMITTED
  describe('FORM SUBMITTED', () => {
    it('should fail - missing required fields', () => {
      component.submit();

      expect(component.form.invalid).toBe(true);
      expect(component.hasFormErrors).toBe(true);
    });

    it('should fail - expiry date can not be in past', () => {
      const { id, ...paymentDetails } = mockPaymentDetails;

      const data = {
        ...paymentDetails,
        expiry_year: '2020',
        expiry_month: '01' // set expiry to past
      };

      component.form.setValue(data);
      component.submit();

      expect(component.form.invalid).toBe(true);
      expect(component.isDateExpired).toBe(true);
    });

    it('should fail - API throws error', () => {
      spyOn(component.service, 'postPayment')
        .and.returnValues(throwError(new HttpErrorResponse({ error: 'some error', status: 400 })));

      const { id, ...data } = mockPaymentDetails;

      component.form.setValue(data);
      component.submit();

      expect(component.apiErrors.status).toBe(400);
      expect(component.service.postPayment).toHaveBeenCalled();
      expect(component.apiErrors.error).toEqual('some error');
    });

    it('should pass - post call success with response', () => {
      spyOn(component.service, 'postPayment')
        .and.returnValues(of(mockPaymentDetails));

      const { id, ...data } = mockPaymentDetails;

      component.form.setValue(data);
      component.submit();

      expect(component.data).toEqual(mockPaymentDetails);
      expect(component.service.postPayment).toHaveBeenCalled();
    });
  });

});
