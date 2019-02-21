//main.js---用来管理index.html
import Vue from 'vue'
import router from './router'
import navCom from './components/nav'
Vue.config.productionTip = false;
//rem适配插件
import 'lib-flexible' 
//axios插件    
//安装 npm install axios --save
//引入 
import axios from 'axios';
//axios.defaults.headers.post['Content-Type'] = 'json; charset=utf-8';
//把axios 挂载到vue的原型
Vue.prototype.$axios=axios;
//导入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
//导入animate.css
import animate from 'animate.css'
Vue.use(animate);
//导入vuex插件
import Vuex from 'vuex';
Vue.use(Vuex);
//导入vue-scroller 插件   npm i vue-scroller --save
 import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)

import store from './vuex/store'

new Vue({
  el: '#app',
  router,
  store,
  data(){
  	return {
  		transitionName:"",
  		vflag:true
  	}
  },
  components:{
  	navCom
  },
  watch:{
  	//监控路由  to 去哪个路由  from从哪个路由来
			'$route' (to,from){
							console.log(to,from)
						　const toDepth = to.path.split("/").length;
						
		      　　　  const fromDepth = from.path.split("/").length;		      		
		      		this.transitionName=toDepth>fromDepth?"animated slideInLeft":"animated slideInRight"
			
			}
  }
})
