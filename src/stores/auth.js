import { defineStore } from 'pinia'
import { http } from '@/api/index.js'
import { getStorage, setStorage } from '@/utils/storage'
import { store } from './index.js'
import { getShowMenuList, getFlatMenuList } from '@/utils'

export const useAuthStore = defineStore('store', {
  state: () => ({}),
  getters: {},
  actions: {},
})
