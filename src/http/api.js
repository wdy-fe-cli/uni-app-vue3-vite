import req from './request.js'
import Vue from 'vue'

const commonParams = {}
const apiConfig = new Map([
  // 同城领券
  ['apiGetTcCoupon', ['/portal/coupon/getTcCoupon', 'get']],
  // 商品列表
  ['apiGoodsList', ['/portal/goods/list', 'get']],
  ['apiMaterialActivityList', ['/portal/goods/materialActivityList', 'get']],
  // 获取素材配置
  [
    'apiQueryActivityMaterial',
    ['/portal/material/queryActivityMaterial', 'get']
  ],
  // 获取配置的素材
  ['apiBannerList', ['/portal/banner/bannerList', 'get']],
  // 首页消息通知
  ['apiQueryMessageNum', ['/portal/message/queryMessageNum', 'get']],
  // 首页获取通知
  ['apiQueryNotice', ['/portal/configuration/queryNotice', 'get']],
  // 商品列表
  ['apiGoodsList', ['/portal/goods/list', 'get']],
  // 获取商品详情
  ['apiGoodsDetail', ['/portal/goods/goodsDetail', 'get']],
  // 获取口令
  ['apiChainTurning', ['/portal/goods/chainTurning', 'get']],
  // 获取淘宝口令前后缀
  ['apiQueryPaperwork', ['/portal/configuration/queryPaperwork', 'get']],
  // 获取用户信息
  ['apiMemberUser', ['/member/user', 'get']],
  // 获取素材信息
  ['apiMaterialList', ['/portal/material/list', 'get']],
  // 获取战队排行榜 / 查询战队列表
  ['apiQueryBattalionList', ['/member/battalion/queryBattalionList', 'get']],

  // 查询当前用户所在房间信息成员表
  ['apiQueryBattalionInfo', ['/member/battalion/queryBattalionInfo', 'get']],
  // 查询战队排行榜
  ['apiQueryRankingList', ['/member/battalion/queryRankingList', 'get']],
  // 查询我的战队排行榜
  [
    'apiQueryUserRankingList',
    ['/member/battalion/queryUserRankingList', 'get']
  ],

  // 扫描二维码立即去报名
  ['apiList', ['/portal/material/list', 'get']],
  // 加入战队
  ['apiJoinBattalion', ['/member/battalion/joinBattalion', 'get']],
  // 查询我的战队信息
  ['apiQueryMyBattalion', ['/member/battalion/queryMyBattalion', 'get']],

  // 发圈模块

  // 商学院模块
  ['apiGetCoverList', ['/portal/material/getCoverList', 'get']],
  // 观看次数
  ['apiUpdateView', ['/portal/material/updateView', 'get']],

  //************* 个人pk赛*****************

  // 查询活动开始结束时间
  ['apiQueryActivityTime', ['/member/battalion/queryActivityTime', 'get']],
  // 查询个人排行信息
  [
    'apiQueryPersonalRankInfo',
    ['/member/personalRanking/queryPersonalRankInfo', 'get']
  ],
  //获取好友PK赛榜单
  [
    'apiPersonalRankingQuery',
    ['/member/personalRanking/queryRankingList', 'get']
  ]
])
export function http(apiName, params) {
  const [url, method, header] = apiConfig.get(apiName)
  return req.request(url, method, { ...commonParams, ...params }, header)
}

Vue.prototype.$http = http
