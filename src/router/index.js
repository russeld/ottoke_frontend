import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

export default function (/* { store, ssrContext } */) {
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  router.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalPush.call(this, location, onResolve, onReject)
    }
    return originalPush.call(this, location).catch((err) => {
      if (err.name === 'NavigationDuplicated') {
        // resolve err
        return err
      }
      // rethrow error
      return Promise.reject(err)
    })
  }

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (LocalStorage.getItem('api_key') == null) {
        next({
          name: 'login',
          params: { nextUrl: to.fullPath }
        })
      }
      next()
    } else if (to.matched.some(record => record.meta.guest)) {
      if (LocalStorage.getItem('api_key') == null) {
        next()
      } else {
        next({ name: 'task-page' })
      }
    } else {
      next()
    }
  })

  router.afterEach((to, from) => {
  })

  return router
}
