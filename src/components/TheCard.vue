<!-- 主要功能：下拉刷新，获取列表，渲染数据  -->
<template>
  <!-- 主体卡片区域 -->
  <div>
    <div
      class="y"
      @click="navigateToPage(tableData)"
      style="margin: 32rpx 32rpx 0; padding: 24rpx; background-color: #ffffff; border-radius: 16rpx; position: relative">
      <!-- 左侧详细信息  -->
      <div>
        <div v-for="(itemColumn, index) in tableColumns" :key="index">
          <!-- 状态标签  -->
          <div v-if="itemColumn.type === 'status' && itemColumn.Map" style="position: absolute; right: 0; top: 0">
            <div class="ft24 center background_green" :style="itemColumn.backgroundColor(tableData)">
              <!-- 通过绿色，驳回红色  :style="itemColumn.backgroundColor" -->
              {{ itemColumn.Map.get(tableData.approvalStatus) }}
            </div>
          </div>

          <!-- map值  -->
          <div v-else-if="itemColumn.Map" :class="itemColumn.class">{{ itemColumn.label }} {{ itemColumn.Map.get(tableData[itemColumn.prop]) }}</div>
          <!-- 时间 -->
          <div v-else-if="itemColumn.type === 'time'" :class="itemColumn.class">
            {{ itemColumn.label }} {{ tableData[itemColumn.prop] ? dayjs(tableData[itemColumn.prop]).format('YYYY-MM-DD HH:mm') : '--' }}
          </div>

          <!-- 普通文本标签 -->
          <div v-else :class="itemColumn.class">{{ itemColumn.label }} {{ tableData[itemColumn.prop] }}</div>
        </div>
      </div>

      <!-- 右侧操作按钮  -->
      <view class="operate fwrap" style="padding-top: 30rpx; justify-content: flex-end">
        <slot name="operate"></slot>
      </view>
    </div>
  </div>
</template>

<script setup name="scan">
import dayjs from 'dayjs'

// tableData单项数据
// tableColumns列表配置
// navigateToPage 跳转页面
const props = defineProps({
  tableData: Object,
  tableColumns: Array,
  navigateToPage: Function
})

// 跳转页面
const navigateToPage = (item) => {
  if (props.navigateToPage) {
    props.navigateToPage(item)
  }
}
</script>

<style scoped lang="scss">
.item {
  background-color: #fff;
  margin: 24rpx 32rpx 0;
}

.operate {
  /* position: absolute;
  bottom: 10rpx;
  right: 10rpx; */
}

.background_green {
  background-color: #67c23a;
  border-radius: 0 16rpx 0 16rpx;
  padding: 8rpx 16rpx;
  color: #ffffff;
}
</style>
