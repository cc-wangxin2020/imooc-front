<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin"
    ></m-svg-icon>
    <m-svg-icon
      v-if="icon && !loading"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <slot v-else></slot>
  </button>
</template>
<script>
const typeEnum = {
  primary:
    'text-white  bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  main: 'text-white  bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700'
}
// size 可选项：表示按钮大小。区分文字按钮和icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMIT_CLICK = 'click'
</script>
<script setup>
import MSvgIcon from '../svg-icon/index.vue'
import { computed } from 'vue'
// type 可选项：表示按钮风格
const props = defineProps({
  icon: {
    type: String
  },
  iconColor: {
    type: String
  },
  iconClass: {
    type: String
  },
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的type必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的type必须是${keys.join('、')}中的一个`)
      }
      return result
    },
    isActiveAnim: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  loading: {
    type: Boolean,
    default: false
  },
  isActiveAnim: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits([EMIT_CLICK])
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
const onBtnClick = () => {
  emits(EMIT_CLICK)
}
</script>

<style>
</style>