import underscore from 'vendor/underscore'; // jshint ignore:line
import global from 'global';
import currencies from 'modules/currencies';
import calculator from 'modules/calculator';
import templates from 'modules/templates';

class View {
  constructor() {}

  showHome() {
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
      $(document).trigger('partial-loaded');
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showCalculator(curr, amount) {
    curr = curr.toString().toUpperCase();
    let foo = currencies.get(curr);
    global.setAttr('view', 'calculator');
    foo.done((data) => {
      calculator.show(data, amount);
    });
    foo.fail((data) => this.showError(data));
  }

  showAllCurrencies() {
    global.setAttr('view', 'allcurrencies');
    let currs = currencies.list();

    currs.done((data) => {
      templates.clearParent('all-currencies');
      templates.clearParent('list-item');
      _.each(data.list, (curr) => {
        templates.populateAndAppend('list-item', curr);
      });
      $(document).trigger('partial-loaded');
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showAbout() {}

  showEmpty() {}

  showError() {}
}

export default new View();
