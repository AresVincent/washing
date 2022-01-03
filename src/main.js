import { createApp } from 'vue'
import App from './App.vue'
import {Image, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Picker,Col, Row, Cell, CellGroup,Cascader,Switch,Button, Form, Field,NoticeBar, Tabbar, TabbarItem, NavBar, ActionBar,ActionBarIcon,ActionBarButton,Area} from 'vant'
import { Tab,Tabs } from 'vant'
import '@vant/touch-emulator'
import { Icon } from 'vant'
import {Popup} from 'vant'
import {Overlay} from 'vant'
import {Step,Steps} from 'vant'
import router from './router'
import axios from 'axios'
import {Loading} from "vant"
import { Divider } from 'vant';
// import baseUrl from './router/baseUrl'
import  "./assets/css/main.css"

const app = createApp(App).use(router);

app.use(Form);
app.use(Col);
app.use(Image);
app.use(Picker);
app.use(Row);
app.use(Cell);
app.use(CellGroup);
app.use(Field);
app.use(Checkbox);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(CheckboxGroup);
app.use(Switch);
app.use(Button);
app.use(Tabbar);
app.use(Overlay);
app.use(Popup);
app.use(Cascader);
app.use(TabbarItem);
app.use(NavBar);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(NoticeBar);
app.use(Area);
app.use(Tab);
app.use(Icon);
app.use(Tabs);
app.use(Step);
app.use(Steps);
app.use(Loading)
app.use(Divider)
axios.defaults.baseURL=process.env.VUE_APP_BASE_URL;
app.config.globalProperties.rentAmount=40;
app.config.globalProperties.homePickupFee=30;
app.config.globalProperties.homeTakeFee=12;

console.log(process.env);
app.mount('#app');
