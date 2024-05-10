<script setup>
import MenuTitle from '@/layout/components/Menu/src/components/MenuTitle.vue'

defineOptions({ name: 'MenuItem' })

const props = defineProps({
  item: {
    type: Object,
    default: () => {
    }
  }
})
</script>

<template>
  <el-menu-item v-if="!Object.prototype.hasOwnProperty.call(item, 'children')" :index="item.path">
    <menu-title :icon="item.icon" :title="item.name" />
  </el-menu-item>
  <el-sub-menu v-else :index="item.id">
    <template #title>
      <menu-title :icon="item.icon" :title="item.name" />
    </template>
    <menu-item v-for="it in item.children" :key="it.id" :index="it.id" :item="it" />
  </el-sub-menu>
</template>

<style scoped lang="scss">

</style>
