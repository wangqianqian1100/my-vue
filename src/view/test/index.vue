
<template>
	<div class="main-page">
        <div class="prompthead">
            重要提示：您可出示下方二维码给测量体温工作人员，便于统计您目前身体状态，感谢配合！
        </div>
        <div class="lists">
            <div class="list" v-for="(item ,index) in codedata" :key="index">
                <div class="basicinformation" >
                    {{item.name}} <span class="gender">{{item.gender}}</span> {{item.idnumber}}
                </div>
                <div class="qrcod" :ref="'qrCode'+index">
                    <!-- <img :src="item.img" alt="" srcset=""> -->
                </div>
            </div>
        </div>
	</div>
</template>
<script>
    import QRCode from 'qrcodejs2'
    export default {
        components: {
        
        },
        mounted () {
           this.geturldata() 
        },
        props: {},
        data() {
        return {
            codedata:[
                {
                    name:'张三',
                    gender:'男',
                    idnumber:'123456789876543210',
                    img:'http://t200fdfsstorage.systoon.com/group1/M00/03/E3/rBwroF474K2AZAH_AAALHVlc4Wg769.png'
                },
                {
                    name:'李芳',
                    gender:'女',
                    idnumber:'012345678987654321',
                    img:'http://t200fdfsstorage.systoon.com/group1/M00/03/E2/rBwrql474oeAQdisAAANSzEiiy4957.png'
                },
            ]
        }
        },
        methods: {
            geturldata(){
				let url = window.location.href;
				let theRequest = new Object();
				if (url.indexOf("?") != -1) {
					let str = url.split('?');
					let strs = str[1].split("&");
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				// console.log(theRequest,'urldata')
				if(theRequest&&theRequest.tab){
                    this.getdata(theRequest.id)
				}else{
                    this.getdata()
                }
			},
            getdata(id) {
                // this.qrcode(this.codedata[0].img)
                var that = this
                this.$nextTick(function(){
                    that.codedata.forEach(function(item,index){
                        var qrcode = new QRCode(that.$refs['qrCode'+index][0], {
                            text: item.img,
                        })
                    })
                })
            },
        }
    }
</script>

<style lang="less"  scoped>
    .main-page { 
        width: 100%;
        height: 100%;
        background: #F2F2F2;
        .prompthead{
            padding: 10px 20px;
            color: red;
            font-size: 14px;
            background: #F6F1F4;
        }
        .lists{
            width: 100%;
            .list{
                width: 100%;
                background: #fff;
                margin-bottom: 20px;
                padding: 10px 0;
                .basicinformation{
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    .gender{
                        padding: 0 30px
                    }
                }
                .qrcod{
                    width: 33.3%;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
<style>
    .qrcod img{
        width: 100%;
    }
</style>