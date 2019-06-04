$(function(){
	
	//老婆照片
	var imgArray = [
		'IMG_20190330_183916.jpg',
		'IMG_20190330_184709.jpg',
		'mmexport1554164738340.jpg',
		'mmexport1554164744152.jpg',
		'mmexport1557871862509.jpg',
		'mmexport1558519356795.jpg',
		'mmexport1559176376472.jpg',
		'mmexport1559286104970.jpg',
		'mmexport1559456357300.jpg',
	];
	
//	loadPicLoveGirl(imgArray);
	loadPicLoveGirl2(imgArray);
    	
})


function loadPicLoveGirl(imgArray){
	var html = '';
	for(var i=0;i<imgArray.length;i++){
		html = html + '<li>';
		html = html + '<a href="pic-love-girl/'+imgArray[i]+'">';
		html = html + '<img src="pic-love-girl/'+imgArray[i]+'"/>';
		html = html + '</a>';
		html = html + '</li>';
	}
	$('#pic-love-girl').html(html);
}
    
function loadPicLoveGirl2(imgArray){
	for(var i=0;i<imgArray.length;i++){
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.href='pic-love-girl/'+imgArray[i];
		var img = document.createElement('img');
		img.src='pic-love-girl/'+imgArray[i];
    	$('#pic-love-girl')[0].appendChild(li);
    	$('#pic-love-girl li:eq('+i+')')[0].appendChild(a);
    	$('#pic-love-girl li:eq('+i+') a')[0].appendChild(img);
	}
}

