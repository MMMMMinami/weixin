<template>
	<div style="overflow: hidden;">
		<div class="title">
			<img src="../../static/img/btn_back.png" @click="back" >
		</div>
		<h1>用户注册</h1>
		<div class="srk">
			<i class="yh"></i>
			<input type="text"  placeholder="请输入手机号" ref="username"/>
			<i class="mm"></i>
			<input type="password" placeholder="请输入6-16位密码" ref="userpassword"/>
		<br />
		<span v-if="!flag" style="color: red;font-size: 14px;margin: 30px;">没有同意协议，账号或者密码格式不对</span>
		</div>
		<div class="dlk">
			<p style="text-indent: 30px;">点击注册即视为同意
				<router-link to="/login">《用户服务协议》</router-link>
				<router-link to="/login">《授权协议》</router-link>
			</p>
			<button @click="tomylogin">注册</button>
		</div>
	</div>
</template>

<script>
	export default{
		name:"zhuce",
		data(){
			return{
				flag:true,
			}
		},
		methods:{
			back(){
				this.$store.commit("changeFoot",true);
				//route.params获取参数
				//回退上一页
				this.$router.go(-1);
			},
			beforeMount(){
				//页面加载前 隐藏脚步
				this.$store.commit("changeFoot",false);
			},
			tomylogin(){
				//注册账号长度
				var a = this.$refs.username.value.trim().length;
				//注册密码长度
				var b = this.$refs.userpassword.value.trim().length;
				//是否同意协议
//				var c = this.$refs.check.checked;
				if(a==11){
					if(b>=6&&b<=20){
//						if(c==true){
							//localStorage.setItem(this.$refs.username.value.trim(),'true'+'='+this.$refs.userpassword.value.trim());
							//存在数据库
							this.$axios({
								method:"post",
								url:"/users/reg",
								data:{
									userName:this.$refs.username.value.trim(),
									password:this.$refs.userpassword.value.trim(),
									money:0,
									score:0,
								}
							}).then(res=>{
								console.log(res);
							}).catch(err=>{
												
							});
							this.$router.push({name:"Login"});
							this.$store.commit("changeFoot",true);
							this.$router.go(-1);		
							this.flag=true;
//						}else if(c==false){
//							this.flag=false;
//						}
					}else{
						this.flag=false;
					}	
				}else{
					this.flag=false;
				}
			}
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
	h1{
		margin: 50px 0 0 30px;
		width: 100%;
		height: 300px;
		font-weight: 100;
	}
	.srk{
		margin: 0 3%;
		width: 94%;
		height: 240px;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}
	a{color: royalblue;}
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
		bottom: 65px;
		left: 40px;
		width: 50px;
		height: 50px;
		background: url(../../static/img/login_key_icon.png)no-repeat;
		background-size: 100%;
	}
	.dlk{
		width: 100%;
		height: 600px;
		color: #999;
		font-size: 26px;
		overflow: hidden;
	}
	.dlk>button{
		margin:15% 5% 10%;
		width: 90%;
		height: 100px;
		text-align: center;
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