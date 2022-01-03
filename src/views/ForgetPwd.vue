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
}

.home{
  text-align: center;
  padding: 0px 15px 0px 15px;
}
</style>