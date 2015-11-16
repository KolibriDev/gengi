import _ from 'modules/underscore';
import global from 'global';
import currencies from 'modules/currencies';
import calculator from 'modules/calculator';
import templates from 'modules/templates';
import header from 'modules/header';
import format from 'modules/format';
import analytics from 'modules/analytics';

let updateTitle = function(title) {
  title = title || 'Gengi.is - Nýjasta gengi gjaldmiðla á svipstundu';
  document.title = title;
};

class View {
  constructor() {
    this.url = window.location.pathname;
  }

  logView() {
    analytics('send', 'pageview', {
      page: analytics.cleanUrl(this.url),
      title: document.title,
    });
  }

  loaded(callback) {
    setTimeout(() => {
      $(document).trigger('loaded');
      this.logView();
      if (typeof callback === 'function') {
        callback();
      }
    },50);
  }

  showHome() {
    this.url = window.location.pathname;
    updateTitle();
    header.update({title: 'Gengi.is'});
    global.setAttr('view', 'home');
    global.setAttr('editable', true);
    let currs = currencies.selected();

    currs.done((data) => {
      this._displayCurrs(data);
    });

    currs.fail((data) => {
      if (data) {
        this._displayCurrs(data);
        analytics.logException('Failed to get selected currencies, showing stored', false);
      } else {
        this.showError('500', 'Villa við að sækja gengi');
        analytics.logException('Failed to get selected currencies', true);
      }
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
  }

  showCalculator(curr, amount) {
    this.url = `/${curr}`;
    curr = curr.toString().toUpperCase();
    let foo = currencies.get(curr);
    global.setAttr('view', 'calculator');
    global.setAttr('editable', false);
    foo.done((data) => {
      this._displayCalc(data, curr, amount);
    });
    foo.fail((data) => {
      if (data && data.curr) {
        this._displayCalc(data, curr, amount);
        analytics.logException('Expired currencies', false);
      } else {
        this.showError('404-curr', { curr, amount, data });
        analytics.logException(`${curr} not found`, false);
      }
    });
  }

  showAllCurrencies() {
    updateTitle('Allar myntir - Gengi.is');
    header.update({title: 'Allar myntir'});
    global.setAttr('view', 'allcurrencies');
    global.setAttr('editable', true);
    let currs = currencies.list();

    currs.done((data) => {
      this._displayAllCurrs(data);
    });

    currs.fail((data) => {
      if (data) {
        this._displayAllCurrs(data);
        analytics.logException('Expired currencies', false);
      } else {
        this.showError('500', 'Villa við að sækja gengi');
        analytics.logException('Failed to get currencies', true);
      }
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
  }

  showAbout(path) {
    this.url = window.location.pathname;
    let sub = 'main';
    let split = path.split('-');
    if (split.length === 2) {
      sub = split[1];
    }
    let subtitle = '';
    if (sub !== 'main') {
      subtitle = sub === 'usage' ? 'Notkun' : subtitle;
      subtitle = sub === 'whatisnew' ? 'Nýtt í v2' : subtitle;
      subtitle = sub === 'tech' ? 'Tæknin' : subtitle;
      subtitle = sub === 'whodunnit' ? 'The usual suspects.' : subtitle;
    }

    updateTitle(`${subtitle ? subtitle + ' - ' : ''}Um Gengi.is`);

    header.update({title: 'Um Gengi.is', subtitle: subtitle});
    global.setAttr('view', 'about-' + sub);
    global.setAttr('editable', false);

    this.loaded();
  }

  showEmpty() {}

  showError(type, data) {
    this.url = window.location.pathname;
    let title = '', subtitle = '', reason = '';

    if (type.indexOf('404') !== -1) {
      if (type === '404-curr' && data && data.curr) {
        title = `${data.curr} er ekki til`;
        reason = `Því miður höfum við engan gjaldmiðil með <a target="_blank" href="https://is.wikipedia.org/wiki/ISO_4217">ISO 4217</a> kóðann&nbsp;<b>${data.curr}</b>`;
      } else if (data && data.path !== '/404') {
        title = `Slóð fannst ekki`;
        reason = `<b>${data.path}</b> er ekki alvöru síða`;
      } else if (data && data.path === '/404') {
        title = `To err is human`;
        subtitle = `Blaming it on a computer, even more so`;
        reason = `Þetta er flotta villusíðan okkar`;
      } else {
        title = `Do what I do,`;
        subtitle = 'Hold tight and pretend it’s a plan!';
      }
    } else if (type === '500') {
      title = 'Oh shit, oh shit';
      reason = data || 'Hugsanlega einhver gagnavilla, eða gagnaþjónn niðri';
    } else {
      title = 'Oh shit, oh shit';
      reason = 'Hugsanlega einhver gagnavilla, eða gagnaþjónn niðri';
    }

    let subtitles = [
      'Hasta la vista baby',
      'I need your clothes, your boots and your motorcycle',
      'Why do you cry?',
      'Come with me if you want to live',
      'Terminated',
      'I need a vacation',
      'I’ll be back',

      'Bow ties are cool',
      'Whatever you do, don’t blink',
    ];
    subtitle = subtitle || subtitles[_.random(0,subtitles.length - 1)];
    reason = reason || subtitles[_.random(0,subtitles.length - 1)];

    updateTitle(`${title} - ${subtitle} - Gengi.is`);

    header.update({title, subtitle});
    global.setAttr('view', 'error');
    global.setAttr('editable', false);

    $('[reason]').html(reason);

    analytics('send', 'event', 'error', `${type} >> ${title} - ${subtitle}: ${reason}`);

    this.loaded();
  }

  _displayCurrs(data) {
    let $tplParent;

    header.redraw();
    templates.clearParent('list-item');
    templates.clearParent('all-currencies');
    _.each(data, (curr) => {
      let item;
      if (curr.code === 'globe') {
        item = templates.populateAndAppend('all-currencies', {
          code: curr.code,
          title: curr.title,
          alttitle: curr.alttitle,
          name: curr.name,
        });
      } else {
        if (curr.rate < 1 ) {
          curr.rate = format.numberIcelandic(curr.rate, 5);
          curr.low = true;
        } else {
          curr.rate = format.numberIcelandic(curr.rate, 2);
          curr.low = false;
        }
        curr.onhome = true;
        item = templates.populateAndAppend('list-item', curr);

      }

      $tplParent = $tplParent || item.$parent;
    });

    this.loaded(() => {
      $tplParent.find('currency').find('curr-selected').off('click.onhome').on('click.onhome', (event) => {
        let $target = $(event.currentTarget);
        let code = $target.parent().attr('code');

        if ($target.attr('onhome') === 'true') {
          currencies.removeSelected(code);
          $target.attr('onhome', false);
          $target.parent().addClass('hide');
        } else {
          currencies.addSelected(code);
          $target.attr('onhome', true);
        }
        event.stopPropagation();
        return false;
      });
    });
  }

  _displayAllCurrs(data) {
    let $tplParent;

    templates.clearParent('all-currencies');
    templates.clearParent('list-item');
    _.each(data.list, (curr) => {
      if (curr.rate < 1 ) {
        curr.rate = format.numberIcelandic(curr.rate, 5);
        curr.low = true;
      } else {
        curr.rate = format.numberIcelandic(curr.rate, 2);
        curr.low = false;
      }
      curr.onhome = currencies.isSelected(curr.code);

      let item = templates.populateAndAppend('list-item', curr);
      $tplParent = $tplParent || item.$parent;
    });

    this.loaded(() => {
      $tplParent.find('currency').find('curr-selected').off('click.onhome').on('click.onhome', (event) => {
        event.stopPropagation();

        let $target = $(event.currentTarget);
        let code = $target.parent().attr('code');

        if ($target.attr('onhome') === 'true') {
          currencies.removeSelected(code);
          $target.attr('onhome', false);
        } else {
          currencies.addSelected(code);
          $target.attr('onhome', true);
        }
      });
    });
  }

  _displayCalc(data, curr, amount) {
    header.update({
      title: data.code,
      subtitle: data.name,
      amount: amount || 1,
    });
    calculator.show(data, amount);

    updateTitle(`${data.name} - ${data.code} - Gengi.is`);
    this.loaded();
  }
}

export default new View();
