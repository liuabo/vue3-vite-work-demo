<script setup>
import { Icon } from '@/components/Icon'
defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <icon v-if="icon" :icon="icon" />
  <span class="v-menu__title overflow-hidden overflow-ellipsis whitespace-nowrap">
          {{ title }}
  </span>
</template>

<style scoped lang="scss">

</style>
