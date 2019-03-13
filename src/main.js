import Vue from 'vue'
import App from './App.vue'
import All from './All.vue'
import Level from './Level.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: All },
    { path: '/lvl/:id', component: Level, props: true },
    {
      path: '*',
      component: {
        render (h) { return h('div', '404. Not Found.') }
      }
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
