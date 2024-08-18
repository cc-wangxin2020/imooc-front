<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? ' sticky top-0 left-0' : 'relative']"
  >
    <div
      class="h-full w-5 absolute left-0 flex items-center justify-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <m-svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        />
      </slot>
    </div>
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot />
    </div>
    <div
      class="h-full w-5 absolute right-0 flex items-center justify-center"
      @click="onClickRight"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
const EMIT_CLICK_LEFT = 'onClickLeft'
const EMIT_CLICK_RIGHT = 'onClickRight'
</script>
<script setup>
defineProps({
  sticky: {
    type: Boolean
  }
})
const emits = defineEmits([EMIT_CLICK_LEFT, EMIT_CLICK_RIGHT])
const onClickLeft = () => {
  emits(EMIT_CLICK_LEFT)
}
const onClickRight = () => {
  emits(EMIT_CLICK_RIGHT)
}
</script>

<style>
</style>