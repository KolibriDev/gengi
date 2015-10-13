import templates from 'modules/templates';
import calculate from 'modules/calculate';
import sanitize from 'modules/sanitize';
import format from 'modules/format';

class Calculator {
  constructor() {
    this.amount = {
      isk: 0,
      cur: 0,
    };

    this.numpad();
    this.currency = {};
    this.focus = 'cur';
    this.elem = {};
  }

  calculate() {
    if (this.focus === 'isk') {
      this.setCur(calculate(this.currency.rate, this.amount.isk));
    } else {
      this.setIsk(calculate(this.currency.rate, this.amount.cur));
    }
  }

  updateDisplayValues() {
    $('calculator input-area currency[code!="ISK"] value').html(this.amount.curDisplay || this.amount.cur);
    $('calculator input-area currency[code="ISK"] value').html(this.amount.iskDisplay || this.amount.isk);
    $('header [path] [amount]').html(this.amount.cur);
  }

  numpad() {
    $('[numpad]').off('click.numpad').on('click.numpad', (event) => {
      this.setCur($(event.target).attr('key'));
      this.calculate();
    });
  }

  show(curr, amount) {
    amount = amount || 1;
    this.currency = curr;

    templates.clearParent('calculator-item');
    this.elem.cur = templates.populateAndAppend('calculator-item', {code: curr.code, amount: amount});
    this.elem.isk = templates.populateAndAppend('calculator-item', {code: 'ISK'});
    this.calculate();
  }

  setIsk(newValue) {
    this.amount.isk = sanitize.number(newValue) || this.amount.isk;
    this.amount.iskDisplay = format.numberIcelandic(this.amount.isk);
    this.updateDisplayValues();
  }
  setCur(newValue) {
    this.amount.cur = sanitize.number(newValue) || this.amount.cur;
    this.amount.curDisplay = format.numberIcelandic(this.amount.cur);
    this.updateDisplayValues();
  }
}

export default new Calculator();
