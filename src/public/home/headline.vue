<template>
  <div class="headline">
    <div class="retreat" @click="retreat">
      <!-- < -->
    </div>
    <div class="title">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  props:['title'],
  data () {
    return {
    }
  },
  methods:{
    retreat(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
.headline{
  width: 100%;
  height: 44px;
  background: #018087;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  color: #fff;
  .retreat{
    position: absolute;
    top: 15px;
    left: 20px;
    width: 10px;
    height: 10px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(45deg);
  }
  .title{
    width: 100%;
    height: 100%;
    line-height: 44px;
    font-size: 16px;
    text-align: center;
  }
}
</style>
