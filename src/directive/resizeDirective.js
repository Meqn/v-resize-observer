import ResizeObserver from '../lib/ResizeObserver'

function getOptions({ value, arg, modifiers }) {
  const options = {}

  // resizeCallback
  if (typeof value === 'function') {
    options['resize'] = value
  }
  
  // Limit the rate of resize change events
  if (arg) {
    if (arg === 'debounce') options['limiter'] = 'debounce'
    else if (arg === 'throttle') options['limiter'] = 'throttle'
  }

  // The rate limit wait time
  if (modifiers) {
    const wait = Object.keys(modifiers).map(k => parseInt(k)).find(v => !isNaN(v))
    options['wait'] = wait || 150
  }

  return options
}

export default {
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
      ro.destroyObserver()
    }
  }
}
