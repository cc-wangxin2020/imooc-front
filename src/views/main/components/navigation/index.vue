<template>
  <mobile-navigation-vue v-if="isMobileTerminal"/>
  <pc-navigation-vue v-else />
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('category/useCategoryData')

</script>

<style>
</style>