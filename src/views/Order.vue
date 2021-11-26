<template>
  <NavHead :isShowHead="2"/>
  <div class="container">
    <Order/>
  </div>
  <NavBottom :propsActive="2"/>
</template>

<script>
import Order from "../components/Order";
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";

export default {
  name: 'Home',
  components: {
    Order,
    NavHead,
    NavBottom,
  },
  data(){
    return{
    }
  }
}
</script>

<style>
</style>