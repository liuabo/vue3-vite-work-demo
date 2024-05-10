<script setup>
import { LayoutMenu } from '@/layout/components/Menu'
import Logo from '@/layout/components/Logo/Logo.vue'
import { Icon } from '@/components/Icon/index.js'
import { mainMenuList, slideMenuList, hasSlide } from './assets/data.js'


import { useRoute } from 'vue-router'

const route = useRoute()

const isCollapse = ref(false)
const logoRef = ref()
const mainMenuWidth = ref('100%')

// 左侧菜单开关
const hasSlideMenu = computed(() => {
  return unref(hasSlide).some(it => new RegExp(it).test(route.path))
})

// 菜单点击方法
const menuSelect = (key) => {
  console.log('menuSelect', key)
}

//region 无感刷新
const routerAlive = ref(true)
// 无感刷新，防止出现页面闪烁白屏
const reload = () => {
  routerAlive.value = false
  nextTick(() => (routerAlive.value = true))
}
// 为组件后代提供刷新方法
provide('reload', reload)

onMounted(() => {
  nextTick(() => {
    mainMenuWidth.value = `calc(100% - ${isCollapse.value ? '48' : '200'}px)`
  })
})
</script>

<template>
  <el-container class="common-layout w-[100%] h-[100%] relative">
    <el-header class="common-header flex flex-items-center">
      <logo ref="logoRef" :is-collapse="isCollapse" />
      <layout-menu class="menu" :menu-list="mainMenuList" :style="`width:${mainMenuWidth}`" />
    </el-header>
    <el-container>
      <el-aside v-if="hasSlideMenu" class="el-aside relative">
        <layout-menu class="aside-menu" :class="[!isCollapse ? 'collapse' : 'expand']" menu-mode="vertical"
                     :menu-list="slideMenuList" :is-collapse="isCollapse" :is-slider="true" />
        <div class="sider-trigger flex flex-items-center flex-justify-center">
          <icon icon="ep:d-arrow-right" v-if="isCollapse" @click="isCollapse = !isCollapse" />
          <icon icon="ep:d-arrow-left" v-else @click="isCollapse = !isCollapse" />
        </div>
      </el-aside>
      <el-main>
        <router-view v-if="routerAlive">
          <template #default="{ Component, route }">
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </template>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style lang="scss" scoped>
.common-layout {
  background-color: #f0f2f5;

  .common-header {
    height: 48px;
    background-color: #1267DD;
    background-image: url("@/layout/assets/img/header-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  :deep(.el-aside) {
    width: auto;
    transition: width 0.15s;
    -webkit-transition: width 0.15s;
    -moz-transition: width 0.15s;
    -webkit-transition: width 0.15s;
    -o-transition: width 0.15s;

    .el-sub-menu, .el-menu-item {
      height: 50px;
    }
  }

  .collapse {
    width: 200px;
  }

  :deep(.expand) {
    .el-menu--collapse {
      width: 48px;
    }

    .el-sub-menu, .el-menu-item {
      height: 50px;
    }

    .el-sub-menu, .el-menu-item, .el-sub-menu__title {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .aside-menu {
    height: calc(100vh - 48px);
    background-image: url("./assets/img/left-aside-bg.gif");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .sider-trigger {
    width: 100%;
    height: 36px;
    color: #bfbfbf;
    background-color: #ffffff1a;
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
  }
}

.el-header {
  height: 48px;
  padding: 0 !important;

  .el-menu {
    width: 100%;
  }
}

.el-main {
  padding: 0;
}
</style>
