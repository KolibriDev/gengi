'use strict';
import domReady from 'domReady';
import Gengi from 'mod/gengi';

domReady(() => {
  window.gengi = new Gengi();
});
