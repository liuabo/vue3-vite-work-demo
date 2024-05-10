import request from '@/config/axios'

// 查询字典数据（精简)列表
export const getSimpleDictDataList = () => {
  return request.get({ url: '/system/dict-data/simple-list' })
}

// 查询字典数据列表
export const getDictDataPage = (params) => {
  return request.get({ url: '/system/dict-data/page', params })
}

// 查询字典数据详情
export const getDictData = (id) => {
  return request.get({ url: '/system/dict-data/get?id=' + id })
}

// 新增字典数据
export const createDictData = (data) => {
  return request.post({ url: '/system/dict-data/create', data })
}

// 修改字典数据
export const updateDictData = (data) => {
  return request.put({ url: '/system/dict-data/update', data })
}

// 删除字典数据
export const deleteDictData = (id) => {
  return request.delete({ url: '/system/dict-data/delete?id=' + id })
}

// 导出字典类型数据
export const exportDictData = (params) => {
  return request.download({ url: '/system/dict-data/export', params })
}
