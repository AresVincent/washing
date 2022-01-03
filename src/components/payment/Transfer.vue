<template>
<div class="FPSBox">
    <van-field
        readonly
        clickable
        required
        name="picker"
        v-model="transferType"
        label="轉賬方式"
        placeholder="點擊選擇"
        @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
            show-toolbar
            confirm-button-text	="確認"
            :columns="paymentColumns"
            @confirm="onConfirmPicker"
            @cancel="showPicker = false"
        />
    </van-popup>
    <h2>需付款：HK${{originPrice}}</h2>
    <FPS v-if="transferValue=='CS_FPS'"></FPS>
    <pay-me v-if="transferValue=='CS_PAM'"></pay-me>
    <ali-pay v-if="transferValue=='CS_ALI'"></ali-pay>
    <wechat-pay v-if="transferValue=='CS_WEC'"></wechat-pay>
</div>
<van-row type="flex" justify="space-around" class="paymentRow">
    <van-col span="10"><van-button plain class="btn" @click="back">返回上一步</van-button></van-col>
    <van-col span="10"><van-button plain class="btn"  @click="paymentSubmit">確認付款</van-button></van-col>
</van-row>
<van-overlay :show="showLoading">
        <div class="wrapper">
            <van-loading color="#FAEE00" size="56px"/>
        </div>
</van-overlay>
</template>

<script>
import axios from "axios";
import {Toast} from "vant";
import FPS from "./FPS.vue"
import WechatPay from './WechatPay.vue';
import AliPay from './AliPay.vue'
import PayMe from './PayMe.vue';
export default {
    name:"Tnansfer",
    setup() {
        
    },
    props:{
        orderNo:String,
        originPrice:String,
        forward:Function,
        back:Function
    },
    components:{
        FPS,
        WechatPay,
        AliPay,
        PayMe
    },
    data(){
        return{
            showLoading:false,
            showPicker:false,
            transferType:"轉數快",
            transferValue:"CS_FPS",
            paymentColumns:[
                {text:"轉數快",value:"CS_FPS"},
                // {text:"PayMe",value:"CS_PAM"},
                // {text:"Alipay-HongKong",value:"CS_ALI"},
                // {text:"WechatPay-HongKong",value:"CS_WEC"},
            ],
        }
    },
    methods:{
        paymentSubmit(){
             let updateDate={
                    "orderNo":this.orderNo,
                    "paymentCode":this.transferValue,
                };
                let header={"Content-Type" : "application/json; charset=utf-8"}
                this.showLoading=true;
                axios.post("/package/updateOrderPayTag", updateDate, {header}).then((res)=>{
                    if(res.data.code==200){
                            Toast(res.data.msg);
                            this.forward();
                    }
                    this.forward;
                    this.showLoading=false;
                }).catch((error)=>{
                    Toast(error.msg);
                    this.showLoading=false;
                });
        },
        onConfirmPicker(target){
            console.log(target);
            this.transferType=target.text;
            this.transferValue=target.value;
            this.showPicker=false;
        },
    },

}
</script>
<style scoped>
.FPSBox{
    padding:0 15px;
    min-height: 468px;
}
.FPSBox .van-cell{
    padding-left: 0px;
    padding-right: 0px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.btn{
    width: 100%;
    border-radius: 10px;
    color: #fff;
    background: #E49C2E;
    margin: 10px 0;
}
</style>