<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4 px-1">
      <list-vue></list-vue>
    </div>
  </div>
</template>

<script setup>
import navigation from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
</script>

<style>
</style>