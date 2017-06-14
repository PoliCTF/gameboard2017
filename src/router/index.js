import Vue from 'vue'
import Router from 'vue-router'

import Challenge from '@/components/Challenge'
import Challenges from '@/components/Challenges'
import Leaderboard from '@/components/Leaderboard'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Challenges',
      component: Challenges
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
      props: (route) => ({ id: parseInt(route.params.id) })
    },
    {
      path: '/about',
      name: 'About',
      component: About
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
