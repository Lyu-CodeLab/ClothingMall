import Vue from "vue";
import VueRouter from "vue-router";

const Cart = () => import('views/cart/Cart')
const Home = () => import('views/home/Home')
const Profile = () => import('views/profile/Profile')
const Category = () => import('views/category/Category')
const Detail = () => import('views/detail/Detail')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopCart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  }
];
export default new VueRouter(
  {
    routes,
    mode: 'hash'
  }
)
