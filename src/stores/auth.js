import { defineStore } from 'pinia'
import { http } from '@/api/index.js'
import { getStorage, setStorage } from '@/utils/storage'
import { store } from './index.js'
import { getShowMenuList, getFlatMenuList } from '@/utils'

export const useAuthStore = defineStore('store', {
  state: () => ({
    // 组织切换
    topOrgList: [],
    // 按钮权限列表
    authButtonList: [],
    // 菜单权限列表
    authMenuList: [],
    // 当前选中组织
    orgInfo: {}
  }),
  getters: {
    // 组织列表
    topOrgListGet: (state) => state.topOrgList,
    orgInfoGet: (state) => state.orgInfo,
    // 按钮权限列表
    authButtonListGet: (state) => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: (state) => state.authMenuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatMenuList(state.authMenuList).map((item) => item.path)
  },
  actions: {
    // 获取绑定的组织内容
    async findSubstantiveOrganizationTreeByUser() {
      let data = await http('findSubstantiveOrganizationTreeByUser')
      if (data.isError || !data.content) return
      if (!this.orgInfo.name) {
        this.orgInfo = data.content
      }
      if (getStorage('orgId') === '0' || !getStorage('orgId') || data.content.id !== data.content.masterOrgId) {
        setStorage('orgId', data.content.id)
        setStorage('moduleRoleId', data.content.moduleRoleId)
      }
      console.log(data.content)
      if (!getStorage('moduleRoleId') || getStorage('moduleRoleId') === '0') {
        setStorage('moduleRoleId', data.content.moduleRoleId)
      }
      this.topOrgList = [data.content]
      return Promise.resolve(true)
    },
    // 获取应用基础信息
    async findModuleApplicationByAbbreviation() {
      const params = {
        abbreviation: 'mini-business',
        orgId: getStorage('orgId'),
        moduleRoleId: getStorage('moduleRoleId')
      }
      try {
        let res = await http('findModuleApplicationByAbbreviation', params)
        // 模块和app信息
        setStorage('moduleCode', res.content?.moduleCode)
        setStorage('appCode', res.content?.code)
      } catch (error) {
        console.log(error)
      }
    },

    // Get AuthButtonList
    async getAuthButtonList() {
      const params = {
        orgId: getStorage('orgId')
      }
      let { content } = await http('apiUserAuth', params)

      if (content?.authList && content?.authList.length > 0) {
        this.authButtonList = content.authList.map((item) => item.apiUrl)
      } else {
        this.authButtonList = ['all']
      }
      return Promise.resolve(true)
    },
    // Get AuthMenuList 菜单列表权限
    async getAuthMenuList() {
      const params = {
        moduleRoleId: getStorage('moduleRoleId'),
        orgId: getStorage('orgId')
      }
      let { content } = await http('findSysMenuByModuleCode', params)
      this.authMenuList = handleMenuData(content)
      return Promise.resolve(true)
    }
  }
})

export function useAuthStoreWithOut() {
  return useAuthStore(store)
}

function handleMenuData(content) {
  const temArr = []
  if (content && content.length > 0) {
    content.forEach((item) => {
      const { activeMenu, icon, isAffix, isFull, isHide, isKeepAlive, isLink, title } = item
      item.meta = { activeMenu, icon, isAffix, isFull, isHide, isKeepAlive, isLink, title }
      if (item.children && item.children.length > 0) {
        item.children = handleMenuData(item.children)
      }
      temArr.push(item)
    })
  }
  return temArr
}
