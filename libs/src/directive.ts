import { isVue2 } from 'vue-demi'
import ResizeObserver from './ResizeObserver'
import type { IOptions } from './types'

function getOptions({ value, arg, modifiers }): IOptions {
  const options: IOptions = {}
  if (typeof value === 'function') {
    options.resize = value
  }
  options.delay = isNaN(parseInt(arg)) ? 150 : parseInt(arg)
  options.immediate = !!modifiers.immediate
  
  return options
}

const directive = {
  //! 这里使用 `inserted` 钩子，表示元素被插入父节点中
  inserted(el, binding) {
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
  mounted: directive.inserted,
  beforeUnmount: directive.unbind
}
