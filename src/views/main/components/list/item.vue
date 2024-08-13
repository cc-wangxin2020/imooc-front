<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 duration-500 rounded pb-1"
    :style="{
      width: width + 'px'
    }"
  >
    <div class="relative w-full rounded cursor-zoom-in group">
      <img
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
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
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
        ></m-button>
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          type="info"
          size="small"
        ></m-button>
      </div>
    </div>
    <p class="text-base mt-1 font-bold text-zinc-900 dark:text-zinc-300">
      {{ data.title }}
    </p>
    <div class="mt-1 flex items-center px-1">
      <img class="w-2 h-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-base text-zinc-500 ml-1 max-sm:text-sm">{{
        data.author
      }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object
  },
  width: {
    type: Number
  }
})
</script>

<style>
</style>