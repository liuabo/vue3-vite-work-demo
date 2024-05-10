import { createRouter, createWebHistory } from 'vue-router'
import remainingRouter from './modules/remaining'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // createWebHashHistory URL带#，createWebHistory URL不带#
  strict: true,
  routes: remainingRouter,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = () => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app) => {
  app.use(router)
}

export default router
