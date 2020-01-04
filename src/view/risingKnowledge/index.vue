<template>
    <div class="page">
        <div class="header" ><headline :title="title"/></div>
        
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">  
            <mt-loadmore :top-method="loadTop" 
                        @top-status-change="handleTopChange"
                        :bottom-method="loadBottom" 
                        :topDistance=70
                        @bottom-status-change="handleBottomChange" 
                        :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <ul>
                    <li class="title"  v-for="(item,index) in pageList" :key="index"  @click="goBack(item.knoweleId,$route.query.knoweleTypeId)" >
                        <span>{{item.knoweleTitle}}</span>
                        <img src="../../assets/arrow.png" alt="">                
                    </li>
                
                </ul>
                <div slot="top" class="mint-loadmore-top" style="text-align:center">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">下拉加载</span>
                    <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
                </div>
                <div v-if="allLoaded" style="text-align:center;" class="data-none">没有更多数据了</div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>
    </div>    
</template>
<script>
import * as api from './api'   //接口api
import * as utils from '../../utils'   //公共方法
import { Loadmore } from 'mint-ui';//下拉加载上拉刷新
export default {
    data(){
        return {
            title:"",
            InitialLoading: true,//初始加载
            wrapperHeight: 0,//容器高度
            topStatus: '',//顶部下拉加载状态
            bottomStatus: '',//底部上拉加载状态
            wrapperHeight: 0,//容器高度

            allLoaded:false,//数据是否加载完毕
            iDisplayStart:1,//起始页码
            iDisplayLength:10,//每页显示条数
            haveMore: true,//是否显示更多数据
            pageList:[],
        }
    },
    methods:{
        
        goBack(knoweleId,knoweleTypeId){
                //带参数跳转
                this.$router.push({
                    path:'risingKnowledge/knowContent',
                    query:{ 
                        knoweleId:knoweleId,
                        knoweleTypeId:this.$route.query.knoweleTypeId                      
                        }
                    })
        },
        goTitle(){//title标题
            if(this.$route.query.knoweleTypeId==65){
               
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
        handleBottomChange(status) {
            this.topStatus = status;
        },
        //下拉加载更多数据
        loadTop() {
            this.getPageList();
            this.$refs.loadmore.onTopLoaded()
            this.handleTopChange("loading");//下拉时 改变状态码
            
            if(this.iDisplayStart ==1){
                this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
                this.iDisplayLength = 10;//下拉刷新 数据初始化
                this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
                this.$refs.loadmore.onTopLoaded();   
            }
            
           
        },
        handleTopChange(status) {
                this.bottomStatus = status;
        },
        //上拉刷新更
        loadBottom() {   
           
            this.allLoaded = true;// 若数据已全部获取完毕
            this.$refs.loadmore.onBottomLoaded();
             this.handleBottomChange("loading");//上拉时 改变状态码
                this.iDisplayStart += 1;
                
                    if (this.iDisplayStart <= 3) {//最多下拉三次 
                        this.getPageList();//获取数据  
                        this.iDisplayLength += 10;//上拉加载 每次数值加
                    } else {
                        this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
                    }
                    this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
                    this.$refs.loadmore.onBottomLoaded();
               
        },
        async getPageList(){//获取接口
			let formData = {
                    "iDisplayStart":1,
                    "iDisplayLength":10,
                    "knoweleTypeId":this.$route.query.knoweleTypeId
                    }

            const res = await utils.HTTP(`${api.risingKnowledge}`,formData);
            // console.log(res)
            
             if(res.code ==1) {
               this.pageList=res.data.aaData;
               this.iDisplayStart++;//起始页码
             }
            
        },

    },
    created(){
        this.goTitle()
        this.getPageList()
    },
    mounted(){
        
        this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top; //下拉加载容器高度
        this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().bottom; //上拉加载容器高度
    },
    component:{
         Loadmore
        }
}
    
</script >
<style scoped>
    
    .page{
        width:100%;
        background:#ffffff;
        height: 100%;
       
    }
    .header{
        width: 100%;
        height: 1.3rem;
    }
    .page-loadmore-wrapper{
         overflow: scroll;
    }
    .title{
        width: 100%;
        height: 1.3rem;
        border-bottom: 1px solid #e7e9e8;
        display: flex;
        justify-content: space-between;
        padding: 0.7rem 0.6rem;
        box-sizing:border-box;
        align-items:center;
        font-family:Arial, Helvetica, sans-serif; 
    }
    .title span{
        width: 90%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 0.46rem;
    }
    .data-none{
        font-size:0.32rem;
        color:hsl(160, 1%, 42%); 
        padding-top:0.4rem ;
    }

</style>
