'use strict';
import jquery from 'vendor/jquery'; // jshint ignore:line
import onLoad from 'modules/onLoad';
import router from 'modules/router';
import keys from 'modules/keys';

if (!router.supported) { return; }

var selector = 'a';
selector += ':not([href^="javascript:"])';
selector += ':not([target])';
selector += ':not([lang])';
selector += ':not([modal])';
selector += ':not([href^=mailto])';
selector += ':not([href^=tel])';
selector += ':not([href^=http])';
selector += ':not([href^=#])';
selector += ', [route]';

var clickHandler = function(event) {

  if (event.currentTarget.tagName === 'A') {
    if (keys.isClickModifier(event)) { return; }
    router.navigate(event.currentTarget.pathname || $(event.currentTarget).attr('href'));
    event.preventDefault();
    return false;
  } else {
    let href = '';
    let $target = $(event.currentTarget);
    let view = $target.attr('route');


    if (view === 'back') {
      window.history.back();
      return;
    } else if (view === 'calculator') {
      href = $target.attr('code');
    } else if (view === 'home') {
      href = '';
    } else {
      href = view;
    }

    router.navigate(`/${href}`);
  }
};

onLoad(function(){
  $('body').find(selector).off('click.route').on('click.route', clickHandler);
});
