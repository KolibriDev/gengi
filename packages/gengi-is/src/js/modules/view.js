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
      this.showList(data, {});
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showCalculator(curr, amount) {
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
      this.showList(data, {});
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showAbout() {}

  showEmpty() {}

  showError() {}

  showList(currs) {
    templates.clearParent('list-item');
    _.each(currs, (curr) => {
      templates.populateAndAppend('list-item', curr);
    });
    $(document).trigger('partial-loaded');
  }
}

export default new View();
