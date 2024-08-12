<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 last:mr-4">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-sm text-zinc-600 overflow-hidden"
    >
      <!-- slider滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[28px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200"
        :class="{
          'text-zinc-100': currentCategoryIndex === index
        }"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
      <!-- 面包屑 -->
      <li
        class="z-20 fixed top-[3px] right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
      >
        <m-svg-icon
          class="w-1.5 h-1.5"
          name="hamburger"
          @click="isOpenPopup = !isOpenPopup"
        ></m-svg-icon>
      </li>
    </ul>
    <m-popup v-model="isOpenPopup">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import MenuVue from '../../menu/index.vue'
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'

const sliderStyle = ref({
  transfrom: 'translateX(-10px)',
  width: '58px'
})
// 选中item的下标
const currentCategoryIndex = ref(0)
// 获取所有item元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})
// 获取ul的横向滚动距离
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (val) => {
  getBoundingByIndex(val)
})
const getBoundingByIndex = (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${left + ulScrollLeft.value - 10}px)`,
    width: width + 'px'
  }
}

// 弹出层
const isOpenPopup = ref(false)
const onItemClick = (index) => {
  currentCategoryIndex.value = index
  isOpenPopup.value = false
}
</script>

<style>
</style>