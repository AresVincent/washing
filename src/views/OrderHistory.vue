<template>
  <NavHead isShowHead="2"/>
  <div class="container">
    <van-row>
      <van-col span="8">
        <h3>訂單記錄</h3>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu class="sortingMenu" active-color="#E49C2E">
          <van-dropdown-item @change="Filter" v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu class="sortingMenu" active-color="#E49C2E">
          <van-dropdown-item @change="typeFilter" v-model="typeValue" :options="typeOption" />
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
          :Name = "item.consigneeName"
          :TotalAmount = "item.total==null ? item.cost+(item.packageRentCost*JSON.parse(item.rentTag)):item.total"
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
      typeValue:"all",
      typeOption:[
        {text:'全部',value:"all"},
        {text:'上門派送',value:"SELF_PICK"},
        {text:'上門收送',value:"PICK_PICK"},
        {text:'自提點',value:"SELF_SELF"}

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
      axios.get("/api/service/washing/runCornJob").
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
            let tmpArray=AresHistoryResponse.data.data;
            tmpArray=tmpArray.sort(function(a,b){
              return new Date(a.orderTime.replaceAll("-","/"))>new Date(b.orderTime.replaceAll("-","/"))? 1:-1;
            })
            this.list=tmpArray;
            this.reverseList = tmpArray.slice().reverse();
            this.master_list = tmpArray.slice().reverse();
            // console.log(this.list);
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
      let temp_master=this.master_list.slice();
      //  this.master_list = this.reverseList;
      temp_master.reverse();
      this.master_list=temp_master.slice();
    },
    typeFilter(){
      let tempList=[];
      let tempArray=[];
      if(this.value1==1){
          tempArray=this.list.slice().reverse()
      }else{
          tempArray=this.list.slice();
      }
      if(this.typeValue=="all"){
        tempList=tempArray.slice();
      }else{
        tempArray.forEach(item=>{
          if(item.type==this.typeValue){
            tempList.push(item);
          }
        });
      }
      console.log(this.typeValue)
      this.master_list=tempList.slice();
    }
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