import { IPaymentDataItem } from '../../../server/models';

export const getPayments = (t: any): IPaymentDataItem[] => [
  {
    Tender: 1,
    Key: 'Cash',
    Title: t('paymentKeyboard.payments.Cash')
  },
  {
    Tender: 3,
    Key: 'EMVCredit',
    Title: t('paymentKeyboard.payments.EMVCredit')
  },
  {
    Tender: 4,
    Key: 'PhoneCredit',
    Title: t('paymentKeyboard.payments.PhoneCredit')
  },
  {
    Tender: 5,
    Key: 'Cheque',
    Title: t('paymentKeyboard.payments.Cheque')
  },
  {
    Tender: 6,
    Key: 'RefundNote',
    Title: t('paymentKeyboard.payments.RefundNote')
  },
  {
    Tender: 7,
    Key: 'GiftCard',
    Title: t('paymentKeyboard.payments.GiftCard')
  },
  {
    Tender: 8,
    Key: 'CreditNote',
    Title: t('paymentKeyboard.payments.CreditNote')
  },
  {
    Tender: 9,
    Key: 'PayPal',
    Title: t('paymentKeyboard.payments.PayPal')
  },
  {
    Tender: 10,
    Key: 'BuyMe',
    Title: t('paymentKeyboard.payments.BuyMe')
  },
  {
    Tender: 11,
    Key: 'ExternalApplication',
    Title: t('paymentKeyboard.payments.ExternalApplication')
  },
  {
    Tender: 12,
    Key: 'WithoutReceipt',
    Title: t('paymentKeyboard.payments.WithoutReceipt')
  },
  {
    Tender: 13,
    Key: 'Points',
    Title: t('paymentKeyboard.payments.Points')
  },
  {
    Tender: 14,
    Key: 'DirectDebit',
    Title: t('paymentKeyboard.payments.DirectDebit')
  },
  {
    Tender: 15,
    Key: 'BankTransfer',
    Title: t('paymentKeyboard.payments.BankTransfer')
  },
  {
    Tender: 16,
    Key: 'Obligo',
    Title: t('paymentKeyboard.payments.Obligo')
  },
  {
    Tender: 17,
    Key: 'HighTechZone',
    Title: t('paymentKeyboard.payments.HighTechZone')
  },
  {
    Tender: 18,
    Key: 'Praxell',
    Title: t('paymentKeyboard.payments.Praxell')
  },
  {
    Tender: 19,
    Key: 'PowerCard',
    Title: t('paymentKeyboard.payments.PowerCard')
  },
  {
    Tender: 20,
    Key: 'DTS',
    Title: t('paymentKeyboard.payments.DTS')
  }
];
