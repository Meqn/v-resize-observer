import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import ResizeObserver from 'resize-observer-polyfill';

var Resize = /*#__PURE__*/function () {
  /**
   * constructor
   * @param {HTMLElement|String} el 目标元素
   * @param {Object} options 选项
   * @param {Boolean} options.disabled 是否可用
   * @param {String} options.limiter 限制resize事件速率
   * @param {Number} options.wait 限制等待时间
   * @param {Function} options.resize resize回调函数
   */
  function Resize(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Resize);

    _defineProperty(this, "resizeObserver", null);

    _defineProperty(this, "currentElement", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    var $el = null;

    if (el instanceof Element) {
      $el = el;
    } else if (typeof el === 'string') {
      $el = document.querySelector(el);
    }

    if (!$el) {
      return console.warn('The target element must be a HTMLElement');
    }

    this.options = Object.assign({
      wait: 150 // The rate limit wait time

    }, options);
    this.init(el);
  }

  _createClass(Resize, [{
    key: "init",
    value: function init(element) {
      if (this.options.disabled) {
        this.destroyObserver();
        return;
      }

      if (element !== this.currentElement) {
        this.destroyObserver();
        this.currentElement = element;
      }

      if (!this.resizeObserver && element) {
        this.resizeObserver = new ResizeObserver(this._onResize());
        this.resizeObserver.observe(element);
      }
    }
  }, {
    key: "_onResize",
    value: function _onResize() {
      var _this$options = this.options,
          limiter = _this$options.limiter,
          wait = _this$options.wait;

      if (limiter) {
        var limiterObj = {
          debounce: debounce,
          throttle: throttle
        };
        return limiterObj[limiter](this._handleResize.bind(this), wait);
      }

      return this._handleResize.bind(this);
    }
  }, {
    key: "_handleResize",
    value: function _handleResize(entries) {
      var target = entries[0].target;

      var _target$getBoundingCl = target.getBoundingClientRect(),
          width = _target$getBoundingCl.width,
          height = _target$getBoundingCl.height;

      var fixedWidth = Math.floor(width);
      var fixedHeight = Math.floor(height);

      if (this.width !== fixedWidth || this.height !== fixedHeight) {
        var size = {
          width: fixedWidth,
          height: fixedHeight
        };
        this.width = fixedWidth;
        this.height = fixedHeight;
        var resize = this.options.resize;

        if (typeof resize === 'function') {
          Promise.resolve().then(function () {
            resize(size, target);
          });
        }
      }
    }
  }, {
    key: "destroyObserver",
    value: function destroyObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    }
  }]);

  return Resize;
}();

function getOptions(_ref) {
  var value = _ref.value,
      arg = _ref.arg,
      modifiers = _ref.modifiers;
  var options = {}; // resizeCallback

  if (typeof value === 'function') {
    options['resize'] = value;
  } // Limit the rate of resize change events


  if (arg) {
    if (arg === 'debounce') options['limiter'] = 'debounce';else if (arg === 'throttle') options['limiter'] = 'throttle';
  } // The rate limit wait time


  if (modifiers) {
    var wait = Object.keys(modifiers).map(function (k) {
      return parseInt(k);
    }).find(function (v) {
      return !isNaN(v);
    });
    options['wait'] = wait || 150;
  }

  return options;
}

var resizeDirective = {
  bind: function bind(el, binding) {
    var value = binding.value;

    if (value && typeof value !== 'function') {
      return console.warn('v-resize should received a function as value');
    }

    var ro = new Resize(el, getOptions(binding));
    el.__vue_resize__ = ro;
  },
  unbind: function unbind(el) {
    var ro = el.__vue_resize__;

    if (ro) {
      ro.destroyObserver();
    }
  }
};

var script = {
  name: 'ResizeObserver',
  props: {
    target: [String, Element],
    disabled: Boolean,
    limiter: {
      type: String,
      validator: function validator(val) {
        return ['debounce', 'throttle'].includes(val);
      }
    },
    wait: Number
  },
  mounted: function mounted() {
    var _this = this;

    var target = this.target,
        disabled = this.disabled,
        limiter = this.limiter,
        wait = this.wait;
    var $el = this.$el;

    if (target) {
      if (typeof target === 'string') {
        $el = document.querySelector(target);
      } else if (target instanceof Element) {
        $el = target;
      }
    }

    var options = {
      disabled: disabled,
      limiter: limiter,
      wait: wait,
      resize: function resize(data, elem) {
        // 这里必须使用箭头函数
        _this.$emit('resize', data, elem);
      }
    };
    var ro = new Resize($el, options);
    this.$once('hook:beforeDestroy', function () {
      ro.destroyObserver();
    });
  },
  render: function render(h) {
    var $default = this.$slots.default; // Error: Multiple root nodes returned from render function

    return $default && $default.length === 1 ? this.$slots.default || null : h('div', $default);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */

/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.directive('resize', resizeDirective);
  Vue.component('ResizeObserver', __vue_component__);
};

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(install); // eslint-disable-line
}

Resize.install = install;
Resize.directive = resizeDirective;
Resize.component = __vue_component__;

export { Resize as default };
