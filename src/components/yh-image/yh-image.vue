<template>
  <u-image :src="src"
           :width="width"
           :mode="mode"
           :border-radius="borderRadius"
           :height="height"
           errorImage="/static/images/app/placeholder_img.png"
           loadingImage="/static/images/app/placeholder_img.png">
    <div slot="loading"
         style="width: 100%; height: 100%; background: #ebecee"
         class="fc">
      <image src="/static/images/app/placeholder_img.png"
             :style="imgStyle"
             :mode="mode" />
    </div>
    <div slot="error"
         style="width: 100%; height: 100%; background: #ebecee"
         class="fc">
      <image src="/static/images/app/placeholder_img.png"
             :style="imgStyle"
             :mode="mode" />
    </div>
  </u-image>
</template>

<script>
export default {
  name: 'yh-image',
  computed: {
    imgStyle() {
      if (this.mode === 'widthFix') {
        return { width: '100%' }
      } else {
        return { height: '100%' }
      }
    }
  },
  props: ['src', 'width', 'height', 'borderRadius', 'mode']
}
</script>

<style scoped lang="scss">
.yh-wrap {
}
</style>
