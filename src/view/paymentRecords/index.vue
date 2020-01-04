<template>
  <div id="paymentRecords">
    <div class="header">
      <headline :title="title" />
    </div>
    <div id="content">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <p v-show="RecordList.length<1 && InitialLoading" class="page-infinite-loading">
          <mt-spinner type="fading-circle" class="center"></mt-spinner>
          <i class="text">
            <i class="refresh">正在刷新</i>
            <i>上次更新 10-29 12:12</i>
          </i>
        </p>
        <!-- <p v-show="InitialLoading==false" class="page-infinite-loading">
          <mt-spinner
            type="fading-circle"
            class="center"
          ></mt-spinner>         
          <i>正在刷新</i>
          <i>上次更新 10-29 12:12</i>              
        </p>-->
        <mt-loadmore
          :top-method="loadTop"
          :top-all-loaded="allLoaded"
          :auto-fill="false"
          @top-status-change="handleTopChange"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :bottomPullText="bpText"
          :bottomLoadingText="blText"
          @bottom-status-change="handleBottomChange"
          ref="loadmore"
        >
          <div slot="top" class="mint-loadmore-top" :class="{'showTop':showTop}">
            <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">
              <i class="icon">↓</i>
              <div class="text">
                <i>下拉可以刷新</i>
                <i>上次更新 10-29 12:12</i>
              </div>
            </span>
            <!-- <span v-show="topStatus === ''">
            <i class="icon">↓</i>
            <div class="text">
              <i>释放立即刷新</i>
              <i>上次更新 10-29 12:12</i>
            </div>
            </span>-->
            <span v-show="topStatus === 'drop'">
              <i class="icon">↓</i>
              <div class="text">
                <i>正在刷新</i>
                <i>上次更新 10-29 12:12</i>
              </div>
            </span>
            <span v-show="topStatus === 'loading'">
              <div class="text">
                <i>刷新完成</i>
                <i>上次更新 10-29 12:12</i>
              </div>
            </span>
          </div>
          <div class="top">
            <img class="img" src="../../assets/arrow.png" />
            <ul
              class="list"
              @click="$router.push({path:'/paymentRecords/addRcords',params:{addRecords}})"
            >
              <li class="item accountName">{{addRecords['AccountName']}}</li>
              <li class="item">用电户号: {{addRecords['Doorno']}}</li>
              <li class="item address">{{addRecords['Address']}}</li>
            </ul>
          </div>
          <div class="balance">
            <i>余额</i>
            <div class="prices">
              <i class="price">28.44</i>元
            </div>
          </div>
          <div class="record">交费记录</div>
          <ul class="list" v-for="(item,index) in RecordList" :key="index">
            <li class="itemFirst item">
              <i>{{item.Paymentmethods}}</i>
              <i>¥{{(item.price*1).toFixed(2)}}</i>
            </li>
            <li class="accountName item">户名：{{item.Accountame}}</li>
            <li class="item">用电户号：{{item.Doorno}}</li>
            <li class="item">{{item.Datetime}}</li>
          </ul>
          <div slot="bottom" v-if="!more" class="mint-loadmore-bottom">
            <span
              v-show="bottomStatus === 'pull'"
              :class="{ 'is-rotate': bottomStatus === 'pull' }"
            >
              <i class="text">{{blText}}</i>
            </span>
            <span
              v-show="bottomStatus === 'loading'"
              :class="{ 'is-rotate': bottomStatus === 'loading' }"
            >{{bpText}}</span>
            <!-- <span
              v-show="bottomStatus === 'drop'"
              :class="{ 'is-rotate': bottomStatus === 'drop' }"
            >{{bdText}}</span>-->
          </div>
          <div class="noData" v-if="more">没有更多数据了</div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
import { Loadmore } from "mint-ui";
import * as utils from "../../utils";
import * as api from "./api";
import { XHeader } from "vux";
export default {
  data() {
    return {
      title: "电费情况",
      addRecords: {
        AccountName: "中国电信*****缴费部",
        Doorno: "88888888",
        Address: "浙江省绍兴市成州市三街道阮庙*******尹村"
      },
      RecordList: [],
      list: [
        {
          Paymentmethods: "电易宝代收(常收)",
          price: "20.00",
          Accountame: "栋梁",
          Doorno: "88888888",
          Datetime: "2019-09-10 12:12:12"
        },
        {
          Paymentmethods: "电易宝代收(常收)",
          price: "23.00",
          Accountame: "栋梁",
          Doorno: "88888888",
          Datetime: "2019-10-10 12:12:12"
        },
        {
          Paymentmethods: "电易宝代收(常收)",
          price: "89.00",
          Accountame: "栋梁",
          Doorno: "88888888",
          Datetime: "2019-11-10 12:12:12"
        },
        {
          Paymentmethods: "电易宝代收(常收)",
          price: "9.90",
          Accountame: "栋梁",
          Doorno: "88888888",
          Datetime: "2019-12-10 12:12:12"
        },
        {
          Paymentmethods: "电易宝代收(常收)",
          price: "7.80",
          Accountame: "栋梁",
          Doorno: "88888888",
          Datetime: "2020-09-10 12:12:12"
        }
      ],
      addRecordBack: [],

      allLoaded: false, //如果true，bottomMethod将无法再触发
      InitialLoading: true, //初始加载中
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: 0,
      pageNum: 1, //当前页
      pageSize: 10, //列表数,
      bpText: "正在加载",
      blText: "加载完成",
      showTop: true,
      more: false
    };
  },
  created() {},
  mounted() {
    document.title = "电费情况"; //标题设置
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top; //下拉加载容器高度
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().bottom; //上拉加载容器高度

    this.getList(); //页面初始化数据
    this.loadTop();
    this.addRecordBack = JSON.stringify(this.$route.query.tabIndex);
    // console.log(this.addRecordBack);
  },
  components: {
    "mt-loadmore": Loadmore, //组件引入
    XHeader
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      setTimeout(() => {
        this.RecordList = this.list;
        this.$refs.loadmore.onTopLoaded();
        this.InitialLoading = false;
      }, 1000);
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
      if (this.allLoaded) {
        this.more = true;
        setTimeout(() => {
          this.more = false;
        }, 2000);
      }
    },
    loadBottom() {
      this.handleBottomChange("pull"); //上拉时改变状态码
      this.pageNum += 1;
      setTimeout(() => {
        if (this.pageNum <= 3) {
          this.RecordList = this.RecordList.concat(this.list);
        } else {
          this.allLoaded = true; //模拟数据加载完毕 禁用上拉加载
        }
        this.handleBottomChange("drop"); //数据加载完毕 修改状态码
        this.$refs.loadmore.onBottomLoaded();
      }, 1000);
      this.getList();
    },
    //发送请求
    async getList() {
      let params = {
        pageNumber: 0,
        pageSize: 10 //每次请求10条数据
      };
      const res = await utils.HTTP(`${api.paymentRecords}`, params);
      // console.log(res);
      if (res.code == 1) {
        this.RecordList = res.data;
        this.pageSize++;
      }
    }
  },
  watch: {
    $route () {
      this.addRecordBack = this.$route.query.tabIndex;
    }
  }
};
</script> 
<style scoped lang="less">
#paymentRecords {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  background-color: #f4f7fc;
  color: #4a4a4c;
  .header {
    height: 1.066667rem;
    line-height: 1.333333rem;
    text-align: center;
    font-size: 0.48rem;
    font-weight: 700;
    background-color: white;
    margin-bottom: 0.166667rem;
  }
  #content {
    .page-loadmore-wrapper {
      overflow: scroll;
      .noData {
        margin-bottom: 0.266667rem;
        font-size: 0.48rem;
        text-align: center;
      }
      /deep/.page-infinite-loading {
        margin-top: 0.266667rem;
        line-height: 0.6rem;
        font-size: 0.32rem;
        color: #7b7e83;
        display: flex;
        justify-content: center;
        height: 1.2rem;
        align-content: center;
        .text {
          padding-left: 0.2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .refresh {
            padding-left: 0.7rem;
            font-size: 0.426667rem;
            color: #555555;
          }
        }
      }
      /deep/.mint-loadmore-top {
        // padding-top: 0.2rem;
        line-height: 0.8rem;
        // margin-top:-1.066667rem;
        span {
          display: flex;
          justify-content: center;
          .text {
            padding-left: 0.24rem;
            display: flex;
            flex-direction: column;
            line-height: 0.533333rem;
            :nth-child(1) {
              font-size: 0.426667rem;
              color: #717274;
            }
            :nth-child(2) {
              font-size: 0.32rem;
              color: #8c8f94;
            }
          }
        }
      }
      .top {
        position: relative;
        .img {
          position: absolute;
          right: 0.666667rem;
          top: 50%;
        }
      }
    }
    .top {
      padding-top: 0.1rem;
      .list {
        background-color: white;
        display: flex;
        flex-direction: column;
        margin: 0 0.373333rem 0.373333rem;
        padding: 0.166667rem 0.32rem 0.1rem 0.32rem;
        box-sizing: border-box;
        margin-top: 0.266667rem;
        font-size: 0.426667rem;
        border-radius: 0.133333rem;
        color: #6e6e6e;
        .accountName {
          font-weight: 700;
          padding-bottom: 0.433333rem !important;
          color: #202020;
          width: 6.933333rem;
          white-space: nowrap;
          overflow: hidden;
        }
        .item {
          padding-bottom: 0.22rem;
        }
        .address {
          width: 6.933333rem;
        }
      }
    }
    .balance {
      height: 2.4rem;
      font-size: 0.426667rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      margin-top: 0.266667rem;
      justify-content: center;
      color: #696969;
      .prices {
        font-size: 0.32rem;
        padding-top: 0.266667rem;
        color: #8f8f8f;
        .price {
          font-weight: 700;
          font-size: 0.533333rem;
          color: #242424;
          padding-right: 0.106667rem;
        }
      }
    }
    .record {
      font-size: 0.373333rem;
      margin: 0.326667rem 0 0.326667rem 0.266667rem;
      color: #1b1b1d;
    }
    .list {
      background-color: white;
      display: flex;
      flex-direction: column;
      margin: 0 0.373333rem 0.373333rem;
      padding: 0.4rem 0.32rem 0.1rem 0.32rem;
      box-sizing: border-box;
      font-size: 0.426667rem;
      border-radius: 0.133333rem;
      box-shadow: #eee 0.021333rem 0.021333rem 0.021333rem 0.021333rem;
      .accountName {
        font-weight: 700;
        color: #161616;
      }
      .itemFirst {
        display: flex;
        justify-content: space-between;
        :nth-child(2) {
          color: #1e1e1e;
        }
      }
      .item {
        padding-bottom: 0.3rem;
      }
    }
    /deep/.mint-loadmore-bottom {
      line-height: 0.8rem;
      span {
        font-size: 0.48rem;
        .text {
          padding-left: 0.24rem;
          flex-direction: column;
          line-height: 0.333333rem;
        }
      }
    }
  }
}
</style>