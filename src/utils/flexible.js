import { computed } from "vue";
import { PC_DEVICE_WIDTH } from "@/constants";
import { useWindowSize } from "@vueuse/core";

// 判断是否为移动端设备
const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

// 设置rem基准值
export const useREM = () => {
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}