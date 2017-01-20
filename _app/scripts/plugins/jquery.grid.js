import 'imagesloaded';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';

class Grid {
  constructor () {
    jQueryBridget( 'masonry', Masonry, $ );
    $(window).on('load', this.gridInit());
  }

  gridInit () {
    const $wrapper = $('.grid__wrapper');
    const $item = $wrapper.find('.grid__item');
    $wrapper.imagesLoaded(() => {
      $item.addClass('loaded');
      $wrapper.masonry();
    });
  }
}

export default Grid;
