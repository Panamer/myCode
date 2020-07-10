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

const event = new EventImmiter()

// 先订阅一个
event.on('plus', (...arguments) => {
  console.log(...arguments)
})
// 发布一下
event.emit('plus', '我是', 2, 'emit')
// 把这个事件的订阅关闭
event.off('plus')
// 尝试发布一下  会发现fn没有被执行  因为 订阅已经取消了
event.emit('plus', '我是off以后的emit')
