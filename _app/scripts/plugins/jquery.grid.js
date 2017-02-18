import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';

class Grid {
  constructor () {
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
