<script setup>
import * as LoginApi from "@/api/login/index.js";
import {aesEncrypt} from "@/utils/ase.js";
import {ElLoading} from "element-plus";
import * as authUtil from "@/utils/auth.js";
import {queryResLyList, querySkSsyl} from "@/api/DataProcessing/index.js";
import {sleep} from "@/utils/index.js";

defineOptions({name: 'DataProcessing'})

const loginData = reactive({
  isShowPassword: false,
  captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  loginForm: {
    uuid: '',
    code: '',
    username: 'admin',
    password: 'Sdyzt@2024',
    rememberMe: true // 默认记录我。如果不需要，可手动修改
  }
})
const loginLoading = ref(false)
const loading = ref()

const handleLogin = async () => {
  authUtil.removeToken()

  loginLoading.value = true
  try {
    const res = await LoginApi.login({
      username: loginData.loginForm.username,
      password: aesEncrypt(loginData.loginForm.password),
      code: loginData.loginForm.code,
      uuid: loginData.loginForm.uuid
    })
    if (!res) {
      return
    }
    loading.value = ElLoading.service({
      lock: true,
      text: '正在加载系统中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (loginData.loginForm.rememberMe) {
      authUtil.setLoginForm(loginData.loginForm)
    } else {
      authUtil.removeLoginForm()
    }
    authUtil.setToken(res)
  } finally {
    loginLoading.value = false
    loading.value.close()
  }
}


const skList = ref([])
const getData = async () => {
  skList.value = []
  const data = await queryResLyList({type: '4,5'})
  const len = data.length - 1

  for (let i = 0; i < len; i++) {
    const response = await querySkSsyl({id: data[i].rescd})
    await sleep(2000)
    if (response.ssInfo?.sw !== null) {
      skList.value.push(data[i])
    }
  }
}
</script>

<template>
  <div>
    <el-button type="primary" @click="handleLogin">获取token</el-button>
    <el-button type="primary" @click="getData">获取数据</el-button>
    <div>{{JSON.stringify(skList)}}</div>
  </div>
</template>

<style scoped lang="scss">

</style>
