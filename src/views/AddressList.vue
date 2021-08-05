<template>
  <NavHead :isShowHead="2"/>
  <div class="container">
<!--    <van-tabs v-model="active">-->
<!--      <van-tab title="标签 1">内容 1</van-tab>-->
<!--      <van-tab title="标签 2">内容 2</van-tab>-->
<!--      <van-tab title="标签 3">内容 3</van-tab>-->
<!--      <van-tab title="标签 4">内容 4</van-tab>-->
<!--    </van-tabs>-->
        <AddressList />
  </div>
  <NavBottom :propsActive="4"/>
</template>

<script>
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";
import AddressList from "../components/AddressList";
import {Tab, Tabs} from 'vant';

export default {
  name: 'AddressListView',

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    NavHead,
    NavBottom,
    AddressList
  },

  props:{
    
  }
}
</script>

<style>
</style>