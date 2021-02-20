<template>
  <div class="bs-wrap">
    <!-- 雪碧图使用 ico ioc-名字 -->
    <i class="city-img ico ico-icon1" />

    <div class="box-test">
      <span class="box1" />
      <span class="box2" />
    </div>
  </div>
</template>
<script>

export default {
  name: 'Home',

  data() {
    return {

    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }

}
</script>
<style lang="scss" scoped>
@import '@/assets/style/border.scss';

  .bs-wrap{
    height: 100%;
    width: 100%;
  }
  .box-test{
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
    box-sizing: border-box;
    .box1{
      width: 100%;
      border-bottom: 1px solid red;
    }
    .box2{
      width: 100px;
      height: 100px;
      margin-top: 20px;
      // 边框
      @include border(
        $direction: (top, right, bottom, left),  // top - all - (top, right, bottom, left)
        $size: 1px,  // 1px - (3px, 2px, 1px),
        $color: blue,
        $style: solid,
        $radius: 20px  // 20px - 50% - (10px, 20px, 30px, 40px)
      );

    }
  }
</style>
