class Overlay {
  constructor () {
    this.init();
    this.openImage();

    $('#overlay-show').on('click', this.open);
    $('#overlay-hide, #overlay-close').on('click', this.close);
    $(window).on('keyup', $.proxy(this.keyPress, this));
  }

  init () {
    $.when(this.clone()).done(() => {
      this.alter();
    });
  }

  clone () {
    $('.grid__item').each(function () {
      $(this).clone().appendTo('.overlay__wrapper');
    });
  }

  alter () {
    const $overlayItem = $('.overlay__wrapper').find('.grid__item');

    $overlayItem.each(function () {
      $(this)
        .removeClass('grid__item')
        .addClass('overlay__item');
    });

    const $overlayImage = $('.overlay__item').find('.grid__image');

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

  open () {
    $('#overlay')
      .scrollLeft(0)
      .removeClass('visibility-hidden');
    $('.overlay__wrapper').removeClass('fade-out');
    setTimeout(() => {
      $('.overlay__item').addClass('active');
    }, 675);
  }

  openImage () {
    $('.grid__image').each(function () {
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

  close () {
    $('.overlay__wrapper').addClass('fade-out');
    $('#overlay-close').addClass('fade-out');

    setTimeout(() => {
      $('#overlay-close').removeClass('fade-out');
    }, 1275);

    $('.overlay__item').removeClass('active');
    $('#overlay')
      .delay(675)
      .fadeTo(600, 0, function () {
        $(this)
          .addClass('visibility-hidden')
          .css('opacity', '1')
          .scrollLeft(0);
      });

    $('html').removeClass('no-scroll');
  }

  keyPress (e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }
}

export default Overlay;
