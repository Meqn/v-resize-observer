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

1. 全局引入方式
```js
import ResizeObserver from 'v-resize-observer'

vue.use(ResizeObserver)
```
2. 仅引入指令方式 `directive`
```js
import resizeDirective from 'v-resize-observer/src/directive'

export default {
  directives: {
    resize: resizeDirective
  }
}
```

3. 仅引入组件方式 `component`
```js
import ResizeComponent from 'v-resize-observer/src/component'

export default {
  components: {
    ResizeObserver: ResizeComponent
  }
}
```

::: danger 🚨 提醒：  
如果是按需引入指令或组件，则必须在 `vue.config.js` 中配置`transpileDependencies`属性.    
默认情况下 `babel-loader` 会忽略 `node_modules` 中的所有依赖文件，如果想显示转换一个依赖模块，则必须将它添加到`transpileDependencies`选项中。  
```js
module.exports =  {
  transpileDependencies: [
    /[/\\]node_modules[/\\]v-resize-observer[/\\]/
  ]
}
```
:::


### 使用指令 directive
> 支持 `1.全局引入` 和 `2.指令引入` 方式
```html
<div v-resize="hanldResize" />

<div v-resize:debounce="hanldResize" />
<div v-resize:debounce.200="hanldResize" />

<div v-resize:throttle="hanldResize" />
<div v-resize:throttle.200="hanldResize" />
```

### 使用组件 component
> 支持 `1.全局引入` 和 `3.组件引入` 方式
```html
<ResizeObserver @resize="hanldResize">
  <div></div>
</ResizeObserver>


<ResizeObserver target="#app" limiter="debounce" :wait="150" @resize="hanldResize">
  <div></div>
</ResizeObserver>
```

```js
function hanldResize({ width, height }, target) {
  console.log(`width: ${width}, height: ${height}`)
}
```

## API

| Property | Type     | Default | Description                            |
| -------- | -------- | ------- | -------------------------------------- |
| target   | Element  | -       | DOM Element                            |
| disabled | boolean  | false   |                                        |
| limiter  | function | -       | Limit the rate of resize change events |
| wait     | number   | 150     | The rate limit wait time               |
| resize   | function | -       | Trigger when child node resized        |


## Development
```
npm install
npm run dev
```

## License

`v-resize-observer` is released under the MIT license.
