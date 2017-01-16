// import isotope from 'isotope-layout';
import loaded from 'imagesloaded';

class Grid {
  constructor () {
    $(window).on('load', this.duplicateImage());
  }

  duplicateImage () {
    const $wrapper = $('.grid__wrapper');
    const $items = $wrapper.find('.grid__item');

    $items.each(function () {
      $(this).loaded(() => {
        const $image = $(this).find('.grid__image');
      });
    });
  }
}


export default Grid;
