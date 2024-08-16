<template>
  <div
    ref="searchTarget"
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <m-svg-icon
        class="w-2 h-2 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      ></m-svg-icon>
      <input
        class="block w-full h-[44px] pl-4 text-base outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @input="onInputClick"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
        @keydown.enter="onSearchHandler"
      />
      <m-svg-icon
        v-show="inputValue"
        class="w-2 h-2 absolute top-[50%] right-8 translate-y-[-50%] duration-500 cursor-pointer"
        name="input-delete"
        @click="onClearClick"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-2 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- 搜索按钮 -->
      <m-button
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100"
        icon="search"
        iconColor="#ffffff"
        @click="onSearchHandler"
      ></m-button>
    </div>
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto absolute z-20 left-0 top-[56px] bg-white rounded p-2 border border-zinc-200 duration-200 hover:shadow-3xl dark:bg-zinc-800 dark:border-zinc-600 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
const EMIT_SEARCH = 'search'
const EMIT_CLEAR = 'clear'
const EMIT_INPUT = 'input'
const EMIT_FOCUS = 'focus'
const EMIT_BLUR = 'blur'
</script>
<script setup>
import { ref } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_CLEAR,
  EMIT_SEARCH,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])
const inputValue = useVModel(props)
const inputRef = ref(null)
const onSearchHandler = () => {
  console.log(inputRef)

  emits(EMIT_SEARCH, inputValue.value, inputRef)
}
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR)
}
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
const searchTarget = ref(null)
onClickOutside(searchTarget, (e) => {
  isFocus.value = false
})
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>