<script setup></script>

<template>
  <router-view />
</template>

<style lang="scss">
.size {
  width: 100%;
  height: 100%;
}

html,
body {
  @extend .size;

  padding: 0 !important;
  margin: 0;
  overflow: hidden;

  #app {
    @extend .size;
  }
}
</style>
