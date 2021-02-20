<template>
  <div id="app">

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive" v-cloak style="overflow-x: hidden" />
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive && isRouterAlive" v-cloak style="overflow-x: hidden" />

    <!-- 遮罩层 -->
    <globalMask />

  </div>
</template>
<script>
import globalMask from '@/components/globalMask'

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    globalMask
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 用provide / inject 组合,控制router-view的显示或隐藏，从而控制页面的再次加载
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    goPage(path) {
      this.$router.push(path)
    }
  }
}

</script>
<style lang="scss">

body{
    overflow: hidden;
    -webkit-tap-highlight-color: rgba($color: #000000, $alpha: 0);
    // ios使用-webkit-text-size-adjust禁止调整字体大小
    -webkit-text-size-adjust: 100%!important;
}
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
    // font-family: $base-font-family;
    font-size: 24px;
    color: #000000;
    // 全局背景色
    background-color: $color-bgc;
    overflow-y: hidden;  // 超出隐藏掉 使用better-scroll
  }
</style>

<style lang="scss">
// 全局toast样式修改

</style>
