<template>
  <view class="app-container"> <rich-text :nodes="html"></rich-text> </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { http } from '@/api/index.js'

let html = ref()

const getHtml = async () => {
  try {
    let res = await http('getPrivacyAgreement')
    if (!res.content) return
    console.log(res.content)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getHtml()
})
</script>
<style lang="scss" scoped>
.app-container {
  background: #ffffff;
  padding-left: 32rpx;
}
</style>
