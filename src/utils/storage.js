/**
 * title: storage.js
 * Desc: 对本地存储进行封装, 命名规范、设置过期时间、安全加密
 */

import CryptoJS from 'crypto-js'

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161')
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a')

// 类型 window.localStorage,window.sessionStorage,
const config = {
  type: 'localStorage', // 本地存储类型 localStorage sessionStorage
  prefix: 'business', // 名称前缀 建议：项目名 + 项目版本
  expire: 0, // 过期时间 单位：秒
  isEncrypt: true // 默认加密 为了调试方便, 开发过程中可以不加密
}

// 判断是否支持 Storage
export const isSupStorage = () => {
  if (!window) {
    throw new Error('当前环境非浏览器，无法消费全局window实例。')
  }
  if (!window.localStorage) {
    throw new Error('当前环境非无法使用localStorage')
  }
  if (!window.sessionStorage) {
    throw new Error('当前环境非无法使用sessionStorage')
  }

  return typeof Storage !== 'undefined'
}

// 设置 setStorage
export const setStorage = (key, value, expire = 0) => {
  if (value === '' || value === null || value === undefined) {
    value = null
  }

  if (Number.isNaN(expire) || expire < 0) throw new Error('Expire must be a number')

  expire = (expire || config.expire) * 1000
  const data = {
    value, // 存储值
    time: Date.now(), // 存值时间戳
    expire // 过期时间
  }
  const encryptString = config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data)
  // window[config.type].setItem(autoAddPrefix(key), encryptString)
  uni.setStorageSync(autoAddPrefix(key), encryptString)
}

// 获取 getStorage
export const getStorage = (key) => {
  let value = null
  key = autoAddPrefix(key)
  // key 不存在判断
  if (!uni.getStorageSync(key) || JSON.stringify(uni.getStorageSync(key)) === 'null') {
    return null
  }

  // 优化 持续使用中续期
  const storage = config.isEncrypt ? JSON.parse(decrypt(uni.getStorageSync(key))) : JSON.parse(uni.getStorageSync(key))
  const nowTime = Date.now()
  // 过期删除
  if (storage.expire && storage.expire < nowTime - storage.time) {
    removeStorage(key)
    return null
  }
  // // 未过期期间被调用 则自动续期 进行保活
  if (isJson(storage.value)) {
    value = JSON.parse(storage.value)
  } else {
    value = storage.value
  }
  return value
}

// 是否存在 hasStorage
export const hasStorage = (key) => {
  key = autoAddPrefix(key)
  const arr = getStorageAll().filter((item) => item.key === key)
  return !!arr.length
}

// 获取所有key
export const getStorageKeys = () => {
  const items = getStorageAll()
  const keys = []
  for (let index = 0; index < items.length; index += 1) {
    keys.push(items[index].key)
  }
  return keys
}

// 根据索引获取key
export const getStorageForIndex = (index) => window[config.type].key(index)

// 获取localStorage长度
export const getStorageLength = () => window[config.type].length

// 获取全部 getAllStorage
export const getStorageAll = () => {
  const len = getStorageLength() // 获取长度
  const arr = [] // 定义数据集
  for (let i = 0; i < len; i += 1) {
    const key = window[config.type].key(i)
    // 获取key 索引从0开始
    const getKey = autoRemovePrefix(key)
    // 获取key对应的值
    const storage = config.isEncrypt ? JSON.parse(decrypt(uni.getStorageSync(key))) : JSON.parse(uni.getStorageSync(key))

    const nowTime = Date.now()
    if (storage.expire && nowTime - storage.time > storage.expire) {
      removeStorage(getKey)
    } else {
      let getVal = storage.value
      // console.log(Object.prototype.toString.call(value));
      if (isJson(getVal)) {
        getVal = JSON.parse(getVal)
      }
      // 放进数组
      arr.push({ key: getKey, val: getVal })
    }
  }
  return arr
}

// 删除 removeStorage
export const removeStorage = (key) => {
  uni.removeStorageSync('key')
}

// 清空 clearStorage
export const clearStorage = () => {
  uni.clearStorageSync()
}

// 判断是否可用 JSON.parse
export const isJson = (value) => {
  if (Object.prototype.toString.call(value) === '[object String]') {
    try {
      const obj = JSON.parse(value)
      const objType = Object.prototype.toString.call(obj)
      return objType === '[object Object]' || objType === '[object Array]'
    } catch (e) {
      // console.log('error：' + value + '!!!' + e);
      return false
    }
  }
  return false
}

// 名称前自动添加前缀
const autoAddPrefix = (key) => {
  const prefix = config.prefix ? `${config.prefix}_` : ''
  return prefix + key
}

// 移除已添加的前缀
const autoRemovePrefix = (key) => {
  const len = config.prefix ? config.prefix.length + 1 : ''
  return key.substr(len)
}

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
const encrypt = (data) => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data)
    } catch (error) {
      console.log('encrypt error:', error)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
const decrypt = (data) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt1 = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt1.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
