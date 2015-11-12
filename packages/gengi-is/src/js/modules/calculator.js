import global from 'global';
import _ from 'modules/underscore';
import templates from 'modules/templates';
import format from 'modules/format';
import keys from 'modules/keys';

class Calculator {

  constructor() {
    this.infinityThreshold = parseInt(global.getAttr('infinityThreshold'));

    this.amount = {
      isk: 0,
      cur: 0,
    };

    this.numpad();
    this.currency = {};
    this.focus = 'cur';
    this.elem = {
      headerpath: $('header [path] [amount]'),
      numpad: $('calculator numpad'),
    };
    this.focustimeout = 0;

    this.draw();

    let resizeTimeout = 0;
    $(window).on('resize.calculator', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.redraw();
      }, 200);
    });
  }

  calculate() {
    let rate = _(this.focus === 'isk' ? 1 / this.currency.rate : this.currency.rate).sanitizeNumber();
    let amount = _(this.amount[this.focus] || 1).sanitizeNumber();

    let value = amount * rate;
    let fix = value < 1 && value > 0.001 ? (value === 0 ? 0 : 5) : 2;
    let retValue = parseFloat(value).toFixed(fix);

    if (value > 999) {
      retValue = parseInt(retValue);
    }

    if (this.focus === 'isk') {
      this.setCur(retValue);
    } else {
      this.setIsk(retValue);
    }
  }

  numpadMagic(key) {
    key = key || '';
    key = key.replace('numpad-', '');
    key = key.replace('period', ',');
    key = key.replace('comma', ',');
    key = key.replace('decimal', ',');
    key = key.replace('backspace', 'del');
    key = key.replace('delete', 'del');

    if ((key === ',' || key === 'del') && !$('[numpad][key="' + key + '"]').hasClass('available')) {
      return;
    }

    $('[numpad][key="' + key+'"]').addClass('reset').removeClass('press');
    setTimeout(() => {
      $('[numpad][key="' + key+'"]').removeClass('reset').addClass('press');
    }, 20);

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

  setFocus(focus) {
    if ((this.focus === 'isk' && focus === 'cur') || (this.focus === 'cur' && focus === 'isk')) {
      this.elem.wrap.addClass('changing');

      clearTimeout(this.focustimeout);
      this.focustimeout = setTimeout(() => {
        this.elem.wrap.removeClass('changing');
        this.focus = focus;

        this.setFocused(focus === 'isk' ? this.amount.cur : this.amount.isk);
        this.calculate();
      },250);
    }
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
    } else if (key === 'tab') {
      this.setFocus(this.focus === 'isk' ? 'cur' : 'isk');
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
  }

  inputSize() {
    let curHuge = false, iskHuge = false;
    let curLarger = false, iskLarger = false;
    let curLarge = false, iskLarge = false;

    // TODO: Figure out a way to do this dynamically
    if (this.elem.cur && this.elem.cur.length > 0) {
      curHuge = this.amount.cur.toString().length > 12;
      curLarger = this.amount.cur.toString().length > 9;
      curLarge = this.amount.cur.toString().length > 6;
    }
    if (this.elem.isk && this.elem.isk.length > 0) {
      iskHuge = this.amount.isk.toString().length > 12;
      iskLarger = this.amount.isk.toString().length > 9;
      iskLarge = this.amount.isk.toString().length > 6;
    }
    return curHuge || iskHuge ? 'huge' : (curLarger || iskLarger ? 'larger' : (curLarge || iskLarge ? 'large': 'normal'));
  }

  isInfinity(field) {
    if (!field) { return undefined; }

    let amount = this.amount[field];

    return amount > this.infinityThreshold;
  }

  redraw() {
    if (this.elem.cur && this.elem.cur.length > 0) {
      this.elem.cur.toggleClass('active', this.focus === 'cur');
      this.elem.cur.find('value').toggleClass('empty', this.amount.cur === '');
      this.elem.cur.find('value').toggleClass('infinity', this.isInfinity('cur'));

      let curValue = this.isInfinity('cur') ? '∞' : this.amount.curDisplay || this.amount.cur;
      this.elem.cur.find('value').html(curValue);
    }

    if (this.elem.isk && this.elem.isk.length > 0) {
      this.elem.isk.toggleClass('active', this.focus === 'isk');
      this.elem.isk.find('value').toggleClass('empty', this.amount.isk === '');
      this.elem.isk.find('value').toggleClass('infinity', this.isInfinity('isk'));

      let iskValue = this.isInfinity('isk') ? '∞' : this.amount.iskDisplay || this.amount.isk;
      this.elem.isk.find('value').html(iskValue);
    }

    if (this.elem.wrap && this.elem.wrap.length > 0) {
      this.elem.wrap.attr('size',this.inputSize());
    }

    let amount = this.amount.cur;
    if (this.isInfinity('cur')) {
      amount = '∞';
    }

    this.elem.headerpath.html(amount);
    this.elem.numpad.find('[key=","]').toggleClass('available', this.amount[this.focus].toString().indexOf(',') === -1 && this.amount[this.focus].toString().indexOf('.') === -1);
    this.elem.numpad.find('[key="del"]').toggleClass('available', this.amount[this.focus].toString().length > 0);
    $(document).trigger('amount-changed', {code: this.currency.code, amount: amount});
  }

  draw() {
    templates.clearParent('calculator-item');
    templates.populateAndAppend('calculator-item', {code: 'globe'});
    templates.populateAndAppend('calculator-item', {code: 'ISK'});
    this.elem.wrap = $('calculator input-area');
    this.elem.cur = $('calculator input-area currency[code!="ISK"]');
    this.elem.isk = $('calculator input-area currency[code="ISK"]');

    this.elem.isk.off('click.calc').on('click.calc', () => {
      this.setFocus('isk');
    });
    this.elem.cur.off('click.calc').on('click.calc', () => {
      this.setFocus('cur');
    });
  }
}

export default new Calculator();
