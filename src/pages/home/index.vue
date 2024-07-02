<template>
  <view>
    <uv-skeletons :loading="loading" :skeleton="skeleton"></uv-skeletons>

    <div class="w-full h-[100px] flex justify-center items-center mt-100">1111</div>
  </view>
</template>

<script setup name="scan">
import { ref, nextTick, computed } from 'vue'

let loading = ref(true)
let skeleton = ref([
  {
    type: 'line',
    num: 3,
    gap: '20rpx',
  },
])
</script>
