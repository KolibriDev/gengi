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

  calculate(amount) {
    if (this.focus === 'isk') {
      this.setCur(calculate(this.currency.rate, amount));
    } else {
      this.setIsk(calculate(this.currency.rate, amount));
    }
  }

  updateDisplayValues() {
    $('calculator input-area currency[code!="ISK"] value').html(this.amount.curDisplay || this.amount.cur);
    $('calculator input-area currency[code="ISK"] value').html(this.amount.iskDisplay || this.amount.isk);
  }

  numpad() {
    $('[numpad]').off('click.numpad').on('click.numpad', (event) => {
      console.log($(event.target).attr('key'));
      this.calculate(7);

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
