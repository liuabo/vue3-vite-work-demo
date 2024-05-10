import { store } from '@/store'
import { defineStore } from 'pinia'
import { getAccessToken, removeToken } from '@/utils/auth'
import { CACHE_KEY, useCache, deleteUserCache } from '@/hooks/web/useCache'
import { getInfo, loginOut } from '@/api/login'

const { wsCache } = useCache()

export const useUserStore = defineStore('admin-user', {
  state: () => ({
    permissions: [],
    roles: [],
    isSetUser: false,
    user: {
      id: 0,
      avatar: '',
      nickname: '',
      deptId: 0
    }
  }),
  getters: {
    getPermissions() {
      return this.permissions
    },
    getRoles() {
      return this.roles
    },
    getIsSetUser() {
      return this.isSetUser
    },
    getUser() {
      return this.user
    }
  },
  actions: {
    async setUserInfoAction() {
      if (!getAccessToken()) {
        this.resetState()
        return null
      }
      let userInfo = wsCache.get(CACHE_KEY.USER)
      if (!userInfo) {
        userInfo = await getInfo()
      }
      this.permissions = userInfo.permissions
      this.roles = userInfo.roles
      this.user = userInfo.user
      this.isSetUser = true
      wsCache.set(CACHE_KEY.USER, userInfo)
      wsCache.set(CACHE_KEY.ROLE_ROUTERS, userInfo.menus)
    },
    async setUserAvatarAction(avatar) {
      const userInfo = wsCache.get(CACHE_KEY.USER)
      // NOTE: 是否需要像`setUserInfoAction`一样判断`userInfo != null`
      this.user.avatar = avatar
      userInfo.user.avatar = avatar
      wsCache.set(CACHE_KEY.USER, userInfo)
    },
    async setUserNicknameAction(nickname) {
      const userInfo = wsCache.get(CACHE_KEY.USER)
      // NOTE: 是否需要像`setUserInfoAction`一样判断`userInfo != null`
      this.user.nickname = nickname
      userInfo.user.nickname = nickname
      wsCache.set(CACHE_KEY.USER, userInfo)
    },
    async loginOut() {
      await loginOut()
      removeToken()
      deleteUserCache() // 删除用户缓存
      this.resetState()
    },
    resetState() {
      this.permissions = []
      this.roles = []
      this.isSetUser = false
      this.user = {
        id: 0,
        avatar: '',
        nickname: '',
        deptId: 0
      }
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
