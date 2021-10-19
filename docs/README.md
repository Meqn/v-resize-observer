# ResizeObserver



## example

```html
<div v-resize="hanldResize" />

<div v-resize:debounce="hanldResize" />
<div v-resize:debounce.200="hanldResize" />

<div v-resize:throttle="hanldResize" />
<div v-resize:throttle.200="hanldResize" />
```

```js
function hanldResize({ width, height }, target) {
  console.log(`width: ${width}, height: ${height}`)
}
```

