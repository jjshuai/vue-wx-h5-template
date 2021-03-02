const debounce = (func, time, isDebounce, ctx) => {
  var timer, lastCall, rtn
  // 防抖函数
  if (isDebounce) {
    rtn = (...params) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(ctx, params)
      }, time)
    }
  } else {
    // 节流函数
    rtn = (...params) => {
      const now = new Date().getTime()
      if (now - lastCall < time && lastCall) return
      lastCall = now
      func.apply(ctx, params)
    }
  }
  return rtn
}

export default {
  name: 'Debounce',
  abstract: true,
  props: {
    time: {
      type: Number,
      default: 500
    },
    events: {
      type: String,
      default: 'click'
    },
    isDebounce: {
      // true防抖 false节流
      type: Boolean,
      default: true
    }
  },
  created() {
    this.eventKeys = this.events.split(',')
    this.originMap = {} // 子节点的事件
    this.debouncedMap = {} // debounce后的子节点事件
  },
  render() {
    const vnode = this.$slots.default[0]
    this.eventKeys.forEach(key => {
      // 当前点击事件
      const target = vnode.data.on[key]
      // 已经处理过该子节点事件
      if (target === this.originMap[key] && this.debouncedMap[key]) {
        vnode.data.on[key] = this.debouncedMap[key]
      } else if (target) {
        // 对子节点事件进行处理
        this.originMap[key] = target
        this.debouncedMap[key] = debounce(target, this.time, this.isDebounce, vnode)
        vnode.data.on[key] = this.debouncedMap[key]
      }
    })
    return vnode
  }
}
