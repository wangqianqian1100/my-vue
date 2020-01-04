<template>
    <div class="page">
         <div class="header"><headline :title="title"/></div>
            <div class="title">
                <div v-html="pageList" class="knowContent"></div>
            </div>    
    </div>    
</template>
<script>
import * as api from './api'   //接口api
import * as utils from '../../utils'   //公共方法
export default {
    data(){
        return {
            pageList:"",
            title:'' 
        }
    },
    methods:{
        goTitle(){//title标题
            if(this.$route.query.knoweleTypeId==65 ){
                this.title="资费标准"
                document.title="资费标准" ;
               
            }else if(this.$route.query.knoweleTypeId==66){
                this.title="业务办理指南"
                document.title="业务办理指南" ;  
            }else if(this.$route.query.knoweleTypeId==2){
                this.title="服务承诺"
                document.title="服务承诺" ;   
            }else if(this.$route.query.knoweleTypeId==1){
                this.title="电力法律法规"
                document.title="电力法律法规" ;   
            }
        },
        async getGoList(){
           
            let formData = {
               "knoweleId":this.$route.query.knoweleId
            }
           const res = await utils.HTTP(`${api.knowContent}`,formData); 
           
            if( res.code==1 ){      
            let list=JSON.stringify(res.data.content).replace(/\\n/g,"<br/>");
            let str=list.substr(0,list.length-1);
            let str2 = str.substr(1,str.length-1)
            this.pageList=str2;
            }
           
        }
    },
    created(){
        this.goTitle()
        this.getGoList()
    }
}
    
</script >
<style scoped>
    .page{
        width:100%;
        background:#f3f4f9;
        height: 100%;
    }
    .header{
        width: 100%;
        height: 1.3rem;
    }
   .title{
       padding: 1.1rem 0.9rem;
       font-size: 0.5rem;
       font-family: Arial, Helvetica, sans-serif;
   }
   .knowContent{
        text-align:justify;
        text-justify:distribute-all-lines; 
        width: 100%;
       
   }
</style>
