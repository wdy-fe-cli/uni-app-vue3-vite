<template>
  <le-dropdown
    v-model:menuList="currentMenuList"
    themeColor="#3cc51f"
    :duration="300"
    :isCeiling="true"
    @onConfirm="onConfirm"
    @onChange="onChange"></le-dropdown>
</template>

<script setup>
import { ref, watch } from 'vue'
import leDropdown from './le-dropdown/le-dropdown'

import { DropdownList } from './data_示例.js'

const props = defineProps({
  // 导航数据
  menuList: {
    type: Array,
    default: () => DropdownList
  }
})

const currentMenuList = ref(props.menuList)

watch(
  () => props.menuList,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
    currentMenuList.value = newVal
  },
  { deep: true }
)

const emit = defineEmits(['getFormData'])

const formData = {}

// const menuList = ref(DropdownList)
const onConfirm = (data) => {
  console.log('确定事件', data)

  if (data.type === 'time') {
    data.title = data.value
  }

  if (data.type !== 'filter') {
    formData[data.props] = data.value
  } else {
    // console.log('filter', data)

    data.children.forEach((item) => {
      formData[item.props] = item.value
    })

    // console.log(formData)
  }

  emit('getFormData', formData)
}
const onChange = (data, sIndex) => {
  // console.log('改变事件', data, sIndex)
}
</script>
