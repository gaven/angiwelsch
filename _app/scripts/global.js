import './plugins/jquery.toggle.js';
import Grid from './plugins/jquery.grid.js';

$(() => {
  $('.site-header__toggle').toggle();

  new Grid;
});
