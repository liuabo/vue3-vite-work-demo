import request from '@/config/axios'

// 查询文件列表
export const getFilePage = (params) => {
  return request.get({ url: '/infra/file/page', params })
}

// 删除文件
export const deleteFile = (id) => {
  return request.delete({ url: '/infra/file/delete?id=' + id })
}

// 获取文件预签名地址
export const getFilePresignedUrl = (path) => {
  return request.get({
    url: '/infra/file/presigned-url',
    params: { path }
  })
}

// 创建文件
export const createFile = (data) => {
  return request.post({ url: '/infra/file/create', data })
}

// 上传文件
export const updateFile = (data) => {
  return request.upload({ url: '/common/uploadfile', data })
}
