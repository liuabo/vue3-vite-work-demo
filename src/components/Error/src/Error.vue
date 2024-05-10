<script setup>
import pageError from '@/assets/icons/404.svg'
import networkError from '@/assets/icons/500.svg'
import noPermission from '@/assets/icons/403.svg'

defineOptions({ name: 'Error' })

const errorMap = {
  404: {
    url: pageError,
    message: '抱歉，您访问的页面不存在。',
    buttonText: '返回首页'
  },
  500: {
    url: networkError,
    message: '抱歉，服务器报告错误。',
    buttonText: '返回首页'
  },
  403: {
    url: noPermission,
    message: '抱歉，您无权访问此页面。',
    buttonText: '返回首页'
  }
}

const props = defineProps({
  type: {
    validator: function(value) {
      // 这个函数的返回值为true则表示验证通过
      return ['404', '500', '403'].indexOf(value) !== -1
    },
    default: '404'
  }
})

const emit = defineEmits(['errorClick'])

const btnClick = () => {
  emit('errorClick', props.type)
}
</script>

<template>
  <div class="flex justify-center">
    <div class="text-center">
      <img :src="errorMap[type].url" alt="" width="350" />
      <div class="text-14px text-[var(--el-color-info)]">{{ errorMap[type].message }}</div>
      <div class="mt-20px">
        <ElButton type="primary" @click="btnClick">{{ errorMap[type].buttonText }}</ElButton>
      </div>
    </div>
  </div>
</template>
