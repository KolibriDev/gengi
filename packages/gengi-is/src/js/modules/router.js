// import keys from 'keys';
// import format from 'modules/format';
import global from 'global';
import analytics from 'modules/analytics';
import view from 'modules/view';
import historySupported from 'support/history';

let Router = class {
  constructor() {
    this.infinityThreshold = global.getAttr('infinityThreshold');

    this.supported = historySupported;

    this.state = {
      tick: 0,
      title: null,
      state: window.history.state || null,
      path: window.location.pathname || ''
    };

    this.setState('path', this.state.path);

    this.processPath();

    window.onpopstate = () => {
      $(document).trigger('leaving');
      setTimeout(() => {
        this.processPath(window.location.pathname);
        this.logView();
      }, 150);
    };

    $(document).on('amount-changed', (event, data) => {
      if (data && data.code) {
        this.setState('path', '/' + data.code.toUpperCase() + data.amount.toString());
        this.replaceState();
      }
    });
  }

  logView() {
    analytics('send', 'pageview', {
      page: analytics.cleanUrl(this.state.path),
      title: this.state.title,
    });
  }

  processPath(path) {
    this.setState('path', path || this.state.path);
    let split = this.state.path.split('/');

    if (split.length < 2 || (split.length === 2 && split[1] === '') || (split[1] === 'home')) {
      view.showHome();
      return;
    }

    let part = split[1].toString().toLowerCase();

    if (part === 'error' || part === '500' || part === '404') {
      view.showError(part, {path: this.state.path});
    } else if (part === 'allcurrencies') {
      view.showAllCurrencies();
    } else if (part.length > 4 && part.substring(0, 5) === 'about') {
      view.showAbout(part);
    } else {
      let [code, amount] = this.isCurrency(part);
      if (code) {
        view.showCalculator(code, amount);
      } else {
        if (part.length > 0) {
          view.showError('404', {path: this.state.path});
        } else {
          view.showHome();
        }
      }
    }
  }

  isCurrency(part) {
    let amount, code;
    part = decodeURI(part);

    if (part.length === 4 && part[0] === '∞') {
      code = part.substr(1, 3);
      amount = this.infinityThreshold+'9';
    } else if (part.length === 4 && part[3] === '∞') {
      code = part.substr(0, 3);
      amount = this.infinityThreshold+'9';
    } else {
      part.replace(/([a-z,A-Z]+)/, (match, p1) => {
        code = p1;
      });

      part.replace(/([0-9.,]+)/, (match, p1) => {
        p1 = p1.toString().replace(',','.');
        amount = +p1;
      });
    }

    return code.length === 3 ? [code, amount] : [undefined]; // BEWARE :) það þarf að tryggja að það sé alltaf skilað valid array.
  }

  pushState(state, title, path) {
    this.setState('path', path || this.state.path);
    this.state.state = state || this.state.state;
    this.state.title = title || this.state.title;
    window.history.pushState(this.state.state, this.state.title, this.state.path);
    this.logView();
  }

  replaceState(state, title, path) {
    this.setState('path', path || this.state.path);
    this.state.state = state || this.state.state;
    this.state.title = title || this.state.title;
    window.history.replaceState(this.state.state, this.state.title, this.state.path);
  }

  setState(key, value) {
    this.state[key] = value;
    global.setAttr(key, value);
  }

  hardNavigate(path) {
    window.location.href = path;
  }

  navigate(newpath) {
    this.state.tick++;
    this.setState('path', newpath);
    this.pushState();
    this.processPath();
  }

  back() {
    let view = global.getAttr('view');
    if (view !== 'about-main' && view.indexOf('about-') === 0) {
      $(document).trigger('leaving');
      setTimeout(() => {
        this.navigate('/about');
      }, 150);
    } else if (this.state.tick > 1 && view === 'calculator') {
      window.history.back();
    } else {
      $(document).trigger('leaving');
      setTimeout(() => {
        this.navigate('/');
      }, 150);
    }
  }
};

export default new Router();
