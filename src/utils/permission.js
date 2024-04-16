/**
 * @description 自定义路由拦截
 */

import { useAuthStore } from '@/stores/auth'
import { getStorage } from '@/utils/storage'
import { initDynamicRouter } from '@/utils/dynamicRouter'

// 白名单
const whiteList = [
  // '/', // 注意入口页必须直接写 '/'
  // { pattern: /^\/pages\/list.*/ }, // 支持正则表达式
  // '/pages/grid/grid',
  // '/pages/user-center/user-center',

  // { pattern: /^\/pages\/login\/*/ }
  '/',
  '/pages/login/index',
  '/pages/home/index'
]

export default async function () {
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  // 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
  list.forEach((item) => {
    uni.addInterceptor(item, {
      async invoke(e) {
        // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
        const url = e.url.split('?')[0]
        // console.log('url', url)

        // 判断当前窗口是白名单，如果是则不重定向路由
        let pass
        if (whiteList) {
          // console.log('whiteList白名单', whiteList)
          pass = whiteList.some((item) => {
            if (typeof item === 'object' && item.pattern) {
              return item.pattern.test(url)
            }
            // console.log('item', item)
            return url === item
          })
        }

        // 1. 不是白名单并且没有token
        if (!pass && !getStorage('authToken')) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
          uni.navigateTo({
            url: '/pages/login/index'
          })
          return new Error('No Login')
        }
        const authStore = useAuthStore()
        // console.log(authStore.flatMenuListGet)
        // 2.如果没有菜单列表，就重新请求菜单列表并添加动态路由
        if (!authStore.flatMenuListGet.length && url !== '/pages/login/index') {
          // 初始化系统数据
          await initDynamicRouter()
        }
        // 3. 没有该菜单权限(并且不再白名单)
        if (!pass && !authStore.flatMenuListGet.includes(url)) {
          uni.showToast({
            title: '您无权限进入该菜单，请联系系统管理员',
            icon: 'none'
          })
          return new Error('No permission')
        }

        return e
      },
      fail(err) {
        // 失败回调拦截
        console.log(err)
      }
    })
  })
}
