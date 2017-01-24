class Active {
  constructor () {
    this.match();
  }

  match () {
    const current = window.location.pathname;

    $('.desktop-menu__parent > li')
      .find('a')
      .each(function () {
        const $el = $(this);

        if ($el.attr('href') === current) {
          $el.addClass('active');
        }
      });
  }
}

export default Active;
