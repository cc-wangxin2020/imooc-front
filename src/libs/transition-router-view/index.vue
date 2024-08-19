<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <keep-alive :include="virtualTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script>
const NONE = 'none'
const PUSH = 'push'
const BACK = 'back'
const ROUTER_TYPE = [NONE, PUSH, BACK]
</script>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const res = ROUTER_TYPE.includes(val)
      if (!res) {
        throw new Error(
          `你指定的routerType必须为${ROUTER_TYPE.join('、')}中的一个`
        )
      }
      return res
    }
  },
  mainComponentName: {
    type: String
  }
})
const virtualTaskStack = ref([props.mainComponentName])
const transitionName = computed(() => {
  return props.routerType
})
// 处理动画状态变化
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}
const router = useRouter()
router.beforeEach((to, from, next) => {
  if (props.routerType === PUSH) {
    virtualTaskStack.value.push(to.name)
  } else if (props.routerType === BACK) {
    virtualTaskStack.value.pop()
  } else if (to.name === props.mainComponentName) {
    // 清空虚拟任务栈
    clearStack()
  }
  next()
})
const clearStack = () => {
  virtualTaskStack.value = ref([props.mainComponentName])
}
</script>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>