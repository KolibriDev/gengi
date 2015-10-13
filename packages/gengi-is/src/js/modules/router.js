// import keys from 'keys';
// import format from 'modules/format';
import global from 'global';
import analytics from 'modules/analytics';
import view from 'modules/view';
import historySupported from 'support/history';

let Router = class {
  constructor() {
    console.info('Router constructed');
    this.supported = historySupported;

    this.state = {
      title: null,
      state: window.history.state || null,
      path: window.location.pathname || '',
    };

    this.setState('path', this.state.path);

    this.processPath();

    window.onpopstate = () => {
      this.processPath(window.location.pathname);
    };
  }

  processPath(path) {
    path = path || this.state.path;
    let split = path.split('/');

    if (split.length < 1 || (split.length === 2 && split[1] === '') || (split[1] === 'home')) { view.showHome(); return; }

    let part = split[1];
    part = part.toUpperCase();
    if (this.isCurrency(part)) {
      view.showCalculator(part);
    } else {
      view.showHome();
    }
  }

  isCurrency(part) {
    return part.toString().length === 3;
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
    $(document).trigger('partial-loading');

    this.setState('path', newpath);
    this.pushState();
    this.processPath();
  }
};

export default new Router();
