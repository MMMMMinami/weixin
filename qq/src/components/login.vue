<template>
	<div style="overflow: hidden;">
		<div class="title">
			<img src="../../static/img/btn_back.png" @click="back" >
			<router-link to="/zhuce">注册</router-link>
		</div>
		<h1>账号密码登陆</h1>
		<div class="srk">
			<i class="yh"></i>
			<input type="text" placeholder="请输入手机号"/>
			<i class="mm"></i>
			<input type="password" placeholder="请输入密码"/>
		</div>
		<div class="dlk">
			<button>登陆</button>
			<p>手机快捷登陆</p>
			<p class="dd">忘记密码?</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:"login",
		methods:{
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
			}
	}
</script>

<style scoped>
	.title{
		width: 100%;
		height: 80px;
		line-height: 80px;
	}
	.title>img{
		vertical-align: middle;
		margin-left: 30px;
		width: 20px;
		height: 30px;
		background-size: 100%;
	}
	.title>a{
		float: right;
		color: black;
		margin-right: 20px;
		font-size: 32px;
	}
	h1{
		margin: 50px 0 0 30px;
		width: 100%;
		height: 300px;
		font-weight: 100;
	}
	.srk{
		width: 100%;
		height: 200px;
		position: relative;
		overflow: hidden;
	}
	.srk>input{
		margin-bottom: 20px;
		padding: 0 120px;
		width:100%;
		height: 80px;
		font-size: 32px;
		border: transparent;
		outline: none;
		border-bottom: 1px solid #F0F0F0;
	}
	.srk>.yh{
		position: absolute;
		top: 10px;
		left: 40px;
		width: 50px;
		height: 50px;
		background: url(../../static/img/login_phone_icon.png)no-repeat;
		background-size: 100%;
	}
	.srk>.mm{
		position: absolute;
		bottom: 40px;
		left: 40px;
		width: 50px;
		height: 50px;
		background: url(../../static/img/login_key_icon.png)no-repeat;
		background-size: 100%;
	}
	.dlk{
		width: 100%;
		height: 600px;
		text-align: center;
		color: #999;
		font-size: 26px;
	}
	.dlk>button{
		margin:15% 5% 10%;
		width: 90%;
		height: 100px;
		color: white;
		border-radius: 10px;
		font-size: 36px;
		border: none;
		background-color:rgb(233,86,42);
	}
	.dlk>.dd{
		margin-top: 220px;
	}
</style>