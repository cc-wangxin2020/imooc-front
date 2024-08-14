<template>
  <div
    class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800 dark:border-b-zinc-700"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <header-search></header-search>
      <header-theme></header-theme>
      <header-my></header-my>
    </div>
  </div>
</template>

<script setup>
import HeaderTheme from './header-theme.vue'
import HeaderMy from './header-my.vue'
import HeaderSearch from './header-search/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>

<style>
</style>