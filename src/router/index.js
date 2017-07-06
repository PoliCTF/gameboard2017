import Vue from 'vue'
import Router from 'vue-router'
import Shared from '@/Shared'
import Challenge from '@/components/Challenge'
import Challenges from '@/components/Challenges'
import Leaderboard from '@/components/Leaderboard'
import Login from '@/components/Login'

Vue.use(Router)

function checkLoggedIn (to, from, next) {
  if (Shared.data.logged_in) {
    return next()
  } else {
    return next('/login')
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Challenges',
      component: Challenges,
      beforeEnter: checkLoggedIn
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard
    },
    {
      path: '/challenge/:id',
      name: 'Challenge',
      component: Challenge,
      beforeEnter: checkLoggedIn,
      props: (route) => ({ id: parseInt(route.params.id) })
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
