<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!--<div class="good_list">
			<ul >
				<li v-for="(item,index) in list" :key="index" @click="turn(item.goods_id)"  :pid="item.goods_id"  >
					<div><img :src="item.image"/></div>
					<div>
						<p>{{item.goods_name}}</p>
					</div>
					<div class="price">￥{{item.price}}</div>
					<div><span>月销量{{item.pay_num}}</span><span>免邮费</span></div>
				</li>
				
				
			</ul>
		</div>-->
  	 <login-com></login-com>
  </div>
</template>

<script>
	//单个导入的aa函数
	import {aa} from '../router/a'
	//单个导入的x变量
	import {x} from '../router/a'
	//导入export default 下的对象
	import  routera from "../router/a";
	//导入登录组件
	import loginCom from './login'
	
	console.log(x);
	console.log(aa);
	console.log(routera)
//	routera.aa();
//	aa();

//每个组件默认全部导出
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '我是helloWorld组件'
    }
  },
  //注册组件
  components:{
 		 	loginCom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
	.good_list ul{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		
	}
	.good_list ul img{
		width: 337px;
		height: 337px;
		border-radius: 10px;
	}
	.good_list ul li{
		width: 337px;
		height: 540px;
	}
	.price{
		color: red;
	}
	.good_list ul li div {
		margin-top: 10px;
	}
	.good_list ul li div:nth-of-type(2){
		font-size: 28px;
	}
	.good_list ul li div:last-child{
		display: flex;
		justify-content: space-between;
	}
</style>
