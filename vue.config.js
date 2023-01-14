'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let filePath = '' // 默认文件路径
let timeStamp = '' // 时间戳
let version = '-v2.0-' // 版本号

//编译环境判断，可以根据不同环境来做相应的配置
if (process.env.UNI_PLATFORM === 'h5') {
  filePath = 'static/js/'
  timeStamp = new Date().getTime()
}

module.exports = {
  transpileDependencies: ['uview-ui', 'z-paging'],
  configureWebpack: {
    output: {
      // filePath: 路径 name: 默认文件名 Version: 版本号 TimeStamp: 时间戳; 重构文件名
      filename: `${filePath}[name]${version}${timeStamp}.js`, // static/js/index-V2.0.0-1623123456789.js
      chunkFilename: `${filePath}[name]${version}${timeStamp}.js`, // static/js/pages-home-index-V2.0.0-1623123456789.js
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
}
