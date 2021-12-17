<template>
    <van-row class="centerRow"  justify="center">
        <van-col :span="24">
            <van-icon name="checked" size="64px" color="green" />
            <p class="detail">你的訂單{{orderNo}}已成功提交！</p>
            <p class="description">麻煩截圖將支付憑證發送至whatsapp：+852 69300097 激活該訂單!</p>
        </van-col>
        <van-col span="20"><van-button class="btn" @click="reload">繼續落單</van-button></van-col>
        <van-col span="20"><router-link to="/history" class="btn">我的訂單</router-link></van-col>
    </van-row>
</template>
<script>
export default {
    name:"Audit",
    props:{
        orderNo:String,
    },
    setup() {
        
    },
    methods:{
        reload(){
            window.location.reload();
        }
    }
}
</script>
<style scoped>
.centerRow{
    text-align: center;
    padding: 15px;
    background-color: #fff;
}
.detail{

}
.description{

}
</style>