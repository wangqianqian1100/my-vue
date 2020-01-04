<template>
  <div class="mothEchartWap">
    <!-- 个人不执行阶梯不执行峰谷 -->
    <div class="ownBox1"
         id="ownBox1"></div>
  </div>
</template>
<script>

export default {
  props:['showSeriseData'],
  data () {
    return {
      ownChart: '',
      ownOption: '',
      typeEcart: 'Q-3',// type==O-1 个人不执行阶梯不执行峰谷 O-2个人不执行阶梯执行峰谷;
      bgData: [
        {
          type: 'bar',
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: '#edebec',
              barBorderRadius: 50,
            }
          },
          barWidth: '60%',
          data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
        }
      ],
   
      legendData: [],
      showX: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            show: false,

          },
          nameTextSty: {
            fontSize: 13,
          },
          axisLabel: {
            interval: 0//x轴文字全部显示
          },
          axisLine: {
            show: false,
          }
        }
      ],
      hideX:
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      hideXArr:[],
      seriesColor:[]

    }
  },
  components: {

  },
  created () {

  },
  mounted () {
    this.ownOptionF()
    this.ownChart = this.$echarts.init(document.getElementById('ownBox1'))
    this.showEcartF()
  },

  methods: {
    ownOptionF () {
      let $this = this
      this.OwnOption = {
        grid: {
          show: false,
          left: 0,
          right: 0,
          top: '20%',
        },
        legend: {
          icon: 'circle',
          right: '2%',
          top: '5%',
          data: $this.legendDataF
        },
        selectedMode: false,
        xAxis: [],
        yAxis: [

          {
            show: false,
            type: 'value'
          }
        ],
        series: []
      }
    },
    showEcartF () {
      // this.typeEcart = 'Q-2'
      switch (this.typeEcart) {
        case 'O-1':
          this.ownEchart1()
          break;
        case 'O-2':
          this.ownEchart2()
          break;
        case 'O-3':
          this.ownEchart3()
          break;
        case 'Q-1':
          this.ownEchart4()
          break;
        case 'Q-2':
          this.ownEchart5()
          break;
        case 'Q-3':
          this.ownEchart6()
          break;
        default:
          break;
      }
      this.showSeriseData.map((item, index) => {
        item.name = this.legendData[index]
        item.itemStyle.color = this.seriesColor[index]
        this.hideXArr.push(this.hideX)
      })
      this.OwnOption.xAxis = [...this.showX, ...this.hideXArr]
      this.OwnOption.series = [...this.bgData, ...this.showSeriseData]
      this.ownChart.setOption(this.OwnOption)
    },
    // 个人不执行阶梯不执行峰谷
    ownEchart1 () {
      this.seriesColor=['#94dc86']
      this.showSeriseData.length=1
    },
    // 个人不执行阶梯执行峰谷
    ownEchart2 () {
      this.seriesColor = ['#f4e192', '#94dc86']
      this.hideXArr = [];
      this.showSeriseData.splice(this.legendData.length)
    },
    // 个人执行阶梯
    ownEchart3 () {
      this.seriesColor= ['#94dc86', '#f4e192', '#f6ba88']
      this.hideXArr= [];
      this.showSeriseData.splice(this.legendData.length)
    },
    // 企业用户-----北京地区
    ownEchart4 () {
      this.seriesColor= ['#94dc86', '#67b7ff', '#f4e192', '#f5b680']
      this.hideXArr = [];
      // 部分客户分为谷 平 峰 尖 时
      let type = 4
      if (type == 1) {
        this.showSeriseData.splice(3)
        this.legendData.splice(3)
        this.seriesColor.splice(3)
        this.showSeriseData[this.legendData.length - 1]['itemStyle']['barBorderRadius'] = [50, 50, 0, 0]
      }
      
    },
    // 企业用户-----浙江、上海、江苏、山东、湖南公司
    ownEchart5 () {
      this.hideXArr= [];
      this.seriesColor=['#94dc86','#67b7ff','#f4e192','#f5b680']
      // 分时 谷 平 峰 尖 情况
      let type = 1
      if (type == 1) {
        this.showSeriseData.splice(3)
        this.legendData.splice(3)
        this.seriesColor.splice(3)
        this.showSeriseData[this.legendData.length - 1]['itemStyle']['barBorderRadius'] = [50, 50, 0, 0]
      }
    },
    // 企业用户-----商铺
    ownEchart6 () {
      this.seriesColor= ['#94dc86', '#f4e192', '#f5b680']
      this.hideXArr = [];
      this.showSeriseData.splice(this.legendData.length)
      this.showSeriseData[this.legendData.length - 1]['itemStyle']['barBorderRadius'] = [50, 50, 0, 0]
    },
  },
  computed: {
    legendDataF () {
      this.legendData = []
      switch (this.typeEcart) {
        case 'O-1':
          return this.legendData = []
          break;
        case 'O-2':
          return this.legendData = ['峰', '谷']
          break;
        case 'O-3':
          return this.legendData = ['一档', '二档', '三档']
          break;
        case 'Q-1':
          return this.legendData = ['谷', '平', '峰', '尖']
          break;
        case 'Q-2':
          return this.legendData = ['谷', '平', '峰', '尖']
          break;
        case 'Q-3':
          return this.legendData = ['谷', '峰', '尖']
          break;
        default:
          break;
      }
    }
  }
}
</script>
<style scoped>
.ownBox1 {
  width: 100%;
  height: 7.466667rem;
}
</style>