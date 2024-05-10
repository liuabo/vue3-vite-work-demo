import request from '@/config/axios'

export const queryResLyList = (params) => {
    return request.get({ url: '/map/ly/tj/queryResLyList', params })
}
export const querySkSsyl = (params) => {
    return request.get({ url: '/detail/querySkSsyl', params })
}
