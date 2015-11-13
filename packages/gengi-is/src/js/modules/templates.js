'use strict';
import $ from 'modules/jquery';

let Templates = class {
  constructor() {
    this.dictionary = {};

    $('template').each((index, template) => {
      this.set(template);
      // $(template).remove();
    });
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

  clearParent(name) {
    let item = this.get(name);
    if (!name || !item) {
      return false;
    }
    // TODO: Clear only my own templates
    item.$parent.find('[template="' + name + '"]').remove();
  }

  populateAndAppend(name, data) {
    let item = this.populate(name, data);
    if (!name || !data || !item) {
      return false;
    }
    item.$parent.append(item.$el);
    return item;
  }

  populate(name, data) {
    let item = this.get(name);
    if (!name || !data || !item) {
      return false;
    }
    item.el = item.node.cloneNode(true);
    item.$el = $(item.el);

    item.$el.find('[template]').attr('template', name);

    item.$el.find('[tpl]').each((i, sub) => {
      let name = $(sub).attr('tpl');
      if (data.hasOwnProperty(name)) {
        $(sub).html(data[name]);
        $(sub).removeAttr('tpl');
      }
    });
    item.$el.find('[attr]').each((i, sub) => {
      if (sub.tagName === 'A' && data.hasOwnProperty('code')) {
        $(sub).attr('href', `/${data.code}`);
      }
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
