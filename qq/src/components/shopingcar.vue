<template>
	<div>
		<!--<h1>购物车</h1>-->
		<div class="carhead">
			<div class="cartitle">
				<span>购物车</span>
				<span @click="change" v-if='flag'>编辑</span>
				<span @click="change" v-if='!flag'>保存</span>
			</div>
		</div>
		<div class="cargoods" v-if="carshoplist.length>0">
			<ul>
				<li v-for="(item, index) in carshoplist" :key="index"  @click="trun(item.id)">
					<input type="checkbox"  @click.stop="cheaked" ref="cheak" />
					<img :src='"http://www.maicaibei.com"+item.imgsrc'/>
					
					<div>
						<p>{{item.pname}}</p>
						<p>{{item.describe}}</p>
						<div><span>￥{{item.price}}</span>
							  <div><span @click.stop="sub(index)">-</span>
							  		<!--<span>{{item.activityed}}</span>-->
							  		<span ref='geshu'>{{item.count}}</span>
							  		<!--<span @click.stop="add(index)">+</span>-->
							  		<span @click.stop="add(index)">+</span>
							  </div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="carbuy" v-if="carshoplist.length>0">
			<div class="cartitle" v-if="flag">
				<div><input type="checkbox" ref='all' @click="checkall" />全选</div>
				<div>合计：￥{{countt}}<span></span></div>
				<div @click="buy">结算</div>
			</div>
			<div class="cardel"v-if="!flag">
				<div><input type="checkbox" ref='all' @click="checkall"/>全选</div>
				<div @click="del">删除</div>
			</div>
		</div>
		
		
	</div>	
</template>

<script>
	export default{
		name:"car",
		data(){
			return{
				//购物车商品
				carshoplist:[],
				//标志变换
				flag:true,
				//商品总价初始
				count:'0.00',
				//勾选框数组
				cheaklist:[],
				//商品个数数组
				geshulist:[],
			}
		},
		methods:{
			
			//跳转详情页
			trun(ID){
				this.$router.push({name:"Details",params:{id:ID}});
				this.$store.commit("changeFoot",false);
			},
			
			//减少
			sub(index){
				if(this.$refs.geshu[index].innerText==0){
					this.$refs.geshu[index].innerText=0;
					this.carshoplist[index].count=0;
				}else{
					
					this.$refs.geshu[index].innerText--;
					this.carshoplist[index].count=this.$refs.geshu[index].innerText
				}
				this.$axios({
						method:"post",
						url:"/product/addsubProduct",
						data:{
							username:this.$store.state.loginuser.name,
							count:this.$refs.geshu[index].innerText,
							id:this.carshoplist[index].id,
//							
						}
					}).then(res=>{
						
						//console.log(res);
						//this.carshoplist=res.data;
					}).catch(err=>{
													
					});	
			},
			
			//增加
			add(index){
				this.$refs.geshu[index].innerText++;
				this.carshoplist[index].count=this.$refs.geshu[index].innerText
				this.$axios({
						method:"post",
						url:"/product/addsubProduct",
						data:{
							username:this.$store.state.loginuser.name,
							count:this.$refs.geshu[index].innerText,
							id:this.carshoplist[index].id,
						}
				}).then(res=>{
					
					//console.log(res);
					//this.carshoplist=res.data;
				}).catch(err=>{
												
				});	
				
			},
			
			//变换删除或者购买
			change(){
				this.flag=!this.flag;

			},
			
			//购买
			buy(){
				//设置购买总价
				var sum=0;
				this.$store.state.buyshoplist=[];
				for(var i =0; i<this.$refs.cheak.length;i++){
					if(this.$refs.cheak[i].checked){
						sum+=this.carshoplist[i].count*this.carshoplist[i].price;
						this.$store.state.buyshoplist.push(this.carshoplist[i]);
						//console.log(this.carshoplist[i])
						this.$router.push({name:"Buy"});
					}
				}
				this.$store.state.countt=sum.toFixed(2);
				
			},
			
			
			
			//点击单个按钮
			cheaked(){
				//清空数据，不然会叠加
				this.cheaklist =[];
				//设置空数据，用于装打上勾的选择框
				var b=[];
				
				//遍历勾选框
				for(var i =0; i<this.$refs.cheak.length;i++){
					this.cheaklist.push(this.$refs.cheak[i].checked);
				}
				
				//遍历打上勾的勾选框
				for(var i =0 ; i<this.cheaklist.length;i++){
					if(this.cheaklist[i]==true){
						b.push(this.cheaklist[i]);
					}
				}
				
				//判断打上勾的勾选框和总的勾选框
				if(b.length==this.cheaklist.length){
					this.$refs.all.checked=true
				}else{
					this.$refs.all.checked=false
				}
			},
			
			//点击全选
			checkall(){
					//清空数据，不然会叠加
					this.cheaklist =[];
					//当打上勾时，所有勾选框都打上
					if(this.$refs.all.checked){
						for(var i =0; i<this.$refs.cheak.length;i++){
							this.$refs.cheak[i].checked=true;
							this.cheaklist.push(this.$refs.cheak[i].checked);
						}
						
					}else if(this.$refs.all.checked==false){
						for(var i =0; i<this.$refs.cheak.length;i++){
								this.$refs.cheak[i].checked=false;
								this.cheaklist.push(this.$refs.cheak[i].checked);
						}
					}
			},
			
			//删除
			del(){
				var a=confirm("确定删除？");
				 
				if (a==true) {
					//设置变量空数组
					var brr = [];
					//用brr来装勾上的元素
					for(var j =0; j<this.carshoplist.length;j++){
						if(this.cheaklist[j]==true){
							brr.push(this.carshoplist[j]);
							
						}
						
					}
					
					//将勾数组清空，删除完后将所有勾选框变为false，重新装进勾数组中
					this.cheaklist=[];
					for(var i =0; i<brr.length;i++){
						for(var j =0; j<this.carshoplist.length;j++){
							this.$refs.cheak[j].checked=false;
							if(this.carshoplist[j]==brr[i]){
//								localStorage.removeItem(this.carshoplist[j].name);
								this.$axios({
										method:"post",
										url:"/product/delProduct",
										data:{
											username:this.$store.state.loginuser.name,
											id:this.carshoplist[j].id,
										}
								}).then(res=>{
									
									//console.log(res);
									
								}).catch(err=>{
																
								});	
								this.carshoplist.splice(j,1);
								
							}else{
								this.cheaklist.push(this.$refs.cheak[j].checked);
							}
						
						}
						
					}
				}
			},
		},
		computed: {
			//商品总价
			countt(){
				this.count=0.00;
				for(var i =0; i<this.carshoplist.length;i++){
					if(this.cheaklist[i]==true){
						this.count+=this.carshoplist[i].price*this.carshoplist[i].count;
					}
				}
				 return this.count.toFixed(2);
			},
			
			 
			
		},
		mounted(){
//			//请求所有商品
//			this.$axios({
//				url:"./static/json/goodsdetails.json",
//				method:"get",
//			}).then(res=>{
//					//设置空数组装存储的ID
//					var a =[];
//					//空数组装存储的个数
//					this.geshulist=[];
//					for(var i =0 ; i< localStorage.length;i++){
//						//判断是不是账号
//						if(localStorage.key(i)!=this.$store.state.loginuser.name){
//							//判断是不是商品
//							if(localStorage.getItem(localStorage.key(i))!='WARN'){
//								//判断是不是收藏
//								if(localStorage.key(i).split("=")[1]!="收藏"){
//									//存放商品ID
//									a.push(localStorage.getItem(localStorage.key(i)).split("=")[0]);
//									//存放商品个数
//									this.geshulist.push(localStorage.getItem(localStorage.key(i)).split("=")[1]);
//								}
//							}
//						}
//					}
//					
//					//遍历所有商品，和存储的商品ID是否相同，存在商品列表中
//					for(var i =0 ; i< res.data.length;i++){
//						for(var j =0 ; j<a.length;j++){
//							if(a[j]==res.data[i].data.id){
//								//console.log(res.data[i].data);
//								this.carshoplist.push(res.data[i].data);
//							}
//						}
//					}
//			
//			}).catch(res=>{
//			})
				
			this.$axios({
						method:"post",
						url:"/product/productList",
						data:{
							username:this.$store.state.loginuser.name,
//							pname:this.goods.name,
//							price:this.goods.money,
//							imgsrc:this.goods.pictures[0].url,
//							describe:this.goods.describe,
//							count:1,
//							id:this.goods.id,
//							action:'add'
						}
				}).then(res=>{
					
					//console.log(res);
					this.carshoplist=res.data;
					this.$store.state.carshoplist=this.carshoplist;
				}).catch(err=>{
												
				});	
			
		}

	}
</script>

<style scoped lang="less">
	.carhead{
		width: 100%;
		height: 110px;
		/*background: pink;*/
		.cartitle{
			position: fixed;
			width: 100%;
			height: 110px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ff74a5;
			span{
				color: white;
				font-size: 40px;
				&:nth-child(2){
					position: absolute;
					right: 30px;
				}
			}
		}
	}
	
	.carbuy{
		width: 100%;
		height: 110px;
		.cartitle{
			position: fixed;
			bottom: 96px;
			width: 100%;
			height: 110px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			div{
				flex: 1;
				font-size: 40px;
				display: flex;
				justify-content: center;
				background: white;
				height: 100%;
				align-items: center;
				&:nth-child(2){
					justify-content: flex-start;
					flex: 2;
				}
				&:nth-child(3){
					color: white;
					background: #ff74a5;
				}
			}
			
		}
		.cardel{
			position: fixed;
			bottom: 96px;
			width: 100%;
			height: 110px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			div{
				flex: 1;
				font-size: 40px;
				display: flex;
				justify-content: center;
				background: white;
				height: 100%;
				align-items: center;
				&:nth-child(1){
					flex: 3;
				}
				&:nth-child(2){
					color: white;
					background: #ff74a5;
				}
			}
			
		}
	}
	
	
	
	
	.cargoods{
			width: 100%;
			margin-top: 10px;
			margin-bottom:100px ;
			overflow-y: scroll;
			
			ul{
				width: 100%;
				list-style: none;
				li{
					width: 100%;
					display: flex;
					align-items: center;
					border-top:2px solid silver ;
					padding: 10px 0;
					box-sizing: border-box;
					&:nth-child(1){
						border: none;
					}
					input{
						width: 10%;
						height: 40px;
						margin-left: 10px;
					}
					img{
						width: 25%;
						height: 190px;
						
					}
					div{
						width: 65%;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						p{
						width: 95%;
						white-space:nowrap;/*强制不换行*/
						overflow:hidden;/*超出部分隐藏*/
						text-overflow:ellipsis;/*让超出的文本以省略号的形式显示*/
						padding-left:10px;
						box-sizing: border-box;
						&:nth-child(1){
							font-size:35px;
							
						}
						&:nth-child(2){
							font-size:25px;
							color: #888888;
							
						}
					}
					div{
						margin-top: 30px;
						width: 100%;
						display: flex;
						flex-direction:row ;
						align-items: center;
						justify-content: space-between;
						>span{
							color: #ff2871;
							font-size:30px ;
						}
						>div{
							margin-right: 20px;
							width: 150px;
							height: 50px;
							border: 2px solid silver;
							display: flex;
							flex-direction: row;
							justify-content: space-around;
							align-items: center;
							border-radius:75px;
							span{
								display: block;
								width: 50px;
								height: 50px;
								text-align: center;
								line-height: 50px;
								font-size:10px ;
								&:nth-child(1){
									color: black;
								}
								&:nth-child(2){
									color: black;
								}
								
							}
						}
					}
				}
			}
				
		}
	}
	
	
	
</style>