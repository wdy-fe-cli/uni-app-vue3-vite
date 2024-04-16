<template>
  <form-layer :menuList="menuList" @getFormData="getFormData" />
</template>

<script setup>
import { ref } from 'vue'
import FormLayer from '@/components/form-picker/FormLayer.vue'

const props = defineProps({
  // 导航数据
  getMenuListFragment: {
    type: Function,
    default: () => {}
  },
  // 不在筛选中显示
  menuSlot: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['getFormData'])

const menuList = ref([
  ...props.menuSlot,
  ...props.getMenuListFragment('cell'),
  {
    title: '筛选',
    type: 'filter',
    children: props.getMenuListFragment('radio')
  }
])

const getFormData = (formData) => {
  // 筛选展开时，同步顶部表头数据
  for (let i = 0; i < menuList.value.length; i++) {
    if (menuList.value[i].props in formData) {
      menuList.value[i].options.forEach((item) => {
        if (formData[menuList.value[i].props] === item.value) {
          menuList.value[i].title = item.label
        }
      })
    }
  }

  console.log('menuList', menuList)
  console.log('处理完后的menuList', menuList)
  emit('getFormData', formData)
}
</script>

<style></style>
