export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
export function getBase64(imageFile, callback, errorCallback) {
  try {
    let reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onload = function (e) {
      if (callback) {
        let base64Str = e.target.result
        callback(base64Str)
      }
    }
  } catch (error) {
    console.error(error)
    if (errorCallback) {
      errorCallback(error)
    }
  }
}

// -防抖
export function debounce(fn, wait) {
  let delay = wait || 500
  let timer
  return function () {
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    let callNow = !timer
    timer = setTimeout(() => {
      timer = null
    }, delay)
    if (callNow) fn.apply(this, args)
  }
}

// -节流
export function throttle(fn, wait) {
  let delay = wait || 500
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

//js 深度克隆
export function deepClone(obj) {
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'function' && typeof obj !== 'object') return obj
  var res = Array.isArray(obj) ? [] : {}
  for (var i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      res[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return res
}
//js 深度合并
export function deepMerge(target = {}, source = {}) {
  target = deepClone(target)
  if (typeof target !== 'object' || typeof source !== 'object') return false
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop]
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop]
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop])
          } else {
            target[prop] = deepMerge(target[prop], source[prop])
          }
        }
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

//判断是安卓还是ios
export const isAndroidOrIOS = function () {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) {
    return 'android'
  }
  if (isiOS) {
    return 'iOS'
  }
}

export const getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substring(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

export const yhToast = function (str) {
  uni.showToast({
    title: str,
    icon: 'none',
    mask: true,
  })
}
