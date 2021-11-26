<template>
  <div class="nav-header">
    <van-nav-bar class="nav-content" v-if="isShowHead==0"
        title="「 隨 • 便 • 洗 」"
        left-text="返回"
        right-text="登入"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
    <van-nav-bar class="nav-content" v-else-if="isShowHead==1"
        title="「 隨 • 便 • 洗 」"
        left-text="返回"
        right-text="註冊"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRightToRegist"
    />
    <van-nav-bar class="nav-content" v-else
        title="「 隨 • 便 • 洗 」"
        left-text="返回"
        right-text="登出"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
  </div>
</template>

<script>
// import {Toast} from "vant";
import VueCookies from 'vue-cookies'
export default {
  name: 'NavHead',
  props:{isShowHead:Number},
  setup() {
    const onClickLeft = () => window.history.back();
    // const onClickRight = () => Toast("登出");
    function onClickRight(){
      VueCookies.keys().forEach(cookie => VueCookies.remove(cookie));
      window.location.href="./";
    }
     function onClickRightToRegist(){
      VueCookies.keys().forEach(cookie => VueCookies.remove(cookie));
      window.location.href="./register";
    }
    return {
      onClickLeft,
      onClickRight,
      onClickRightToRegist
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin-bottom: 20px;
}
li {
  display: inline-block;
  /*margin: 0 10px;*/
}
a {
  color: #42b983;
}
.van-nav-bar{
  background-color: #FAEE00;
}


</style>