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
        <item-vue :data="item" :width="width" @click="onPinsClick"></item-vue>
      </template>
    </m-waterfall>
  </m-infinite-list>
  <!-- 详情页组件展示 -->
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <pins-vue v-if="isPinsVisible" :id="currentPins.id"></pins-vue>
  </transition>
</template>

<script setup>
import ItemVue from './item.vue'
import PinsVue from '../../../pins/components/pins.vue'
import { ref, watch } from 'vue'
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { useEventListener } from '@vueuse/core'
import { gsap } from 'gsap'
let query = {
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
const resetQuery = (obj) => {
  query = { ...query, ...obj }
  pexelsList.value = []
  loading.value = false
  isFinished.value = false
}
const store = useStore()
watch(
  () => store.getters.currentCategory,
  (newCategory) => {
    resetQuery({
      categoryId: newCategory.id
    })
  }
)

watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
useEventListener(window, 'popstate', () => {
  isPinsVisible.value = false
})
const currentPins = ref({})
const isPinsVisible = ref(false)
const onPinsClick = (item) => {

  history.pushState(null, null, `/pins/${item.id}`)
  currentPins.value = item
  isPinsVisible.value = true
}
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.location?.translateX,
    y: currentPins.value.location?.translateY,
    opacity: 0
  })
}
</script>

<style>
</style>