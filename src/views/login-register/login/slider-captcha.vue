<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-3xl"
  >
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请先完成人类安全验证</span>
      <m-svg-icon
        class="w-3 h-3 p-0.5 cursor-pointer rounded-sm duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="onFresh"
      ></m-svg-icon>
      <m-svg-icon
        class="ml-1.5 w-3 h-3 p-0.5 cursor-pointer rounded-sm duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        name="close"
        @click="onClose"
      ></m-svg-icon>
    </div>
    <!-- 人类行为验证 -->
    <div id="captcha"></div>
  </div>
</template>
<script>
const EMIT_SUCCESS = 'success'
const EMIT_CLOSE = 'close'
</script>
<script setup>
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import { onMounted } from 'vue'
import { postChapche } from '@/api/sys'
const emits = defineEmits([EMIT_SUCCESS, EMIT_CLOSE])
let captcha = null
onMounted(() => {
  captcha = sliderCaptcha({
    id: 'captcha',
    async onSuccess(arr) {
      const res = await postChapche({ behavior: arr })
      if (res) {
        emits(EMIT_SUCCESS)
      }
    },
    // 刷新
    onFail() {
      console.log('onfail')
    },
    verify() {
      return true
    }
  })
})
const onFresh = () => {
  captcha.reset()
}
const onClose = () => {
  emits(EMIT_CLOSE)
}
</script>

<style>
</style>