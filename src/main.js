import { createApp } from 'vue'
import App from './App.vue'
import {Image, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Picker,Col, Row, Cell, CellGroup,Cascader,Switch,Button, Form, Field,NoticeBar, Tabbar, TabbarItem, NavBar, ActionBar,ActionBarIcon,ActionBarButton,Area} from 'vant'
import { Tab,Tabs } from 'vant'
import { Icon } from 'vant'
import {Popup} from 'vant'
import {Overlay} from 'vant'
import router from './router'
import axios from 'axios'

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

axios.defaults.baseURL="http://121.199.54.43:8888";
// axios.defaults.baseURL = 'http://192.168.100.103:8083';

app.mount('#app');
