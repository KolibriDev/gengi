import templates from 'modules/templates';
import calculate from 'modules/calculate';
import sanitize from 'modules/sanitize';
import format from 'modules/format';
import SwiftClick from 'vendor/swiftclick';

class Calculator {
  constructor() {
    this.amount = {
      isk: 0,
      cur: 0,
    };

    this.swiftclick = new SwiftClick(document.querySelector('numpad'));

    this.numpad();
    this.currency = {};
    this.focus = 'cur';
    this.elem = {};
  }

  calculate() {
    if (this.focus === 'isk') {
      this.setCur(calculate(1 / this.currency.rate, this.amount.isk));
    } else {
      this.setIsk(calculate(this.currency.rate, this.amount.cur));
    }
  }

  redraw() {
    $('calculator input-area currency[code!="ISK"]').toggleClass('active', this.focus === 'cur');
    $('calculator input-area currency[code="ISK"]').toggleClass('active', this.focus === 'isk');
    $('calculator input-area currency[code!="ISK"] value').html(this.amount.curDisplay || this.amount.cur);
    $('calculator input-area currency[code="ISK"] value').html(this.amount.iskDisplay || this.amount.isk);
    $('header [path] [amount]').html(this.amount.cur);
  }

  numpad() {
    $('[numpad]').off('click.numpad').on('click.numpad', (event) => {
      let key = $(event.target).attr('key');
      let newValue = this.process(this.amount[this.focus], key);

      this.setFocused(newValue);
      this.calculate();
    });
  }

  show(curr, amount) {
    amount = amount || 1;
    this.currency = curr;

    templates.clearParent('calculator-item');
    this.amount.cur = amount;
    templates.populateAndAppend('calculator-item', {code: curr.code, amount: amount});
    templates.populateAndAppend('calculator-item', {code: 'ISK'});
    $('calculator input-area currency[code]').off('click.calc').on('click.calc', (event) => {
      let $el = $(event.currentTarget);
      let code = $el.attr('code');
      this.focus = code.toString().toLowerCase() === 'isk' ? 'isk' : 'cur';
      this.redraw();
    });
    this.calculate();
    this.swiftclick.replaceNodeNamesToTrack(['num']);
  }

  setFocused(newValue) {
    if (this.focus === 'isk') {
      this.setIsk(newValue);
    } else {
      this.setCur(newValue);
    }
  }

  setIsk(newValue) {
    this.amount.isk = sanitize.number(newValue) || this.amount.isk;
    this.amount.iskDisplay = format.numberIcelandic(this.amount.isk);
    this.redraw();
  }
  setCur(newValue) {
    this.amount.cur = sanitize.number(newValue) || this.amount.cur;
    this.amount.curDisplay = format.numberIcelandic(this.amount.cur);
    this.redraw();

    $(document).trigger('amount-changed', {code: this.currency.code, amount: this.amount.cur});
  }

  process(value, key) {
    value = value ? value.toString() : '';
    if (!key) { return; }
    if (value === '0') {
      value = '';
    }
    if (value.substring(value.length - 1) === '.') {
      value = value.replace('.','');
    }
    // if (key === 'escape') {
    //   return 'show-list';
    // } else if (key === 'arrow-up') {
    //   return 'activate-curr';
    // } else if (key === 'arrow-down') {
    //   return 'activate-isk';
    // } else
    if (key === ',' || key === 'comma') {
      if (value.indexOf('.') === -1 && value.substring(value.length - 1) !== ',') {
        value = value.length >= 1 ? value + ',' : '0' + ',';
      }
    } else if (key === 'del' || key === 'delete' || key === 'backspace') {
      value = value.slice(0, -1);
    } else {
      value += key.replace('numpad-','');
    }
    return value;
  }
}

export default new Calculator();
