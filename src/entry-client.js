import { createApp } from './main'
const { app, router } = createApp()
router.onReady(() => {
  console.log('ready app')
  app.$mount('#app')
})
