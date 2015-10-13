import global from 'global';

class Header {
  constructor() {
    this.state = {
      title: 'Gengi.is',
      subtitle: '',
      edit: false,
    };

    this.$wrap = $('header');
    this.$hgroup = this.$wrap.find('hgroup');

    this.$path = this.$wrap.find('[path]');
    this.$path.$code = this.$path.find('[code]');
    this.$path.$amount = this.$path.find('[amount]');
  }

  update(params) {
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
