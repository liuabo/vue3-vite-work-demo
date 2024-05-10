import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

export function hasPermi(app) {
  app.directive('hasPermi', (el, binding) => {
    const { wsCache } = useCache()
    const { value } = binding
    const all_permission = '*:*:*'
    const permissions = wsCache.get(CACHE_KEY.USER).permissions

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission) => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('请设置操作权限标签值')
    }
  })
}
