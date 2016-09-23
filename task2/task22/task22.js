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
var preBtn=document.getElementsByTagName("input")[0];
var inBtn=document.getElementsByTagName("input")[1];
var posBtn=document.getElementsByTagName("input")[2  ];
//初始化一个数组装载遍历顺序节点
var divList=[];
//根节点
var treeRoot=document.getElementsByClassName("root")[0];
timer=null;
window.onload=function(){
	/*preBtn.onclick=function(){
		reset();
		preOrder(treeRoot);
		changeColor();
	}*/
	addEventHandler(preBtn,'click',function(){
		reset();
		preOrder(treeRoot);
		changeColor();
	});
	addEventHandler(inBtn,'click',function(){
		reset();
		inOrder(treeRoot);
		changeColor();
	});
	addEventHandler(posBtn,'click',function(){
		reset();
		posOrder(treeRoot);
		changeColor();
	});
	/*
	inBtn.onclick=function(){
		reset();
		inOrder(treeRoot);
		changeColor();
	}
	posBtn.onclick=function(){
		reset();
		potOrder(treeRoot);
		changeColor();
	}*/
}
//前序遍历
function preOrder(node){
	if(!(node===null)){
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}
//中序遍历
function inOrder(node){
	if(!(node===null)){
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}
//前序遍历
function posOrder(node){
	if(!(node===null)){
		posOrder(node.firstElementChild);
		posOrder(node.lastElementChild);
		divList.push(node);
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
function changeColor(){
	var i=0;
	divList[i].style.backgroundColor='blue';
	timer=setInterval(function(argument){
		i++;
		if(i<divList.length){
			divList[i-1].style.backgroundColor='#fff';
			divList[i].style.backgroundColor='blue';
		}else{
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor='#fff';
		}
	},1000)
}