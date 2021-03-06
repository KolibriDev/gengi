import $ from 'modules/jquery';
import _ from 'modules/underscore';
import storage from 'modules/storage';
import global from 'global';
import momentjs from 'vendor/momentjs';

export default {
  source: '//api.gengi.is/currencies',

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

    foo.fail((data) => {
      if(data && data.list.hasOwnProperty(id)) {
        deferred.reject(data.list[id], {reason: `${id} probably expired`});
      } else {
        deferred.reject({reason: `${id} not found`});
      }
    });

    return $.when( deferred.promise() );
  },

  list: function() {
    let deferred = jQuery.Deferred();

    let now;
    now = new Date().getTime();

    momentjs().calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: 'Í GÆR',
      lastWeek: '[Last] dddd'
    });

    let storedCurrencies = storage.get('currencies');

    // if (false) {
    if (storedCurrencies && _.isObject(storedCurrencies) && storedCurrencies.expires >= now) {
      deferred.resolve(storedCurrencies);
    } else {
      let expires = (storedCurrencies && storedCurrencies.expires) || (momentjs().seconds(0).hour(0).minutes(0).unix() * 1000);
      // Fake expired
      // expires = 1447429200000;
      let magicdate = momentjs(expires).subtract(1, 'day').fromNow();

      magicdate = magicdate.replace(' síðan', '');
      magicdate = magicdate.replace('fyrir degi', 'í gær');
      global.setAttr('expired-text', `Síðast&nbsp;uppfært<br><b>${magicdate}</b>`);
      global.setAttr('expired', 'true');
      // deferred.reject(storedCurrencies, {reason: 'transport layer error'});

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
    stored.push(code);

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

    if (!stored || !_.isArray(stored)) {
      stored = [
        'USD', 'EUR', 'GBP', 'NOK', 'DKK', 'SEK'
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
        }
      });

      deferred.resolve(retobj);
    });

    foo.fail((data, param) => {
      let retobj = {};

      _.each(stored, (code) => {
        let item = _.where(data.list, {code: code})[0];
        if (item) {
          retobj[code] = item;
        }
      });

      deferred.reject(retobj, param);
    });

    return $.when( deferred.promise() );
  },
};
