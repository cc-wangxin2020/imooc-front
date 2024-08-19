<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget"
  >
    <navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4 px-1">
      <list-vue></list-vue>
    </div>
    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-2 left-[50%] translate-x-[-50%]"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        >主页</m-trigger-menu-item
      >
      <m-trigger-menu-item
        v-if="$store.getters.token"
        to="/member"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass=" text-zinc-400 dark:text-zinc-500"
        >VIP</m-trigger-menu-item
      >
      <m-trigger-menu-item
        to="/profile"
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass=" text-zinc-400 dark:text-zinc-500"
        >{{ $store.getters.token ? '我的' : '去登录' }}</m-trigger-menu-item
      >
    </m-trigger-menu>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>
<script setup>
import navigation from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { onActivated, ref } from 'vue'
import { useScroll } from '@vueuse/core'
/**
 * 记录页面滚动位置
 */
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见，会回调 onActivated 方法
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})
</script>

<style>
</style>