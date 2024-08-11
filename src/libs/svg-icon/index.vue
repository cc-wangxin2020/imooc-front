<template>
  <svg aria-hidden="true">
    <use :class="fillClass" :xlink:href="symbolId" :fill="color"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  fillClass: {
    type: String
  }
})
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style>
</style>