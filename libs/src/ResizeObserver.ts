import ResizeObserver from 'resize-observer-polyfill'
import type { IOptions } from './types'

// 简单的防抖函数
// import debounce from 'lodash/debounce'
function debounce(func: Function, delay: number) {
  let timer
  return function() {
    clearTimeout(timer)
    const args = arguments
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export default class Resizer {
  private resizeObserver: ResizeObserver | null = null
  private element: HTMLElement | null
  private width: number = 0
  private height: number = 0
  private options: IOptions

  constructor(el: string | HTMLElement, options?: IOptions) {
    let $el = el
    if (typeof el === 'string') {
      $el = document.querySelector(el) as HTMLElement
    }
    this.element = $el as HTMLElement
    this.options = Object.assign({
      delay: 150
    }, options)

    this.observe(this.element)
  }

  public observe(element?: HTMLElement): void {
    if (element) {
      this.element = element
    } else {
      element = this.element as HTMLElement
    }
    if (!(element instanceof HTMLElement)) {
      throw new Error('The target element must be a HTMLElement')
    }
    const { width, height } = element.getBoundingClientRect()
    this.width = Math.floor(width)
    this.height = Math.floor(height)
    
    if (typeof this.options.resize === 'function' && this.options.immediate) {
      this.options.resize({ width, height }, element)
    }
    
    if (this.resizeObserver) {
      this.disconnect()
    }
    this.resizeObserver = new ResizeObserver(this._onResize())
    this.resizeObserver.observe(element)
  }

  private _onResize() {
    const delay = this.options.delay || this.options.wait
    if (delay) {
      return debounce(this._handleResize.bind(this), delay)
    }
    return this._handleResize.bind(this)
  }

  private _handleResize(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      const target = entry.target
      let { width, height } = target.getBoundingClientRect()
      width = Math.floor(width)
      height = Math.floor(height)
      
      if (this.width !== width || this.height !== height) {
        this.width = width
        this.height = height

        if (typeof this.options.resize === 'function') {
          this.options.resize({ width, height }, target)
        }
      }
    }
  }

  public disconnect() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  }

  public destroy() {
    this.disconnect()
    this.element = null
  }
}
