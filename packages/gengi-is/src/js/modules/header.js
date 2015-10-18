import jquery from 'jquery'; // jshint ignore:line
import underscore from 'underscore'; // jshint ignore:line
import global from 'global';

class Header {
  constructor() {
    this._defaults = {
      title: 'Gengi.is',
      subtitle: '',
      edit: false,
    };

    this.state = _.clone(this._defaults);

    this.$wrap = $('header');
    this.$hgroup = this.$wrap.find('hgroup');

    this.$path = this.$wrap.find('[path]');
    this.$path.$code = this.$path.find('[code]');
    this.$path.$amount = this.$path.find('[amount]');
  }

  update(params) {
    params = $.extend({}, this._defaults, params);
    $.extend(this.state, params);
    this.redraw();
  }

  redraw() {
    this.$hgroup.find('[title]').text(this.state.title);
    this.$hgroup.find('[subtitle]').text(this.state.subtitle);

    this.$hgroup.attr('subtitle', !!this.state.subtitle);

    if (global.getAttr('view') === 'calculator') {
      this.$path.$code.text(this.state.title);
      this.$path.$amount.text(this.state.amount);
    }
  }
}

export default new Header();
