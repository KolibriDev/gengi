import jquery from 'vendor/jquery'; // jshint ignore:line

import storage from 'modules/storage';

export default {
  source: 'http://api-v2.gengi.is/currencies',

  _list: false,

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

    let storedCurrencies = this._list || storage.get('currencies');
    if (storedCurrencies && storedCurrencies.expires >= new Date().getTime()) {
      deferred.resolve(storedCurrencies);
    } else {
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
          this._list = res;
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

  selected: function() {
    let deferred = jQuery.Deferred();

    let stored = storage.get('selectedCurrencies');

    if (!stored) {
      stored = [
        'EUR', 'USD', 'GBP'
      ];
      storage.set('selectedCurrencies', stored);
    }

    let foo = this.list();

    foo.done((data) => {
      let retobj = {};

      _.each(data.list, (item, key) => {
        if (_.indexOf(stored, key) !== -1) {
          retobj[key] = item;
        }
      });

      deferred.resolve(retobj);
    });

    foo.fail((data, param) => deferred.reject(data, param));

    return $.when( deferred.promise() );
  },
};
