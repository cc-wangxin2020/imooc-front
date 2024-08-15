<template>
  <div>
    <div class="flex items-center text-sm mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer rounded-sm duration-300 hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      ></m-svg-icon>
    </div>
    <div class="flex flex-wrap items-center">
      <div
        class="flex items-center px-1.5 py-0.5 text-sm text-zinc-900 cursor-pointer font-bold duration-300 rounded-sm mr-2 mb-1.5 bg-zinc-100 hover:bg-zinc-200"
        v-for="(item, index) in $store.getters.history"
        :key="index"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 ml-1 cursor-pointer rounded-sm p-0.5 duration-300 hover:bg-zinc-100"
          @click.stop="onDeleteClick(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'onItemClick'
</script>
<script setup>
import { useStore } from 'vuex'
import { confirm } from '@/libs'
const emits = defineEmits([EMITS_ITEM_CLICK])
const store = useStore()
const onDeleteAllClick = () => {
  console.log('deleteAll')
  confirm('删除全部历史记录')
    .then(() => {
      store.commit('search/clearHistory')
    })
    .catch((err) => {})
}
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
const onDeleteClick = (index) => {
  store.commit('search/deleteHistory', index)
}
</script>

<style>
</style>