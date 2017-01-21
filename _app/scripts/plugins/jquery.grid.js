import 'imagesloaded';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import plugify from '../utils/plugify';

class Grid {
  constructor (el, options) {
    this.$el = el;
    this.options = options;

    this.$gridImage = $(this.options.gridImage);
    this.$gridItem = $(this.options.gridItem);
    this.$gridWrapper = $(this.options.gridWrapper);

    this.$overlayItem = $(this.options.overlayItem);
    this.$overlayWrapper = $(this.options.overlayWrapper);
    this.$overlayContainer = $(this.options.overlayContainer);

    jQueryBridget('masonry', Masonry, $);
    $(window).on('load', $.proxy(this.init, this));
    this.$el.on('click', $.proxy(this.overlay, this));
    $('#overlay-hide').on('click', $.proxy(this.close, this));
  }

  init () {
    this.$gridWrapper.imagesLoaded(() => {
      this.$gridItem.addClass('loaded');
      this.$gridWrapper.masonry();
    });
    this.clone();
    this.alter();
    this.openImage();
  }

  clone () {
    this.$gridItem.each(function () {
      $(this).clone().appendTo('.overlay__wrapper');
    });
  }

  alter () {
    const $overlayItem = $(this.options.overlayWrapper).find(this.options.gridItem);
    const $overlayImage = $overlayItem.find(this.options.gridImage);

    $overlayItem.each(function () {
      $(this)
        .removeClass('grid__item')
        .addClass('overlay__item');
    });

    $overlayImage.each(function () {
      const data = $(this).attr('data-original');
      $(this)
        .attr('src', data)
        .removeClass('grid__image')
        .addClass('overlay__image');
    });
  }

  overlay (e) {
    if (e) {
      e.preventDefault();
    }
    this.open();
  }

  openImage () {
    this.$gridImage.each(function () {
      $(this).on('click', function (e) {
        if (e) {
          e.preventDefault();
        }

        const src = $(this).closest('li').index() + 1;
        const dist = $(`.overlay__item:nth-child(${src})`).offset().left;
        const left = 229;

        if ($(window).width() > 1024) {
          $('#overlay')
            .scrollLeft(dist - left)
            .removeClass('visibility-hidden');

          setTimeout(() => {
            $('.overlay__item').addClass('active');
          }, 675);

          $('.overlay__wrapper').removeClass('fade-out fade-in');

          setTimeout(() => {
            $('html').addClass('no-scroll');
          }, 675);
        }
      });
    });
  }

  open () {
    this.$overlayContainer
      .scrollLeft(0)
      .removeClass('visibility-hidden');
    this.$overlayWrapper.removeClass('fade-out');
    setTimeout(() => {
      $(this.options.overlayItem).addClass(this.options.activated);
    }, 675);
  }

  close () {
    this.$overlayWrapper.addClass('fade-out');
    $(this.options.overlayItem).removeClass(this.options.activated);
    this.$overlayContainer
      .delay(675)
      .fadeTo(600, 0, function () {
        $(this)
          .addClass('visibility-hidden')
          .css('opacity', '1')
          .scrollLeft(0);
      });

    $('html').removeClass('no-scroll');
  }
}

plugify('masonry_grid', Grid, {
  gridWrapper: '.grid__wrapper',
  gridItem: '.grid__item',
  gridImage: '.grid__image',
  overlayWrapper: '.overlay__wrapper',
  overlayItem: '.overlay__item',
  overlayContainer: '#overlay',
  activated: 'active'
});
