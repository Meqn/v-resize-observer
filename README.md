# v-resize-observer

Resize observer for Vue.

## Install
```
npm install v-resize-observer
```

## Usage

```js
import ResizeObserver from 'v-resize-observer'

vue.use(ResizeObserver)
```
### directive
```html
<div v-resize="hanldResize" />

<div v-resize:debounce="hanldResize" />
<div v-resize:debounce.200="hanldResize" />

<div v-resize:throttle="hanldResize" />
<div v-resize:throttle.200="hanldResize" />
```

### component
```html
<ResizeObserver @resize="hanldResize">
  <div></div>
</ResizeObserver>


<ResizeObserver limiter="debounce" :wait="150" @resize="hanldResize">
  <div></div>
</ResizeObserver>
```

```js
function hanldResize({ width, height }, target) {
  console.log(`width: ${width}, height: ${height}`)
}
```


## API

| Property | Type     | Default | Description                     |
| -------- | -------- | ------- | ------------------------------- |
| disabled | boolean  | false   |                                 |
| limiter  | function | -       |                                 |
| wait     | number   | 150     |                                 |
| resize   | function | -       | Trigger when child node resized |

## Development
```
npm install
npm run dev
```

## License

`v-resize-observer` is released under the MIT license.
