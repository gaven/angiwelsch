import './plugins/jquery.toggle';
import './plugins/jquery.grid';
import './plugins/jquery.overlay';
import './vendor/lightbox';
import Grid from './plugins/jquery.grid';
import Active from './utils/active-nav';

$(() => {
  $('.site-header__toggle').toggle();
  $(document).overlay();

  $('.video__item > a').magnificPopup({
    type: 'iframe',
    enableEscapeKey: true,
    closeOnBgClick: true
  });

  new Active;
  new Grid;
});
