/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	$(function () {
	  $('.site-header__toggle').toggle();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _plugify = __webpack_require__(2);

	var _plugify2 = _interopRequireDefault(_plugify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Toggle = function () {
	  function Toggle(el, options) {
	    _classCallCheck(this, Toggle);

	    this.$el = el;
	    this.options = options;

	    this.$menu = $(this.options.menu);

	    this.$el.on('click', $.proxy(this.addRemove, this));
	  }

	  _createClass(Toggle, [{
	    key: 'addRemove',
	    value: function addRemove(e) {
	      if (e) {
	        e.preventDefault();
	      }
	      this.$menu.toggleClass(this.options.className);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.$el.off('click', this.addRemove);
	    }
	  }]);

	  return Toggle;
	}();

	(0, _plugify2.default)('toggle', Toggle, {
	  className: 'active',
	  menu: '.mobile-menu'
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (name, Constructor) {
	  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  $.fn[name] = function (options) {
	    var args = $.makeArray(arguments);
	    var after = args.slice(1);

	    return this.each(function () {
	      var $el = $(this);
	      var instance = $el.data(name);

	      if (instance) {
	        if (args[0]) {
	          instance[args[0]].apply(instance, after);
	        }
	      } else {
	        if (args[0] !== 'destroy') {
	          var opts = $.extend({}, defaults, options);
	          $el.data(name, new Constructor($el, opts));
	        }
	      }
	    });
	  };
	};

/***/ }
/******/ ]);