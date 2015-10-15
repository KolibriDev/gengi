import underscore from 'vendor/underscore'; // jshint ignore:line
import global from 'global';
import currencies from 'modules/currencies';
import calculator from 'modules/calculator';
import templates from 'modules/templates';
import header from 'modules/header';

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
        templates.populateAndAppend('list-item', curr);
      });

      this.loaded();
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showAbout() {
    header.update({title: 'Um gengi.is'});
    global.setAttr('view', 'about');
  }

  showEmpty() {}

  showError() {}
}

export default new View();
