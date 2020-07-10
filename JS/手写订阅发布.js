/**
 * 20200710 guoyw
 * 正在学习vue源码  $on $emit 就是一个订阅发布模式
 * 我来手写一个 此处是简单版本
 */

class EventImmiter {
  constructor() {
    this._events = Object.create(null)
  }
  on(eventName, fn) {
    (this._events[eventName] || (this._events[eventName] = [])).push(fn)
  }
  off(eventName) {
    this._events[eventName] && (this._events[eventName] = null)
  }
  emit(eventName, ...args) {
    let cbs = this._events[eventName]
    cbs && cbs.forEach(element => {
      element(...args)
    })
  }
}




/**
 * 写一个vue版本的订阅发布吧, 相对比较复杂很多 值得学习
 * vue源码里的订阅发布
 * string | Array  event
 * function  callback
 */

class VueSubscribePublish {
  constructor() {
    this._events = {}
  }
  $on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        const element = event[i];
        this.$on(element, fn)
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn)
    }
  }
  $emit(event, args) {
    const vm = this
    let cbs = vm._events[event]
    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
        const fn = cbs[i];
        fn.apply(vm, args)
      }
    }
  }
  $off(event, fn) {
    const vm = this;
    // 如果没有参数 就移除所有监听器
    if (!arguments.length) {
      vm._events = Object.create(null)
    }
    // 如果event是数组
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        vm.$off(event[i], fn)
      }
    }
    // event 存在 不是数组
    const cbs = vm._events[event]
    // 传入的监听事件不存在
    if (!cbs) {
      return vm
    }
    // event是真实的, 没有传fn,则清空该事件的所有订阅
    if (arguments.length === 1) {
      vm._events[event] = null
    }
    // 只移除和fn相同的监听器
    if (fn) {
      const cbs = vm._events[event]
      let cb
      let i = cbs.length
      while(i--){
        cb = cbs[i]
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1)
          break
        }
      }
    }
  }
  $once(event, fn) {
    const vm = this;
    function on(){
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
  }
}

const event = new VueSubscribePublish()

// 先订阅一个
event.$on('plus', (...arguments) => {
  console.log(...arguments)
})
// 发布一下
event.$emit('plus', '我是', 2, 'emit')
// 把这个事件的订阅关闭
// event.off('plus')
// 尝试发布一下  会发现fn没有被执行  因为 订阅已经取消了
// event.$emit('plus', '我是off以后的emit')