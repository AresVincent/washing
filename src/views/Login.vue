<template>
  <NavHead :isShowHead='1'/>
    <div class="container">
      <div class="home">
        <img class="logo" alt="Ares logo" src="@/assets/kings_logo_colour.svg">
        <h2>歡迎來到 King's 洗衣系統</h2>
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
h2{
  color: #E49C2E;

}
.logo{
  margin-top:80px!important;
}
.home{
  text-align: center;
  padding: 0px 30px 0px 30px;
}
.register,.order-form{
  padding: 0px 15px 0px 15px;
}
</style>