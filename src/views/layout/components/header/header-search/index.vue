<template>
  <div class="w-full">
    <m-search v-model="modelValue">
      <template #dropdown> dropdown </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const modelValue = ref('')
</script>

<style>
</style>