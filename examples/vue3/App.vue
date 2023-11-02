<script setup lang="ts">
import { ResizeComponent, resizeDirective as vResize } from 'v-resize-observer'

function onResize({ width, height }: any, el: HTMLElement) {
  if (el.getAttribute('id') === 'main') {
    console.log('onResize', width, height)
  } else {
    el.innerHTML = `${Math.floor(width)} x ${Math.floor(height)}`
  }
}
</script>
<template>
  <section>
    <ResizeComponent target="#main" @resize="onResize">
      <header>
        <h1>v-resize-observer</h1>
      </header>
    </ResizeComponent>
    <main id="main">
      <div class="column" v-resize:0="onResize">none</div>
      <div class="column" v-resize:150.immediate="onResize">none</div>
    </main>
  </section>
</template>

<style>
*{
  box-sizing: border-box;
}
section{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
}
header{
  height: 8vh;
  margin-bottom: 2vh;
  font-size: 1.6vh;
  text-align: center;
  background-color: #eee;
}
main{
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #eee;
  overflow: auto;
  resize: both;
}
.column{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-size: 16px;
  overflow: auto;
  resize: both;
  background-color: #fff;
}
</style>
