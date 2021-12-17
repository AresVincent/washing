<template>
    <h2>需付款：HK${{stripePrice}}</h2>
    <form >
    <div ref="payment" id="payment">

    </div>
    <van-row type="flex" justify="space-around" class="paymentRow">
        <van-col span="10"><van-button plain class="btn" @click="back">返回上一步</van-button></van-col>
        <van-col span="10"><van-button plain class="btn"  @click="paymentSubmit">付款</van-button></van-col>
    </van-row>
    </form>
    <van-overlay :show="showLoading">
        <div class="wrapper">
            <van-loading color="#FAEE00" size="56px"/>
        </div>
    </van-overlay>
</template>
<script>
// import axios from "axios";
import {Toast} from "vant";
import axios from 'axios';

const stripe = window.Stripe(process.env.VUE_APP_STRIPE_KEY);
var elements = stripe.elements();
var payment=undefined;
// var stripe_data={
//     item:[{id:"washing"}]
// }
// const header= {
//         "Content-Type" : "application/json; charset=utf-8",
// }
const appearance={
    theme:'stripe',
};
// const initialize =async function(secret){
//     // axios.post("url",stripe_data,header).then((res)=>{
//         this.props.loading=true;
//         elements=stripe.elements({appearance,clientSecret:secret});
//         payment=elements.create("payment");
//         payment.mount("#payment");
//         this.props.loading=false;
//     //     console.log(res);
//     // }).catch((error)=>{
//     //     console.log(error);
//     // });
// } 
export default {
    name:"StripeCard",
    setup() {
    },
    data(){
        return{
            showLoading:false
        }
    },
    props:{
        secret:String,
        orderNo:String,
        stripePrice:Number,
        back:Function,
        forward:Function
    },
    methods:{
        async paymentSubmit(e){
            e.preventDefault();
            this.showLoading=true;
            if (!stripe || !elements) {
                // Stripe.js has not yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                this.showLoading=false;
                return;
            }
            const response=await stripe.confirmPayment({
                elements,
                redirect:"if_required"
            });
            if("error" in response){
               if (response.error.type === "card_error" || response.error.type === "validation_error") {
                    Toast(response.error.message);
                    this.showLoading=false;
                    return;
                }else{
                    Toast("內部發生異常！");
                    this.showLoading=false;
                    return;
                }
            }else{
                let data= response.paymentIntent;
                let updateDate={
                    "orderNo":this.orderNo,
                    "paymentCode":"STR"+data.payment_method_types[0],
                };
                let header={"Content-Type" : "application/json; charset=utf-8"}
                switch(data.status){
                    case "succeeded":
                        axios.post("/package/updateOrderPayTag", updateDate, {header}).then((res)=>{
                            if(res.data.code==200){
                                Toast(res.data.msg);
                                this.forward();
                            }
                            this.showLoading=false;
                        }).catch((error)=>{
                            Toast(error.msg);
                            this.showLoading=false;
                        });
                    return;
                    case "processing":
                         this.showLoading=false;
                    return;
                    case "requires_payment_method":
                         this.showLoading=false;
                    return;
                    default:
                    Toast("服務器發生內部錯誤！");
                        this.showLoading=false;
                    return;
                }
            }
        },
        initialize(){
                this.showLoading=true;
                elements=stripe.elements({appearance,clientSecret:this.secret});
                payment=elements.create("payment");
                payment.mount("#payment");
                this.showLoading=false;
        },
    },
    mounted: function () {
        this.initialize();
        // this.checkStatus
  }
}
</script>
<style scoped>
h2{
    padding: 0 15px;
}
#payment{
    padding:0 15px;
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