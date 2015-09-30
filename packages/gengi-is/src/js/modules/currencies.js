import jquery from 'vendor/jquery'; // jshint ignore:line

import storage from 'modules/storage';

export default {
  source: 'http://api-v2.gengi.is/currencies',

  get: function(success, fail) {
    success = success && typeof success === 'function' ? success : () => {};
    fail = fail && typeof fail === 'function' ? fail : () => {};

    let storedCurrencies = storage.get('currencies');
    if (storedCurrencies && storedCurrencies.expires >= new Date().getTime()) {
      success(storedCurrencies);
      return;
    }

    $.ajax({
      method: 'GET',
      url: this.source,
    }).done((data) => {
      if (!data || !data.hasOwnProperty('list')) {
        fail(storedCurrencies);
        return;
      }
      try {
        let res = typeof data === 'string' ? JSON.parse(data) : data;
        storage.set('currencies', res);
        success(res);
      } catch(exc) {
        fail(storedCurrencies);
      }
    }).fail(() => {
      fail(storedCurrencies);
    });
  },
};
