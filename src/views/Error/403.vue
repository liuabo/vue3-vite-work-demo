<template>
  <Error type="403" @error-click="push('/')" />
</template>
<script setup>
defineOptions({ name: 'Error403' })

const { push } = useRouter()
</script>
