<template>
  <div
    v-if="pexelData.title"
    class=" fixed top-0 left-0 w-screen h-screen pb-2 bg-zinc-200 z-20 backdrop-blur-4xl bg-transparent overflow-y-auto xl:p-2"
  >
    <m-navbar
      v-if="isMobileTerminal"
      :sticky="true"
      @onClickLeft="onPop"
      @onClickRight="onPop"
    >
      {{ pexelData.title }}
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <m-svg-icon
      v-else
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      name="close"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>
    <div class="duration-300 xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        v-lazy
        class="w-screen h-full duration-300 mb-2 object-cover xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexelData.photo"
        alt=""
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg"
      >
        <!-- pc下显示分享和收藏按钮 -->
        <div v-if="!isMobileTerminal" class="flex items-center p-2 my-2 mx-2 justify-between">
          <m-svg-icon
            class="w-4 h-4 p-1 rounded cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800"
            name="share"
          ></m-svg-icon>
          <m-button type="info" icon="heart"  iconClass="fill-zinc-900 dark:fill-zinc-200" ></m-button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 font-bold ml-1 mb-2 xl:ml-3 xl:text-lg"
        >
          {{ pexelData.title }}
        </p>
        <!-- 头像 -->
        <div class="flex items-center xl:mt-4 duration-300">
          <img
            class="w-3 h-3 rounded-full mx-1 xl:ml-3 duration-300"
            :src="pexelData.avatar"
            alt=""
          />
          <span class="text-sm text-zinc-900 dark:text-zinc-200 duration-300" >{{
            pexelData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getPexelsById } from '@/api/pexels'
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const router = useRouter()
const onPop = () => {
  router.back()
}
const onClickRight = () => {
  router.back()
}
const pexelData = ref({})
const getPexelData = async () => {
  const res = await getPexelsById(props.id)
  pexelData.value = res
}
getPexelData()
</script>

<style>
</style>