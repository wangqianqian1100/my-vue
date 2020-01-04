<template>
  <div class="electTopWap">
    <ul @click="userInfo()">
      <li class="electName">**海群</li>
      <li>
        <span>用电户号</span>
        <span>4454555555</span>
      </li>
      <li>**地址地址地址地址地址地址地址地址</li>
    </ul>
    <x-icon type="ios-arrow-right"
            class="rightIcon"
            size="25"></x-icon>
  </div>
</template>
<script>
export default {

  data(){
    return{
      userId:1
    }
  },
  created(){
  
  },
  methods:{
    // 向父组件传方法
    userInfo(){
      this.$emit('userInfo')
    }
  }
}
</script>
<style scoped lang="less">
.electTopWap {
  background: #fff;
  padding: 0.133333rem 0.2rem;
  border-radius: 0.106667rem;
  position: relative;
  font-size: 0.373333rem;
  color: #818181;
  ul li{
 padding-bottom: .333333rem;
  }
  ul .electName {
    font-size:.453333rem;
    font-weight: bold;
    padding: .266667rem 0;
    color: #000;
  }
  .rightIcon {
    position: absolute;
    top: 40%;
    right: 0;
  }
}
</style>