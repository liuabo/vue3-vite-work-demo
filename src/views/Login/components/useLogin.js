export const LoginStateEnum = {
  LOGIN: 0,
  REGISTER: 1,
  RESET_PASSWORD: 2,
  MOBILE: 3,
  QR_CODE: 4,
  SSO: 5
}

const currentState = ref()

export function useLoginState() {
  function setLoginState(state) {
    currentState.value = state
  }
  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState()
  }

  return {
    setLoginState,
    getLoginState,
    handleBackLogin
  }
}

export function useFormValid(formRef) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    return await form.validate()
  }

  return {
    validForm
  }
}
