<template>
  <div>

    <div class="MothElectPowerWap"
         style="padding:0 2.5%">
      <div>
        <select class="selectYearWap">
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </select>
        <span v-if="clientType==1"
              class="prompt"
              @click="showDialogStyle=true">数据说明<img src="../../../assets/images/electPower/wenhao.png"
               alt=""></span>
      </div>
      <!-- 说明提示 -->
      <div>
        <x-dialog v-model="showDialogStyle"
                  hide-on-blur
                  :dialog-style="{width: '70%', height: '4rem', }">
          <div class="dialogConet">
            <p>
              <span>数据说明</span>
              <i @click="showDialogStyle=false"></i>
            </p>
            <span>本页数据仅供参考，实际数据以账单为准</span>
          </div>

        </x-dialog>
      </div>
      <div v-if="echartData.length!=0">
        <flexbox class="electInfoWap">
          <flexbox-item>
            <div class="flex-demo">
              <p>1712</p>
              <span>年电量累计（度）</span>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p>1712</p>
              <span>年电费累计（元）</span>
            </div>
          </flexbox-item>
        </flexbox>
        <moth-echart :showSeriseData="echartData"></moth-echart>
        <moth-list></moth-list>

      </div>

      <!-- 暂无数据 -->
      <div v-if="echartData.length==0"
           style="text-align: center;padding-bottom:1.333333rem">
        <img src="../../../assets/images/electPower/illustratior_no_data.png"
             alt=""
             width="70%">
             <p style="padding-top:8%;font-size:16px;font-weight:bold">暂无数据</p>
      </div>

    </div>
    <e-foot v-if="echartData.length!=0"></e-foot>
  </div>
</template>
<style scoped>
</style>
<script>
import { Flexbox, FlexboxItem, XDialog } from 'vux'
import { XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
import eFoot from '../../../components/electrictyPower/electPowerFoot'
import mothList from '../../../components/electrictyPower/mothElectPower/list'
import mothEchart from '../../../components/electrictyPower/mothElectPower/mothEchart'
export default {
  data () {
    return {
      showDialogStyle: false,
      echartData: [
        {
          name: '谷',
          type: 'bar',
          xAxisIndex: 1,
          stack: 'sum',
          barWidth: '60%',
          itemStyle: {
            color: '#94dc86',
            barBorderRadius: [0, 0, 50, 50],
          },
          data: [100, 0, 200, 254, 144, 30, 120, 33, 23, 45, 69, 84]
        }, {
          name: '平',
          type: 'bar',
          xAxisIndex: 2,
          stack: 'sum',
          barWidth: '60%',
          itemStyle: {
            color: '#67b7ff',
            barBorderRadius: [0, 0, 0, 0],
          },
          data: [43, 42, 0, 85, 14, 28, 22, 13, 20, 41, 56, 35]
        },
        {
          name: '峰',
          type: 'bar',
          xAxisIndex: 3,
          stack: 'sum',
          barWidth: '60%',
          itemStyle: {
            color: '#f4e192',
            barBorderRadius: [0, 0, 0, 0],
          },
          data: [63, 82, 4, 25, 64, 98, 222, 43, 25, 67, 96, 89]
        },
        {
          name: '尖',
          type: 'bar',
          xAxisIndex: 3,
          stack: 'sum',
          barWidth: '60%',
          itemStyle: {
            color: '#f5b680',
            barBorderRadius: [50, 50, 0, 0],
          },
          data: [63, 82, 4, 25, 64, 98, 222, 43, 25, 67, 96, 89]
        }
      ],
      clientType: 1,//客户类型 0个人 1企业用户--地区 2企业用户--商户
    }
  },
  components: {
    eFoot,
    Flexbox,
    FlexboxItem,
    XDialog,
    mothEchart,
    mothList
  },
  methods: {

  }
}
</script>
<style scoped lang="less">
.selectYearWap {
  outline: none;
  border: none;
  font-size: 0.373333rem;
  margin-bottom: 0.933333rem;
  padding: 0 0.2rem;
  background: #fff;
}
.electInfoWap {
  text-align: center;

  .flex-demo {
    > p {
      font-size: 0.48rem;
      color: #060606;
      font-weight: bold;
      margin-bottom: 0.4rem;
    }
    > span {
      font-size: 0.373333rem;
      color: #a0a0a0;
    }
  }
}
.prompt {
  float: right;
  img {
    width: 0.4rem;
    padding-left: 0.16rem;
  }
}
.dialogConet {
  text-align: center;
  > p {
    border-bottom: 1px solid #000;
    line-height: 1.066667rem;
    margin-bottom: 1.2rem;
    position: relative;
  }
  i {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 0.32rem;
    right: 0.266667rem;
    display: block;
    background: url("../../../assets/images/electPower/guanbi.png") no-repeat;
    background-size: 100%;
  }
}
</style>