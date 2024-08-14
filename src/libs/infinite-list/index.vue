<template>
  <div>
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <m-svg-icon
        v-show="loading"
        name="infinite-load"
        class="h-4 w-4 mx-auto animate-spin"
      ></m-svg-icon>
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        没有更多数据了...
      </p>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onLoad', 'update:modelValue'])
const loading = useVModel(props)
const loadingTarget = ref(null)
const isShow = ref(false)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }], observer) => {
  isShow.value = isIntersecting
  emitsLoad()
})

const emitsLoad = () => {
  if (isShow.value && !props.isFinished && !loading.value) {
    loading.value = true
    emits('onLoad')
  }
}
watch(loading, (val) => {
  setTimeout(() => {
    emitsLoad()
  }, 500)
})
</script>

<style>
</style>