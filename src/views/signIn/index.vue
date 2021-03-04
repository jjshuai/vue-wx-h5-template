<template>
  <div class="page-wrap">
    <div class="content">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div>
        <van-button round block type="info" native-type="submit" @click.native="onSubmit">提交</van-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit(values) {
      this.$toast({
        message: 'submit',
        position: 'middle'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  margin-top: 200px;
  @include flexbox($jc: center, $ai: flex-start);
}
</style>
