---
home: true
heroText: v-resize-observer
tagline: 基于ResizeObserver监测DOM元素的尺寸变化。
actionText: 快速上手 →
actionLink: /guide/
features:
- title: 使用简洁
  details: 可以快速全局注册，也可以单独引入指令或组件。
- title: 支持指令/组件
  details: 支持使用`v-resize`指令，也可以使用`<ResizeObserver />`进行监听，并提供debounce和throttle限制触发机制。
- title: 高性能
  details: 基于Resize Observer API提供的高性能的机制，代码可以监视元素的大小更改，并且每次大小更改时都会向观察者传递通知。
footer: MIT Licensed | Copyright © 2021-present Evan You
---

::: tip
support IE9+/Edge/Chrome/Safari/Firefox
:::

## 快速上手

```js
// 引入
import ResizeObserver from 'v-resize-observer'
// 全局注册
vue.use(ResizeObserver)
```
页面内使用
```html
<div v-resize="handleResize"></div>
```
