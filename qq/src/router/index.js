import Vue from 'vue'
import Router from 'vue-router'
// @--在webpack中把@定义为src文件夹 
import HelloWorld from '@/components/HelloWorld'
//导入组件
import Home from '@/components/home'
import Fenlei from '@/components/fenlei'
import Cart from '@/components/cart'
import My from '@/components/my'
import Login from '@/components/login'
import Zhuce from '@/components/zhuce'
import Shoping from '@/components/shopingcar'
//导入分类详情组件
import Csm from '@/components/fenlei/csm'
import Rec from '@/components/fenlei/rec'
//import Mzhf from '@/components/fenlei/mzhf'
//import Jydq from '@/components/fenlei/jydq'
//import Xbps from '@/components/fenlei/xbps'
//import Hwyd from '@/components/fenlei/hwyd'
//import Jjgh from '@/components/fenlei/jjgh'
//import Xcdp from '@/components/fenlei/xcdp'
//import Hhtj from '@/components/fenlei/hhtj'
//import Rqbk from '@/components/fenlei/rqbk'


//导入详情页
import GoodsDeatils from '@/components/goods_details'

//Vue.使用路由插件
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      //重定向到首页
			redirect:"/home"
    },
    {
    	path:"/home",
    	name: 'Home',
    	component:Home
    },
     {
    	path:"/fenlei/:Fid?",
    	name: 'Fenlei',
    	component:Fenlei,
    	//二级路由
    	children:[
	    		{//衣服路由
	    			path:"rec",
	    			name:"Rec",
	    			component:Rec
	    		},
//	    		{//鞋子路由
//	    			path:"mzhf",
//	    			name:"Mzhf",
//	    			component:Mzhf
//	    		},
//	    		{//鞋子路由
//	    			path:"jydq",
//	    			name:"Jydq",
//	    			component:Jydq
//	    		},
//	    		{//鞋子路由
//	    			path:"xbps",
//	    			name:"Xbps",
//	    			component:Xbps
//	    		},
//	    		{//鞋子路由
//	    			path:"hwyd",
//	    			name:"Hwyd",
//	    			component:Hwyd
//	    		},
//	    		{//鞋子路由
//	    			path:"jjgh",
//	    			name:"Jjgh",
//	    			component:Jjgh
//	    		},
//	    		{//鞋子路由
//	    			path:"xcdp",
//	    			name:"Xcdp",
//	    			component:Xcdp
//	    		},
//	    		{//鞋子路由
//	    			path:"hhtj",
//	    			name:"Hhtj",
//	    			component:Hhtj
//	    		},
//	    		{//鞋子路由
//	    			path:"rqbk",
//	    			name:"Rqbk",
//	    			component:Rqbk
//	    		},
    	]
    },
     {
    	path:"/cart",
    	name: 'Cart',
    	component:Cart
    },
     {
     	//动态的参数设置 :userId  :userName
     	//参数 ?  非必传参数 
    	path:"/my/:userId?/:userName?",
    	name: 'My',
    	component:My,
    	meta:{
    		keep_alive:true
    	}
    },
    {
    	path:"/details/:id?",
    	name:"Details",
    	component:GoodsDeatils
    },
    {
    	path:"/login",
    	name:"Login",
    	component:Login
    },
    {
    	path:"/zhuce",
    	name:"Zhuce",
    	component:Zhuce
    },
    {//详情路由
			path:"/csm/:fenleiid?",
			name:"Csm",
			component:Csm
		},
		{
    	path:"/shopingcar",
    	name:"Shoping",
    	component:Shoping
    }
  ]
})
