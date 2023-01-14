<template>
  <u-navbar
    :title="title"
    :titleStyle="titleStyle"
    leftIconSize="34rpx"
    leftIconColor="#282828"
    :placeholder="true"
  ></u-navbar>
</template>

<script>
export default {
  name: 'yh-navbar',
  props: {
    title: {
      type: String,
      default: '',
    },
    titleStyle: {
      type: Object,
      default: () => ({ color: '#282828', fontSize: '38rpx' }),
    },
  },
}
</script>
