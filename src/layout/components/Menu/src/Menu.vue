<script setup>
import MenuItem from '@/layout/components/Menu/src/components/MenuItem.vue'
import Logo from '@/layout/components/Logo/Logo.vue'
import { useRouter } from 'vue-router'
import { isUrl } from '@/utils/is.js'

defineOptions({ name: 'LayoutMenu' })
const props = defineProps({
  active: {
    type: String,
    default: undefined
  },
  menuMode: {
    type: String,
    default: 'horizontal'
  },
  menuList: {
    type: Array,
    default: () => []
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
  isSlider: {
    type: Boolean,
    default: false
  },
  menuSelect: {
    type: Function,
    default: undefined
  }
})
const { replace, currentRoute } = useRouter()

const activeMenu = computed(() => {
  const { meta, path } = unref(currentRoute)
  // if set path, the sidebar will highlight the path you set
  if (props.active) {
    return props.active
  }
  if (!props.isSlider && meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const handleSelect = (key) => {
  if (props.menuSelect) {
    props.menuSelect(key)
    return
  }
  // 自定义事件
  if (isUrl(key)) {
    window.open(key)
  } else {
    replace(key)
  }
}
</script>

<template>
  <div class="menu">
    <el-menu
      class="el-menu"
      popper-class="fn-menu--popup"
      :default-active="activeMenu"
      :mode="menuMode"
      :collapse="isCollapse"
      text-color="#fff"
      background-color="transparent"
      active-text-color="#fff"
      @select="handleSelect"
    >
      <menu-item v-for="item in menuList" :key="item.id" :item="item" />
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.menu {
  width: auto;
  height: 100%;

  .el-menu {
    height: 100%;
    border: none;
    .el-menu-item {
      border: none;
    }
    .is-active {
      border: none!important;
      background-color: #0084f4!important;
    }
  }
}
</style>

<style lang="scss">
.fn-menu--popup {
  background-color: #1267DD!important;
}
</style>
