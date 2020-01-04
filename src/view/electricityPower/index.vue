<template>
  <div class="electPowerWap">
    <headline title="电量电费"></headline>
    <!-- 头部信息 -->
    <e-header @userInfo="userInfo()"></e-header>
    <div style="background:#fff;">
      <div class="electTabWap"
           style="background: #fff;">
        <div class="tabSelt">
          <div class="tabSeltBox">
            <span @click="tableSelt(1)"
                  :class="{'electChecked':electType==1}">月度电费</span>
            <span @click="tableSelt(2)"
                  :class="{'electChecked':electType==2}">日用电量</span>
          </div>
        </div>
      </div>

      <router-view></router-view>

    </div>
   
  </div>
</template>
<style scoped>
</style>
<script>

import eHeader from '../../components/electrictyPower/electPowerTop'


export default {
  data () {
    return {
      electType: 1
    }
  },

  watch:{
    // 监控路由变化修改选中状态
  $route(to,from){
      if(to.name=='day'){
      this.electType=2
    }else{
      this.electType=1
    }
  }
},
  mounted () {

  },
  methods: {
    tableSelt (type) {
      this.electType = type;
      this.$router.push(this.linkName)
    },
    // 选择用户
    userInfo(){
      this.$router.push(`/electricityPower/userList?id=${this.electType}`)
    }
  },
  components: {
    eHeader,
  },
  computed: {
    linkName () {
      return this.electType == 1 ? '/electricityPower/mothIndex' : '/electricityPower/dayIndex'
    }
  }
}
</script>
<style scoped lang="less">
.electPowerWap {
  background: #f7f8fa;
  font-size: 0.373333rem;
  padding: 0.533333rem 0% 0;
  margin-top:44px;

  .electTabWap {
    padding-top: 1px;
    margin-top: 10px;
  }
  .tabSelt {
    width: 4.4rem;
    height: 0.933333rem;
    background: #329dff;
    margin: 0.533333rem auto 0.8rem;
    border: 1px solid #138eff;
    border-radius: 0.533333rem;

    .tabSeltBox {
      text-align: center;
      display: flex;
      display: -webkit-flex;
      padding: 0.04rem 0px;
      margin-top: 0.05rem;
      > span {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        color: #fff;
        margin: 0px 5px;
        padding: 0.15rem 0;
        display: block;
        text-align: center;
        flex: 1;
      }
      .electChecked {
        background: #fff;
        color: #329dff;
        border-radius: 0.546667rem;
      }
    }
  }
  
  
}
</style>
