<template>
  <div id="addRecords">
    <div class="header">
      <headline :title="title" />
    </div>
    <div id="content">
      <ul class="list" v-for="(item,index) in addRecords" :key="index">
        <router-link :to="{path: '/paymentRecords', query: {tabIndex: addRecords[index]}}">
          <li class="item accountName">{{item.AccountName}}</li>
          <li class="item">用电户号: {{item.Doorno}}</li>
          <li class="item address">{{item.Address}}</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import { XHeader } from "vux";
export default {
  data() {
    return {
      title: "选择用电户号",
      //加载数据
      addRecords: [
        {
          AccountName: "中国电信*****缴费部",
          Doorno: "88888888",
          Address: "浙江省绍兴市成州市三街道阮庙*******尹村"
        },
        {
          AccountName: "*金河",
          Doorno: "88888888",
          Address: "内蒙古呼和浩特市*******鄂尔多斯"
        },
        {
          AccountName: "移动*****缴费部",
          Doorno: "88888888",
          Address: "内蒙古呼和浩特市*******鄂尔多斯"
        },
        {
          AccountName: "缴费部*****缴费部*****缴费部*****缴费部",
          Doorno: "88888888",
          Address: "内蒙古呼和浩特市鄂尔多斯"
        }
      ]
    };
  },
  mounted() {
    document.title = "选择用电户号";
  },
  components: {
    XHeader
  }
};
</script>
<style lang="less" scoped>
#addRecords {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  touch-action: none;
  height: 100%;
  width: 100%;
  color: #250707;
  background-color: #f4f7fc;
  .header {
    height: 1.066667rem;
    line-height: 1.333333rem;
    text-align: center;
    font-size: 0.48rem;
    font-weight: 700;
    background-color: white;
    margin-bottom: 0.55rem;
  }
  #content {
    .list {
      background-color: white;
      display: flex;
      flex-direction: column;
      margin: 0.373333rem 0.373333rem 0.373333rem;
      padding: 0.373333rem 0.32rem 0.1rem 0.32rem;
      box-sizing: border-box;
      font-size: 0.426667rem;
      border-radius: 0.133333rem;
      color: #6e6e6e;
      .accountName {
        font-weight: 700;
        padding-bottom: 0.333333rem !important;
        color: #202020;
        width: 6.933333rem;
        white-space: nowrap;
        overflow: hidden;
      }
      .item {
        padding-bottom: 0.16rem;
      }
      .address {
        width: 6.933333rem;
      }
    }
  }
}
</style>