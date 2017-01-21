import './plugins/jquery.toggle.js';
import './plugins/jquery.grid.js';

$(() => {
  $('.site-header__toggle').toggle();
  $('#overlay-show').masonry_grid();
});
