<template>
  <div class="tab">
    <div class="con" data-id="102">
      <div class="head">
        <p class="con_title">
          <span>狀態：{{ Status }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>訂單號：{{OrderNum}}</span>
        </p>
      </div>
      <div class="body">
        <p>
<!--          <span>下單時間：2021-06-04 09:44:53</span>-->
          <span>下單時間：{{ Time }}</span>
        </p>
        <p>
          <span>洗衣袋數量：1</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>購買洗衣袋數量：{{ RentalTag>0? 1:0}}</span>
        </p>
        <p>
          <span>總金額：HKD ${{ TotalAmount }}</span>
        </p>
<!--        <p>-->
<!--          <span>收貨人：{{ Name }}</span>-->
<!--        </p>-->
<!--        <p>-->
<!--          <span>電話號碼：+{{Phone}}</span>-->
<!--        </p>-->
        <p>
          <span>收貨地址：{{ AddressValue }}</span>
        </p>
        <p  v-if="homePickup=='true'">
          <span>自提點地址:{{storeAddress}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderIDTab",
  props: {
    Status: String,
    OrderNum: String,
    RentalTag: undefined,
    Time: String,
    Number: String,
    TotalAmount: Number,
    Name: String,
    Phone:String,
    AddressValue:String,
    homePickup:String,
    storeAddress:String
  },
}
</script>

<style scoped>
.body{
  /*padding: 0px 10px 0px 10px;*/
  border: 5px solid #1989fa;
  margin-bottom: 20px;
  background: white;
  padding-left: 5px;
}
.con_title{
  margin:0px !important;
  padding: 10px 0px 10px 10px;
}
.con_title span{
  color: white;
}
.head{
  background: #1989fa;
  padding: 0px -10px 0px -10px;
  width:100%;
}
</style>