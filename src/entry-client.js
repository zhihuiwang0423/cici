import { createApp } from './main'
const { app, router, store } = createApp()
if (window.__INITIAL_STSTE__) {
  store.replaceState(window.__INITIAL_STSTE__)
}
router.onReady(() => {
  console.log('ready app')
  app.$mount('#app')
})
