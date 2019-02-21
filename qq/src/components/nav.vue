<template>
	<div v-if="$store.state.footstyle">
		<div class="nav">
			<ul>
				<li v-for="(item,index) in navlist" :key="index" @click="changeNav(index)">
					<!--<router-link :to="item.url">-->
					<div @click="tiao(index)">
						<!--<i :class="item.isactive?item.tu:item.icon"></i>-->
						<img :src="item.isactive?item.tu2:item.tu1" />
						<p :style="item.isactive?{color:'black'}:{color:'#999'}">{{item.title}}</p>
					</div>
					<!--</router-link>-->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:"navs",
		data(){
			return{
				navlist:[
					{tu1:"../../static/img/home.png",tu2:"../../static/img/home2.png",title:"首页",url:"/home",icon:"iconfont icon-ziyuan1",iconactive:"iconfont icon-ziyuan",isactive:true},
					{tu1:"../../static/img/fenlei1.png",tu2:"../../static/img/fenlei.png",title:"分类",url:"/fenlei",icon:"iconfont icon-fenlei",iconactive:"iconfont icon-fenlei1",isactive:false},
					{tu1:"../../static/img/liwu.png",tu2:"../../static/img/liwu2.png",title:"活动",url:"/cart",icon:"iconfont icon-liwu",iconactive:"iconfont icon-liwu1",isactive:false},
					{tu1:"../../static/img/my.png",tu2:"../../static/img/my2.png",title:"我的",url:"/my",icon:"iconfont icon-wode1",iconactive:"iconfont icon-wode",isactive:false},
				]
			}
		},
		methods:{
			changeNav(index){
				for(var i=0;i<this.navlist.length;i++){
					this.navlist[i].isactive=false;
				}
				this.navlist[index].isactive=true;
			}
			,
			tiao(index){
				this.$router.push({path:this.navlist[index].url})
			}
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	.nav{
		width: 100%;
		height: 120px;
		position: fixed;
		background:white;
		bottom: 0;
		left: 0;
		margin: 0
	}
	.nav ul{
		height: 120px;
		display: flex;
		justify-content:space-around;
		align-items:center;
	}
	.nav ul li{
		height: 120px;
		justify-content:space-around;
		align-items:center;
		display: flex;
		flex-direction:column;
		text-align: center;
		font-size: 14px;
		/*color: #999;*/
	}
	.nav ul li img{
		width: 64px;
		height: 64px;
	}
	.nav ul li i{
		font-size: 40px;
	}
	.nav ul li p{
		font-size: 18px;
	}
	.nav ul li p{
		color: #999999;
	}
</style>