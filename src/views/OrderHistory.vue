<template>
  <NavHead isShowHead="2"/>
  <div class="container">
    <van-row>
      <van-col span="14">
        <h3>訂單記錄</h3>
      </van-col>
      <van-col span="10">
        <van-dropdown-menu class="sortingMenu" active-color="#E49C2E">
          <van-dropdown-item @change="Filter" v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </van-col>
    </van-row>
<!--      <OrderIDTab-->
<!--          Status = 'OS_5'-->
<!--          OrderNum = 'A8123456789'-->
<!--          Time = '2021-06-10 17:41:21'-->
<!--          RentalTag = 'true'-->
<!--          TotalAmount = '88'-->
<!--          Name = 'Kenrick'-->
<!--          Phone = 85265004725-->
<!--          AddressValue = '4PX-P002'-->
<!--      />-->
      <OrderIDTab
          v-for="item in master_list" v-bind:key="item.id"
          :Status = "item.orderStatusCn"
          :OrderNum = "item.waybillNo>0?item.waybillNo:item.orderNo"
          :Time = "item.orderTime"
          :RentalTag ="item.rentTag=='true'?1:0"
          :TotalAmount = "item.cost"
          :Name = "item.consigneeName"
          :Phone ="item.consigneePhone"
          :homePickup="item.homePickupTag"
          :storeAddress="item.storeFullAddress"
          :AddressValue ="item.homePickupTag=='true' ? (item.receiptCity+item.receiptDistrict+item.receiptAddress):item.storeFullAddress"
      />
  </div>
  <div style=""></div>
  <NavBottom :propsActive="3"/>
</template>

<script>
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";
import OrderIDTab from "../components/OrderIDTab";
import axios from "axios";
import {Toast} from "vant";
import VueCookies from "vue-cookies";

export default {
  name: 'OrderHistory',
  components: {
    OrderIDTab,
    NavHead,
    NavBottom,
  },
  data()
  {
    return{
      value1: 1,
      option1: [
        { text: '從最新到最舊', value: 1 },
        { text: '從最舊到最新', value: 0 },
        // { text: '昨天的記錄', value: 2 },
      ],
      list:undefined,
      reverseList: undefined,
      master_list: undefined,
    }
  },
  beforeMount() {
    console.log(VueCookies.get("LoginStatus"));
    if(VueCookies.get("LoginStatus")==null||VueCookies.get("Phone")==null){
      window.location.href = "./";
    }else{
        // axios.get("http://121.199.54.43:8888/api/service/runCornJob").
      axios.get("/api/service/runCornJob").
      then((RefreshResponse)=>{
        if(RefreshResponse.data.code == 200){
          console.log(RefreshResponse.data.msg);
        }else{
          console.log(RefreshResponse.data.msg);
          Toast("Please refresh the page again.")
        }
      })
          .catch(error => {
            console.error("There was an error!", error.message);
          });
    }
  },
  mounted(){
        // axios.get("http://121.199.54.43:8888/package/queryOrderByPhone?phone="+VueCookies.get("Phone"))
    axios.get("/package/queryOrderByPhone?phone="+VueCookies.get("Phone"))
        .then((AresHistoryResponse)=>{
          console.log(AresHistoryResponse);
          if(AresHistoryResponse.data.code == 200){
            this.list=AresHistoryResponse.data.data;
            this.reverseList = AresHistoryResponse.data.data.slice().reverse();
            this.master_list = AresHistoryResponse.data.data.slice().reverse();
            console.warn(AresHistoryResponse.data.data);
            console.log(this.list)
            // let orderInfo = AresHistoryResponse.data.data[AresHistoryResponse.data.data.length-1];
            // console.log(orderInfo);
            Toast(AresHistoryResponse.data.msg);
            // window.location.href="./history";
          }else{
            Toast(AresHistoryResponse.data.msg);
          }
        })
        .catch(error => {
          console.error("There was an error!", error.message);
        });
  },
  methods:{
    Filter(){
      console.log(this.value1);
      if(this.value1 == 1){
       this.master_list = this.reverseList;
      }else if(this.value1 == 0){
        this.master_list = this.list;
      }else{
        console.log("")
        return ;
      }
    },
  },
}

</script>

<style scoped>
h3{
  margin:0px!important;
  padding-top: 1rem;
  padding-left:1rem ;
  margin-bottom: 1rem!important;
}

</style>