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
var pwdInput=document.getElementsByTagName("input")[1];
var rpwdInput=document.getElementsByTagName("input")[2];
var emailInput=document.getElementsByTagName("input")[3];
var phoneInput=document.getElementsByTagName("input")[4];
var btn=document.getElementsByTagName("input")[5];
var nametip=document.getElementsByTagName("p")[0];
var pwdtip=document.getElementsByTagName("p")[1];
var rpwdtip=document.getElementsByTagName("p")[2];
var emailtip=document.getElementsByTagName("p")[3];
var phonetip=document.getElementsByTagName("p")[4];
addEventHandler(nameInput,'focus',function(){
		nametip.innerHTML="必填，长度为4～16个字符"
});
addEventHandler(nameInput,'blur',function(){
	var name=nameInput.value.trim();
	if(name==""||name==null){
		nametip.innerHTML="姓名不能为空";
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
		nametip.innerHTML="名称格式正确";
		nameInput.style.borderColor="green";
	}else{
		tip.innerHTML="名称格式错误";
		nameInput.style.borderColor="red";
	}
	}
});
addEventHandler(pwdInput,'focus',function(){
		pwdtip.innerHTML="必填，长度为8～16个字符"
});
addEventHandler(pwdInput,'blur',function(){
	var pwd=pwdInput.value.trim();
	if(pwd==""||pwd==null){
		pwdtip.innerHTML="密码不能为空";
		pwdInput.style.borderColor="red";
	}else{
		var len=0;
		for(var i=0;i<pwd.length;i++){
			charcode=pwd.charCodeAt(i);
			if(charcode>=0&&charcode<=128){
				len+=1;
			}
			else{
				len+=2;
			}
		}
		if(len>=8&&len<=16){
		pwdtip.innerHTML="密码可用";
		pwdInput.style.borderColor="green";
	}else{
		pwdtip.innerHTML="密码不可用";
		pwdInput.style.borderColor="red";
	}
	}
});
addEventHandler(rpwdInput,'focus',function(){
		rpwdtip.innerHTML="再次输入相同密码";
});
addEventHandler(rpwdInput,'blur',function(){
	var rpwd=rpwdInput.value.trim();
		if(rpwd===pwdInput.value.trim()){
		rpwdtip.innerHTML="密码一致";
		rpwdInput.style.borderColor="green";
	}else{
		rpwdtip.innerHTML="密码不一致";
		rpwdInput.style.borderColor="red";
	}
});
addEventHandler(emailInput,'focus',function(){
		emailtip.innerHTML="请输入正确的邮箱";
});
addEventHandler(emailInput,'blur',function(){
	var email=emailInput.value.trim();
	if(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email)){
		emailtip.innerHTML="邮箱格式正确";
		emailInput.style.borderColor="green";
	}else{
		emailtip.innerHTML="邮箱格式错误";
		emailInput.style.borderColor="red";
	}
});
addEventHandler(phoneInput,'focus',function(){
		phonetip.innerHTML="请输入正确的手机号";
});
addEventHandler(phoneInput,'blur',function(){
	var phone=phoneInput.value.trim();
	if(/^1[34578]\d{9}$/.test(phone)){
		phonetip.innerHTML="手机号格式正确";
		phoneInput.style.borderColor="green";
	}else{
		phonetip.innerHTML="手机号格式错误";
		phoneInput.style.borderColor="red";
	}
});
addEventHandler(btn,'click',function(e){
	e.preventDefault();
	var inputs=document.getElementsByTagName("input");
	var warning="";
	for(var i=0;i<inputs.length-1;i++){
		if(inputs[i].style.borderColor==="red"){
			warning+=document.getElementsByTagName("p")[i].innerHTML+"\n";
		}
	}
	if(warning==""){
		alert("全部验证正确");
	}
	else{
		alert("错误提示:"+warning);
	}
})
