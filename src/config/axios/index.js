import { service } from './service'

import { config } from './config'

const { default_headers } = config

const request = (option) => {
  const { url, method, params, data, headersType, responseType, ...config } = option
  return service({
    url: url,
    method,
    params,
    data,
    ...config,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}
export default {
  get: async (option) => {
    const res = await request({ method: 'GET', ...option })
    return res.data || res
  },
  post: async (option) => {
    const res = await request({ method: 'POST', ...option })
    return res.data || res
  },
  postOriginal: async (option) => {
    return await request({ method: 'POST', ...option })
  },
  delete: async (option) => {
    const res = await request({ method: 'DELETE', ...option })
    return res.data || res
  },
  put: async (option) => {
    const res = await request({ method: 'PUT', ...option })
    return res.data || res
  },
  download: async (option) => {
    return await request({ method: 'GET', responseType: 'blob', ...option })
  },
  upload: async (option) => {
    option.headersType = 'multipart/form-data'
    return await request({ method: 'POST', ...option })
  }
}
