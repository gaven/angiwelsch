import 'imagesloaded';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';

class Grid {
  constructor (el, options) {
    this.$el = el;
    this.options = options;

    jQueryBridget('masonry', Masonry, $);
    this.init();
  }

  init () {
    $('.grid__wrapper').imagesLoaded(() => {
      $('.grid__item').addClass('loaded');
      $('.grid__wrapper').masonry();
    });
  }
}

export default Grid;
