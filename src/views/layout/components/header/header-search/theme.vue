<template>
  <div>
    <div class="text-xs text-zinc-400 mb-1">热门精选</div>
    <div class="flex h-[140px]">
      <div
        class="relative rounded w-[260px] cursor-pointer"
        v-if="themeData.list.length"
      >
        <img
          class="w-full h-full rounded object-cover"
          :src="themeData.big.photo"
          alt=""
        />
        <div
          class="absolute bottom-0 left-0 w-full h-[50%] pl-1 flex items-center rounded text-sm text-white backdrop-blur duration-300 hover:backdrop-blur-none"
        >
          # {{ themeData.big.title }}
        </div>
      </div>
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          class="relative h-[45%] w-[260px] text-sm text-white rounded ml-1.5 mb-1.5"
          v-for="(item, index) in themeData.list"
          :key="index"
        >
          <img
            class="w-full h-full object-cover rounded"
            :src="item.photo"
            alt=""
          />
          <div
            class="flex items-center backdrop-blur absolute top-0 left-0 pl-1 w-full h-full rounded duration-300 hover:backdrop-blur-none"
          >
            # {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getThemes } from '@/api/pexels'
import { ref } from 'vue'
const themeData = ref({
  big: {},
  list: []
})
const getThemeData = async () => {
  const { themes } = await getThemes()
  themeData.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
  console.log(themeData.value)
}
getThemeData()
</script>

<style>
</style>