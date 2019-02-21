<template>
	<div>
		<h1 class="ctitle">活动</h1>
		<div class="hdbox">
			<div class="xr">
				<i></i>
				<p>新人专享特特特价</p>
			</div>
			<div class="xp">
				<i></i>
				<p>移动品牌新选 比别人先用起来</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"cart",
		data(){
			return {
				list:""
			}
		},
		methods:{
			turn(goods_id){
				//跳转到详情页  把商品id传过去
				this.$router.push({name:"Details",params:{goods_id:goods_id}});
			},
			getData(){
				this.$axios({
					method:"get",//请求方式,
					url:"https://api.ymduo.com/Home/FootNews/lists",//请求地址,
					params:{},//get方式发送的数据
//					data:{}//post方式发送数据

				}).then(res=>{
					//res--返回的数据
					console.log(res);
				}).catch(err=>{
//					err--请求错误信息
				})
				
				
			}
		},
		mounted(){
			this.$axios({
				method:"post",
				url:"https://api.ymduo.com/Interface/recommendlists",
				data:{
					pf:1, 
					p:1
				}
			}).then(res=>{
				console.log(res);
				this.list=res.data.result.data;
			}).catch(err=>{
				
			})
			
		}
		
	}
</script>

<style>
	.ctitle{
		width: 100%;
		height: 120px;
		text-align: center;
		line-height: 120px;
		font-weight: 500;
		box-sizing: border-box;
	}
	.hdbox{
		width: 100%;
		height: 15rem;
		background-color: #F0F0F0;
	}
	.xr{
		margin: 5% 5% 20px 5%;
		width: 90%;
		height: 370px;
		background-color: white;
	}
	.xr>i{
		display: block;
		width: 100%;
		height: 290px;
		background: url(https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/a1bc5be6007240bf8dcb7d33ad87e188.png) no-repeat;
		background-size: 100%;
	}
	.xr>p{
		margin: 20px 15px;
		font-size: 32px;
	}
	.xp{
		margin: 5% 5% 20px 5%;
		width: 90%;
		height: 370px;
		background-color: white;
	}
	.xp>i{
		display: block;
		width: 100%;
		height: 290px;
		background: url(https://zhongyang-fws.oss-cn-hangzhou.aliyuncs.com/Banner/695179b5c5354f84800261861ef8e331.png) no-repeat;
		background-size: 100%;
	}
	.xp>p{
		margin: 20px 15px;
		font-size: 32px;
	}
</style>