<template>
  <div @click="handlerFUllScreen">
    <svg-icon :icon="icon ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const icon = ref(screenfull.isFullscreen)
const handlerFUllScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
const changeIcon = () => {
  icon.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', changeIcon)
})
onBeforeUnmount(() => {
  screenfull.off('change')
})
</script>

<style lang="scss" scoped></style>
