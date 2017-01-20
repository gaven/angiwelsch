import plugify from '../utils/plugify';

class Overlay {
  constructor(el, options) {
    this.$el = el,
    this.options = options;
  }
}

plugify('overlay', Overlay, {
  
});
