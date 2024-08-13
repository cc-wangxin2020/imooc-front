<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <template v-if="columnWidth && data.length">
      <div
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          top: item._style?.top + 'px',
          left: item._style?.left + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getAllImg,
  getImgElements,
  onComplateImgs,
  getMinHeightColumn,
  getMaxHeight,
  getMinHeight
} from './utils'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  column: {
    type: Number,
    default: 2
  },
  nodeKey: {
    type: String
  },
  columnSpacing: {
    type: Number,
    default: 20
  },
  rowSpacing: {
    type: Number,
    default: 20
  },
  picturePreReading: {
    type: Boolean
  }
})
/**
 *  计算containerHeight = 每一列高度的最大值
 *  columnHeightObj: key- 列标记 val: 高度
 *  计算列高需要区分加载完成和未加载完成
 * */
const containerHeight = ref(0)
const columnHeightObj = ref({})
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
/**
 * 图片进行预加载
 */
let itemHeights = []
const waitImgComplate = () => {
  itemHeights = []
  const itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  const imgElementList = getImgElements(itemElements)
  const allImgs = getAllImg(imgElementList)
  onComplateImgs(allImgs).then(() => {
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    console.log(itemHeights)
    useItemLocation()
  })
}
/**
 * 图片不预先加载
 */
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 计算 item 高度
  itemElements.forEach((el) => {
    // 依据传入数据计算出的 img 高度
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}
/**
 * 根据高度渲染位置
 */
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    // 指定列高度自增
    increasingHeight(index)
  })
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
const getItemLeft = () => {
  // 最小高度所在列
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    columnWidth.value * column +
    props.columnSpacing * column +
    containerLeft.value
  )
}
const getItemTop = () => {
  const minHeight = getMinHeight(columnHeightObj.value)
  console.log(minHeight)

  return minHeight
}
const increasingHeight = (index) => {
  const column = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[column] += itemHeights[index] + props.rowSpacing
}
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        // 构建高度记录容器
        useColumnHeightObj()
      }
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)
/**
 * 计算列宽：(容器的宽度 - padding - (props.column - 1) * props.columnSpacing) / props.column
 *
 */
const containerTarget = ref(null)
const containerWidth = ref(0)
const containerLeft = ref(0)
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}
const columnWidth = ref(0)
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
const useColumWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}
const reset = () => {
  setTimeout(() => {
    useColumWidth()
    props.data.forEach((item) => {
      item._style = null
    })
  }, 100)
}
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      columnWidth.value = 0
      nextTick(reset)
    } else {
      reset()
    }
  }
)
onMounted(() => {
  useColumWidth()
})
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
</script>

<style>
</style>