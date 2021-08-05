<template>
  <NavHead :isShowHead="0"/>
  <div class="container">
    <Register/>
  </div>
  <NavBottom :propsActive="1"/>
</template>

<script>
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";
import Register from "../components/Register";
import VueCookies from 'vue-cookies'
export default {
  name: 'RegisterView',
  beforeMount() {
    console.log(VueCookies.get("LoginStatus"));
    if(VueCookies.get("LoginStatus")==1){
      window.location.href = "./order";
    }
  },
  components: {
    Register,
    NavHead,
    NavBottom
  }
}
</script>

<style>
.container{
  /* background-image: url("http://223.197.188.172:8082/img/washing.png"); */
  padding: 0px 0px 50px 0px;
  /* height:1000px; */
  /* background-repeat: repeat; */
}
</style>