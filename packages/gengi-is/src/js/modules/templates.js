'use strict';
import jquery from 'vendor/jquery'; // jshint ignore:line

let Templates = class {
  constructor() {
    this.dictionary = {};

    $('template').each((index, template) => {
      this.set(template);
      // $(template).remove();
    });
    console.log('templates', this.dictionary);
  }

  set(template) {
    let $template = $(template);
    let name = $template.attr('name');
    let node = $template.get(0).content.cloneNode(true);

    this.dictionary[name] = {
      name: name,
      node: node,
      $parent : $template.parent(),
    };
  }

  get(name) {
    if (this.dictionary.hasOwnProperty(name)) {
      return this.dictionary[name];
    } else {
      return false;
    }
  }

  populateAndAppend(name, data) {
    if (!name || !data || !this.dictionary.hasOwnProperty(name)) {
      return false;
    }
    let item = this.populate(name, data);
    item.$parent.append(item.$el);
    $(document).trigger('partial-loaded');
  }

  populate(name, data) {
    if (!name || !data || !this.dictionary.hasOwnProperty(name)) {
      return false;
    }
    let item = this.dictionary[name];
    item.el = item.node.cloneNode(true);
    item.$el = $(item.el);

    item.$el.find('[tpl]').each((i, sub) => {
      let name = $(sub).attr('tpl');
      if (data.hasOwnProperty(name)) {
        $(sub).html(data[name]);
        $(sub).removeAttr('tpl');
      }
    });
    item.$el.find('[attr]').each((i, sub) => {
      let name = $(sub).attr('attr');
      if (data.hasOwnProperty(name)) {
        $(sub).attr(name, data[name]);
        $(sub).removeAttr('attr');
      }
    });

    return item;
  }
};

export default new Templates();
