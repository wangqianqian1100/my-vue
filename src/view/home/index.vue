<template>
	<div class="home">
    	<headline :title="title"/>
		<div class="main">
			<div class="headline">
				<img src="../../assets/home/log.png" alt="" srcset="">
			</div>
			<div class="business" v-for="(item, index) in business" :key="index" >
				<div class="nape">{{item.nape}}</div>
				<div class="lists">
					<div class="list" v-for="(lists, indexs) in item.lists" :key="indexs" @click="skip(lists.typeId)">
						<router-link class="routerlink" :to="{ path: lists.route, query: { knoweleTypeId: lists.typeId }}" >
							<div class="icon">
								<img :src="lists.icon" alt="" srcset="">
							</div>
							<div class="name">{{lists.name}}</div>
						</router-link>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as api from './api'   //接口api
import * as utils from '../../utils'   //公共方法

import { XHeader } from 'vux'
import { Button } from 'mint-ui';
export default {
	created() {
		// console.log(this.$store.state.aaa,'公共数据')
		// this.$store.state.aaa = '22222222'
		// console.log(this.$store.state.aaa,'公共数据')
		// console.log(this.$store.state.home.bbb,'模块化自己页面的数据')
		// this.$store.state.home.bbb = '3333333333'
		// console.log(this.$store.state.home.bbb,'模块化自己页面的数据')
    },
    mounted () {
		this.masterdata()
		this.getdata()
	},
	components: {
		XHeader,Button
	},
    computed: {      
        keyfeature() {
            // return keyfeature
        }
	},
	watch:{
      
    },
  	data () {
		return {
			title:'国家电网',
			msg: this.$moment("12-25-1995", "MM-DD-YYYY").format('MM月DD日'),
			business:[
				{
					nape:'交费',
					lists:[
						{
							icon:require('../../assets/home/jiaodianfei.png'),
							name:'交电费',
							route:'',
							typeId:'0101',//知识类型
						}
					]
				},
				{
					nape:'查信息',
					lists:[
						{
							icon:require('../../assets/home/dianliangdianfei.png'),
							name:'电量电费',
							route:'electricityPower',
							typeId:'0204',//知识类型
						},
						{
							icon:require('../../assets/home/jiaofeijilu.png'),
							name:'交费记录',
							route:'paymentRecords',
							typeId:'0201',//知识类型
						},
						{
							icon:require('../../assets/home/fuwuwangdian.png'),
							name:'服务网点',
							route:'',
							typeId:'0202',//知识类型
						},
						{
							icon:require('../../assets/home/dianbiaojianding.png'),
							name:'电表检定结果',
							route:'',
							typeId:'0205',//知识类型
						},
					]
				},
				{
					nape:'办业务',
					lists:[
						{
							icon:require('../../assets/home/juminxinzhuang.png'),
							name:'居民用电新装',
							route:'',
							typeId:'0301',//知识类型
						},
						{
							icon:require('../../assets/home/qiyexinzhuang.png'),
							name:'企事业用电新装',
							route:'',
							typeId:'0302',//知识类型
						},
						{
							icon:require('../../assets/home/gengming.png'),
							name:'更名/过户',
							route:'',
							typeId:'0305',//知识类型
						},
						{
							icon:require('../../assets/home/dianbiao.png'),
							name:'电表校验',
							route:'',
							typeId:'0306',//知识类型
						},
					]
				},
				{
					nape:'涨知识',
					lists:[
						{
							icon:require('../../assets/home/zifeibiaozhun.png'),
							name:'资费标准',
							route:'risingKnowledge',
							// typeId:'0401',//知识类型
							typeId:'65',//知识类型
						},
						{
							icon:require('../../assets/home/banlizhinan.png'),
							name:'业务办理指南',
							route:'risingKnowledge',
							// typeId:'0402',//知识类型
							typeId:'66',//知识类型
						},
						{
							icon:require('../../assets/home/fuwuchengnuo.png'),
							name:'服务承诺',
							route:'risingKnowledge',
							// typeId:'0403',//知识类型
							typeId:'2',//知识类型
						},
						{
							icon:require('../../assets/home/dianlifagui.png'),
							name:'电力法律法规',
							route:'risingKnowledge',
							// typeId:'0404',//知识类型
							typeId:'1',//知识类型
						},
					]
				},
			]
		}
	},
	methods: {
        // 禁止页面滚动
        disableScrollBars(){
            $('.illumePage').css("position","fixed")
        },
        //开启页面滚动
        enableScrollBars(){
            $('.illumePage').css("position","static")
		},
		skip(id){
			this.$store.state.home.knoweleTypeId = id
		},
		async masterdata() { 
			let formData = {
				"iDisplayStart":1,
                "iDisplayLength":10,
			}
			// formData = JSON.stringify(formData)  ${utils.server}
			// console.log(api.home,'接口名字')
			// console.log(utils.server)
            const res = await utils.HTTP(`${api.home}`, formData);
			// if(res.code == 200) {}
			console.log(res,'111111111')
		},
		getdata(){
			this.$axios({
				method: 'post',
				url: `${api.home}`,
				data: {
					"iDisplayStart":1,
					"iDisplayLength":10,
				}
			})
			.then(function (response) {
				console.log(response,'qqqqqqqqq');
			})
			.catch(function (error) {
				console.log(error);
			})
		}
    }
}
</script>

<style scoped lang="less">
	.home{
		width: 100%;
		height: 100%;
		position: relative;
		background: #f2f1f7;
		.main{
			margin-top: 44px;
			.headline{
				width: 100%;
				img{
					width: 100%;
				}
			}	
			.business{
				width: 100%;
				.nape{
					width: 100%;
					height: 0.8rem;
					line-height: 0.8rem;
					font-size: 0.35rem;
					text-indent: 15px;
					color: #a4a3a9;
					
				}
				.lists{
					width: 100%;
					overflow: hidden;
					padding: 16px 0 14px;
					background: #fff;
					
					.list{
						width: 25%;
						display: inline-block;
						float: left;
						.routerlink{
							width: 100%;
							display: inline-block;
						}
						.icon{
							width: 40%;
							height: 1rem;
							margin: 0 auto;
							img{
								width: 100%;
								height: 100%;
							}
						}
						.name{
							width: 100%;
							font-size: 0.3rem;
							text-align: center;
							color: #000;
							margin-top: 5px;
						}
					}
					
				}
			}
		}
	
	}
	
</style>
