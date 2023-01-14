import Vue from 'vue'
Vue.mixin({
  onShow() {
    let { title } = this //在固定标题的页面data中设置title
    if (this.$mp && this.$mp.query) {
      //整个app的onShow也会触发，这时$mp中没有query属性
      let setTitle = this.$mp.query.title || title //在进入页面的query中没有title属性时会取data中的title
      if (setTitle) {
        uni.setNavigationBarTitle({
          //uni-app 的修改title接口
          title: setTitle,
        })
        //以下为H5平台差异写法
        // #ifdef H5
        console.log(document)
        document.title = setTitle
        // #endif
      }
    }
  },
})
