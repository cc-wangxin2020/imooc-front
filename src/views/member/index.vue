<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <!-- 移动端 navbar 处理 -->
      <m-navbar v-if="isMobileTerminal" sticky @onClickLeft="onNavbarLeftClick">
        精选会员
      </m-navbar>

      <div class="py-2 px-1 duration-300">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP，畅想所有内容
        </p>
        <div class="min-h-[220px]">
          <div
            class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          >
            <pay-menu-item-vue
              v-for="item in vipPayListData"
              :key="item.id"
              :hot="item.isHot"
              :select="item.id === currentPayData.id"
              :data="item"
              @click="onChangeCurrentPay"
            ></pay-menu-item-vue>
          </div>
          <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
        </div>
        <m-count-down :time="1000 * 60">
          <template v-slot="{ showTime }">
            <p class="text-sm">秒杀倒计时：{{ showTime }}</p>
          </template>
        </m-count-down>
        <!-- 支付 -->
        <payment-vue></payment-vue>
      </div>
    </div>
  </div>
</template>


<script setup>
import PayMenuItemVue from './components/pay-menu-item.vue'
import PaymentVue from './components/payment/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getVipPayList } from '@/api/pay'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const vipPayListData = ref([])
const currentPayData = ref({})
const getVipPayData = async () => {
  const res = await getVipPayList()
  vipPayListData.value = res
  currentPayData.value = res[0]
}
getVipPayData()
const onChangeCurrentPay = (item) => {
  currentPayData.value = item
}
const store = useStore()
const router = useRouter()
const onNavbarLeftClick = () => {
  console.log('left')

  store.commit('app/changeRouterType', 'back')
  router.back()
}
</script>

<style>
</style>