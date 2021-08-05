<template>
  <div class="nav-bottom">
      <van-tabbar v-model="active">
  <!--      <van-tabbar-item icon="home-o">主頁</van-tabbar-item>-->
        <van-tabbar-item to="/">
          <span>主頁</span>
          <template #icon="props">
            <img class="navbar_icon" :src="props.active ? icon.home_active : icon.home_inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/register">
          <span>註冊</span>
          <template #icon="props">
            <img class="navbar_icon" :src="props.active ? icon.setting_active : icon.setting_inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="order">
          <span>下單</span>
          <template #icon="props">
            <img class="navbar_icon" :src="props.active ? icon.order_active : icon.order_inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="history">
          <span>訂單記錄</span>
          <template #icon="props">
            <img class="navbar_icon" :src="props.active ? icon.history_active : icon.history_inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/addressList" icon="location-o">地址列表</van-tabbar-item>
<!--        <van-tabbar-item to="/setting" icon="setting-o">我的</van-tabbar-item>-->

  <!--      <van-tabbar-item icon="setting-o">設定</van-tabbar-item>-->
      </van-tabbar>
  </div>
</template>

<script>
// import { ref } from 'vue';
export default {
  name: 'NavBottom',
  // created(){
  //   console.log(this.$route);//打印当前路由属性
  //   if (this.$route.path === '/') {
  //     this.$router.push('/home');
  //   }
  // },
  props:{propsActive:Number},
  data(){
    return{
      active:this.propsActive,
    }
  },
  setup() {
    const icon = {
      home_active:'http://223.197.188.172:8082/img/home_active.png',
      home_inactive:'http://223.197.188.172:8082/img/home_inactive.png',
      order_active: 'http://223.197.188.172:8082/img/order_active.png',
      order_inactive: 'http://223.197.188.172:8082/img/order_inactive.png',
      history_active: 'http://223.197.188.172:8082/img/history_active.png',
      history_inactive: 'http://223.197.188.172:8082/img/history_inactive.png',
      setting_active: 'http://223.197.188.172:8082/img/setting_active.png',
      setting_inactive: 'http://223.197.188.172:8082/img/setting_inactive.png',
    };
    return {
      icon,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navbar_icon{
  margin:2px;
}
</style>
