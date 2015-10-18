import underscore from 'vendor/underscore'; // jshint ignore:line
import global from 'global';
import currencies from 'modules/currencies';
import calculator from 'modules/calculator';
import templates from 'modules/templates';
import header from 'modules/header';
import format from 'modules/format';

class View {
  constructor() {}

  loaded() {
    setTimeout(() => {
      $(document).trigger('loaded');
    },50);
  }

  showHome() {
    header.update({title: 'Gengi.is'});
    global.setAttr('view', 'home');
    let currs = currencies.selected();
    currs.done((data) => {
      templates.clearParent('list-item');
      _.each(data, (curr) => {
        if (curr.rate < 1 ) {
          curr.rate = format.numberIcelandic(curr.rate, 5);
          curr.low = true;
        } else {
          curr.rate = format.numberIcelandic(curr.rate, 2);
          curr.low = false;
        }
        templates.populateAndAppend('list-item', curr);
      });
      templates.clearParent('all-currencies');
      templates.populateAndAppend('all-currencies', {
        code: 'globe',
        name: 'Allar myntir',
      });

      this.loaded();
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showCalculator(curr, amount) {
    curr = curr.toString().toUpperCase();
    let foo = currencies.get(curr);
    global.setAttr('view', 'calculator');
    foo.done((data) => {
      header.update({
        title: data.code,
        subtitle: data.name,
        amount: amount || 1,
      });
      calculator.show(data, amount);

      this.loaded();
    });
    foo.fail((data) => this.showError(data));
  }

  showAllCurrencies() {
    header.update({title: 'Allar myntir'});
    global.setAttr('view', 'allcurrencies');
    let currs = currencies.list();

    currs.done((data) => {
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
        templates.populateAndAppend('list-item', curr);
      });

      this.loaded();
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showAbout(path) {
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
      subtitle = sub === 'whodunnit' ? 'Who dunnit?' : subtitle;
    }

    header.update({title: 'Um Gengi.is', subtitle: subtitle});
    global.setAttr('view', 'about-' + sub);

    this.loaded();
  }

  showEmpty() {}

  showError() {}

}

export default new View();
