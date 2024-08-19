<template>
  <div
    class="w-5 flex flex-col items-center justify-center mx-0.5"
    @click="onItemClick"
  >
    <m-svg-icon
      :name="icon"
      :fillClass="iconClass"
      class="w-2 h-2"
    ></m-svg-icon>
    <span class="text-sm mt-0.5" :class="textClass">
      <slot />
    </span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps({
  icon: {
    type: String
  },
  iconClass: {
    type: String
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  },
  to: {
    type: String
  }
})
const router = useRouter()
const store = useStore()
const onItemClick = () => {
  if (!props.to) {
    return
  }
  store.commit('app/changeRouterType', 'push')
  router.push(props.to)
}
</script>

<style>
</style>