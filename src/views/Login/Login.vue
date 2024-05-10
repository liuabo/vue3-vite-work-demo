<template>
  <div class="login">
    <el-form
      ref="formLogin"
      :model="loginData.loginForm"
      :rules="LoginRules"
      class="login-form"
      label-position="top"
      label-width="120px"
      size="large"
    >
      <el-row style="margin-right: -10px; margin-left: -10px">
        <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
          <el-form-item>
            <LoginFormTitle style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
          <el-form-item prop="username">
            <el-input
              v-model="loginData.loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="iconAvatar"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
          <el-form-item prop="password">
            <el-input
              v-model="loginData.loginForm.password"
              placeholder="请输入密码"
              :prefix-icon="iconLock"
              show-password
              type="password"
              @keyup.enter="handleLogin()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
          <el-form-item prop="code" v-if="captchaEnabled">
            <el-input
              v-model="loginData.loginForm.code"
              size="large"
              auto-complete="off"
              placeholder="验证码"
              :prefix-icon="validCode"
              style="width: 63%"
              @keyup.enter="handleLogin"
             />
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col
          :span="24"
          style="padding-right: 10px; padding-left: 10px; margin-top: -20px; margin-bottom: -20px"
        >
          <el-form-item>
            <el-row justify="space-between" style="width: 100%">
              <el-col :span="6">
                <el-checkbox v-model="loginData.loginForm.rememberMe"> 记住我 </el-checkbox>
              </el-col>
              <el-col :offset="6" :span="12">
                <el-link style="float: right" type="primary">忘记密码?</el-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
          <el-form-item>
            <XButton
              :loading="loginLoading"
              title="登录"
              class="w-[100%]"
              type="primary"
              @click="handleLogin()"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import { ElLoading } from 'element-plus'
import LoginFormTitle from './components/LoginFormTitle.vue'

import { useIcon } from '@/hooks/web/useIcon.js'

import * as authUtil from '@/utils/auth.js'
import { usePermissionStore } from '@/store/modules/permission'
import * as LoginApi from '@/api/login/index.js'
import { LoginStateEnum, useFormValid, useLoginState } from './components/useLogin'
import { XButton } from '@/components/XButton'
import { useMessage } from '@/hooks/web/useMessage.js'
import { useRouter } from 'vue-router'
import { getCodeImg } from '@/api/login/index.js'
import { aesEncrypt } from '@/utils/ase.js'

defineOptions({ name: 'LoginForm' })

const message = useMessage()
const iconAvatar = useIcon({ icon: 'ep:avatar' })
const validCode = useIcon({ icon: 'svg-icon:validCode' })
const iconLock = useIcon({ icon: 'ep:lock' })
const formLogin = ref()
const { validForm } = useFormValid(formLogin)
const { setLoginState, getLoginState } = useLoginState()
const { currentRoute, push } = useRouter()
const permissionStore = usePermissionStore()
const redirect = ref('')
const loginLoading = ref(false)
const verifyRef = ref()
const captchaType = ref('blockPuzzle') // blockPuzzle 滑块 clickWord 点击文字

const captchaEnabled = ref(false)
const codeUrl = ref('')

const LoginRules = {
  tenantName: [],
  username: [],
  password: []
}
const loginData = reactive({
  isShowPassword: false,
  captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  loginForm: {
    uuid: '',
    code: '',
    username: '',
    password: '',
    rememberMe: true // 默认记录我。如果不需要，可手动修改
  }
})

// 记住我
const getLoginFormCache = () => {
  const loginForm = authUtil.getLoginForm()
  if (loginForm) {
    loginData.loginForm = {
      ...loginData.loginForm,
      username: loginForm.username ? loginForm.username : loginData.loginForm.username,
      password: loginForm.password ? loginForm.password : loginData.loginForm.password,
      rememberMe: loginForm.rememberMe,
      tenantName: loginForm.tenantName ? loginForm.tenantName : loginData.loginForm.tenantName
    }
  }
}
// 获取验证码
const getCode = () => {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaOnOff === undefined ? true : res.captchaOnOff;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginData.loginForm.uuid = res.uuid;
    }
  });
}
const loading = ref() // ElLoading.service 返回的实例
// 登录
const handleLogin = async () => {
  loginLoading.value = true
  try {
    const data = await validForm()
    if (!data) {
      return
    }
    const res = await LoginApi.login({ username: loginData.loginForm.username, password: aesEncrypt(loginData.loginForm.password), code: loginData.loginForm.code, uuid: loginData.loginForm.uuid })
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
    if (!redirect.value) {
      redirect.value = '/'
    }
    // 判断是否为SSO登录
    if (redirect.value.indexOf('sso') !== -1) {
      window.location.href = window.location.href.replace('/login?redirect=', '')
    } else {
      push({ path: redirect.value || permissionStore.addRouters[0].path })
    }
  } finally {
    loginLoading.value = false
    loading.value.close()
  }
}
watch(
  () => currentRoute.value,
  (route) => {
    redirect.value = route?.query?.redirect
  },
  {
    immediate: true
  }
)
onMounted(() => {
  getLoginFormCache()
  getCode()
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: var(--login-bg-color);

  .login-code {
    width: 33%;
    height: 40px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .login-code-img {
    height: 40px;
    padding-left: 12px;
  }
}
.login-form {
  max-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
