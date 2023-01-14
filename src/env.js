let baseUrl = ''
let projectDomain = ''
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'release') {
  // 开发环境
  baseUrl = 'https://gateway-dev.yanghuimall.com'
  projectDomain = 'http://wap-dev.yanghuimall.com'
} else if (process.env.NODE_ENV === 'release') {
} else if (process.env.NODE_ENV === 'production') {
  // 正式环境
  baseUrl = 'https://gateway.yanghuimall.com'
  projectDomain = 'http://wap.yanghuimall.com'
}

const YH_APP_DOWNLOAD_URL = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.yanghuimall'

module.exports = {
  projectDomain,
  YH_APP_DOWNLOAD_URL,
  baseUrl,
  wxAppid: 'wx1198811b52123fd9', // 氧惠星选
}

/**
 * 1: wx1198811b52123fd9
 * 2: wx3b365e937fe8a424
 * 3: wxbc6d8a2152b69264
 */
