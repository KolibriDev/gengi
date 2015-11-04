import jquery from 'vendor/jquery'; // jshint ignore:line
import _ from 'modules/underscore';
import storage from 'modules/storage';
import global from 'global';
import moment from 'vendor/moment';

export default {
  source: '//api.gengi.is/v2/currencies',

  get: function(id) {
    let deferred = jQuery.Deferred();
    let foo = this.list();

    foo.done((data) => {
      if (data.list.hasOwnProperty(id)) {
        deferred.resolve(data.list[id]);
      } else {
        deferred.reject({reason: `${id} not found`});
      }
    });

    return $.when( deferred.promise() );
  },

  list: function() {
    let deferred = jQuery.Deferred();

    let now = new Date().getTime();

    let storedCurrencies = storage.get('currencies');
    //if (false) {
    if (storedCurrencies && storedCurrencies.expires >= now) {
      deferred.resolve(storedCurrencies);
    } else {
      // TODO use locale
      global.setAttr('expired-text', 'síðast uppfært <br>' + moment(moment(storedCurrencies.expires).subtract(1, 'day')).fromNow());
      global.setAttr('expired', 'true');

      $.ajax({
        method: 'GET',
        url: this.source,
      }).done((data) => {
        if (!data || !data.hasOwnProperty('list')) {
          deferred.reject(storedCurrencies, {reason: 'invalid response'});
          return;
        }
        try {
          let res = typeof data === 'string' ? JSON.parse(data) : data;
          storage.set('currencies', res);
          global.setAttr('expired-text', '');
          global.setAttr('expired', 'false');
          deferred.resolve(res);
        } catch(exc) {
          deferred.reject(storedCurrencies, {reason: 'failed to parse json'});
        }
      }).fail(() => {
        deferred.reject(storedCurrencies, {reason: 'transport layer error'});
      });
    }

    return $.when( deferred.promise() );
  },

  addSelected: function(code) {
    if (this.isSelected(code)) { return; }

    let stored = this.ensureSelected();
    if (stored[stored.length - 1] === 'globe') {
      stored = _.without(stored, 'globe');
      stored.push(code);
      stored.push('globe');
    } else {
      stored.push(code);
    }

    storage.set('selectedCurrencies', stored);
  },
  removeSelected: function(code) {
    if (!this.isSelected(code)) { return; }

    let stored = this.ensureSelected();
    stored = _.without(stored, code);

    storage.set('selectedCurrencies', stored);
  },

  isSelected: function(code) {
    let stored = this.ensureSelected();

    return _.indexOf(stored, code) !== -1;
  },

  ensureSelected: function() {
    let stored = storage.get('selectedCurrencies');

    if (!stored) {
      stored = [
        'USD', 'EUR', 'GBP', 'NOK', 'DKK', 'SEK', 'globe'
      ];
      storage.set('selectedCurrencies', stored);
    }

    return stored;
  },

  reorderSelected: function(newsorted) {
    storage.set('selectedCurrencies', newsorted);
  },

  selected: function() {
    let deferred = jQuery.Deferred();

    let stored = this.ensureSelected();

    let foo = this.list();

    foo.done((data) => {
      let retobj = {};

      _.each(stored, (code) => {
        let item = _.where(data.list, {code: code})[0];
        if (item) {
          retobj[code] = item;
        } else if (code === 'globe') {
          retobj[code] = {
            code: 'globe',
            title: 'Allar myntir',
            alttitle: 'Bæta við',
            name: 'Setja aðra mynt á forsíðu',
          };
        }
      });

      deferred.resolve(retobj);
    });

    foo.fail((data, param) => deferred.reject(data, param));

    return $.when( deferred.promise() );
  },
};
