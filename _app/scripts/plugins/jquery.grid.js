import Masonry from 'masonry-layout';
import 'imagesloaded';

class Grid {
  constructor () {
    $(window).on('load', this.gridInit());
  }

  gridInit () {
    const $wrapper = $('.grid__wrapper');
    const $item = $wrapper.find('.grid__item');
    $item.each(function () {
      $(this).imagesLoaded(function () {
        $item.addClass('loaded');
        
      });
    });
  }
}

export default Grid;
