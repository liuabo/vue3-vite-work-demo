<template>
  <div class="upload-file">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :action="uploadUrl + url"
      :auto-upload="autoUpload"
      :before-upload="beforeUpload"
      :drag="drag"
      :data="data"
      :headers="{ Authorization: 'Bearer ' + getAccessToken() }"
      :limit="props.limit"
      :multiple="props.limit > 1"
      :on-error="excelUploadError"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleFileSuccess"
      :show-file-list="true"
      class="upload-file-uploader"
      name="file"
    >
<!--      :http-request="httpRequest"-->

      <el-button type="primary">
        <Icon icon="ep:upload-filled" />
        选取文件
      </el-button>
      <template v-if="isShowTip" #tip>
        <div style="font-size: 8px">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </div>
        <div style="font-size: 8px">
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b> 的文件
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script setup>
import { isString } from '@/utils/is'
import { useUpload } from '@/components/UploadFile/src/useUpload'
import { Icon } from '@/components/Icon'
import { useMessage } from '@/hooks/web/useMessage.js'
import { getAccessToken } from '@/utils/auth.js'

defineOptions({ name: 'UploadFile' })

const message = useMessage() // 消息弹窗
const emit = defineEmits(['update:modelValue', 'success'])

const props = defineProps({
  modelValue: {
    type: String | Array
  },
  title: {
    type: String,
    default: '文件上传'
  },
  fileType: {
    type: Array,
    default: () => ['doc', 'xls', 'ppt', 'txt', 'pdf', 'json', 'png', 'jpg', 'jpeg']
  }, // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileSize: {
    type: Number,
    default: 5
  }, // 大小限制(MB)
  limit: {
    type: Number,
    default: 5
  }, // 数量限制
  autoUpload: {
    type: Boolean,
    default: true
  }, // 自动上传
  drag: {
    type: Boolean,
    default: false
  }, // 拖拽上传
  isShowTip: {
    type: Boolean,
    default: true
  },
  url: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: {}
  }
})

// ========== 上传相关 ==========
const uploadRef = ref()
const uploadList = ref([])
const fileList = ref([])
const uploadNumber = ref(0)

const { uploadUrl, httpRequest } = useUpload()

// 文件上传之前判断
const beforeUpload = (file) => {
  if (fileList.value.length >= props.limit) {
    message.error(`上传文件数量不能超过${props.limit}个!`)
    return false
  }
  let fileExtension = ''
  if (file.name.lastIndexOf('.') > -1) {
    fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
  }
  const isImg = props.fileType.some((type) => {
    if (file.type.indexOf(type) > -1) return true
    return !!(fileExtension && fileExtension.indexOf(type) > -1)
  })
  const isLimit = file.size < props.fileSize * 1024 * 1024
  if (!isImg) {
    message.error(`文件格式不正确, 请上传${props.fileType.join('/')}格式!`)
    return false
  }
  if (!isLimit) {
    message.error(`上传文件大小不能超过${props.fileSize}MB!`)
    return false
  }
  message.success('正在上传文件，请稍候...')
  uploadNumber.value++
}
// 处理上传的文件发生变化
// const handleFileChange = (uploadFile: UploadFile): void => {
//   uploadRef.value.data.path = uploadFile.name
// }
// 文件上传成功
const handleFileSuccess = (res) => {
  message.success('上传成功')
  // 删除自身
  const index = fileList.value.findIndex((item) => item.response?.data === res.data)
  fileList.value.splice(index, 1)
  uploadList.value.push(res.data)
  if (uploadList.value.length == uploadNumber.value) {
    fileList.value.push(...uploadList.value)
    uploadList.value = []
    uploadNumber.value = 0
    emitUpdateModelValue()
    emit('success', fileList.value)
  }
}
// 文件数超出提示
const handleExceed = () => {
  message.error(`上传文件数量不能超过${props.limit}个!`)
}
// 上传错误提示
const excelUploadError = () => {
  message.error('导入数据失败，请您重新上传！')
}
// 删除上传文件
const handleRemove = (file) => {
  const index = fileList.value.map((f) => f.name).indexOf(file.name)
  if (index > -1) {
    fileList.value.splice(index, 1)
    emitUpdateModelValue()
  }
}
const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

// 监听模型绑定值变动
watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      fileList.value = [] // fix：处理掉缓存，表单重置后上传组件的内容并没有重置
      return
    }

    fileList.value = [] // 保障数据为空
    // 情况1：字符串
    if (isString(val)) {
      fileList.value.push(
        ...val.split(',').map((url) => ({ name: url.substring(url.lastIndexOf('/') + 1), url })))
      return
    }
    // 情况2：数组
    fileList.value.push(...(val).map((url) => ({ name: url.substring(url.lastIndexOf('/') + 1), url })))
  },
  { immediate: true, deep: true })
// 发送文件链接列表更新
const emitUpdateModelValue = () => {
  // 情况1：数组结果
  let result = fileList.value.map((file) => file.url)
  // 情况2：逗号分隔的字符串
  if (props.limit === 1 || isString(props.modelValue)) {
    result = result.join(',')
  }
  emit('update:modelValue', result)
}

defineExpose({uploadRef})
</script>
<style lang="scss" scoped>
.upload-file-uploader {
  margin-bottom: 5px;
}

:deep(.upload-file-list .el-upload-list__item) {
  position: relative;
  margin-bottom: 10px;
  line-height: 2;
  border: 1px solid #e4e7ed;
}

:deep(.el-upload-list__item-file-name) {
  max-width: 250px;
}

:deep(.upload-file-list .ele-upload-list__item-content) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}

:deep(.ele-upload-list__item-content-action .el-link) {
  margin-right: 10px;
}
</style>
