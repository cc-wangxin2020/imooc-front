<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <hint-vue
          :searchText="inputValue"
          v-show="inputValue"
          @onItemClick="onSearchHandler"
        ></hint-vue>
        <history-vue
          v-show="!inputValue"
          @onItemClick="onSearchHandler"
        ></history-vue>
        <theme-vue v-show="!inputValue"></theme-vue>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import HintVue from './hint.vue'
import HistoryVue from './history.vue'
import ThemeVue from './theme.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
const inputValue = ref('')
const store = useStore()
const onSearchHandler = (val, el) => {
  inputValue.value = val
  store.commit('app/changeSearchText', val)
  store.commit('search/addHistory', val)
}
</script>

<style>
</style>