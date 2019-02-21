<template>
	<div>
		<div class="header">
			<div class="up">
				<img src="../../static/img/mine_header_bg.png"/>
				<span>
					<router-link to="/login">登陆/注册</router-link>
				</span>
				<p class="inset">设置</p>
				<div class="ge"></div>
			</div>
			<ul class="list">
		    	<li>
		    		<img src="../../static/img/person_pay_icon.png"/>
		    		<span>待付款</span>
		    	</li>
		    	<li>
		    		<img src="../../static/img/person_goods_icon.png"/>
		    		<span>待收货</span>
		    	</li>
		    	<li>
		    		<img src="../../static/img/person_sale_icon.png"/>
		    		<span>售后</span>
		    	</li>
		    	<li>
		    		<img src="../../static/img/person_all_icon.png"/>
		    		<span>全部订单</span>
		    	</li>
		    </ul>
		</div>
		<ul class="content">
			<li style="margin-bottom: 2px;">
				<img src="../../static/img/persion_privilege_icon.png" width="23" height="18"/>
				<p>优惠劵</p>
				<i></i>
			</li>
			<li style="margin-bottom: 2px;">
				<img src="../../static/img/persion_colloct_icon.png" width="20" height="20"/>
				<p>我的收藏</p>
				<i></i>
			</li>
			<li style="margin-bottom: 3px;">
				<img src="../../static/img/persion_add_icon.png" width="20" height="20"/>
				<p>邀请有礼</p>
				<span>得佣金,最高拿奖<p>500</p>元</span>
				<i></i>
			</li>
			<li style="margin-bottom: 2px;">
				<img src="../../static/img/persion_bank_icon.png" width="22" height="18"/>
				<p>银行卡</p>
				<i></i>
			</li>
			<li style="margin-bottom: 10px;">
				<img src="../../static/img/persion_address_icon.png" width="17" height="20"/>
				<p>地址管理</p>
				<i></i>
			</li>
			<li style="margin-bottom: 2px;">
				<img src="../../static/img/persion_man_icon.png" width="20" height="20"/>
				<p>联系客服</p>
				<i></i>
			</li>
			<li>
				<img src="../../static/img/persion_help_icon.png" width="20" height="20"/>
				<p>投诉与反馈</p>
				<i></i>
			</li>
		</ul>
	</div>
</template>

<script>
		//导入我的组件
	export default{
		name:"my",
	}
</script>

<style scoped>
	a{color: white;text-decoration:none}
	ul{
		list-style: none;
	}
	.header{
		width: 100%;
		height: 533px;
		background: url(../../static/img/home_fragment_bg.png) no-repeat;
		background-size: 100%;
	}
	.up{
		width: 100%;
		height: 312px;
		position: relative;
		overflow: hidden;
	}
	.up>img{
		position: absolute;
		top: 90px;
		left:100px;
		width: 90px;
		height: 90px;
	}
	.up>span{
		margin-left: 240px;
		font-size:42px;
		color: white;
		line-height: 268px;
	}
	.up>p{
		display: block;
		position: absolute;
		top: 50px;
		right: 30px;
		font-size: 38px;
		color: white;
	}
	.ge{
		position: absolute;
		top: -775px;
		left: -850px;
		width: 2500px;
		height: 2000px;
		border-radius:50%;
		transform: translateY(50%);
		background: white;
	}
	.list{
		list-style: none;
		display: flex;
		width: 100%;
		height: 222px;
		flex-direction:row ;
		justify-content:space-around;
		background-color: white;
		border-bottom: 1px solid orange;
	}
	.list>li{
		padding-top: 50px;
		width: 100px;
		text-align: center;
	}
	.list>li>img{
		margin: 10px;
		width: 70px;
		height: 70px;
	}
	.content{
		padding-top:20px ;
		width: 100%;
		background-color: #F0F0F0;
	}
	.content>li{
		height: 90px;
		line-height: 90px;
		background-color: white;
		position: relative;
	}
	.content>li>img{
		margin: 20px 25px 25px 50px;
		vertical-align: middle;
	}
	.content>li>p{
		display: inline-block;
		font-size: 24px;
	}
	.content>li>span{
		position: absolute;
		top: 0;
		right: 70px;
		color: #777;
	}
	.content>li>span>p{
		display: inline-block;
		color: red;
	}
	.content>li>i{
		position: absolute;
		top: 30px;
		right: 30px;
		width: 30px;
		height: 90px;
		background: url(../../static/img/mine_login_arrow.png)no-repeat;
		background-size:100% ;
	}
</style>