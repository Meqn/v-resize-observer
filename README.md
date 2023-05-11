# v-resize-observer

[![version](https://img.shields.io/npm/v/v-resize-observer?style=flat-square)](https://www.npmjs.com/package/v-resize-observer)
[![download](https://img.shields.io/npm/dm/v-resize-observer?style=flat-square)](https://www.npmjs.com/package/v-resize-observer)
[![languages](https://img.shields.io/github/languages/top/meqn/v-resize-observer?style=flat-square)](https://github.com/Meqn/v-resize-observer)
[![license](https://img.shields.io/npm/l/v-resize-observer?style=flat-square)](https://github.com/Meqn/v-resize-observer)
![vue@2.x](https://img.shields.io/badge/Vue-2.x-brightgreen?style=flat-square)
![vue@3.x](https://img.shields.io/badge/Vue-3.x-brightgreen?style=flat-square)



[ [Enlish](./README.md) | [中文](./README.zh_CN.md) ]



Resize observer for Vue.  
Detect size changes of DOM elements. Support Vue's directive and component.



## Feature
1. Based on `ResizeObservable API` implementation
2. Support `vue2` and `vue3`
3. Support the use of directives or components
4. Optimization: Provide mechanism to limit resize event triggering frequency
5. Support browsers: IE9+/Edge/Chrome/Safari/Firefox



## Install

**npm**
```
npm install v-resize-observer
```

**browser**
```html
<script src="https://cdn.jsdelivr.net/npm/vue-demi/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-resize-observer/dist/index.iife.js"></script>
```


## Usage

- [Vue2.x Example](https://github.com/Meqn/v-resize-observer/tree/main/examples/vue2)
- [Vue3.x Example](https://github.com/Meqn/v-resize-observer/tree/main/examples/vue3)

```html
<template>
  <div id="app">
    <!-- directives -->
    <div v-resize:50="onResize">
      Listened to elements
    </div>
    
    <!-- Components -->
    <ResizeComponent @resize="onResize" :delay="100" :disabled="disabled">
      <div>Listened to elements</div>
    </ResizeComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ResizeComponent, resizeDirective as vResize } from 'v-resize-observer'

const disabled = ref(false)

function onResize({ width, height }, target) {
  console.log(target, width, height)
}
</script>
```

### 1. Global Configuration
```js
// main.js
import Resizer from 'v-resize-observer'

// vue@3.x
const app = createApp(App)
app.use(Resizer, {
  // Custom command names and component names
  directive: 'resize',
  component: 'ResizeComponent'
})

// vue@2.x
Vue.use(Resizer)
```

Use:
```html
<!-- directives -->
<div v-resize="onResize">Listened to elements</div>
    
<!-- Components -->
<ResizeComponent @resize="onResize" :delay="100" :disabled="disabled">
  <div>Listened to elements</div>
</ResizeComponent>
```

### 2. On demand
```html
<script setup>
import { ref } from 'vue'
import {
  ResizeComponent,
  resizeDirective as vResizeObserver //You can change the directive name, the default: `v-resize, 
} from 'v-resize-observer'

// OR
// import Resizer from 'v-resize-observer'
// const ResizeComponent = Resizer.component
// const vResize = Resizer.directive

function onResize({ width, height }, target) {
  console.log(target, width, height)
}
</script>

<template>
  <div id="app">
    <!-- directives -->
    <div v-resize-observer:100="onResize">
      Listened to elements
    </div>
    
    <!-- Components -->
    <ResizeComponent @resize="onResize">
      <div>Listened to elements</div>
    </ResizeComponent>
  </div>
</template>
```


## API
| Parameter  | Type                    | Default | Description                                             |
| ---------- | ----------------------- | ------- | ------------------------------------------------------- |
| `target`   | `string`, `HTMLElement` | -       | Target elements to listen to                            |
| `disabled` | `boolean`               | `false` | disable listening                                       |
| `delay`    | `number`                | `150`   | Delayed execution time                                  |
| `resize`   | `function`              | -       | Callback function to listen for changes in element size |

`resize(data, target)`
- `data` : elements size `{ width, height }`
- `target` : Listening elements


## use `directive`

> The directive default name is `v-resize`, if you want to change it, you can specify it when you import it.


```html
<div v-resize="onResize" />

<div v-resize:100="onResize" />
<!-- No limit on trigger frequency -->
<div v-resize:0="onResize" />
```
**Parameter：**
- `arg`: => `delay`
- `value`: => `resize`


## use `Component`
```html
<ResizeComponent target="#app" :delay="0" disabled="false" @resize="onResize">
  <div>Listened to elements</div>
</ResizeComponent>
```
### props
- `target`: The target element to listen to, the default current element.
- `delay`: Delay execution time, default: `150`.
- `disabled`: disable listening.

### events
- `resize`: Triggered when listening for element size changes.



## ChangeLog

### v2.0.0
#### 🚀 Features
- feat: compatible with vue2.x and 3.x;
- feat: add Typescript type hints;
- feat: support for global registration of custom directive names and component names;
- feat: add re-listening function;
- perf: remove the `limiter` trigger limit option;
- perf: change the delay time `wait` to `delay`;

#### 🐞 Bug Fixes
- fix: Fixed failure to listen again after disabling listening.

### v1.x
- [v1.x Documents](https://meqn.github.io/v-resize-observer/)
