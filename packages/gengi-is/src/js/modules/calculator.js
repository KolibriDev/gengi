import templates from 'modules/templates';
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
    this.elem = {
      headerpath: $('header [path] [amount]'),
      numpad: $('calculator numpad'),
    };
  }

  calculate() {
    let rate = sanitize.number(this.focus === 'isk' ? 1 / this.currency.rate : this.currency.rate);
    let amount = sanitize.number(this.amount[this.focus] || 1);

    let value = amount * rate;
    let fix = value < 1 && value > 0.001 ? (value === 0 ? 0 : 5) : 2;

    let retValue = parseFloat(value).toFixed(fix);

    if (this.focus === 'isk') {
      this.setCur(retValue);
    } else {
      this.setIsk(retValue);
    }
  }

  redraw() {
    this.elem.cur.toggleClass('active', this.focus === 'cur');
    this.elem.cur.find('value').toggleClass('empty', this.amount.cur === '');
    this.elem.cur.find('value').html(this.amount.curDisplay || this.amount.cur);

    this.elem.isk.toggleClass('active', this.focus === 'isk');
    this.elem.isk.find('value').toggleClass('empty', this.amount.isk === '');
    this.elem.isk.find('value').html(this.amount.iskDisplay || this.amount.isk);

    this.elem.headerpath.html(this.amount.cur);
    this.elem.numpad.find('[key="del"]').toggleClass('available', this.amount[this.focus].toString().length > 0);
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
    amount = amount || '';
    this.currency = curr;

    templates.clearParent('calculator-item');
    this.amount.cur = amount;
    templates.populateAndAppend('calculator-item', {code: curr.code, amount: amount});
    templates.populateAndAppend('calculator-item', {code: 'ISK'});
    this.elem.cur = $('calculator input-area currency[code!="ISK"]');
    this.elem.isk = $('calculator input-area currency[code="ISK"]');

    this.elem.isk.off('click.calc').on('click.calc', () => {
      this.focus = 'isk';
      this.redraw();
    });
    this.elem.cur.off('click.calc').on('click.calc', () => {
      this.focus = 'cur';
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
    this.amount.isk = newValue;
    this.amount.iskDisplay = format.numberIcelandic(this.amount.isk);
    this.redraw();
  }

  setCur(newValue) {
    this.amount.cur = newValue;
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
    if (key === ',' || key === 'comma') {
      if (value.indexOf('.') === -1 && value.indexOf(',') === -1) {
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
