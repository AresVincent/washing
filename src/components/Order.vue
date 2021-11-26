<template>
  <div class="order-form">
    <van-notice-bar
      color="#F71919"
      left-icon="volume-o"
      text="King's 提提你：我們依家有得將洗完既衫送到你屋企門口啦！唔想自己拎黎拎去？洗衣上門幫到你！"
    />
    <van-form @submit="onSubmit">
      <!--Buy/Rental Washing Bag-->
      <van-cell center title="購買洗衣袋?" size="large">
        <template #right-icon>
          <van-switch v-model="switchChecked" @change="RentalTagChanged" size="24" inactive-color="#dcdee0" />
        </template>
      </van-cell>
      <!-- choose delivery home when finish washing -->
      <van-cell center title="洗衣上門" size="large">
        <template #right-icon>
          <van-switch v-model="deliveryChecked" @change="DeliveryTagChanged" size="24" inactive-color="#dcdee0" />
        </template>
      </van-cell>
      <!--Address-->
      <van-field
          v-model="fieldValue"
          is-link
          required
          readonly
          label="自提點"
          placeholder="請選擇自提點"
          @click="show = true"
          size="large"
          :rules="[{ required: true, message: '請選擇自提點' }]"
      />
      <div  v-if="deliveryChecked==true">
        <van-field 
          v-model="districtValue"
            is-link
            required
            readonly
            label="派送地區"
            placeholder="請選擇所在地區"
            @click="showDistrict = true"
            size="large"
            :rules="[{ required: true, message: '請選擇地區' }]"
        />
        <van-field 
        v-model="addressDetail"
        label="派送地址" 
        placeholder="請填寫街道和所在大廈及樓層單位"
        required
        size="large"
        :rules="[{ required: true, message: '請輸入您的詳細地址' }]"
        />
      </div>
      <!-- district popup -->
      <van-popup v-model:show="showDistrict" round position="bottom">
        <van-area :area-list="districtOpt" @confirm="onDistrictFinish" @cancel="showDistrict=false"
          confirm-button-text	="確認"  :columns-placeholder="['請選擇', '請選擇', '請選擇']"/>
      </van-popup>
      <!-- picup point -->
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
            v-model="cascaderValue"
            title="請選擇所在地區"
            placeholder="請選擇"
            :options="options"
            @close="show = false"
            @finish="onFinish"
        />
      </van-popup>
      
      <div id="flux" class="form-group" @scroll="onScroll">
          <h3 style="margin-bottom:0px;">King's服務條款及細則</h3>
          <p class="content" style="font-size:16px;line-height: 3rem;margin-top:0;">
            1. 磅洗服務，包括衣物清洗、焗乾及摺疊。 <br>
            2. 每次惠顧客人需填寫正確的電話及姓名，如信息不正確導致後續收不到提件碼、包裹被冒領等問題，本公司恕不負責。<br>
            3. 客人需一次性現金支付洗衣費及使用指定洗衣袋之費用，且不提供任何的收據。<br>
            4. 洗好的衣服到達自提點上架後，有2日的免租期，客人需於免租期內提取包裹。<br>
            5. 客人如超過免租期提取包裹，自提點將有機會收取客人HKD10/天。<br>
            6. 包裹到達自提點上架後，超過2日免租期未領取，自提點有權將包裹退回4PX分拔倉，倉租為HKD10/天。<br>
            7. 包裹如退回4PX分拔倉後，客人需要再次送到自提點取件，需支付HKD20的行政費，到達自提點後由客人現金支付。<br>
            8. 洗衣機轉動清洗衣物時，總有一定的機械動作；清洗後衣物需經高溫焗乾，如有染色、脫色、破損、縮水，本公司恕未能負責。<br>
            9. 取衣時確保洗衣袋和索帶的完整性，衣物領回後，如有遺失，本公司恕未能負責。<br>
            10.取衣時，如洗衣袋有破損，需當面提出，並聯絡King's以後續處理。如因洗衣袋破損導致的內部物失破損、遺失，最高賠償額為HKD200/袋。<br>
            11. 如自提點或中轉過程中遺失包裹，最高賠償額為HKD200/袋。<br>
            12. 磅洗衣物，遇上不可抗力的情況，或任何意外之損失，本公司恕未能負責。<br>
            13. 客人請確保交付之衣物內沒有任何貴重物品，如有任何遺失，本公司恕未能負責。<br>
            14. 如因假期或運輸問題有所延誤，則不作另行通知。<br>
            15.King's 保留隨時更改使用條款及細則之權利，而不會作另行通知。如有任何爭議， King's 保留最終決定權。<br>
          </p>
      </div>
      <van-field
          required
          name="checkbox"
          label=""
          :rules="[{ required: true, message: '請同意條款及細則'}]"
          class="alertCell"
      >

        <template #input>
<!--          <div>-->
<!--            <label><input id="accept" type="checkbox" disabled class="form-check-input" style="width: 20px; height: 20px;">我同意上述條款及細則</label>-->
<!--          </div>-->
          <van-checkbox style="padding-left:10px;" id="flux-check" v-model="checked" shape="square" size="large">我同意上述條款及細則</van-checkbox>
        </template>
      </van-field>
      <div class="amount">
        <h2 id="total" style="padding-right:20px;">總金額: $88</h2>
      </div>
      <van-cell-group class="priceLabel" hidden><van-field label="總金額：" size="large" v-model="price" readonly /></van-cell-group>
      <van-cell class="alertCell" title="注意：洗衣上門為洗完後派送上門的服務，而非上門收件的服務！" size="large" />
      <div style="margin: 16px;">
        <van-button round block type="primary" class="submit" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { reactive } from 'vue';
import axios from "axios";
import {Toast} from "vant";
import VueCookies from "vue-cookies";
// import $ from "jquery";

export default {
  name:'Order',
  beforeMount() {
    console.log(VueCookies.get("LoginStatus"));
    if(VueCookies.get("LoginStatus")==null){
      window.location.href = "./";
    }
  },
  data(){
    return{
      switchChecked: false,
      deliveryChecked:false,
      switchFreeChecked:false,
      checked:false,
      checkboxdisable:true,
      show: false,
      showDistrict:false,
      LoginStatus: VueCookies.get("LoginStatus"),
      username: VueCookies.get("Name"),
      phone: VueCookies.get("Phone"),
      fieldValue: "",
      districtValue:"",
      AddressValue: "",
      receiptCity:"",
      receiptDistrict:"",
      addressDetail:'',
      cascaderValue: "",
      price:88,
      isLastSubmitFinished:true,
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          text: "香港島",
          value: "1",
          children: [
            {
              text: "灣仔",
              value: "101",
              children: [
                { text: "灣仔駱克道313號6樓", value: "HKG-P209" },
              ]
            },
            {
              text: "東區",
              value: "102",
              children: [
                { text: "柴灣吉勝街12號達藝工業中心15樓09室(祥利街21-27號達藝工業中心停車場門口可入)", value: "HKG-P030" },
                { text: "北角道8號隆運大廈1樓C,D室", value: "HKG-P031" },
                { text: "太古鰂魚涌英皇道1065號東達中心4樓405B室(近太古地鐵站A1出口)", value: "HKG-P035" },
                { text: "筲箕灣道57-87號太安樓地下A24B舖", value: "HKG-P280" },
              ]
            },
            {
              text: "南區",
              value: "103",
              children: [
                { text: "香港仔大道234號富嘉工業大廈9樓10室", value: "HKG-P021" },
              ]
            },
            {
              text: "中西區",
              value: "104",
              children: [
                { text: "上環皇后大道西2-12號聯發商業中心12樓03室", value: "HKG-P245" },
                { text: "堅尼地城卑路乍街28號金寶商場J鋪", value: "HKG-P024" },
              ]
            },
          ],
        },
        {
          text: "九龍",
          value: "2",
          children: [
            {
              text: "九龍城區",
              value: "201",
              children: [
                { text: "紅磡民裕街41號凱旋工商中心第一期1樓B1(B)室「佛光街天橋香港賽馬會 旁邊扶手電梯上一層就到」", value: "HKG-P032" },
              ]
            },
            {
              text: "觀塘區",
              value: "202",
              children: [
                { text: "觀塘道448-458號觀塘工業中心3期地庫A3室（觀塘工業中心第二及第三期牌坊右邊）", value: "HKG-P002" },
                { text: "九龍灣宏開道15號九龍灣工業中心4樓03室", value: "HKG-P029" },
                { text: "九龍灣宏光道80號麗晶花園商場1樓113號鋪", value: "HKG-P243" },
                { text: "藍田匯景道8號藍田匯景廣場5樓26號鋪", value: "HKG-P244" },
                { text: "油塘茶果嶺道610號生利工業中心908室", value: "HKG-P048" },
              ]
            },
            {
              text: "油尖旺區",
              value: "203",
              children: [
                { text: "旺角上海街438-444號同珍商業中心19樓1902-03室", value: "HKG-P006" },
                { text: "旺角西洋菜南街74-84號旺角城市中心10樓02室（旺角地鐵站D3出口百老匯樓上）", value: "HKG-P254" },
                { text: "大角咀福全街66-68號福全工廠大廈7樓A1室", value: "HKG-P041" }
              ]
            },
            {
              text: "深水埗區",
              value: "204",
              children: [
                { text: "荔枝角香港工業中心C座1樓19B室（荔枝角地鐵站C出口）", value: "HKG-P038" },
                { text: "長沙灣元洲街312-314號秉暉工業大廈2樓4室", value: "HKG-P040" },
                { text: "深水埗石硤尾街22-28號偉業樓地下26號鋪", value: "HKG-P046" },
              ]
            },
            {
              text: "黃大仙區",
              value: "205",
              children: [
                { text: "新蒲崗爵祿街39-41號啟德工廠大廈二期4字樓E2室", value: "HKG-P037" },
                { text: "黃大仙蒲崗村道61-87號富祐商場27-28號地舖", value: "HKG-P043" },
              ]
            },
          ],
        },
        {
          text: "新界",
          value: "3",
          children: [
            {
              text: "大埔區",
              value: "301",
              children: [
                { text: "大埔靖遠街19號地下", value: "HKG-P022" },
                { text: "大埔舊墟直街30號美利大廈地下1號地舖（天后宮旁直入）", value: "HKG-P026" },
              ]
            },
            {
              text: "元朗區",
              value: "302",
              children: [
                { text: "天水圍天湖路1號嘉湖山莊樂湖居嘉湖新北江商場2樓38號舖", value: "HKG-P034" },
                { text: "天水圍天秀路8號天一商場3樓3005號鋪", value: "HKG-P246" },
                { text: "元朗鳳群街2號年發大廈地下11號鋪", value: "HKG-P036" },
                { text: "元朗媽橫路15-19號良材大樓2期地下5號舖（郎屏地鐵站B2出口）", value: "HKG-P025" },
                // { text: "元朗裕榮徑11號好旺洋樓地下17號鋪（教育路沿大坑渠經舊B仔凉粉直入天橋位）", value: "HKG-P264" },
              ]
            },
            {
              text: "屯門區",
              value: "303",
              children: [
                { text: "屯門震寰路三號德榮工業大廈9樓D室", value: "HKG-P001" },
                { text: "屯門新墟好運洋樓地舖16G（近何福堂及馬會）", value: "HKG-P044" },
                { text: "屯門富健花園商場G67鋪位", value: "HKG-P247" },
              ]
            },
            {
              text: "北區",
              value: "304",
              children: [
                { text: "上水石湖墟龍琛路48號 上水匯10樓1007室", value: "HKG-P004" },
                { text: "粉嶺聯和墟聯旺樓聯發街34號B鋪（馬錦燦中學對面 近教堂交界地鋪）", value: "HKG-P240" },
              ]
            },
            {
              text: "西貢區",
              value: "305",
              children: [
                { text: "將軍澳寶琳北路18號寶林邨寶林商場2樓203舖", value: "HKG-P033" },
                { text: "西貢德隆後街23B地下(順豐後面 利記五金鋪對面）", value: "HKG-P253" },
              ]
            },
            {
              text: "沙田區",
              value: "306",
              children: [
                { text: "火炭坳背灣街14-24號金豪工業大廈第二座地下B2舖", value: "HKG-P005" },
                { text: "火炭穗禾路1號豐利工業中心4樓7B室（火炭麥當勞斜對面）", value: "HKG-P255" },
                { text: "沙田石門安心街19號匯貿中心8樓807室（近石門地鐵站C出口）", value: "HKG-P042" },
              ]
            },
            {
              text: "荃灣區",
              value: "307",
              children: [
                { text: "荃灣沙咀道362號全發商業大廈17樓10-11室", value: "HKG-P027" },
                { text: "荃灣沙咀道26-38號匯力工業中心4樓28室", value: "HKG-P039" },
              ]
            },
            {
              text: "葵青區",
              value: "308",
              children: [
                { text: "葵涌大連排道35-41號金基工業大廈21樓D6室(葵興港鐵站A出口,步行過天橋3分鐘就到)", value: "HKG-P028" },
                { text: "葵涌和宜合道202號誼發大廈1樓13號鋪", value: "HKG-P047" },
                { text: "葵涌葵富路7-11號葵涌廣場3樓3012號舖", value: "HKG-P241" },
              ]
            },
          ],
        },
      ],
      districtOpt:{
        province_list: {
          810000: '香港特別行政區',
        },
        city_list: {
          810100: '港島',
          810200: '九龍',
          810300: '新界'
        },
        county_list: {
          810101: '中西區',
          810102: '灣仔區',
          810103: '東區',
          810104: '南區',
          810201: '九龍城區',
          810202: '油尖旺區',
          810203: '深水埗區',
          810204: '黃大仙區',
          810205: '觀塘區',
          810301: '北區',
          810302: '大埔區',
          810303: '沙田區',
          810304: '西貢區',
          810305: '元朗區',
          810306: '屯門區',
          810307: '荃灣區',
          810308: '葵青區',
          810309: '離島區',
        }
      },
    }
  },
  methods:{
    RentalTagChanged(){
      let amounttext = document.getElementById("total");
      this.price=88;
      if(this.switchChecked==true){
        console.log(this.switchChecked);
        this.price+=this.rentAmount;
        console.log(this.price);
      }
      //if choose home delivery
      this.price+=30*this.deliveryChecked;
      amounttext.innerHTML="總金額: $"+this.price;
    },
    DeliveryTagChanged(){
      let amounttext = document.getElementById("total");
      this.price=88;
      if(this.deliveryChecked==true){
        console.log(this.deliveryChecked);
        this.price+=30;
        console.log(this.price);
      }
      //if choose bag
      this.price+=this.rentAmount*this.switchChecked;
      amounttext.innerHTML="總金額: $"+this.price;
      this.districtValue="";
      this.receiptCity="";
      this.receiptDistrict="";
      this.addressDetail="";
    },
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("We are at bottom");
        this.checked = true;
        document.getElementById('accept').removeAttribute('disabled');
      }
    },
  // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      // 没有 children 时触发
      this.show = false;
      let AddressValueArray;
      AddressValueArray = selectedOptions.map((option) => option.value);
      let AddressArray;
      AddressArray = selectedOptions.map((option) => option.text);
      this.fieldValue = AddressArray[2];
      this.AddressValue = AddressValueArray[2];
      // this.fieldValue = selectedOptions.map((option) => option.text).join("/");
      console.log(this.AddressValue);
    },
    onSubmit(){
      // console.log(this.switchChecked);
      const Num = Math.floor(100000000 + Math.random() * 900000000);
      const OrderNum = "A8"+Num;
      
      const ares_data = {
        orderNo:OrderNum,
        consignorName:this.username,
        consignorPhone:this.phone,
        cost:this.price,
        consigneeName:this.username,
        consigneePhone:this.phone,
        packageNumber:"1",
        pickUpPoint:this.AddressValue,
        rentTag:this.switchChecked,
        packageRentCost:this.switchChecked*this.rentAmount,
        receiptCity:this.receiptCity,
        receiptDistrict:this.receiptDistrict,
        receiptAddress:this.addressDetail,
        homePickupTag:this.deliveryChecked,
      }
      const aresheaders = {
        "Content-Type" : "application/json; charset=utf-8",
      }
      
      // axios.post("http://121.199.54.43:8888/package/createOrder", ares_data, {aresheaders})
      if(!this.isLastSubmitFinished){
        Toast("請勿多次提交訂單!");
        return;
      }
      this.isLastSubmitFinished=false;
      axios.post("/package/createOrder", ares_data, {aresheaders})
          .then(function(AresResponse){
            console.log(AresResponse);
            if(AresResponse.data.code == 200){
              Toast(AresResponse.data.msg);
              window.location.href="./history";
            }else{
              Toast(AresResponse.data.msg);
            }
            this.isLastSubmitFinished=true;
          })
          .catch(error => {
            console.error("There was an error!", error.message);
            this.isLastSubmitFinished=true;
          });
      console.log("Name: ",this.username);
      console.log("Phone: ",this.phone);
      console.log("Total Price: ",this.switchChecked*40 + 88);
      console.log("AddressCode: ",this.AddressValue);
    },
    onDistrictFinish(target){
      this.showDistrict=false;
      console.log(target);
      let strText="";
      for(let i=1;i<target.length;i++){
        strText+=target[i].name;
      }
      this.districtValue=strText;
      this.receiptCity=target[1].name;
      this.receiptDistrict=target[2].name;
      console.log(this.receiptCity);
      console.log(this.receiptDistrict);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
  text-align: center;
}
.amount h2{
  color: #000;
}
.alertCell{
  background-color: #FAEE00;
}
a {
  color: #42b983;
}
.amount{
  text-align: right;
}
.form-group{
  height:220px;
  width:100%;
  border:1px solid #ccc;
  background: white;
  font:16px/26px Georgia, Garamond, Serif;
  overflow:auto;
}
.van-field__error-message{
  padding-left: 40px!important;
}
.van-cell.alertCell{
  color:#F71919;
  text-align: center;
}
#flux .content{
  padding: 0 10px;
}
</style>
