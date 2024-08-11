<template>
  <div>
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="isPopup"
          class="w-screen h-screen fixed top-0 left-0 bg-zinc-900/80 z-40"
          @click="isPopup = !isPopup"
        ></div>
      </transition>
      <transition name="popup-down-up">
        <div
          v-if="isPopup"
          v-bind="$attrs"
          class="w-screen fixed bottom-0 bg-white z-50"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
// const emits = defineEmits(['update:modelValue'])
const isPopup = useVModel(props)
// 滚动锁定
const isLocked = useScrollLock(document.body)
watch(
  isPopup,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>