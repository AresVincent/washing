<template>
  <NavHead isShowHead="true"/>
    <div class="container">
      <div class="home">
        <van-notice-bar
            left-icon="volume-o"
            :scrollable="true"
            text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
        />
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
<!--        <van-grid clickable :column-num="3" icon-size="40px">-->
<!--          <van-grid-item to="/home" icon="wap-home-o" text="主頁"/>-->
<!--          <van-grid-item icon="user-o" text="登錄" />-->
<!--          <van-grid-item icon="photo-o" text="文字" />-->
<!--          <van-grid-item icon="photo-o" text="文字" />-->
<!--          <van-grid-item icon="photo-o" text="文字" />-->
<!--          <van-grid-item icon="location-o" text="地址列表" />-->
<!--        </van-grid>-->
        <h3>地址列表</h3>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="4PX-堅尼地城金寶" name="1">
            <div class="shop-info">
              詳細地址:堅尼地城卑路乍街28號金寶商場J鋪<br>
              營業時間:星期一至六 ：10:30-19:30 (午膳：14:00-15:00)，星期日及勞工假期 ：休息，公眾假期：12:00-17:00<br>
            </div>
          </van-collapse-item>
          <van-collapse-item title="4PX-上環聯發商業中心" name="2">
            <div class="shop-info">
              詳細地址:香港皇后大道西2-12號上環聯發商業中心12樓03室<br>
              營業時間:星期一至六 ：10:30-19:30 (午膳：14:00-15:00)，星期日及勞工假期 ：休息，公眾假期：12:00-17:00<br>
            </div>
          </van-collapse-item>
          <van-collapse-item title="4PX-柴灣達藝中心" name="3">
            <div class="shop-info">
<!--              <van-cell title="詳細地址:" value="香港島東區 柴灣吉勝街12號達藝工業中心15樓09室(祥利街21-27號達藝工業中心停車場門口可入)" />-->
              <van-cell title="詳細地址:" value="" />
<!--              詳細地址:香港島東區 柴灣吉勝街12號達藝工業中心15樓09室(祥利街21-27號達藝工業中心停車場門口可入)<br>-->
              營業時間:星期一至六 ：10:30-19:30 (午膳：14:00-15:00)，星期日及勞工假期 ：休息，公眾假期：12:00-17:00<br>
            </div>
          </van-collapse-item>
          <van-collapse-item title="4PX-北角龍運大廈" name="4">
            <div class="shop-info">
              詳細地址:北角道8號隆運大廈1樓C,D室<br>
              營業時間:星期一至六 ：10:30-19:30 (午膳：14:00-15:00)，星期日及勞工假期 ：休息，公眾假期：12:00-17:00<br>
            </div>
          </van-collapse-item>
          <van-collapse-item title="4PX-太古東達中心" name="5">
            <div class="shop-info">
              詳細地址:香港島東區 鰂魚湧英皇道1065號東達中心4樓405B室(近太古地鐵站A1出口)<br>
              營業時間:星期一至六 ：10:30-19:30 (午膳：14:00-15:00)，星期日及勞工假期 ：休息，公眾假期：12:00-17:00<br>
            </div>
          </van-collapse-item>
          <van-collapse-item title="4PX-香港仔富嘉" name="6">
            <div class="shop-info">
              詳細地址:香港仔大道234號富嘉工業大廈9樓10室<br>
              營業時間:星期一至六 ：10:30-19:30 (午膳：14:00-15:00)，星期日及勞工假期 ：休息，公眾假期：12:00-17:00<br>
            </div>
          </van-collapse-item>
          <van-collapse-item title="4PX-灣仔駱克道" name="6">
            <div class="shop-info">
              詳細地址:香港灣仔駱克道313號6樓<br>
              營業時間:星期一至六 ：10:30-19:30 (午膳：14:00-15:00)，星期日及勞工假期 ：休息，公眾假期：12:00-17:00<br>
            </div>
          </van-collapse-item>
        </van-collapse>
<!--        <van-tabs>-->
<!--          <van-tab title="香港">-->
<!--            <van-tabs>-->
<!--              <van-tab title="中西區">-->
<!--              </van-tab>-->
<!--              <van-tab title="東區"></van-tab>-->
<!--              <van-tab title="南區"></van-tab>-->
<!--              <van-tab title="灣仔區"></van-tab>-->
<!--            </van-tabs>-->
<!--          </van-tab>-->
<!--          <van-tab title="九龍">内容 3</van-tab>-->
<!--          <van-tab title="新界">内容 2</van-tab>-->
<!--        </van-tabs>-->

      </div>
    </div>
  <NavBottom :propsActive="0"/>
</template>

<script>
import NavBottom from "../components/NavBottom";
import NavHead from "../components/NavHead";
import {Collapse, CollapseItem, Tabs,Tab,NoticeBar,Grid,GridItem,Swipe,SwipeItem} from "vant";

export default {
  name: 'Login',
  components: {
    NavHead,
    NavBottom,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem,
    [NoticeBar.name]:NoticeBar,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [Collapse.name]:Collapse,
    [CollapseItem.name]:CollapseItem,
  },
  data(){
    return{
      activeNames: ['1'],
    }
  }
}
</script>

<style scoped>
.home{
  text-align: justify!important;
}
h3{
  padding-left: 10px;
}
.shop-info{
  line-height: 30px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 250px;
  text-align: center;
  background-color: #39a9ed;
}
</style>