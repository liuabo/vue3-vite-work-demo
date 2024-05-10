<script setup>
defineOptions({name: 'Logo'})
defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
const title = ref(import.meta.env.VITE_APP_TITLE)
</script>

<template>
  <div class="logo h-[100%] flex flex-items-center flex-justify-start" :class="[isCollapse ? 'collapse flex-justify-center' : '']">
    <img class="ml-6" :class="[isCollapse ? 'ml-0!' : '']" src="@/layout/assets/img/logo.png" alt="" />
    <span v-if="!isCollapse" class="title ml-1">{{ title }}</span>
  </div>
</template>

<style scoped lang="scss">
.logo {
  background-color: #035bdb;
  width: 200px;

  transition: width 0.4s;
  -webkit-transition: width 0.4s;
  -moz-transition: width 0.4s;
  -webkit-transition: width 0.4s;
  -o-transition: width 0.4s;
  img {
    width: 28px;
    height: 25px;
  }

  .title {
    height: 30px;
    font-size: 20px;
    color: #fff;
    overflow: hidden;
  }
}
.collapse {
  width: 48px!important;
  overflow: hidden;
}
</style>
