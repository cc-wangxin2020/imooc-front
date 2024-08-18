<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="w-screen h-screen fixed top-0 left-0 bg-zinc-900/80 dark:bg-zinc-800 z-40"
      @click="isVisible = !isVisible"
    ></div>
  </transition>
  <transition name="dialog-down-up">
    <div
      v-if="isVisible"
      class="w-[80%] fixed top-1/4 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
    >
      <!-- 标题 -->
      <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
        {{ title }}
      </div>
      <!-- 内容 -->
      <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
        <slot />
      </div>
      <!-- 按钮 -->
      <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
        <m-button type="info" class="mr-2" @click="onCancelClick">{{
          cancelText
        }}</m-button>
        <m-button type="primary" @click="onConfirmClick">{{
          confirmText
        }}</m-button>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  cancelHandler: {
    type: Function
  },
  // 确定按钮点击事件
  confirmHandler: {
    type: Function
  },
  // 关闭的回调
  close: {
    type: Function
  }
})
const isVisible = useVModel(props)

/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}

const close = () => {
  isVisible.value = false
  if (props.close) {
    props.close()
  }
}
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

.dialog-down-up-enter-active,
.dialog-down-up-leave-active {
  transition: all 0.3s;
}
.dialog-down-up-enter-from,
.dialog-down-up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>