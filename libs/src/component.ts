import {
  defineComponent,
  watch,
  onMounted,
  onBeforeUnmount,
  h,
  getCurrentInstance,
  type PropType,
} from 'vue-demi'
import ResizeObserver from './ResizeObserver'
import type { IOptions } from './types'

export default defineComponent({
  name: 'ResizeObserverComponent',
  props: {
    target: [String, Object] as PropType<string | HTMLElement>,
    disabled: Boolean as PropType<boolean>,
    immediate: Boolean as PropType<boolean>,
    delay: {
      type: Number as PropType<number>,
      default: 150
    }
  },
  setup(props, { slots }) {
    let ro: ResizeObserver | null = null
    watch(() => props.disabled, (val) => {
      if (val) {
        ro?.disconnect()
      } else {
        ro?.observe()
      }
    })
    onMounted(() => {
      // const { target, disabled, limiter, wait } = toRefs(props)
      const vm = getCurrentInstance()?.proxy
      let $el: HTMLElement = vm?.$el as HTMLElement

      if (props.target) {
        if (typeof props.target === 'string') {
          $el = document.querySelector(props.target) as HTMLElement
        } else if (props.target instanceof HTMLElement) {
          $el = props.target
        }
      }
      const options: IOptions = {
        delay: props.delay,
        immediate: props.immediate,
        resize: (data, elem) => {
          vm?.$emit('resize', data, elem)
        }
      }
      ro = new ResizeObserver($el, options)
    })
    // 销毁 ResizeObserver实例
    onBeforeUnmount(() => {
      if (ro) {
        ro.destroy()
      }
    })
    
    const defaultContent = slots.default?.()
    return () => (
      (defaultContent && defaultContent.length === 1)
        ? defaultContent[0]
        : h('div', defaultContent)
    )
  }
})