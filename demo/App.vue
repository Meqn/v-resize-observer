<template>
  <div id="app">
    <h1>ResizeObserver</h1>
    <Box v-resize:debounce="handleResize">
      指令: width: {{ box1.width }}, height: {{ box1.height }}
    </Box>

    <ResizeObserver limiter="debounce" :wait="100" @resize="onResize">
      <Box style="border-color: red; height: 24vw">
        组件: width: {{ box2.width }}, height: {{ box2.height }}
      </Box>
    </ResizeObserver>
  </div>
</template>

<script>
import Box from './components/Box.vue'

export default {
  name: 'App',
  components: {
    Box
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
      console.log('box1 resize :', width, height, target)
    },
    onResize({ width, height }, target) {
      this.box2 = { width, height }
      console.log('box2 resize :', width, height, target)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
