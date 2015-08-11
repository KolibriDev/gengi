'use strict';
define(['onLoad', 'gengi'], (onLoad, gengi) => {
  onLoad(() => {
    gengi.init(gengi);
  });
});