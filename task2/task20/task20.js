$ = function(el) {
        return document.querySelector(el);
    }
var arrWord;
    $('#insert').onclick = function() {
        var str = $('#textArea').value.trim();
        //在正则表达式前面加^表示匹配非正则表达式的内容
        //匹配非数字非字母非中文字符的字符
         arrWord = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
         //渲染结果，无参
         render();
    }
      $('#search').onclick = function() {
        var str = $('#searchInput').value.trim();
        //有参，即查询字符，渲染结果
        render(str);
    }
    function render(str) {
      var result="";
      for(var i=0;i<arrWord.length;i++){
      	//当有参数时，要把查询字符串特殊标识
        if(str!=null&&str.length>0){
          var d=arrWord[i];
          d=d.replace(new RegExp(str,"g"),"<font color=red>"+str+"</font>");   
          result+="<div>"+d+"</div>";
      }else{
      	//无参时直接遍历渲染
          result+="<div>"+arrWord[i]+"</div>";
    	}
      }
      $('#result').innerHTML=result;
    }


    