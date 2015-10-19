import global from 'global';
import templates from 'modules/templates';
import sanitize from 'modules/sanitize';
import format from 'modules/format';
import SwiftClick from 'vendor/swiftclick';
import keys from 'modules/keys';

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

    this.draw();
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

  numpadMagic(key) {
    key = key.replace('numpad-', '');
    key = key.replace('period', ',');
    key = key.replace('comma', ',');
    key = key.replace('decimal', ',');
    key = key.replace('backspace', 'del');
    key = key.replace('delete', 'del');

    $('[numpad][key="' + key+'"]').addClass('reset').removeClass('press');
    setTimeout(() => {
      $('[numpad][key="' + key+'"]').removeClass('reset').addClass('press');
    },50);

    let newValue = this.process(this.amount[this.focus], key);

    this.setFocused(newValue);
    this.calculate();
  }

  numpad() {
    $('[numpad]').off('click.numpad').on('click.numpad', (event) => {
      this.numpadMagic($(event.target).attr('key'));
    });

    $(document).on('visibilitychange', () => {
      if (!document.hidden && this.disableNumpad) {
        this.disableNumpad = false;
      }
    });

    this.disableNumpad = false;
    $(document).off('keyup.calc').on('keyup.calc', () => {
      if (global.getAttr('view') === 'calculator') {
        if (this.disableNumpad && keys.isFunctionalKey(event.which)) {
          this.disableNumpad = false;
        }
      }
    });

    $(document).off('keydown.calc').on('keydown.calc', (event) => {
      if (global.getAttr('view') === 'calculator') {
        if (!this.disableNumpad && keys.isFunctionalKey(event.which)) {
          this.disableNumpad = true;
        }

        if (!this.disableNumpad && keys.isNumPad(event.which)) {
          let key = keys.which(event.which);
          this.numpadMagic(key);

          event.preventDefault();
          return false;
        }
      }
    });
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
    if (key === ',' || key === 'comma' || key === '.' || key === 'period' || key === 'decimal') {
      if (value.indexOf('.') === -1 && value.indexOf(',') === -1) {
        value = value.length >= 1 ? value + ',' : '0' + ',';
      }
    } else if (key === 'del' || key === 'delete' || key === 'backspace') {
      value = value.slice(0, -1);
    } else {
      value += key;
    }
    return value;
  }

  show(curr, amount) {
    this.currency = curr;
    this.elem.cur.attr('code', curr.code);

    this.focus = 'cur';
    this.setCur(amount || '');

    this.calculate();

    this.swiftclick.replaceNodeNamesToTrack(['num']);
  }

  redraw() {
    if (this.elem.cur && this.elem.cur.length > 0) {
      this.elem.cur.toggleClass('active', this.focus === 'cur');
      this.elem.cur.find('value').toggleClass('empty', this.amount.cur === '');
      this.elem.cur.find('value').html(this.amount.curDisplay || this.amount.cur);
    }

    if (this.elem.isk && this.elem.isk.length > 0) {
      this.elem.isk.toggleClass('active', this.focus === 'isk');
      this.elem.isk.find('value').toggleClass('empty', this.amount.isk === '');
      this.elem.isk.find('value').html(this.amount.iskDisplay || this.amount.isk);
    }

    this.elem.headerpath.html(this.amount.cur);
    this.elem.numpad.find('[key="del"]').toggleClass('available', this.amount[this.focus].toString().length > 0);
  }

  draw() {
    templates.clearParent('calculator-item');
    templates.populateAndAppend('calculator-item', {code: 'globe'});
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
  }
}

export default new Calculator();
