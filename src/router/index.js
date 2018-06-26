import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
// import Top from '@/components/top'
Vue.use(Router)
const createTopList = id => () => import('../views/CreateTopList').then(m => m.default(id))
export function CreateRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: createTopList('top')
      },
      {
        path: '/test',
        name: 'Test',
        component: Test
      },
      {
        path: '/top',
        name: 'Top',
        component: createTopList('createList')
      }
    ]
  })
}
