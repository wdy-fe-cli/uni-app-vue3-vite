import { useStore } from '@/stores/store.js'
import { appId, http } from '@/api'
import { getStorage } from '@/utils/storage.js'

const storeStore = useStore()
/**
 * 创建订单
 */
export const minipay = async (orderId) => {
  uni.showLoading({
    title: '加载中',
    mask: true
  })
  const params = {
    id: orderId,
    appId,
    isFirstPay: storeStore.storeInfoGet.isFirstPay
  }

  try {
    let res = await http('minipay', params)
    uni.hideLoading()
    console.log(res)
    pay(res.content)
  } catch (error) {
    console.log(error)
  }
}
/**
 * 去支付
 * @param {Object} payInfo 支付信息
 */
function pay(payInfo) {
  console.log(payInfo)
  uni.requestPayment({
    provider: 'wxpay',
    timeStamp: payInfo.timeStamp,
    nonceStr: payInfo.nonceStr,
    package: payInfo.packageStr,
    signType: 'MD5',
    paySign: payInfo.paySign,
    success: function (res) {
      console.log('success:' + JSON.stringify(res))
      uni.showToast({
        title: '支付成功',
        icon: 'none'
      })
    },
    fail: function (err) {
      uni.showToast({
        title: '支付失败',
        icon: 'none',
        mask: true
      })
      uni.switchTab({ url: '/pages/order/index' })
      console.log('fail:' + JSON.stringify(err))
    }
  })
}
