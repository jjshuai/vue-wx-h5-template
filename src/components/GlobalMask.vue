<template>
  <div v-show="showMask" class="components-wrap">
    <div class="loadingio-spinner-eclipse-qcqjgsfzgzh">
      <div class="animate-whirling">
        <div />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Name',
  data() {
    return {
      a: '1',
      b: '21'
    }
  },
  computed: {
    showMask: {
      get: function () {
        return this.$store.getters.mask
      },
      set: function () {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.components-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  z-index: 9999;
  text-align: center;
}
</style>
<style type="text/css">
.animate-whirling div {
  position: absolute;
  animation: animate-whirling 1s linear infinite;
  width: 92.8px;
  height: 92.8px;
  top: 11.6px;
  left: 11.6px;
  border-radius: 50%;
  box-shadow: 0 3.4799999999999995px 0 0 #0033cc;
  transform-origin: 46.4px 48.13999999999999px;
}
.loadingio-spinner-eclipse-qcqjgsfzgzh {
  width: 116px;
  height: 116px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
  position: relative;
  top: 42%;
  margin: -57px 0 0 0;
}
.animate-whirling {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.animate-whirling div {
  box-sizing: content-box;
}
</style>
