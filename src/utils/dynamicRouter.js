import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

export const initDynamicRouter = async () => {
  try {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    // 1. 前置数据获取
    await authStore.findModuleApplicationByAbbreviation() // 获取应用基础信息
    await authStore.findSubstantiveOrganizationTreeByUser() // 获取绑定的组织内容
    await userStore.findUserInfoById() // 获取菜单权限
    await authStore.getAuthMenuList() // 获取菜单权限
    await authStore.getAuthButtonList() // 获取按钮权限
    // 2.判断当前用户有没有菜单权限
    if (!authStore.authMenuListGet.length) {
      uni.showToast({
        title: '暂无权限',
        icon: 'none'
      })
      return Promise.reject('No permission')
    }
    return Promise.resolve(true)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}
