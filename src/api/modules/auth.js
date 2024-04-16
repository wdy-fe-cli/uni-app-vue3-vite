let prefix = '/api'
let cjApi = '/cj-api'

export default [
  ['getCurrentText', [`${cjApi}/agreement/getCurrentText`, 'get']], // 获取用户协议
  ['getPrivacyAgreement', [`${cjApi}/agreement/getPrivacyAgreement`, 'get']], // 获取隐私协议
]
