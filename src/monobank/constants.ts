export const MONOBANK_KEY = Symbol('Monobank Key');

export enum Currency {
  USD = 840,
  EUR = 978,
  UAH = 980,
  PLN = 985,
}

export const WHITELIST_PAIRS = [
  [Currency.USD, Currency.UAH],
  [Currency.EUR, Currency.UAH],
  [Currency.PLN, Currency.UAH],
  [Currency.EUR, Currency.USD],
];
