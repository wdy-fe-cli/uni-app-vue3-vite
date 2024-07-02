export default [
  /**
   * noLoading: 这个接口请求不需要全局loading
   * noNeedOrgId: 这个接口请求不需要 orgId
   */
  // —————————————————————— 常用接口

  ['findSysMenuByModuleCode', ['/setting/sysMenu/findSysMenuByModuleCode', 'post']], // 获取系统菜单
  ['findTopOrganizationByUserId', ['/organization/topOrganization/findTopOrganizationByUserId', 'post']], // 获取多个顶级组织
  ['apiUserAuth', ['/user/user/findUserAuth', 'post']] // 获取用户权限
]
