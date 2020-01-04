<template>
    <div class="electFootWap">
        <div>您可能还需要</div>
        <div class="footImg">
            <a href=""><img src="../../assets/images/electPower/to_payment.png" alt="交电费"></a>
            <a href=""><img src="../../assets/images/electPower/elec_invoice.png" alt="电子发票"></a>
            
        </div>
    </div>
</template>
<style scoped>

</style>
<script>

export default {
    data(){
        return{

        }
    },
    
}
</script>
<style scoped lang="less">

.electFootWap{
    // position: absolute;
    // bottom: 0;
    background: #f7f8fa;
    padding: 0 2.5%;
    padding-bottom: 0.4rem;
    
    >div:nth-child(1){
        border-bottom: 1px solid #f1f3f3;
        padding: .613333rem 0 .333333rem;
        color:#bbbbbd;
        
    }
}
.footImg{
    display: flex;
   display: -webkit-flex;
   flex-direction: row;
   margin-top: .266667rem;
   align-items: center;
   a{
       display: block;
   }
   a:first-child{
      margin-right: .2rem; 
   }
    img{
width: 100%;
        // width: 50%;
    }
}

</style>