<template>
  <NavHead :isShowHead="2"/>
  <div class="container">
    <Order :RentAmount='rentAmount'/>
  </div>
  <NavBottom :propsActive="2"/>
</template>

<script>
import Order from "../components/Order";
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";
import Global from '../components/Common';

export default {
  name: 'Home',
  components: {
    Order,
    NavHead,
    NavBottom,
  },
  data(){
    return{
        rentAmount:Global.rentAmount
    }
  }
}
</script>

<style>
.logo{
  margin-top:20px;
  margin-bottom:20px;
}
</style>