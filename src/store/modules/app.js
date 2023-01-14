const state = {
  customBarHeight: 0,
  statusBarHeight: 0,
  systemInfo: {},

  hasCellphone: '',

  // 战队状态提示弹框是否显示
  TeamStatus: {
    isShow: false,
    title: '111',
  },

  // 再次调用战队列表
  callItAgainTeamList: false,

  // 判断战队列表组件 是否可以点击 和 箭头是否存在
  activityState: false,

  // 请输入战队口令 弹窗
  OperationTeamPassword: {
    isShow: false,
    value: null,
  },

  // 是否已经有战队
  isThereTeam: false,
}

const mutations = {
  SET_USER_INFO(state, data) {
    state.hasCellphone = data
  },
  COMMIT_SYSTEM_INFO(state, { statusBar, customBar, e }) {
    state.statusBarHeight = statusBar
    state.customBarHeight = customBar
    state.systemInfo = e
  },

  // 操作战队状态提示弹框状态
  COMMIT_TEAM_STATUS_SCREEN(state, data) {
    // console.log('操作战队状态提示弹框状态', data)
    state.TeamStatus.isShow = data.isShow
    state.TeamStatus.title = data.title
  },

  //再次调用战队列表
  CALL_IT_AGAIN_TEAM_LIST(state, data) {
    state.callItAgainTeamList = data
  },

  // 判断战队列表组件 是否可以点击 和 箭头是否存在
  ACTIVITY_STATE(state, data) {
    state.activityState = data
  },

  // 操作请输入战队口令 弹窗
  OPERATION_TEAM_PASSWORD(state, data) {
    state.OperationTeamPassword.isShow = data.isShow
    state.OperationTeamPassword.value = data.value
  },

  // 是否已经有战队
  // isThereTeam,
  IS_THERE_TEAM(state, data) {
    state.isThereTeam = data
  },
}

const actions = {
  setNavbar({ commit, state }, cancel) {
    uni.getSystemInfo({
      success: e => {
        // this.compareVersion(e.SDKVersion, '2.5.0')
        let statusBar = 0
        let customBar = 0

        // #ifdef MP
        statusBar = e.statusBarHeight
        customBar = e.statusBarHeight + 45
        if (e.platform === 'android') {
          this.$store.commit('SET_SYSTEM_IOSANDROID', false)
          customBar = e.statusBarHeight + 50
        }
        // #endif

        // #ifdef MP-WEIXIN
        statusBar = e.statusBarHeight
        // @ts-ignore
        const custom = wx.getMenuButtonBoundingClientRect()
        customBar = custom.bottom + custom.top - e.statusBarHeight
        // #endif

        // #ifdef MP-ALIPAY
        statusBar = e.statusBarHeight
        customBar = e.statusBarHeight + e.titleBarHeight
        // #endif

        // #ifdef APP-PLUS
        console.log('app-plus', e)
        statusBar = e.statusBarHeight
        customBar = e.statusBarHeight + 45
        // #endif

        // #ifdef H5
        statusBar = 0
        customBar = e.statusBarHeight + 45
        // #endif

        // 这里你可以自己决定存放方式，建议放在store中，因为store是实时变化的
        commit('COMMIT_SYSTEM_INFO', { statusBar, customBar, e })
      },
    })
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
