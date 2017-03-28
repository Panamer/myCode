_this.methods.pressKey = function(e){
        var keycode = window.event?e.keyCode:e.which;
        //如果点击了回车键，则发布评论
        if(keycode==13){
            _this.methods.release();
        }
	};