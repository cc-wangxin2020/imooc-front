<template>
  <div class="">
    <slot :showTime="showTime">
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>
<script>
const CHANGE = 'change'
const FINISH = 'finish'
const DURATION = 1000
</script>
<script setup>
import dayjs from './utils'
import { computed, onUnmounted, ref } from 'vue'
const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits([CHANGE, FINISH])
const duration = ref(props.time)
let timer = null
const start = () => {
  if (timer) {
    return
  }
  timer = setInterval(() => {
    duration.value -= DURATION
    emits(CHANGE)
    if (duration.value <= 0) {
      duration.value = 0
      clearInterval(timer)
      emits(FINISH)
    }
  }, DURATION)
}
start()
onUnmounted(() => {
  clearInterval(timer)
})
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>

<style>
</style>