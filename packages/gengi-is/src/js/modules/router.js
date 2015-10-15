// import keys from 'keys';
// import format from 'modules/format';
import global from 'global';
import analytics from 'modules/analytics';
import view from 'modules/view';
import historySupported from 'support/history';

let Router = class {
  constructor() {
    this.supported = historySupported;

    this.state = {
      title: null,
      state: window.history.state || null,
      path: window.location.pathname || ''
    };

    this.setState('path', this.state.path);

    this.processPath();

    window.onpopstate = () => {
      this.processPath(window.location.pathname);
    };

    $(document).on('amount-changed', (event, data) => {
      this.setState('path', '/' + data.code.toUpperCase() + data.amount.toString());
      this.replaceState();
    });
  }

  processPath(path) {
    path = path || this.state.path;
    let split = path.split('/');

    if (split.length < 2 || (split.length === 2 && split[1] === '') || (split[1] === 'home')) {
      view.showHome(); return;
    }

    let part = split[1];

    if (part === 'allcurrencies') {
      view.showAllCurrencies();
    } else if (part === 'about') {
      view.showAbout();
    } else {
      let [code, amount] = this.isCurrency(part); // BEWARE :) það þarf að tryggja að það sé alltaf skilað valid array.
      if (code) {
        view.showCalculator(code, amount);
      } else {
        view.showHome();
      }
    }
  }

  isCurrency(part) {
    let amount, code;

    part.replace(/(\D+)/, (match, p1) => {
      code = p1;
    });
    part.replace(/([0-9]+)/, (match, p1) => {
      amount = +p1;
    });

    return code.length === 3 ? [code, amount] : [undefined]; // BEWARE :) það þarf að tryggja að það sé alltaf skilað valid array.
  }


  pushState(state, title, path) {
    state = state || this.state.state;
    title = title || this.state.title;
    path = path || this.state.path;
    window.history.pushState(state, title, path);

    analytics('send', 'pageview', {
      page: analytics.cleanUrl(path),
      title: title,
    });
  }

  replaceState(state, title, path) {
    state = state || this.state.state;
    title = title || this.state.title;
    path = path || this.state.path;
    window.history.replaceState(state, title, path);
  }

  setState(key, value) {
    this.state[key] = value;
    global.setAttr(key, value);
  }

  hardNavigate(path) {
    window.location.href = path;
  }

  navigate(newpath) {
    $(document).trigger('loading');

    this.setState('path', newpath);
    this.pushState();
    this.processPath();
  }

  back() {
    $(document).trigger('loading');
    window.history.back();
  }
};

export default new Router();
