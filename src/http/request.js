import { deepMerge } from '@/utils/tools.js'
import env from '@/env.js'

const WHITE_LIST = [env.baseUrl + '/member/userWxLogin']
// delete请求，不支持支付宝和头条小程序
const REQUEST_METHODS_MAP = new Map([
  ['get', 'GET'],
  ['post', 'POST'],
  ['put', 'PUT'],
  ['delete', 'DELETE'],
])
class Request {
  constructor() {
    this.config = {
      baseUrl: env.baseUrl, // 请求的根域名
      header: {
        'Terminal-Type': 'innerH5',
        'Content-Type': 'application/json;charset=UTF-8',
      }, // 默认的请求头
      method: 'POST',
      dataType: 'json', // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      responseType: 'text', // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    }

    this.interceptor = {
      // 请求拦截
      request(config) {
        config.data = config.data || {}
        if (!WHITE_LIST.includes(config.url)) {
          config.header.token = uni.getStorageSync('token')
        }
        return config
      },
      // 响应拦截
      response(response) {
        if (response.statusCode === 401) {
          uni.removeStorageSync('token')
          webUni.postMessage({
            data: {
              type: 'system',
              name: 'NEED_LOGIN',
            },
          })
        }
        if (response.statusCode !== 200 || response.data.shortCode !== 0) {
          response.data.isError = true
        }
        return response.data || {}
      },
    }

    this.request = (url, method = 'get', data = {}, header = {}) => {
      return this.generate({
        url: this.config.baseUrl + url,
        method: REQUEST_METHODS_MAP.get(method),
        header,
        data,
      })
    }
  }
  /**
   * setConfig接收一个自定义的配置对象，将类中的config对象和它进行深度合并。
   * @param {Object} customConfig  深度合并对象，否则会造成对象深层属性丢失
   */
  setConfig(customConfig) {
    this.config = deepMerge(this.config, customConfig)
  }
  generate(options = {}) {
    //检查请求拦截
    this.options = this.interceptor.request(options)
    options.dataType = options.dataType || this.config.dataType
    options.responseType = options.responseType || this.config.responseType
    options.url = options.url || ''
    options.params = options.params || {}
    options.header = Object.assign({}, this.config.header, options.header)
    options.method = options.method || this.config.method

    return new Promise((resolve, reject) => {
      options.complete = response => {
        // 请求返回后，隐藏loading
        uni.hideLoading()
        // 清除定时器，如果请求快，不用显示loading
        clearTimeout(this.config.timer)
        this.config.timer = null
        // 响应拦截
        let resInterceptors = this.interceptor.response(response)
        if (resInterceptors.isError) {
          reject(resInterceptors)
        } else {
          resolve(resInterceptors)
        }
      }
      if (this.config.showLoading && this.config.timer) {
        this.config.timer = setTimeout(() => {
          uni.showLoading({
            title: this.config.loadingText,
            mask: this.config.loadingMask,
          })
        }, this.config.loadingTime)
      }
      uni.request(options)
    })
  }
}
export default new Request()
