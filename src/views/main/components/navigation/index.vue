<template>
  <mobile-navigation-vue v-if="isMobileTerminal" :data="categoryData" />
  <pc-navigation-vue v-else />
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'
import { ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
const categoryData = ref([])
const getCategories = async () => {
  const res = await getCategory()
  categoryData.value = res.categorys
  categoryData.value.unshift(ALL_CATEGORY_ITEM)
}
getCategories()
</script>

<style>
</style>