<script>
import initPermission from '@/utils/permission.js'
export default {
  globalData: {
    socketIO: null,
  },
  onLaunch(ot) {
    initPermission()
  },
  methods: {},
  onShow() {
    console.log('App Show')
  },

  onHide() {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import url('styles/tailwind.css');
/*每个页面公共css */
page {
  background-color: #f4f4f5;
  font-family: PingFang SC;
  color: #333333;
}
</style>
