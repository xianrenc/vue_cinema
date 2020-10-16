import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login'
// import SignUp from '../components/SignUp'

// import MovieManage from '../components/admin/MovieManage'
// import ScheduleManage from '../components/admin/ScheduleManage'
//
// import PromotionMange from '../components/admin/PromotionManage'
// import CinemaStatistic from '../components/admin/CinemaStatistic'
//
// import CinemaManage from '../components/admin/CinemaManage'
// import RefundManage from '../components/admin/RefundManage'
//
// import VipManage from '../components/admin/VipManage'
// import UserManage from '../components/admin/UserManage'
//
// import Movie from '../components/user/Movie'
// import MovieBuy from '../components/user/MovieBuy'
// import MovieDetail from '../components/user/MovieDetail'
//
// import Ticket from '../components/user/Ticket'
// import Member from '../components/user/Member'
// import History from '../components/user/History'
// import Info from '../components/user/Info'
//
// import Home from '../components/user/Home'

const Login = () => import(/* webpackChunkName: "group-login" */ '../components/Login')
const SignUp = () => import(/* webpackChunkName: "group-login" */ '../components/SignUp')
const Home = () => import(/* webpackChunkName: "group-user-home" */ '../components/user/Home')

const Admin = () => import(/* webpackChunkName: "group-admin" */ '../components/Admin')

const User = () => import(/* webpackChunkName: "group-user" */ '../components/User')

const MovieManage = () => import(/* webpackChunkName: "group-manage" */ '../components/admin/MovieManage')
const MovieDetail = () => import(/* webpackChunkName: "group-manage" */ '../components/admin/MovieDetail')
const ScheduleManage = () => import(/* webpackChunkName: "group-manage" */ '../components/admin/ScheduleManage')

const PromotionMange = () => import(/* webpackChunkName: "group-activity" */ '../components/admin/PromotionManage')
const CinemaStatistic = () => import(/* webpackChunkName: "group-activity" */ '../components/admin/CinemaStatistic')

const CinemaManage = () => import(/* webpackChunkName: "group-cinema" */ '../components/admin/CinemaManage')
const RefundManage = () => import(/* webpackChunkName: "group-cinema" */ '../components/admin/RefundManage')

const VipManage = () => import(/* webpackChunkName: "group-vip" */ '../components/admin/VipManage')
const UserManage = () => import(/* webpackChunkName: "group-user" */ '../components/admin/UserManage')

const Movie = () => import(/* webpackChunkName: "group-movie" */ '../components/user/Movie')
const MovieBuy = () => import(/* webpackChunkName: "group-movie" */ '../components/user/MovieBuy')
const MovieInfo = () => import(/* webpackChunkName: "group-movie-detail" */ '../components/user/MovieDetail')

const Ticket = () => import(/* webpackChunkName: "group-ticket" */ '../components/user/Ticket')
const Member = () => import(/* webpackChunkName: "group-member" */ '../components/user/Member')
const History = () => import(/* webpackChunkName: "group-history" */ '../components/user/History')
const Info = () => import(/* webpackChunkName: "group-info" */ '../components/user/Info')

const P404 = () => import(/* webpackChunkName: "group-404" */ '../components/404')
const P403 = () => import(/* webpackChunkName: "group-403" */ '../components/403')
// const Seat = () => import(/* webpackChunkName: "group-buy" */ '../components/user/ChooseSeat')
// const Pay = () => import(/* webpackChunkName: "group-buy" */ '../components/user/Pay')
// const Success = () => import(/* webpackChunkName: "group-buy" */ '../components/user/Success')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '*', component: P404 },
  { path: '/login', component: Login },
  { path: '/signUp', component: SignUp },
  { path: '/403', component: P403 },
  {
    path: '/admin',
    component: Admin,
    redirect: '/movieManage',
    children: [{
      path: '/movieManage',
      component: MovieManage,
      meta: { title: '电影管理' }
    },
    {
      path: '/movieDetail',
      component: MovieDetail,
      meta: { title: '电影详情' }
    },
    {
      path: '/scheduleManage',
      component: ScheduleManage,
      meta: { title: '排片管理' }
    },
    {
      path: '/promotionManage',
      component: PromotionMange,
      meta: { title: '活动管理' }
    },
    {
      path: '/cinemaManage',
      component: CinemaManage,
      meta: { title: '影院管理' }
    },
    {
      path: '/cinemaStatistic',
      component: CinemaStatistic,
      meta: { title: '影院统计' }
    },
    {
      path: '/refundManage',
      component: RefundManage,
      meta: { title: '票务管理' }
    },
    {
      path: '/vipManage',
      component: VipManage,
      meta: { title: '会员管理' }
    },
    {
      path: '/userManage',
      component: UserManage,
      meta: { title: '用户管理' }
    }]
  },
  {
    path: '/user',
    component: User,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/movie',
        component: Movie
      },
      {
        path: '/movieInfo',
        component: MovieInfo
      },
      {
        path: '/movieBuy',
        component: MovieBuy
      },
      {
        path: '/ticket',
        component: Ticket
      },
      {
        path: '/card',
        component: Member
      },
      {
        path: '/history',
        component: History
      },
      {
        path: '/info',
        component: Info
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else if (to.path === '/signUp') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  else if (to.path === '/movieManage') {
    if (tokenStr !== 'admin') return next('/403')
    return next()
  } else if (to.path === '/home') {
    if (tokenStr !== 'user') return next('/403')
    return next()
  }
  next()
})

export default router
