var express = require('express');
var router = express.Router();
var mongo=require("./dbDAO");
// 处理 mongodb里面的 _id格式 _id:Object("asdsad")
var ObjectId=require('mongodb').ObjectID; 
var crypto=require('crypto'); //加密模块

//session 存储
function User(users){
		this.name=users.name; //登陆人员的账号
		this.veri=users.veri;
		this.password=users.password;
		this.id=users.id;
}

//验证码接口
router.get('/veri', function(req, res, next) {
		
			//生产验证码 
//			req.query---前端get方式传来的数据
			if(req.query.action=="getVeri"){
				var codearr="ABCDEFGHIGKLMNabcdefghijklmnopqrstuvwxyz0123456789";	
				var codestr="";
				for(var i=0;i<4;i++){
					var code=codearr[Math.floor(Math.random()*codearr.length)];
						codestr+=code
				}
					//session 服务器 储存用户信息的			
					var newUser=new User({
						 name:'',
						 veri:codestr,
						 password:'',
						 id:''
					})
					//把对象存在session中 
					req.session.user=newUser;
					console.log(req.session.user)
				//返回生产的验证码
					res.send('{"veri":"'+codestr+'"}')
			}
			
			if(req.query.action=="checkVeri"){
				
				if(req.query.veri.toUpperCase()==req.session.user.veri.toUpperCase()){
					res.send('{"success":"验证码正确"}');
				}else{
					res.send('{"err":"验证码错误"}');
				}
			}
});
//注册接口
		router.post("/reg",function(req,res){
				//把前端传的 用户名 密码 手机号 存到数据
				//用到封装的db
				
//				判断用户名是否注册过	
				
				mongo("find","user",{userName:req.body.userName},function(data){
						if(data.length==0){
							//注册操作
							var userInfo={};
							userInfo.userName=req.body.userName==""?false:req.body.userName;
							userInfo.trueName=req.body.trueName==""?false:req.body.trueName;
							//手机号
							userInfo.phone=/^1\d{10}$/.test(parseInt(req.body.phone))?req.body.phone:false;
						
							//密码
							var MD5=crypto.createHash('md5');					
							userInfo.password=MD5.update(req.body.password).digest('base64');
							userInfo.email=req.body.email;
							//注册时间
							userInfo.createTime=new Date().toLocaleString();
							//权限
							userInfo.powerCode=req.body.powerCode;
							//权限名称
							userInfo.power=req.body.powerCode=="1"?"会员":"普通用户";
							
									if(userInfo.userName&&userInfo.trueName){
											if(userInfo.phone){
												mongo("add","user",userInfo,function(result){
													if(result.length!=0){
															res.send('{"success":"注册成功"}');
													}else{
															res.send('{"err":"注册失败"}');
													}
												})
											}else{
												res.send('{"err":"手机号格式错误"}');
											}
									}else{
										res.send('{"err":"参数不能为空"}');
									}		
						}else{
							
							res.send('{"err":"用户名已被注册"}');
						}
						
				})				
		})
//登录
	router.post("/userLogin",function(req,res){
		//让前端 传来  用户名 密码  
		//去数据库中查找  该用户   找到 登录成功  否则登录失败
		mongo("find","user",{userName:req.body.userName},function(data){
				if(data.length!=0){
					//查到用户名
					var MD5=crypto.createHash('md5');		
					var password=MD5.update(req.body.password).digest('base64');
						if(password==data[0].password){
								
//							res.send('{"success":"登录成功"}');
						//把用户名 密码  id存到 session中
						req.session.user.name=req.body.userName;
						req.session.user.password=password;
						req.session.user._id=data[0]._id;
					
							res.send(data);	
								
						}else{
							res.send('{"err":"密码错误"}');
						}
					
				}else{
					res.send('{"err":"用户不存在"}');
				}
		})
		
	})
	//用户信息和编辑用户
	router.post("/userInfo",function(req,res){
			//获取用户信息
			if(req.body.action=="getUser"){
				console.log(req.body.userId)
				console.log(req.session.user)
					mongo("find","user",{_id:ObjectId(req.body.userId)},function(data){
							console.log(data);
							if(data.length!=0){
								res.send(data)			
							}else{
								res.send('{"err":"用户信息获取失败"}');
							}
					})	
			}
			//编辑用户
			if(req.body.action=="editUser"){
					console.log("修改中...")
					//修改信息
				var	newUserInfo={};
				newUserInfo.phone=req.body.phone;
				newUserInfo.powerCode=req.body.powerCode;
				newUserInfo.power=req.body.powerCode=="1"?"会员":"非会员";
				newUserInfo.email=req.body.email;
				newUserInfo.trueName=req.body.trueName;
				console.log(newUserInfo)
				console.log(req.body.userName)
				mongo("updates","user",[{userName:req.body.userName},newUserInfo],function(data){
					
					
					if(data.result.n==1){
						console.log("修改成功")
						
			res.send("<div><p>修改成功</p><a href='http://localhost:3000/register.html'>返回用户信息页</a></div>")
							
//							res.send('{"success":"修改成功"}');	
					}else{
						console.log("修改失败")
//						res.send('{"err":"修改失败"}');
					}
					
					
				})
				
				
				
			}
		
	})
	//是否登录接口
	router.get("/isLogin",function(req,res){
			if(req.session.user){
				//判断session中是否有值
				console.log(req.session.user)
				if(req.session.user.name){
					res.send('{"success":"已登录"}');
				}else{
					res.send('{"err":"未登录"}');
				}
				
			}else{
				
					var newUser=new User({
						 name:'',
						 veri:'',
						 password:'',
						 id:''
					})
					//把对象存在session中 
					req.session.user=newUser;
					res.send('{"err":"未登录"}');
			}
				
	})
	
	
	
	//修改密码---已登录--去session中取到用户名  根据用户 找到  判断原密码
	router.post("/editPassword",function(req,res){
			
			mongo("find","user",{userName:req.session.user.name},function(data){
				if(data.length!=0){
					var MD5=crypto.createHash('md5');		
					//原密码	
					var password=MD5.update(req.body.oldpassword).digest('base64');
					//新密码
					var MD5s=crypto.createHash('md5');		
					var newpwd=MD5s.update(req.body.newPwd).digest('base64');
						
						if(password==data[0].password){
						
								mongo("updates","user",[{userName:req.session.user.name},{password:newpwd}],function(data){
										if(data.result.n==1){
											res.send('{"success":"修改成功"}');
										}else{
												res.send('{"err":"修改失败"}');
										}
								})
							
						}else{
							res.send('{"err":"原密码错误"}');
						}
		
				}else{
						res.send('{"err":"修改失败"}');
				}	
			})

	})
	//退出登录  清空session中的值
	router.get("/quit",function(req,res){
			if(req.session.user){
				req.session.user.name="";
				req.session.user.password="";
				res.send('{"success":"退出成功"}');
			}else{
				res.send('{"err":"未登录"}');
			}
		
		
	})
	
	
	
	
	
	



module.exports = router;
