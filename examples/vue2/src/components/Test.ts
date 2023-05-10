import { defineComponent, type PropType, onMounted, onBeforeUnmount, h, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'TestComp',
  props: {
    cls: String as PropType<string>
  },
  setup(props, context) {
    const { slots } = context
    const ctx = this
    const vm = getCurrentInstance()?.proxy
    console.log('setup context : ', ctx, context)
    console.log('setup vm : ', vm)

    onMounted(() => {
      console.log('onMounted .... ', vm?.$el)
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount .... ')
    })

    const defaultContent = slots.default?.()

    return () => (
      (defaultContent && defaultContent.length === 1)
        ? defaultContent
        : h('div', { class: props.cls }, defaultContent)
    )
  }
})
