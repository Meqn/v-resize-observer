<script>
import ResizeObserver from '../lib/ResizeObserver'

export default {
  name: 'ResizeObserver',
  props: {
    target: [String, Element],
    disabled: Boolean,
    limiter: {
      type: String,
      validator(val) {
        return ['debounce', 'throttle'].includes(val)
      }
    },
    wait: Number
  },
  mounted() {
    const { target, disabled, limiter, wait } = this
    let el = this.$el
    if (target) {
      if (typeof target === 'string') {
        el = document.querySelector(el)
      } else if (el instanceof Element) {
        el = target
      }
    }
    const options = {
      disabled,
      limiter,
      wait,
      resize: (data, elem) => {
        this.$emit('resize', data, elem)
      }
    }
    const ro = new ResizeObserver(el, options)
    this.$once('hook:beforeDestroy', () => {
      ro.destroyObserver()
    })
  },
  render(h) {
    const $default = this.$slots.default
    // Error: Multiple root nodes returned from render function
    return ($default && $default.length === 1)
      ? this.$slots.default || null
      : h('div', $default)
  }
}
</script>
