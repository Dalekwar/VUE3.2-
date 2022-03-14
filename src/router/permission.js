import router from './index'
import store from '@/store'
import { clearPending } from '@/api/request'

const whiteList = ['/login']
// 全局路由守卫
router.beforeEach((to, from, next) => {
  clearPending()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
