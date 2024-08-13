<template>
  <m-waterfall :data="pexelsList" :column="isMobileTerminal? 2: 5" :picturePreReading="true">
    <template v-slot="{ item, width }">
      <item-vue :data="item" :width="width"></item-vue>
    </template>
  </m-waterfall>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import ItemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
const query = ref({
  page: 1,
  size: 20
})
const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  console.log(res)

  pexelsList.value = res.list
}
getPexelsData()
</script>

<style>
</style>