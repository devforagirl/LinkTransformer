import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AutoComp from '../components/AutoComps/AutoComp.vue'
import IP2LComp from '../components/IP2LComps/IP2LComp.vue'
import IP2LRangeComp from '../components/IP2LRangeComps/IP2LRangeComp.vue'
import L2IPComp from '../components/L2IPComps/L2IPComp.vue'
import L2LComp from '../components/L2LComps/L2LComp.vue'
import CompareComp from '../components/CompareComps/CompareComp.vue'
import ModifyComp from '../components/ModifyComps/ModifyComp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'option1',
        components: {
          a: AutoComp
        }
      },
      {
        path: 'option2',
        components: {
          a: IP2LComp
        }
      },
      {
        path: 'option3',
        components: {
          a: L2IPComp
        }
      },
      {
        path: 'option4',
        components: {
          a: L2LComp
        }
      },
      {
        path: 'option5',
        components: {
          a: CompareComp
        }
      },
      {
        path: 'option6',
        components: {
          a: ModifyComp
        }
      },
      {
        path: 'option7',
        components: {
          a: IP2LRangeComp
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
