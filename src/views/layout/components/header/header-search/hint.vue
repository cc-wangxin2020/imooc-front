<template>
  <div>
    <div
      class="text-base font-bold text-zinc-500 px-1 py-1 rounded duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-for="(item, index) in pexelsList"
      v-html="hightlightText(item)"
      :key="index"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'onItemClick'
</script>
<script setup>
import { getPexelsHint } from '@/api/pexels'
import { ref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMITS_ITEM_CLICK])
const pexelsList = ref([])
const getPexelsHintData = async () => {
  if (!props.searchText) return
  const { result } = await getPexelsHint(props.searchText)
  pexelsList.value = result
}
watchDebounced(() => props.searchText, getPexelsHintData, { debounce: 500 })
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}

const hightlightText = (item) => {
  const hightlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return item.replace(reg, hightlightStr)
}
</script>

<style>
</style>