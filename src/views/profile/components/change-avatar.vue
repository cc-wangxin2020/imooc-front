<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img ref="imageTarget" class="" :src="blob" />

    <m-button
      :loading="loading"
      class="mt-4 w-[80%] xl:w-1/2"
      @click="onConfirmClick"
      >确定</m-button
    >
  </div>
</template>
<script>
const CONFIRM = 'confirm'
const CLOSE = 'close'
</script>
<script setup>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { onMounted, ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { getOSSClient } from '@/utils/sts'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { putProfile } from '@/api/sys'
defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits([CLOSE, CONFIRM])
const loading = ref(false)
const onConfirmClick = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob((blob) => {
    putObjectToOSS(blob)
  })
}
// 图片上传
let ossClient = null
const store = useStore()
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    const res = await ossClient.put(`images/${fileName}`, file)
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
  }
}
// 更新服务器
const onChangeProfile = async (avatar) => {
  // 更新本地
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  await putProfile(store.getters.userInfo)
  message('success', '用户头像更新成功')
  loading.value = false
  close()
}
const close = () => {
  emits(CLOSE)
}
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}

let cropper
const imageTarget = ref(null)
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal ? mobileOptions : pcOptions
  )
})
</script>

<style>
</style>