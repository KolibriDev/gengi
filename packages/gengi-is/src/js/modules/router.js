import format from 'modules/format';

let Router = class {
  constructor() {
    this.title = null;
    this.state = window.history.state;
    this.path = window.location.pathname;
  }

  pushState(state, title, path) {
    state = state || this.state;
    title = title || this.title;
    path = path || this.path;
    window.history.pushState(state, title, path);
  }

  replaceState(state, title, path) {
    state = state || this.state;
    title = title || this.title;
    path = path || this.path;
    window.history.replaceState(state, title, path);
  }

  updateView(state) {
    this.state = state || this.state;
    this.path = '/';

    this.state['amountISK'] = format.number(this.state['amountISK']);
    this.state['amountCurr'] = format.number(this.state['amountCurr']);

    if (this.state['view'] === 'calc') {
      this.path += (this.state['currentCurrency'] ? this.state['currentCurrency'] + this.state['amountCurr'] : '');
    } else if (this.state['view'] === 'search') {
      this.path += 'search/' + this.state['term'];
    } else if (this.state['view'] !== 'list') {
      this.path += this.state['view'];
    }

    this.pushState();
  }

  updateState(state) {
    this.state = state || this.state;
    this.path = '/';
    if (this.state['view'] === 'calc') {
      this.state['amountISK'] = format.number(this.state['amountISK']);
      this.state['amountCurr'] = format.number(this.state['amountCurr']);
      this.state['formattedAmountCurr'] = format.numberURL(this.state['amountCurr']);
      this.path += this.state['currentCurrency'] ? this.state['currentCurrency'] + this.state['formattedAmountCurr'] : '';
    } else if (this.state['view'] === 'search') {
      this.path += 'search/' + this.state['term'];
    } else if (this.state['view'] !== 'list') {
      this.path += this.state['view'];
    }

    this.replaceState();
  }

  parseQuery(query) {
    query = query || window.location.pathname.substr(1).toLowerCase();
    var retobj = {
      view: 'list',
      options: {},
    };

    if (query.substring(0,5) === 'about') {
      retobj.view = 'about';
      return retobj;
    }
    if (query.substring(0,6) === 'search') {
      retobj.view = 'search';
      retobj.options.term = decodeURIComponent(query.split('/').pop());
      return retobj;
    }

    if (query.length >= 3) {
      retobj.view = 'calc';
      retobj.options.currency = format.code(query.substring(0,3));
      retobj.options.amount = '';

      if (query.length > 3) {
        retobj.options.amount = format.number(query.substring(3));
      }
    }

    return retobj;
  }
};

export default new Router();
