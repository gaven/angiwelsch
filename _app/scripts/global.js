import './plugins/jquery.toggle';
import './plugins/jquery.grid';
import './vendor/lightbox';
import Active from './utils/active-nav';

$(() => {
  $('.site-header__toggle').toggle();
  $('#overlay-show').masonry_grid();

  $('.video__item > a').magnificPopup({
    type: 'iframe',
    enableEscapeKey: true,
    closeOnBgClick: true
  });

  new Active;
});
