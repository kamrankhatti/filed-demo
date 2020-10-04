export interface IPaymentDetails {
  id: number;
  cvc: number;
  name: string;
  amount: number;
  card_number: string;
  expiry_year: number;
  expiry_month: number;
}

export const mockPaymentDetails = {
  id: 100,
  cvc: 123,
  amount: 200,
  expiry_month: 10,
  expiry_year: 2020,
  name: 'Steve Jobs',
  card_number: '4111111111111111'
};

export class MockMakePaymentService {
  postPayment(): void {}
}
