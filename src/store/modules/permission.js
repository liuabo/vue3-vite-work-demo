import { defineStore } from 'pinia'
import { store } from '@/store'
import { cloneDeep } from 'lodash-es'
import remainingRouter from '@/router/modules/remaining'
import { flatMultiLevelRoutes, generateRoute } from '@/utils/routerHelper'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routers: [],
    addRouters: [],
    menuTabRouters: []
  }),
  getters: {
    getRouters() {
      return this.routers
    },
    getAddRouters() {
      return flatMultiLevelRoutes(cloneDeep(this.addRouters))
    },
    getMenuTabRouters() {
      return this.menuTabRouters
    }
  },
  actions: {
    async generateRoutes() {
      return new Promise((resolve) => {
        // 获得菜单列表，它在登录的时候，setUserInfoAction 方法中已经进行获取
        let res = []
        if (wsCache.get(CACHE_KEY.ROLE_ROUTERS)) {
          res = wsCache.get(CACHE_KEY.ROLE_ROUTERS)
        }
        const routerMap = generateRoute(res)
        // 动态路由，404一定要放到最后面
        this.addRouters = routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ])
        // 渲染菜单的所有路由
        this.routers = cloneDeep(remainingRouter).concat(routerMap)
        resolve()
      })
    },
    setMenuTabRouters(routers) {
      this.menuTabRouters = routers
    }
  },
  persist: false
})

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}
