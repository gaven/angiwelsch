import 'imagesloaded';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import plugify from '../utils/plugify';

class Grid {
  constructor (el, options) {
    this.$el = el;
    this.options = options;

    this.$gridItem = $(this.options.gridItem);
    this.$gridWrapper = $(this.options.gridWrapper);

    jQueryBridget('masonry', Masonry, $);
    this.$el.on('load', $.proxy(this.init, this));
  }

  init () {
    this.$gridWrapper.imagesLoaded(() => {
      this.$gridItem.addClass('loaded');
      this.$gridWrapper.masonry();
    });
  }
}

plugify('masonry_grid', Grid, {
  gridWrapper: '.grid__wrapper',
  gridItem: '.grid__item'
});
