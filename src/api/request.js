import { getStorage, setStorage } from '@/utils/storage.js'
import ENV_CONFIG from './env'
import { login } from '@/utils/login'

const waitingList = [] // 等待请求队列
const excutingList = [] // 执行队列
const limit = 10 // 最大请求数

const excuteWaitingList = () => {
  const func = waitingList[0]
  if (typeof func === 'function') {
    func()
  }
  waitingList.splice(0, 1)
}

const requestPromise = (resolve, reject, url, method = 'get', params, callback) => {
  const token = getStorage('authToken') || ''
  let headers = {}
  if (token) {
    headers.authToken = token // 让每个请求携带自定义token 请根据实际情况自行修改
    headers.masterOrgId = getStorage('masterOrgId')
    headers.moduleCode = getStorage('moduleCode')
    headers.appCode = getStorage('appCode')
  }

  let success = false
  let baseUrl = ENV_CONFIG.VITE_API_URL
  // #ifdef H5
  baseUrl = '/api'
  // #endif

  const requestTask = uni.request({
    url: url.startsWith('https://') ? url : baseUrl + url,
    method: method ? method.toUpperCase() : '',
    header: headers,
    data: params,
    success: (res) => {
      const result = res
      if (url.startsWith('https://')) {
        resolve(result.data)
      }
      let errorMsg = result.data.message || '服务器异常'
      if (result && result.data) {
        if (result.statusCode === 200) {
          success = true
          result.data.isError = result.data.code !== 10000 && result.data.code !== '10000'
          if (result.data.isError) {
            uni.showToast({
              title: result.data.message,
              icon: 'none'
            })
            reject(result.data)
          } else {
            resolve(result.data)
          }
        } else if (result.statusCode === 401) {
          setStorage('loginRefresh', true)
          login()
          reject(errorMsg)
        } else {
          uni.showToast({
            title: errorMsg,
            icon: 'none'
          })
          reject(errorMsg)
          // reject(result.data)
        }
      } else {
        uni.showToast({
          title: errorMsg,
          icon: 'none'
        })
        reject(errorMsg)
      }
    },
    fail(res) {
      uni.showToast({
        title: '服务异常',
        icon: 'none'
      })
      reject('服务异常')
    },
    complete() {
      if (success) {
        resolve(true)
      } else {
        resolve(false)
      }
      let index = excutingList.indexOf(requestTask)
      excutingList.splice(index, 1)
      if (typeof callback === 'function') {
        callback()
      }
      excuteWaitingList()
    }
  })
  excutingList.push(requestTask)
}

export default function ajaxRequest(url, method = 'get', params) {
  const promiseObj = new Promise((resolve, reject) => {
    if (excutingList.length > limit) {
      waitingList.push((callBack) => {
        requestPromise(resolve, reject, url, method, params, callBack)
      })
    } else {
      requestPromise(resolve, reject, url, method, params)
    }
  })
  return promiseObj
}

const clearAllRequest = () => {
  excutingList.map((item) => {
    if (item && item.abort) {
      item.abort()
    }
  })
  waitingList.length = 0
  excutingList.length = 0
}
