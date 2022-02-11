<template>
<div class="stepBox">
<van-steps :active="activeStep" finish-icon="checked" active-icon="location" class="steps">
  <van-step>落單</van-step>
  <van-step>付款</van-step>
  <van-step>結果</van-step>
</van-steps>
</div>
  <div class="order-form" v-if="activeStep==0">
    <van-notice-bar
      color="#F71919"
      left-icon="volume-o"
      text="King's洗衣，實冇得輸！現時130蚊即可享受足不出戶，包收包送嘅洗衣服務！"
    />
    <van-form @submit="onSubmit">
      <div class="orderContainer">
      <!--Buy/Rental Washing Bag-->
      <van-cell v-if="typeValue==0||deliveryChecked==false" center title="購買洗衣袋?" size="large">
        <template #right-icon>
          <van-switch v-model="switchChecked" @change="RentalTagChanged" size="24" inactive-color="#dcdee0" />
        </template>
      </van-cell>
      <!-- choose delivery home when finish washing -->
      <van-cell center title="洗衣上門" size="large">
        <template #right-icon>
          <van-switch v-model="deliveryChecked" @change="DeliveryTagChanged" size="24" inactive-color="#dcdee0" />
        </template>
      </van-cell>
      <!-- 上門服務 -->
      <div v-if="deliveryChecked==true">
        <van-field
            v-model="typeText"
            is-link
            required
            readonly
            label="上門服務方式"
            placeholder="請選擇"
            @click="showService = true"
            size="large"
            :rules="[{ required: true, message: '請選擇服務種類' }]"
        />
      </div>
      <!--pickuppoint-->
      <van-field
          v-if="typeValue==0||deliveryChecked==false"
          v-model="fieldValue"
          is-link
          required
          readonly
          label="自提點"
          placeholder="請選擇自提點"
          @click="show = true"
          size="large"
          :rules="[{ required: true, message: '請選擇自提點' }]"
      />
      <div  v-if="deliveryChecked==true">
        <van-field 
          v-model="districtValue"
            is-link
            required
            readonly
            label="派送地區"
            placeholder="請選擇所在地區"
            @click="showDistrict = true"
            size="large"
            :rules="[{ required: true, message: '請選擇地區' }]"
        />
        <van-field 
        v-model="addressDetail"
        label="派送地址" 
        placeholder="請填寫街道和所在大廈及樓層單位"
        required
        size="large"
        :rules="[{ required: true, message: '請輸入您的詳細地址' }]"
        />
      </div>
      <!-- service popup -->
      <van-popup v-model:show="showService" round position="bottom">
        <van-picker  title="標題" :columns="typeCol" @confirm="onServiceFinish" @cancel="showService=false"
          confirm-button-text	="確認" :default-index="typeValue" />
      </van-popup>
      <!-- district popup -->
      <van-popup v-model:show="showDistrict" round position="bottom">
        <van-area :area-list="districtOpt" @confirm="onDistrictFinish" @cancel="showDistrict=false"
          confirm-button-text	="確認"  :columns-placeholder="['請選擇', '請選擇', '請選擇']"/>
      </van-popup>
      <!-- picup point -->
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
            v-model="cascaderValue"
            title="請選擇所在地區"
            placeholder="請選擇"
            :options="options"
            @close="show = false"
            @finish="onFinish"
        />
      </van-popup>

      <div id="flux" class="form-group" @scroll="onScroll">
          <h3 style="margin-bottom:0px;">King's服務條款及細則</h3>
          <p class="content" style="font-size:16px;line-height: 3rem;margin-top:0;">
            1. 磅洗服務，包括衣物清洗、烘乾及摺疊。<br/>
            2. 每次惠顧客人需填寫正確的電話及姓名，如信息不正確
            導致後續(包括但並不限於：收不到提件碼、包裹被冒領等)
            問題，本公司恕不負責。<br/>
            3. 客人需一次性網上支付洗衣費及使用指定洗衣袋之費
            用，且不提供任何收據。<br/>
            4. 信用卡手續費以該公司收費為準，手續費不是由本公司
            收取。<br/>
            5. 一律扣帳問題本公司恕不負責，客人需自行處理。<br/>
            6. 客人務必留意電話通知，運輸公司提供兩次上門機會。
            如兩次派送失敗將退回倉庫倉租為 HKD＄10/天。<br/>
            7. 完成洗衣程序到達自提點上架後，有 2 日的免租期，客
            人需於免租期內提取包裹。<br/>
            8. 客人如免租期後提取包裹，自提點將有機會收取客人
            HKD＄10/天。<br/>
            9. 包裹到達自提點上架後，超過 2 日免租期未領取，自提
            點有權將包裹退回 4PX 分拔倉，倉租為 HKD＄10/天。<br/>
            10. 包裹如退回 4PX 分拔倉後，客人需要再次送到自提點取
            件，需支付 HKD＄20 的行政費，到達自提點後由客人現金
            支付。<br/>
            11. 洗衣機轉動清洗衣物時，總有一定的機械動作；清洗後
            衣物需經高溫烘乾，如有染色、脫色、破損、縮水，本公
            司恕未能負責。<br/>
            12. 取衣時確保洗衣袋和索帶的完整性，衣物領回後，如有
            遺失，本公司恕未能負責。<br/>
            13. 取衣時，如洗衣袋有破損，需當面提出，並聯絡 King's
            作後續處理。如因洗衣袋破損導致的內部物失破損、遺
            失，最高賠償額為 HKD200/袋。<br/>
            14. 洗衣袋在運送過程中的自然耗損本公司恕不負責。<br/>
            15. 如自提點或中轉過程中遺失包裹，最高賠償額為
            HKD200/袋。<br/>
            16. 磅洗衣物，遇上不可抗力的情況，或任何意外之損失，
            本公司恕未能負責。<br/>
            17. 客人請確保交付之衣物內沒有任何貴重物品，如有任何
            遺失，本公司恕未能負責。<br/>
            18. 如因假期或運輸問題有所延誤，則不作另行通知。<br/>
            19. 樓梯費用為$30/層，由司機收取，客人也可以與司機預
            約在地面交收，則不收取任何額外費用。<br/>
            20. King's 保留隨時更改使用條款及細則之權利，而不會作
            另行通知。如有任何爭議， King's 保留最終決定權
          </p>
      </div>
      </div>

      <van-field
          required
          name="checkbox"
          label=""
          :rules="[{ required: true, message: '請同意條款及細則'}]"
          class="alertCell"
      >

        <template #input>
<!--          <div>-->
<!--            <label><input id="accept" type="checkbox" disabled class="form-check-input" style="width: 20px; height: 20px;">我同意上述條款及細則</label>-->
<!--          </div>-->
          <van-checkbox style="padding-left:10px;" id="flux-check" v-model="checked" shape="square" size="large">我同意上述條款及細則</van-checkbox>
        </template>
      </van-field>
      <div class="amount">
        <h2 id="total" style="padding-right:20px;margin-top:0px">總金額: ${{price}}</h2>
      </div>
      <van-cell-group class="priceLabel" hidden><van-field label="總金額：" size="large" v-model="price" readonly /></van-cell-group>
      <div style="margin: 20px;">
        <van-button round block type="primary" class="submit" native-type="submit">
          提交
        </van-button>
      </div>
       <div>
  </div>
    </van-form>
  </div>
  <div class="paymentForm" ref="paymentForm" v-if="activeStep==1">
        <div style="background:#fff">
          <van-row type="flex" justify="space-between" class="paymentRow">
            <van-col span="10"><van-button :class="activePayment==0 ? 'paymentBtn active':'paymentBtn'" @click="activePayment=0">信用卡支付</van-button></van-col>
            <van-col span="10"><van-button :class="activePayment==1 ? 'paymentBtn active':'paymentBtn'" @click="activePayment=1">轉賬支付</van-button></van-col>
          </van-row>
          <stripe-card v-if="activePayment==0" :secret="clientSecret" :stripePrice="stripeAmount" :orderNo="orderNumber" :back="backToPrevious" :forward="goToNext"></stripe-card>
          <transfer v-if="activePayment==1" :originPrice="originAmount" :orderNo="orderNumber" :forward="goToNext" :back="backToPrevious" ></transfer>
        </div>
  </div>
  <div class="resultBlock" v-if="activeStep==2">
    <success v-if="activePayment==0" :orderNo="orderNumber"></success>
    <audit v-if="activePayment==1" :orderNo="orderNumber"></audit>
  </div>
    <van-overlay :show="showLoading">
        <div class="wrapper">
            <van-loading color="#FAEE00" size="56px"/>
        </div>
    </van-overlay>
</template>

<script>
// import { reactive } from 'vue';
import axios from "axios";
import {Toast} from "vant";
import VueCookies from "vue-cookies";
import StripeCard from "./payment/StripeCard.vue"
import Transfer from "./payment/Transfer.vue"
import Audit from "./result/Audit.vue"
import Success from "./result/Success.vue"

//options為自提點選項,districtOpt為十八區的選項
import {options,districtOpt,ReturnPickUp} from "../config/index"


// SUN-HF,SUN-YL,SUN-FC,SUN-TEST(HKG-P000)
export default {
  components: { StripeCard ,Transfer,Success,Audit},
  name:'Order',
  beforeMount() {
    console.log(VueCookies.get("LoginStatus"));
    if(VueCookies.get("LoginStatus")==null){
      window.location.href = "./";
    }
  },
  data(){
    return{
      switchChecked: false,
      deliveryChecked:false,
      checked:false,
      checkboxdisable:true,
      show: false,
      showDistrict:false,
      showService:false,
      showLoading:false,
      LoginStatus: VueCookies.get("LoginStatus"),
      username: VueCookies.get("Name"),
      phone: VueCookies.get("Phone"),
      fieldValue: "",
      typeValue:0,
      typeText:"上門派送",
      districtValue:"",
      AddressValue: "",
      receiptCity:"",
      receiptDistrict:"",
      addressDetail:'',
      cascaderValue: "",
      price:88,
      isLastSubmitFinished:true,
      typeCol:[{text:"上門派送",value:0},{text:"上門收派",value:1}],
      activeStep:0,
      activePayment:0,
      options,
      districtOpt,
      clientSecret:"",
      orderNumber:"",
      stripeAmount:0,
      originAmount:0,
    }
  },
  methods:{
    //是否租用洗衣袋
    RentalTagChanged(){
      let amounttext = document.getElementById("total");
      this.price=88;
      if(this.switchChecked==true){
        console.log(this.switchChecked);
        this.price+=this.rentAmount;
        console.log(this.price);
      }
      if(this.typeValue==1){
        this.switchChecked=false;
        this.price+=this.homeTakeFee
      }
      //if choose home delivery
      this.price+=this.homePickupFee*this.deliveryChecked;
      amounttext.innerHTML="總金額: $"+this.price;
    },
    // 是否選擇洗衣上門
    DeliveryTagChanged(){
      let amounttext = document.getElementById("total");
      this.price=88;
      if(this.deliveryChecked==true){
        console.log(this.deliveryChecked);
        this.price+=this.homePickupFee;
        console.log(this.price);
      }else{
        this.typeValue=0;
        this.typeText="上門派送";
      }
      if(this.typeValue==1){
        this.switchChecked=false;
        this.price+=this.homeTakeFee;
      }
      //if choose bag
      this.price+=this.rentAmount*this.switchChecked;
      amounttext.innerHTML="總金額: $"+this.price;
      this.districtValue="";
      this.receiptCity="";
      this.receiptDistrict="";
      this.addressDetail="";
      console.log(this.typeValue)
    },
        // 選擇派送地址
    onDistrictFinish(target){
      this.showDistrict=false;
      console.log(target);
      let strText="";
      for(let i=1;i<target.length;i++){
        if(target[i].name==""){
          Toast("地址格式錯誤，請重新選擇!");
          return;
        }
        strText+=target[i].name;
      }
      this.districtValue=strText;
      this.receiptCity=target[1].name;
      this.receiptDistrict=target[2].name;
      console.log(this.receiptCity);
      console.log(this.receiptDistrict);
    },
    // 選擇服務類型
    onServiceFinish(target){
      let amounttext = document.getElementById("total");
      this.price=88;
      this.showService=false;
      this.typeText=target.text;
      this.typeValue=target.value;
      if(this.typeValue==1){
        this.switchChecked=false;
        this.price+=this.homeTakeFee;
        this.fieldValue="";
        this.AddressValue="";
      }
      //if choose home delivery
      this.price+=this.rentAmount*this.switchChecked;
      this.price+=this.homePickupFee*this.deliveryChecked;
      amounttext.innerHTML="總金額: $"+this.price;
    },
    // 校驗客戶是否劃至底部
    onScroll (e) {
      if (Math.ceil(e.target.scrollTop) +Math.ceil(e.target.clientHeight) >= e.target.scrollHeight) {
        console.log("We are at bottom");
        this.checked = true;
        document.getElementById('accept').removeAttribute('disabled');
      }
    },
  // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      // 没有 children 时触发
      this.show = false;
      let AddressValueArray;
      AddressValueArray = selectedOptions.map((option) => option.value);
      let AddressArray;
      AddressArray = selectedOptions.map((option) => option.text);
      this.fieldValue = AddressArray[2];
      this.AddressValue = AddressValueArray[2];
      // this.fieldValue = selectedOptions.map((option) => option.text).join("/");
      console.log("pickupPoint:"+this.AddressValue);
    },
    // 提交訂單
    onSubmit(){
      console.log(this.switchChecked);
      let testPickUp="HKG-P000";
      if(process.env.NODE_ENV!="production"){
        if(this.typeValue==1){
          this.AddressValue="SUN-TEST";
        }else{
          this.AddressValue=testPickUp;
        }
      }else{
        if(this.typeValue==1){
          // check delivery to which store
         this.AddressValue=ReturnPickUp(this.receiptDistrict);
        }
      }
      let ares_data = {
        type:'',
        packageNumber:"1",
        consignorName:this.username,
        consignorPhone:this.phone,
        consigneeName:this.username,
        consigneePhone:this.phone,
        homePickupTag:this.deliveryChecked,
        rentTag:this.switchChecked,
        cost:this.price,
        packageRentCost:this.switchChecked*this.rentAmount,
        // pickUpPoint:this.AddressValue,
        pickUpPoint:this.AddressValue,
        receiptCity:this.receiptCity,
        receiptDistrict:this.receiptDistrict,
        receiptAddress:this.addressDetail,
      }
      if(!this.deliveryChecked){
        ares_data.type="SELF_SELF";
      }else{
        if(this.typeValue==0){
          ares_data.type="SELF_PICK";
        }else{
          ares_data.type="PICK_PICK"
        }
      }
      const aresheaders = {
        "Content-Type" : "application/json; charset=utf-8",
      }
      
      // axios.post("http://121.199.54.43:8888/package/createOrder", ares_data, {aresheaders})
      if(!this.isLastSubmitFinished){
        Toast("請勿多次提交訂單!");
        return;
      }
      //新年假期不提供洗衣服務
      if(new Date().getTime()>=new Date("2022/2/1").getTime()&&new Date().getTime()<=new Date("2022/2/3").getTime()){
            Toast("因農曆新年假期關係，2022年1月30日至2022年2月3日的收件服務將會暫停，如因此帶來任何不便，深感抱歉！")
            return;
          }
      this.isLastSubmitFinished=false;
      axios.post("/package/createOrder", ares_data, {aresheaders})
          .then((AresResponse)=>{
            console.log(AresResponse);
            if(AresResponse.data.code == 200){
              // Toast(AresResponse.data.msg);
              this.activeStep=1;
              this.clientSecret=AresResponse.data.data.clientSecret;
              this.stripeAmount=Math.ceil(AresResponse.data.data.stripeAmount/100);
              this.originAmount=AresResponse.data.data.originAmount;
              this.orderNumber=AresResponse.data.data.orderNumber
            }else{
              Toast(AresResponse.data.msg);
            }
            this.isLastSubmitFinished=true;
          })
          .catch(error => {
            console.error("There was an error!", error.message);
            this.isLastSubmitFinished=true;
          });
      // console.log("Name: ",this.username);
      // console.log("Phone: ",this.phone);
      // console.log("Total Price: ",this.switchChecked*this.rentAmount + 88);
      // console.log("AddressCode: ",this.AddressValue);
    },
    backToPrevious(){
      this.showLoading=true;
      setTimeout(()=>{
        this.showLoading=false;
        this.activeStep-=1;
      },500)
    },
    goToNext(){
      this.activeStep+=1;
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
  text-align: center;
}
.amount h2{
  color: #000;
}
.alertCell{
  background-color: #FAEE00;
}
a {
  color: #42b983;
}
.amount{
  text-align: right;
}
.orderContainer{
  min-height: 430px;
  background: #fff;
}
.form-group{
  height:280px;
  width:100%;
  background: white;
  font:16px/26px Georgia, Garamond, Serif;
  overflow:auto;
}
.van-field__error-message{
  padding-left: 40px!important;
}
.van-cell.alertCell{
  color:#F71919;
  text-align: center;
}
.van-cell.alertCell::after{
  border: none;
}
#flux .content{
  padding: 0 10px;
}
.stepBox,.paymentForm,.resultBlock{
  padding:0 15px 15px 15px;
}
.paymentRow{
  padding:10px;
}
.paymentBtn{
  width: 100%;
  border-radius: 10px;
  color: #9A9999;
  border: 1px solid #9A9999;
}
.paymentBtn.active{
  border:3px solid #E49C2E;
  color: #E49C2E;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
