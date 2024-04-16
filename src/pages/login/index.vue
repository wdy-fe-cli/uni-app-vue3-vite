<template>
  <div style="height: 100vh; background-color: #ffffff">
    <u-image src="@/static/images/banner.png" width="100vw" height="440rpx"></u-image>

    <div style="margin: 32rpx">
      <u--form :labelStyle="labelStyle" :model="formData" ref="formRef">
        <u-form-item prop="username" label="手机号" label-width="160rpx" :borderBottom="true">
          <u-input v-model="formData.username" :clearable="false" border="none" type="number" placeholder-style="color:#999" :custom-style="customInputStyle" placeholder="手机号" />
        </u-form-item>
        <u-form-item prop="password" label="密码" label-width="160rpx" :borderBottom="true">
          <view class="between-row">
            <u-input
              v-model="formData.password"
              placeholder="登录密码"
              :clearable="false"
              border="none"
              type="password"
              :password-icon="false"
              placeholder-style="color:#999"
              :custom-style="customInputStyle"
            />
          </view>
        </u-form-item>
        <u-form-item prop="code" label-width="180rpx" label="验证码" :borderBottom="true">
          <view class="flex between-row">
            <u-input v-model="formData.code" border="none" :clearable="false" :custom-style="customInputStyle" placeholder-style="color:#999" placeholder="验证码" />
            <view @click="getCodeImgSrc" class="ml16">
              <u-image :src="formData.codeImgSrc" class="code-img" width="160rpx" height="70rpx"></u-image>
            </view>
          </view>
        </u-form-item>
      </u--form>
      <u-action-sheet
        :actions="topOrgList"
        @select="selectClick"
        @close="showActionSheet = false"
        :closeOnClickOverlay="true"
        :closeOnClickAction="true"
        title="选择顶级组织"
        :show="showActionSheet"
      ></u-action-sheet>

      <u-button @click="onLogin" :custom-style="btnStyle">登录</u-button>
    </div>
  </div>
</template>

<script setup name="scan">
import { ref, nextTick, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/api/index.js'
import { generateUUID } from '../../utils'
import { setStorage } from '@/utils/storage'
import { encryptByAES } from '../../utils/secret'
import ENV_CONFIG from '@/api/env'

let baseUrl = ENV_CONFIG.VITE_API_URL
// #ifdef H5
baseUrl = '/api'
// #endif

const topOrgList = ref([])
const showActionSheet = ref(false)

const formRef = ref()
let formData = ref({
  username: '',
  password: '',
})
let getCaptchaUrl = '/user/validateCode/getValidateCode?uuid=' // 获取验证码

// 加密key值
let authKey = ref(null)

/**
 * 获取加密key值
 */
const getKey = async () => {
  let data = await http('getKey')
  console.log('data', data)
  if (!data || data.isError) return
  authKey.value = data.content
}

const onLogin = () => {
  if (!formData.value.username) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
      mask: true,
    })
    return
  }
  if (!formData.value.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
      mask: true,
    })
    return
  }
  if (!formData.value.code) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none',
      mask: true,
    })
    return
  }

  reqLogin()
}

const reqLogin = () => {
  const { username, password, uuid, code } = formData.value
  const params = {
    loginName: username,
    password,
    uuid,
    code,
    appid: 'mobileMarket',
    grant_type: 'password',
  }

  // 用户名密码加密
  params.loginName = encryptByAES(params.loginName, authKey.value)
  params.password = encryptByAES(params.password, authKey.value)

  uni.request({
    url: baseUrl + '/auth/login',
    data: params,
    method: 'POST',
    header: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    success: (response) => {
      getCodeImgSrc()
      if (response.data.code === 10000) {
        setStorage('authToken', response.data.content.access_token)
        setStorage('moduleCode', response.data.content.moduleCode)
        setStorage('appCode', response.data.content.appCode)
        setStorage('masterOrgId', response.data.content.masterOrgId || response.data.content.orgId)
        setStorage('orgId', response.data.content.orgId)

        findTopOrganizationByUserId()
      } else {
        uni.showToast({
          title: response.data.subMessage,
          icon: 'none',
          mask: true,
        })
      }
    },
    fail: (e) => {
      getCodeImgSrc()
      uni.showToast({
        title: e.data.subMessage,
        icon: 'none',
        mask: true,
      })
    },
    complete: () => {},
  })
}

// 获取顶级组织多列表
const findTopOrganizationByUserId = async () => {
  const params = {}
  try {
    let res = await http('findTopOrganizationByUserId', params)
    if (!res.content) return

    // 多个顶级组织登录
    if (res.content && res.content.length > 1) {
      topOrgList.value = res.content
      showActionSheet.value = true
    } else {
      uni.redirectTo({ url: '/pages/home/index' })
    }
  } catch (error) {
    console.log(error)
  }
  return Promise.resolve(true)
}

const selectClick = (item) => {
  console.log(item)
  setStorage('masterOrgId', item.id)
  uni.redirectTo({ url: '/pages/home/index' })
}

const getCodeImgSrc = () => {
  const src = baseUrl + getCaptchaUrl + generateUUID()
  formData.value.codeImgSrc = src
  const index = src.lastIndexOf('=')

  formData.value.uuid = src.substring(index + 1, src.length)
}

const labelStyle = {
  // 自定义label样式
  fontSize: '30rpx',
  color: '#333',
  marginLeft: '10rpx',
}
const customInputStyle = {
  // 自定义label样式
  fontSize: '30rpx',
  color: '#333',
}
const btnStyle = {
  fontSize: '32rpx',
  color: '#fff',
  height: '98rpx',
  borderRadius: '8rpx',
  fontWeight: 'bold',
  background: '#518CFC',
  marginTop: '120rpx',
}

onLoad(() => {
  getCodeImgSrc()
  // 获取加解密key值(放在reqLogin中第一次点击报错)
  getKey()
})
</script>
<style scoped lang="scss">
.h70 {
  height: 70rpx;
  margin-right: 10rpx;
}
.login-form {
  padding-bottom: 102rpx;
  .code-img {
    height: 70rpx;
    width: 160rpx;
  }
}
</style>
