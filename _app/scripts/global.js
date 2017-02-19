import './plugins/jquery.toggle';
import Grid from './plugins/jquery.grid';
import Overlay from './plugins/jquery.overlay';
import './vendor/lightbox';
import Active from './utils/active-nav';

$(() => {
  $('.site-header__toggle').toggle();

  $('.video__item > a').magnificPopup({
    type: 'iframe',
    enableEscapeKey: true,
    closeOnBgClick: true
  });

  new Active;
  new Grid;
  new Overlay;
});
