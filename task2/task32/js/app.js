window.load=function(){
//存放需要用的id节点
var data_box={
	style_box:{
		box:$('#selec_box'),     //展示的方式
		value:'value'
	},
	type_box:{
		box:$('#type_box'),  //标签名（input radio textarea checkbox select）
		value:'className'     //获取方式
	},
	label_box:{
		box:$('#label_box'),
		value:'value'
	},
	necessary_box:{
		box:$('#basic_box'),
		value:'className'
	},
	input_type_box:{
		box:$('#rule_input'),
		value:'className'
	},
	item_box:[
		$('#box_item_input'),
		$('#box_item_show'),
		document.getElementsByClassName('item')],
	min_length_box:{
		box:$('#min_length'),
		value:'value'
	},
	max_length_box:{
		box:$('#min_length'),
		value:'value'
	},
	add_btn:$('#btn_add'),
	result_box:$('#result'),
	submit_form:$('#submit_form')
};
//存放各个类型的validator函数
var validator={
	'length_control':function(){
		min_length = this.data.min_length;
        max_length = this.data.max_length;
        var text = this.ipt.value;
        if (text == '') {
            if (this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }
        }
        else {
            var total = (/[\x00-\xff]/.test(text) ? text.match(/[\x00-\xff]/g).length : 0) + (/[^\x00-\xff]/.test(text) ? text.match(/[^\x00-\xff]/g).length * 2 : 0);
            if (total < min_length) {
                this.error_tip(1);
            }
            else if (total > max_length) {
                this.error_tip(2);
            }
            else {
                this.true_tip();
                return true;
            }
        }
        return false;
	},
	'number':function(){
		var text=this.ipt.value;
		if(text=''){
			if(this.data.necessary)
				this.error_tip(0);
			else{
				this.default_tip();
				return true;
			}
		}
		else{
			if (/^\d*$/.test(text)) {
                this.true_tip();
                return true;
            }
            else {
                this.error_tip(1);
            }
		}
		return false;
	},
	'email':function () {
        var text = this.ipt.value;
        if (text == '') {
            if (this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }
        }
        else {
            if (/^[0-9a-z]+([._\\-]*[a-z0-9])*@([a-z0-9]+[a-z0-9]+.){1,63}[a-z0-9]+$/.test(text)) {
                this.true_tip();
                return true;
            }
            else {
                this.error_tip(1);
            }
        }
        return false;
    },
    'phone':function () {
        var text = this.ipt.value;
        if (text == '') {
            if (this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }
        }
        else {
            if (/\d{11}/.test(text)) {
                this.true_tip();
                return true;
            }
            else {
                this.error_tip(1);
            }
        }
        return false;
    },
    'radio':function () {
        var item = $('#' + this.data.id).getElementsByTagName('input');
        for (var i = 0; i < item.length; i++) {
            if (item[i].checked) {
                this.true_tip();
                return true;
            }
        }
        if (this.data.necessary)
            this.error_tip(0);
        else {
            this.default_tip();
            return true;
        }
        return false;
    },
    'checkbox': function () {
        var children = this.ipt.children;
        for (var i in children) {
            if (children[i].checked) {
                this.true_tip();
                return true;
            }
        }
        if (this.data.necessary)
            this.error_tip(0);
        else {
            this.default_tip();
            return true;
        }
        return false;
    },
    'select':function(){
    	this.true_tip();
    	return true;
    }
};
var data_product=new Data_product(data_box),
tagIpt=new TagIpt(data_box.item_box[0],data_box.item_box[1],100),
formArr=[];

data_product.init();
tagIpt.init();

//绑定点击事件，点击添加按钮之后，返回表单的数据
on(data_product.box.add_btn,'click',function() {
    var data = data_product.getData();
    if (data != null) {
        //在form中添加相应的表单
        data_product.addForm(data);
        //存放表单并且将表单绑定到Form中，绑定验证函数
        formArr.push(new Form(data));
        //在表单为radio和checkbox时直接展示默认的提示
        if (data.type == 'radio' || data.type == 'checkbox') {
            formArr[formArr.length - 1].default_tip();
        }
    }
});
//提交表单按钮绑定点击事件
//点击之后判断是否都满足要求，如果没有，给出验证
on(data_box.submit_form,'click',function() {
    var text = '';
    for (var i = 0; i < formArr.length; i++) {
        text += !formArr[i].validator() ? formArr[i].tip.textContent + '\n' : '';
    }
    text == '' ? alert('提交成功') : alert(text);
});

function $(selector) {
    return document.querySelector(selector);
}

//绑定事件函数
function on(element,eventName,listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + eventName, listener);
    }
    else {
        element['on' + eventName] = listener;
    }
}
}