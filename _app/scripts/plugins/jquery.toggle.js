import plugify from '../utils/plugify';

class Toggle {
  constructor (el, options) {
    this.$el = el;
    this.options = options;

    this.$menu = $(this.options.menu);

    this.$el.on('click', $.proxy(this.addRemove, this));
  }

  addRemove (e) {
    if (e) {
      e.preventDefault();
    }
    this.$menu.toggleClass(this.options.className);
  }

  destroy () {
    this.$el.off('click', this.addRemove);
  }
}

plugify('toggle', Toggle, {
  className: 'active',
  menu: '.mobile-menu'
});
