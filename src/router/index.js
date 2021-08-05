import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Order from "../views/Order";
import Setting from "../views/Setting";
import OrderHistory from "../views/OrderHistory";
import Register from "../views/Register";
import AddressList from "../views/AddressList";
import Home from "../views/Home";
import Forget from "../views/ForgetPwd";
 
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/history',
    name: 'History',
    component: OrderHistory
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: AddressList
  },
  {
    path:'/forgetPassword',
    name:'ForgetPwd',
    component:Forget
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
