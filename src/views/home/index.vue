<template>
  <div class="page-wrap">
    <div class="box-wrap">
      <div class="box-text">vue-wx-h5-template</div>
    </div>
    <!-- 雪碧图的使用 ico ioc-名字 -->
    <div class="icon-wrap">
      <i class="ico ico-icon1" />
      <i class="ico ico-icon2" />
      <i class="ico ico-icon3" />
      <i class="ico ico-icon4" />
      <i class="ico ico-icon5" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-wrap {
  height: 100%;
  width: 100%;
  .box-wrap {
    width: 100%;
    height: 200px;
    border-bottom: 1px solid blue;
    @include flexbox($jc: center, $ai: center, $fd: column);
    .box-text {
      text-align: center;
      font-size: 32px;
      color: blue;
    }
  }
  .icon-wrap {
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    @include flexbox($jc: flex-start, $ai: flex-start, $fw: wrap);
    .ico {
      margin: 20px;
      // 1px边框
      @include border($direction: all, $color: #ccc);
      transform: scale(0.5);
      transform-origin: top left;
    }
  }
}
</style>
