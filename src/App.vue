<template>
  <!-- 一级路由出口 -->
  <div class="h-screen z-1 fixed top-0 left-0 w-screen">
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    ></m-transition-router-view>
  </div>
</template>
<script setup>
</script>

<style scoped>
</style>
