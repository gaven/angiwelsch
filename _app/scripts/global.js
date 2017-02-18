import './plugins/jquery.toggle';
import Grid from './plugins/jquery.grid';
import './plugins/jquery.overlay';
import './vendor/lightbox';
import Active from './utils/active-nav';

$(() => {
  $('.site-header__toggle').toggle();
  $(window).overlay();

  $('.video__item > a').magnificPopup({
    type: 'iframe',
    enableEscapeKey: true,
    closeOnBgClick: true
  });

  new Active;
  new Grid;
});
