<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 duration-500 rounded pb-1"
    :style="{
      width: width + 'px'
    }"
  >
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{
        background: randomRGB()
      }"
      @click="onPinsClick"
    >
      <img
        v-lazy
        ref="imgTarget"
        class="w-full rounded bg-transparent"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
        :src="data.photo"
        alt=""
      />
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <m-button class="absolute top-1.5 left-1.5" @click="onShareClick"
          >分享</m-button
        >
        <m-button
          class="absolute top-1.5 right-1.5"
          icon="heart"
          type="info"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          type="info"
          size="small"
          @click="onDownload"
        ></m-button>
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          type="info"
          size="small"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <p class="text-base mt-1 font-bold text-zinc-900 dark:text-zinc-300">
      {{ data.title }}
    </p>
    <div class="mt-1 flex items-center px-1">
      <img v-lazy class="w-2 h-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-base text-zinc-500 ml-1 max-sm:text-sm">{{
        data.author
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { saveAs } from 'file-saver'
import { randomRGB } from '@/utils/color.js'
import { weiboShare } from '@/utils/share'
import { message } from '@/libs'
import { useElementBounding, useFullscreen } from '@vueuse/core'
import { computed, ref } from 'vue'
const props = defineProps({
  data: {
    type: Object
  },
  width: {
    type: Number
  }
})
const emits = defineEmits(['click'])
const onDownload = () => {
  message('success', '下载文件')
  setTimeout(() => {
    /**
     * 1. 下载的图片链接
     */
    saveAs(props.data.photo)
  }, 100)
}
const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)
const {
  x: containerX,
  y: containerY,
  width: containerWidth,
  height: containerHeight
} = useElementBounding(imgTarget)
const location = computed(() => {
  return {
    translateX: parseInt(containerX.value + containerWidth.value / 2),
    translateY: parseInt(containerY.value + containerHeight.value / 2)
  }
})
const onPinsClick = () => {
  emits('click', {
    id: props.data.id,
    location: location.value
  })
}
/**
 * 分享按钮点击处理
 */
const onShareClick = () => {
  weiboShare(
    props.data.photo,
    `https://imooc-front.lgdsunday.club/pins/${props.data.id}`
  )
}
</script>

<style>
</style>