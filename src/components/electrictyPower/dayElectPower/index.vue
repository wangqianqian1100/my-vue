<template>
  <div class="dayElectPowerWap">
    <h1>日用电量信息</h1>
     <day-echart></day-echart>
      <day-list></day-list>
  </div>
</template>
<style scoped>
</style>
<script>
import dayEchart from '../dayElectPower/dayPowerEchart'
import dayList from '../dayElectPower/list'
export default {
  data () {
    return {

    }
  },
  components: {
    dayEchart,
    dayList
  }
}
</script>
