import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Post from './components/Post.vue'
import Hello from './components/Hello.vue'
import Information from './components/Information.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'home',
      component:Hello,
      props: (route) => ({
        company: route.query.company
      })
    },
    {
      path:'/post',
      name:'post',
      component:Post,
    },
    {
      path:'/information',
      name:'information',
      component:Information,
      props: (route) => ({
        company: route.query.company,
        id: route.query.id
      })
    },
  ]
})

var mainApp = new Vue({
  el: '#app',

  render: h => h(App),
  router
})
