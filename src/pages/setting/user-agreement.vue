<template>
  <view class="app-container"> <rich-text :nodes="html"></rich-text> </view>
</template>

<script>
export default {
  data() {
    return {
      html: ''
    }
  },
  created() {
    this.getCurrentText()
  },
  methods: {
    getCurrentText() {
      this.loading = true
      this.$store
        .dispatch('user/getCurrentText', this.form)
        .then(data => {
          this.loading = false
          this.html = data.content
        })
        .catch(err => {
          this.loading = false
          uni.showToast({ title: err.msg, icon: 'none', duration: 2000 })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  background: #ffffff;
  padding-left: 32rpx;
}
</style>
