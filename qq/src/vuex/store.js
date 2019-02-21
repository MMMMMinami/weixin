//vuex
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


//公用状态管理
const state={
	count:1,
	list:["111","222","333"],
	footstyle:true
}

//// 公用的函数  用来改变公用状态
const mutations={
	add(state,num,name){
		state.count+=num;
	},
	//改变脚步的函数
	changeFoot(state,txt){
		state.footstyle=txt;
	}
	
}


//导出
export default new Vuex.Store({
	state,
	mutations
})
