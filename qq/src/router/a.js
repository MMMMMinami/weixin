export let x=88;
export  var aa=function(){
	alert(1)
}
var obj={
	name:1,
	age:2
}

//export--出现多次  单个导出
//export default---只能出现一次
export default {
//	x:x
	x,
	aa,
	obj,
}




