<template>
  <view>
    <div class="mt-[40rpx] pl-[100rpx] text-xl font-semibold">您好！</div>
    <div class="mt-[40rpx] pl-[100rpx]">欢迎使用浙江高速驿网无线WiFi</div>

    <div class="mt-[40rpx] pl-[40rpx]">
      <uv-swiper :list="list" indicator indicatorMode="line" circular></uv-swiper>
    </div>

    <view class="mt-[40rpx]">
      <uv-form labelPosition="left" :model="formData" :rules="formRules" ref="form">
        <uv-form-item prop="name" borderBottom>
          <uv-input v-model="formData.name" placeholder="请输入手机号" border="none"> </uv-input>
        </uv-form-item>
        <uv-form-item prop="code" borderBottom labelWidth="80">
          <uv-input v-model="formData.code" border="none" placeholder="请填写验证码"></uv-input>
          <template v-slot:right>
            <uv-button text="获取验证码" type="primary" @click="getCode"></uv-button>
          </template>
        </uv-form-item>

        <uv-button type="primary" text="提交" customStyle="margin-top: 10px" @click="submit"></uv-button>
      </uv-form>
    </view>

    <view class="app-container__row" @click="navigateTo('/pages/setting/currentText')">
      <view class="flex">用户协议</view>
      <u-icon name="arrow-right" size="14" />
    </view>
    <view class="app-container__row" @click="navigateTo('/pages/setting/privacyText')">
      <view class="flex">隐私协议</view>
      <u-icon name="arrow-right" size="14" />
    </view>
  </view>
</template>

<script setup name="scan">
import { ref, nextTick, computed } from 'vue'

let loading = ref(true)
let formData = ref({
  name: '',
  code: '',
})
let formRules = ref({
  'data.name': {
    type: 'string',
    required: true,
    message: '请输入手机号',
    trigger: ['blur', 'change'],
  },
  'data.code': {
    type: 'string',
    required: true,
    message: '请输入验证码',
    trigger: ['blur', 'change'],
  },
})
let list = ref(['https://cdn.uviewui.com/uview/swiper/swiper3.png', 'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper1.png'])

// 获取验证码
const getCode = () => {
  uni.showToast({
    icon: 'success',
    title: '获取验证码成功',
  })
}
// 提交
const submit = () => {
  // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
  this.$refs.form
    .validate()
    .then((res) => {
      uni.showToast({
        icon: 'success',
        title: '校验通过',
      })
    })
    .catch((errors) => {
      uni.showToast({
        icon: 'error',
        title: '校验失败',
      })
    })
}
</script>
