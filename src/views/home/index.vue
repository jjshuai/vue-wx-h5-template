<template>
  <div class="bs-wrap">
    <div class="box-wrap">
      <div class="box-text">vue-wx-h5-template</div>
    </div>
    <!-- 雪碧图的使用 ico ioc-名字 -->
    <div v-if="true" id="tses" class="icon-wrap">
      <i class="ico ico-icon1" />
      <i class="ico ico-icon2" />
      <i class="ico ico-icon3" />
      <i class="ico ico-icon4" />
      <i class="ico ico-icon5" />
    </div>
    <div v-if="false" class="test">dasf</div>
    <div class="test" v-html="test" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      a: '1',
      b: '21'
    }
  },
  computed: {},
  created() {
    let a = 1

    a += 1
    // 这个备注
    const b = '123'
    const c = {
      a: '1',
      b: 'b'
    }
    const d = { a: 1 }

    console.log(a + b, c, d)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.bs-wrap {
  height: 100%;
  width: 100%;
  .box-wrap {
    width: 100%;
    height: 200px;
    border-bottom: 1px solid blue;
    @include flexbox(
      // justify-content
      $jc: center,
      // align-items
      $ai: center,
      // flex-direction
      $fd: column
    );
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
    @include flexbox(
      // justify-content
      $jc: flex-start,
      // align-items
      $ai: flex-start,
      // flex-direction
      $fd: row,
      // flex-wrap
      $fw: wrap
    );
    .ico {
      margin: 20px;
      // 1px边框
      @include border(
        // top - all - (top,right,bottom,left,)
        $direction: (top, right, bottom, left),
        //1px - (3px, 2px, 1px),
        $size: 1px,
        $color: #ccc,
        $style: solid,
        //20px - 50% - (10px, 20px, 30px, 40px) $radius: 40px
      );
    }
  }
}
</style>
