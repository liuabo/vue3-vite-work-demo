import test from './test.mock.js'
// import { RequestHttpEnum } from '@/enums/httpEnum'

// 模型管理
export const login = '/login'
export const getInfo = '/getInfo'
export const captchaImage = '/captchaImage'
export const modelListUrl = '/model/list'
export const modelTuning  = '/model/tuning'

const mockObject = [
  {
    url: login,
    method: 'post',
    response: () => test.fetchMockLogin
  },
  {
    url: getInfo,
    method: 'get',
    response: test.fetchMockUserInfo
  },
  {
    url: captchaImage,
    method: 'get',
    response: () => test.fetchMockCaptchaImage
  },
  {
    url: modelListUrl,
    method: 'get',
    response: () => test.fetchMockModelListData
  },
  {
    url: modelTuning,
    method: 'get',
    response: () => test.fetchModelTuning
  },
]

export default mockObject
