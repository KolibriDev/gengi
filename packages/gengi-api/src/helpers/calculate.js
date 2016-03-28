import { rate as valueRate } from './values'

export const toISK = (rate, value) => valueRate(value * rate)

export const ensureCurrency = (Code) => {
  let code = Code || ''
  code = code.toString().toUpperCase()
  code = code.length > 3 ? code.substring(0, 3) : code
  return code
}

export const ensureValue = (value) => valueRate(value || 1)
