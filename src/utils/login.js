import { postMessage } from './H5PostMessage'

export const goLogin = () => {
  uni.showToast({
    title: '请先登录',
    icon: 'none',
    mask: true,
  })
  setTimeout(() => {
    postMessage('JUMP_OTHER_PAGE', 'app:/pages/login/index')
  }, 1500)
}
