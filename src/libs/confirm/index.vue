<template>
  <div>
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen fixed top-0 left-0 bg-zinc-900/80 dark:bg-zinc-800 z-40"
        @click="isVisible = !isVisible"
      ></div>
    </transition>
    <transition name="confirm-down-up">
      <div
        v-if="isVisible"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import MButton from '../button/index.vue'
import { onMounted, ref } from 'vue'
const props = defineProps({
  title: {
    type: String
  },
  content: {
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
  confirmHandler: {
    type: Function
  },
  cancelHandler: {
    type: Function
  },
  close: {
    type: Function
  }
})
const isVisible = ref(false)
const show = () => {
  isVisible.value = true
}
const duration = '0.5s'
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}
const close = () => {
  isVisible.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseFloat(duration.replace('s', '') * 1000))
}
onMounted(() => {
  show()
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.confirm-down-up-enter-active,
.confirm-down-up-leave-active {
  transition: all v-bind(duration);
}
.confirm-down-up-enter-from,
.confirm-down-up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>