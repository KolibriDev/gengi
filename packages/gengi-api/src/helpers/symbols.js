const symbols = {
  AED: 'د.إ',
  AFN: '؋',
  ALL: 'L',
  ANG: 'ƒ',
  ARS: '$',
  AUD: '$',
  AWG: 'ƒ',
  AZN: '₼',
  BAM: 'KM',
  BBD: '$',
  BDT: '৳',
  BGN: 'лв',
  BHD: '.د.ب',
  BIF: 'FBu',
  BMD: '$',
  BND: '$',
  BOB: 'Bs.',
  BRL: 'R$',
  BSD: '$',
  BWP: 'P',
  BYR: 'Br',
  BZD: '$',
  CAD: '$',
  CHF: 'Fr',
  CLP: '$',
  CNY: '¥',
  COP: '$',
  CRC: '₡',
  CUP: '$',
  CVE: 'Esc',
  CZK: 'kr',
  DJF: 'Fr',
  DKK: 'kr',
  DOP: '$',
  DZD: 'دج',
  EGP: 'ج.م.',
  ETB: 'Br',
  EUR: '€',
  FJD: '$',
  FKP: '£',
  GBP: '£',
  GIP: '£',
  GMD: 'D',
  GNF: 'Fr',
  GTQ: 'Q',
  GYD: '$',
  HKD: '$',
  HNL: 'L',
  HRK: 'kn',
  HTG: 'G',
  HUF: 'Ft',
  IDR: 'Rp',
  ILS: '₪',
  INR: '₹',
  IQD: 'د.ع',
  JMD: '$',
  JOD: 'JD',
  JPY: '¥',
  KES: 'Ksh',
  KGS: 'сом',
  KHR: '៛',
  KMF: 'Fr',
  KRW: '₩',
  KWD: 'د.ك',
  KYD: '$',
  KZT: '₸',
  LAK: '₭',
  LBP: 'LL',
  LKR: '₨',
  LRD: '$',
  LTL: 'Lt',
  LYD: 'ل.د',
  MAD: 'د.م.',
  MDL: 'L',
  MGA: 'Ar',
  MKD: 'ден',
  MMK: 'K',
  MNT: '₮',
  MOP: '元',
  MRO: 'UM',
  MUR: '₨',
  MVR: 'Rf.',
  MWK: 'MK',
  MXN: '$',
  MYR: 'RM',
  MZN: 'MT',
  NAD: '$',
  NGN: '₦',
  NIO: 'C$',
  NOK: 'kr',
  NPR: '₨',
  NZD: '$',
  OMR: 'ر.ع.',
  PAB: 'B/.',
  PEN: 'S/.',
  PGK: 'K',
  PHP: '₱',
  PKR: '₨',
  PLN: 'zł',
  PYG: '₲',
  QAR: 'ر.ق',
  RON: 'lei',
  RSD: 'дин',
  RUB: '₽',
  RWF: 'FRw',
  SAR: 'ر.س',
  SBD: '$',
  SCR: 'SRe',
  SEK: 'kr',
  SGD: '$',
  SHP: '£',
  SLL: 'Le',
  SOS: 'Sh.So.',
  SRD: '$',
  STD: 'Db',
  SVC: '₡',
  SZL: 'E',
  THB: '฿',
  TND: 'د.ت',
  TOP: 'T$',
  TRY: '₺',
  TTD: '$',
  TWD: '角',
  TZS: 'TSh',
  UAH: '₴',
  UGX: 'USh',
  USD: '$',
  UYU: '$',
  UZS: 'лв',
  VEF: 'Bs.',
  VND: '₫',
  VUV: 'VT',
  WST: 'WS$',
  XAF: 'FCFA',
  XCD: '$',
  XOF: 'CFA',
  XPF: 'F',
  YER: '﷼',
  ZAR: 'R',
  fallback: '¤',
}

module.exports = (curr) => {
  if (symbols.hasOwnProperty(curr)) {
    return symbols[curr]
  }

  return symbols.fallback
}
