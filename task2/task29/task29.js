// 跨浏览器兼容的工具函数
function addEventHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    }
    else {
        element["on" + type] = handler;
    }
}
var nameInput=document.getElementsByTagName("input")[0];
var btn=document.getElementsByTagName("button")[0];
var tip=document.getElementsByTagName("p")[0];
addEventHandler(btn,'click',function(){
	var name=nameInput.value.trim();
	if(name==""||name==null){
		tip.innerHTML="姓名不能为空";
		nameInput.style.borderColor="red";
	}else{
		var len=0;
		for(var i=0;i<name.length;i++){
			charcode=name.charCodeAt(i);
			if(charcode>=0&&charcode<=128){
				len+=1;
			}
			else{
				len+=2;
			}
		}
		if(len>=4&&len<=16){
		tip.innerHTML="名称格式正确";
		nameInput.style.borderColor="green";
	}else{
		tip.innerHTML="名称格式错误";
		nameInput.style.borderColor="red";
	}
	}
})
