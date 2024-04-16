import request from './request'
import { getStorage } from '@/utils/storage.js'

export const appId = 'wx6edab5ee4a15a8ae'

let modulesApis = []
const files = import.meta.globEager('./modules/*.js')
for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (files[key].default) {
      modulesApis.push(...files[key].default)
    }
  }
}

export const apiUrls = new Map([...modulesApis])

// 常规请求头
export function http(apiName, params) {
  const [url, method, obj] = apiUrls.get(apiName)
  if (!obj || !obj.noStoreInfo) {
    params = {
      ...params
    }
  }
  // eslint-disable-next-line import/no-named-as-default-member
  return request(url, method, params)
}
