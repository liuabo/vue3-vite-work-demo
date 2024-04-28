import { useAppStoreWithOut } from '@/store/modules/app.js'

const appStore = useAppStoreWithOut()

export const usePageLoading = () => {
  const loadStart = () => {
    appStore.setPageLoading(true)
  }

  const loadDone = () => {
    appStore.setPageLoading(false)
  }

  return {
    loadStart,
    loadDone
  }
}
