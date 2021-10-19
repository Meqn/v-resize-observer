import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import ResizeObserver from 'resize-observer-polyfill'

export default class Resize {
  resizeObserver = null
  currentElement = null
  width = 0
  height = 0
  
  /**
   * constructor
   * @param {HTMLElement} el 目标元素
   * @param {Object} options 选项
   * @param {Boolean} options.disabled 是否可用
   * @param {String} options.limiter 限制resize事件速率
   * @param {Number} options.wait 限制等待时间
   * @param {Function} options.resize resize回调函数
   */
  constructor(el, options = {}) {
    this.options = Object.assign({
      wait: 150 // The rate limit wait time
    }, options)

    this.init(el)
  }

  init(element) {
    if (this.options.disabled) {
      this.destroyObserver()
      return
    }

    if (element !== this.currentElement) {
      this.destroyObserver()
      this.currentElement = element
    }
    if (!this.resizeObserver && element) {
      this.resizeObserver = new ResizeObserver(this._onResize())
      this.resizeObserver.observe(element)
    }
  }

  _onResize() {
    const { limiter, wait } = this.options
    if (limiter) {
      const limiterObj = { debounce, throttle }
      return limiterObj[limiter](this._handleResize.bind(this), wait)
    }
    return this._handleResize.bind(this)
  }

  _handleResize(entries) {
    const target = entries[0].target
    const { width, height } = target.getBoundingClientRect()

    const fixedWidth = Math.floor(width)
    const fixedHeight = Math.floor(height)

    if (this.width !== fixedWidth || this.height !== fixedHeight) {
      const size = { width: fixedWidth, height: fixedHeight }
      this.width = fixedWidth
      this.height = fixedHeight

      const { resize } = this.options
      if (typeof resize === 'function') {
        Promise.resolve().then(() => {
          resize(size, target)
        })
      }
    }
  }

  destroyObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  }
}
