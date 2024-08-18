<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图标：PC端 -->
    <div class="hidden pt-5 h-8 xl:block">
      <img
        v-lazy
        class="m-auto"
        src="https://res.lgdsunday.club/signlogo.png"
        alt=""
      />
    </div>
    <!-- 头部图标：移动端 -->
    <div class="h-[111px] xl:hidden">
      <img
        v-lazy
        class="dark:hidden"
        src="https://res.lgdsunday.club/login-bg.png"
        alt=""
      />
      <img
        v-lazy
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        srcset=""
      />
    </div>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <Form @submit="onLoginHandler">
        <Field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="formData.username"
        />
        <ErrorMessage
          class="block text-left text-sm text-red-600 mt-0.5"
          name="username"
        />
        <Field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="formData.password"
        />
        <ErrorMessage
          class="block text-left text-sm text-red-600 mt-0.5"
          name="password"
        />
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <router-link
            :to="{ path: '/register' }"
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
          >
            去注册
          </router-link>
        </div>

        <m-button
          :loading="loading"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
        >
          登录
        </m-button>
      </Form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
    <slider-captcha-vue
      v-if="isCaptcha"
      @close="onCaptchaClose"
      @success="onCaptchaSuccess"
    ></slider-captcha-vue>
  </div>
</template>

<script setup>
import SliderCaptchaVue from './slider-captcha.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useRouter } from 'vue-router'
const isCaptcha = ref(false)
const onCaptchaSuccess = () => {
  isCaptcha.value = false
  login()
}
const onCaptchaClose = () => {
  isCaptcha.value = false
}
const onLoginHandler = () => {
  isCaptcha.value = true
}
const loading = ref(false)
const formData = ref({})
const store = useStore()
const router = useRouter()
const login = () => {
  loading.value = true
  try {
    store.dispatch('user/login', {
      ...formData.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>

<style>
</style>