<template>
  <div>
    <div class="listContent">
      <ul class="T-head">
        <li>月份</li>
        <li>电量(度)</li>
        <li>电费(元)</li>
      </ul>
      <!-- 循环 -->
      <div class="forBox" v-for="(item,i) in list" :key="i">
        <div @click="itemShow(item)"  class="T-body-border">
          <ul class="T-body">
            <li>{{item.month}}</li>
            <li :class="{'icon-active':item.max}"> {{item.quantity}}
              <img v-if="item.max" src="../../../assets/images/electPower/max.png" alt />
            </li>
            <li :class="{'icon-active':item.max}">{{item.cost}}</li>
          </ul>
        </div>
        <!-- 隐藏div整体盒子 -->
        <div class="hidenContent" v-show="item.isShow">
          <!-- 01电费电量个人阶梯 -->
          <div class="hidenBox01" v-if="item.type =='o-1'">
            <table class="table01">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>单价</th>
                  <th>电量(度)</th>
                  <th>电费(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,i) in item.details" :key="i">
                  <td>
                    <span class="green"></span>{{value.type}}
                  </td>
                  <td>{{value.price}}</td>
                  <td>{{value.quantity}}
                  </td>
                  <td>{{value.cost}}</td>
                </tr>
                <tr>
                  <td>
                    <span class="yellow"></span>二档用电
                  </td>
                  <td>加价0.05</td>
                  <td>80</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>
                    <span class="orange"></span>三档用电
                  </td>
                  <td>加价0.05</td>
                  <td>10</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
            <div class="check">
              查看电费账单
              <img src="../../../assets/images/electPower/group.png" alt />
            </div>
          </div>
          <!-- 02电量电费－个人单一电价 -->
          <div class="hidenBox02" v-if="item.type =='o-2'">
            <table class="table02">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>单价</th>
                  <th>电量(度)</th>
                  <th>电费(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,i) in item.details" :key="i">
                  <td>{{value.type}}</td>
                  <td>{{value.price}}</td>
                  <td>{{value.quantity}}</td>
                  <td>{{value.cost}}</td>
                </tr>
              </tbody>
            </table>
            <div class="check">
              查看电费账单
              <img src="../../../assets/images/electPower/group.png" alt />
            </div>
          </div>
          <!-- 03电量电费－个人阶梯+峰谷 -->
          <div class="hidenBox03" v-if="item.type =='o-3'">
            <table class="table03">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>单价</th>
                  <th>电量(度)</th>
                  <th>电费(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,i) in item.details" :key="i">
                  <td>峰用电</td>
                  <td>{{value.price}}</td>
                  <td>{{value.quantity}}</td>
                  <td>{{value.cost}}</td>
                </tr>
                <tr>
                  <td>谷用电</td>
                  <td>0.588</td>
                  <td>100</td>
                  <td>53</td>
                </tr>
                <tr>
                  <td>
                    <span class="yellow"></span>二档用电
                  </td>
                  <td>0.588</td>
                  <td>100</td>
                  <td>53</td>
                </tr>
                <tr>
                  <td>
                    <span class="orange"></span>三档用电
                  </td>
                  <td>0.588</td>
                  <td>100</td>
                  <td>53</td>
                </tr>
              </tbody>
            </table>
            <div class="check">
              查看电费账单
              <img src="../../../assets/images/electPower/group.png" alt />
            </div>
          </div>
          <!-- 04电量电费－个人峰谷 -->
          <div class="hidenBox04" v-if="item.type =='o-4'">
            <table class="table04">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>单价</th>
                  <th>电量(度)</th>
                  <th>电费(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,i) in item.details" :key="i">
                  <td>
                    <span class="yellow"></span>峰用电
                  </td>
                  <td>{{value.price}}</td>
                  <td>{{value.quantity}}</td>
                  <td>{{value.cost}}</td>
                </tr>
                <tr>
                  <td>
                    <span class="green"></span>谷用电
                  </td>
                  <td>0.588</td>
                  <td>100</td>
                  <td>53</td>
                </tr>
              </tbody>
            </table>
            <div class="check">
              查看电费账单
              <img src="../../../assets/images/electPower/group.png" alt />
            </div>
          </div>
          <!-- 04企业!!!-北京公司-月度详情 峰 平 谷 用电构成比 账单-->
          <div class="hidenBox05" v-if="item.type =='q-1'">
            <table class="table05">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>单价</th>
                  <th>电量(万千瓦时)</th>
                  <th>电费(万元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,i) in item.details" :key="i">
                  <td>
                    <span class="yellow"></span>峰用电
                  </td>
                  <td>{{value.price}}</td>
                  <td>{{value.quantity}}</td>
                  <td>{{value.cost}}</td>
                </tr>
                <tr>
                  <td>
                    <span class="blue"></span>平用电
                  </td>
                  <td>0.588</td>
                  <td>100</td>
                  <td>53</td>
                </tr>
                <tr>
                  <td>
                    <span class="green"></span>谷用电
                  </td>
                  <td>0.588</td>
                  <td>100</td>
                  <td>53</td>
                </tr>
              </tbody>
            </table>
            <div class="ratio">
              <div class="compose" @click="compose()">
                用电构成比
                <img src="../../../assets/images/electPower/compose_img.png" alt />
              </div>
              <div class="ratio_check">
                查看电费账单
                <img src="../../../assets/images/electPower/group.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XTable } from "vux";
import { Icon } from "vux";
export default {
  data() {
    return {
      list: [
        {
          id:"12",
          month: "12月",
          quantity: "60",
          cost: "60.8",
          type: "o-1",
          isShow: false,
          max:false,
          details: [
            {
              type: "一档用电",
              price: "0.588",
              quantity: "100",
              cost: "60.8"
            }
          ]
        },
        {
          id:"11",
          month: "11月",
          quantity: "50",
          cost: "115.6",
          type: "o-2",
          isShow: false,
          max:false,
          details: [
            {
              type: "二档用电",
              price: "0.588",
              quantity: "100",
              cost: "58.8"
            }
          ]
        },{
          id:"10",
          month: "10月",
          quantity: "50",
          cost: "100",
          type: "o-4",
          isShow: false,
          max:false,
          details: [
            {
              type: "三档用电",
              price: "0.588",
              quantity: "100",
              cost: "58.8"
            }
          ]
        },
        {
          id:"9",
          month: "9月",
          quantity: "50",
          cost: "100",
          type: "q-1",
          isShow: false,
          max:false,
          details: [
            {
              type: "三档用电",
              price: "0.588",
              quantity: "100",
              cost: "58.8"
            }
          ]
        }],
      type: 2
    };
  },
  components: {
    XTable,
    Icon
  },
  methods: {
    itemShow(item) {
      if (!item.isShow) {
        item.isShow = true;
      } else {
        item.isShow = false;
      
     }
    },
    maxNumber(){
      // 根据接口“查询电量电费”返回的信息获取最大月份并标记，最大月份数值以突出颜色标识
      // const max =this.list.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current).quantity
    // 
     this.list.map((item)=>{
      const max=this.list.reduce((p,v) => p.quantity < v.quantity ? v : p).quantity
       if(item.quantity==max){
         console.log(item.id)
         item.max=true
       }
     })
    },
    compose(){
      this.$router.push(
        {path:"electricityConstitute"}
        )
    }
  },
  created() {
    this.maxNumber()
  }
};
</script>
<style scoped>
.T-body-border {
  border-top: 0.013333rem solid #eff1f0;
}
.T-head {
  font-size: 0.32rem;
  padding: 0.186667rem 0.266667rem;
  display: flex;
  justify-content: space-between;
  background-color: #eff1f0;
  color: #a3a3a3;
}
.T-body {
  font-size: 0.293333rem;
  padding: 0.4rem 0.266667rem;
  display: flex;
  justify-content: space-between;
}
/* ul li{
display: block;
} */
.listStyle {
  font-size: 0.293333rem;
}
.hidenContent {
  width: 100%;
  overflow: hidden;
}
.table01,
.table02,
.table03,
.table04,
.table05 {
  width: 100%;
  text-align: center;
}
thead {
  color: #a3a3a3;
  font-size: 0.293333rem;
}
.table01,
.table02,
.table03,
.table04,
.table05 tbody tr {
  color: #333333;
  height: 0.55rem;
  line-height: 0.55rem;
}
.hidenBox01,
.hidenBox02,
.hidenBox03,
.hidenBox04,
.hidenBox05 {
  font-size: 0.293333rem;
  border-top: 1px dashed #ccc;
  width: 80%;
  float: right;
  padding: 0.333333rem 0.266667rem;
  line-height: 100%;
}
.hidenThead {
  font-size: 0.266667rem;
  color: #9a9a9a;
  display: flex;
  justify-content: space-between;
}
.green,
.yellow,
.orange,
.blue {
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  margin-right: 0.146667rem;
}
.green {
  background-color: #96dc86;
}
.yellow {
  background-color: #f4e192;
}
.orange {
  background-color: #f6ba88;
}
.blue {
  background-color: #56a4ff;
}
.check {
  margin-top: 0.4rem;
  float: right;
  color: #0c82f0;
  font-size: 0.293333rem;
  text-align: center;
  height: 0.386667rem;
}
.check img {
  vertical-align: middle;
  width: 0.333333rem;
  height: 0.386667rem;
}
.ratio {
  margin-left: 0.2rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
  color: #0c82f0;
  font-size: 0.293333rem;
}
.ratio .ratio_check img{
  vertical-align: middle;
   width: 0.333333rem;
  height: 0.386667rem;
}
.compose img{
  vertical-align: middle;
  width: 0.36rem;
  height: 0.36rem;
}
.icon-active{
  color: #0c82f0;
}
</style>