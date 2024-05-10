<template>
  <Error @error-click="push('/')" />
</template>
<script setup>
defineOptions({ name: 'Error404' })
const { push } = useRouter()
</script>
