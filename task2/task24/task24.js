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
var DelBtn=document.getElementsByTagName("input")[2];
var addInput=document.getElementById("addInput");
var addBtn=document.getElementById("add");
var searchInput=document.getElementById("searchInput");
var searchBtn=document.getElementById("search");
var TreeBox=document.getElementsByTagName("section")[0];
//初始化一个数组装载遍历顺序节点
var divList=[];
var divs=document.getElementsByTagName('div');
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

	});
	addEventHandler(TreeBox,'click',function(e) {
		resetClass();
		if(e.target && e.target.nodeName == "DIV") { 
			var oldClass=e.target.className;
			e.target.className=oldClass+" selected";
		}
	});
	addEventHandler(DelBtn,'click',function(){
		var reg=new RegExp(" selected|selected ");
		var i;
		for(i=0;i<divs.length;i++){
			var classValue=divs[i].className;
			if(reg.test(classValue)){
				var parent=divs[i].parentNode;
				if(parent){
					parent.removeChild(divs[i]);
				}
				break;
			}
		}
		if(i>=divs.length){
			alert("删除失败！");
		}

	});
	addEventHandler(addBtn,'click',function(){
		var addText=addInput.value.trim();
		if(addText!=""){
			var reg=new RegExp(" selected|selected ");
			for(var i=0;i<divs.length;i++){
				var classValue=divs[i].className;
				if(reg.test(classValue)){
					var newChild=document.createElement("div");
					newChild.innerHTML=addText;
					divs[i].appendChild(newChild);
					break;
				}
			}
			if(i>=divs.length){
			alert("添加失败！");
		}
		}else{
			alert("输入错误！");
		}
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
//重置div的class属性
function resetClass(){
	for(var i=0;i<divs.length;i++){
		var old=[];
		old=divs[i].className.split(" ");
		divs[i].className=old[0];
	}
}
//查找被点击的Dom节点函数

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