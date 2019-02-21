<template>
	<div>
		<h1 class="ctitle">分类</h1>
		<swiper :options="swiperOption" ref="mySwiper" >
		    <!-- slides -->
		    <swiper-slide >
		    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/2221403393b94ba28c22fc5a1ac4e360.png" />
		    </swiper-slide>
			<swiper-slide>
		    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/68c39e94243a46eebd0d268b5d7043d3.png" />
			</swiper-slide>
			<swiper-slide>
		    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/319bb347f8cc480993514ede9d9aa581.jpg" />
			</swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
		<div class="fenl">
	    	<div class="fenlist" v-for="(item,index) in fenlarr" :key="index" @click="turn(item.classifyNo)">
	    		<img :src="item.imageUrl"/>
	    		<p>{{item.classifyName}}</p>
	    	</div>
	    	<!--<div class="fenlist">
				<router-link to="/fenlei/rec">
	    			<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/3d8130f0fb524769b21917d024b93679.png"/>
	    			<p>3C数码</p>
	    		</router-link>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/8a7f14c4668743ac954d94dcd0cd0a68.png"/>
	    		<p>美妆护肤</p>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/e0f3f9ddada740569362fc32bc499081.png"/>
	    		<p>家用电器</p>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/f6533d387e1d44c2969f01a2f8748759.png"/>
	    		<p>箱包配饰</p>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/73257540065b4f71a0332be4fc85c773.png"/>
	    		<p>户外运动</p>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/d831e1c3cb114de69d3b5bae3c6fd358.png"/>
	    		<p>家居个护</p>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/e4754748627d4fa7b2477e052c949fca.png"/>
	    		<p>新潮单品</p>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/e156253206344c2b83fff360916531c7.png"/>
	    		<p>好货推荐</p>
	    	</div>
	    	<div class="fenlist">
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/classify/a161e670809f45f0ac6c38b5ce36f5cd.png"/>
	    		<p>人气爆款</p>
	    	</div>-->
	    </div>
	</div>
</template>

<script >
	//导入我的组件
	export default{
		name:"fenlei",
		data(){
			return{
				swiperOption: {
					autoplay: true,//可选选项，自动滑动
		          // some swiper options/callbacks
		          // 所有的参数同 swiper 官方 api 参数
					 pagination: {
	         			   el: '.swiper-pagination'
			        },
	        		loop:true
	        	},
	        	fenlarr:""
		   }
		},
		methods:{
			turn(id){
				this.$router.push({name:"Csm",params:{fenleiid:id}})
			}
		},
		mounted(){
			this.$axios({
				method:"get",
				url:"./static/fenl.json"
			}).then(res=>{
				console.log(res);
				this.fenlarr=res.data.data;
			}).catch(err=>{
				
			})
		}
	}
</script>

<style scoped>
	.ctitle{
		width: 100%;
		height: 120px;
		text-align: center;
		line-height: 120px;
		font-weight: 500;
		box-sizing: border-box;
	}
	.swiper-container{
		width: 100%;
		height: 255px;
	}
	.swiper-container img{
		margin: 4%;
		width: 92%;
		height: 255px;
		border-radius:10px ;
		background-size: 100%;
	}
	.fenl{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
	}
	.fenlist{
		width: 33.3333%;
		height: 250px;
		text-align: center;
		font-size: 28px;
	}
	.fenlist a{
		color: black;
	}
	.fenlist img{
		margin: 10%;
		width: 150px;
		height: 150px;
	}
</style>