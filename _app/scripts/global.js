import './plugins/jquery.toggle';
import './plugins/jquery.grid';
import Active from './utils/active-nav';

$(() => {
  $('.site-header__toggle').toggle();
  $('#overlay-show').masonry_grid();
  new Active;
});
