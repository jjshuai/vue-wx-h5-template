<template>
  <div id="app" class="no-vw">

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive" />

    <!-- 页面切换遮罩层 -->
    <global-mask />

  </div>
</template>
<script>
import GlobalMask from '@/components/GlobalMask'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    GlobalMask
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
    }
  }
}
</script>
<style lang="scss">
body {
  -webkit-tap-highlight-color: rgba($color: #000000, $alpha: 0); // 点击高亮
  -webkit-text-size-adjust: 100% !important; // ios使用-webkit-text-size-adjust 禁止调整字体大小
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>
