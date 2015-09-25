import sanitize from 'modules/sanitize';

export default (rate, amount) => {
  if (!rate) { return;}

  amount = sanitize.number(amount);
  rate = sanitize.number(rate);

  let value = amount * rate;
  let fix = value < 1 && value > 0.001 ? (value === 0 ? 0 : 5) : 2;

  return parseFloat(value).toFixed(fix);
};
