<template>
  <div class="login">
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-field
            v-model="state.tel"
            type="tel"
            required
            name="username"
            label="手機號碼"
            placeholder="手機號碼"
            :rules="[{ required: true, message: '請輸入您的手機號碼' }]"
        />
        <van-field
            v-model="state.password"
            type="password"
            required
            name="password"
            label="密碼"
            placeholder="密碼"
            :rules="[{ required: true, message: '請輸入您的密碼' }]"
        />
          <div style="margin-top: 16px;" >
            <a href="forgetPassword">忘記密碼?</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/register">註冊</a>
          </div>
          <div class="button_center" style="margin: 16px;">
            <van-button class="submit" round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
      </van-form>
    </div>
  </div>
<van-overlay :show="show" @click="show = false">
    <van-icon name="clear" color="white" size="40" />
    <div class="imgBox"><img src="../assets/flow.png"></div>
</van-overlay>
</template>
<script>
import VueCookies from 'vue-cookies'
import { reactive } from 'vue';
import axios from "axios";
import {Toast} from "vant";
import md5 from 'js-md5';
export default {
  name:'LoginForm',
  beforeMount() {
    if(VueCookies.get("LoginStatus")==1){
      window.location.href="./order";
    }
    if(VueCookies.get("LoginStatus")==0||VueCookies.get("LoginStatus")==null){
      this.show=true;
    }
  },
  setup() {
    const state = reactive({
      username: '',
      password: '',
    });
    const onSubmit = (values) => {
      console.log('submit', values);
      const data = {
        username: '852'+values.username,
        password: md5(values.password),
      }
      const headers = {
        "Content-Type" : "application/json; charset=utf-8",
      }
      // axios.post("http://121.199.54.43:8888/user/userLogin", data, {headers})
          // axios.post("http://192.168.100.103:8080/user/userLogin", data, {headers})
          axios.post("/user/userLogin", data, {headers})
          .then(function(response){
            console.log(response);
            if(response.data.code == 200){
              Toast("Login successfully");
              // axios.get("http://121.199.54.43:8888/user/getUserByPhone?phone="+data.username).then(function(phoneResponse){
              // axios.get("http://192.168.100.103:8080/user/getUserByPhone?phone="+data.username).then(function(phoneResponse){
                axios.get("/user/getUserByPhone?phone="+data.username).then(function(phoneResponse){
                // let name = response.data.name;
                console.log(phoneResponse.data.code);
                if(phoneResponse.data.code == 200){
                  VueCookies.set("LoginStatus",1)
                  VueCookies.set("Name",phoneResponse.data.data.name);
                  VueCookies.set("Phone",data.username);
                  window.location.href="./order";
                }
                else{
                  Toast(phoneResponse.data.msg);
                }
              });
            }else{
              Toast(response.data.msg);
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    };
    return {
      state,
      onSubmit,
    };
  },
  data(){
    return{
      show:false,
    };
  },
  methods:{
     showPopup() {
      this.show = true;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit{
  /*margin-left: 27px;*/
  width:100%;
}
.van-overlay .imgBox{
    position: absolute;
    width: 80%;
    height: 80%;
    left: 50%;
    top: 5%;
    transform: translateX(-50%);
    overflow: auto;
}
.imgBox img{
  width: 100%;
  height:auto;
}
@media only screen and (min-width: 992px){
   .van-overlay .imgBox{
    width: 70%;
    height: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    overflow: auto;
  }
  .van-overlay .imgBox::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.van-overlay .imgBox {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
  .imgBox img{
    width: auto;
    height: 100%;
  }
}

.van-overlay i{
  cursor: pointer;
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  z-index: 999;
}
a{
  color: #E49C2E;
}
</style>
