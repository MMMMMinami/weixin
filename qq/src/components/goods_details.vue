<template>
	<div style="background-color: #F0F0F0;">
		<div class="goodtitle">
			<i @click="back"></i>
			<i></i>
		</div>
		<swiper :options="swiperOption" ref="mySwiper" >
		    <!-- slides -->
		    <swiper-slide v-for="(item,index) in xqarr.goodsImages" :key="index">
		    	<img :src="item.imageUrl" />
		    </swiper-slide>
		    <div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
		<div class="xqbox">
			<p style="font-size: 18px;font-weight: 700;">{{xqarr.goodsTitle}}</p>
			<p style="font-size:14px;color: #999;">{{xqarr.subTitle}}</p>
			<span style="margin-left:15px;font-size:16px;color: red;">¥</span>
			<span style="font-size:22px;color: red;font-weight: 700;">{{xqarr.wzGoodsSpec.price}}</span>
		</div>
		<ul class="ps">
			<li>
				<span class="gd">已选</span>
				<span>{{xqarr.wzGoodsSpec.spec}}</span>
				<i></i>
			</li>
			<li>
				<span class="gd">服务</span>
				<span>七天无理由退换</span>
				<i></i>
			</li>
			<li style="margin: 10px 0;">
				<span class="gd">送至</span>
				<span></span>
				<i></i>
			</li>
		</ul>
		<div class="xqing">
			<p class="txt"><span>商品详情</span></p>
			<div v-html="xqarr.des.data" class="xqtu"></div>
		</div>
		<ul class="foot">
			<li>
				<img src="../../static/img/kefu_img.png"/>
				<p>客服</p>
			</li>
			<li @click="showCont">立即购买</li>
		</ul>
		<div class="tkbox" v-if="show">
			<div class="tk">
				<img :src="xqarr.goodsImages[0].imageUrl"/>
				<i @click="showCont"></i>
				<p style="margin-top: 30px;">
					<span style="margin-left:10px;font-size:16px;color: red;">¥</span>
					<span style="font-size:22px;color: red;font-weight: 700;">{{xqarr.wzGoodsSpec.price}}</span>
				</p>
				<p style="margin: 15px 0;text-indent: 10px;color: #999;">库存9527件</p>
			</div>
			<ul>颜色分类
				<li @click="teach" ref="info">{{xqarr.wzGoodsSpec.spec}}</li>
			</ul>
			<div class="gmsl">
				<span style="margin-left: 10px;">购买数量</span>
				<div class="you">
					<button @click="pdd">-</button>
					<span>{{count}}</span>
					<button @click="add">+</button>
				</div>
			</div>
			<div class="sure">
				<router-link to="/shopingcar"><button>确定</button></router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"goods_details",
		data(){
			return{
				show:false,
				lunarr:"",
				xqarr:"",
				count:1,
				swiperOption: {
					loop:true,
					autoplay: true,//可选选项，自动滑动
		          // some swiper options/callbacks
		          // 所有的参数同 swiper 官方 api 参数
					 pagination: {
	         			   el: '.swiper-pagination'
	        			},
		       	}
		    }
		},
		methods:{
			showCont:function(){
				this.show = !this.show;
			},
			add(){
					this.count++
//					this.totalCount=this.count*this.price;
			},
			pdd(){
					this.count--
			},
			back(){
				this.$store.commit("changeFoot",true);
				//route.params获取参数
				//回退上一页
				this.$router.go(-1);
			}
		},
		beforeMount(){
			//页面加载前 隐藏脚步
			this.$store.commit("changeFoot",false);
		},
		mounted(){
			console.log(this.$refs)
			//接受到传过来的id
			this.goods_id=this.$route.params.id;
			console.log(this.goods_id)
			this.$axios({
				method:"get",
				url:"./static/xq.json",
			}).then(res=>{
				console.log(res);
				var a =res.data;
//				console.log(feileiid)
				for(var i=0;i<a.length;i++){
					for(var n in a[i]){
						if(n==this.goods_id){
							console.log(n)
							this.xqarr=res.data[i][this.goods_id].data;
							console.log(this.xqarr)
						}
					}
				}
			})
		}
	}
</script>
<!--scoped 样式只在当前组件生效 -->
<style  lang="less">
	.swiper-container{
		width: 100%;
		height: 720px;
	}
	.swiper-container img{
		width: 100%;
		height: 720px;
	}
	.goodtitle{
		position: fixed;
		top: 0;
		width: 100%;
		height: 90px;
		line-height: 90px;
		z-index: 2;
	}
	.goodtitle>i:nth-child(1){
		margin: 30px;
		display: inline-block;
		width: 60px;
		height: 60px;
		background: url(../../static/img/btn-back.png)no-repeat;
		background-size:100% ;
		background-color: rgba(0,0,0,.3);
		border-radius: 50%;
	}
	/*.goodtitle>i:nth-child(2){
		float: right;
		margin: 30px;
		display: inline-block;
		width: 60px;
		height: 60px;
		background: url(../../static/img/goods_colloct_off.png)no-repeat;
		background-size:100% ;
	}*/
	.xqbox{
		width: 100%;
		height: 320px;
		background-color: white;
		overflow: hidden;
	}
	.xqbox>p{
		margin: 25px;
	}
	.ps{
		padding-top:20px ;
		width: 100%;
	}
	.ps>li{
		height: 90px;
		line-height: 90px;
		background-color: white;
		position: relative;
	}
	.ps>li>.gd{
		margin: 30px;
		font-size: 24px;
		color: #999;
	}
	.ps>li>i{
		position: absolute;
		top: 30px;
		right: 30px;
		width: 30px;
		height: 90px;
		background: url(../../static/img/mine_login_arrow.png)no-repeat;
		background-size:100% ;
	}
	.xqing{
		width: 100%;
		height: 100%;
		text-align: center;
		background-color: white;
		overflow: hidden;
	}
	.xqing>.txt{
		margin: 30px 0;
	}
	.xqing>p>span{
		border-bottom: 3px solid black;
	}
	.xqtu p img{
		width: 100%;
		height: 100%;
	}
	.tkbox{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 75%;
		background-color: white;
		z-index: 2;
	}
	.tk{
		width: 100%;
		height: 300px;
		overflow: hidden;
	}
	.tk>img{
		float: left;
		margin: 25px;
		width: 250px;
		height: 250px;
	}
	.tk>i{
		margin: 20px;
		float: right;
		width: 40px;
		height: 40px;
		background: url(../../static/img/icon_19_delete.png)no-repeat;
		background-size:100% ;
	}
	.tkbox>ul{
		padding: 40px 20px;
		width: 70%;
		font-size: 30px;
	}
	.tkbox>ul>li{
		margin: 20px;
		margin-left: 0;
		width: 140px;
		height: 70px;
		line-height: 70px;
		border-radius: 20px;
		background-color: #F0F0F0;
		text-align: center;
	}
	.gmsl{
		width: 100%;
		height: 100px;
		line-height: 100px;
		font-size: 28px;
		border-top:1px solid #F0F0F0;
		border-bottom:1px solid #F0F0F0;
		overflow: hidden;
	}
	.gmsl>.you{
		float: right;
		width: 200px;
	}
	.gmsl>.you>button{
		width: 50px;
		height: 45px;
		font-size: 40px;
		border-radius: 10px;
		color: #999;
		outline: none;
		background-color: #F0F0F0;
		border: none;
	}
	.gmsl>.you>span{
		display: inline-block;
		width: 70px;
		height: 50px;
		line-height: 50px;
		font-size: 35px;
		border-radius: 10px;
		text-align: center;
		color: black;
		outline: none;
		background-color: #F0F0F0;
		border: none;
	}
	.sure{
		padding: 10px 0;
		position: fixed;
		text-align: center;
		bottom: 0;
		width: 100%;
		height: 90px;
		border-top: 1px solid #F0F0F0;
	}
	.sure button{
		width: 90%;
		height: 90%;
		border: none;
		color: white;
		border-radius: 50px;
		font-size: 34px;
		background-color: orangered;
	}


	.foot{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 105px;
		z-index: 2;
	}
	.foot>li:nth-child(1){
		float: left;
		width: 25%;
		height: 200px;
		text-align: center;
		background-color: white;
	}
	.foot>li:nth-child(1)>img{
		margin-top:10px ;
		width: 50px;
		height: 50px;
	}
	.foot>li:nth-child(1)>p{
		font-size: 28px;
		font-weight: 700;
		color: #999;
	}
	.foot>li:nth-child(2){
		float: left;
		width: 75%;
		height: 200px;
		line-height: 100px;
		text-align: center;
		color: white;
		font-size: 35px;
		background-color: orangered;
	}
</style>