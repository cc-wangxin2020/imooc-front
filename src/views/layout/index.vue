<template>
  <div class="h-screen">
    <header-vue
      v-if="!isMobileTerminal"
      class="h-header duration-500"
    ></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue v-if="!isMobileTerminal"></floating-vue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import FloatingVue from './components/floating/index.vue'
import MainVue from './components/main/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
</script>

<style>
</style>