# v-resize-observer

Resize observer for Vue. ([GitHub](https://github.com/Meqn/v-resize-observer))   
检测DOM元素的尺寸变化。

> support IE9+/Edge/chrome/safari/Firefox

[[toc]]


## Install

```bash
npm install v-resize-observer
```

## Usage

### 1. Global registration

in `main.js`
```js
import ResizeObserver from 'v-resize-observer'
vue.use(ResizeObserver)
```

in `page.vue`
```html
<!-- 1. use directive -->
<div v-resize="hanldResize" />

<div v-resize:debounce="hanldResize" />
<div v-resize:debounce.200="hanldResize" />

<div v-resize:throttle="hanldResize" />
<div v-resize:throttle.200="hanldResize" />


<!-- 2. use component -->
<ResizeObserver limiter="debounce" :wait="100" @resize="handleResize">
  <div>content...</div>
</ResizeObserver>
```



### 2. use  `directive`

```html
<template>
  <div v-resize:debounce="handleResize">
    content
  </div>
</template>
<script>
import ResizeObserver from 'v-resize-observer'

export default {
  directives: {
    resize: ResizeObserver.directive
  },
  methods: {
    handleResize({ width, height }, target) {
      console.log(`width: ${width}, height: ${height}`)
    }
  }
}
</script>
```



### 3. use `component`

```html
<template>
  <ResizeObserver limiter="debounce" :wait="100" @resize="handleResize">
    <div>content...</div>
  </ResizeObserver>
</template>
<script>
import ResizeObserver from 'v-resize-observer'

export default {
  components: {
    ResizeObserver: ResizeObserver.component
  },
  methods: {
    handleResize({ width, height }, target) {
      console.log(`width: ${width}, height: ${height}`)
    }
  }
}
</script>
```



## API

| Property | Type     | Default | Description                                                  |
| -------- | -------- | ------- | ------------------------------------------------------------ |
| target   | Element  | -       | DOM Element                                                  |
| disabled | boolean  | false   |                                                              |
| limiter  | function | -       | Limit the rate of resize change events, support: `debounce` or `debounce` |
| wait     | number   | 150     | The rate limit wait time                                     |
| resize   | function | -       | Trigger when child node resized                              |



## Development

```
npm install
npm run dev
```



## License

`v-resize-observer` is released under the MIT license.

