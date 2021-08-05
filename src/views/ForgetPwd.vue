<template>
  <NavHead :isShowHead="0"/>
    <div class="container">
        <FogetPwdForm/>
    </div>
  <NavBottom :propsActive="0"/>
</template>

<script>
import FogetPwdForm from "../components/ForgetPwd";
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";

export default {
  name: 'ForgetPwd',
  components: {
    NavHead,
    NavBottom,
    FogetPwdForm
  }
}
</script>

<style>
.logo{
  margin-top:80px!important;
  margin-bottom:20px;
}
html{
  background-image: url("http://223.197.188.172:8082/img/washing.png");
}
.home{
  text-align: center;
  padding: 0px 15px 0px 15px;
}
.register,.order-form{
  padding: 0px 15px 0px 15px;
}
</style>