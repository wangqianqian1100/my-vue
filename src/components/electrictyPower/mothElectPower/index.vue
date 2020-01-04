<template>
    <div class="MothElectPowerWap">
        <moth-echart></moth-echart>
        <moth-list></moth-list>
    </div>
</template>
<style scoped>

</style>
<script>
import mothEchart from '../mothElectPower/mothEchart'
import mothList from '../mothElectPower/list'
export default {
    data(){
        return{

        }
    },
    components:{
        mothEchart,
        mothList
    }
}
</script>