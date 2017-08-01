


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Axios from 'axios'
Vue.use(ElementUI)
import router from './router'


Vue.config.productionTip = false

Vue.prototype.$http = Axios


router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('demo-token');
  if(to.path == '/'){
    if(token != 'null' && token != null){
      next('/todolist')
    }
    next();
  }else{
    if(token != 'null' && token != null){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
      next()
    }else{
      next('/')
    }
  }

})

global.router=router;
new Vue({
  router: router, // 启用router
  render: h => h(App)
}).$mount('#app')


