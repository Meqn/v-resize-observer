<template>
<div class="box"><slot /></div>
</template>

<script>
export default {
  name: 'Box'
}
</script>

<style>
.box{
  display: flex; align-items: center; justify-content: center;
  height: 20vw;
  margin: 20px;
  border: 1px solid blue;
}
</style>