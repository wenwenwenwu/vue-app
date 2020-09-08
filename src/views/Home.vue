<template>
  <div class="home">
    <p class="test">测试 FontSize</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
    // 使用到时通过style.scss引入
    @import '@css/style.scss'; 
    .test {
        font-size: px2rem(16);
    }
</style>