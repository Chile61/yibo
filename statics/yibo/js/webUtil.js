if (typeof webUtil == "undefined") {
    var webUtil = {};
}
// $(document).ready(function () {
// 	$(".wow").css("visibility","");
// });
$(document).ready(function () {
    if (!!window.chrome) $('.a').addClass('isFontChrome');
    if(!window.chrome && navigator.userAgent.indexOf("Safari") > -1){
        $("body").addClass("isSafari");
    }
});
if (typeof sysUtil == "undefined") { //修复前台不需要调用的方法，直接为空
    webUtil.onlineMapDrag = function(mdId){};
}
webUtil.initFormTab = function(id,delayTime,autoPlay,effectMode){
    require(["jquery","SuperSlide"],function($) {
        $("#"+id+" .formTabText li").removeClass('on');
        $("#"+id+" td.formTab_td").hide();
        $("#"+id+" .formTabText li:first").addClass('on');
        $("#"+id+" td.formTab_td:first").show();
        var formWidth = $("#formTab_"+id).width();
        $("#formTab_"+id+" .formTabBox > div").slide({
            titCell: ".formTabText li",
            mainCell: ".formTabContent tr",
            effect: "fade",
            easing:"swing",
            prevCell:".formPrv",
            nextCell:".formNext",
            trigger: effectMode,
            defaultIndex:0,
            delayTime: delayTime,
            autoPlay: autoPlay,
            pnLoop: true,
            startFun:function(i,c){
                var photoPanel2=$("#formTab_"+id+ " .formTab_td").eq(i).find(".listPhotoPanel2");
                if(photoPanel2.length > 0){
                    photoPanel2.find(".tempWrap").css({width:formWidth-100});
                    console.log("photoPanel2");
                }
                var photoPanel3=$("#formTab_"+id+ " .formTab_td").eq(i).find(".listPhotoPanel3");
                if(photoPanel3.length > 0){
                    photoPanel3.find(".tempWrap").css({width:formWidth});
                    console.log("photoPanel3");
                }

                var productBox2=$("#formTab_"+id+ " .formTab_td").eq(i).find(".productStyleBox2");
                if(productBox2.length > 0){
                    productBox2.find(".tempWrap").css({width:formWidth});
                    console.log("productBox2");
                }
            }
        });
    });
};
webUtil.setImageFit=function(dom,mdId){
    require(["jquery","imagefit"],function(){
        //$(dom).imagefit();
        var imgdefereds=[];
        var $imgs=$(dom+' img');
        if($imgs.length > 0){
            $imgs.each(function(){
                var dfd=$.Deferred();
                $(this).bind('load',function(){
                    dfd.resolve();
                }).bind('error',function(){
                    /*错误返回*/
                })
                if(this.complete)
                    dfd.resolve();
                imgdefereds.push(dfd);
            })
            $.when.apply(null,imgdefereds).done(function(){
                if(mdId){
                    $(dom).imagefit(mdId);
                }else {
                    $(dom).imagefit();
                }
            });
        }
    });
};
webUtil.setProductEffects=function(id,template,imageEffects,sHex,opacity){
    require(["jquery","color_exchange","SuperSlide"],function($){
        var templateID="#"+template+"_"+id;
        var box_w=$(templateID+" .productImgForm:first").data("pwidth");
        var box_h=$(templateID+" .productImgForm:first").data("pheight");
        var sRgbColor = sHex.colorRgb();
        var rgba=sRgbColor+","+opacity;
        if(imageEffects=="effects2"){
            $(templateID+" .effects2 li.imgDiv").hover(function(){
                $(this).find(".productImgForm_c a.productEffects span").css({width:box_w,height:box_h});
                $(this).find(".productImgForm_c a.productEffects").fadeIn(500);
            },function(){
                $(this).find(".productImgForm_c a.productEffects").stop(true,true).fadeOut(500);
            });
        }else if(imageEffects=="effects4"){
            $(templateID+" .effects4 .productDetailForm,"+templateID+" .effects4 .productDetailForm2").css({"background-color":"rgba("+rgba+")",width:box_w,height:box_h});
            $(templateID+" .effects4 li.imgDiv").hover(function(){
                var pTags=$(this).find(".productDetailForm1");
                pTags.parent().is("a")?pTags.unwrap():"";
                pTags.fadeIn(500);
                pTags.wrap('<a href="'+pTags.attr("data-href")+'" target="'+pTags.attr("data-target")+'"/>');
            },function(){
                var pTags=$(this).find(".productDetailForm1");
                pTags.parent().is("a")?pTags.unwrap():"";
                pTags.stop(true,true).fadeOut(500);
            });
        }else if(imageEffects=="effects5"){
            $(templateID+" .effects5 .productDetailForm,"+templateID+" .effects5 .productDetailForm2").css({"background-color":"rgba("+rgba+")",width:box_w});
            /*$(templateID+" .effects5 .productDetailForm2").attr("style");*/
            $(templateID+" .effects5 li.imgDiv").hover(function(){
                $(this).find(".productDetailForm1").slideDown(500);
            },function(){
                $(this).find(".productDetailForm1").stop(true,true).slideUp(500);
            });
            $(templateID+" .effects5 .productDetailForm1").click(function(){
                if($(this).data("target")=="_blank"){
                    window.open($(this).data("href"));
                }
                else{
                    window.location.href=$(this).data("href");
                }
            })
        }
    })
};
webUtil.setProductModel=function(id,template,modelstyle,temp,productParameter,witching,rolling){
    require(["jquery","SuperSlide"],function(){
        var templateID="#"+template+"_"+id;
        var tempClass="."+template+"_"+id;
        var boxm=$(templateID+" #proList_"+ id).data("boxm");
        if(modelstyle=="productStyleBox2" || modelstyle=="productStyleBox3"){
            var num=$(templateID+" #proList_"+ id).data("boxw");
            if(modelstyle=="productStyleBox3" && $("body").hasClass('edit')){num=num-Number(boxm)-120}else{num=num-Number(boxm)};
            $(templateID+" ul#proList_"+id).data("listw",num/temp);
        }
        if(modelstyle=="productStyleBox2"){
            $(tempClass+"_view").slide({
                mainCell:".bd ul",
                autoPlay:true,
                effect:"leftMarquee",
                vis:temp,
                interTime:rolling,
                pnLoop:true,
                trigger:"click",
                autoPage: true
            });
        };
        if(modelstyle=="productStyleBox3"){
            $(tempClass+"_view").slide({
                mainCell:".bd ul",
                effect:"left",
                delayTime:800,
                vis:temp,
                scroll:witching,
                pnLoop:false,
                trigger:"click",
                easing:"easeOutCubic",
                autoPage: true
            });
        }
        if(modelstyle=="productStyleBox2" || modelstyle=="productStyleBox3"){
            $(templateID+" .tempWrap").css({width:num});
            $(templateID+" .tempWrap .imgDiv").css({width:num/temp});
        }
        if(modelstyle=="productStyleBox1" || modelstyle=="productStyleBox2" || modelstyle=="productStyleBox3"){
            var $div=$(templateID+" .imgDiv a.productImgForm");
            var box_w=$div.data("pwidth");
            if(productParameter!=="parameter5"){
                $(templateID+" .productDetailForm").css({width:box_w,margin:"0 auto"})
            }
        }
        if(WebModel=="view"){
            webUtil.setImageFit("#proList_"+id+" .imgDiv a.productImgForm");
        }
    })
};
/*webUtil.setProductParameter=function(id,template,Parameter,modelstyle,column){
 var templateID="#"+template+"_"+id;
 var num=$(templateID+" .imgDiv").width();
 var num1=$(templateID+" .productImgForm").data("pwidth");
 if(num1 > num){
 /!*$("#${template}_${mdId} .productImgForm").css({width:num+"px"});*!/
 $(templateID+" .productDetailForm2,"+templateID+" .productDetailForm").css({width:num-2-20+"px"});
 }else{
 $(templateID+" .productDetailForm2,"+templateID+" .productDetailForm").css({width:num1-2-20+"px"});
 }
 }*/

webUtil.setProductParameter=function(id,template,Parameter,modelstyle,column){
    var templateID="#"+template+"_"+id;
    var num=$(templateID+" .imgDiv").width();
    var num1=$(templateID+" .productImgForm").data("pwidth");
    var num2=$(templateID+" #proList_"+ id).data("boxw");
    var boxm=$(templateID+" #proList_"+ id).data("boxm");
    num2=num2-Number(boxm);
    if(modelstyle=="productStyleBox4"){
        num2=num2/column;
        if(num1 > num2/2){
            $(templateID+" .productDetailForm1").css({width:num2/2-17+"px"});
        }else{
            $(templateID+" .productDetailForm1").css({width:num2-num1-17+"px"});
        }
    }
    else{
        if(num1 > num){
            /*$("#${template}_${mdId} .productImgForm").css({width:num+"px"});*/
            $(templateID+" .productDetailForm2,"+templateID+" .productDetailForm").css({width:num-2-40+"px"});
        }else{
            $(templateID+" .productDetailForm2,"+templateID+" .productDetailForm").css({width:num1-2-40+"px"});
        }

    }
}
/*图片延迟加载*/
webUtil.lazyloadList=function(img,rebox){
    require(["jquerylazyload"],function(){
        $(img).lazyload({
            re_box:rebox,
            data_attribute:"src",
            effect:"fadeIn",
            effectspeed:200,
            threshold: 0
        });
    })
};
/*列表多图*/
webUtil.setListImageEffect=function(mdId,showRowPicNum,temp,opp,delayTime,autoPlay,scroll,interTime,styleMode){
    require(["jquery","SuperSlide"],function($) {
        var con_w=$("#"+mdId+" .photoListContainer").width();
        var list_w=$("#"+mdId+" .listPhotoBox_view").width();
        if(list_w<=con_w){
            var box_w=($("#"+mdId+" .photoListContainer").width()-100)/showRowPicNum;
            $("#picList_"+mdId+" li.listPhotoSize").css({width:box_w});
        }
        var $parentBox=$("#"+mdId+" .scroll_list");
        if($parentBox.children('div').hasClass('tempWrap')){
            var tempHtml=$parentBox.children('div.tempWrap').html();
            $parentBox.html(tempHtml);
        }
        if(styleMode=="1") {
            $("#" + temp + "_" + mdId + " .listPhotoPanel2").slide({
                titCell: "listPhotoPanel2 ul",
                mainCell: ".scroll_list ul",
                effect: "left",
                easing: "swing",
                opp: opp,
                delayTime: delayTime,
                autoPlay: autoPlay,
                vis: showRowPicNum,
                pnLoop: false,
                scroll: scroll,
                autoPage: true
            });
        }else if(styleMode=="2") {
            if(!$("body").hasClass("edit")){
                $("#listPhoto_"+mdId+ " .listPhotoBox .listPhotoPanel3 .picList").find(".clone").remove();
            }
            $("#" + temp + "_" + mdId + " .listPhotoPanel3").slide({
                mainCell: "ul",
                effect: "leftMarquee",
                opp: opp,
                vis: showRowPicNum,
                autoPlay: true,
                interTime: interTime,
                switchLoad: "_src"
            });
        }
    });
};
/*幻灯片*/
webUtil.setListPhotoSlide=function(mdId,picOutMode,slideMode,showMode,styleMode){
    require(["fancyJs"],function(){
        if(picOutMode == "1" && slideMode == "0") {
            $("#picList_"+mdId+" .fancybox_"+mdId).fancybox({
                titleShow : true,
                titlePosition : 'over',
                helpers : {
                    overlay : {closeClick: false},
                    title:{
                        type:"over"
                    },
                },
                /*afterLoad : function() {
                 this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
                 }*/
            });
        }
        if(picOutMode == "1" && slideMode == "1") {
            require(["fancybox/jquery.fancybox-thumbs"],function(){
                $("#picList_"+mdId+" .fancybox-thumbs_"+mdId).fancybox({
                    prevEffect : 'none',
                    nextEffect : 'none',
                    closeBtn  : true,
                    arrows    : true,
                    nextClick : true,
                    titleShow : true,
                    helpers : {
                        thumbs : {
                            width  : 50,
                            height : 50
                        },
                        title:{
                            type:"over"
                        },
                        overlay : {closeClick: false}
                    }
                });
            });
        }
    });
    if(showMode!== "0") {
        if($("#picList_"+mdId+" img.lazy").length > 0){
            webUtil.lazyloadList("#picList_"+mdId+" img.lazy",".photo_list");
        }else{
            webUtil.setImageFit("#picList_"+mdId+" div.photo_list");
        }
    }
};
/*图片偏移*/
webUtil.setListPhotoOffset=function(mdId,showRowPicNum){
    var widthSize = $("#picList_"+mdId+" .photo_list:first").css("width");
    $("#picList_"+mdId+" .listPhotoText").css({width:widthSize});
    if(showRowPicNum == "3") {
        $("#picList_"+mdId+" .listPhotoText").css({width:widthSize});
        $("#picList_"+mdId+" .photo_fullText").css({width:widthSize,left:86});
        $("#picList_"+mdId+" .photo_halfText").css({width:widthSize,left:86});
    }else if(showRowPicNum == "2") {
        $("#picList_"+mdId+" .listPhotoText").css({width:widthSize});
        $("#picList_"+mdId+" .photo_fullText").css({width:widthSize,left:186});
        $("#picList_"+mdId+" .photo_halfText").css({width:widthSize,left:186});
    }else if(showRowPicNum == "1") {
        $("#picList_"+mdId+" .listPhotoText").css({width:widthSize});
        $("#picList_"+mdId+" .photo_fullText").css({width:widthSize,left:484});
        $("#picList_"+mdId+" .photo_halfText").css({width:widthSize,left:484});
    }
};
webUtil.setListPhotoDev=function(mdId){
    var widthSize = $("#picList_"+mdId+" .photo_list:first").data("pwidth");
    var halfWidth = -widthSize/2;
    $("#picList_"+mdId+" .listPhotoText").css({width:widthSize});
    $("#picList_"+mdId+" .photo_fullText,#picList_"+mdId+" .photo_halfText").css({width:widthSize,left:"50%","margin-left":halfWidth});
};
webUtil.setListBgColor=function(opacity,bgColor,bgDom){
    var color = dataUtil.ChangeRgb(bgColor);
    var fcolor = "rgba("+color+","+opacity+")";
    $(bgDom).css({"background":fcolor});
}

/*鼠标经过效果*/
webUtil.setListPhotoEffect=function(mdId,hoverMode,dscHeight,picOutMode){
    if(hoverMode != "3" || hoverMode != "4") {
        if(picOutMode != "2"){
            $("#picList_" + mdId + " .listPhotoTextAlign").click(function (e) {
                //e.preventDefault();
                //$(this).parents("li.listPhotoSpacing").find("a").trigger("click");
                /*原生获取节点*/
                //var listDom = document.getElementById("picList_"+mdId);
                var parNode = this.parentNode;
                var alignDom = parNode.getElementsByTagName("a");
                for(var i=0;i<alignDom.length;i++){
                    alignDom[0].click();
                }
            });
        }
    }
    if(hoverMode == "1") {
        /*鼠标经过效果2*/
        $("#picList_"+mdId+" .photo_borderMask").hide();
        $("#picList_"+mdId+" li.listPhotoSpacing").hover(function(){
                $(this).find(".photo_borderMask").stop().fadeIn(500);
            },
            function(){
                $(this).find(".photo_borderMask").stop().fadeOut(500);
            });
    }else if(hoverMode == "2"){
        /*鼠标经过效果3*/
        $("#picList_"+mdId+" .photo_mask").hide();
        $("#picList_"+mdId+" li.listPhotoSpacing").hover(function(){
                $(this).find(".photo_mask").stop().fadeIn(500);
            },
            function(){
                $(this).find(".photo_mask").stop().fadeOut(500);
            });
    }else if(hoverMode == "3"){
        /*鼠标经过效果4*/
        var fmDom = $("#picList_"+mdId+" .fBgcolor");
        $(fmDom).hide();
        $("#picList_"+mdId+" li.listPhotoSpacing").hover(function(){
                $(this).find(".photo_fullMask").stop().fadeTo(500,1);
                $(this).find(".photo_fullText").stop().fadeIn(500);
            },
            function(){
                $(this).find(".photo_fullMask").stop().fadeTo(500,0);
                $(this).find(".photo_fullText").stop().fadeOut(500);
            });
    }else if(hoverMode == "4"){
        /*鼠标经过效果5*/
        $("#picList_"+mdId+" li.listPhotoSpacing").hover(function(){
                $(this).find(".photo_halfMask").stop().animate({bottom:'0'}, 500);
                $(this).find(".photo_halfText").stop().animate({bottom:'0'}, 500);
            },
            function(){
                $(this).find(".photo_halfMask").stop().animate({bottom:-dscHeight}, 500);
                $(this).find(".photo_halfText").stop().animate({bottom:-dscHeight}, 500);
            });
    }
};
/*分页*/
webUtil.setListPhotoPage=function(mdId,num_entries,showCount,pageNum,picOutMode,hoverMode,dscHeight,opacity,bgColor){
    require(["jquery.Mpagination"],function(){
        var initPagination = function() {
            /*创建分页*/
            var langId=dataUtil.currentLangId();
            $("#Pagination_"+mdId).pagination(num_entries, {
                first_text:langUtil.Global_first,
                end_text:langUtil.Global_endPage,
                prev_text:langUtil.Global_prePage,
                next_text:langUtil.Global_nextPage,
                num_edge_entries: 1,
                num_display_entries: 6,
                callback: pageselectCallback,
                items_per_page:showCount
            });
        }();
        function pageselectCallback(page_index, jq){
            var max_elem = Math.min((page_index+1) *showCount, num_entries);
            $("#picList_"+mdId).html("");
            for(var i=page_index*showCount;i<max_elem;i++){
                var resultId=$("#result_"+mdId).children("span").eq(i);
                var resultHtml=$("#photo_tpl_"+mdId);
                var data_img=resultId.data("img");
                var data_name=resultId.data("name");
                var data_link=resultId.data("link");
                var data_open=resultId.data("open");
                var data_describe="";
                var data_result = String(data_name);
                var data_title = data_result.replace(/<br>/gi, "\&#10;");
                if(resultId.data("describe")){
                    data_describe=resultId.data("describe");
                }
                if(picOutMode == "1") {
                    resultHtml.find("a").attr("href",data_img);
                }else if(picOutMode == "0"){
                    resultHtml.find("a").attr("href",data_link);
                }
                resultHtml.find("a").attr("title",data_name);
                resultHtml.find("img").addClass('lazy').attr("alt",data_name);
                var fancyTitle = "<p><b>"+data_name+"</b></p>"+data_describe;
                resultHtml.find("a").attr("data-fancybox-title",fancyTitle);
                resultHtml.find("a").attr("target",data_open);
                resultHtml.find("img").attr("data-src",data_img);
                resultHtml.find(".listPhotoTextAlign").children(".desTitle").html(data_name);
                resultHtml.find(".listPhotoTextAlign").attr("title",data_title);
                resultHtml.find(".listPhotoTextAlign").children(".desText").html(data_describe);
                $("#photo_tpl_"+mdId).children("li").clone().appendTo("#picList_"+mdId);
                if((i+1)%pageNum == 0){
                    var html='<div style="clear: both;"></div>';
                    $(html).appendTo("#picList_"+mdId);
                }
            }
            var bgDom;
            if(hoverMode == "3"){
                bgDom=$("#picList_"+mdId+" .fBgcolor");
            }else if(hoverMode == "4"){
                bgDom=$("#picList_"+mdId+" .listPhotoTextAlign");
            }
            webUtil.setListBgColor(opacity,bgColor,bgDom);

            webUtil.setListPhotoOffset(mdId,pageNum);
            if($("#picList_"+mdId+" img.lazy").length > 0){
                webUtil.lazyloadList("#picList_"+mdId+" img.lazy",".re_box");
            }else{
                webUtil.setImageFit("#picList_"+mdId+" .re_box");
            }
            webUtil.setListPhotoEffect(mdId,hoverMode,dscHeight,picOutMode);
            return false;
        }
    });
};
webUtil.createProType=function(id,temp,fid,tempClass,childMenu,showStyle,defaultStyle,navStyle){
    var data=dataUtil.loadProductType();
    var dom="proList_"+id;
    var pId=dataUtil.GetQueryString("proTypeID");
    var reg = new RegExp(/design\/website\/(\S*)/) ;
    if(data.result == 'SUCCESS'){
        var html="";
        var tempUrl="";
        var tempOn="";
        fid=Number(fid);
        $.each(data.data.rows,function(i,item){
            if(item.fatherId==fid){
                var n=0;
                $.each(data.data.rows,function(i,child){
                    if(child.fatherId==item.productTypeId){
                        n=n+1;
                    }
                });
                html+='<li class="sec '+tempClass+'"><a href="';
                if(temp=="1" && n && childMenu==1){
                    html+="#";
                    html+='" class="sp'+(item.productTypeId==pId?' on':'')+((showStyle==1 && defaultStyle==1)?' navOpen':'');
                }
                else{
                    html+='product.html?proTypeID='+item.productTypeId;
                    if(item.productTypeId==pId){
                        html+='" class="on action_jump';
                        html+=(showStyle==1 && defaultStyle==1)?' navOpen':'';
                    }else{
                        html+='" class="action_jump';
                    }
                }
                html+='"';
                html+='><span>'+item.typeName+'</span></a>';
                if(childMenu==1){
                    if(n){
                        html+='<ul>';
                    }
                    $.each(data.data.rows,function(i,child) {
                        if (child.fatherId == item.productTypeId) {
                            var s=0;
                            $.each(data.data.rows,function(i,gchild){
                                if(gchild.fatherId==child.productTypeId){
                                    s=s+1;
                                }
                            });
                            html+='<li><a href="';
                            if(temp=="1" && s){
                                html+="#";
                                html+='" class="sp'+(child.productTypeId==pId?' on':'')+((showStyle==1 && defaultStyle==1)?' navOpen':'');
                            }
                            else{
                                html+='product.html?proTypeID='+child.productTypeId;
                                if(child.productTypeId==pId){
                                    html+='" class="on action_jump';
                                    html+=(showStyle==1 && defaultStyle==1)?' navOpen':'';
                                }else{
                                    html+='" class="action_jump';
                                }
                            }
                            html+='"';
                            html+='><span>'+child.typeName+'</span></a>';
                            /*                            html+='product.html?proTypeID='+child.productTypeId;
                             tempOn=child.productTypeId==pId?' class="on action_jump"':'class="action_jump"';
                             html+='"'+tempOn+'><span>'+child.typeName+'</span></a>';*/
                            if(s){
                                html+='<ul>';
                            }
                            $.each(data.data.rows,function(i,gchild) {
                                if (gchild.fatherId == child.productTypeId) {
                                    html+='<li><a href="';
                                    html+='product.html?proTypeID='+gchild.productTypeId;
                                    tempOn=gchild.productTypeId==pId?' class="on action_jump"':'class="action_jump"';
                                    html+='"'+tempOn+'><span>'+gchild.typeName+'</span></a>';
                                    html+="</li>";
                                }
                            })
                            if(s){
                                html+='</ul>';
                            }
                            html+="</li>";
                        }
                    })
                    if(n){
                        html+='</ul>';
                    }
                }

                html+='</li>';
            }
        });
        $("#"+dom).html("");
        $("#"+dom).html(html);
        webUtil.setProType(id,navStyle,showStyle,childMenu,defaultStyle);
    }
};
webUtil.setProType=function(id,navStyle,showStyle,childMenu,defaultStyle){
    var dom="proList_"+id;
    var pId=dataUtil.GetQueryString("proTypeID");
    var temp=0;
    if(navStyle=="2") { //模块样式  2横1竖
        $("#"+dom+" li").hover(function () {
            $(this).children('ul').stop(true, true).show("fast");
        }, function () {
            $(this).children('ul').stop(true, true).hide("fast");
        });
    }
    else{
        if(showStyle=="1") {  //展示方式  1点击 2经过   defaultStyle  1默认展示
            if(showStyle==1 && defaultStyle==1){
                $("#"+dom).children("li").children("ul").show();
                $("#"+dom).find("a.sp").addClass('navOpen');
            }
            else{

                $("#"+dom).children("li").find("ul").hide();
                $("#"+dom).find("a.sp").removeClass('navOpen');
            }

            if($("#"+dom).find("a").hasClass("on")){
                temp=1;
            }
            if(temp==1){
                if($("#"+dom).find("a.on").next().length>0){
                    $("#"+dom).find("a.on").addClass('navOpen');
                }
                var $obj=$("#"+dom).find("a.on").parent("li").parent("ul:not('.productList')");
                var $obj1=$obj.parent("li").parent("ul:not('.productList')");
                var $obj2=$("#"+dom).find("a.on").parent("li").children("ul");
                if($obj){
                    if($obj.prev().length>0){
                        $obj.prev().addClass('navOpen')
                    }
                    $obj.show();
                }
                if($obj1){
                    if($obj1.prev().length>0){
                        $obj1.prev().addClass('navOpen')
                    }
                    $obj1.show();
                }
                if($obj2){
                    if($obj2.prev().length>0){
                        $obj2.prev().addClass('navOpen')
                    }
                    $obj2.show();
                }
            }
            if(childMenu==1){   // 是否显示2级  1显示  0隐藏
                $("#"+dom).find("a.sp").click(function () {
                    if ($(this).hasClass('navOpen')) {
                        $(this).parent("li").children("ul").slideUp("fast");
                        $(this).removeClass('navOpen');
                    } else {
                        $(this).parent("li").children("ul").slideDown("fast");
                        $(this).addClass('navOpen');
                    }
                })
            }

        }
    }
    if(childMenu=="0") {
        $("#"+dom).children("li").find("ul").hide();
        $("#"+dom).find("a.sp").removeClass('navOpen');
    }
};
webUtil.setDisProSlide=function(id,dom,temp,autoPage,effect){
    require(["jquery","SuperSlide"],function($){
        $("#"+id+" .picShow").slide({
            titCell:".hdd ul",
            mainCell:".bdd ul",
            autoPage:autoPage,
            effect:effect,
            autoPlay:false,
            scroll:1,
            vis:temp,
            delayTime:500,
            pnLoop:false,
            easing:"easeOutCirc",
            trigger:"click",
            autoPage: true
        });
        $('#disp_'+id+' .descShow').slide({delayTime: 0});
        $('#disp_'+id+' .imgList li a').mouseenter(function(){
            if($("#disp_"+id+" .picZoomer-pic").length>0){  //切换改变图片显示尺寸，设置放大图片3倍尺寸
                $("#disp_"+id+" .picZoomer-pic").attr("src",$(this).find("img").attr("src"));
                w=$("#disp_"+id+" .bigImg").width();
                h=$("#disp_"+id+" .bigImg").height();
                $(".picZoomer-pic-wp").css({width:$("#disp_"+id+" .picZoomer").width(),height:$("#disp_"+id+" .picZoomer").height()});
                $(".picZoomer-zoom-pic").css({width:w*3,height:h*3})

            }else{
                $("#disp_"+id+" .bigImg").attr("src",$(this).find("img").attr("src"));
            }
        });
    })
};
webUtil.setNewsDate=function(id,articleStyle){
    $("#article_list_"+id+" .title").css({"width":"100%"})
    if(articleStyle=='default6'){
        $("#article_list_"+id+" .list").css({"padding-left":"0"})
    }
    else if(articleStyle=='default2' || articleStyle=='default3' || articleStyle=='default7'){
        $("#article_list_"+id+" .title").css({"padding-right":"0"});
        $("#article_list_"+id+" .title").css({"width":"auto"})
    }
}
/*留言提交*/
webUtil.msgSubmit = function(mdId){
    require(["public/dataUtil","public/langUtil","msgSubmit"],function() {
        $("#"+mdId+" .submit-tips").hide();
//  	if($("body").hasClass('edit')){
        /*读取数据生成表单*/
        var msg = "";
        $.ajax({
            url: '/w/msg/listMsgProCfg.do',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            success: function (json) {
                if (json.result === "SUCCESS") {
                    msg = json.data;
                    /*调用生成表单函数*/
                    createForm(msg,langUtil.onlineForm_content,langUtil.Global_verification);
                    $("#form_submit"+mdId).find(".submit-tips").hide();
                }
                else {
                    $("#form_submit"+mdId).html('数据加载错误');
                }
            },
        });
        /*生成表单函数*/
        function createForm(data) {
            var str = "", /*渲染在页面上的script代码，需要在DOM渲染完后，加载脚本*/
                html = ""; /*渲染在页面上的html代码*/
            var $container = $("#form_submit" + mdId);
            var nums = 1;
            $.map(data, function (item, key) {
                if (item.propsts) {
                    /*是否必填*/
                    if (item.isrq == 1) {
                        var fisrq = "form_isrq";
                    } else {
                        var fisrq = "";
                    }
                    var finptp = item.inptp;
                    var propn = item.propn;
                    /*属性名*/
                    switch (item.inptp) {
                        case "input":
                        case "phone":
                        case "mail":
                            html += '<ul class="list input">' +
                                '<span>' + item.propn + langUtil.Global_symbol +'</span>' +
                                '<li><input class="' + fisrq + ' saveinput" type="text" name="' + mdId + '_' + item.msgpropcfgid + '" data-ftip="' + propn + '" data-itype="' + finptp + '" placeholder="' + propn + '">';
                            break;
                    }
                    html += ((item.isrq) ? '<i class="msgSubSign">*</i>' : '') +
                        '</li></ul>'
                }
                nums++;
            });
            html += '<ul class="list textarea"><span>'+langUtil.msgSubmit_content+langUtil.Global_symbol+'</span><li><textarea class="form_isrq langInput"  type="textarea" name="content" data-ftip="' + langUtil.onlineForm_content + '" data-itype="textarea" placeholder='+langUtil.msgSubmit_message+'></textarea><i class="textareaSign msgSubSign">*</i></li></ul>';
            html += '<ul class="list input code"><span>'+langUtil.Global_verification+langUtil.Global_symbol+'</span><li><input class="form_isrq langInput msgVerText"  type="text" name="' + mdId + '_code" maxlength="4" placeholder='+langUtil.Global_verification+'><div style="display: inline-block;width: 100px;"><img class="SetReCode" onclick="webUtil.SetReCode(this,\''+mdId+'\')"><i class="msgSubSign">*</i></div></li></ul>';
            html += '<p class="submit-tips text-danger" style="color:red"></p>';
            html += '<div class="botton"><a  onclick="submitForm(\''+mdId+'\')" id="submitMsg_'+mdId+'">'+langUtil.Global_submit+'</a></div>';
            $container.html(html);
            // if(!$("body").hasClass("edit")){
            // 	$("#form_submit"+mdId).find(".SetReCode").trigger("click");
            // }
            webUtil.SetReCode($("#form_submit"+mdId+" .SetReCode"),mdId);
        }
    });
};
webUtil.SetReCode=function(thiz,mdId){
    if(window.WebModel=="edit")
    {
        var imgurl=imgPath+'images/iyong/genImgCode.jpg';
    }
    else
    {
        var imgurl = '/img/genImgCode.do?specialCode=' + mdId + '&x=' + Date.now();
    }
    $(thiz).attr("src", imgurl);
};
/*轮播多图开始*/
webUtil.resizeWidth = function(mdId,images){
    var boxWidth = $("#"+mdId).width();
    if($(".box_carousel").attr("data-dmodel") == "float") {
        $.each(images, function(i,item) {
            var curImgWidth = $(this).find("img").width(),
                leftWidth = (boxWidth - curImgWidth) / 2;
            $(this).find("img").css({position:"absolute",left:leftWidth});
            if($(this).find(".txt_hide").length > 0) {
                $(this).find(".txt_hide").css({"margin-left":0,left:leftWidth});
            }
        });
    }else{
        $(".box_carousel").find("ul").find("img").css({position:"",left:""});
    }
}
webUtil.textCenter = function(images){
    $.each(images, function(i,item) {
        $(this).find("img").load(function(){
            var curImgWidth = $(this).width();
            if(curImgWidth > 1200) {
                curImgWidth = 1200;
            }
            console.log(curImgWidth);
            var	halfImgWidth = -curImgWidth / 2;
            $(this).parent("a").next().css({width:curImgWidth,"margin-left":halfImgWidth,left:"50%"});
        })
    });
}
webUtil.superSlideArg = function(mdId,status,time,speed,skin_s,imgList) {
    if(imgList){
        require(["SuperSlide"],function(){
            var $sList=$(".slideBox_"+mdId).find(".tempWrap");
            if( $sList.length >0){//查询有无存在结构
                $sList.find("ul").removeAttr("style");
                $sList.find("li").removeAttr("style");
                $(".slideBox_"+mdId+" > .bd").html($sList.html()); 
            }
            //if($(".slideBox_"+mdId).width()==0){
                //var bwidth=$("#carousel_"+mdId).attr("data-bwidth");
                var $parentBox=$("#carousel_"+mdId);
                // $(".slideBox_"+mdId).css({width:$parentBox.attr("data-bwidth"),height:$parentBox.attr("data-bheight")}).attr("data-listw",$parentBox.attr("data-bwidth")); 
                $(".slideBox_"+mdId).find(".bd ul").attr("data-listw",$parentBox.attr("data-bwidth")); 

            //}
            $(".slideBox_"+mdId).slide({
                mainCell: ".bd ul",
                titCell: ".hd ul",
                autoPage:true,
                prevCell:".hleft",
                nextCell:".hright",
                autoPlay: status,
                easing:"swing",
                effect:"left",
                interTime: time,
                delayTime: speed
            });
            $("#"+mdId).find(".carousel").find(".bd").find("ul").height("100%");
            /*显示标题栏时减去标题栏高度*/
            // if(WebModel=='edit'){
            // 	if(skin_s == 1) {
            // 		if($("#"+mdId).find(".has_size_"+mdId).length > 0){
            // 			var	has_s = $("#"+mdId).find(".has_size_"+mdId);
            // 		}else{
            // 			var has_s = $("#"+mdId).find(".has_size");
            // 		}
            // 		var skin_n = $("#skin_nav_"+mdId).height();
            // 		has_s.height(has_s.height() - skin_n);
            // 	}
            // }
        });
    }
}
webUtil.carousel = function(mdId,itemChecked){
    require(["fancyJs"],function(){
        if(itemChecked == "0") {
            $('.fancybox_'+mdId).fancybox({
                helpers : {
                    overlay : {closeClick: false}
                },
                afterLoad : function() {
                    this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
                }
            });
        };
        if(itemChecked == "1") {
            require(["fancybox/jquery.fancybox-thumbs"],function() {
                $('.fancybox-thumbs_'+mdId).fancybox({
                    prevEffect : 'none',
                    nextEffect : 'none',
                    closeBtn  : true,
                    arrows    : true,
                    nextClick : true,
                    helpers : {
                        thumbs : {
                            width  : 50,
                            height : 50
                        },
                        overlay : {closeClick: false}
                    }
                });
            })
        }
    });
}
/*轮播多图结束*/
/*网站横幅开始*/
webUtil.bannerArg = function(mdId,status,time,speed){
    $(".slideBox_"+mdId).find(".bd").children().remove();
    $("#banners_"+mdId).find("li").css({height:$("#"+mdId).height()});
    var banner_slide_width=$("#web_design_main").width();
    $("#banners_"+mdId).find("li").width(banner_slide_width);
    $(".slideBox_"+mdId).find(".tempWrap").width(banner_slide_width);
    $(".slideBox_"+mdId).find(".bd").html($("#banners_"+mdId).html());
    $(".slideBox_"+mdId).slide({
        mainCell: ".bd ul",
        titCell: ".hd ul",
        prevCell:".hleft",
        nextCell:".hright",
        autoPage:true,
        easing:"swing",
        autoPlay: status,
        effect:"leftLoop",
        interTime: time,
        delayTime: speed
    });
    $("body").data("bodyw",$(window).width());
    $(window).resize(function(event) {
        var body_w=$("body").data("bodyw");
        if(body_w!=$(window).width()){
            webUtil.bannerArg(mdId,status,time,speed);
        }
    });
    if(WebModel=="edit"){
        $("#"+mdId).on( "resizestop", function(event, ui){
            webUtil.bannerArg(mdId,status,time,speed);
        });
    }
}
/*网站横幅结束*/
/*图文展示开始*/
webUtil.imgTextFunc = function(mdId,tempStyle,padding) {
    padding = padding.replace('px','');
    if(tempStyle=="left" || tempStyle=="right"){
        var c=$(".imageText_img_div_"+mdId).width();
        var cc=parseInt(c)+parseInt(padding)+"px";
        $(".imageText_text_"+mdId).css({width:"calc(100% - "+cc+")"})
    }
}
webUtil.imgTextFunc2 = function(mdId) {
    $("#"+mdId+" .imgText_hover").find(".hover_pic").removeAttr("style");
    $("#"+mdId+" .imgText_hover").hover(function () {
        $(this).find(".hover_pic").stop(true,true).fadeIn(500);
    },function (){
        $(this).find(".hover_pic").stop(true,true).fadeOut(500);
    });
}
/*图文展示结束*/
/*滚动公告开始*/
webUtil.rollingFunc = function(mdId,speed,direction,time,r_tpl){
    var r_speed = null;
    if(speed == "auto"){
        r_speed = 65;
    }else if(speed == "slow"){
        r_speed = 100;
    }else {
        r_speed = 30;
    }
    $("#"+r_tpl+"_"+mdId).find(".list").kxbdSuperMarquee({
        isEqual:false,
        duration:r_speed,
        distance:30,
        time:time,
        direction:direction
    });
}
/*滚动公告结束*/

webUtil.picFunc2 = function(mdId,p_tpl,isSrc1,src,iconClass,box_w,box_h,l_bd){
    if(WebModel=='edit'){
        webUtil.picFunc1(mdId,p_tpl,box_w,box_h,l_bd);
    }
    if(isSrc1 != "0") {
        if(src != ""){
            $("#"+p_tpl+"_"+mdId).hover(function(){
                $(this).find(".hoverImg").stop().fadeIn(300);
            },function(){
                $(this).find(".hoverImg").stop().fadeOut(300);
            })
        }else if(iconClass != ""){
            $("#"+p_tpl+"_"+mdId).hover(function(){
                $(this).find(".hoverI").stop().prev().fadeOut(300);
                $(this).find(".hoverI").stop().fadeIn(300);
            },function(){
                $(this).find(".hoverI").stop().prev().fadeIn(300);
                $(this).find(".hoverI").stop().fadeOut(300);
            })
        }
    }
    if($("#"+mdId+" img.lazy").length > 0){
        webUtil.lazyloadList("#"+mdId+" img.lazy");
    }
};
/*在线地图*/
webUtil.onlineMapLoad = function(mdId,mapPointLng,mapPointLat,mapInfo,width,height){
    if(WebModel=="edit" && width){
        webUtil.onlineMapDrag(mdId);
    }
    require(["jquery","async!BMap"],function($){
        var $mapDom=$("#baiduMap_"+mdId);
        if($mapDom.length > 0){//修复独立设置时，页面找不到节点
            if(width){
                // if(width!="100%"){
                if(width.indexOf("%")<0)
                {
                    width=width+"px";
                }
                $mapDom.css({width:width,height:height});
            }
            var map = new BMap.Map("baiduMap_"+mdId);		/* 创建map实例 */
            if(mapPointLng == "") {
                var point = new BMap.Point(113.410312,22.507476); 	/* 创建坐标点»*/
            }else{
                var point = new BMap.Point(mapPointLng,mapPointLat); 	/* 创建坐标点»*/
            }
            map.centerAndZoom(point, 17);
            var newMaker = new BMap.Marker(point);
            map.addOverlay(newMaker);
            var pointSize = {
                width : 280     /* 信息窗口宽度*/
            }
            if( mapInfo ){
                var infoWindow = new BMap.InfoWindow( mapInfo,pointSize);/*BMap.InfoWindow创建一个信息窗对象*/
                newMaker.openInfoWindow( infoWindow );  /* 打开信息窗口*/
            }
            newMaker.addEventListener("click", function(){
                var infoWindow = new BMap.InfoWindow( mapInfo,pointSize);/*BMap.InfoWindow创建一个信息窗对象*/
                newMaker.openInfoWindow( infoWindow );  /* 打开信息窗口*/
            });

            var bMapNavigation = new BMap.NavigationControl();  /*创建地图平移缩放控件*/
            map.addControl( bMapNavigation );				/* 添加一条鱼骨*/
            var bMapScale = new BMap.ScaleControl();  /*创建地图比例尺控件*/
            map.addControl( bMapScale );
        }	  /* 添加比例尺*/
    })
};
/*多列*/
webUtil.setMoreColumn = function(mdId,temp,colWidth){
    require(["jquery"],function($){
        if($("body").hasClass('edit')){
            var $moreColumn=$("#"+mdId+" .moreColumnTxt > .kenfor-column");
            var $moreColumnTxt=$( "#"+mdId+" .normal_padding" );
            $.each($moreColumnTxt, function (i, item) {
                var tdwidth=$(this).css("width");
                if(tdwidth.indexOf("px") > -1){
                    tdwidth=tdwidth.replace("px","");
                }
                $(this).attr("width",tdwidth);
            });
            $moreColumnTxt.resizable({
                handles: 'e',
                autoHide:true,
                minWidth:20,
                create: function() {
                    var columnRight = (colWidth-2)/2;
                    var handle=$("#"+mdId+" .moreColumnTxt").children('.ui-resizable-handle');
                    handle.css({right:columnRight});
                    handle.addClass('ui-resizable-moreCol-handle');
                    handle.attr({title:'按住鼠标调整列宽'});
                    var box_h=$("#"+mdId).height();
                },
                start: function(event, ui){
                    webUtil.resizeTip(event,"moreColumn","start");
                    $moreColumn.css({"width":""});
                },
                resize: function(event, ui){
                    webUtil.resizeTip(event,"moreColumn","resize",ui.size.width,"");
                    /*					var $pDom=$("#"+mdId).find('div[data-template="products"]');
                     var $plistDom=$pDom.find("#products_"+$pDom.attr("id"));
                     if($pDom){
                     $plistDom.data("bwidth",$pDom.width());
                     $plistDom.data("boxw",$pDom.width());
                     data-boxw
                     console.log($plistDom.data("bwidth"));
                     }*/
                },
                stop: function(event, ui){
                    var colStyle=$("#"+temp+"_"+mdId).find(".moreColumnTxt");
                    var styleList=[];
                    var colUtil = require("kenfor/columnUtils");
                    var viewUtils = require("kenfor/viewUtils");
                    $.each(colStyle, function(i, item) {
                        if($(this).attr("style")){
                            styleList.push($(this).attr("style"));
                            var tdwidth=$(this).css("width");
                            if(tdwidth.indexOf("px") > -1){
                                tdwidth=tdwidth.replace("px","");
                            }
                            $(this).attr("width",tdwidth);
                        }else{
                            styleList.push("");
                        }
                        $(this).children(".kenfor-column").width($(this).width());
                        var listbox=$(item).find(".modulebox");
                        var ui_width=$(this).width();
                        $.each(listbox, function (k,list) {
                            var boxmodel=$(list).data("model");
                            var list_Id=$(list).attr("id");
                            var box_data=boxmodel.attributes.dataAttributes;
                            $(list).children(".view").attr("data-bwidth",ui_width);
                            colUtil.getRenewItemModel(list_Id,function (item) {
                                box_data.bwidth=ui_width;
                                item.attributes.dataAttributes.bwidth=ui_width;
                            });
                        });
                    });
                    var thiz=$("#"+mdId).data("model");
                    thiz.attributes.dataAttributes.colStyle=styleList;
                    colUtil.getRenewItemModel(mdId,function (item) {
                        item.attributes.dataAttributes.colStyle=styleList;
                    });
                    webUtil.resizeTip(event,"moreColumn","stop");
                    viewUtils.operating();
                    var $pDom=$("#"+mdId).find('div[data-template="products"]');
                    if($pDom.length>0){
                        $("#"+$pDom.attr("id")).data("model").trigger("change");
                    }
                }
            });
            $("#"+mdId).css({width:""})
        }
    });
};
webUtil.setQrCode=function(mdId,qrCode_w){
    if(WebModel){
        require(["jquery"],function(){
            $("#"+mdId).css({width:qrCode_w});
            $("#qrcode_"+mdId).css({width:qrCode_w});
        })
    }
}

webUtil.showTip = function(tip,time){
    var t = time ? time : 1;
    var fileHtml='<div id="webupload_tip"><div class="webupload_body"><font class="wl_tip"></font><span class="tclose close_tip"></span></div></div>';
    if($("#webupload_tip").length == 0){
        $("body").append(fileHtml);
        $("#webupload_tip").fadeIn(500);
    }
    var $dom=$("#webupload_tip");
    $dom.find(".wl_tip").html(tip);
    setTimeout(function(){
        $dom.fadeOut(500).remove();
    },t * 1000);
    $(".close_tip").click(function(){
        $dom.fadeOut(500).remove();
    })
}
webUtil.getBackPsw = function(dom,mdId){
    require(["public/langUtil"],function(){
        if($("body").hasClass("edit")){
            webUtil.showTip(langUtil.showTip,2);
        }else{
            $("#popBox_"+mdId+" input").keydown(function(e){
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    $('.lg_comBtn:visible').click();
                }
            });
            var checkUtil=require("kenfor/kenforJsUtil");
            var Clonehtml = $("#"+dom).find(".popBox").clone(true);
            if(Clonehtml){
                $("#"+dom).find(".popBox").remove();
                $("body").append(Clonehtml).find("#popBox_"+mdId).show();
                dataUtil.setImgCode($("body > .popBox").find(".lg_yzmCode"));//执行验证码
                $("body > .popBox").find(".ui-step-wrap").remove();
                var $lg_stepBox = $("body > .popBox").find("#lg_step_"+mdId);
                require(["jquery.step.min"],function(){
                    $lg_stepBox.step({
                        index: 0,
                        time: 500,
                        title: [langUtil.checkId, langUtil.resetPsw, langUtil.complete]
                    });
                })
                //关闭窗口
                var delBtn = $("body > .popBox").find("span.lg_del_btn");
                delBtn.click(function(){
                    if($("#"+dom).find(".popBox").length == 0){
                        $("#"+dom).append(Clonehtml).find(".popBox").hide();
                        $("#"+dom).find(".popBox .lg_item").hide();
                        $("#"+dom).find(".popBox .lg_checkId ").show();
                        $("#"+dom).find(".popBox input").val("");
                    }
                    $("body > .popBox").remove();
                });
                //点击下一步
                var nextBtn1 = $("body > .popBox").find("#lg_comBtn1_"+mdId);
                var nextBtn2 = $("body > .popBox").find("#lg_comBtn2_"+mdId);
                var nextBtn3 = $("body > .popBox").find("#lg_comBtn3_"+mdId);
                var nextBtn4 = $("body > .popBox").find("#lg_comBtn4_"+mdId);
                nextBtn1.on("click", function() {
                    var phoneNum = $("#lg_phone_"+mdId).val().trim(),
                        yzmNum = "#lg_checkCode_"+mdId;
                    reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/;
                    var result = reg.test(phoneNum),
                        checkResult,
                        status,
                        sendSms,
                        getResult;
                    if(result){
                        var checkResult=dataUtil.forgetByPhone("#lg_phone_"+mdId);
                        if(checkResult){
                            status = dataUtil.checkCode(yzmNum);
                        }
                        if(status){
                            sendSms=dataUtil.lookforPassword("#lg_phone_"+mdId,"#lg_countNum_"+mdId);
                        }
                        if(sendSms){
                            getResult=dataUtil.getResult();
                        }
                        if(checkResult && status && sendSms && getResult){
                            $("#lg_phoneBox_"+mdId).text(phoneNum);
                            $("#lg_form_all_"+mdId).find(".lg_item").hide().end().find(".lg_resetPsw1").show();
                            //dataUtil.lookforPassword("#lg_phone_"+mdId,"lg_countNum_"+mdId);
                        }else{
                            $lg_stepBox.toStep(0);
                        }
                    }else{
                        var tips = "";
                        if(phoneNum == ""){
                            tips = langUtil.isEmpty;
                        }else{
                            tips = langUtil.phoneError;
                        }
                        webUtil.showTip(tips,1.5);
                        return false;
                    }
                });
                nextBtn2.on("click", function() {
                    var checkResult=dataUtil.forgetByPhone("#lg_phone_"+mdId,"#lg_yzmIpt_"+mdId);
                    var getResult=dataUtil.getResult();
                    if(checkResult && getResult){
                        $lg_stepBox.nextStep();
                        $("#lg_form_all_"+mdId).find(".lg_item").hide().end().find(".lg_resetPsw2").show();
                    }else{
                        $lg_stepBox.toStep(0);
                    }
                });
                nextBtn3.on("click", function() {
                    var getResult=dataUtil.getResult();
                    if(getResult){
                        var pswVal = $("#lg_setPsw_"+mdId).val().trim(),
                            pswVla1 = $("#lg_comfirPsw_"+mdId).val().trim();
                        if(pswVal == "" || pswVal.length < 6 || pswVal.length > 20){
                            webUtil.showTip(langUtil.pswLenError,1.5);
                            return false;
                        }else if(pswVal != pswVla1){
                            webUtil.showTip(langUtil.twoPswError,1.5);
                            return false;
                        }else{
                            var status = dataUtil.resetPSW("#lg_setPsw_"+mdId);
                            if(status){
                                $("#lg_form_all_"+mdId).find(".lg_item").hide().end().find(".lg_getPsw_done").show();
                                $lg_stepBox.nextStep();
                            }
                        }
                    }else{
                        $lg_stepBox.toStep(0);
                    }
                });
                nextBtn4.on("click", function() {

                })
            }
        }
    })
}
webUtil.checkPswStrong = function(thiz,dom){
    var pswIpt = $(thiz).val(),
        spans = $("#"+dom).find("span");
    if(pswIpt.length >= 6 && pswIpt.length <= 20){
        var regArr = [/[a-z]/g,/[0-9]/g,/[A-Z]/g,/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/g], //需校验的正则数组
            sec = 0;//定义一个存放密码强度的变量
        for(var i = 0;i < regArr.length;i++){
            if (pswIpt.match(regArr[i])) {
                sec++;   //匹配到一个就加1
            }
        }
        $(spans).css({"background":"#f3d1b8",color:"#555"});
        if(sec == 1) {
            $(spans).eq(0).css({"background":"#c8252a",color:"#fff"});;
        }else if(sec == 2){
            $(spans).eq(1).css({"background":"#c8252a",color:"#fff"});;
        }else if(sec == 3){
            $(spans).eq(2).css({"background":"#c8252a",color:"#fff"});;
        }else{

        }
    }
}
webUtil.lg_keyUp = function(event,thiz,dom){
    event=document.all?window.event:event;
    if((event.keyCode || event.which) == 8 && $(thiz).val().trim() == ''){
        $("#"+dom).find("span").css({background:"#f9cfb2",color:"#555"})
    }
}
webUtil.regCheck = function(mdId){
    require(["public/langUtil"],function(){
        if($("body").hasClass("edit")){
            webUtil.showTip(langUtil.showTip,2);
        }else{
            var checkUtil = require("kenfor/kenforJsUtil"),
                formItemList = $("#regForm_"+mdId).find(".regForm_item"),//找到所有的表单项
                info = {};//需提交的data数据
            var flag = true;
            $.each(formItemList, function(k,i) {
                var itemType = $(i).attr("data-inptp"),
                    itemName = $(i).attr("data-propn"),
                    itemIsrq = $(i).attr("data-isrq"),
                    isItemHasName = $(i).attr("name"),
                    itemVal = $(i).val().trim();
                if(itemIsrq == "1"){//必填
                    //先判断是否为空
                    if(!checkUtil.isEmpty(itemVal)){
                        webUtil.showTip(itemName+langUtil.noEmpty,1.5);
                        flag = false;
                        return false;
                    }
                    //按类型校验
                    switch(itemType){
                        case "phone":
                            if(!checkUtil.isPhone(itemVal)){
                                webUtil.showTip(itemName+langUtil.formatError,1.5);
                                flag = false;
                                return false;
                            }
                            info["cstacc"] = itemVal;
                            info["regTp"] = "2";
                            break;
                        case "psw":
                            if(!checkUtil.isLength(itemVal,6,20)){
                                webUtil.showTip(itemName+langUtil.formatLenError,1.5);
                                flag = false;
                                return false;
                            }else if(checkUtil.isSpace(itemVal)){
                                webUtil.showTip(itemName+langUtil.noSpace,1.5);
                                flag = false;
                                return false;
                            }
                            info["cstpsw"] = itemVal;
                            break;
                        case "checkPsw":
                            var Psw = $("#reg_setPsw_"+mdId).val();
                            if(itemVal != Psw){
                                webUtil.showTip(langUtil.twoPsw,1.5);
                                flag = false;
                                return false;
                            }
                            break;
                        case "text":

                            break;
                        case "select":

                            break;
                        default:

                    }
                }
                //必填非必填都需要提交数据
                if(isItemHasName){
                    info[isItemHasName] = itemVal;
                }
            })
            console.log(info);
            //提交数据注册
            if(flag){
                $.ajax({
                    type:"POST",
                    url:"/w/cst/registerCst.do",
                    data:info,
                    success:function(data){
                        console.log(data);
                        if(data.result == "SUCCESS"){
                            var successTips = '<div class="reg_body_mask"><div class="reg_mask"></div><div class="reg_sTips"><p>'+langUtil.regSuccess+'</p><p><a href="javascript:void(0)" class="autoLg">'+langUtil.Global_btn+'</a><a href="index.html">'+langUtil.backToHome+'</a></p></div></div>';
                            $('body').append(successTips);
                            $(".reg_body_mask a").click(function(){
                                if($(this).hasClass("autoLg")){
                                    webUtil.lg_submit("reg_phoneNum_"+mdId,"reg_comfirmPsw_"+mdId);
                                }
                                $('body').remove($(".reg_body_mask"));
                            })
                        }else{
                            console.log(data.errorMsg.msg);
                        }
                    }
                });
            }
        }
    })
}
webUtil.getRegFormItem = function(mdId,AgreementContent){
    require(["public/langUtil"],function(){
        var str = '<ul>';
        str +=  '<li>'+
            '<label for="reg_phoneNum_'+mdId+'">' + langUtil.phoneNum + langUtil.Global_symbol + '</label>'+
            '<input type="text" id="reg_phoneNum_'+mdId+'" class="regForm_item" data-isrq="1" data-inptp="phone" data-propn="'+langUtil.phoneNum+'"/>'+
            '<span>*</span>'+
            '</li>'+
            '<li>'+
            '<label for="reg_smsCode_'+mdId+'">' + langUtil.Global_verification + langUtil.Global_symbol + '</label>'+
            '<input type="text" id="reg_smsCode_'+mdId+'" class="regForm_item" name="code" data-isrq="1" data-inptp="text" data-propn="'+langUtil.Global_verification+'" autocomplete="off" style="width: 131px;"/>'+
            '<span class="getFreeCode" id="getFreeCode_'+mdId+'" onclick="dataUtil.sendSmsCode(\'#reg_phoneNum_'+mdId+'\',\'#getFreeCode_'+mdId+'\')">' + langUtil.getFreeCode + '</span>'+
            '<span>*</span>'+
            '</li>'+
            '<li>'+
            '<label for="reg_setPsw_'+mdId+'">' + langUtil.setPsw + langUtil.Global_symbol + '</label>'+
            '<input type="password" id="reg_setPsw_'+mdId+'" class="regForm_item" data-isrq="1" data-inptp="psw" data-propn="'+langUtil.setPsw+'" autocomplete="off"/>'+
            '<span>*</span>'+
            '<p id="reg_tips_'+mdId+'" class="reg_tips">' + langUtil.regTips + '</p>'+
            '</li>'+
            '<li>'+
            '<label for="reg_comfirmPsw_'+mdId+'">' + langUtil.Global_confirmPwd + langUtil.Global_symbol + '</label>'+
            '<input type="password" id="reg_comfirmPsw_'+mdId+'" class="regForm_item" data-isrq="1" data-inptp="checkPsw" data-propn="'+langUtil.Global_confirmPwd+'" autocomplete="off"/>'+
            '<span>*</span>'+
            '</li>';
        //获取表单项
        $.ajax({
            type:"GET",
            url:"/w/cst/infoRegister.do",
            dataType:'json',
            success:function(data){
                //	var regType = data.regTp   注册类型：1.普通账号 2.手机注册 3.邮箱注册
                var formItem = data.data.propcfList;//表单项数组
                $.each(formItem, function(k,i) {
                    var selectItem = i.propvList; //下拉项数组
                    if(i.rgsdp == 1) {
                        str += '<li><label>';
                        str += i.propn;
                        str += '：</label>';
                        if(i.inptp == "text"){
                            str += '<input type="text" class="regForm_item" name="'+i.cstpropcfgid+'" data-inptp="'+i.inptp+'" data-isrq="'+i.isrq+'" data-propn="'+i.propn+'">';
                        }else if(i.inptp == "select"){
                            str += '<select class="regForm_item" name="'+i.cstpropcfgid+'" data-inptp="'+i.inptp+'" data-isrq="'+i.isrq+'" data-propn="'+i.propn+'" >';
                            $.each(selectItem, function(key,item) {
                                if(item.isdef == 1){
                                    str += '<option selected value ="'+item.propv+'" name="'+item.cstpropcfgid+'" data-name="'+item.cstpropvid+'" data-isdef="'+item.isdef+'">';
                                }else{
                                    str += '<option value ="'+item.propv+'" name="'+item.cstpropcfgid+'" data-name="'+item.cstpropvid+'" data-isdef="'+item.isdef+'">';
                                };
                                str += item.propv;
                                str += '</option>';
                            });
                            str += "</select>";
                        }else{
                            //其他类型
                        };
                        if(i.isrq == 1){
                            str += '<span>*</span>';
                        }
                        str += "</li>";
                    }
                });
                if(AgreementContent.status == "1"){
                    // str += '<li class="protocoli"> <p><input type="checkbox" id="protocol_'+mdId+'" class="protocol" checked/> 已阅读并同意以下协议。<b id="linkText_'+mdId+'">《会员服务协议》</b></p></li>';
                    str += '<li class="protocoli"> <p><input type="checkbox" id="protocol_'+mdId+'" class="protocol" checked/>';
                    str +=  langUtil.re_protocol
                    str += '<font id="linkText_'+mdId+'">'
                    str += langUtil.re_protocolItem
                    str += '</font></p></li>';
                }
                str += '<li>'+
                    '<a href="javascript:void(0)" onclick="webUtil.regCheck(\''+mdId+'\');" id="register_'+mdId+'" class="reg_btnBg">' + langUtil.register + '</a>'+
                    '</li>';
                str += '</ul>';
                $("#regForm_"+mdId).html(str); //把表单项插入from中ul里面
                //设置密码提示
                $("#reg_setPsw_"+mdId).focus(function(){
                    $(this).parent().find("p").show();
                }).blur(function(){
                    $(this).parent().find("p").hide();
                })
                //协议CheckBox
                if(!$("body").hasClass("edit")){
                    if(AgreementContent.status == "1") {
                        $("#protocol_"+mdId).change(function(){
                            if($(this).prop("checked") == true){
                                $("#register_"+mdId).removeClass("disabled");
                            }else{
                                $("#register_"+mdId).addClass("disabled");
                            }
                        })
                    }
                }
                //点击弹出协议层
                $("#linkText_"+mdId).click(function(){
                    webUtil.showProtocol(mdId,"web_design_main",AgreementContent)
                })
            },
            error:function(data){
                console.log(data.errorMsg.msg);
            }
        });
    })
}
webUtil.showProtocol = function(mdId,dom,AgreementContent){
    if($("body").hasClass("edit")){
        webUtil.showTip(langUtil.showTip,2);
    }else{
        var html = '';
        html += '<div id="Protocol">' +
            '<div class="dialogBg" style="display:block;"></div>' +
            '<div class="dailog">' +
            '<div class="dailogTop">' +
            AgreementContent.rgamtt +
            '<span class="agreeClose_btn">×</span>' +
            '</div>' +
            '<div class="dialogContent">' +
            AgreementContent.rgamctt +
            '</div>' +
            '<div class="btnDiv">' +
            '<span id="agree_'+mdId+'">同意</span>' +
            '<span class="agreeClose_btn">取消</span>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("#" + dom).append(html);
        $(".agreeClose_btn").click(function(){
            $("#Protocol").remove();
        })
        $("#agree_"+mdId).click(function(){
            $("#Protocol").remove();
            $("#protocol_"+mdId).prop("checked", true);
            if($("#register_"+mdId).hasClass("disabled")){
                $("#register_"+mdId).removeClass("disabled");
            }
        })
    }
}
webUtil.getMemberInfor = function(){
    var userPic = "";
    var defer = $.Deferred();
    $.ajax({
        type:"GET",
        url:"/w/customer/infoDisplayCustomer.do",
        //async:false,
        success:function(data){
            userPic = data.data.csthi;
            defer.resolve(userPic);
        }
    });
    // return userPic;
    return defer.promise();
}
webUtil.lg_submit = function(user,psw,urlType){
    require(["public/langUtil","jquery.cookie"],function(){
        if($("body").hasClass("edit")){
            webUtil.showTip(langUtil.showTip,2);
        }else{
            var checkUtil = require("kenfor/kenforJsUtil");
            var username = $("#"+user).val().trim(),
                password = $("#"+psw).val().trim();
            if(!checkUtil.isEmpty(username)){
                webUtil.showTip(langUtil.enterAccount,1.5);
                return false;
            }else if(!checkUtil.isEmpty(password)){
                webUtil.showTip(langUtil.enterPsw,1.5);
                return false;
            }else{
                $.ajax({
                    type:"POST",
                    url:"/w/cst/loginCst.do",
                    data:{
                        cstacc:username,
                        cstpsw:password,
                    },
                    success:function(data){
                        console.log(data);
                        if(data.result == "SUCCESS"){
                            webUtil.showTip(langUtil.loginSucc,1);
                            // setTimeout(function(){
                            // 	if(data.data.config.lnfwtp == "1"){
                            // 		window.open(data.data.config.lnfw,"_blank")
                            // 		// window.location.href = data.data.config.lnfw;
                            // 	}else{
                            // 		window.location.href = "member/index.html";
                            // 	}
                            // },1000);
                            //判断是否自动登录
                            var autoLgInfo = "";
                            if(data.data.config.isautoln == '1'){
                                $.cookie('autoLgInfo',null);
                                autoLgInfo = JSON.stringify({"autoName":data.data.azdgAccount,"autoPsw":data.data.azdgPassword});
                                $.cookie("autoLgInfo",autoLgInfo,{expires:14});
                            }else{
                                if($.cookie('autoLgInfo')!="null"){
                                    $.cookie('autoLgInfo',null);
                                }
                            }
                            if(urlType && urlType != "0"){
                                window.location.href = urlType;
                            }else if(data.data.config.lnfwtp == "1"){
                                // window.open(data.data.config.lnfw,"_blank")
                                window.location.href = data.data.config.lnfw;
                            }else{
                                window.location.href = "member/index.html";
                            }
                            //设置是否记住用户名
                            var checkCookie = $("input[name=lg_checkUsername]").is(":checked");
                            var doMain = document.domain;
                            var mInfo = JSON.stringify({"name":username,"status":checkCookie,"domain":doMain});
                            $.cookie("memberInfo",mInfo,{expires:7});
                        }else{
                            var errorTips = "";
                            if(data.result == "LOGINERROR" || data.result == "PWDERROR"){
                                errorTips = langUtil.account_psw_error;
                            }else if(data.result == "ACCOUNTNOTEXIST"){
                                errorTips = langUtil.noAccount;
                            }else if(data.result == "ACCOUNTFROZEN"){
                                errorTips = langUtil.freezeAccount;
                            }else if(data.result == "NOTACTIVE"){
                                errorTips = langUtil.noMail;
                            }else if(data.result == "ACCOUNTNOTPERMISSION"){
                                errorTips = langUtil.accountPermision;
                            }else{
                                errorTips = langUtil.loginError;
                            }
                            webUtil.showTip(errorTips,1.5);
                        }
                    }
                });
            }
        }
    })
}
webUtil.lg_autoSubmit = function(urlType){
    require(["jquery.cookie"],function(){
        if($.cookie('autoLgInfo') && $.cookie('autoLgInfo') != "null"){
            var autoLgInfo = JSON.parse($.cookie('autoLgInfo'));
            $.ajax({
                type:"POST",
                url:"/w/cst/loginCst.do",
                data:{
                    "autologon":1,
                    "azdgAccount":autoLgInfo.autoName,
                    "azdgPassword":autoLgInfo.autoPsw
                },
                success:function(data){
                    if(data.result == "SUCCESS"){
                        // window.location.href="member/index.html";
                        if(urlType != "0"){
                            window.location.href = urlType;
                        }else if(data.data.config.lnfwtp == "1"){
                            window.location.href = data.data.config.lnfw;
                        }else{
                            window.location.href = "member/index.html";
                        }
                    }
                }
            });
        }
    })
}
webUtil.delAutoLgInfo = function(pageurl){
    require(["jquery.cookie"],function(){
        if($.cookie('autoLgInfo')!="null"){
            $.cookie("autoLgInfo",null,{path:'/'});
        }
        if(!pageurl){
            pageurl="login.html";
        }
        window.location.href="/w/cst/logout.do?uri="+realpath+pageurl;
    })
}
webUtil.getMemberInfo = function(){
    require(["jquery.cookie"],function(){
        var memberInfo=$.cookie('memberInfo');
        if(memberInfo){
            var memberInfo = JSON.parse(memberInfo);
            var doMain = document.domain;
            if(doMain == memberInfo.domain){
                if(memberInfo.status == true){
                    $("input[name=lg_checkUsername]").attr("checked",true);
                    $(".lg_username").val(memberInfo.name);
                }else{
                    $("input[name=lg_checkUsername]").attr("checked",false);
                    $(".lg_username").val("");
                }
            }
        }
    })
}
webUtil.infoAgreement = function(){
    var AgreementContent = {};
    var defer = $.Deferred();
    $.ajax({
        type:"GET",
        url:"/w/customer/infoCustomerAgreement.do",
        dataType:'json',
        //async: false,
        success:function(data){
            if(data.result == "SUCCESS"){
                var data = data.data[0];
                AgreementContent["status"] = data.isrgsagt;
                if(data.isrgsagt == 1){
                    AgreementContent["rgamtt"] = data.rgamtt;
                    AgreementContent["rgamctt"] = data.rgamctt;
                }
                defer.resolve(AgreementContent);
            }
        }
    });
    return defer.promise();
}

webUtil.setShopCart=function(mdId,domlist,carSty){
    if($(".box_ordercart").length==0){
        $("#"+mdId+" .shoppingCart").hover(function(){
            /*当鼠标移动到.hov的时候，执行下面的事件*/
            $(this).find(".cartButton_hover").css({ 'z-index': "2", 'height': "auto" }).stop(true).slideDown(300);
            if(carSty == "styleBtn4" || carSty == "styleBtn5"){
                $(this).find(".cartPanel").css("border-radius","5px 5px 0 0");
            }
        },function(){
            $(this).find(".cartButton_hover").css({ 'z-index': "1", 'height': "auto" }).stop(true).slideUp(300);
            if(carSty == "styleBtn4" || carSty == "styleBtn5"){
                $(this).find(".cartPanel").css("border-radius","25px");
            }
        });
    }
    webUtil.UpdataCartNum();
    if(WebModel=="view" && $(".box_ordercart").length==0){
        $("#"+mdId+" .shoppingCart_a").click(function (e) {
            e.preventDefault();
            window.location.href="mycart.html";
        });
    }
}
//className,domlist
webUtil.UpdataCartNum=function(){
    require(["csspath/member/js/shopUtil"],function(){
        var obj = "shoppingAmount";
        var domlist = ".cart_list_dom";
        $.when(shopUtil.loadCartData()).done(function(CartData){
            var orderNum = CartData ;
            var orderNum_use = [];
            if(orderNum  == undefined) {  //后台页面问题
                orderNum = [];
            } else {
                for(var i = 0; i < orderNum.length; i++) {
                    if(orderNum[i].isshf && orderNum[i].pdsts) {
                        orderNum_use.push(orderNum[i]);
                    }
                }
            }
            var $dom=$(domlist);
            if(orderNum_use && orderNum_use.length > 0){
                if(domlist){
                    var toalPrice=0;
                    var totalnum =0;
                    var cart_html = '<div class="list_goods">';
                    cart_html+='<div class="cart_top">'+langUtil.Shop_newProdoct+'</div>';
                    cart_html+='<div class="cartContent">';
                    cart_html+="<ul id ='cart_ul'>";
                    $.each(orderNum_use, function(i, item) {
                        if(item.isshf == 1 && item.pdsts == 1) {
                            if(!item.furl) {
                                item.furl = imgPath + '/images/nopic.jpg';
                            }
                            cart_html += '<li class="cart-delete">';
                            cart_html += '<div class="cart_img"><a href="displayproduct.html?id=' + item.pdid + '" target="_blank"><img src="' + item.furl + '"/></a></div>';
                            cart_html += '<div class="cart_name"><a href="displayproduct.html?id=' + item.pdid + '" target="_blank">' + item.pdn + '</a></div>';
                            cart_html += '<div class="cart_info">';
                            cart_html += '<div class="cart_price">' + langUtil.ordercart_Amount + item.slpic + 'x' + item.ct + '</div>';
                            cart_html += '<a href="javascript:;" data-wsctid="' + item.wsctid + '" class="cart_del">' + langUtil.Shop_delete + '</a>';
                            cart_html += '</div>';
                            cart_html += '</li>';
                            totalnum = totalnum + item.ct;
                            toalPrice = toalPrice + item.slpic * item.ct;
                        }
                    });
                    toalPrice=parseFloat(toalPrice).toFixed(2);
                    $("."+obj).text(orderNum_use.length);
                    cart_html+="</ul>";
                    cart_html+='</div>'
                    cart_html+='<div class="cart_but">'
                    cart_html+='<div class="cart_ft_info">'+langUtil.Shop_compropriedade+'<span class="cart_num">'+ totalnum +'</span>'+langUtil.Shop_comprodoct+langUtil.Shop_ShoppingTotal+'<span class="cart_price">'+langUtil.Global_Amount+ toalPrice +'</span></div>'
                    cart_html+='<a class="cart_ft_lk" href=mycart.html>'+langUtil.Shop_goshopping +'</a>'
                    cart_html+='</div>'
                    cart_html+='</div>'
                    $dom.html(cart_html);
                    $('.cart_del').click(function(){
                        var wsctidel = $(this).data("wsctid");
                        var thiz = this;
                        $(thiz).parent().parent().remove();
                        $("."+obj).text($(".cart-delete").length);
                        $.when(shopUtil.delCartData([wsctidel])).done(function(flag){})
                    })
                }
            }else if($("#cart_ul li").length == 0){
                $("."+obj).text("0");
                if(domlist){
                    var cart_html2= '<div class="NoGoods">'+
                        '<span></span>'+
                        '<div class="NoGoodsText">'+
                        '<p class="langText" data-lang="shoppingCart_tip">'+langUtil.Shop_shoppingTip+'</p>'+
                        '</div>'+
                        '</div>'
                    $dom.html(cart_html2);
                }
            }
        })
    });
}
webUtil.addCar=function(event){
    var src=$(this).data("src");
    var sid=$(this).data("id");
    var e=event;
    require(["csspath/member/js/shopUtil"],function(){
        $.when(shopUtil.setCart(sid)).done(function(flag){
            var flag = flag;
            if(flag){
                /*webUtil.showTip("已成功加入购物车！",1.5);*/
                //webUtil.fly("shopCart",e,src)//购物车动画效果
                // 暂时隐藏加入车动画效果，用下面方法
                webUtil.UpdataCartNum("cart_num");
                webUtil.addCar_pop();
            }
        })
    })
}
webUtil.addCar_pop=function(){
    $.when(shopUtil.loadCartData()).done(function(CartData){
        var data=CartData;
        var price=0;
        var toalNum=0;
        $.each(data,function(i,item){
            if(item.pdsts==1){
                price=price+(item.ct*item.slpic);
                toalNum++;
            }
        })
        price = parseFloat(price).toFixed(2);
        var html='';
        html+='<div id="addCar_pop">';
        html+='<div class="addCar_pop_shadow" onclick="webUtil.closeCar()"></div>';
        html+='<div class="addCar_pop_main">';
        html+='<div class="addCar_pop_t"><span></span>'+langUtil.Shop_joinShopping+'<a href="javascript:void(0)" class="addCar_pop_close" onclick="webUtil.closeCar()"></a></div>';
        html+='<div class="addCar_pop_content">'+langUtil.Shop_ShoppingAll+'<b> '+toalNum+' </b>'+langUtil.Shop_comprodoct+langUtil.Shop_ShoppingTotal+'<b>'+langUtil.Global_Amount+price+'</b></div>';
        html+='<div class="addCar_pop_button"><a href="mycart.html" onclick="webUtil.closeCar()">'+langUtil.Shop_goShoppingClose+'</a><a href="javascript:void(0)" onclick="webUtil.closeCar()">'+langUtil.Shop_ShoppingContinue+'</a></div>';
        html+='</div>';
        html+='</div>';
        $("body #addCar_pop").remove();
        $("body").append(html);
    });
}

webUtil.closeCar=function(){
    $("#addCar_pop").remove();
}
webUtil.fly=function(endId,e,src){
    require(["jquery","jspath/jquery.fly"],function(){
        var offset = $('#'+endId+' .message').offset(), flyer = $('<img class="u-flyer" src="'+src+'"/>');
        var top=e.pageY-$(window).scrollTop();
        var left=e.pageX-$(window).scrollLeft();
        var top1=offset.top-$(window).scrollTop()+10;
        var left1=offset.left-$(window).scrollLeft()+10;
        flyer.fly({
            start: {
                left: left,
                top: top
            },
            end: {
                left: left1,
                top: top1,
                width: 20,
                height: 20
            },
            onEnd: function() {
                /*$("#carTip").show().animate({width: '287px'},300);////右边购物车信息显示小弹窗*/
                webUtil.UpdataCartNum("cart_num");
//				//更新购物车
//				webUtil.shopCarupdate();
                //购物车弹出效果
                webUtil.addCar_pop();
                //销毁抛物体
                this.destory();
            }
        });
    });
}
//webUtil.shopCarupdate = function(){
//	require(["csspath/member/js/shopCar"],function(){
//		initMyInformation();
//	});
//}//有问题
//文件下载分页
webUtil.fileDownPages = function(mdId,fileStyleMode,pageNum,fileSize){
    var ul = $("#fileItemBox_"+mdId).find(".fileList");
    //分页处理
    require(["jquery.Mpagination"],function(){
        var initPagination = function() {
            /* 创建分页*/
            $("#Pagination_"+mdId).pagination(fileSize, {
                first_text:langUtil.Global_first,
                end_text:langUtil.Global_endPage,
                prev_text:langUtil.Global_prePage,
                next_text:langUtil.Global_nextPage,
                num_edge_entries: 1, /*边缘页数*/
                num_display_entries: 6, /*主体页数*/
                callback: pageselectCallback,
                items_per_page:pageNum /*每页显示1项*/
            });
        }();
        /*上面的回调函数*/
        function pageselectCallback(page_index, jq){
            //先清空再填充分页数据
            ul.empty();
            var max_elem = Math.min((page_index+1) *pageNum, fileSize);
            for(var i = page_index * pageNum;i < max_elem;i++){
                var resultId = $("#allFileResults_"+mdId).children("span").eq(i),//每一个span
                    resultHtml = $("#oneFileTpl_"+mdId);//装着一个li模板的盒子
                //得到一个span中保存着的数据
                var data_imgLink = "",
                    data_iconClass="",
                    data_color="";
                if(resultId.attr("data-imgLink") != ""){
                    data_imgLink = resultId.attr("data-imgLink");
                }else{
                    if(resultId.attr("data-iconClass"))
                    {
                        data_iconClass=resultId.attr("data-iconClass");
                        data_color=resultId.attr("data-color");
                    }
                    else
                    {
                        data_imgLink = imgPath + "images/filetype/" + resultId.attr("data-imgType") + ".png";
                    }
                }
                var data_fileId = resultId.attr("data-fileId"),
                    data_fileurl = resultId.attr("data-fileurl"),
                    data_title = resultId.attr("data-title"),
                    data_description = resultId.attr("data-description"),
                    data_date = resultId.attr("data-date"),
                    data_author = resultId.attr("data-author"),
                    data_fsize = resultId.attr("data-fsize"),
                    data_typeEndIndex=data_fileurl.lastIndexOf("."),
                    data_type=data_fileurl.substring(data_typeEndIndex+1);
                //判断展示类型并把以上数据对应的填到li里面
                if(fileStyleMode == '0'){
                    if(data_imgLink)
                    {
                        resultHtml.find("img").attr("src", data_imgLink).parent().show()
                            .end().end().find("i").removeClass().hide();
                    }
                    else
                    {
                        resultHtml.find("img").attr("src","").parent().hide()
                            .end().end().find("i").addClass(data_iconClass).css("color",data_color).show();
                    }

                    if(data_fileId && data_fileId != "undefined" && data_type!="torrent"){
                        resultHtml.find(".title a").attr("href","/w/download.do?fileId="+data_fileId);
                        resultHtml.find(".contect > a").attr("href","/w/download.do?fileId="+data_fileId);
                    }else{
                        resultHtml.find(".title a").attr("href",data_fileurl);
                        resultHtml.find(".contect > a").attr("href",data_fileurl);
                    }
                    resultHtml.find(".title a").attr("title",data_title);
                    resultHtml.find(".title a").text(data_title);
                    resultHtml.find(".brief .defaultSet").text(data_description);
                    resultHtml.find(".issinfo .timesSet").text(data_date);
                    resultHtml.find(".issinfo .userSet").text(data_author);
                }else{
                    resultHtml.find(".fileNameWrap").attr("title",data_title);
                    resultHtml.find(".fileNameWrap").text(data_title);
                    resultHtml.find(".fileSize").text(data_fsize);
                    if(data_fileId && data_fileId != "undefined" && data_type!="torrent"){
                        resultHtml.find(".fileOperate a").attr("href","/w/download.do?fileId="+data_fileId);
                    }else{
                        resultHtml.find(".fileOperate a").attr("href",data_fileurl);
                    }
                }
                resultHtml.children("li").clone(true).appendTo(ul);
            }
            return false;
        }
    })
}
webUtil.setFileDownload = function(mdId,showPageMode,fileDateLength,showCount){
    if(showPageMode == "0"){
        require(["jquery.Mpagination"],function(){
            var initPagination = function() {
                /* 创建分页*/
                $("#fileItemBox_"+mdId+" .pagination").pagination(fileDateLength, {
                    first_text:langUtil.Global_first,
                    end_text:langUtil.Global_endPage,
                    prev_text:langUtil.Global_prePage,
                    next_text:langUtil.Global_nextPage,
                    num_edge_entries: 1, /*边缘页数*/
                    num_display_entries: 6, /*主体页数*/
                    callback: pageselectCallback,
                    items_per_page:showCount /*每页显示1项*/
                });
            }();
            /*上面的回调函数*/
            function pageselectCallback(page_index, jq){
                var max_elem = Math.min((page_index+1) *showCount, fileDateLength);
                var fileListDom = $("#fileItemBox_"+mdId+" .fileList");
                fileListDom.html("");
                for(var i=page_index*showCount;i<max_elem;i++){
                    var new_content = $("#fileItemBox_"+mdId+" .Searchresult li:eq("+i+")").clone();
                    fileListDom.append(new_content); /*装载对应分页的内容*/
                }
                return false;
            }
            /*有内容才显示分页码数*/
            if($("#fileItemBox_"+mdId+" .fileList").html() == ""){
                $("#fileItemBox_"+mdId+" .pagination").hide();
            }
        })
    }

    if(window.WebModel=="edit")
    {
        $(".fileList").on("click",".downloadText, .download, .fileOperate a, .titleSet",function(e)
        {
            e.preventDefault();
            dataUtil.iyongShowTips("设计后台不允许下载！", 1);
        });
    }
};
/*currentTime*/
webUtil.getCurrentTime = function(mdId,btnStyle){
    if(window.intTime){
        if(window.intTime[mdId]){
            window.clearInterval(window.intTime[mdId]);
        }
    }else{
        window.intTime=[];
    }
    var intTime = 1000 * 30;

    function  getTime(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if (month >= 0 && month <= 9) {
            month = "0" + month;
        }
        var day = d.getDate();
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        var hours = d.getHours();
        if (hours >= 0 && hours <= 9) {
            hours = "0" + hours;
        }
        var minutes = d.getMinutes();
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        var seconds = d.getSeconds();
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var week = weekday[d.getDay()];
        var weekday1 = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var week1 = weekday1[d.getDay()];

        if (btnStyle == 'aa1') {
            $("#kenfor_time_" + mdId).html(year + "年" + month + "月" + day + "日" + " " + week1);
        } else if (btnStyle == 'aa2') {
            $("#kenfor_time_" + mdId).html(year + "年" + month + "月" + day + "日" + " " + hours + ":" + minutes);
        } else if (btnStyle == 'aa3') {
            $("#kenfor_time_" + mdId).html(year + "年" + month + "月" + day + "日" + " " + week1 + " " + hours + ":" + minutes);
        } else if (btnStyle == 'aa4') {
            $("#kenfor_time_" + mdId).html(year + "-" + month + "-" + day);
        } else if (btnStyle == 'aa5') {
            $("#kenfor_time_" + mdId).html(year + "-" + month + "-" + day + " " + hours + ":" + minutes);
        } else if (btnStyle == 'aa6') {
            $("#kenfor_time_" + mdId).html(month + "/" + day + "/" + year + " " + week);
        } else if (btnStyle == 'aa7') {
            $("#kenfor_time_" + mdId).html(month + "/" + day + "/" + year + " " + hours + ":" + minutes);
        } else if (btnStyle == 'aa8') {
            $("#kenfor_time_" + mdId).html(month + "/" + day + "/" + year + " " + week + " " + hours + ":" + minutes);
        }
    }
    getTime();
    window.intTime[mdId]=self.setInterval(function(){
        getTime();
    },intTime);
};
/*indexFavorite*/
webUtil.SetHomeSite = function(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert(langUtil.IndexFavorite_HomeSite);
            }
        }else{
            alert(langUtil.IndexFavorite_Tip+'\n\n'+langUtil.IndexFavorite_Tipadd+'【'+url+'】'+langUtil.IndexFavorite_TipaddTwo);
            //alert('抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页')
        }
    }
};
webUtil.AddFavoriteSite = function(title, url){
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert(langUtil.IndexFavorite_FavoriteSite);
        }
    }
};
/*onlineVideo*/
webUtil.setOnlineVideo = function(mdId,isfloat,template,width,height,auto,title,picUrl,sourceUrl,loop,titleStatus){
    require(["jquery","jquery.jplayer.min"],function($){
        $("#"+mdId+",#"+template+"_"+mdId).css({width:width,height:height});
        $(".onlineVideoBox").css({width:width,height:height});
        var jplayer_id='#jplayer_video_'+mdId,jp_container='#jp_container_video_'+mdId;
        var sizeW,sizeH;
        if(isfloat==1){
            sizeW = 100 +"%";
            sizeH = 100 +"%";
        }else{
            sizeW = width +"px";
            sizeH = height +"px";
        }
        var hasFlash = false;//查询是否支持flash
        try {
            hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
        } catch(exception) {
            hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
        }
        var supplied="m4v";
        var solution="html"
        if(hasFlash){//如果支持flash
            supplied="m4v,flv";
            solution="flash,html"
        }
        $(jplayer_id).jPlayer({
            ready:function () {
                // if(auto == "true"){
                //     $(this).jPlayer("setMedia", {
                //         title:title,
                //         poster:picUrl,
                //         m4v:sourceUrl,
                //         flv:sourceUrl
                //     }).jPlayer("play");
                // }else{
                    $(this).jPlayer("setMedia", {
                        title:title,
                        poster:picUrl,
                        m4v:sourceUrl,
                        flv:sourceUrl
                    });
                // }
            },
            cssSelectorAncestor:jp_container,
            size:{width:sizeW, height:sizeH},
            swfPath:jsPath+"js/lib/jquery.jplayer.swf",/*注意！！！！！！！（这里首先是要那个jquery.jplayer.swf文件，路径也要设置）定义jPlayer 的Jplayer.swf文件的路径。它允许开发者把swf文件放在任何位置，使用相对定位或是绝对路径合作或是相对服务器路径引用。*/
            supplied:supplied,/* 定义提供给jPlayer的格式。顺序表示优先级，左边的格式优先级最高，右边的优先级较低。"m4v, ogv, webmv, flv"*/
            solution:solution,/*定义html和flash解决方案的优先级。默认优先使用html，flash备用。交换顺序"flash, html" 优先使用Flash，备用html。*/
            loop:loop,/*视频循环播放*/
            useStateClassSkin:true,
            autoBlur:false,
            smoothPlayBar:true,
            keyEnabled:true,
            remainingDuration:true,
            toggleDuration:true
        });
        webUtil.check_video(mdId,template,titleStatus,0);
        $(window).resize(function(){
            webUtil.check_video(mdId,template,titleStatus,0);
        });
    });
};
webUtil.setOnlineVideo1 = function(mdId,width,height,auto,title,picUrl,sourceUrl,loop){
    var template="onlineVideo";
    var templateId=template+"_"+mdId,
        videoHeight=height;
    if($("#"+templateId).find(".skin_nav_view").length>0)
    {
        videoHeight-=Number($("#"+templateId).find(".skin_nav_view").height());
    }
    require(["jquery","jquery.jplayer.min"],function($){
        var jplayer_id='#jplayer_video_'+mdId,jp_container='#jp_container_video_'+mdId;
        $(jplayer_id).jPlayer({
            ready:function () {
                // if(auto == "true"){
                //     $(this).jPlayer("setMedia", {
                //         title:title,
                //         poster:picUrl,
                //         m4v:sourceUrl,
                //         flv:sourceUrl
                //     }).jPlayer("play");
                // }else{
                    $(this).jPlayer("setMedia", {
                        title:title,
                        poster:picUrl,
                        m4v:sourceUrl,
                        flv:sourceUrl
                    });
                // }
            },
            cssSelectorAncestor:jp_container,
            size:{width:width, height:videoHeight},
            swfPath:jsPath+"js/lib/jquery.jplayer.swf",/*注意！！！！！！！（这里首先是要那个jquery.jplayer.swf文件，路径也要设置）定义jPlayer 的Jplayer.swf文件的路径。它允许开发者把swf文件放在任何位置，使用相对定位或是绝对路径合作或是相对服务器路径引用。*/
            supplied:"m4v,flv",/* 定义提供给jPlayer的格式。顺序表示优先级，左边的格式优先级最高，右边的优先级较低。"m4v, ogv, webmv, flv"*/
            solution:"html",/*定义html和flash解决方案的优先级。默认优先使用html，flash备用。交换顺序"flash, html" 优先使用Flash，备用html。*/
            loop:loop,/*视频循环播放*/
            useStateClassSkin:true,
            autoBlur:false,
            smoothPlayBar:true,
            keyEnabled:true,
            remainingDuration:true,
            toggleDuration:true
        });

        if($("#"+templateId).find(".onlineVideoMask").length<1)
        {
            $("#"+templateId+" .onlineVideoBox").prepend('<div class="onlineVideoMask"></div>');
        }

        $("#"+templateId+" .onlineVideoBox").off("click").on("click", ".onlineVideoMask", function(e)
        {
            if(window.WebModel=="view")
            {
                var videoSrc=$("#"+templateId).find("video").attr("src");
                var videoLoop=loop=="true"?"loop":"";
                webUtil.showVideoPlay("playMp4",videoSrc,videoLoop);
            }
        });
    });


};
webUtil.check_video = function(mdId,template,titleStatus,moduleType){
    var a=$("#"+template+"_"+mdId+" .onlineVideoBox");
    if(titleStatus==1){
        var h=$("#"+template+"_"+mdId+" .skin_title").parent().height();
        a.css({position:"absolute",left:0,top:h,bottom:0,right:0});
    }else{
        a.css({position:"absolute",left:0,top:0,bottom:0,right:0});
    }
    if(moduleType == 0) {
        a.children().css({height: "100%"});
        a.children().children(".jp-jplayer").css({height: "calc(100% - 34px)"});
        a.children().children(".jp-jplayer").children().css({height: "100%"});
    }else{
        a.children().css({width:"100%",height:"100%","background":"black"});
    }
};
webUtil.videoControl = function(auto,mdId,template){
    // var videoId = document.getElementById("myVideo_"+mdId);
    // videoId.style.width = "100%";
    // videoId.setAttribute("preload","none");
    // if(auto == "true"){
    //     videoId.play();
    // }else{
        // videoId.pause();
    // }

    var templateId=template+"_"+mdId;
    if($("#"+templateId).find(".onlineVideoMask").length<1)
    {
        $("#"+templateId+" .onlineVideoBox").prepend('<div class="onlineVideoMask"></div>');
    }

    $("#"+template+"_"+mdId+" .onlineVideoBox").off("click").on("click", ".onlineVideoMask", function(e)
    {
        if(window.WebModel=="view")
        {
            var videoComponent=$(e.target).next();   //组件中的视频结构
            var videoSrc="";

            if(videoComponent[0].nodeName.toLowerCase()=="video")
            {
                if(videoComponent.attr("src"))
                {//如果video标签里有src属性
                    videoSrc=videoComponent.attr("src");
                }
                else
                {//如果video标签里没src属性，则读取video内的source元素的src
                    videoSrc=videoComponent.find("source").attr("src");
                }
            }
            else
            {
                videoSrc=videoComponent.attr("data-src");
            }
            webUtil.showVideoPlay("playMp4",videoSrc,'');
        }
    } );
};
// //当前将要播放视频时须停止其他正在播放的视频
// webUtil.pauseOtherVideo=function(mdId)
// {
//     //找到前一个正在播放的视频组件
//     var playingDom=document.querySelector(".videoPlaying");
//     if(playingDom)
//     {
//         playingDom.getElementsByTagName("video")[0].pause();    //暂停前一个正在播放的视频
//     }

//     $("#onlineVideo_"+mdId).addClass("videoPlaying");   //给当前即将播放的视频组件添加videoPlaying类
// };
// //暂停播放视频须去掉videoPlaying类
// webUtil.pauseVideo=function(thisVideo)
// {
//     $(thisVideo).parents(".videoPlaying").removeClass("videoPlaying");
// };
webUtil.showVideoPlay=function(idenStr,videoSrc,loop)
{
    //若body没有弹窗容器，则添加一个
    if($("body").find("#videoPlayBlock").length<1)
    {
        var videoPlayBlockDom='<div id="videoPlayBlock">'+
            '<div id="videoPlay"></div>'+
            '<div id="videoPlayMask"></div>'+
            '<div id="videoPlayClose"  onclick="webUtil.hideVideoPlay()">'+
            '<i class="videoCloseIcon icon iconfont kenfor-icons-off1"></i>'+
            '</div></div>';
        $("body").append(videoPlayBlockDom);
    }

    if(idenStr=="playMp4")
    {
        var videoStr='<video src="'+videoSrc+'" style="width:'+$(window).width()+'px;height:'+$(window).height()+'px" controls '+loop+'>'+
            '<source src="'+videoSrc+'" type="video/mp4"/><source src="'+videoSrc+'" type="video/ogg"/>'+
            '<source src="'+videoSrc+'" type="video/webm"/></video>';
        $("#videoPlay").html(videoStr);

        $("#videoPlayBlock").css("display","block");

        $("#videoPlay video")[0].play();
    }
    else if(idenStr=="playTorrent")
    {
        require(["./../lib/webtorrent.min"], function(WebTorrent)
        {
            $("#videoPlayBlock").css("display","block");
            var client = new WebTorrent();
            client.add(videoSrc, function(torrent)
            {
                torrent.files.forEach(function (file)
                {
                    if(file.name.endsWith('.mp4'))
                    {
                        file.appendTo('#videoPlay');
                    }
                });

                $("#videoPlay video").css(
                {
                    width:$(window).width(),
                    height:$(window).height()
                });
                if(loop=="loop")
                {
                    $("#videoPlay video").prop("loop","true").attr("loop","true");
                }
            });
        });
    }

    $(window).resize(function () {
        $("#videoPlay video").css({width:$(this).width(),height:$(this).height()});
    });
};
//隐藏视频弹窗容器并清除里面的视频结构
webUtil.hideVideoPlay=function()
{
    $("#videoPlayBlock").css("display","none");
    $("#videoPlay").html("");
};
//种子播放
webUtil.fakeVideoControl=function(mdId,sourceUrl,loop)
{
    $("#onlineVideo_"+mdId+" .onlineVideoBox").off("click").on("click", ".fakeVideoContainer", function(e)
    {
        //如果未传入视频，默认视频格式是torrent，但sourceUrl为空。由此判断是否已传入视频文件。
        if(window.WebModel=="view" && sourceUrl)
        {
            var videoLoop=loop=="true"?"loop":"";
            webUtil.showVideoPlay("playTorrent",sourceUrl,videoLoop);
        }
    });
};
//编辑器视频点击播放
$(document).ready(function()
{
    $(".edui-upload-video").off("click").on("click",function()
    {
        var videoSrc=$(this).attr("src"),
            videoType=videoSrc?videoSrc.split(".").pop():"",
            playType=videoType?videoType=="mp4"?"playMp4":"playTorrent":"";
        if(videoSrc)
        {
            webUtil.showVideoPlay(playType,videoSrc,"");
        }
        else
        {
            return false;
        }
    });
});

/*weather*/
webUtil.setWeather = function(selectCityMode,weaCity,weaCounty,weaStyleMode){
    /*获取城市url*/
    $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js'", function (script, textStatus, jqXHR) {
        var citytq;
        var weatherCity;
        if(selectCityMode == "0"){
            citytq = remote_ip_info.city; /* 默认（根据IP获取当前城市）*/
            weatherCity = remote_ip_info.city;
        }else{
            citytq = weaCity;   /* 自定义（根据选择城市）*/
            weatherCity = weaCounty;
        }
        $.ajax({
            url: "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + weatherCity + "&day=1&dpc=1",
            dataType: "script",
            scriptCharset: "gbk",
            success: function (data) {
                // if(window.SWther.w.length){
                var today_weather = window.SWther.w[weatherCity][0];
                /*明天天气*/
                var tomorrow_weather = window.SWther.w[weatherCity][1];
                /*_w 获得的是一个对象 其中有d1,d2,p1,p2,f1,f2,s1,s2,等属性*/
                /* (d,p,f,s分别表示风向，风的等级，天气图标，天气，下表1，2分别表示白天和晚上)，*/
                /* t1,t2表示最高和最低温度。*/
                var today_weather_img=webUtil.dis_img(today_weather.s1,weaStyleMode);

                /* 样式一*/
                $('#wea_city1').html(weatherCity);
                $('#wea_cloud1').html(today_weather.s1); /*天气状况*/
                $('#wea_temp1').html(today_weather.t1+'&degC ~ '+today_weather.t2+' &degC'); /*温度*/
                /* 样式二*/
                $('#wea_city3').html(weatherCity);
                $('#wea_cloud3').html("<img style='width:25px;' src='"+today_weather_img+"' title='"+today_weather.s1+"' alt='"+today_weather.s1+"' />");
                $('#wea_temp3').html(today_weather.t1+'&degC ~ '+today_weather.t2+' &degC'); /*温度*/
                /* 样式三*/
                $('#wea_city4').html(weatherCity);
                $('#wea_cloud4').html("<img style='width:25px;' src='"+today_weather_img+"' title='"+today_weather.s1+"' alt='"+today_weather.s1+"' />");
                $('#wea_temp4').html(today_weather.t1+'&degC ~ '+today_weather.t2+' &degC'); /*温度*/
                $('#wea_wind4').html(today_weather.d1); /*风力*/
                /* 样式四*/
                $('#wea_city5').html(weatherCity);
                $('#wea_image5').html("<img style='float:left;margin-top: 8px;width:65px;' src='"+today_weather_img+"' title='"+today_weather.s1+"' alt='"+today_weather.s1+"' />");
                $('#wea_date5').html(today_weather.t1+'&degC ~ '+today_weather.t2+' &degC'); 	/*温度*/
                $('#wea_cloud5').html(today_weather.s1); 	/*天气状况*/
                /*明天天气*/
                var tomorrow_weather_img=webUtil.dis_img(tomorrow_weather.s1,weaStyleMode);
                $('#wea_image51').html("<img style='float:left;margin-top: 8px;width:65px;' src='"+tomorrow_weather_img+"' title='"+tomorrow_weather.s1+"' alt='"+tomorrow_weather.s1+"' />");
                $('#wea_date51').html(tomorrow_weather.t1+'&degC ~ '+ tomorrow_weather.t2+' &degC'); //温度
                $('#wea_cloud51').html(tomorrow_weather.s1); /*天气状况*/
                /* 样式五*/
                $('#wea_city6').html(weatherCity);
                $('#wea_image6').html("<img style='border:0;margin: 8px;width:65px;' src='"+today_weather_img+"' title='"+today_weather.s1+"' alt='"+today_weather.s1+"' />");
                $('#wea_temp6').html(today_weather.t1+'&degC ~ '+today_weather.t2+' &degC'); /*温度*/
                $('#wea_cloud61').html(today_weather.s1); 			/*天气状况*/
                $('#wea_wind6').html(today_weather.p1 + '级'); 	/*风力*/
                $('#wea_direction6').html(today_weather.d1); 		/*风向*/

                /* 样式六*/
                $('#wea_city7').html(weatherCity);
                $('#wea_image7').html("<img style='border:0;width:70px;' src='"+today_weather_img+"' title='"+today_weather.s1+"' alt='"+today_weather.s1+"' />");
                $('#wea_temp7').html(today_weather.t1+'&degC'); 	/*温度*/
                $('#wea_cloud71').html(today_weather.s1); 			/*天气状况*/
                $('#wea_wind7').html(today_weather.d1); 	/*风速描述*/

                /* 样式七*/
                $('#wea_city8').html(weatherCity);
                $('#images8').html("<img style='border:0;width:70px;' src='"+today_weather_img+"' title='"+today_weather.s1+"' alt='"+today_weather.s1+"' />");
                $('#wea_temp8').html(today_weather.t1+'&degC'); 	/*温度*/
                $('#wea_cloud81').html(today_weather.s1); 			/*天气状况*/
                $('#wea_wind8').html(today_weather.d1); 	/*风速描述*/

                /* 样式八 */
                $('#wea_city9').html(weatherCity);
                $('#images9').html("<img style='border:0;width:70px;' src='"+today_weather_img+"' title='"+today_weather.s1+"' alt='"+today_weather.s1+"' />");
                $('#wea_temp9').html(today_weather.t1+'&degC'); 	/*温度*/
                $('#wea_cloud91').html(today_weather.s1); 			/*天气状况*/
                $('#wea_wind9').html(today_weather.p1 + '级'); 	/*风速描述*/
                $('#wea_direction9').html(today_weather.d1); 		/*风向*/
                // }else{
                // 	alert("接口返回天气信息为空")
                // }
            }
        });
    });
};
webUtil.dis_img = function(weather,weaStyleMode){
    var forder;
    var route=imgPath+"images/weather/";/*文件夹路径*/
    /*图片样式 还需加判断*/
    if(weaStyleMode=='2' || weaStyleMode=='3'){
        forder='weatherPic1';
    }else if(weaStyleMode=='4' || weaStyleMode=='5'){
        forder='weatherPic2';
    }else if(weaStyleMode=='7' || weaStyleMode=='8' || weaStyleMode=='6'){
        forder='weatherPic3';
    }
    var style_img=route+forder+"/qing.png";
    if(weather.indexOf(langUtil.weather_Fine)!==-1){style_img=route+forder+"/qing.png";}
    else if(weather.indexOf(langUtil.weather_Cloudy)!==-1){style_img=route+forder+"/duoyun.png";}
    else if(weather.indexOf(langUtil.weather_Overcast)!==-1){style_img=route+forder+"/yin.png";}
    else if(weather.indexOf(langUtil.weather_Shower)!==-1){style_img=route+forder+"/zhenyu.png";}
    else if(weather.indexOf(langUtil.weather_ThunderShower)!==-1){style_img=route+forder+"/leizhenyu.png";}
    else if(weather.indexOf(langUtil.weather_ShowerHail)!==-1){style_img=route+forder+"/weather1.png";}
    else if(weather.indexOf(langUtil.weather_Sleet)!==-1){style_img=route+forder+"/weather2.png";}
    else if(weather.indexOf(langUtil.weather_Sprinkle)!==-1){style_img=route+forder+"/xiaoyu.png";}
    else if(weather.indexOf(langUtil.weather_Moderate)!==-1 ||weather.indexOf(langUtil.weather_SprinkleModerate)!==-1){style_img=route+forder+"/zhongyu.png";}
    else if(weather.indexOf(langUtil.weather_Heavy)!==-1 ||weather.indexOf(langUtil.weather_ModerateHeavy )!==-1){style_img=route+forder+"/dayu.png";}
    else if(weather.indexOf(langUtil.weather_Rainstorm)!==-1 ||weather.indexOf(langUtil.weather_HeavyRainstorm)!==-1){style_img=route+forder+"/baoyu.png";}
    else if(weather.indexOf(langUtil.weather_Downpour)!==-1){style_img=route+forder+"/dabaoyu.png";}
    else if(weather.indexOf(langUtil.weather_Downpour)!==-1 ||weather.indexOf(langUtil.weather_BigRainstorm)!==-1){style_img=route+forder+"/baoyu.png";}
    else if(weather.indexOf(langUtil.weather_Hail)!==-1){style_img=route+forder+"/dongyu.png";}
    else if(weather.indexOf(langUtil.weather_ShowerSnow)!==-1){style_img=route+forder+"/zhenxue.png";}
    else if(weather.indexOf(langUtil.weather_SmallSnow)!==-1){style_img=route+forder+"/xiaoxue.png";}
    else if(weather.indexOf(langUtil.weather_MiddleSnow)!==-1){style_img=route+forder+"/zhongxue.png";}
    else if(weather.indexOf(langUtil.weather_BigSnow)!==-1){style_img=route+forder+"/daxue.png";}
    else if(weather.indexOf(langUtil.weather_RanstormSnow)!==-1){style_img=route+forder+"/baoxue.png";}
    else if(weather.indexOf(langUtil.weather_Fog)!==-1){style_img=route+forder+"/wu.png";}
    else if(weather.indexOf(langUtil.weather_SandStorm)!==-1){style_img=route+forder+"/shachenbao.png";}
    else if(weather.indexOf(langUtil.weather_Dust)!==-1){style_img=route+forder+"/shachen.png";}
    else if(weather.indexOf(langUtil.weather_BlowingSand)!==-1){style_img=route+forder+"/yangsha.png";}
    else if(weather.indexOf( langUtil.weather_StrongSandstorm)!==-1){style_img=route+forder+"/weather4.png";}

    else if(weather.indexOf(langUtil.weather_Cloudy)!==-1||weather.indexOf(langUtil.weather_Fine)!==-1){//多云转晴，以下类同 indexOf:包含字串
        style_img=route+forder+"/duoyun.png";}
    else if(weather.indexOf(langUtil.weather_Cloudy)!==-1&&weather.indexOf(langUtil.weather_Overcast)!==-1){
        style_img=route+forder+"/duoyun.png";}
    else if(weather.indexOf(langUtil.weather_Overcast)!==-1&&weather.indexOf( langUtil.weather_Rain)!==-1){
        style_img=route+forder+"/yin.png";}
    else if(weather.indexOf(langUtil.weather_Fine)!==-1&&weather.indexOf( langUtil.weather_Rain)!==-1){
        style_img=route+forder+"/wu.png";}
    else if(weather.indexOf(langUtil.weather_Fine)!==-1&&weather.indexOf(langUtil.weather_Fog)!==-1){
        style_img=route+forder+"/wu.png";}
    else{style_img=route+forder+"/duoyun.png";}

    return style_img;
};
/*nerworkSale*/
webUtil.backToSearchMap=function(mdId){
    //$("#searchMap_"+mdId).css({"display":"block"});
    $(".network_mask_tpl").css({"display":"none"});
}
webUtil.setMapResList=function(mdId){
    /*遮罩   kenfor-icons-upward1 */
    if(!$("body").children().hasClass("network_mask_tpl")){
        var maskTpl = '<div class="network_mask_tpl">' +
            '<div class="network_mask"></div>'+
            '<div class="lightBox">' +
            '<div class="map_header">' +
            '<div class="header_title"></div>' +
            '<a class="close_mask" onclick="webUtil.backToSearchMap()" href="javascript:;"></a>' +
            '</div>' +
            '<div class="map_content">' +
            '<div id="baiduMap_'+mdId+'" class="baidu_map"></div>' +
            '</div>' +
            '<div class="map_item_list">' +
            '<div class="store_head">' +
            '<i class="icon kenfor-icons-home"></i>' +
            '<span class="nearby_title">附近网点</span>' +
            '<i class="icon kenfor-icons-downward1 map_downward"></i>' +
            '</div>' +
            '<div class="store_info scrollbar"><ul class="res_item_list" id="res_item_list"></ul></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("body").append(maskTpl);
    }
    var srH = window.screen.height *0.61 +"px";
    var srW = window.screen.width * 0.45 +"px";
    $(".lightBox").css({"width":srW,"height":srH,});

    $(".network_mask_tpl").css({"display":"block"});
    $(".store_info .res_item_list").html($("#resData_"+mdId).html());

    require(["jqueryui"],function(){
        $( ".lightBox" ).draggable({ handle: ".header_title"});
    });
}
webUtil.storeControl=function(){
    $(".store_head").off("click").on("click",function(){
        $(".store_head").toggleClass("hover");
        $(".store_head .map_downward").toggleClass("kenfor-icons-upward1");
        $(".store_info").toggleClass("store_hide");
    });
}

webUtil.getStoreMap=function(e,mdId,type){
    webUtil.setMapResList(mdId);
    webUtil.storeControl();
    var map_name,map_phone,map_addr,map_pro;
    if(type == "resStore"){
        var parentDom = $(e).parent(".res_content");
        map_name = $(parentDom).find(".res_store_title").text();
        map_phone = $(parentDom).find(".res_store_phone").data("phone");
        map_addr = $(parentDom).find(".res_store_address").data("addr");
        map_pro = $(parentDom).find("input[name='res_addrPro']").val();
        var resId = $(e).data("id");
    }else if(type == "resMap"){
        map_name = $(e).find(".res_store_title").text();
        map_phone = $(e).find(".res_store_phone").data("phone");
        map_addr = $(e).data("stoaddr");
        map_pro = $(e).data("stopro");
        var resId = $(e).data("id");
    }
    var itemDom = $(".network_mask_tpl .lightBox .map_item_list .res_item_list .res_info");
    $.each(itemDom,function(){
        var itemId = $(this).data("id");
        if(resId == itemId){
            $(this).addClass("item_selected").siblings().removeClass("item_selected");
        }
    });

    $(".network_mask_tpl .lightBox .header_title").html(map_name);

    require(["jquery","async!BMap"],function($){
        map = new BMap.Map("baiduMap_"+mdId);		/* 创建map实例 */
        var point = new BMap.Point(113.410312,22.507476);
        map.centerAndZoom(point,17);
        map.clearOverlays();
        var myGeo = new BMap.Geocoder(); // 创建地址解析器实例
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(map_addr,function (point) {
            if (point) {
                map.centerAndZoom(point, 17);
                var newMaker = new BMap.Marker(point);
                map.addOverlay(newMaker);
                var pointSize = {
                    width : 200     /* 信息窗口宽度*/
                }
                var mapInfo = map_name+"<br>地址："+map_addr;
                if(map_phone){
                    mapInfo = map_name+"<br>地址："+map_addr+"<br>电话："+map_phone;
                }
                if( mapInfo ){
                    var infoWindow = new BMap.InfoWindow( mapInfo,pointSize);/*BMap.InfoWindow创建一个信息窗对象*/
                    newMaker.openInfoWindow( infoWindow );  /* 打开信息窗口*/
                }
                newMaker.addEventListener("click", function(){
                    var infoWindow = new BMap.InfoWindow( mapInfo,pointSize);/*BMap.InfoWindow创建一个信息窗对象*/
                    newMaker.openInfoWindow( infoWindow );  /* 打开信息窗口*/
                });
            } else {
                alert("搜索不到结果");
            }
        }, map_pro);


        var bMapNavigation = new BMap.NavigationControl();  /*创建地图平移缩放控件*/
        map.addControl( bMapNavigation );				/* 添加一条鱼骨*/
        var bMapScale = new BMap.ScaleControl();  /*创建地图比例尺控件*/
        map.addControl( bMapScale );		  /* 添加比例尺*/
        map.enableScrollWheelZoom();   // 启动鼠标滚轮操作
        map.enableContinuousZoom();    // 开启连续缩放效果
        map.enableInertialDragging();　// 开启惯性拖拽效果
        map.enableKeyboard();          // 开启键盘操作
    });
}

webUtil.setEchartsMap=function(mdId,Data,saleMode,pageNum,proVal){
    var proDom = $("#networkSale_"+mdId+" .search_area").find("select[name='area-province']");
    var cityDom = $("#networkSale_"+mdId+" .search_area").find("select[name='area-city']");
    var province;
    if(proVal){
        province = proVal;
    }else{
        webUtil.searchRes(mdId,Data,"",3,saleMode,pageNum);
    }
    var mapCol = '#cc365e';
    var mapColor = $("#searchMap_"+mdId).data("mapcolor");
    if(mapColor){
        mapCol = mapColor;
    }
    var mapSelCol = '#999999';
    var mapSelColor = $("#searchMap_"+mdId).data("mapselcolor");
    if(mapSelColor){
        mapSelCol = mapSelColor;
    }
    var fontCol = '#fff';
    var fontColor = $("#searchMap_"+mdId).data("fontcolor");
    if(fontColor){
        fontCol = fontColor;
    }
    var fontSelCol = "#fff";
    var fontSelColor = $("#searchMap_"+mdId).data("fontselcolor");
    if(fontSelColor){
        fontSelCol = fontSelColor;
    }
    require(["echarts-all"],function(){
        // 基于echars2，初始化echarts
        var chartDom = document.getElementById('searchMap_'+mdId);
        //var chartDom = document.getElementById('searchMap');
        var myChart = echarts.init(chartDom);
        var option = {
            tooltip : {  /*提示框，鼠标悬浮交互时的信息提示*/
                trigger: 'item',    /*触发类型*/
                formatter: '{b}'    /*内容格式器*/
            },
            series : [
                {
                    name: '中国',
                    type: 'map',
                    mapType: 'china',
                    selectedMode : 'single',    /*选中模式*/
                    itemStyle:{
                        normal:{    /*默认样式*/
                            //borderWidth:1,
                            //borderColor:'lightgreen',
                            color: mapCol,
                            label:{
                                show:true,
                                textStyle:{
                                    color:fontCol
                                }
                            }
                        },
                        emphasis:{  /*强调样式（悬浮时样式）*/
                            //borderWidth:1,
                            //borderColor:'#fff',
                            color: mapSelCol,
                            label:{
                                show:true,
                                textStyle:{
                                    color:fontSelCol
                                }
                            }
                        }
                    },
                    data:[
                        {name:province,selected:true}     /*选中状态*/
                    ]
                }
            ]
        };
        //var ecConfig = echarts.config;
        //myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
        //    var selected = param.selected;
        //    for (var p in selected) {
        //        if (selected[p]) {
        //            //筛选当前p省市
        //            webUtil.setProVal(proDom,p);
        //            webUtil.searchRes(mdId,Data,p,1);
        //        }
        //    }
        //});
        myChart.on('click', function (params) {
            var p = params.name;
            webUtil.setProVal(proDom,p,2,cityDom);
            webUtil.searchRes(mdId,Data,p,1,saleMode,pageNum);
        });

        myChart.setOption(option);
    });
}

webUtil.setProVal=function(proDom,proVal,ctype,cityDom){
    $(proDom).find("option").each(function (i, n) {
        var that = $(this);
        var tmpThisVal = that.val();
        if (tmpThisVal == proVal) {
            that.attr("selected", true).siblings().attr("selected",false);
            $(proDom).val(tmpThisVal);
        }
    });
    if(ctype == 2){
        require(["linkage/allcity"], function (cityData) {
            var tmpVal = $(proDom).val();
            $(cityDom).empty();
            var tmpArr2 = "<option value=''>请选择</option>";
            $.each(cityData, function (i, n) {
                if (tmpVal == n.name) {
                    $.each(n.city, function (j, k) {
                        tmpArr2 += '<option value="' + k.name + '">' + k.name + '</option>';
                    });
                }
            });
            $(cityDom).html(tmpArr2);
        });
    }
}

webUtil.selectCity=function(proDom,cityDom){
    require(["linkage/allcity"], function (cityData) {
        if($(proDom).children().length ==0) {
            $.each(cityData, function (i, n) {
                var tmpArr1 = ['<option value="' + n.name + '">' + n.name + '</option>'];
                $(proDom).append(tmpArr1.join(''));
                if (i == 0) {
                    var tmpArr2 = ['<option value="' + n.city[0].name + '">' + n.city[0].name +
                    '</option>'
                    ];
                    $(cityDom).append(tmpArr2.join(''));
                }
            });
        }

        $(proDom).bind("change", function () {
            var tmpVal = $(this).val();
            webUtil.setProVal(proDom,tmpVal);
            $(cityDom).empty();
            var tmpArr2 = "<option value=''>请选择</option>";
            $.each(cityData, function (i, n) {
                if (tmpVal == n.name) {
                    $.each(n.city, function (j, k) {
                        tmpArr2 += '<option value="' + k.name + '">' + k.name + '</option>';
                    });
                }
            });
            $(cityDom).html(tmpArr2);
        });

        //webUtil.setProVal(proDom, "广东",2);
    });
}

/**
 *  change 省/市
 */
webUtil.changeSelPro=function(mdId,Data,e,selType,saleMode,pageNum){
    $(e).unbind("change").on("change",function(){
        var proVal = $(this).val();
        if(selType == 1){
            webUtil.setEchartsMap(mdId,Data,saleMode,pageNum,proVal);
        }
        if( proVal != ""){
            webUtil.searchRes(mdId,Data,proVal,selType,saleMode,pageNum);
        }
    });
}

/**
 * 点击搜索
 */
webUtil.searchByKeywork=function(mdId,Data,saleMode,pageNum){
    //关键字
    var sleWord = $("#networkSale_"+mdId+" .search_keyword").val();
    webUtil.searchRes(mdId,Data,sleWord,3,saleMode,pageNum);
}

/**
 * 搜索函数  type 1-->省  2-->市  3--关键字
 */
webUtil.searchRes=function (mdId,Data,sleWord,type,saleMode,pageNum){
    var resFlag = false; var flag =false;
    var html ='';
    var reshtml = '';
    var num = 0;
    if(Data && Data != ""){
        $.each(Data,function(key,item){
            var resData = item.info.data;
            var resTitle;
            if(type == 1){
                resTitle = item.addrPro;
            }else if(type == 2){
                resTitle = item.info.city;
            }else if(type == 3){
                resTitle = resData.title;
            }
            if(resTitle.indexOf(sleWord) > -1){
                ++num;
                flag = true;
                html+='<li class="res_info j_setResW">'+
                    '<div class="res_content res_floatLeft">' +
                    '<span class="res_title res_store_title">'+resData.title+'</span>'+
                    '<div class="res_text res_store_address" data-addr="'+resData.addr+'"><span class="datail_txt">地址：</span><span class="detail_addr">'+resData.addr+'</span></div>';
                if(resData.phone){
                    html+=  '<div class="res_text res_store_phone" data-phone="'+resData.phone+'"><span class="datail_txt">电话：</span><span class="detail_addr">'+resData.phone+'</span></div>';
                }
                html+=  '<div class="linkMap res_text" data-id="'+item.id+'" onclick="webUtil.getStoreMap(this,\'' + mdId + '\',\'resStore\')" >' +
                    '<i class="fontIcon kenfor-icons-gps1"></i>查看地图' +
                    '<input name="res_addrPro" type="hidden" value="'+item.addrPro+'" />' +
                    '</div>'+
                    '</div>' +
                    '</li>';

                reshtml+='<li class="res_info" data-id="'+item.id+'" data-stoaddr="'+resData.addr+'" data-stopro="'+item.addrPro+'" onclick="webUtil.getStoreMap(this,\'' + mdId + '\',\'resMap\')">'+
                    '<div class="res_content">' +
                    '<span class="res_title res_store_title">'+resData.title+'</span>';
                if(resData.phone){
                    reshtml+=  '<div class="res_text res_store_phone" data-phone="'+resData.phone+'">电话：'+resData.phone+'</div>';
                }
                reshtml+='</div></li>';
                if(num % 3 == 0){
                    html += '<div style="clear: both;"></div>';
                }
            }else{
                resFlag = true;
            }
        });
    }else{
        resFlag = true;
    }
    if(resFlag && !flag){
        html += '<div class="noResult">暂无搜索结果</div>';
    }
    if(saleMode == 0){
        $("#searchRes_"+mdId).find(".resList_box").html(html);
    }else if(saleMode == 1){
        $("#Pagination_"+mdId+" .h_searchAllData").find(".resList_box").html(html);
    }
    $("#resData_"+mdId).find(".resList_box").html(reshtml);
    webUtil.setResListWidth(mdId,saleMode);
    webUtil.setNetworkResPage(mdId,saleMode,num,pageNum);
}
webUtil.setNetworkResPage=function(mdId,saleMode,num,pageNum){
    if(saleMode == "1"){
        require(["jquery.Mpagination"],function(){
            var initPagination = function() {
                /* 创建分页*/
                $("#"+mdId+" .pagination").pagination(num, {
                    first_text:langUtil.Global_first,
                    end_text:langUtil.Global_endPage,
                    prev_text:langUtil.Global_prePage,
                    next_text:langUtil.Global_nextPage,
                    num_edge_entries: 1, /*边缘页数*/
                    num_display_entries: 6, /*主体页数*/
                    callback: pageselectCallback,
                    items_per_page:pageNum /*每页显示1项*/
                });
            }();
            /*上面的回调函数*/
            function pageselectCallback(page_index, jq){
                var max_elem = Math.min((page_index+1) *pageNum, num);
                var resDom = $("#searchRes_"+mdId).find(".resList_box");
                resDom.html("");
                if(num){
                    for(var i=page_index*pageNum;i<max_elem;i++){
                        var new_content = $("#Pagination_"+mdId+" .h_searchAllData .resList_box li:eq("+i+")").clone();
                        resDom.append(new_content); /*装载对应分页的内容*/
                    }
                }else{
                    var con = $("#Pagination_"+mdId+" .h_searchAllData .resList_box").html();
                    resDom.append(con);
                }
                return false;
            }
            /*有内容才显示分页码数*/
            if(num){
                $("#Pagination_"+mdId).show();
            }else{
                $("#Pagination_"+mdId).hide();
            }

        })
    }
};
webUtil.setResListWidth=function(mdId,saleMode){
    if(saleMode == 1){
        var seaW = $("#networkSale_"+mdId+" .f_searchBox .searchRes").width();
        var itemW = (seaW-20)/3+"px";
        $("#networkSale_"+mdId+" .f_searchBox .j_setResW").css({"width":itemW});
    }
}
webUtil.setNetworkFunc=function(mdId,saleMode,pageNum,netWord){
    $("#networkSale_"+mdId+" .search_keyword").val(netWord);
    var allData = $("#result_"+mdId).text();
    var Data = eval(allData);

    webUtil.setEchartsMap(mdId,Data,saleMode,pageNum);

    var proDom = $("#networkSale_"+mdId+" .search_area").find("select[name='area-province']");
    var cityDom = $("#networkSale_"+mdId+" .search_area").find("select[name='area-city']");
    webUtil.selectCity(proDom,cityDom);

    webUtil.changeSelPro(mdId,Data,proDom,1,saleMode,pageNum);  // change pro
    webUtil.changeSelPro(mdId,Data,cityDom,2,saleMode,pageNum); // change city

    /**
     * 点击搜索
     */
    $("#networkSale_"+mdId+" .search_btn").click(function(){
        webUtil.searchByKeywork(mdId,Data,saleMode,pageNum);
        webUtil.setProVal(proDom,"请选择",2,cityDom);
    });

}

/*产品搜索开始*/
webUtil.searchSubmit = function(mdId,searchTip){
    $("#searchForm_"+mdId+" .leftInput").bind('input propertychange', function() {
        $("#searchForm_"+mdId+" input[name=wjs]").val('{sk:"'+$(this).val()+'"}');
    });
    /*点击按钮搜索*/
    $("#search_"+mdId).click(function(event) {
        searchSubmit(event);
    });

    /*点击关键词进行搜索*/
    $("#keywords_"+mdId+" .keywordJquery li").click(function(event){
        var kw = $(this).children("a").attr("data-kw");
        $("#searchForm_"+mdId+" input[name=wjs]").val('{sk:"'+ kw +'"}');
        /*提交输入数据*/
        if($("body").hasClass("edit")){
            webUtil.showTip("当前为编辑状态，不能进行操作");
            return false;
        }
        $("#searchForm_"+mdId).submit();
    });

    /*按下enter回车键进行搜索*/
    $("#searchForm_"+mdId).keydown(function(event){
        /*兼容FF和IE和Opera*/
        var theEvent = event || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) { /*回车键对应的码*/
            searchSubmit(event);
        }
    });

    function searchSubmit(event){
        var leftInput = $("#searchForm_" + mdId + " .leftInput").val();
        if($("body").hasClass("edit")){
            webUtil.showTip("当前为编辑状态，不能进行操作");
            event.preventDefault();
            return false;
        } else {
            if(leftInput != "" && leftInput != searchTip){
                // if($("body").hasClass("edit")){
                //     webUtil.showTip("当前为编辑状态，不能进行操作");
                //     event.preventDefault();
                //     return false;
                // }
                $("#searchForm_" + mdId).submit();
            } else {
                //alert("请输入关键词");
                webUtil.showTip("请输入关键词");
                event.preventDefault();
                return false;
            }
        }
    }
};
/*产品搜索结束*/

webUtil.setPage=function(mdId,showPageMode,dataLength,showCount){
    if(showPageMode == "1"){
        require(["jquery.Mpagination"],function(){
            var initPagination = function() {
                /* 创建分页*/
                $("#"+mdId+" .pagination").pagination(dataLength, {
                    first_text:langUtil.Global_first,
                    end_text:langUtil.Global_endPage,
                    prev_text:langUtil.Global_prePage,
                    next_text:langUtil.Global_nextPage,
                    num_edge_entries: 1, /*边缘页数*/
                    num_display_entries: 6, /*主体页数*/
                    callback: pageselectCallback,
                    items_per_page:showCount /*每页显示1项*/
                });
            }();
            /*上面的回调函数*/
            function pageselectCallback(page_index, jq){
                var max_elem = Math.min((page_index+1) *showCount, dataLength);
                var dataListDom = $("#"+mdId+" .eBookListContent");
                dataListDom.html("");
                for(var i=page_index*showCount;i<max_elem;i++){
                    var new_content = $("#"+mdId+" .Searchresult li:eq("+i+")").clone();
                    dataListDom.append(new_content); /*装载对应分页的内容*/
                }
                return false;
            }
        })
    }
    webUtil.setImageFit("#"+mdId+" .eBookImg");
};
require(["jquery", "wow"], function($) {
    if(!$("body").hasClass('edit')) {
        var animatedWow = new WOW({
            boxClass: 'has_wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            scrollContainer:window
        });
        animatedWow.init();
    }
});
if (typeof toastr == "undefined") {//重定向toastr方法
    toastr = {};
}
toastr.clear=function() {
    var $dom=$("#webupload_tip");
    $dom.remove();
}
toastr.error=function(tip) {
    webUtil.showTip(tip);
}

webUtil.getFwIsNeedPhone = function(){
    var isNeedPhone = "";
    var defer = $.Deferred();
    $.ajax({
        url: '/w/product/getIsNeedPhoneCheck.do',
        type: 'GET',
        async:false,
        success: function(data){
            if(data.result=="SUCCESS"){
                isNeedPhone = data.data.isNeedPhone;
                defer.resolve(isNeedPhone);
            }else{
                data.data===null?'':webUtil.showTip(data.errorMsg.msg,1.5);
            }
        }
    });
    return defer.promise();
}
webUtil.getQueryCode = function(mdId,type){
    var originType=type||0;
    $("#"+mdId+" .queryCodeFrom").find(".fwPhone,.fwCheckCode,input[name=fw-pc-code]").bind('input propertychange',function(){
        $("#fwSubmit_"+mdId).removeClass("disabled");
    })
    require(["jquery.cookie"],function(){
        $.when(webUtil.getFwIsNeedPhone()).done(function(isNeedPhone){
            if(isNeedPhone=="1"){
                $("#"+mdId+" .queryCodeFrom").find(".fwPhone,.fwCheckCode").show();
                $("#"+mdId+" .queryCodeFrom input[name=fw-pc-code]").bind('input propertychange', function() {
                    var qCode=$("#"+mdId+" .queryCodeFrom input[name=fw-pc-code]").val();
                    var fwCookie=false;
                    if($.cookie('fwCookie')/* && !code*/){
                        fwCookie = JSON.parse($.cookie('fwCookie'));
                    }
                    if(fwCookie && fwCookie.codeShow==qCode && fwCookie.fwType==originType){
                        $("#"+mdId+" .queryCodeFrom").find(".fwPhone,.fwCheckCode").hide();
                    }else{
                        $("#"+mdId+" .queryCodeFrom").find(".fwPhone,.fwCheckCode").show();
                    }
                });

            }else{
                $("#"+mdId+" .queryCodeFrom").find(".fwPhone,.fwCheckCode").hide();
            }
            $("#"+mdId+" #fwSubmit_"+mdId).on('click',function(e){
                if($("body").hasClass("edit")) {
                    webUtil.showTip("当前为编辑状态，不能进行操作");
                    return false;
                }else{
                    var qCode = $("#"+mdId+" input[name=fw-pc-code]").val();
                    if(!qCode){
                        webUtil.showTip("请先输入防伪码");
                        return false;
                    }else{
                        if(isNeedPhone == "1"){
                            var fwCookie=false;
                            if($.cookie('fwCookie')/* && !code*/){
                                fwCookie = JSON.parse($.cookie('fwCookie'));
                            }
                            if(fwCookie && fwCookie.codeShow==qCode && fwCookie.fwType==originType){
                                $("#"+mdId+" .queryCodeFrom").find(".fwPhone,.fwCheckCode").hide();
                                var dataInfo={};
                                dataInfo["phone"] = fwCookie.fwPhone;
                                dataInfo["checkCode"] = fwCookie.fwCode;
                                webUtil.getProductDetail(mdId,2,originType,dataInfo);//查询产品信息
                            }else{
                                var fwPhone = $("#"+mdId+" input[name=fw-pc-phone]").val().trim(),
                                    fwCode = $("#"+mdId+" input[name=fw-pc-checkCode]").val().trim();
                                //手机验证格式
                                var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/,
                                    reg1 = new RegExp(/^\d{6}$/);
                                if(fwPhone == "" || reg.test(fwPhone) == false){
                                    webUtil.showTip("请输入正确的手机号码","2");
                                    return;
                                };
                                //验证验证码
                                if(fwCode == "" || reg1.test(fwCode) == false){
                                    webUtil.showTip("请确保验证码输入正确","2");
                                    return;
                                };
                                var cData={phone:fwPhone,checkCode:fwCode,codeShow:qCode};
                                $.ajax({
                                    type: "POST",
                                    url: "/w/product/checkPhoneCode.do",
                                    data: cData,
                                    dataType: "json",
                                    success: function (checkRes) {
                                        if(checkRes.result == "SUCCESS"){
                                            webUtil.getProductDetail(mdId,1,originType);//查询产品信息
                                        }else{
                                            webUtil.showTip("查询失败，请核对您的验证码","2");
                                        }
                                    }
                                });
                            }

                        }else{
                            webUtil.getProductDetail(mdId,0,originType);//查询产品信息
                        }
                    }
                }
            })
        })
    })

}
webUtil.getProductDetail = function(mdId,type,originType,cookieData){
    var originType=originType||0;
    /*	$("#fwSubmit_"+mdId).addClass("disabled");*/
    $("#"+mdId).find("input[name=fw-pc-code],input[name=fw-pc-phone],input[name=fw-pc-checkCode],.pc-checkCode,.submit").addClass("disabled");
    var Fwdata = cookieData ||{};
    Fwdata["codeShow"] = $("#"+mdId+" input[name=fw-pc-code]").val();
    if(type == '1'){
        Fwdata["phone"] = $("#"+mdId+" input[name=fw-pc-phone]").val();
        Fwdata["checkCode"] = $("#"+mdId+" input[name=fw-pc-checkCode]").val();
    }
    require(["jquery","async!BMap"], function ($) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                ProductOrigin(mdId,r.point.lng,r.point.lat,Fwdata);
            }else {
                webUtil.showTip('获取经纬度失败，'+this.getStatus(),"2");
                ProductOrigin(mdId,"","",Fwdata);
            }
        });
    })
    if(originType==1){
        function ProductOrigin(mdId,lng,lat,dataInfo){
            $.when(webUtil.commonThird("getShop","fw",dataInfo)).done(function(res){
                if(res.result == "SUCCESS"){
                    var fwProData = res.data;
                    if(type == '1'){
                        $.cookie('fwCookie', '', {expires: -1}); // 删除旧的cookie
                        var fwCookie = JSON.stringify({"fwPhone" : Fwdata.phone,"fwCode":Fwdata.checkCode,"codeShow":Fwdata.codeShow,"fwType":originType});
                        $.cookie("fwCookie",fwCookie,{expires:1}); //再存储cookie
                    }
                    var html='';
                    $("#"+mdId+" .queryCodeResult").remove();
                    html+='<div class="queryCodeResult">';
                    html+='<p><span>完成操作！</span></p>';
                    html+='<ul>';
                    html+='<li class="rTitle">门店信息</li>';
                    html+='<li>门店编号：<span>'+fwProData.productNo+'</span></li>';
                    html+='<li>门店防伪码：<span>'+fwProData.codeShow+'</span></li>';
                    html+='<li>门店名称：<span>'+fwProData.productName+'</span></li>';
                    if(fwProData.productDesc){
                        html+='<li>门店地址：<span>'+fwProData.productDesc.split("||")[0]+'</span></li>';
                        html+='<li>联系方式：<span>'+fwProData.productDesc.split("||")[1]+'</span></li>';
                        html+='<li>门店介绍：<span>'+fwProData.productDesc.split("||")[2]+'</span></li>';
                    }
                    html+='</ul><div id="storeDistance">查询结果：<span></span></div><div id="fwBMapwrapperStore"></div><div class="rBack"><span class="icon iconfont kenfor-icons-upward1"></span></div></div>';
                    var addrData=[{lng:fwProData.shopLng,lat:fwProData.shopLat,labelTxt:fwProData.productName},{lng:lng,lat:lat,labelTxt:'我的位置'}];
                    dataUtil.renderBMapNew("fwBMapwrapperStore",addrData);
                    $("#fwBMapwrapperStore label").css({"max-width":"auto!important"});
                    $("#"+mdId+" .queryCodeFrom").append(html);
                    $("#"+mdId+" .pc-checkCode").text("发送验证码");
                    $("#"+mdId+" .pc-checkCode").addClass('lock');
                    $("#"+mdId+" .queryCodeResult").fadeIn();
                    $("#"+mdId+" .queryCodeResult .rBack").on('click',function(){
                        $("#"+mdId+" .queryCodeResult").hide().remove();
                        if(window.Timer){
                            clearInterval(Timer);
                        }
                        $("#"+mdId+" .pc-checkCode").removeClass("lock");
                        $("#"+mdId).find("input[name=fw-pc-code],input[name=fw-pc-phone],input[name=fw-pc-checkCode],.pc-checkCode,.submit").removeClass("disabled");
                    })

                }else{
                    $("#"+mdId).find("input[name=fw-pc-code],input[name=fw-pc-phone],input[name=fw-pc-checkCode],.pc-checkCode,.submit").removeClass("disabled");
                    if(res.errorMsg.errmsg){
                        webUtil.showTip("查询失败，" + res.errorMsg.errmsg,"2");
                    }else{
                        webUtil.showTip("查询失败，请核对您的防伪码","2");
                    }
                }
            })
        }
    }else{
        function ProductOrigin(mdId,lng,lat,dataInfo){
            dataInfo["lng"] = lng;
            dataInfo["lat"] = lat;
            $.ajax({
                type: "POST",
                url: "/w/product/infoProductOriginResult.do",
                data: dataInfo,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if(res.result == "SUCCESS" && res.data.codeShow){
                        var fwProData = res.data;
                        if(type == '1'){
                            $.cookie('fwCookie', '', {expires: -1}); // 删除旧的cookie
                            var fwCookie = JSON.stringify({"fwPhone" : Fwdata.phone,"fwCode":Fwdata.checkCode,"codeShow":Fwdata.codeShow,fwType:originType});
                            $.cookie("fwCookie",fwCookie,{expires:1}); //再存储cookie
                        }
                        var html='';
                        $("#"+mdId+" .queryCodeResult").remove();
                        html+='<div class="queryCodeResult">';
                        html+='<p><span>完成操作！</span></p>';
                        html+='<ul>';
                        html+='<li class="rTitle">产品信息</li>';
                        html+='<li>产品编号：<span>'+fwProData.no+'</span></li>';
                        html+='<li>产品名称：<span>'+fwProData.name+'</span></li>';
                        html+='<li>产品防伪码：<span>'+fwProData.codeShow+'</span></li>';
                        html+='<li class="rTitle">追踪溯源</li>';
                        html+='<li class="rCount">查询次数：<span>'+fwProData.queryCount+'</span></li>';
                        html+='<li>最后鉴定时间：<span>'+fwProData.lastQueryDate+'</span></li><li>最后查询地：</li>';
                        html+='</ul><div id="fwBMapContainer"></div><div class="rBack"><span class="icon iconfont kenfor-icons-upward1"></span></div></div>';
                        dataUtil.renderBMap("fwBMapContainer",fwProData.lng,fwProData.lat);
                        $("#"+mdId+" .queryCodeFrom").append(html);
                        $("#"+mdId+" .pc-checkCode").text("发送验证码");
                        $("#"+mdId+" .pc-checkCode").addClass('lock');
                        /*$("#"+mdId+" .pc-checkCode").removeClass("disabled");*/
                        $("#"+mdId+" .queryCodeResult").fadeIn();
                        $("#"+mdId+" .queryCodeResult .rBack").on('click',function(){
                            $("#"+mdId+" .queryCodeResult").hide().remove();
                            if(window.Timer){
                                clearInterval(Timer);
                            }
                            $("#"+mdId+" .pc-checkCode").removeClass("lock");
                            $("#"+mdId).find("input[name=fw-pc-code],input[name=fw-pc-phone],input[name=fw-pc-checkCode],.pc-checkCode,.submit").removeClass("disabled");
                        })

                    }else{
                        $("#"+mdId).find("input[name=fw-pc-code],input[name=fw-pc-phone],input[name=fw-pc-checkCode],.pc-checkCode,.submit").removeClass("disabled");
                        if(res.errorMsg.errmsg){
                            webUtil.showTip("查询失败，" + res.errorMsg.errmsg,"2");
                        }else{
                            webUtil.showTip("查询失败，请核对您的防伪码","2");
                        }
                    }
                }
            });
        }
    }

}
//防伪的点击获取验证码

webUtil.getFwCode = function(type,phoneID,codeID){
    if($('body').hasClass('edit')){
        webUtil.showTip("当前为编辑状态，不可操作");
    }else {
        if (type == "reser") {
            /*			var fwPhone = $("input[name=reserPhone]").val().trim();*/
            if(phoneID){
                var fwPhone = $("#"+phoneID).val().trim();
            }else{
                var fwPhone = $("input[name=reserPhone]").val().trim();
            }
        } else {
            var fwPhone = $("input[name=fw-pc-phone]").val().trim();
        }
        var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/;
        if (fwPhone == "" || reg.test(fwPhone) == false) {
            webUtil.showTip("请输入正确的手机号码", "2");
            return;
        } else {
            if (type == "reser") {
                webUtil.setInterval(0, type,codeID);
            } else {
                webUtil.setInterval(0);
            }
            //调用接口获取验证码
            $.ajax({
                type: "get",
                url: "/sendSms/sendRandomCode.do",
                data: {
                    "phone": fwPhone
                },
                dataType: "json",
                success: function (res) {
                    if (res.result == "SUCCESS") {
                        if (type == "reser") {
                            webUtil.setInterval(1, type,codeID);
                        } else {
                            webUtil.setInterval(1);
                        }
                    } else {

                        switch(res.errorMsg.tips)
                        {
                            case "1000":
                                tips='手机号码不合法';
                                break;
                            case "1001":
                                tips='手机号码不合法';
                                break;
                            case "1002":
                                tips='uc密码错误';
                                break;
                            case "1003":
                                tips='短信数量不足';
                                break;
                            case "1004":
                                tips='短信内容为空';
                                break;
                            case "1005":
                                tips='大于短信模板为空';
                                break;
                            case "1006":
                                tips='大于模板参数为空';
                                break;
                            case "1007":
                                tips='token错误';
                                break;
                            case "1008":
                                tips='uc账号格式不正确';
                                break;
                            case "1009":
                                tips='通道不存在';
                                break;
                            case "1010":
                                tips='公司账号所拥有的短信少于100条';
                                break;
                            case "1010":
                                tips='管理员账号所拥有的短信少于100条';
                                break;
                            case "2001":
                                tips='短信已超过当日限额';
                                break;
                            default:
                                tips='短信发送失败，请稍后重试';
                        }
                        if (type == "reser") {
                            webUtil.setInterval("", type,codeID);
                        } else {
                            webUtil.setInterval();
                        }
                        webUtil.showTip(tips, "2");
                    }
                }
            });
        }
    }
}
webUtil.setInterval=function(state,type,codeID){
    var _this = $(".fw-timer-button");
    if(type=="reser"){
        if(codeID){
            _this = $("#"+codeID);
        }else{
            _this = $(".sendCode-text");
        }
    }
    if(state==0){
        if(!_this.hasClass("fw-disable")){
            _this.addClass("fw-disable");
        }
        _this.text("正在发送...");
    }else if(state==1){
        webUtil.showTip("短信已发出，请注意查收","2");
        _this.text("90秒");
        var i = 89;
        window.Timer = setInterval(function(){
            var tickText = '';
            if(i >= 10){
                tickText = i + "秒";
            }else{
                tickText = "0" + i + "秒";
            }
            _this.text(tickText);
            i--;
            if(i < 0 ){
                _this.text('发送验证码');
                _this.removeClass("fw-disable");
                clearInterval(Timer);
            }
        },1000);
    }else if(state==2){
        _this.text('发送验证码');
        _this.removeClass("fw-disable");
        if(window.Timer){
            clearInterval(window.Timer);
        }
    }else{
        _this.text("发送验证码");
        _this.removeClass("fw-disable");
    }
}

/*webUtil.getFwCode = function(btn){
 var fwPhone = $("input[name=fw-pc-phone]").val().trim();
 var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/;
 if(fwPhone == "" || reg.test(fwPhone) == false){
 webUtil.showTip("请输入正确的手机号码","2");
 return;
 }else{
 var _this = $(btn), i = 89;
 if(!_this.hasClass("disabled")){
 _this.addClass("disabled");
 }
 _this.text("正在发送...");
 //调用接口获取验证码
 $.ajax({
 type: "get",
 url: "/sendSms/sendRandomCode.do",
 data: {
 "phone":fwPhone
 },
 dataType: "json",
 success: function (res) {
 if(res.result == "SUCCESS"){
 webUtil.showTip("短信已发出，请注意查收","2");
 _this.val("90秒");
 window.Timer = setInterval(function(){
 var tickText = '';
 if(i >= 10){
 tickText = i + "秒";
 }else{
 tickText = "0" + i + "秒";
 }
 if(!_this.hasClass('lock')){
 _this.text(tickText);
 }
 i--;
 if(i < 0 ){
 if(!_this.hasClass('lock')){
 _this.text('发送验证码');
 _this.removeClass("disabled");
 clearInterval(Timer);
 }
 }
 },1000);
 }else if(res.errorMsg.tips == '2001'){
 webUtil.showTip("短信已超过当日限额","2");
 _this.text("发送验证码");
 _this.removeClass("disabled");
 }else{
 webUtil.showTip("短信发送失败，请稍后重试","2");
 _this.text("发送验证码");
 _this.removeClass("disabled");
 }
 }
 });
 }
 }*/

/*电子图册books(v1) start*/
//分页
webUtil.setListBooksPage = function(mdId,num_entries,showCount,pageNum,rowWidth,showDisMode){
    require(["jquery.Mpagination"],function(){
        var initPagination = function() {
            /*创建分页*/
            var langId=dataUtil.currentLangId();
            $("#Pagination_"+mdId).pagination(num_entries, {
                first_text:langUtil.Global_first,
                end_text:langUtil.Global_endPage,
                prev_text:langUtil.Global_prePage,
                next_text:langUtil.Global_nextPage,
                num_edge_entries: 1,
                num_display_entries: 6,
                callback: pageselectCallback,
                items_per_page:showCount
            });
        }();
        function pageselectCallback(page_index, jq){
            var max_elem = Math.min((page_index+1) *showCount, num_entries);
            $("#bookList_"+mdId).html("");
            for(var i=page_index*showCount;i<max_elem;i++){
                var resultId=$("#result_"+mdId).children("li").eq(i);
                var resultHtml='';
                var data_img=resultId.data("img");
                var data_name=resultId.data("name");
                var data_bvrid=resultId.data("bvrid");
                var hrefValue = "displaybook.html?from=fancybox&id="+data_bvrid;
                if(showDisMode==2){
                    hrefValue="javascript:void(0);";
                }
                resultHtml += '<li class="books_li" data-bvrid="'+data_bvrid+'"  style="height:auto;width:'+rowWidth+';">' +
                    '<a  target="_blank" href="'+hrefValue+'" class="books_link" title="'+data_name+'">'+
                    '<div class="typeImg" ><img src="'+data_img+'"></div>' +
                    '<div class="typeName">'+data_name+'</div>' +
                    '</a>' +
                    '</li>';
                $(resultHtml).appendTo( $("#bookList_"+mdId));
            }
            webUtil.disBooks(mdId,showDisMode);
            webUtil.toBooks(mdId);
        }
    });
};
//2,3展示方式
webUtil.setBooksEffect = function(mdId,pageNum,opp,delayTime,autoPlay,scroll,interTime,styleMode){
    require(["SuperSlide"],function() {
        var con_w=$("#books_"+mdId+" .photoListContainer").width();
        var list_w=$("#books_"+mdId+" .booksBox_view").width();
        if(list_w<=con_w){
            var box_w=($("#books_"+mdId+" .photoListContainer").width()-100)/pageNum;
            $("#bookList_"+mdId+" li.typeImg").css({width:box_w});
        }
        var $parentBox=$("#books_"+mdId+" .scroll_list");
        if($parentBox.children('div').hasClass('tempWrap')){
            var tempHtml=$parentBox.children('div.tempWrap').html();
            $parentBox.html(tempHtml);
        }
        if(styleMode==1) {
            $("#books_"+mdId + " .listPhotoPanel2").slide({
                titCell: "listPhotoPanel2 ul",
                mainCell: ".scroll_list ul",
                effect: "left",
                easing: "swing",
                opp: opp,
                delayTime: delayTime,
                autoPlay: autoPlay,
                vis: pageNum,
                pnLoop: false,
                scroll: scroll,
                autoPage: true
            });

        }else if(styleMode==2) {
            if(!$("body").hasClass("edit")){
                $("#books_"+mdId+ " .bookList").find(".clone").remove();
            }
            $("#books_"+mdId + " .listPhotoPanel3").slide({
                mainCell: "ul",
                effect: "leftMarquee",
                opp: opp,
                vis: pageNum,
                autoPlay: true,
                interTime: interTime,
                switchLoad: "_src"
            });
        }
        webUtil.toBooks(mdId);
    });
};
//编辑判断
webUtil.toBooks = function(mdId){
    webUtil.setImageFit('#books_'+mdId+' .typeImg',mdId);
    if(WebModel=="edit"){
        $('#books_'+mdId+' a.books_link').on('click', function(e){
            webUtil.showTip('编辑状态，无法操作');
            return false;
        })
    }
};
webUtil.setBooksList=function(mdId){
    var $dom=$("#books_"+mdId+" .booksBox_view");
    var config=eval("("+$dom.data("config")+")");//获取所需的配置信息
    if(config.styleMode==0){
        if(config.showMode==0 && config.nums > 0){
            webUtil.setListBooksPage(mdId,config.nums,config.showCount,config.pageNum,config.rowWidth,config.showDisMode);
        }
    }else{
        webUtil.setBooksEffect(mdId,config.pageNum,config.opp,config.delayTime,config.autoPlay,config.scroll,config.interTime,config.styleMode);
    }
    webUtil.toBooks(mdId);
};
webUtil.disBooks = function(mdId,showDisMode){
    if(showDisMode ==1){
        require(["fancyJs"], function(){
            $('#bookList_' + mdId + ' .books_link').fancybox({
                type : 'iframe',
                width : '96%',
                height : '96%',
                helpers : {
                    overlay : true,
                    title : false
                },
                openEffect : 'elastic',
                closeEffect : 'elastic'
            });
        })
    }else {
        $("#bookList_"+ mdId +" .books_li").on('click',function(){
            var id = $(this).data("bvrid");
            $("#object_"+ mdId +" .object").html('<object type="text/html" data="displaybook.html?from=fancybox&id='+id+'" width="100%" height="600px"></object>');
            $(this).parents(".scroll_list").hide();
            $("#Pagination_"+ mdId).hide();
            $("#object_"+ mdId).find(".object").addClass("open");
            $("#object_"+ mdId +" .close_books").fadeIn(2500);
            $("#object_"+ mdId +" .close_books").on("click",function(){
                $(this).parents("#object_"+ mdId).find(".object").removeClass("open");
                $("#bookList_"+ mdId +" .books_li").parents(".scroll_list").show();
                $(this).hide();
                $("#Pagination_"+ mdId).show();
            })
        })
    }
};

/*电子图册books(v1) end*/





/* 预约组件 */
webUtil.commonThird=function(apicode,syscode,params){
    var apicode=apicode||'',syscode=syscode||'yy',params=params||'';
    var defer = $.Deferred();
    var yyParams={};
    apicode==''?'':yyParams.apicode=apicode;
    syscode==''?'':yyParams.syscode=syscode;
    params==''?'':yyParams.params=JSON.stringify(params);
    $.ajax({
        url: '/w/thirdSys/commonThird.do',
        type: 'POST',
        data:yyParams,
        success: function(data){
            if(data.result=="SUCCESS"){
                defer.resolve(data);
            }else{
                if(apicode=='getShop' || apicode=='getShopById') {
                    defer.resolve(data);
                }
                else{
                    var tips=(data.errorMsg && data.errorMsg.errorMsg)?data.errorMsg.errorMsg:'获取数据失败';
                    webUtil.showTip(tips,1.5);
                };
            }
        }
    });
    return defer.promise();
}
var tempTime=[];
webUtil.getProjectList=function(pID,mdId,flag,params){
    var bEvent2=function(){
        $(mId+" .clickDetail,"+mId+" .clickDetail_only").on('click',function(e){
            if($("body").hasClass("edit")){
                webUtil.showTip("编辑状态不可点击","1");
            }else{
                var $el=$(e.currentTarget).hasClass("clickDetail_only")?$(e.currentTarget).parent():$(e.currentTarget);
                webUtil.getListBooking($el.data("code"),mdId);
            }
        })
    }
    var bEvent1=function(){
        $(".reser_icon").on('click',function(e){
            if($("body").hasClass("edit")){
                webUtil.showTip("编辑状态不可点击","1");
            }else{
                if($("#yyBMapwrapper").length>0){
                    $("#yyBMapwrapper").remove();
                }else{
                    var el=$(e.currentTarget);
                    var txt=el.find("input").val();
                    var lng=el.data("lng");
                    var lat=el.data("lat");
                    $("#yyBMapwrapper").remove();
                    el.parents(".reser_list_li").find("ul").append('<li id="yyBMapwrapper"><div id="yyMapWrap"></div><div id="mapIcon" class="icon iconfont kenfor-icons-upward1"></div></li>');
                    $("#yyBMapwrapper").css("margin-top","10px");
                    webUtil.renderBMap("yyMapWrap",lng,lat,txt);
                    $("#mapIcon").on('click',function(){
                        $("#yyBMapwrapper").remove();
                    })
                }
            }
            e.stopPropagation();
        })
    }
    var html='';
    if(mdId){
        var mId='#'+mdId;
    }else{
        var mId='';
    }
    var total= 0,showPageMode=params.status,showCount=params.amount,showDesc=params.showDesc;
    $.when(webUtil.commonThird("listMemberProject","yy")).done(function(data){
        if(flag=="1"){
            $.each(data.data,function(i,item){
                if(item.projectId==pID){
                    html+='<div data-id="'+item.projectId+'" data-code="'+item.projectCode+'"><a class="clickDetail_only win_background_color"><span>预约服务</span></a></div>';
                }
            })
            $(mId+" .reser_list").html(html);
        }else{
            html='';
            $.each(data.data,function(i,item){
                if(pID && pID.indexOf(String(item.projectId)) !=-1){
                    var timeType=item.eventDurationUnitType==1?'分钟':'小时';
                    var lng=item.eventLongitude,lat=item.eventLatitude,labelTxt=item.eventLocation;
                    var projectDescription=item.projectDescription?item.projectDescription:'';
                    var mapHtml='',aClass='';
                    if(lng && lat){
                        mapHtml='<li class="reser_icon icon iconfont kenfor-icons-sc-Other7" data-lng="'+lng+'" data-lat="'+lat+'"><input type="hidden" value="'+labelTxt+'"></li>';
                    }else{
                        aClass='all';
                    }
                    if(params.showRowNum!=1 && total!=0 && total%params.showRowNum==0){
                        var clearHtml='<div class="clearfix"></div>',clearStyle='style="margin-left:0px;"';
                    }else{
                        var clearHtml=clearStyle='';
                    }
                    total==0?clearStyle='style="margin-left:0px;"':'';
                    html+=clearHtml+'<div class="reser_list_li clickDetail" data-id="'+item.projectId+'" data-code="'+item.projectCode+'" '+clearStyle+'>';
                    html+='<ul>';
                    html+='<li class="reser_title">'+item.projectName+'</li>';
                    html+='<li>'+item.resourcesNum+'个服务人员</li>';
                    html+='<li>服务时长'+item.eventDurationValue+timeType+'</li>';
                    if(showDesc==1){
                        html+='<li class="reser_desc">'+item.projectDescription+'</li>';
                    }
                    html+=mapHtml+'</ul>';
                    html+='</div>';
                    total=total+1;
                }
            })
            if(params.status == "1"){
                $(mId+" .reser_list").html(html);
                /*	var dataLength=total;
                 $(mId+" .reser_list_moni").html(html);
                 webUtil.setPageYY(mdId,showPageMode,dataLength,showCount)*/

            }else{
                $(mId+" .reser_list").html(html);
            }
            bEvent1()
        }
        bEvent2();

    })

}
webUtil.getListBooking = function(code,mdId){
    var params={projectCode:code};
    /*	$.when(webUtil.listProjectAvailabilityBooking(code)).done(function(data){*/
    $.when(webUtil.commonThird("listProjectABooking","yy",params),webUtil.commonThird("queryMsgCheck","yy")).done(function(data,data1){
        var tempData=data.data;
        console.log(tempData);
        if(tempData.dateList.length>0){
            var minDay=tempData.dateList[0].date+' 00:00:00';
            var maxDay=tempData.dateList[tempData.dateList.length-1].date+' 23:59:59';
            var lng=tempData.eventLongitude,lat=tempData.eventLatitude,labelTxt=tempData.eventLocation;
            tempTime=tempData.dateList;
            var html='';
            html+='<div class="windowPop_true"><input id="msgCheck" type="hidden" value="'+data1.data.msgCheck+'"><input id="projectCode" type="hidden" value="'+code+'"><input id="selectResourcesWay" type="hidden" value="'+tempData.selectResourcesWay+'"><input id="eventDuration" type="hidden" value="'+tempData.eventDuration+'"><input id="projectName" type="hidden" value="'+tempData.projectName+'">';
            html+='<div class="windowPop_close"><span>在线预约服务</span><i class="icon iconfont kenfor-icons-off1"></i> </div><div class="windowPop_content win_scroll"><div class="setInfo_title">预约信息</div><ul class="windowPop_layout">';
            html+='<li class="setInfo_name"><span class="win_color">'+tempData.projectName+'</span>'+tempData.projectDescription+'</li>';
            html+='<li id="showLaydate" class="setInfo_list"><label>选择日期和时间</label><p class="re_select"><span id="bookingDay"></span><span id="bookingTime" data-endtime=""></span><i onclick="laydate({elem:\'#bookingDay\',start: \''+minDay+'\',min: \''+minDay+'\', max:\''+maxDay+'\'})" class="win_color">修改日期</i></p></li>';
            html+='<li class="setInfo_list" onclick="webUtil.layService(this)"><label>服务人员(可选)</label><p class="re_select"><span id="staffName" data-id="">未指定</span></p></li>';
            html+='</ul>';

            html+='<div class="setInfo_title">客户信息</div><ul class="windowPop_layout">';
            html+='<li class="setInfo_list"><label>姓名</label><input class="enterInput" type="text" placeholder="姓名" name="re_info"></li>';
            html+='<li class="setInfo_list"><label>手机号码</label><input class="enterInput" type="tel" placeholder="手机号码" name="re_phone" id="re_phone"></li>';
            if(data1.data.msgCheck==1){
                html+='<li class="setInfo_list"><label>验证码</label><input class="enterInput" type="tel" placeholder="验证码" name="re_code"><i class="v_code win_color win_border_color" id="v_code">发送验证码</i></li>';
            }
            html+='</ul>';
            html+='<div class="setInfo_title">预约留言</div>';
            html+='<textarea class="remark" id="re_remark" placeholder="有其他备注请留言"></textarea>';
            html+='</div>';
            html+='<div class="windowPop_bottom win_background_color" onclick="webUtil.saveData()"><span>提交预约</span></div>';
            html+='</div>';
            /*			webUtil.hiddenPop();
             webUtil.hiddenDesign();*/
            if($("#windowPop").length>0){
                $("#windowPop .windowPop_body").append(html);
            }else{
                $("body").append('<div id="windowPop"><div class="windowPop_body">'+html+'</div></div>');
            }
            $("#windowPop").show();
            $("body").addClass("only_"+mdId);
            /*$("body").append('<div class="windowPop_head"><span class="icon iconfont kenfor-icons-back5"></span></div><div class="windowPop_bottom yy_bgColor" onclick="webUtil.saveData()"><span>提交预约</span></div>');*/
            if(lng && lat){
                $("#windowPop .windowPop_content").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div></div>');
                webUtil.renderBMap("yyMapWrap",lng,lat,labelTxt);
            }
            $(".windowPop_body,#laydate_box_web").on('click',function(e){
                e.stopPropagation();
            })
            $(".windowPop_close i").on('click',function(){
                webUtil.hiddenPop();
                $("body").removeClass("only_"+mdId);

            })
            $("#windowPop .v_code").on('click',function(){
                webUtil.getFwCode("reser","re_phone","v_code")
            })
        }else{
            webUtil.showTip("预约已满","2");
        }

    })
}
webUtil.hiddenPop=function(){
    $("#windowPop").hide();
    $("#windowPop .windowPop_true").remove();
    /*	$("body").removeClass("laydate_body");*/
}
webUtil.hiddenDesign=function(){
    $("#web_design_main").hide();
}
webUtil.layService=function(e){
    var $date=$("#bookingDay").html();
    var $time=$("#bookingTime").html();
    if($time && !($date=='' || $date=='未指定')){
        var html='',$staff=$("#staffName");
        html+='<div class="reservation_staff"><div class="staff_list"><div class="laytime_title">选择服务人员<span><i class="icon iconfont kenfor-icons-off1"></i></span></div><ul class="win_scroll">' ;
        var date1 = new Date($date);
        $.each(tempTime,function(i,item){
            var date2 = new Date(item.date);
            if(date1.getTime() == date2.getTime()){
                $.each(item.bookingList,function(j,time){
                    var t1=$date+' '+time.s,t2=$date+$time;
                    if(new Date(t1.replace(/-/g,'/')).getTime() == new Date(t2.replace(/-/g,'/')).getTime()){
                        $.each(time.l,function(k,staff){
                            var t3=$date+' '+time.s;
                            if(new Date(t3.replace(/-/g,'/')).getTime() == new Date(t2.replace(/-/g,'/')).getTime()){
                                var cName=$staff.html()==staff.n?"staff_click":"";
                                html+='<li class="'+cName+'" data-id="'+staff.i+'"><span>'+staff.n+'</span></li>';
                            }
                        })
                    }

                })
            }
        })
        html+='</ul><div class="staff_bottom win_background_color">确认</div></div></div></div>';
        $(e).append(html);
        $(".staff_list ul li").on('click',function(){
            $(".staff_list ul li").removeClass('staff_click');
            $(this).removeClass('staff_click').addClass("staff_click");
            $staff.html($(this).find("span").html());
            $staff.attr("data-id",$(this).attr("data-id"));
        })
        $(".staff_bottom,.staff_list ul li").on('click',function(e){
            var temp=$(e.currentTarget).parent().find(".staff_click");
            if(temp.length>0){
                $staff.html(temp.find("span").html());
                $staff.attr("data-id",temp.attr("data-id"));
            }else{
                $staff.html($(".staff_list .staff_click span").html());
                $staff.attr("data-id",$(".staff_list .staff_click").attr("data-id"));
            }
            $(".reservation_staff").remove();
            e.stopPropagation();
        })
        $(".laytime_title span").on('click',function(e){
            $(".reservation_staff").remove();
            e.stopPropagation();
        })

    }else{
        webUtil.showTip("请选择时间","1");
    }
}
webUtil.layTime=function(){
    var $dom=$("#laydate_table .laydate_click");
    var $obj=$("#laydate_time_define span");
    if($dom.length>0 && !$dom.hasClass("laydate_void")){
        var html='';
        html+='<div class="laytime"><div class="laytime_title">选择预定时间<span onclick="webUtil.hideLayTime()"><i class="icon iconfont kenfor-icons-off1"></i></span></div><ul class="">' ;
        console.log(tempTime)
        var m=$dom.attr("m")<10?"0"+$dom.attr("m"):$dom.attr("m"),d=$dom.attr("d")<10?"0"+$dom.attr("d"):$dom.attr("d");
        var date=$dom.attr("y")+"-"+m+"-"+d;
        var date1 = new Date(date);
        $.each(tempTime,function(i,item){
            var date2 = new Date(item.date);
            if(date1.getTime() == date2.getTime()){
                $.each(item.bookingList,function(j,time){
                    var cName=$obj.html()==time.s?"laydate_time_click":"";
                    html+='<li class="'+cName+'"><span data-people="'+time.l[0].i+'" data-name="'+time.l[0].n+'" data-endtime="'+time.e+'">'+time.s+'</span></li>';
                })
            }
        })
        html+='</ul><div class="laytime_bottom win_background_color">确认</div></div> </div>';
        $(".laydate_body #laydate_box_web").append(html);
        $(".laytime ul li").on('click',function(){
            $(".laytime ul li").removeClass('laydate_time_click');
            $(this).removeClass('laydate_time_click').addClass("laydate_time_click");
            $obj.html($(this).find("span").html());
            $obj.attr("data-endtime",$(this).find("span").attr("data-endtime"));
            $obj.attr("data-people",$(this).find("span").attr("data-people"));
            $obj.attr("data-name",$(this).find("span").attr("data-name"));
        })
        $(".laytime_bottom,.laytime ul li").on('click',function(e){
            var temp=$(e.currentTarget).find(".laydate_time_click");
            if(temp.length>0){
                $obj.html(temp.find("span").html());
                $obj.attr("data-endtime",temp.find("span").attr("data-endtime"));
                $obj.attr("data-people",temp.find("span").attr("data-people"));
                $obj.attr("data-name",temp.find("span").attr("data-name"));
            }else{
                var $el=$("#laydate_table .laydate_time_click");
                $obj.html($dom.find("span").html());
                $obj.attr("data-endtime",$el.find("span").attr("data-endtime"));
                $obj.attr("data-people",$el.find("span").attr("data-people"));
                $obj.attr("data-name",$el.find("span").attr("data-name"));
            }
            webUtil.hideLayTime();
        })
        $(".laytime").siblings().hide();
    }
}
webUtil.hideLayTime=function(){
    webUtil.clickOk()
    $(".laytime").siblings().show();
    $(".laytime").remove();
}
webUtil.clickOk=function(){
    var $el=$("#laydate_time_define span");
    if($el.html()=='' || $el.html()=="未指定") {
        $("#laydate_ok").addClass("disable");
        $("#staffName").html("未指定");
        $("#staffName").attr("data-id","");
        $("#bookingTime").html("");
        $("#bookingTime").attr("data-endtime","");
        return false
    }else{
        $("#laydate_ok").removeClass("disable");
        $("#staffName").html($el.attr("data-name"));
        $("#staffName").attr("data-id",$el.attr("data-people"));
    }

}
webUtil.saveData=function(){
    $(".windowPop_bottom").removeClass("yy-disable").addClass("yy-disable");
    var $day=$("#bookingDay"),$time=$("#bookingTime");
    var $projectCode=$("#projectCode").val(),
        $projectName=$("#projectName").val(),
        $bookingName=$("input[name=re_info]").length>0?$("input[name=re_info]").val().trim():'$("input[name=re_info]").val()',
        $bookingComment=$("#re_remark").val(),
        $resouresId=$("#staffName").attr("data-id"),
        $msgCheck=$("#msgCheck").val(),
        $bookingMobile=$("input[name=re_phone]").length>0?$("input[name=re_phone]").val().trim():'$("input[name=re_phone]").val()',
        $phoneCode=$("input[name=re_code]").length>0?$("input[name=re_code]").val().trim():'',
        $bookingStartTime=$day.html()+$time.html(),
        $bookingEndTime=$day.html()+' '+$time.attr("data-endtime");
    //$eventDuration=$("#eventDuration").val();
    //手机验证格式
    var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/,
        reg1 = new RegExp(/^\d{6}$/);
    $.when(webUtil.commonThird("queryMsgCheck","yy")).done(function(data){
        if($msgCheck==1){// 1需要手机验证
            $phoneCode=$("input[name=re_code]").val();
        }
        var errorTip=function(tips){
            webUtil.showTip(tips,"1",'',1);
            //$.toast(tips,'text');
            $(".windowPop_bottom").removeClass("yy-disable");
            return false
        }
        if($day.html()=='' || $day.html()=='未指定' || $time.html()==''){
            errorTip("请选择日期和时间");
        }else if($resouresId=='' || $resouresId=='未指定') {
            errorTip("请选择服务人员");
        }else if($bookingName=='') {
            errorTip("请输入姓名");
        }else if($bookingMobile == "" || reg.test($bookingMobile) == false){
            errorTip("请输入正确的手机号码");
        }else if($msgCheck==1 && ($phoneCode == "" || reg1.test($phoneCode) == false)){
            errorTip("请确保验证码输入正确");
        } else{
            var $dom=$(".windowPop_body");
            $dom.css({"padding":"0px"})
            $(".windowPop_true").hide();
            var html='';
            html+='<div class="windowPop_repeat"><ul>';
            $projectName
            html+='<li><span>项目名称</span>'+$projectName+'</li>';
            html+='<li><span>预约时间</span>'+$bookingStartTime+' - '+$time.attr("data-endtime")+'</li>';
            html+='<li><span>姓名</span>'+$bookingName+'</li>';
            html+='<li><span>手机号码</span>'+$bookingMobile+'</li>';
            html+='<li><span>留言</span>'+$bookingComment+'</li>';
            html+='</ul><div  class="windowPop_repeat_bottom"><a class="submit win_background_color">确认</a><a class="reset win_background_color">取消</a></div></div>';
            $(".windowPop_body").append(html);
            $(".windowPop_repeat_bottom a").on('click',function(e){
                if($(e.currentTarget).hasClass("submit")){
                    $(e.currentTarget).removeClass("yy-disable").addClass("yy-disable");
                    if(!savePort()){
                        $(".windowPop_repeat_bottom").removeClass("yy-disable");
                    }
                }else{
                    $(".windowPop_body .windowPop_repeat").remove();
                    $dom.css({"padding":"20px"});
                    $(".windowPop_true").show();
                    $(".windowPop_bottom").removeClass("yy-disable");
                    return false
                }

            })
        }
    })
    var savePort=function(){
        var flag=false;
        var params={projectCode:$projectCode,phoneCode:$phoneCode,bookingName:$bookingName,bookingComment:$bookingComment,resouresId:$resouresId,bookingMobile:$bookingMobile,phoneNum:$bookingMobile,bookingStartTime:$bookingStartTime,bookingEndTime:$bookingEndTime};
        $.when(webUtil.commonThird("addBooking","yy",params)).done(function(data){
            $(".windowPop_repeat_bottom").removeClass("yy-disable");
            var rHtml='';
            rHtml+='<div class="windowPop_repeat"><ul>';
            var tips=data.data.bookingStatus==0?'提交成功（等待确认）':'预约成功！';
            rHtml+='<div class="windowPop_sucess_title" >'+tips+'</div><div class="windowPop_sucess_code win_color">本次预约码 <span>'+data.data.bookingCode+'</span></div>';
            rHtml+='</ul><div  class="windowPop_repeat_bottom"><a class="win_background_color goback">完成</a></div>';
            var $dom=$(".windowPop_body");
            $(".windowPop_repeat").remove();
            $dom.append(rHtml);
            $(".windowPop_repeat_bottom a").on('click',function(e){
                webUtil.hiddenPop();
                $(".windowPop_body .windowPop_repeat").remove();
                $dom.css({"padding":"20px"});
            })
            flag=true;
        })
        return flag
    }
}

webUtil.getYyCode=function(){
    var rPhone = $("input[name=reserPhone]").val().trim();
    //手机验证格式
    var phoneReg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/;
    if (rPhone == "" || phoneReg.test(rPhone) == false) {
        webUtil.showTip("请先输入手机号码");
        return false;
    }
    var d={bookingMobile:rPhone};
    $.when(webUtil.commonThird("queryBookingNum","yy",d)).done(function(res){
        if(res.data[0].bookingNum==0){
            webUtil.showTip("此手机号未预约过服务");
            return false;
        }else{
            webUtil.getFwCode('reser');
        }
    })
}
/*
 * 是否通过手机查询
 */
webUtil.isSearchByPhone=function(mCheck){
    var hidePhone=function(){
        $("input[name=reserCheckType]").val("0");
        $(".search-phone-box").hide();
        $(".search-botton").hide();
    }

    if(mCheck==0) {
        hidePhone()
    }else{
        $(".search-botton span").on('click',function(e){
            $(e.currentTarget).siblings().removeClass('on');
            $(e.currentTarget).addClass('on');
            $("input[name=reserCheckType]").val($(e.currentTarget).data("id"));
            if($("input[name=reserCheckType]").val()==0){
                $(".search-code-box").show();
                $(".search-phone-box").hide();
            }else{
                $(".search-code-box").hide();
                $(".search-phone-box").show();
            }
        })
    }
    $.when(webUtil.commonThird("queryMsgCheck","yy")).done(function(res){
        // 开启短信验证码
        if(res.data.msgCheck ==0) {
            hidePhone()
        }
    })
}
/*
 *  禁止输入 预约或或手机号中的任一个
 */
function changeMode(dom,type){
    if(type == 1){
        var $resDom = $(".search-phone-box");
    }else if(type == 2){
        var $resDom = $(".search-code-box");
    }
    dom.on('input propertychange',function(){
        if($(this).val().length > 0){
            $resDom.addClass("phone-box-disabled");
            $resDom.find("input").attr({"disabled":true});
            if(type == 1) {
                $resDom.find(".sendCode-text").addClass("fw-disable");
            }
        }
        if($(this).val().length < 1){
            $resDom.removeClass("phone-box-disabled");
            $resDom.find("input").attr({"disabled":false});
            if(type == 1){
                $resDom.find(".sendCode-text").removeClass("fw-disable");
            }
        }
    })
}
webUtil.searchReservation = function(mdId){
    if($('body').hasClass('edit')){
        webUtil.showTip("当前为编辑状态，不可操作");
    }else{
        var rPhone = $("input[name=reserPhone]").val().trim(),
            rCode = $("input[name=reserCode]").val().trim(),
            verfiyCode = $("input[name=verfiyCode]").val().trim(),
            reserCheckType = $("input[name=reserCheckType]").val();/*$(".search-botton span.on").data("id")*/;
        //手机验证格式
        var phoneReg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/;
        if(reserCheckType==0) {
            if (rCode == "") {
                webUtil.showTip("请先输入预约码");
                return false;
            }

        } else {
            if (rPhone == "" || phoneReg.test(rPhone) == false) {
                webUtil.showTip("请先输入手机号码");
                return false;
            }
            //验证验证码
            if (verfiyCode == "") {
                webUtil.showTip("请确保验证码输入正确", "2");
                return;
            }
        }

        //var phoneDis = $("input[name=reserPhone]").prop("disabled");

        var data = {};
        if(reserCheckType==0){
            data["bookingCode"]= rCode;
        }else{
            data["bookingMobile"]= rPhone;
            data["phoneNum"]= rPhone;
            data["phoneCode"]= verfiyCode;
        }
        console.log(reserCheckType);
        var bookingRecord=function(){
            /*
             * 时间小于10时 在其前面补0
             */
            function zeroFill(nowtime){
                if(nowtime < 10){
                    return '0' + nowtime;
                }
                return nowtime;
            }

            /*
             * 转换为标准时间 time-->时间  type-->根据类型转换
             */
            function changeTimeFormat(time,type){
                var year = time.getFullYear(),
                    month = time.getMonth() + 1,
                    day = time.getDate(),
                    hours = time.getHours(),
                    minutes = time.getMinutes();
                var newM = zeroFill(month),
                    newD = zeroFill(day),
                    newH = zeroFill(hours),
                    newMin = zeroFill(minutes);
                if(type == 1){
                    return year + '-' + newM + '-' + newD + ' '+ newH + ':' + newMin;
                }else if(type == 2){
                    return newH + ':' + newMin;
                }
            }

            /*
             * 查询预约信息
             */
            var params=data;
            $.when(webUtil.commonThird("queryBookingRecord","yy",params)).done(function(res){
                //查询成功 并返回信息填充数据
                console.log(res);
                $(".reser-title").html(res.data[0].bookingMobile);
                var listStr = "",len=res.data.length,lng='',lat='';
                listStr+='<div id="windowPop" class="only_'+mdId+'"><div class="windowPop_body"><div class="windowPop_close"><span>查询结果</span><i class="icon iconfont kenfor-icons-off1"></i></div><div class="windowPop_content win_scroll">';
                $.each(res.data,function(i,item){
                    var endTime = changeTimeFormat(new Date(item.bookingEndTime.replace(/-/g,'/')),2);
                    var startTime = changeTimeFormat(new Date(item.bookingStartTime.replace(/-/g,'/')),1);
                    if(i==0){
                        lng=item.eventLongitude;
                        lat=item.eventLatitude;
                        rlabelTxt=item.eventLocation;
                    }
                    var timeSta = "",staClass="",reserClass="";
                    if(item.dataExpired == 1){
                        timeSta = "已过期";
                        staClass = "reser-expired-state";
                    }else{
                        /*					timeSta = item.bookingStatus==0?'有效（等待确认）':'有效（预约成功）';*/
                        if(item.bookingStatus==0){
                            timeSta='有效（等待确认）';
                        }else if(item.bookingStatus==2){
                            timeSta='已拒绝';
                        }else{
                            timeSta='有效（预约成功）';
                        }
                        reserClass = "reser-code-remind";
                    }
                    listStr += '<div class="res-item search-borderBtm '+ staClass +'">' +
                        '<ul class="clearfix">' +
                        '<li>'+ item.projectName +'</li>' +
                        '<li>' +
                        '<span class="item-label">服务人员：</span>' +
                        '<span class="item-value">'+ item.resourcesName +'</span>' +
                        '</li>' +
                        '<li>' +
                        '<span class="item-label">预约人：</span>' +
                        '<span class="item-value">'+ item.bookingName +'</span>' +
                        '</li>' +
                        '<li>' +
                        '<span class="item-label">预约服务时间：</span>' +
                        '<span class="item-value">'+ startTime +'-' + endTime +'</span>' +
                        '</li>' +
                        '<li class="'+ reserClass +'">' +
                        '<span class="item-label win_color">预约码：</span>' +
                        '<span class="item-value win_color">'+ item.bookingCode +'</span>' +
                        '</li>' +
                        '<li>' +
                        '<span class="item-label">时间状态：</span>' +
                        '<span class="item-value">'+ timeSta +'</span>' +
                        '</li>' +
                        '<li>' +
                        '<span class="item-label">服务地点：</span>';
                    if(item.eventLongitude && item.eventLongitude){
                        var addrTip=len>1?'查看':'',addrClass='changeMap';
                    }else{
                        var addrTip='暂无',addrClass='';
                    }
                    if(len>1){
                        listStr +='<span class="item-value '+addrClass+'" data-g="'+item.eventLongitude+'" data-t="'+item.eventLatitude+'" data-n="'+item.eventLocation+'">'+addrTip+'</span>';
                    }else{
                        listStr +='<span class="item-value '+addrClass+'" data-g="" data-t="" data-n="">'+addrTip+'</span>';
                    }
                    listStr +='</li>' +
                        '</ul>' +
                        '</div>';
                });
                listStr+='</div><div class="windowPop_bottom win_background_color"><span>返回查询</span></div></div></div>';
                /*				webUtil.hiddenPop();
                 webUtil.hiddenDesign();*/

                $("body").append(listStr);
                var renMaps=function(el,rlng,rlat,rlabelTxt){
                    $("#yyBMapwrapper").remove();
                    if(rlng && rlat){
                        el?el.parents(".res-item").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div><div id="mapIcon" class="icon iconfont kenfor-icons-upward1"></div></div>'):$("#windowPop .windowPop_content>.res-item").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div></div>');
                        /*			$("#yyMapWrap").css({"height":"260px","z-index":"999"});*/
                        webUtil.renderBMap("yyMapWrap",rlng,rlat,rlabelTxt);
                        $("#mapIcon").on('click',function(){
                            $("#yyBMapwrapper").remove();
                        })
                    }
                }
                if(len>1){
                    $(".changeMap").on('click',function(e){
                        renMaps($(e.currentTarget),$(e.currentTarget).data("g"),$(e.currentTarget).data("t"),$(e.currentTarget).data("n"))
                    })
                }else{
                    renMaps('',lng,lat,rlabelTxt);
                }
                $(".windowPop_close i,.windowPop_bottom").on('click',function(e){
                    $("#windowPop.only_"+mdId).remove();
                })
            })
        }
        if(reserCheckType==0){
            bookingRecord()

        }else{
            var d={bookingMobile:rPhone};
            $.when(webUtil.commonThird("queryBookingNum","yy",d)).done(function(res){
                if(res.data[0].bookingNum==0){
                    webUtil.showTip("此手机号未预约过服务");
                    return false;
                }else{
                    bookingRecord()
                }
            })
        }
    }
}
/*返回预约查询*/
webUtil.backToSearch = function(){
    /*    $(".mob-reservation").show();
     $(".mob-reserRes").hide();*/
    webUtil.hiddenPop()
}
/*编辑状态下提示*/
webUtil.editReserTip = function(){
    $(".search-item input").click(function(){
        if($('body').hasClass('edit')){
            $(this).attr("disabled",true);
            webUtil.showTip("当前为编辑状态，不可操作");
        }
    });
    if(!$('body').hasClass('edit')){
        $(".search-item input").attr("disabled",false);
    }
}
webUtil.renderBMap = function(el,lng,lat,labelTxt){
    require(["jquery","async!BMap"],function($) {
        var map = new BMap.Map(el);    // 创建地图实例
        var point = new BMap.Point(lng,lat);  // 创建点坐标
        var marker = new BMap.Marker(point);        // 创建标注
        if(labelTxt){ // 创建备注
            var label = new BMap.Label(labelTxt, {
                offset: new BMap.Size(15, -25)
            });
            label.setStyle({
                width: "auto",
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: "5px",
                textAlign: "center",
                height: "26px",
                lineHeight: "26px",
                padding:"0 8px"
            });
            marker.setLabel(label);
        }
        map.addOverlay(marker);   // 将标注添加到地图中
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
        });
        map.addControl(ctrl_nav);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrl_sca);
        map.centerAndZoom(point,15);   // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom();
    })
};
/*中转页生成二维码。*/
/*mdId：所在组件的mdId。selType：指定某种类型（譬如01、02等）才生成小二维码，不想生成二维码可传入0或00。
 iosurl：ios地址。fidOrAndroidurl：fid（纯数字）或android地址。*/
webUtil.makeQRUrl=function(mdId, selType, iosurl, fidOrAndroidurl)
{
    var domainName=window.WebModel=="edit"?dataUtil.getDomain():window.location.hostname;
    var path=domainName+"/query.html",
        fileServerName="192.168.4.43";

    // //修正参数。
    // if(iosurl.search(".apk")>-1 || iosurl&&!/\D/g.test(iosurl))
    // {
    // 	if(fidOrAndroidurl&&fidOrAndroidurl!="undefined")
    // 	{
    // 		marketurl=fidOrAndroidurl;
    // 		fidOrAndroidurl=iosurl;
    // 	}
    // 	else
    // 	{
    // 		if(iosurl.search(fileServerName)>-1 || iosurl&&!/\D/g.test(iosurl))
    // 		{
    // 			marketurl="";
    // 			fidOrAndroidurl=iosurl;
    // 		}
    // 		else
    // 		{
    // 			marketurl=iosurl;
    // 			fidOrAndroidurl="";
    // 		}
    // 	}

    // 	iosurl="";
    // }
    // else
    // {
    // 	if(fidOrAndroidurl&&!marketurl)
    // 	{
    // 		if(fidOrAndroidurl.search(fileServerName)>-1 || (!/\D/g.test(fidOrAndroidurl)))
    // 		{
    // 			console.log(fidOrAndroidurl.search(fileServerName)==-1);

    // 			marketurl="";
    // 		}
    // 		else
    // 		{
    // 			marketurl=fidOrAndroidurl;
    // 			fidOrAndroidurl="";
    // 		}
    // 	}
    // }

    //如果ios地址输入的是itunes中的地址，则截取。
    var cutIosUrlIndex=iosurl.indexOf("itunes.apple.com/");
    var cutIosUrl=cutIosUrlIndex>-1?iosurl.slice(cutIosUrlIndex+17):iosurl;
    //isFid用于判断fidOrAndroidurl是否为fid。
    var isFid=(!!fidOrAndroidurl)&&(!(/\D/g.test(fidOrAndroidurl)));
    //拼接地址。
    var appDLUrl= isFid ? "http://" + path + "?ios=" + cutIosUrl + "&fId=" + fidOrAndroidurl +"&type=app":
    "http://" + path + "?ios=" + cutIosUrl + "&android=" + fidOrAndroidurl +"&type=app";
    console.log("appDLUrl:"+appDLUrl);
    require(["jquery.qrcode.min"],function()
    {
        $("#"+mdId+" .bigQRCode").html("").qrcode(
            {
                render: "canvas",
                width: 120,
                height: 120,
                text: appDLUrl
            });
        if(selType=="02")
        {
            $("#"+mdId+" .smallQRCode").html("").qrcode(
                {
                    render: "canvas",
                    width: 30,
                    height: 30,
                    text: appDLUrl
                });
        }
    });
};
/* end of 预约组件 */

/*下拉列表(spinner)*/
webUtil.spinnerEdit = function(mdId){
    if(WebModel == "edit"){
        $('#spinner_' + mdId + ' a').on('click', function(e){
            webUtil.showTip('编辑状态，无法操作');
            return false;
        })
    }
    //第三种点击隐藏显示列表
    $(".spinner_header").on("click", function(){
        $(".spinner_wrap").toggleClass("open");
        $(".spinner_wrap>ul").slideToggle();
    })
}
/*下拉列表(spinner)--end*/

// webUtil.simpleText=function(mdId) {
// 	if(WebModel=="edit"){
// 		require(["jquery","wangEditor.min"],function($,Ed) {

// 		})
// 	}
// }




//文章评论

webUtil.articleComment=function(json){
    var props = $.extend({
        articleId: '0',
        readPermission: 0,
        customerImg: '',
        customerName: '',
        isComment: '0',
        picUrl:jsPath+"/member/images/memberImg.png",
        loginUrl:'login.html',
        mdId:'',
        isDelegate:1
    },json);
    var mdId=props.mdId==""?"":"#"+props.mdId+" ";
    saveArticleComment=function(){
        var text=$("#commentText").val().trim();
        if(text && text.length>7){
            var param={articleId:props.articleId,commentContent:text,commentStars:''};
            $.ajax({
                url: '/w/article/newSaveArticleCommentR.do',
                type: 'POST',
                data:param,
                success: function (res) {
                    $("#commentText").val('');
                    webUtil.showTip('留言提交成功！');
                    getArticleCommentList();
                }
            });
        }else{
            var tips=text.length>0?'请用8-200字表明你的观点':'请输入留言内容！';
            webUtil.showTip(tips);
        }
    };
    getArticleCommentList=function (pageIndex){
        var pageIndex=pageIndex|| 1,pageMax=10;
        $.ajax({
            url: '/w/article/listArticleCommentRecordAndReply.do',
            type: 'POST',
            data:{
                "pageMax":pageMax,
                "pageIndex":pageIndex,
                "articleId":props.articleId,
                "needReplace":1 //是否转码
            },
            success: function (res) {
                if(res.result=="SUCCESS"){
                    var data=res.data.rows,$el=$(".article_comment_list"),html='';
                    $.each(data,function(i,item){
                        var cImg=item.customerHeadImg==""?props.picUrl:item.customerHeadImg;
                        html+='<div class="article_comment_li">';
                        html+='<div class="article_comment_user"><span><img src="'+cImg+'" /></span>'+item.customerAccount+'<date>'+item.commentDatetime+'</date></div>';
                        html+='<div>'+item.commentContent+'</div>';
                        if(item.replyList){
                            $.each(item.replyList,function(i,reply){
                                html+='<div class="article_comment_reply"><p class="article_comment_replyAdmin">'+langUtil.wMsg_adminReply+langUtil.Global_symbol+'</p>'+reply.replyContent+'</div>';
                            })
                        }
                        html+='</div>';
                    });
                    $el.html(html);
                    if(res.totalRecord>pageMax){
                        dataUtil.page($(".article_comment_page .pagination"),res.data.pageIndex,res.data.totalRecord,res.data.pageMax,res.data.pageNum);
                        $(".article_comment_page").undelegate("a","click");
                        $(".article_comment_page").delegate("a","click",function(e){
                            e.stopPropagation();
                            e.preventDefault();
                            loadPageInfo('',$(this),$(this).data("page"),".article_comment_page .pagination");
                            function loadPageInfo(id,event,page,classMame){
                                if(page){
                                    $(classMame+id).data("page",page);
                                }else{
                                    var type = event.data("type");
                                    var currPage = $(classMame+id).data("page");
                                    if(type==0){
                                        $(classMame+id).data("page",parseInt(currPage)-1);
                                    }else{
                                        $(classMame+id).data("page",parseInt(currPage)+1);
                                    }
                                }
                                getArticleCommentList($(classMame+id).data("page"));
                            }
                        });
                        $(".article_comment_page").show();
                    }else{
                        $(".article_comment_page").hide();
                    }

                }

            },
        });
    };
    initDOM=function(){
        var $el=$(".article_comment_login"),customerPic=props.customerImg==""?props.picUrl:props.customerImg;
        var formatDate = function (date) {
            var date=new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        };
        $el.find(".article_comment_user span").html('<img src="'+customerPic+'" />');
        $el.find(".article_comment_user date").html(formatDate);
        if(props.readPermission==0){//未登录
            $el.find(".article_comment_user b").html(langUtil.Global_visitor);
            $el.find(".article_comment_content").html('<p><a href="'+props.loginUrl+'">'+langUtil.shopUtil_log+'</a> '+langUtil.Global_comment+'</p>');
        }else{
            $el.find(".article_comment_user b").html(props.customerName);
            $el.find(".article_comment_content").html('<textarea id="commentText" placeholder="'+langUtil.article_placeholder+'"  maxlength="200"></textarea>');
            if(props.isDelegate==1){ webUtil.setArticleCollection.getStates(props.articleId);}
        };
        $(mdId+".article_comment_submit").unbind().on("click",function(event){
            props.readPermission==0 || props.isComment=="0"?webUtil.showTip('请先登录会员！'):saveArticleComment();
        });
    };
    if(props.isComment=="1"){
        initDOM();
        getArticleCommentList();
    }else{
        if(props.isDelegate==1){ webUtil.setArticleCollection.getStates(props.articleId);}
    };
    $(mdId+"#news_collection").unbind().on("click",function(event){
        props.readPermission==0?webUtil.showTip('请先登录会员！'):webUtil.setArticleCollection.setCollection(props.articleId);
    })
};

webUtil.setArticleCollection=(function(articleId){
    getStates=function(articleId){
        $.ajax({
            url: '/w/article/newListArticleCollectionR.do',
            type: 'POST',
            data:{
                "pageIndex":1,
                "pageMax":1,
                articleId:articleId
            },
            success: function (res) {
                var $node=$("#news_collection");
                if(res.result=="SUCCESS" && res.data.rows.length>0){
                    $node.removeClass("on").addClass("on");
                    $node.attr("data-id",res.data.rows[0].articleCollectionRecordId);
                }else{
                    $node.removeClass("on");
                    $node.attr("data-id","");
                }
            }
        });
    };
    setCollection=function(articleId){
        var $node=$("#news_collection"),$nodeChild=$node.parent("li").find("span#blogCollect"),isCollection=$node.hasClass("on")?1:0;
        var postUrl,dataJson={};
        if(isCollection==1){
            postUrl="/w/article/deleteArticleCollectionRecord.do";
            dataJson={"articleId":articleId,"articleCollectionRecordId":$("#news_collection").attr("data-id")};
        }else{
            postUrl="/w/article/newSaveArticleCollectionR.do";
            dataJson={"articleId":articleId};
        }
        $.ajax({
            url: postUrl,
            type: 'POST',
            data:dataJson,
            success: function (res) {
                if(res.result=="SUCCESS"){
                    isCollection==1?$nodeChild.html(Number($nodeChild.html())-1):$nodeChild.html(Number($nodeChild.html())+1);
                    var tips= isCollection==1?"取消收藏！":"加入收藏！";
                    getStates(articleId);
                    webUtil.showTip(tips);
                }
            }
        });
    };
    return {
        getStates:getStates,
        setCollection:setCollection
    }
}());
//博客组件
webUtil.loadBlog=function(json){
    var props = $.extend({
        mdId: "",
        fatherId: 0,
        blogId: '0',
        admin:"",
        readPermission: 0,
        customerImg: '',
        customerName: '',
        isComment: '1',
        picUrl:jsPath+"/member/images/memberImg.png",
        loginUrl:'login.html'
    },json);
    var bolgID,$detail=$("#"+props.mdId+" .blog_detail"),
    isPreview=$("body").hasClass("edit")?0:1;
    getBlogType=function(mdId,fatherId){
        $.ajax({
            url : "/w/article/listArticleType.do",
            type : "POST",
            data : {
                pageMax : 100,
                pageIndex : 1,
                typeStatus : 1
            },
            success : function(res){
                if(res.result=='SUCCESS'){
                    var data=res.data.rows,html='',second=third=four=0;
                    $.each(data,function(i,item){
                        if(item.fatherId==fatherId){
                            html+='<li><a href="#" data-id="'+item.articleTypeId+'"><b class="type_icon"></b><span>'+item.typeName+'</span></a>';
                            second=0;
                            $.each(data,function(j,child){
                                if(item.articleTypeId==child.fatherId){
                                    ++second;
                                    html+=second==1?'<ul class="secondLevel">':'';
                                    html+='<li><a href="#"  data-id="'+child.articleTypeId+'"><b class="type_icon"></b><span>'+child.typeName+'</span></a>';
                                    third=0;
                                    $.each(data,function(k,gchild){
                                        if(child.articleTypeId==gchild.fatherId){
                                            ++third;
                                            html+=third==1?'<ul class="thirdLevel">':'';
                                            html+='<li><a href="#" data-id="'+gchild.articleTypeId+'"><b class="type_icon"></b><span>'+gchild.typeName+'</span></a>';
                                            four=0;
                                            $.each(data,function(n,ggchild){
                                                if(gchild.articleTypeId==ggchild.fatherId){
                                                    ++four;
                                                    html+=four==1?'<ul class="fourLevel">':'';
                                                    html+='<li><a href="#" data-id="'+ggchild.articleTypeId+'"><b class="type_icon"></b><span>'+ggchild.typeName+'</span></a></li>';
                                                }
                                            });
                                            html+=four!=0?'</ul>':'';
                                            html+='</li>';
                                        }
                                    });
                                    html+=third!=0?'</ul>':'';
                                    html+='</li>';
                                }
                            });
                            html+=second!=0?'</ul>':'';
                            html+='</li>';
                        }
                    });
                    $("#"+mdId+" #blogTypeList").html(html);
                    if(fatherId!='0'){
                        var jstr = {
                            pageMax : '100',
                            articleTypeId : fatherId,
                            pageIndex : '1',
                            admin:props.admin
                        };
                        $.when(getBlogList(jstr)).done(function(res){
                            var data=res.rows,ghtml='';
                            $.each(data,function(i,item){
                                ghtml+='<li class="blog_info"><a data-id="'+item.articleId+'"><b class="type_icon"></b><span>'+item.articleTitle+'</span></a></li>'
                            });
                            $("#"+mdId+" #blogTypeList").append(ghtml);
                        })
                    }
                }
            }
        });
    };
    getBlogInfo=function(json){
        var props = $.extend({
            articleId: "",
            dom: "",
            admin:""
        },json);
        var $dom=props.dom;
        if(props.articleId=='' || props.articleId=='0'){
            $dom.find("#blogTitle").html(langUtil.Global_nothing);
            $dom.find(".blog_list,.blog_content,.blog_comment").hide();
        }else{
            $.ajax({
                url : "/w/article/infoArticle.do?id="+props.articleId,
                data:{'admin':props.admin},
                type : "GET",
                success: function (res) {
                    var data=res.data;
                    if(data.noAuthority!= undefined && data.noAuthority==true){
                        $dom.find("#blogTitle").html(langUtil.Global_noPermission);
                        $dom.find(".blog_list,.blog_content,.blog_comment").hide();
                    }else{
                        if(res.result=="SUCCESS"){
                            $dom.find("#blogTitle").html(data.articleTitle);
                            $dom.find("#blogType").html(data.typeName);
                            $dom.find("#blogCollect").html(data.collectionTimes);
                            $dom.find("#blogTime").html(data.publishDatetime);
                            $dom.find("#blogSummary").html(data.articleDescription);
                            $dom.find("#blogContent").html(data.textList[0].textContent);
                            $dom.find(".blog_list,.blog_content").show();
                            if(data.isComment==0){
                                $dom.find(".blog_comment").hide();
                            }else{
                                $dom.find(".blog_comment").show();
                            }
                        }else{
                            webUtil.showTip(res.errorMsg.msg,1.5);
                        }
                    }
                }
            });
            $.ajax({
                url : "/w/article/infoArticleClick.do?id="+props.articleId,
                type : "GET",
                success: function (res) {
                    if(res.result=="SUCCESS"){
                        $dom.find("#blogClick").html(res.data.clickTimes);
                    }else{
                        webUtil.showTip(res.errorMsg.msg,1.5);
                    }
                }
            });
        }

    };
    getBlogList=function(json){
        var defer = $.Deferred();
        var props = $.extend({
            pageMax : '1',
            articleTypeId : '',
            pageIndex : '1',
            admin:''
        },json);
        $.ajax({
            url : "/w/article/listArticle.do",
            type : "POST",
            data : props,
            success: function (data) {
                if(data.result=="SUCCESS"){
                    defer.resolve(data.data);
                }else{
                    webUtil.showTip(data.errorMsg.msg,1.5);
                }
            }
        });
        return defer.promise();
    };
    getBlogType(props.mdId,props.fatherId);
    if(props.blogId!="0"){
        bolgID=props.blogId;
        getBlogInfo({articleId:bolgID,dom:$detail,admin:props.admin})
    }else{
        var articleTypeId=props.fatherId!=0?props.fatherId:"";
        $.when(getBlogList({articleTypeId:articleTypeId,pageMax : '1',pageIndex : '1',admin:props.admin})).done(function(res){
            bolgID=res.rows.length>0?res.rows[0].articleId:'0';
            getBlogInfo({articleId:bolgID,dom:$detail,admin:props.admin})
        })
    };
    if(isPreview==1){
        var commentJson={
            articleId:bolgID,
            readPermission: props.readPermission,
            customerImg: props.customerImg,
            customerName: props.customerName,
            isComment: props.isComment,
            picUrl:props.picUrl,
            loginUrl:props.loginUrl
        };
        webUtil.articleComment(commentJson);
    };
    $("#"+props.mdId+" #blogTypeList").delegate('a','click',function(e){
        e.preventDefault();
        var $dom=$(e.currentTarget),dataID=$dom.data("id"),$domLI=$dom.parent("li"),oldID=$detail.data("id") ||'';
        $detail.data("id",dataID);
        if(!$domLI.hasClass("blog_info")){
            if($domLI.hasClass("selected")){
                //$domLI.children("ul").slideUp(0);
                $domLI.removeClass('selected');
                $domLI.children("ul").find(".blog_info").remove();
            }else{
                var jstr = {
                    pageMax : '100',
                    articleTypeId : dataID,
                    pageIndex : '1',
                    admin:props.admin
                };
                $.when(getBlogList(jstr)).done(function(res){
                    var data=res.rows,html='';
                    $.each(data,function(i,item){
                        html+='<li class="blog_info"><a data-id="'+item.articleId+'"><b class="type_icon"></b><span>'+item.articleTitle+'</span></a></li>'
                    });
                    if(!(data.length==0 && $domLI.children("ul").length==0)){
                        $domLI.addClass('selected');
                        if($domLI.children("ul").length>0){
                            $domLI.children("ul").append(html);
                        }else{
                            $domLI.append("<ul>"+html+"</ul>");
                        }
                    }else{
                        webUtil.showTip('暂时无内容',1.5);
                    }
                })
            }
        }
        else if($detail.data("id")!=oldID){
            $("#"+props.mdId+" #blogTypeList .blog_info").removeClass("on");
            $domLI.addClass("on");
            getBlogInfo({articleId:dataID,dom:$detail,admin:props.admin});
            if(isPreview==1){
                commentJson.articleId=dataID;
                commentJson.isDelegate=0;
                webUtil.articleComment(commentJson);
                webUtil.setArticleCollection.getStates(dataID);
            }

        }
    })
};
