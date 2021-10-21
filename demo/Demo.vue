<template>
  <div>
    <Box v-resize:debounce="handleResize">
      Directive: { width: {{ box1.width }}, height: {{ box1.height }} }
    </Box>

    <ResizeObserver limiter="debounce" :wait="100" @resize="onResize">
      <Box style="border-color: red; height: 20vw">
        Component: { width: {{ box2.width }}, height: {{ box2.height }} }
      </Box>
    </ResizeObserver>
  </div>
</template>

<script>
import ResizeObserver from '../src/index'
import Box from './components/Box.vue'

export default {
  name: 'Demo',
  components: {
    ResizeObserver: ResizeObserver.component,
    Box
  },
  directives: {
    resize: ResizeObserver.directive
  },
  data() {
    return {
      box1: {
        width: 0,
        height: 0
      },
      box2: {
        width: 0,
        height: 0
      }
    }
  },
  methods: {
    handleResize({ width, height }, target) {
      this.box1 = { width, height }
      console.log('v-resize :', width, height, target)
    },
    onResize({ width, height }, target) {
      this.box2 = { width, height }
      console.log('component resize :', width, height, target)
    }
  }
}
</script>
