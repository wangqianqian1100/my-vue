<template>
  <div style="width:95%;margin:0 auto">
    <div class="listContent">
      <ul class="T-head">
        <li>时间</li>
        <li>电量(千瓦时)</li>
      </ul>
      <!-- 循环 -->
      <div class="forBox" v-for="(item,index) in list" :key="index">
        <div @click="itemShow(item)" class="T-body-border">
          <ul class="T-body">
            <li>{{item.month}}</li>
            <li>
              {{item.quantity}}
              <span>
                <x-icon type="ios-arrow-down" size="30"></x-icon>
              </span>
            </li>
          </ul>
        </div>
        <!-- 隐藏div整体盒子 -->
        <div class="hidenContent" v-show="item.isShow">
          <!-- 09电量电费-企业-日用电量 -->
          <div class="hidenBox01" v-show="item.type =='d-1'">
            <tr>
              <td>
                <span class="yellow"></span>峰:
              </td>
              <td>1223</td>
            </tr>
            <div class="echarts_box" :id="'echart'+index"></div>
          </div>
          <!-- 07电量电费－企业 -->
          <div class="hidenBox02" v-if="item.type =='d-2'">
            <table class="table02">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>电量(万千瓦时)</th>
                  <th>电费(万元)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span class="green"></span>谷用电
                  </td>
                  <td>80</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>
                    <span class="orange"></span>峰用电
                  </td>
                  <td>10</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>
                    <span class="orange"></span>尖用电
                  </td>
                  <td>10</td>
                  <td>3</td>
                </tr>
                 <tr>
                  <td>
                   基本电费
                  </td>
                  <td></td>
                  <td>100.00</td>
                </tr>
                 <tr>
                  <td>
                    力调电费
                  </td>
                  <td></td>
                  <td>-163.91</td>
                </tr>
              </tbody>
            </table>
            <div class="check">
              查看电费账单
              <img src="../../../assets/images/electPower/group.png" alt />
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
          id: "12",
          month: "2019-4-30",
          quantity: "23657",
          cost: "60.8",
          type: "d-1",
          isShow: false,
          data: [
            {
              value: "14992",
              name: "谷"
            },
            {
              value: "17532",
              name: "峰"
            },
            {
              value: "30986",
              name: "尖"
            },
            {
              value: "12235",
              name: "平"
            }
          ]
        },
        {
          id: "11",
          month: "2018-4-29",
          quantity: "23657",
          feng: "73123",
          ping: "77345",
          gu: "1234",
          cost: "60.8",
          type: "d-2",
          isShow: false,
          data: [
            {
              value: "14992",
              name: "谷"
            },
            { value: "17532", name: "峰" },
            {
              value: "30986",
              name: "尖"
            }
          ]
        },
        {
          id: "10",
          month: "2018-4-28",
          quantity: "23657",
          feng: "73123",
          ping: "77345",
          gu: "1234",
          cost: "60.8",
          type: "d-1",
          isShow: false,
          data: [
            {
              value: "14992",
              name: "谷"
            },
            { value: "17532", name: "峰" },
            {
              value: "30986",
              name: "尖"
            }
          ]
        },
        {
          id: "9",
          month: "2018-4-27",
          quantity: "23657",
          feng: "73123",
          ping: "77345",
          gu: "1234",
          cost: "60.8",
          type: "d-1",
          isShow: false,
          data: [
            {
              value: "14992",
              name: "谷"
            },
            { value: "17532", name: "峰" },
            {
              value: "30986",
              name: "尖"
            }
          ]
        },
        {
          id: "8",
          month: "2018-4-26",
          quantity: "23657",
          feng: "73123",
          ping: "77345",
          gu: "1234",
          cost: "60.8",
          type: "d-1",
          isShow: false,
          data: [
            {
              value: "14992",
              name: "谷"
            },
            { value: "17532", name: "峰" },
            {
              value: "30986",
              name: "尖"
            }
          ]
        }
      ],
      color: [
        {
          name: "谷",
          color: "#EFDA75"
        },
        {
          name: "峰",
          color: "#85D773"
        },
        {
          name: "尖",
          color: "#F2AC75"
        },
        {
          name: "平",
          color: "#4A88D3"
        }
      ],
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
    echarts() {
      let colorArr = [];
      this.list.map((item, index) => {
        this.color.map(res => {
          item.data.map(res2 => {
            if (res.name == res2.name) {
              colorArr.push(res.color);
            }
          });
        });

        let myChart = this.$echarts.init(
          document.getElementById("echart" + index)
        );
        myChart.setOption({
          color: colorArr,
          legend: {
            orient: "vertical",
            icon: "circle",
            x: "left",
            top: "20%",
            textStyle: {
              // color: [],
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 15
            },
            formatter: function(name) {
              let text = "";
              item.data.map(item1 => {
                text = `${name}用电：${item1.value}`;
              });
              return text;
            }
          },
          series: [
            {
              name: "图表",
              type: "pie",
              clockwise: false, //饼图的扇区是否是顺时针排布
              label: {
                //标签的位置
                normal: {
                  show: true,
                  position: "inside", //标签的位置
                  formatter: function(obj) {
                    return obj.percent.toFixed(0) + "%";
                  },
                  textStyle: {
                    color: "#fff",
                    fontSize: 20
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontWeight: "bold"
                  }
                }
              },
              data: item.data
            },
            {
              name: "",
              type: "pie",
              clockwise: false,
              silent: false,
              label: {
                //标签的位置
                normal: {
                  show: false
                }
              },
              data: item.data
            }
          ]
        });
      });
    }
  },
  created() {},
  mounted() {
    this.echarts();
  }
};
</script>
<style scoped>
.echarts_box {
  width: 8rem;
  height: 4rem;
}
.T-head {
  font-size: 0.32rem;
  padding: 0.186667rem 1.8rem;
  display: flex;
  justify-content: space-between;
  background-color: #eff1f0;
  color: #a3a3a3;
}
.T-body {
  font-size: 0.293333rem;
  /* padding: 0.2rem 1.5rem; */
  display: flex;
  justify-content: space-between;
  position: relative;
  text-align: center;
}
.T-body li{
  height: 1rem;
  line-height: 1rem;
  padding: 0 1.5rem;
}

.T-body-border {
  border-top: 0.013333rem solid #eff1f0;
}

.listStyle {
  font-size: 0.293333rem;
}
.hidenContent {
  width: 100%;
  /* border-bottom: 1px solid #eff1f0; */
  overflow: hidden;
}
.hidenBox01 {
  font-size: 0.293333rem;
  border-top: 1px dashed #ccc;
  width: 85%;
  height: 100%;
  float: right;
  padding: 0.333333rem 0.266667rem;
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
.ratio .ratio_check img {
  vertical-align: middle;
  width: 0.333333rem;
  height: 0.386667rem;
}
.compose img {
  vertical-align: middle;
  width: 0.36rem;
  height: 0.36rem;
}
.icon-active {
  color: #0c82f0;
}
.table01,
.table02 {
  width: 100%;
  text-align: center;
}
thead {
  color: #a3a3a3;
  font-size: 0.293333rem;
}
.table01,
.table02 tbody tr {
  color: #333333;
  height: 0.55rem;
  line-height: 0.55rem;
}
.hidenBox02 {
  font-size: 0.293333rem;
  border-top: 1px dashed #ccc;
  width: 80%;
  float: right;
  padding: 0.333333rem 0.266667rem;
  line-height: 100%;
}
</style>