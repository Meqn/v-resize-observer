# v-resize-observer

[![version](https://img.shields.io/npm/v/v-resize-observer?style=flat-square)](https://www.npmjs.com/package/v-resize-observer)
[![download](https://img.shields.io/npm/dm/v-resize-observer?style=flat-square)](https://www.npmjs.com/package/v-resize-observer)
[![languages](https://img.shields.io/github/languages/top/meqn/v-resize-observer?style=flat-square)](https://github.com/Meqn/v-resize-observer)
[![license](https://img.shields.io/npm/l/v-resize-observer?style=flat-square)](https://github.com/Meqn/v-resize-observer)
![vue@2.x](https://img.shields.io/badge/Vue-2.x-brightgreen?style=flat-square)
![vue@3.x](https://img.shields.io/badge/Vue-3.x-brightgreen?style=flat-square)



[ [Enlish](./README.md) | [中文](./README.zh_CN.md) ]



检测DOM元素的尺寸变化。支持Vue的指令和组件方式。



## Feature
1. 基于`ResizeObservable API`实现
2. 支持`vue2`和`vue3`
3. 支持指令或组件的使用方式
4. 优化: 提供限制resize事件触发频率机制
5. 兼容 IE9+/Edge/Chrome/Safari/Firefox


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

- [vue2.x 示例](https://github.com/Meqn/v-resize-observer/tree/main/examples/vue2)
- [vue3.x 示例](https://github.com/Meqn/v-resize-observer/tree/main/examples/vue3)

```html
<template>
  <div id="app">
    <!-- 指令方式 -->
    <div v-resize:50="onResize">
      被监听的元素
    </div>
    
    <!-- 组件方式 -->
    <ResizeComponent @resize="onResize" :delay="100" :disabled="disabled">
      <div>被监听的元素</div>
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

### 1. 全局注册
```js
// main.js 入口文件
import Resizer from 'v-resize-observer'

// vue@3.x
const app = createApp(App)
app.use(Resizer, {
  // 自定义指令名和组件名，这里是默认值
  directive: 'resize',
  component: 'ResizeComponent'
})

// vue@2.x
Vue.use(Resizer)
```

使用：
```html
<!-- 指令方式 -->
<div v-resize="onResize">被监听的元素</div>
    
<!-- 组件方式 -->
<ResizeComponent @resize="onResize" :delay="100" :disabled="disabled">
  <div>被监听的元素</div>
</ResizeComponent>
```

### 2. 局部引入
```html
<script setup>
import { ref } from 'vue'
import {
  ResizeComponent,
  resizeDirective as vResizeObserver //可以更改指令名称，默认 `v-resize, 
} from 'v-resize-observer'

// 或者
// import Resizer from 'v-resize-observer'
// const ResizeComponent = Resizer.component
// const vResize = Resizer.directive

function onResize({ width, height }, target) {
  console.log(target, width, height)
}
</script>

<template>
  <div id="app">
    <!-- 指令方式 -->
    <div v-resize-observer:100="onResize">
      被监听的元素
    </div>
    
    <!-- 组件方式 -->
    <ResizeComponent @resize="onResize">
      <div>被监听的元素</div>
    </ResizeComponent>
  </div>
</template>
```


## API
| Parameter  | Type                    | Default | Description                  |
| ---------- | ----------------------- | ------- | ---------------------------- |
| `target`   | `string`, `HTMLElement` | -       | 监听的目标元素               |
| `disabled` | `boolean`               | `false` | 是否禁用监听                 |
| `delay`    | `number`                | `150`   | 延时执行时间                 |
| `resize`   | `function`              | -       | 监听元素尺寸变化时的回调函数 |

`resize(data, target)`
- `data` : 监听元素的尺寸 `{ width, height }`
- `target` : 监听的元素


## 指令 directive

> 指令名称默认 `v-resize`, 如需更改指令名称，可在引入时指定。


```html
<div v-resize="onResize" />

<div v-resize:100="onResize" />
<!-- 不限制触发频率 -->
<div v-resize:0="onResize" />
```
**参数说明：**
- 指令`arg`: 表示`delay`, 延时执行时间
- 指令`value`: 表示 `resize`, 回调函数


## 组件 Component
```html
<ResizeComponent target="#app" :delay="0" disabled="false" @resize="onResize">
  <div>被监听的元素</div>
</ResizeComponent>
```
### props
- `target`: 监听的目标元素，默认当前元素。
- `delay`: 延时执行时间，默认:`150`。
- `disabled`: 是否禁用监听。

### events
- `resize`: 当监听元素尺寸变化时触发。



## ChangeLog

### v2.0.0
#### 🚀 Features
- feat: 兼容 vue2.x 和 3.x；
- feat: 增加Typescript类型提示；
- feat: 支持全局注册自定义指令名和组件名；
- feat: 增加重新监听功能；
- perf: 去掉`limiter`触发限制选项；
- perf: 更改延时时间`wait`为 `delay`；

#### 🐞 Bug Fixes
- fix: 修复禁用监听后无法再次监听；

### v1.x
- [v1.x文档](https://meqn.github.io/v-resize-observer/)
