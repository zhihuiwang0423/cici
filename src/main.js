// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { CreateRouter } from './router'
import { CreateStore } from './store'
import { sync } from 'vuex-router-sync'
Vue.config.productionTip = false
export function createApp () {
  const router = new CreateRouter()
  const store = new CreateStore()
  // 同步路由状态route state 到store
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   Router,
//   components: { App },
//   template: '<App/>'
// })
