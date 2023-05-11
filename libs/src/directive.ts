import { isVue2 } from 'vue-demi'
import ResizeObserver from './ResizeObserver'
import type { IOptions } from './types'

function getOptions({ value, arg }): IOptions {
  const options: IOptions = {}
  if (typeof value === 'function') {
    options.resize = value
  }
  options.delay = isNaN(parseInt(arg)) ? 150 : parseInt(arg)

  return options
}

const directive = {
  bind(el, binding) {
    const { value } = binding
    if (value && typeof value !== 'function') {
      return console.warn('v-resize should received a function as value')
    }
    const ro = new ResizeObserver(el, getOptions(binding))
    el.__vue_resize__ = ro
  },
  unbind(el) {
    const ro = el.__vue_resize__
    if (ro) {
      ro.destroy()
    }
  }
}

export default isVue2 ? directive : {
  mounted: directive.bind,
  beforeUnmount: directive.unbind
}
