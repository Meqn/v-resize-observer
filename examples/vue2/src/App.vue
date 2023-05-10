<script setup lang="ts">
import { ref } from 'vue'
// import { ResizeComponent, resizeDirective as vResize } from 'v-resize-observer'

const list = ref(Array(3).fill('').map((_, i) => ({ width: 0, height: 0, delay: i * 100 })))

function onResize(data: any, el: HTMLElement) {
  if (el.dataset.key) {
    const i = parseInt(el.dataset.key as string)
    list.value[i].width = data.width
    list.value[i].height = data.height
    console.log(`%c ${el.dataset.name} resize : ${JSON.stringify(data)}`, `color: rgb(0, ${list.value[i].delay}, 180)`)
  } else {
    console.log(`%c ${el.dataset.name} resize : ${JSON.stringify(data)}`, `color: #f00`)
  }
  
}
</script>

<template>
  <div id="app">
    <ResizeComponent @resize="onResize">
      <header class="header" data-name="header">
        <ResizeComponent @resize="onResize" :delay="50" target="#main">
          <h1>v-resize-observer</h1>
        </ResizeComponent>
      </header>
    </ResizeComponent>
    
    <main id="main" class="main" data-name="main">
      <div v-for="(item, i) in list" :key="i" v-resize:[`${item.delay}`]="onResize" :data-key="i" :data-name="`item-${i+1}`">
        <p>name: item-{{ i + 1 }}</p>
        <p>width: {{ item.width }}</p>
        <p>height: {{ item.height }}</p>
        <p>delay: {{ item.delay }}</p>
      </div>
    </main>
  </div>
</template>

<style>
html, body{ margin: 0; padding: 0;}
#app {
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 20px;
}
.header{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
}
.main{
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #eeeeee;
}
.main > div{
  width: 30%;
  min-width: 100px;
  border: 1px solid rgb(0, 179, 164);
  resize: both;
  overflow: auto;
}
</style>
