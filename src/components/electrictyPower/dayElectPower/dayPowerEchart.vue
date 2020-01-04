<template>
  <div class="dayEchartWap">
    <div class="changeDay">
      <span :class="{'checkSp':changeType==1}" @click="changeDay(1)">近7天</span>
      <span :class="{'checkSp':changeType==2}" @click="changeDay(2)">近30天</span>
      </div>
      <!-- echart -->
    <div id="dayEchart"  @click="dayChartF()"></div>
    <div class="useElectInfo">
      <p>4522222</p>
      <span>日均用电量（千瓦时）</span>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  props: ['Daydate'],
  data () {
    return {
      changeType:1,
      optionData: {},
      // seriesData: [111, 555, 112, 1121, 5556, 1578, 125, 453]
      seriesData: [
        {name:'',value:111,selected:false},
        {name:'',value:555,selected:false},
        {name:'',value:554,selected:false},
        {name:'',value:546,selected:false},
        {name:'',value:23,selected:false},
        {name:'',value:787,selected:false},
        {name:'',value:898,selected:false},
        ]
    }
  },
  created () {
    this.optionF()
        
  },
  mounted () {
    this.dayChart = this.$echarts.init(document.getElementById('dayEchart'))
    this.dayChart.setOption(this.optionData)

 
  },
  methods: {
    optionF () {
      let $this = this
      this.optionData = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'red',
            },
          },
           formatter: function (res) {           
                $this.seriesData.map(item=>{
                  item.selected=false
                })
                let index=res[0].dataIndex
                $this.seriesData[index].selected=true;
              }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          axisTick: {
            show: false,
          },
          data: this.Daydate,
          axisLine:{
            lineStyle:{
              color:'#9b9b9b'
            }
          },
          axisLabel: { //调整x轴的lable  
           interval: 0,//x轴文字全部显示
            textStyle: {
               fontSize: 10,
              color:'#9b9b9b'
            }
          },
        },
        yAxis: {
          type: "value",
          name:'千瓦时',
          nameTextStyle: {
            fontSize: 10,
             color:'#9b9b9b'
          },
          axisLine:{
            lineStyle:{
              color:'#9b9b9b'
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 10,
              color:'#9b9b9b'
            }
          }
        },
        grid: {  //显示数据的图表位于当前canvas的坐标轴
          x: 50,
          borderWidth: 1,
          left: '1%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        dataZoom: [
          {
            type: "inside",
            zoomLock: "true",
            filterMode: "empty",
            start: 0,
            end: ((7 / this.Daydate.length) * 100),
          }
        ],
        series: [
          {
            data: this.seriesData,
            type: "line",
            symbol: 'circle',     //设定为实心点
            symbolSize: 7,   //设定实心点的大小
            animation: false,
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: '#393939',
                fontSize: 12,
                fontWeight: 'bold'
              }
            },
            itemStyle: {
              normal: {
                color: "#00a8ff",
                lineStyle: {
                  width: 1,
                  color: "#00a8ff"
                }
              }
            },
            tooltip: {
              show: true,
              showContent:false,
              formatter: function (res) {
                // console.log(res)
               
              }
            },

           
            areaStyle: {
              normal: {
                color: new $this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(244,249,255,1)" },
                  { offset: 0.5, color: "rgba(244,249,255,1)" },
                  { offset: 1, color: "rgba(244,249,255,1)" }
                ])
              }
            },
          }
        ]

      }
    },
    // 点击图标改变symbol标识
   dayChartF(){
     this.seriesData.map((item,i)=>{
       this.optionData.series[0].data[i]['symbol']="circle"
       if(item.selected){
         this.optionData.series[0].data[i]['symbol']="rect"
       }
     })
     
       this.dayChart.setOption(this.optionData)
   },
   changeDay(typeId){
     this.changeType=typeId
   }
  }


}
</script>
<style scoped lang="less">

#dayEchart {
  width: 100%;
  height: 8rem;
}
.changeDay{
  display: flex;
  display: -webkit-flex;
  align-items: center;
  width: 2.746667rem;
  border:1px solid #f1f2f1;
  border-radius: .266667rem;
  line-height: .64rem;
  overflow: hidden;
  span{
    text-align: center;
    flex:1;
    font-size: .32rem;
    color: #8e8e8e;
  }
  .checkSp{
    background: #329dff;
    color: #fff;
  }
  
}
.useElectInfo{
    padding:.48rem 0 .613333rem;
    p{
      font-size: .48rem;
      color: #111;
      padding-bottom: .32rem;
    }
    span{
      color: #8e8e8e;
      font-size: 12px;
    }

  }
</style>
