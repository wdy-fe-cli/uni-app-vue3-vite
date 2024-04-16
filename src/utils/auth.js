/**
 * v-auth
 * 按钮权限指令
 */
import { useAuthStore } from '@/stores/auth'
import { apiUrls } from '@/api/index.js'

const auth = (value) => {
  const authStore = useAuthStore()
  const currentPageRoles = authStore.authButtonListGet || []
  // console.log('sss22', authStore, currentPageRoles, apiUrls)
  if (currentPageRoles && currentPageRoles[0] === 'all') return true
  if (value instanceof Array && value.length) {
    const hasPermission = value.every((item) => {
      const temUrl = apiUrls.get(item)[0]
      return currentPageRoles.includes(temUrl)
    })
    return hasPermission
  } else {
    const temUrl = apiUrls.get(value) ? apiUrls.get(value)[0] : ''
    return currentPageRoles.includes(temUrl)
  }
}

export default auth
