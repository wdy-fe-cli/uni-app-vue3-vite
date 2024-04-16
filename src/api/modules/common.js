export default [
  /**
   * noLoading: 这个接口请求不需要全局loading
   * noNeedOrgId: 这个接口请求不需要 orgId
   */
  // —————————————————————— 常用接口

  ['findSubstantiveOrganizationTreeByUser', ['/organization/org/findSubstantiveOrganizationTreeByUser', 'post']], // 获取基础信息
  ['findModuleApplicationByAbbreviation', ['/setting/sysModuleApplication/findModuleApplicationByAbbreviation', 'post']], // 获取基础信息
  ['findSysMenuByModuleCode', ['/setting/sysMenu/findSysMenuByModuleCode', 'post']], // 获取系统菜单
  ['apiUserAuth', ['/user/user/findUserAuth', 'post']], // 获取用户权限

  ['findOnlineOrderByPage', ['/diancan/onlineorder/findOnlineOrderByPage', 'post']], // 未确认订单
  ['findStoreByUserBelongOrgId', ['/organization/org/findStoreByUserBelongOrgId', 'post']], // 店铺列表查询
  ['refuse', ['/diancan/onlineorder/refuse', 'post']], // 拒单
  ['appletReceive', ['/diancan/onlineorder/appletReceive', 'post']], // 接单
  ['findOnlineOrderDetail', ['/diancan/onlineorder/findOnlineOrderDetail', 'post']], // 订单详情
  ['addCodeRecord', ['/authentication/userAuth/addCodeRecord', 'post']], // 生成授权码

  ['printerAdd', ['/config/printerClient/add', 'post']], // 添加打印机/修改
  ['receiptFindByList', ['/api/config/receiptFrom/findByList', 'post']], // 获取小票模板
  ['printerDetails', ['/config/printer/details', 'post']], // 打印机详情
  ['printerDelete', ['/config/printerClient/delete', 'post']], // 删除打印机
  ['printerFindByPage', ['/config/printer/findByPage', 'post']], // 分页打印机
  ['getKey', ['/auth/getKey', 'get', { noLoading: true, isFormData: true }]], // 获取登录菜单

  ['findUserInfoById', ['/user/user/findUserInfoById', 'post']], // 获取用户信息findUserInfoById

  ['processSelect', ['/approval/record/select', 'post', { noLoading: true, isFormData: true }]], // 获取流程监控列表
  ['approvalProgress', ['/approval/record/approvalProgress', 'post', { noLoading: true, isFormData: true }]], //获取审批进度
  ['findById', ['/goods/apply/findById', 'post', { noLoading: true, isFormData: true }]], //获取审批详情
  ['goodsDetail', ['/goods/goods/findById', 'post', { noLoading: true, isFormData: true }]], //获取商品详情

  ['approvalRecordApproved', ['/approval/record/approved', 'post', { noLoading: true, isFormData: true }]], // 审批通过
  ['approvalRecordApprovalRejection', ['/approval/record/approvalRejection', 'post', { noLoading: true, isFormData: true }]], // 审批驳回

  // ['printerFindByPage', ['/config/printer/findPrinterList', 'post']] // 打印机列表查询

  ['findByAuditTaskResult', ['/report/auditTaskResult/findByAuditTaskResult', 'post']], // 查询
  ['cancellationAuditTaskResult', ['/report/auditTaskResult/cancellationAuditTaskResult', 'post']], // 现金稽核作废
  ['disposeAuditTaskResult', ['/report/auditTaskResult/disposeAuditTaskResult', 'post']], // 现金稽核长短款处理

  ['createOrder', ['/diancan/diningCabinet/createOrder', 'post']], // 取餐柜--创建存餐订单
  ['addCell', ['/diancan/diningCabinet/addCell', 'post']], // 取餐柜--为现有订单增加格子
  ['saveReOpenDoor', ['/diancan/diningCabinet/saveReOpenDoor', 'post']], // 取餐柜--存参临时开门
  ['cancelOrder', ['/diancan/diningCabinet/cancelOrder', 'post']], // 取餐柜--撤餐操作
  ['getDeviceInfo', ['/diancan/diningCabinet/getDeviceInfo', 'post']], // 取餐柜--获取设备信息

  ['agreeRefund', ['/diancan/onlineorder/agreeRefund', 'post']], // 退款-同意退款
  ['refuseRefund', ['/diancan/onlineorder/refuseRefund', 'post']] // 退款-拒绝退款
]
