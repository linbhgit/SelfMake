$(function(){
	//将所有可编辑标签修改为不可编辑
	$('[contenteditable="true"]').attr('contenteditable', 'false');
	
//	index.loadTextInputPlusHeartGarden();
})

var index = index ||{};
index.isOnLoad = true; 
index.loadTextInputPlusHeartGarden = function(){
    var offsetX = $("#loveHeart").width() / 2;
	var offsetY = $("#loveHeart").height() / 2 - 55;
 
    if (!document.createElement('canvas').getContext) {
        var msg = document.createElement("div");
        msg.id = "errorMsg";
        msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+"; 
        document.body.appendChild(msg);
        $("#code").css("display", "none");
        
        document.execCommand("stop");
    } else {
        setTimeout(function () {
            adjustWordsPosition();
            startHeartAnimation();
        }, 10000);
        
         
        adjustCodePosition();
        $("#code").typewriter();
    }
}
