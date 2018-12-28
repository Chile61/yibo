(function( $ ) {
  $.fn.imagefit = function(mdId) {
        //Default setting
        var opts = $.extend({}, $.fn.imagefit.defaults);
        //Public vars
        var html = $('html');
        html.data('main', this);

        //Private vars
        if(this.attr("data-pwidth")){
            var mw = this.attr("data-pwidth").replace("px","");
                mw=Number(mw);
        }else{
            var mw = this.width();
        }
        if(this.attr("data-pheight")){
            var mh = this.attr("data-pheight").replace("px","");
                mh=Number(mh);
        }else{
            var mh = this.height();
        }
        if(mw){
            var border=this.css("border-left-width").replace("px","");
        }else{
            var border=0;
        }
        if(mdId){
           if(border > 0){
                b_w=Number(border)*2;
                mw=mw+b_w;
                mh=mh+b_w;
            }
         }
        var nw = 0, nh = 0;
        var imgs = 0;
        var dom=this;
        var doStartFun=function(){ 
            if($.isFunction(opts.onStart)){ 
                opts.onStart(dom);
            }
        }
        if(opts.onStart){
            doStartFun();
        }
        //Container CSS
        this.css({width:mw,height:mh,'overflow':'hidden','position':'relative'});
        //Look for imgs
        this.find('img').each(function(i,item) {
            var $item = $(item);
            var pic_w=$item.attr("data-picw");
            if(pic_w){
                setImgFit($item,mw,mh);
            }else{
                $("<img/>").attr("src", $item.attr("src")).load(function(){
                    var img_w=this.width;
                    var img_h=this.height;
                    setImgFit($item,mw,mh,img_w,img_h);
                    $(this).remove();
                }); 
            }
            var doLoadFun=function(){ 
                if($.isFunction(opts.onLoad)){ 
                    opts.onLoad(dom,$item,mw,mh);
                }
            }
            if(opts.onLoad){
                doLoadFun();
            }
        });
        function setImgFit(img,mw,mh,img_w,img_h){
            var img = $(img);
                img.css('position', 'absolute');
                img.addClass("imagefit");
            var pic_w=img.attr("data-picw");
            var pic_h=img.attr("data-pich");
            if(pic_w){
                iw=Number(pic_w);
                ih=Number(pic_h);
            }else{
                iw=img_w;
                img.attr("data-picw",iw);
                ih=img_h;
                img.attr("data-pich",ih);
            }
            var top = 0;
            var left = 0;
            if (mw / mh > iw / ih) {
                nw = mw;
                nh = Math.round((nw * ih) / iw);
                top = -Math.abs(Math.round((nh-mh)/2));
                img.css('top', top+'px'); img.css('left', left+'px');
            }else {
                nh = mh;
                nw = Math.round((nh * iw) / ih);
                left = -Math.abs(Math.round((nw-mw)/2));
                img.css('left', left+'px'); img.css('top', top+'px');
            }
            img.css({width:nw,height:nh});
        }
        var dostopFun=function(){ 
            if($.isFunction(opts.onStop)){ 
                opts.onStop(dom);
            }
        }
        if(opts.onStop){
            dostopFun();
        }
    };
    $.fn.imagefit.defaults = {//监听事件
        onStart:null,
        onLoad: null,
        onSop:null
    };

})( jQuery );