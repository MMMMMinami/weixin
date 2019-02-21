<template>
	<div>
		<div class="title">
			<img src="../../../static/img/btn_back.png" @click="back">
			<span>全部分类</span>
		</div>
		<div class="navbox">
			<ul class="flnav">
				<li v-for="(item,index) in fenlarr" :key="index">
					<span>{{item.classifyName}}</span>
				</li>
			</ul>
		</div>
		<div class="fllist">
			<div class="box" v-for="(item,index) in fenleiarr" :key="index" @click="turn(item.id)">
				<img :src="item.imgUrl"/>
				<p>{{item.goodsTitle}}</p>
				<span>¥{{item.price}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"csm",
		data(){
			return{
				fenlarr:"",
				indexs:"",
	       		fenleiarr:""
		  	}
		},
		methods:{
			turn(goods_id){
				//跳转到详情页  把商品id传过去
				this.$router.push({name:"Details",params:{id:goods_id}});
			},
//			turn(index){
//				this.indexs=index;
//				console.log(this.indexs)
//			},
			back(){
				this.$store.commit("changeFoot",true);
				//route.params获取参数
				//回退上一页
				this.$router.go(-1);
				},
			tiao(index){
				this.$router.push({path:this.fenlarr[index]})
				console.log(this.$router.push({path:this.fenlarr[index]}))
				}
			},
		beforeMount(){
				//页面加载前 隐藏脚步
				this.$store.commit("changeFoot",false);
		},
		mounted(){
			this.fenleiid=this.$route.params.fenleiid;
			console.log(this.fenleiid)
			this.$axios({
				method:"get",
				url:"./static/fenlei.json",

			}).then(res=>{
//				console.log(res);
				var a =res.data;
//				console.log(feileiid)
				for(var i=0;i<a.length;i++){
					for(var n in a[i]){
						if(n==this.fenleiid){
							console.log(n)
							this.fenleiarr=res.data[i][this.fenleiid].data;
							console.log(this.fenleiarr)
						}
					}
				}
			}),
			this.$axios({
				method:"get",
				url:"./static/fenl.json"
			}).then(res=>{
//				console.log(res);
				this.fenlarr=res.data.data;
			}).catch(err=>{
				
			})
		}
	}
</script>

<style scoped lang="less">
	.title{
		position: relative;
		width: 100%;
		height: 90px;
		line-height: 90px;
		text-align: center;
		font-size: 36px;
	}
	.title>img{
		position: absolute;
		top: 23px;
		left: 30px;
		width: 30px;
		height: 40px;
		background-size: 100%;
	}
	.navbox{
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		overflow: scroll;
		ul{
			list-style: none;
			display: flex;
			align-items: center;
			li{
				width: 175px;
				height: 80px;
				line-height: 80px;
				text-align: center;
				font-size: 30px;
				color: #999;
				span{
					display: inline-block;
				}
			}
		}
	}
	.fllist{
		padding-top: 2px;
		display: flex;
		width: 100%;
		height: 100%;
		background-color: #F0F0F0;
		flex-wrap: wrap;
		justify-content:space-around;
	}
	.fllist>.box{
		margin-bottom: 5px;
		width: 49%;
		height: 550px;
		background-color: white;
		img{
			width: 360px;
			height: 360px;
		}
		p{	
			padding:0 20px;
			font-size: 30px;
		}
		span{
			display: block;
			margin: 20px;
			font-size: 30px;
			font-weight: 700;
			color: red;
		}
	}
	
</style>