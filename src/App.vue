<script>
export default {
  methods: {},
  onLaunch(options) {
    if (options.query.token) uni.setStorageSync('token', options.query.token)
    this.$store.dispatch('app/setNavbar')
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  color: #282828;
}
uni-page-head {
  display: none;
}
uni-page-wrapper {
  height: calc(100% - 50px - env(safe-area-inset-bottom)) !important;
}
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import './styles/atom.scss';
@import './styles/u-view.scss';
@import './styles/color.scss';
@import './styles/flex.scss';
@import './styles/global.scss';
@import './styles/init.scss';
</style>
