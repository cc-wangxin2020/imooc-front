<template>
  <div class="relative">
    <input
      v-if="type === TYPE_TEXT"
      type="text"
      v-model="text"
      :maxlength="max"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    />
    <textarea
      v-if="type === TYPE_TEXTAREA"
      rows="5"
      v-model="text"
      :maxlength="max"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
const enums = [TYPE_TEXT, TYPE_TEXTAREA]
</script>
<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(val) {
      const res = enums.includes(val)
      if (!res) {
        throw new Error(`type必须为${enums.join('、')}中的一个`)
      }
      return res
    }
  },
  max: {
    type: [String, Number]
  }
})
defineEmits(['update:modelValue'])
const text = useVModel(props)
const currentNumber = computed(() => {
  return text.value.length
})
</script>

<style>
</style>