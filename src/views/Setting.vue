<template>
  <NavHead/>
  <div class="container">
    <van-cell title="更改用戶資料" is-link />
    <van-cell title="更改密碼" is-link />
  </div>
  <NavBottom :propsActive="4"/>
</template>

<script>
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";
import VueCookies from 'vue-cookies'
export default {
  name: 'Setting',
  beforeMount() {
    console.log(VueCookies.get("LoginStatus"));
    if(VueCookies.get("LoginStatus")==null){
      window.location.href = "./";
    }
  },
  components: {
    NavHead,
    NavBottom
  }
}
</script>

<style>
</style>