<template>
  <div class="h-screen">
    <header-vue class="h-header duration-500"></header-vue>
    <div class=" h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import FloatingVue from './components/floating/index.vue'
import MainVue from './components/main/index.vue'
</script>

<style>
</style>