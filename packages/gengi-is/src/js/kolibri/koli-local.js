'use strict';
define([], () => {
  var _local = {
    set: (dataName, data) => {
      if (data === undefined) {
        console.warn('No data provided for "%s"\n', dataName, data);
        return false;
      }
      window.localStorage.setItem(dataName, data);
      return true;
    },

    get: dataName => {
      var data = window.localStorage.getItem(dataName);
      return (!data || data === '{}' || data === '[]') ? false : data;
    },

    clear: dataName =>  {
      window.localStorage.removeItem(dataName);
    },

    clearAll: function(){
      window.localStorage.clear();
    },

    setJSON: (dataName, data) => {
      if (data === undefined) {
        console.warn('No data provided for "%s"\n', dataName, data);
        return false;
      }

      try {
        return _local.set(dataName, JSON.stringify(data));
      } catch(exc) {
        console.warn(exc);
        return false;
      }
    },

    getJSON: dataName => {
      var unParsedData = _local.get(dataName);
      if (!unParsedData) { return false; }

      try {
        return JSON.parse(unParsedData);
      } catch(exc) {
        console.warn(exc);
        return false;
      }
    },
  };

  return _local;
});