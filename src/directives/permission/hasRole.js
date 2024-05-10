import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

export function hasRole(app) {
  app.directive('hasRole', (el, binding) => {
    const { wsCache } = useCache()
    const { value } = binding
    const super_admin = 'admin'
    const roles = wsCache.get(CACHE_KEY.USER).roles

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some((role) => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('请设置角色权限标签值')
    }
  })
}
