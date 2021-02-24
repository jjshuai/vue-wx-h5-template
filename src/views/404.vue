<template>
  <div class="wrap">
    <van-empty image="error" description="Please check that the URL you entered is correct" />
    <p class="go-home" @click="goHome">
      go home
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goHome() {
      this.$router.replace({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.go-home {
  text-align: center;
  color: green;
  cursor: pointer;
}
</style>
