import { defineStore } from 'pinia'
import { http } from '@/api/index.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: []
  }),
  getters: {
    userInfoGet: (state) => state.userInfo
  },
  actions: {
    // 获取用户信息
    async findUserInfoById() {
      const params = {}
      try {
        let res = await http('findUserInfoById', params)
        if (!res.content) return
        this.userInfo = res.content
      } catch (error) {
        console.log(error)
      }
      return Promise.resolve(true)
    }
  }
})
