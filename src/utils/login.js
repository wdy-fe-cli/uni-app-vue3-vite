import { http, appId } from '@/api/index.js'
import { setStorage, getStorage } from '@/utils/storage'

let loginLock = false

export const login = function () {
  if (loginLock) return
  loginLock = true
  uni.showToast({
    title: '登录信息失效',
    icon: 'none',
    mask: true
  })
  setTimeout(() => {
    uni.reLaunch({ url: '/pages/login/index' })
  }, 1500)
  setTimeout(() => {
    loginLock = false
  }, 500)
}
