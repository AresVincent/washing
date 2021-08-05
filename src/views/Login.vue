<template>
  <NavHead :isShowHead='1'/>
    <div class="container">
      <div class="home">
        <img class="logo" alt="Ares logo" src="@/assets/ares_logo-200x200.png">
        <h2>歡迎來到 Ares 洗衣系統</h2>
        <LoginForm/>
      </div>
    </div>
  <NavBottom :propsActive="0"/>
</template>

<script>
import LoginForm from "../components/Login";
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";

export default {
  name: 'Login',
  components: {
    NavHead,
    NavBottom,
    LoginForm
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