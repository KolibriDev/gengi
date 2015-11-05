import _ from 'modules/underscore';
import global from 'global';
import currencies from 'modules/currencies';
import calculator from 'modules/calculator';
import templates from 'modules/templates';
import header from 'modules/header';
import format from 'modules/format';

class View {
  constructor() {}

  loaded(callback) {
    setTimeout(() => {
      $(document).trigger('loaded');
      if (typeof callback === 'function') {
        callback();
      }
    },50);
  }

  showHome() {
    header.update({title: 'Gengi.is'});
    global.setAttr('view', 'home');
    global.setAttr('editable', true);
    let currs = currencies.selected();
    let $tplParent;
    currs.done((data) => {
      header.redraw();
      templates.clearParent('list-item');
      templates.clearParent('all-currencies');
      _.each(data, (curr) => {
        let item;
        if (curr.code === 'globe') {
          item = templates.populateAndAppend('all-currencies', {
            code: curr.code,
            title: curr.title,
            alttitle: curr.alttitle,
            name: curr.name,
          });
        } else {
          if (curr.rate < 1 ) {
            curr.rate = format.numberIcelandic(curr.rate, 5);
            curr.low = true;
          } else {
            curr.rate = format.numberIcelandic(curr.rate, 2);
            curr.low = false;
          }
          curr.onhome = true;
          item = templates.populateAndAppend('list-item', curr);

        }

        $tplParent = $tplParent || item.$parent;
      });

      this.loaded(() => {
        $tplParent.find('currency').find('curr-selected').off('click.onhome').on('click.onhome', (event) => {
          event.stopPropagation();

          let $target = $(event.currentTarget);
          let code = $target.parent().attr('code');

          if ($target.attr('onhome') === 'true') {
            currencies.removeSelected(code);
            $target.attr('onhome', false);
            $target.parent().addClass('hide');
          } else {
            currencies.addSelected(code);
            $target.attr('onhome', true);
          }
        });
      });
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showCalculator(curr, amount) {
    curr = curr.toString().toUpperCase();
    let foo = currencies.get(curr);
    global.setAttr('view', 'calculator');
    global.setAttr('editable', false);
    foo.done((data) => {
      header.update({
        title: data.code,
        subtitle: data.name,
        amount: amount || 1,
      });
      calculator.show(data, amount);

      this.loaded();
    });
    foo.fail((data) => this.showError('404-curr', { curr, amount, data }));
  }

  showAllCurrencies() {
    header.update({title: 'Allar myntir'});
    global.setAttr('view', 'allcurrencies');
    global.setAttr('editable', true);
    let currs = currencies.list();
    let $tplParent;

    currs.done((data) => {
      templates.clearParent('all-currencies');
      templates.clearParent('list-item');
      _.each(data.list, (curr) => {
        if (curr.rate < 1 ) {
          curr.rate = format.numberIcelandic(curr.rate, 5);
          curr.low = true;
        } else {
          curr.rate = format.numberIcelandic(curr.rate, 2);
          curr.low = false;
        }
        curr.onhome = currencies.isSelected(curr.code);

        let item = templates.populateAndAppend('list-item', curr);
        $tplParent = $tplParent || item.$parent;
      });

      this.loaded(() => {
        $tplParent.find('currency').find('curr-selected').off('click.onhome').on('click.onhome', (event) => {
          event.stopPropagation();

          let $target = $(event.currentTarget);
          let code = $target.parent().attr('code');

          if ($target.attr('onhome') === 'true') {
            currencies.removeSelected(code);
            $target.attr('onhome', false);
          } else {
            currencies.addSelected(code);
            $target.attr('onhome', true);
          }
        });
      });
    });

    currs.progress((ignore) => console.info('ignoring progress', ignore));
    currs.fail((ignore) => console.warn('ignoring failure', ignore));
  }

  showAbout(path) {
    let sub = 'main';
    let split = path.split('-');
    if (split.length === 2) {
      sub = split[1];
    }
    let subtitle = '';
    if (sub !== 'main') {
      subtitle = sub === 'usage' ? 'Notkun' : subtitle;
      subtitle = sub === 'whatisnew' ? 'Nýtt í v2' : subtitle;
      subtitle = sub === 'tech' ? 'Tæknin' : subtitle;
      subtitle = sub === 'whodunnit' ? 'The usual suspects.' : subtitle;
    }

    header.update({title: 'Um Gengi.is', subtitle: subtitle});
    global.setAttr('view', 'about-' + sub);
    global.setAttr('editable', false);

    this.loaded();
  }

  showEmpty() {}

  showError(type, data) {
    console.log(type, data);

    let title = '', subtitle = '';

    if (type.indexOf('404') > -1) {
      if (type === '404-curr' && data && data.curr) {
        title = `${data.curr} er ekki til`;
        subtitle = 'Smelltu á örina til að fara til baka';
      } else if (data && data.path && false) {
        title = `${data.path} er ekki alvöru síða`;
        subtitle = 'Smelltu á örina til að fara til baka';
      } else {
        title = `Do what I do`;
        subtitle = 'Hold tight and pretend it’s a plan!';
      }
    } else {
      title = 'Oh shit, oh shit';
      let subtitles = [
        'Hasta la vista baby',
        'Fuck you, asshole',
        'I need your clothes, your boots and your motorcycle',
        'Why do you cry?',
        'Come with me if you want to live',
        'Terminated',
        'I need a vacation',
        'I’ll be back',

        'Bow ties are cool',
        'Whatever you do, don’t blink',
      ];
      subtitle = subtitles[_.random(0,subtitles.length - 1)];
    }

    header.update({title, subtitle});
    global.setAttr('view', 'error');
    global.setAttr('editable', false);

    this.loaded();
  }

}

export default new View();
