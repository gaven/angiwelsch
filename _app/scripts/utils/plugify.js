export default (name, Constructor, defaults = {}) => {
  $.fn[name] = function (options) {
    const args = $.makeArray(arguments);
    const after = args.slice(1);

    return this.each(function () {
      const $el = $(this);
      const instance = $el.data(name);

      if (instance) {
        if (args[0]) {
          instance[args[0]].apply(instance, after);
        }
      } else {
        if (args[0] !== 'destroy') {
          const opts = $.extend({}, defaults, options);
          $el.data(name, new Constructor($el, opts));
        }
      }
    });
  };
};
