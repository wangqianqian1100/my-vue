<template>

  <div class="dayElectPowerWap">
    <div v-if="Daydate.length!=0">
       <day-echart :Daydate="Daydate"></day-echart>
       <day-list></day-list>
    </div>
     <!-- 暂无数据 -->
      <div v-if="Daydate.length==0"
           style="text-align: center;padding-bottom:1.333333rem">
        <img src="../../../assets/images/electPower/illustratior_no_data.png"
             alt=""
             width="70%">
             <p style="padding-top:8%;font-size:16px;font-weight:bold">暂无数据</p>
      </div>
  </div>
   
</template>
<style scoped>
</style>
<script>
import dayEchart from '../../../components/electrictyPower/dayElectPower/dayPowerEchart'
import dayList from '../../../components/electrictyPower/dayElectPower/list'
export default {
  data () {
    return {
      Daydate:['04/01','04/02','04/03','04/04','04/05','04/06','04/07','04/04','04/05','04/06','04/07']
 
    }
  },
  components: {
    dayEchart,
    dayList
  }
}
</script>
<style scoped>
.dayElectPowerWap{
  padding:0 0.2rem;
}
</style>
