<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2"
    >
      <!-- 移动端 navbar -->
      <m-navbar sticky v-if="isMobileTerminal" @onClickLeft="onNavbarLeftClick">
        个人资料
      </m-navbar>
      <!-- pc 端 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <!-- 头像 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >
          <!-- 头像部分 -->
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
          >
            <img
              v-lazy
              :src="$store.getters.userInfo.avatar"
              alt=""
              class="rounded-[50%] w-full h-full xl:inline-block"
            />
            <div
              class="absolute hidden top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] text-center xl:group-hover:block"
              @click="onAvatarClick"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            v-model="userInfo.nickname"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input
            v-model="userInfo.title"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input
            v-model="userInfo.company"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input
            v-model="userInfo.homePage"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>
        <!-- 保存修改 -->
        <m-button
          :loading="loading"
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onChangeProfile"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>
    <!-- PC 端 -->
    <m-dialog v-if="!isMobileTerminal" v-model="isVisible">
      <change-avatar-vue
        :blob="currentBlob"
        @close="isVisible = false"
      ></change-avatar-vue>
    </m-dialog>
    <!-- 移动端：在展示时指定高度 -->
    <m-popup v-else :class="{ 'h-screen': isVisible }" v-model="isVisible">
      <change-avatar-vue
        :blob="currentBlob"
        @close="isVisible = false"
      ></change-avatar-vue>
    </m-popup>
  </div>
</template>
<script>
export default {
  name: 'profile'
}
</script>
<script setup>
import ChangeAvatarVue from './components/change-avatar.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { confirm, message } from '@/libs'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { putProfile } from '@/api/sys'

console.log('profile被渲染')

const store = useStore()
const router = useRouter()

// 隐藏域
const inputFileTarget = ref(null)
/**
 * 更换头像点击事件
 */
const onAvatarClick = () => {
  inputFileTarget.value.click()
}
const isVisible = ref(false)
const currentBlob = ref('')
/**
 * 头像选择之后的回调
 */
const onSelectImgHandler = () => {
  const imgFile = inputFileTarget.value.files[0]
  const blob = URL.createObjectURL(imgFile)
  isVisible.value = true
  currentBlob.value = blob
}

watch(isVisible, () => {
  inputFileTarget.value.value = null
})

/**
 * 移动端后退处理
 */
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

/**
 * 移动端：退出登录
 */
const onLogoutClick = () => {
  confirm('确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
  })
}
const userInfo = ref(store.getters.userInfo)
const loading = ref(false)
const onChangeProfile = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '修改用户信息成功')
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
</script>