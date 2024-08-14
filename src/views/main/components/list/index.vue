<template>
  <m-infinite-list
    v-model="loading"
    :isFinished="isFinished"
    @onLoad="getPexelsData"
  >
    <m-waterfall
      :data="pexelsList"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfall>
  </m-infinite-list>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import ItemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
const query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const loading = ref(false)
const isFinished = ref(false)
const getPexelsData = async () => {
  if (isFinished.value) return
  if (pexelsList.value.length) {
    query.page += 1
  }
  const res = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}
</script>

<style>
</style>