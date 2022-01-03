<template>
    <van-row type="flex" justify="center" class="centerRow">
        <van-col :span="24">
            <van-icon name="checked" size="64px" color="green" />
            <p>你的訂單{{orderNo}}已支付成功！</p>
            <p class="description">本次支付已成功，詳情資訊請進入我的訂單查看</p>
        </van-col>
        <van-col span="20"><van-button class="btn" @click="reload">繼續落單</van-button></van-col>
        <van-col span="20"><router-link to="/history" class="btn">我的訂單</router-link></van-col>
    </van-row>
</template>
<script>
export default {
    name:"Success",
    setup() {
        
    },
    props:{
        orderNo:String,
    },
    methods:{
        reload(){
            window.location.reload()
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
</style>