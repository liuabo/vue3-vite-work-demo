import mitt from 'mitt'

/*
* Option {
  name: string // 事件名称
  callback: Fn // 回调
}
* */

const emitter = mitt()

export const useEmitt = (option) => {
  if (option) {
    emitter.on(option.name, option.callback)

    onBeforeUnmount(() => {
      emitter.off(option.name)
    })
  }

  return {
    emitter
  }
}
