<template>
  <div class="forgetPwd">
    <div class="pwd-form">
      <van-form @submit="onSubmit">
        <van-field
            v-model="state.phone"
            type="tel"
            required
            name="phone"
            label="手機號碼"
            placeholder="手機號碼"
            :rules="[{ required: true, message: '請輸入您的手機號碼' }]"
        />
        <van-field
            v-model="state.newPassword"
            type="password"
            required
            name="newPassword"
            label="密碼"
            placeholder="密碼"
            :rules="[{ required: true, message: '請輸入您的密碼' }]"
        />
        <van-field
            v-model="state.dbConfiremedPwd"
            type="password"
            required
            name="dbConfiremedPwd"
            label="密碼"
            placeholder="請再次輸入您的密碼"
            :rules="[{ required: true, message: '請再次輸入您的密碼' }]"
        />
        <van-field
            center
            clearable
            label="短信驗證碼"
            placeholder="請輸入您的短信驗證碼"
            required
            v-model="state.code"
            :rules="[{ required: true, message: '請輸入您的短信驗證碼' }]"
        >
          <template #button>
            <van-button  @click="sendSMS" size="small" type="primary" id="verifyBtn">發送驗證碼</van-button>
          </template>
        </van-field>
        <div class="button_center" style="margin: 16px;">
            <van-button class="submit" round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import { reactive } from 'vue';
import axios from "axios";
import {Toast} from "vant";
import md5 from 'js-md5';
export default {
  name:'PwdForm',
  beforeMount() {
    if(VueCookies.get("LoginStatus")==1){
      window.location.href="./order";
    }
  },
  setup() {
    const state = reactive({
      phone: '',
      newPassword: '',
      dbConfiremedPwd:'',
      code:'',
    });
    var available=true;
    const sendSMS = () => {
      if(state.phone==""){
        Toast("請輸入你的聯絡電話");
      }else{
        console.log(state.phone);
        // axios.post("http://121.199.54.43:8888/tourist/sendSMSVerificationCode?phone="+"852"+state.phone)
        axios.post("/tourist/sendSMSVerificationCode?phone="+"852"+state.phone)
        .then(function(response){
          // console.log(response);
          Toast(response.data.msg);
        });
        let dc=document.getElementById("verifyBtn");
        let count=60;
        if(available){
          dc.classList.add("disable");
          available=false;
          dc.disabled=true;
          var timer=setInterval(function(){
            count-=1;
            dc.innerText="發送驗證碼("+count+")";
            if(count<=0){
              dc.classList.remove("disable");
              dc.innerText="發送驗證碼";
              available=true;
              dc.disabled=false;
              clearInterval(timer);
            }
          },1000);
        }
      }
    };
    const onSubmit = (values) => {
        if(state.dbConfiremedPwd!=state.newPassword){
          Toast("兩次密碼不相同");
        }
      console.log('submit', values);
      const data = {
        phone: '852'+state.phone,
        newPassword: md5(state.newPassword),
        code:state.code,
      }
      const headers = {
        "Content-Type" : "application/json; charset=utf-8",
      }
      // axios.post("http://121.199.54.43:8888/tourist/changePassword", data, {headers})
      axios.post("/tourist/changePassword", data, {headers})
        .then(function(register_response){
          console.log(register_response);
          if(register_response.data.code==200){
            Toast("Success");
            window.location.href="./order";
          }else{
            Toast(register_response.data.msg);
          }
        })
        .catch(error => {
          console.error("There was an error!", error.message);
        });
    };
    return {
      state,
      onSubmit,
      sendSMS
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forgetPwd{
   padding: 0px 15px 0px 15px;
}
.submit{
  /*margin-left: 27px;*/
  width:100%;
}
#verifyBtn.disable{
  pointer-events: none;
  background: grey;
  border: 1px grey solid;
}
</style>
