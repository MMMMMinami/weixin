<template>
	<div style="width:100%;height:100%;background-color: #F0F0F0;">
		<swiper :options="swiperOption" ref="mySwiper" >
		    <!-- slides -->
		    <swiper-slide >
		    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/a1bc5be6007240bf8dcb7d33ad87e188.png" />
		    </swiper-slide>
			<swiper-slide>
		    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/4eddf9cc11484ef0ab9d4a2a953d88b0.png" />
			</swiper-slide>
			<swiper-slide>
		    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/695179b5c5354f84800261861ef8e331.png" />
			</swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
		<ul class="list">
	    	<li>
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Navigation/683ce2a726d149c3b0160e16f682af1f.jpg"/>
	    	</li>
	    	<li>
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Navigation/df83057690de452b82eae6b950968822.jpg"/>
	    	</li>
	    	<li>
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Navigation/f69db292b8ce4e2e9ef95f894a735591.png"/>
	    	</li>
	    	<li>
	    		<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Navigation/ab928c05725345369620bd849f1ef462.jpg"/>
	    	</li>
	    </ul>
	    <div class="yz">
	    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Navigation/d84ea864a097462591e957a71bb19e90.gif"/>
	    </div>
	    <div class="xpq">
	    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Special/b6ba1894ee004517bac0303000b9e8b2.jpg"/>
	    	<div class="xpqlist" v-for="(item,index) in toparr" :key="index" @click="turn(item.id)" >
	    		<p class="xptitle" style="margin: 10px 10px 5px 30px;">{{item.shortTitle}}</p>
	    		<span class="xppic" style="margin-left: 30px;">¥{{item.price}}</span>
	    		<img :src="item.imgUrl"/>
	    	</div>
	    </div>
	    <div class="zkq">
	    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Special/661070f353d040f4b3cca092f84fcc49.jpg"/>
	    	<div class="zkqlist" v-for="(item,index) in centenarr" :key="index">
	    		<img :src="item.imgUrl"/>
	    		<span class="xppic">¥{{item.price}}</span>
	    		<p class="xptitle">{{item.shortTitle}}</p>
	    	</div>
	    </div>
	    <div class="cpq">
	    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Special/9d23507520054dd7843e58060c9a9848.jpg"/>
	    	<div class="cpqlist" v-for="(item,index) in bottmarr" :key="index">
	    		<img :src="item.imgUrl"/>
	    		<span class="xppic">¥{{item.price}}</span>
	    		<p class="xptitle">{{item.shortTitle}}</p>
	    	</div>
	    </div>
	    <div class="like">
	    	<img src="https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Special/7c35474ae5324a06b2e0d99f9bf0ab66.jpg"/>
	    	<div class="likelist" v-for="(item,index) in likearr" :key="index">
	    		<img :src="item.imgUrl"/>
	    		<p>{{item.goodsTitle}}</p>
	    		<span>¥{{item.price}}</span>
	    	</div>
	    </div>
	</div>
</template>

<script>
	export default{
		name:"home",
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
        	toparr:"",
			centenarr:"",
			bottmarr:"",
			likearr:""
			}
		},
		methods:{
			turn(goods_id){
				//跳转到详情页  把商品id传过去
				this.$router.push({name:"Details",params:{id:goods_id}});
			},
		},
		mounted(){
			this.$axios({
				method:"get",
				url:"./static/one.json"
			}).then(res=>{
				console.log(res);
				this.toparr=res.data.data[0].goodsList;
				this.centenarr=res.data.data[1].goodsList;
				this.bottmarr=res.data.data[2].goodsList;
				console.log(this.toparr);
			}).catch(err=>{
				
			}),
			this.$axios({
				method:"get",
				url:"./static/like.json"
			}).then(res=>{
				console.log(res);
				this.likearr=res.data.data.goodsList;
			}).catch(err=>{
				
			})
		}
		
	}
</script>

<style scoped>
	.swiper-container{
		width: 100%;
		height: 462px;
	}
	.swiper-container img{
		width: 100%;
		height: 462px;
		background-size: 100%;
	}
	.list{
		list-style: none;
		display: flex;
		width: 100%;
		height: 253px;
		flex-wrap: wrap;
		justify-content:space-around;
	}
	.list li{
		width: 25%;
		height: 253px;
	}
	.list li img{
		width: 100%;
		height: 100%;
	}
	.yz{
		width: 100%;
		height: 277px;
	}
	.yz img{
		width: 100%;
		height: 277px;
	}
	.xpq{
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
		width: 100%;
		height: 619px;
	}
	.xpq>img,.zkq>img,.cpq>img,.like>img{
		width: 100%;
		height: 89px;
	}
	.xpq>.xpqlist{
		width: 49%;
		height: 261px;
		background-color: white;
	}
	.xpq>.xpqlist>img{
		float: right;
		width: 200px;
		height: 180px;
	}
	.xptitle{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 30px;
	}
	.xppic{
		font-size: 30px;
		font-weight: 700;
		color: red;
	}
	.zkq{
		width: 100%;
		height: 691px;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
	}
	.zkqlist,.cpqlist{
		margin-bottom: 5px;
		width: 33%;
		text-align: center;
		background-color: white;
	}
	.zkqlist>img,.cpqlist>img{
		width: 200px;
		height: 200px;
	}
	.cpq{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
	}
	.like{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
	}
	.likelist{
		margin-bottom: 5px;
		width: 49%;
		height: 455px;
		background-color: white;
	}
	.likelist>img{
		display: block;
		margin: 30px auto;
		width: 250px;
		height: 250px;
	}
	.likelist>p{
		margin:10px 60px;
	}
	.likelist>span{
		margin-left: 60px;
		color: red;
		font-size: 30px;
		font-weight: 700;
	}
</style>