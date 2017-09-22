import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';

class Grid {
  constructor () {
    jQueryBridget('masonry', Masonry, $);
    this.$wrapper = $('.grid__wrapper');
    this.init();
    $('.grid__image').on('load', $.proxy(this.update, this));
  }

  init () {
    this.$wrapper.imagesLoaded().progress((i, img) => {
      $(img.img).parent().addClass('loaded');

      if (i.progressedCount > 15) {
        this.$wrapper.addClass('fade-in');
        this.update(img);
      }
    });
  }

  update (img) {
    if (img && img.isLoaded) {
      $(img.img).parent().addClass('loaded');
    }

    this.$wrapper.masonry({
      transitionDuration: 0
    });
  }
}

export default Grid;
