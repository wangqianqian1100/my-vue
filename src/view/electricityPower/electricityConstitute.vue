<template>
  <div class="electConstWap" style="margin-top: 44px;"
      >
    <headline :title="title"></headline>
    <div style="position: relative;margin-top:40px;">
      <div id="electConstEchart"
           class="electConstEchart"></div>
      <a class="changeTabIcon"
         @click="chageTab()"><img src="../../assets/images/electPower/tabIcon.png"
             alt=""></a>

    </div>

    <div class="detailWap"
         v-if="eData.length>2">
      <div>
        <span :style="{'background-color':detailJson.color}">{{detailJson.name}}</span>
        <span>{{detailJson.percent}}%</span>
        <span>{{detailJson.value}}{{detailJson.unit}}</span>
      </div>
      <div class="analyze">
        <div>
          <label>分析：</label>
          <span>谷时用电比{{this.lowPrenct}}于<em style="color:#94dc86">30%</em>
          </span>
        </div>
        <div>
          <label>建议：</label>
          <span>水电费水电费</span>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      title: '用电构成',
      optionData: {},
      electConstChart: '',
      detailJson: {
        name: '',
        percent: '',
        value: '',
        color: '',
        unit: '元'
      },
      seriesName: '电费',
      eData: [
        { value: 36, name: '谷', selected: true },
        { value: 56777, name: '平', selected: false },
        { value: 23333, name: '峰', selected: false }
      ],
      total: 0,
      checkType: false,
      lowPrenct: '',
      // color: ['#94dc86', '#67b7ff', '#f4e192', '#f5b680']
      
    }
  },
  created () {

    this.totalNumb()
    this.optionF()

  },
  mounted () {
    this.electConstChart = this.$echarts.init(document.getElementById('electConstEchart'))
    this.electConstChart.setOption(this.optionData)

  },
  methods: {
    // 计算总量
    totalNumb () {
      this.total = 0
      this.eData.map(item => {
        if (item.value == 0) {
          item['label'] = { show: false }
        }
        this.total += parseFloat(Number(item.value))
      })
    },
    // 切换电量和电费
    chageTab () {
      this.detailState = false;//切换时隐藏详情信息
      this.checkType = !this.checkType;
      if (this.checkType) {
        this.eData = [
          { value: 36666, name: '谷', selected: true },
          { value: 507, name: '平', selected: false },
          { value: 2555, name: '峰', selected: false }
        ]
      } else {
        this.eData = [
          { value: 0, name: '谷', selected: true, },
          { value: 0, name: '平', selected: false, },
          { value: 23333, name: '峰', selected: false, }
        ]
      }
      this.totalNumb()
      this.detailJson.unit = this.checkType ? '元' : '度'
      this.optionData.series[0].data = this.eData
      this.optionData.title.text = `总${this.titleName}`
      this.optionData.title.subtext = `${this.total}${this.detailJson.unit}`
      this.electConstChart.setOption(this.optionData)
    },
    optionF () {
      let giftImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAZCAYAAACl8achAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANtSURBVFhHtVZbT1RBDPZvGl8MKt6jr7z4YgxGJSbAIiJPmHgJF+OD+GaMN0g0Jmg0xkRZRcNFo8FEFNm29mtndkfAnWFZOnzbns6c9js9nTnskrYLJ1rByXU0tyltJc1KEBwb2nmmdjuk/ZUG4aiZDF5kZw7y25X2VxrDyMEyvmaDLZR7gq9F2YH2YCFChVVXZ4R/LjtxquFxnHgk3CLv9raHswsE1bw/InzztNDKsmiTmJ8ovAE8YIuss6TtNeIPSUqAKtfW3J6eEOrZLTR6Rvj7ghPXOZ20eees9hbJNyVtgaH9ogCoslKIpJ+MCvXvEx7oFB7pEpp/Z7Hq8wYEh7OcenmlYZcC1YaeGhfu6xAePunEVVP1ZVijrWKMA3m1/O68ZCttBKAXq8IT54RvnQ+4kOgU6ptQ3O4RutolPHhYaOio8NBxoUuHhC+r/Wba6MUNa5SjLpB8e8RN9fG1cG+Hv+4+hWrq1yriOkH0kVaYBg4qySNCgw4jPKjEK/uFn016m0TiRrpMCtojBP29otV+L7ykFUfVF2cbNnRiU5wHFvQeQ7DNp739+a3w2h+vruWwbJYzJ3nSGKEKEZCy8P+uS2PUYbFjDnjy0rw9gEgYr3L1l1UE1fd+bAG2AaE1hvk8HvIUcs6T1sgWkNdWhR/rEXb9lG/I8bOK7qC3BoIe6xZCyyB26OtS1mWVDsRl5YfwZEX44h4RbLJKp0jlgNp6nKltxxq0+hyb2UH362ac082NUfNPvCbxxBlp3tMIAtKIhWrABTy64aeFHmM8fEJPDCVwTz/Z3+aFlj4If/0k/GXOdQrzzQmpBnhVN7cF9Dax4AWS34gayKqtut7H8D+9Y1WjK8f8AfSTHXNuljv67FMegI+LvcGoN71zozRvDwTDUG0JMLCBsJkw/+qBkJ7D3LtXaGpM1+kD1fQYiw+XwN5UAsQwO8THUMMTZyRL2mN54NQm60O9np0Rwsfi4TW/tv8rQNQi4MfEaJnTdQSWRF0q+fao/yB4gNmaNBKvvhB+ftd9qCAqCzveCAkm7k8lrnG9bvI/kq80NEYggREJ2alir1hdeIB4PBr8zlQ8XrrG56MulWylTWJMS+RJAOvz2KfmDx+MSKx+Y3uljHSQBvdAah2wwoYthLUzskXSDSIbCQWyhgbx9ovIX5ZSFdTs4gzYAAAAAElFTkSuQmCC"
      let $this = this
      this.optionData = {
        title: {
          text: `总${$this.titleName}`,
          subtext: `${$this.total}${$this.detailJson.unit}`,
          left: '48%',
          top: '35%',
          textAlign: "center",
          textStyle: {
            fontSize: '14',
            fontWeight: 'normal',
            color: "#a6a6a6"
          },
          subtextStyle: {
            fontSize: '20',
            lineHeight: 40,
            fontWeight: 'bold',
            color: '#343434'
          },
        },
        label: {
          formatter: function (res) {
            for (let i in $this.detailJson) {
              if (res[i]) {
                $this.detailJson[i] = res[i]
              }

            }
            if (res.name == '谷') {
              $this.lowPrenct = res.percent > 30 ? '大' : '小'
            }

          }
        },
        color: ['#94dc86', '#67b7ff', '#f4e192', '#f5b680'],
        tooltip: {
          trigger: 'item',
          formatter: function (res) {
            for (let i in $this.detailJson) {
              if (res[i]) {
                $this.detailJson[i] = res[i]
              }

            }

          }
        },
        series: [
          {
            name: $this.seriesName,
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '50%'],
            // silent: true,//去除点击高亮效果
            selectedOffset: 0,//选中扇区的偏移距离
            hoverAnimation: false,
            avoidLabelOverlap: true, //防止扇区标签重叠
            label: {
              fontSize: 16,
              position: 'inside',
              // show: false

            },
            labelLine: {
              show: false,
            },
            data: $this.eData
          }
        ]
      };

    }

  },
  computed: {
    titleName () {
      return this.checkType ? '电费' : '电量'
    },

  }
}
</script>
<style scoped lang="less">
.electConstWap {
  .changeTabIcon {
    width: 50px;
    height: 50px;
    display: inline-block;
    z-index: 99999;
    position: absolute;
    top: 59%;
    left: 42%;
  }
}

.electConstEchart {
  width: 100%;
  height: 8rem;
}
.detailWap {
  font-size: 16px;
  padding: 0 2.5%;
  > div:first-child {
    border-bottom: 1px solid #f3f4f3;
    border-top: 1px solid #f3f4f3;
    padding: 10px 0;
    line-height: 30px;
    > span:first-child {
      background-color: rgb(148, 220, 134);
      width: 30px;
      height: 30px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      border-radius: 100%;
      color: #fff;
      font-size: 14px;
    }
    > span:last-child {
      float: right;
      font-weight: bold;
      color: #080808;
    }
  }
  .analyze {
    > div:first-child {
      padding: 10px 0;
    }
    color: #808080;
    label {
      color: #d0d0d0;
    }
  }
}

</style>