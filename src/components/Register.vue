<template>
  <div class="register">
    <div class="register-form">
      <van-form @submit="onSubmit">
        <div class="infoContainer">
        <van-field
            v-model="state.username"
            name="username"
            required
            label="姓名"
            placeholder="姓名"
            :rules="[{ required: true, message: '請輸入您的姓名' }]"
        />
        <van-field
            readonly
            clickable
            required
            name="picker"
            v-model="value"
            label="稱謂"
            placeholder="點擊選擇"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
              show-toolbar
              confirm-button-text	="確認"
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
            v-model="state.email"
            type="email"
            required
            name="email"
            label="電郵地址"
            placeholder="電郵地址"
            :rules="[{ required: true, message: '請輸入您的電郵地址' }]"
        />
        <van-field
            v-model="state.phone"
            type="tel"
            required
            name="phone"
            label="手機號碼"
            placeholder="手機號碼,e.g. 69991111"
            :rules="[{ required: true, message: '請輸入您的手機號碼' }]"
        />
        <van-field
            v-model="state.password"
            type="password"
            required
            name="password"
            label="密碼"
            placeholder="密碼"
            :rules="[{ required: true, message: '請輸入您的密碼' }]"
        />
        <!-- <van-field
            center
            clearable
            label="短信驗證碼"
            placeholder="請輸入您的短信驗證碼"
            required
            v-model="state.code"
            :rules="[{ required: true, message: '請輸入您的短信驗證碼' }]"
        >
          <template #button>
            <van-button  @click="sendSMS" size="small" type="primary" id="verifyBtn">發送驗證碼</van-button>
          </template>
        </van-field> -->
        <div id="flux" class="form-group">
          <h3 style="margin-bottom:0;">King's私隱政策</h3>
          <p class="content" style="font-size:16px;line-height: 1.5rem;margin-top:10px;">
            King's Cargo Logistics Limited(（下稱為「King's」、「我們」）。 我們重視閣下的私隱，並竭力維護閣下的個人資料得到保密。此私隱政策適用於所有我們提供的產品及服務，並說明我們如何收集、使用及披露閣下的個人資料。我們承諾遵守香港《個人資料（私隱）條例》（第486章）（「香港私隱條例」）之要求。而我們在遵行上述的要求時，會確保我們的員工遵守最嚴格的安全及保密標準。<br><br>
            1. 個人資料收集<br>
            1.1我們重視閣下的私隱，並已採取措施確保我們不向閣下收集多於就向閣下提供產品及/或服務及/或處理保障閣下的帳戶所需的資料。<br>
            1.2當閣下使用我們的產品及服務或瀏覽我們的網站或移動應用程式時，閣下會被要求提供個人資料可能會於包括但不限於登記成為我們的會員、登記網上帳戶、在店舖內或網上購物、進行禮品兌換或使用電子禮券、向我們提交任何意見和反饋、以作核對閣下身份之用等。<br>
            1.3我們會要求閣下提供以下個人資料，包括但不限於，稱謂、姓名、性別、電話號碼、電郵地址、郵寄地址、生日資料、國籍等。<br>
            1.4閣下必須提供某些個人資料(在收集個人資料時會列明)。假如閣下未能提供任何被列明為「必須」的個人資料或提供不真實或不完整的資料，我們有可能無法處理任何會籍申請或任何由閣下提出的要求，而我們亦保留拒絕向閣下提供「King's」產品或服務的權利，當中包括拒絕閣下的會籍申請。<br>
            1.5所有個人資料將會在自願、公開及公平的基礎上收集。<br>
            1.6所有收集的資料只供內部使用。
            <br>
            2. 收集個人資料的目的<br>
            「King's」將會收集閣下的個人資料作下列用途：<br>
            2.1 處理閣下的會籍申請，維持及管理閣下的會員帳戶；<br>
            2.2 確認閣下身份<br>
            2.3 提供由「King's」及/或我們所聘用的、協助我們向閣下提供服務的服務供應商的銷售服務，或任何計劃或活動的獎賞、生日優惠、電子禮券及服務；<br>
            2.4 執行閣下的指示、回應閣下的查詢或向閣下提供顧客服務；<br>
            2.5 與建立、維持、管理及/或營運任何計劃有關的目的;<br>
            2.6 進行調查、研究及統計分析，以改善的我們的產品和服務，及作促銷用途；<br>
            2.7 在獲得閣下同意後作直接促銷用途，及通知閣下有關新產品、優惠及其他特 別推廣的消息；<br>
            2.8 組成「King's」運作所需的顧客資料庫的一部分；及/或<br>
            2.9 在任何法律程序執行我們或我們的關聯公司針對閣下的權利或在有關閣下 的法律申索中為我們或我們的關聯公司辯護;及<br>
            2.10遵守香港或其他有關地區的任何法律、政府或監管的要求，包括「奇華」或其他類別的資料接收者須遵守的披露或通知要求。
            <br>
            3. 個人資料分享及披露<br>
            3.1閣下亦同意我們可披露及移轉（無論在香港或海外）閣下的個人資料予我們所聘用的第三方服務提供者，以協助我們為閣下提供服務，包括輸入資料、管理顧客資料庫、就我們的產品和服務與顧客聯絡的服務（服務提供者可能會就推廣、產品獎賞、禮券及獎賞兌換、銷售、訂購、退款、更換服務及/或送貨服務聯絡閣下）及安全地處置閣下的個人資料（「第三方服務提供者」）。該等第三方服務提供者均對我們負有保密責任，及只可以根據以上第3條所列明的用途（而不可就其自身的目的）使用該等資料（包括直接促銷用途）。<br>
            3.2 在必要時我們亦可能會為上述3.7條所指明的目的披露及移轉（無論在香港或海外）閣下的個人資料予我們的專業顧問、特許可人、執法機關、保險公司、政府和監管機構及其他機構等。<br>
            我們可能會就不同目的（包括促銷和廣告目的）將總體資料在閣下身份不會被識別的情況下與第三方分享，及可能使用此等資料以更了解閣下的需要及改善並調整我們的產品和服務。<br>
            閣下提供的任何個人資料將會就上文第3條所述的任何目的被我們保留，並會被我們的僱員、我們聘用的第三方服務提供者及上文第3條所述的第三方查閱。<br>
            閣下有權透過在我們在收集閣下個人資料使用的表格中勾選相關拒絕方格，以選擇不接收任何市場推廣資訊。閣下亦可在任何時間以書面方式寄送要求至第13.2條的地址(無須支付任何費用) ，以要求我們停止向閣下提供市場推廣資訊。<br>
            閣下提供予我們及我們的關聯公司的任何個人資料將由我們保留，並可由我們的獲授權員工、任何我們所聘用之第三方服務提供者、我們的關聯公司及以上第3條所提及之第三方查閱。<br>
            <br>
            4. 準確性<br>
            「King's」會採取所有切實可行的步驟以確保所收集的個人資料均為準確。<br>
            「King's」歡迎閣下在登記「King's」的服務時提供準確的個人資料及在資料變更時通知「King's」以作及時更新。
            <br>
            5. 查閱及改正<br>
            5.1閣下有權知道:<br>
            5.1.1. 「King's」的私隱政策<br>
            5.1.2. 「King's」是否持有閣下任何的個人資料；及<br>
            5.1.3. 「King's」持有個人資料的種類。<br>
            5.2 閣下可隨時改正或修改閣下的個人資料，包括閣下是否希望我們就直接促銷目的聯絡閣下、通知閣下有關新產品及服務或會員優惠的消息，或刪除閣下的會員網上帳戶。<br>
            5.3 如果閣下對本私隱政策有任何疑問，或希望查閱或改正閣下的個人資料，閣下可以電郵至info@kings-hk.com、或在辦公時間星期一至五上午10時至晚上7時致電顧客服務熱線(852)2353 0188。「King's」在信納有關查閱或更正要求的真確性及有效性後，會盡力依從並在法例規定的期限內回應要求。
            5.4根據條例，我們保留就處理任何查閱或改正個人資料的要求向閣下收取合理費用的權利。
            <br>
            6. 保密<br>
            6.1我們會採取適當的技術和企業措施，以保護閣下向我們提供的個人資料，防止被意外或非法銷毀、丟失、更改、披露或存取您的個人資料。<br>
            6.2除個人資料外，任何由訪客傳送或登載於我們網站或網站其中任何部分的問題、評語、建議或資料均被視作在非保密及非專有的基礎上自願提供予我們。我們保留在其他地方自由使用、複製、披露、傳送、刊載、廣播及／或登載該等資料的權利，包括將該等資料提供給任何關聯公司，例如為產品及服務的開發、製造和推廣及為滿足顧客的需要。<br>
            6.3為配合市場推廣及業務發展，本公司將不定期向閣下發出本公司或與本公司合作之商戶所提供的市場推廣資訊。在任何情況下，本公司絕不會向任何第三者披露閣下的可辨識的個人身分資料。若閣下不欲接收本公司所提供的最新產品優惠及服務資訊，或與本公司合作的夥伴所提供的任何推廣優惠資訊，你可只需點擊一下電郵內的連結，便可退出訂閱。你將會立即從我們的訂閱電郵名單內剔除，無需任何費用。或以電郵通知客戶服務部：info@kings-hk.com，電郵主題請列明 "UNSUBSCRIBE”
            <br>
            7. 個人資料的保留<br>
            除非違反任何適用的法例要求，閣下的個人資料會被保留至貫徹收集該等資料的原有目的為止。
            <br>
            8. 直接促銷<br>
            「King's」可不時向您提供我們的產品及服務或會員計劃的最新資料。我們亦可能與本集團公司、母公司、子公司及/或關聯公司、或商業夥伴分享閣下的個人資料以供他們作直接促銷的用途。我們需要閣下的同意方可使用及分享閣下的個人資料。如閣下不願意接收任何「King's」的產品及服務的推廣資料或會員的推廣資料，閣下可以透過登入我們的網站、電郵至 info@kings-hk.com、或在辦公時間星期一至五上午10時至晚上7時致電顧客服務熱線(852)2353 0188以取消接收該等資料。根據法例規定，「King's」會依從您的要求並不會再將您的個人資料作直接促銷之用。
            <br>
            9. 個人資料的安全<br>
            9.1我們將盡一切合理努力確保我們持有的所有個人資料均被儲存於穩妥和安全的地方，及只有獲我們的關聯公司、授權之員工或獲授權的第三方服務提供者才可查閱。<br>
            9.2 由於任何系統都有機會被入侵，而任何在互聯網上提供的資料都並非絕對安全。因此，我們無法保證閣下經互聯網上傳送給我們或收到由我們所發出的資料的安全性。
            <br>
            10.本聲明的修訂<br>
            10.1我們有權於任何時間暫時、永久修改、終止或修訂本聲明。如果我們在使用閣下個人資料的方法上有重大變更，我們會在會員網站張貼明顯的告示，通知閣下有關修訂。閣下同意有關告示將構成充分及足夠的通知。<br>
            10.2 在有關修訂後，如閣下繼續使用我們的產品或服務，即表示閣下接受並同意受已修訂的聲明約束。
            <br>
            11.網頁連結<br>
            本網站或移動應用程式可能載有連接至其他由第三方所運作的網站及網頁的超連結。我們就被連接的網站的內容或該等網站的操作者處理閣下個人資料的方法並不擁有任何控制權。閣下應審閱該等第三方網站的私隱政策，以了解該等網站如何使用閣下的個人資料。
            <br>
            12. 閣下使用我們的網站時所收集之資料<br>
            我們可能在本網站使用'cookies'檔案，以便：<br>
            * 使安全措施更為嚴密；<br>
            * 使網上顧客可繼續瀏覽；<br>
            * 為顧客提供個人化的網站；<br>
            * 建立網上顧客或訪客的簡介。<br>
            Cookies檔案是一些儲存於閣下的硬碟、關於閣下對我們的網站的偏好設定的資料，幫助調整網站以適應閣下今後的網站訪問。若顧客想禁止cookies檔案的使用，可在閣下的互聯網瀏覽器上作出調整。但是，禁止cookies檔案的使用可能令閣下無法瀏覽我們的網站的所有部分。
            <br>
            13查閱或更改個人資料之權利<br>
            13.1根據香港私隱條例，閣下有權查閱我們持有有關閣下的個人資料及要求更正閣下的個人資料。<br>
            13.2閣下如對此私隱政策有任何疑問，或如欲查閱或更正我們持有閣下之個人資料，可將閣下的要求以書面方式寄送至下列地址：<br>
            King's Cargo Logistics Limited之客戶服務主任<br>
            九龍新蒲崗大有街1號勤達中心12樓08室或<br>
            電郵至: info@kings-hk.com
            <br>
          </p>
        </div>
        </div>
        <!-- submit button -->
        <div style="margin: 20px;">
          <van-button round block type="primary" class="submit" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import { reactive } from 'vue';
import axios from "axios";
import {Toast} from "vant";
import md5 from 'js-md5';

export default {
  name:'Register',
  beforeMount() {
    if(VueCookies.get("LoginStatus")==1){
      window.location.href="./order";
    }
  },
  data() {
    return {
      value:'',
      showPicker:false,
      columns: ['先生', '小姐', '太太'],
    };
  },
  setup() {
    const state = reactive({
      username: '',
      password: '',
      confirm_password: '',
      phone: '',
      email:'',
      // code:'',
      surname:'',
    });
    var available=true;
    const sendSMS = () => {
      if(state.phone==""){
        Toast("Please enter your phone number");
      }else{
        console.log(state.phone);
        let dc=document.getElementById("verifyBtn");
        let count=60;
        // axios.post("http://121.199.54.43:8888/tourist/sendSMSVerificationCode?phone="+"852"+state.phone)
        axios.post("/tourist/sendSMSVerificationCode?phone="+"852"+state.phone)
        .then(function(response){
              // console.log(response);
          Toast(response.data.msg);
        });
      if(available){
          dc.classList.add("disable");
          dc.disabled=true;
          available=false;
          var timer=setInterval(function(){
            count-=1;
            dc.innerText="發送驗證碼("+count+")";
            if(count<=0){
              dc.classList.remove("disable");
              dc.innerText="發送驗證碼";
              available=true;
              dc.disabled=false;
              clearInterval(timer);
            }
          },1000);
        }
      }
    };

    const onSubmit = (values) => {
      console.log('submit', values);
      const data = {
        name: state.username+state.surname,
        email: state.email,
        phone: '852'+state.phone,
        password: md5(state.password),
        // code: state.code,
      }
      // console.log(data);
      const headers = {
        "Content-Type" : "application/json; charset=utf-8",
      }
      // axios.post("http://121.199.54.43:8888/tourist/register/v2.0", data, {headers})
      axios.post("/tourist/register/v2.0", data, {headers})
          .then(function(register_response){
            console.log(register_response);
            if(register_response.data.code==200){
              Toast("Success");
              window.location.href="./order";
            }else{
              Toast(register_response.data.msg);
            }
          })
          .catch(error => {
            console.error("There was an error!", error.message);
          });
    };
    return {
      state,
      onSubmit,
      sendSMS,
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.state.surname = value;
      console.log(this.value);
      this.showPicker = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
  text-align: center;
}
a {
  color: #42b983;
}
.form-group{
  height:280px;
  width:100%;
  background: white;
  font:16px/26px Georgia, Garamond, Serif;
  overflow:auto;
}
#verifyBtn.disable{
  pointer-events: none;
  background: grey;
  border: 1px grey solid;
}
#flux .content{
  padding: 0 10px;
}
</style>
