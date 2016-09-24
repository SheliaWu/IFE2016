//事件绑定兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
//获取按钮
var DeBtn=document.getElementsByTagName("input")[0];
var WdBtn=document.getElementsByTagName("input")[1];
var searchInput=document.getElementById("searchInput");
var searchBtn=document.getElementById("search");
//初始化一个数组装载遍历顺序节点
var divList=[];
//根节点
var treeRoot=document.getElementsByClassName("root")[0];
timer=null;

window.onload=function(){
	addEventHandler(DeBtn,'click',function(){
		reset();
		DeepTraverse(treeRoot);
		changeColor();
	});
	addEventHandler(WdBtn,'click',function(){
		reset();
		WildTraverse(treeRoot);
		changeColor();
	});
	addEventHandler(searchBtn,'click',function(){
		var text=searchInput.value.trim();
		reset();
		DeepTraverse(treeRoot);
		//WildTraverse(treeRoot);
		/*for(var i=0;i<divList.length;i++){
			if(divList[i].firstChild.nodeValue.trim()==searchInput)
				divList[i].style.backgroundColor="#b35c44";
		}*/
		changeColor(text);

	})
}
//深度度遍历
function DeepTraverse(node){
	if(node){
		divList.push(node);
		for(var i=0;i<node.children.length;i++){
			DeepTraverse(node.children[i]);
		}
}

}
//广度遍历
var count=0;
function WildTraverse(node){
	if(node){
		divList.push(node);
		WildTraverse(node.nextElementSibling);
		node=divList[count++];
		WildTraverse(node.firstElementChild);
	}

}
//重置函数
function reset(){
	divList=[];
	clearInterval(timer);
	var divs=document.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++){
		divs[i].style.backgroundColor='#fff';
	}
}
//特殊标识函数
function changeColor(findText){
	var i=0;
	divList[i].style.backgroundColor='blue';
	timer=setInterval(function(argument){
		//如果没有参数，代表只是简单的遍历
		if(!findText){
		i++;
		if(i<divList.length){
			divList[i-1].style.backgroundColor='#fff';
			divList[i].style.backgroundColor='blue';
		}else{
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor='#fff';
		}
	}else{//有参情况，查找元素
		if(divList[i].firstChild.nodeValue.trim()==findText){
			divList[i].style.backgroundColor='#b35c44';
			clearInterval(timer);
		}else{//没有找到，继续遍历
			i++;
		if(i<divList.length){
			divList[i-1].style.backgroundColor='#fff';
			divList[i].style.backgroundColor='blue';
		}else{//找到最后节点没有找到，弹出提示信息
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor='#fff';
			alert("树中没有该节点！");
		}
		}
	}
},1000)
}