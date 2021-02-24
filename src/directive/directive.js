// 自定义指令

export default {
  // input聚焦
  focus: {
    inserted: function(el) {
      el.focus()
    }
  }
}
