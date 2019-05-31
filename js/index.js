var isShowToXiaoChenchen = false;//是否展示
var isAjaxDataLoaded = false;//ajax异步加载数据是否成功

var isReturn = true;//控制按钮动画效果 


var isSkipHideEntryProcess = true;//是否跳过隐藏入口验证步骤

var isPreventToDebug = false;//是否开启阻止通过浏览器查看源码

var isInitFirework = true;//是否初始化烟花效果

var isInitRose = true;//是否初始化玫瑰效果

var isInit3DRose = true;//是否初始化玫瑰3D效果

 
$(function(){
	preventToDebug();
	
	
	//layui.form需动态加载
	layui.use('form', function(){
		var form = layui.form;
		form.render();//这句一定要加，占坑
		
		//layui 表单验证
		form.verify({
			required: function(value, item){
				if(value == ""){
					return "亲，必填项哦！";
				}
			} 
			
		});
		
		//在对应提交按钮添加属性：lay-submit lay-filter="form-submit"
		form.on('submit(form-submit)',function(data){
	        //console.log('我提交了');
	        //console.log(data.field); // 表单数据 {name:value}
	        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
	        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
	        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
	        
	        //验证内容是否正确
	        verifyContentAboutXiaoChenchen();
	        
	        
	        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	        // 用于提交成功初始化表单
	        /*
	        form.val("form-box",{
	            'username':'',
	        });
	        */
    	});
	});
	
	//layui 时间控件
	layui.use('laydate', function(){
		var laydate = layui.laydate;
		laydate.render({
			elem: '#date-input'
		});
		laydate.render({
			elem: '#date-input-2'
		});
	});
	
	
	//获取控件id
	var btn = document.getElementById('open-btn');
	var div = document.getElementById('win-div');
	var closeBtn = document.getElementById('close-button');
	
	var likeBtn = document.getElementById('like-btn');
	var likeNoBtn = document.getElementById('like-no-btn');
	
	var openDesign =  document.getElementById("openDesign");
	
 
	
	//加载其他人可见内容
	var url = 'data/show_text2.json';
    showDesign(url);
    
    $('#closeLayerWin').click(function(){
    	layer.close(layer.index);//调用关闭
    });
    
    //隐藏入口
    $('#hideEntry').click(function(){
    	autoInputRightAnswer();
    });
    
    
	
	//验证是否让小陈陈可见内容
	openDesign.onclick = function(){
		layer.open({
			//skin: 'layui-layer-molv',
			skin: 'layui-layer-lan',
			//title: false, //不显示标题
			title: ['开启口令验证', 'font-size:15px;color: white;'],
			type: 1,
			closeBtn: 2,
			area: ['350px', '520px'],
			move: false,//关闭标题区域可拖拽
			shade: false,
			//捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
			content: $('.layui-form'),
			btn: null,//不显示按钮
			//btn: ["非常确定", "容我想想"],
		    yes: function(index, layero){
		    	 
		    	//layer.close(index);//调用关闭
		    },
		    cancel: function(){
		     	//layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
		     	
		     	//return false; 开启该代码可禁止点击该按钮关闭
		     	
		     	//layer.close(index);//调用关闭
		    }
			
		});
	}
	 
		
	likeBtn.onclick = function(){
		div.style.display = "none";
		
		if(isShowToXiaoChenchen){//小陈陈可见
			loadTofireworks();
		}
	}
 
 	//鼠标进入移动按钮
 	likeNoBtn.onmouseenter = function(){
// 		var isAnimated = $("#like-no-btn:animated").length;
 	 
 		if(isReturn && isShowToXiaoChenchen){
 			$('#like-no-btn').animate({
	 		 	marginLeft: '-180px',
	 		 	position: 'relative'
	 		});	
	 		
	 		isReturn = false;
 		}else if(!isReturn && isShowToXiaoChenchen){
 			$('#like-no-btn').animate({
	 		 	marginLeft: '0px',
	 		 	position: 'relative'
	 		});
	 		 
	 		isReturn = true;
 		}
 		 
 	}
 
 
    //弹窗事件
	btn.onclick = function show() {
		div.style.display = "block";
	}
	 
	closeBtn.onclick = function close() {
		div.style.display = "none";
		
		if(isShowToXiaoChenchen){//小陈陈可见
			var msg = "亲爱的小陈陈，你以为关掉就可以了吗？<br />上苍安排的最大，接受喜欢我的命运！<img src='img/like.png' />";
			
			layer.alert(msg, {
			  skin: 'layui-layer-molv',//样式类名
			  closeBtn: 0
			},function(index, layero){
				
				loadTofireworks();
				
				layer.close(index);
			});
		} 
	}
	 
	window.onclick = function close(e) {
		if (e.target == div) {//点击自定义弹窗div的外部
			div.style.display = "none";
		}
	}

	
	
})


/**
 * 加载页面控件等数据
 */
function showDesign(url){
	$.ajax({
		type: 'get',
		dataType: 'json',
		//url:'data/show_text2.json',
		url: url,
		success: function(data){
			$('#brower-title').empty().text(data["brower-title"]);
			$('#choice-text').empty().text(data["choice-text"]);
			$('#open-btn span').empty().text(data["open-btn"]);
			$('#title').empty().text(data["title"]);
			$('#content-p').empty().text(data["content-p"]);
			$('#like-btn span').empty().text(data["like-btn"]);
			$('#like-no-btn span').empty().text(data["like-no-btn"]);
			
			isShowToXiaoChenchen = data["isShowToXiaoChenchen"];
			
		}
	});
}


/**
 * 验证和小陈陈相识的经过和内容
 */
function verifyContentAboutXiaoChenchen(){
	var timeToKnowEachOther = $('.layui-form>.layui-form-item:eq(0) input').val();
	var nickNameToCallyou = $('.layui-form>.layui-form-item:eq(1) input').val();
	var timeToExpress = $('.layui-form>.layui-form-item:eq(2) input').val();
	var nickNameToCallyouLater = $('.layui-form>.layui-form-item:eq(3) input').val();
	var actionToDoforyou = $('.layui-form>.layui-form-item:eq(4) input').val();
 
 	$.ajax({
 		type: 'get',
 		dataType: 'json',
 		url:'data/answer.json',
 		success: function(data){
 			var isVerify = true;
 			var wrongArray = new Array();
 			
 			isVerify = compareAnswer(timeToKnowEachOther, data.timeToKnowEachOther, 1, wrongArray);
 			isVerify = compareAnswer(nickNameToCallyou, data.nickNameToCallyou, 2, wrongArray);
 			isVerify = compareAnswer(timeToExpress, data.timeToExpress, 3, wrongArray);
 			isVerify = compareAnswer(nickNameToCallyouLater, data.nickNameToCallyouLater, 4, wrongArray);
 			isVerify = compareAnswer(actionToDoforyou, data.actionToDoforyou, 5, wrongArray);
 			
 			 
 			if(isVerify && wrongArray.length == 0){//不存在错误记录
 				layer.msg( "亲，等的就是你哦！",{
					time: 3500
				}, function(){
					layer.closeAll();//关闭所有弹出层
				});
				 
				 
				//隐藏按钮
				$('#openDesign').css('display', "none");
				

				//加载小陈陈可见内容
				url = 'data/show_text.json';
				showDesign(url);
			}else{
				var msg = "抱歉，亲！您不是他要等的人。<br />如果是他想等的人，拜托给出心中的答案！";
				msg = msg + "<br /><span style='color: red;'>友情提示：错误题目序号为\t"+ wrongArray.join(',')+"</span>";
				/*
				layer.msg( msg,{
					time: 500
				});
				*/
				
				layer.alert(msg, {
				  title: '提示',
				  //skin: 'layui-layer-molv',//样式类名
				  closeBtn: 0
				});
			}
 			
 			
 		}
 		
 	});
}

/**
 * 比较填入答案的正确性
 */
function compareAnswer(inputAnswer, rightAnswer, order, array){
 
	if(order === 1 || order === 3 || order === 2 || order === 4){//比较时间字符串
		if(inputAnswer === rightAnswer){
			return true;
		}else{
			array.push(order);
			return false;
		}
		
	}else if(order === 5){
		if(inputAnswer.match(rightAnswer)){//完全匹配
			return true;
		}
		
		var count = 0;
		var pattern  = ["亲", "亲亲", "抱", "抱抱", "吻", "牵手", "摸手", "搂", "搂抱"];
		for(var i=0; i<pattern.length; i++){
			//正则
			var keyword = new RegExp(pattern[i]);
			var isMatch = keyword.test(inputAnswer);
			
			if(keyword.test("亲") || keyword.test("抱") || keyword.test("搂")){
				pattern.splice(i+1, 1);
			}
			 
			
			if(isMatch){
				count ++;
				if(count == 3)//保证匹配3个
					break;
			}
		}
		
		if(count == 3){
			return true;
		}else{
			array.push(order);
			return false;
		}
		
		//var kiss = new RegExp("亲亲");
		//inputAnswer.match(kiss); 

		
		/*
		var isMatch = rightAnswer.indexOf(inputAnswer);//indexOf 包含某个字符
		if(isMatch > 0){
			return true;
		}else{
			array.push(order);
			return false;
		}
		*/
	}

}


/**
 * 自动填入正确答案
 */
function autoInputRightAnswer(){
	if(isSkipHideEntryProcess){
		ajaxToWriteAnswerInput();
		return;
	} 
		
	layer.prompt({title: '喜欢怎么喊他呀', formType: 0}, function(text, index){
	  if(text.match("林先生")){
	  	 layer.close(index);
	  	 
	  	 layer.prompt({title: '<span style="color: orange;font-size: 20px;">盘他（Bares your heart to him）</span>', formType: 0}, function(text, index){
		    var express = ["我喜欢你", "我爱你", "我嫁给你", "你娶我", "I LOVE YOU", "i love you"];
		   	for(var i=0;i<express.length;i++){
		   		if(text.match(express[i])){
					layer.close(index);

					var msg = '';
		   			msg = msg + '老婆，你成功表白了哦！';
		   			msg = msg + '<br /><span style="color: orange;font-size:20px;">'+ text + '，林先生</span>';
					msg = msg + '<br /><span style="color: orange;font-size:20px;">老婆，林先生也爱你哦！</span>';
					msg = msg + '<br />自动生成开启口令成功！';
		   			layer.msg(msg, {
		   				time: 6666
		   			});
		   			
		   			ajaxToWriteAnswerInput();
				 	
				 	break;//跳出循环
				 	
		   		}else{
			   		layer.msg('林先生在等你表白呢！');
			   	}
		   	}
		  });
	  }else{
	  	layer.msg('错了哟，亲！');
	  }
	});
}

/**
 * ajax获取正确答案，并自动填入
 */
function ajaxToWriteAnswerInput(){
	$.ajax({
 		type: 'get',
 		dataType: 'json',
 		url:'data/answer.json',
 		success: function(data){
 			$('.layui-form>.layui-form-item:eq(0) input').val(data.timeToKnowEachOther);
			$('.layui-form>.layui-form-item:eq(1) input').val(data.nickNameToCallyou);
			$('.layui-form>.layui-form-item:eq(2) input').val(data.timeToExpress);
			$('.layui-form>.layui-form-item:eq(3) input').val(data.nickNameToCallyouLater);
			$('.layui-form>.layui-form-item:eq(4) input').val(data.actionToDoforyou);
 		}
 	});
}


/**
 * 加载烟花效果
 */
function loadTofireworks(){
	$('#fireworks-show').css('display', 'block');

	if(isInitFirework){
		var html = '';
		html = html + '老婆 爱你哦';
		$('#fireworks-show-text').empty().html(html);
		$('#fireworks-show-text').show().arctext({
			radius:180
	    });
		
		$('#fireworks-show').fireworks({ 
		  sound: false, // sound effect
		  opacity: 0.9, 
		  width: '100%', 
		  height: '100%' 
		});
		
		isInitFirework = false;
	}
}

/**
 * 加载玫瑰效果
 */
function loadToRose(){
	//$('#rose-show').rose();
	
//	$('#rose-show').rose({
//		id: '#rose-show',
//		show: true
//	});

	$('#rose-show-div').css('display', 'block');
	
	layer.alert('点击玫瑰，进入爱之章！');

	if(isInitRose){
		$('#rose-show').rose();
		isInitRose = false;
	}

}

/**
 * 加载玫瑰3D效果
 */
function loadTo3DRose(){
	$('#rose-show-3d').css('display', 'block');
	
	layer.alert('鼠标移入，绽放玫瑰！');
	 
	if(isInit3DRose){
		reSet3DRoseColor();
		
		$('#svg').rose3D();
		
		isInit3DRose = false;
	}
}


/**
 * 能阻止部分通过浏览器查看源码、调试
 */
function preventToDebug(){
	var msg = '亲，不允许查看调试，请尊重林先生的劳动成果哦！';
	if(isPreventToDebug){
		document.onkeydown=function(){
		    var e = window.event||arguments[0];
		    if(e.keyCode==123){
		    	alert(msg);
				return false;
		    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
		    	alert(msg);
				return false;
		    }else if((e.ctrlKey)&&(e.keyCode==85)){
	            alert(msg);
	            return false;
		    }else if((e.ctrlKey)&&(e.keyCode==83)){
	           	alert(msg);
	           	return false;
		    }
		}
		document.oncontextmenu=function(){
			alert(msg);
		    return false;
		}
	}
	
}

/**
 * 烟花界面回到重选界面
 */
function backReChooseClick(){
	$('#fireworks-show').css('display', 'none');
}

/**
 * 进入玫瑰3D绽放界面
 */
function nextToRose3DShowClick(){
	$('#fireworks-show').css('display', 'none');
	
	loadTo3DRose();
	
}

/**
 * 回到烟花界面
 */
function backTofireworksClick(){
	$('#fireworks-show').css('display', 'block');
	$('#rose-show-3d').css('display', 'none');
}

/**
 * 进入玫瑰界面
 */
function nextToRoseShowClick(){
	$('#rose-show-3d').css('display', 'none');
	
	loadToRose();
}
/**
 * 玫瑰界面回到重选界面
 */
function backReChooseClick2(){
	$('#rose-show-div').css('display', 'none');
}


/**
 * 重新绽放玫瑰3D花瓣颜色
 */
function reSet3DRoseColor(){
	var petal = ['#gradient-0', '#gradient-1', '#gradient-4', '#gradient-7', '#gradient-10',
	'#gradient-12','#gradient-2'];
	for(var i=0;i<petal.length;i++){
		$(petal[i] + " stop:eq(1)").css('stop-color', 'rgb(255,192,203)');
	}
	
	
	var petal2 = ['#gradient-9'];
	for(var i=0;i<petal.length;i++){
		$(petal2[i] + " stop:eq(0)").css('stop-color', 'rgb(255,182,193)');
	}
	
}
