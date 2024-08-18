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
      <Form @submit="onRegister">
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
        <Field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="confirmPassword"
          type="password"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="formData.confirmPassword"
        />
        <ErrorMessage
          class="block text-left text-sm text-red-600 mt-0.5"
          name="confirmPassword"
        />
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <div class="mb-2">
            <router-link
              :to="{ path: '/login' }"
              class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            >
              去登录
            </router-link>
          </div>
          <div class="flex items-center">
            <Field
              type="checkbox"
              name="policy"
              value="policy"
              v-model="formData.checkPolicy"
            />
            <a
              class="ml-1 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
              href="https://m.imooc.com/newfaq?id=89"
              target="__black"
            >
              注册即同意《慕课网注册协议》
            </a>
          </div>
        </div>
        <m-button
          :loading="loading"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
        >
          立即注册
        </m-button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate'
import {
  validateUsername,
  validatePassword,
  isCheckedPolicy
} from '../validate'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useRouter } from 'vue-router'
import { message } from '@/libs'
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  checkPolicy: ''
})
const loading = ref(false)
const store = useStore()
const router = useRouter()
const onRegister = async () => {
  loading.value = true
  if (!formData.value.checkPolicy) {
    message('error', '未选中隐私协议')
    loading.value = false
    return
  }
  try {
    const payload = {
      username: formData.value.username,
      password: formData.value.password
    }
    // 触发注册
    await store.dispatch('user/register', payload)
    // 触发登录
    await store.dispatch('user/login', {
      ...payload,
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