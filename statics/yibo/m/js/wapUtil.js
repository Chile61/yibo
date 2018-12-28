if (typeof wapUtil == "undefined") {
    var wapUtil = {};
}
if (typeof webUtil == "undefined") {
    var webUtil = {};
}
$(document).ready(function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") { //小程序环境下特殊处理
        $(".fitem_qq").hide();
    }
});
webUtil.showTip = function(tip, time, type) {
    wapUtil.showTip(tip, time, type);
}
//返回上一页
wapUtil.backHistory = function() {
    // var path=document.referrer;
    // if(!path){
    // 	path="index.html";
    // }
    // window.location=path;
    history.back();
};
if (typeof sysUtil == "undefined") { //修复前台不需要调用的方法，直接为空
    wapUtil.setLogo = function(mdId) {

    };
    wapUtil.setFooter = function(mdId) {

    };
}
//菜单显示功能
wapUtil.setShowMenu = function() {
    if ($('body').hasClass('openNav')) {
        wapUtil.setHideMenu();
    } else {
        $('body').removeClass('openlocNav');
        $('body').addClass('openNav');
        $("#menu_ver_1").append('<div id="maskCoverBlock" class="pub_bg"></div>');
        $("#mob_nav_mask").bind("touchstart",
            function(event) {
                wapUtil.setHideMenu();
            });
        $("#mob_nav_mask").bind("click",
            function(event) {
                wapUtil.setHideMenu();
            });
    }
    /*    var themetype = $("#webset_com_9").attr("data-themetype");
     var charskin = $("#webset_com_9").attr("data-charskin");
     var logoImg = $("#webLogoImg").attr("data-logo");
     var logoTxt =$("#webTitle").text();
     if(themetype == "character"&&(!isListLangSuccess)){
     if(themetype == "character"){
     wapUtil.setCharLangList(charskin,logoTxt,logoImg);
     }*/
},
//菜单隐藏功能
    wapUtil.setHideMenu = function() {
        $("#maskCoverBlock").remove();
        $('body').removeClass('openNav');
    },
//设置横向菜单的Swiper效果
    wapUtil.menuSwiper = function(sortNum) {
        require(["weuijs", "css!csspath/css/swiper.min.css"],function() {
            var menuSwiper = new Swiper('#navbarList', {
                slidesPerView: 4,
                initialSlide: sortNum,
                //slidesPerView: 'auto',
                paginationClickable: true,
                spaceBetween: 5
            })
        });
    };
//控制音乐暂停播放
wapUtil.setMusic = function() {
    if(WebModel=="view"){
        var audio = document.getElementById('bgmAudio');
    }
    var $music = $(".bgm_icon_inner");
    if ($music.hasClass('bgm_on')) {
        $music.removeClass('bgm_on');
        if(WebModel=="view"){
            audio.pause();
        }
    } else {
        $music.addClass('bgm_on');
        if(WebModel=="view"){
            audio.play();
        }
    }
};
//生成音乐控件
wapUtil.setMusicPlay = function(src,autoplay,loop) {
    if(WebModel=="view"){//仅支持前台播放
        var musciHtml='<audio id="bgmAudio" autoplay="'+autoplay+'" loop="'+loop+'" src="'+src+'"></audio>';
        $("body").append(musciHtml);
    }
};
//处理手机无法自动播放音乐的BUG
wapUtil.openMusic = function() {
    var audio = document.getElementById('bgmAudio');
    $('html').one('touchstart',
        function() {
            audio.play();
        });
    require(["//res.wx.qq.com/open/js/jweixin-1.0.0.js"],function(wx) {
        wx.config({
            debug: false,
            appId: "",
            timestamp: "",
            nonceStr: "",
            signature: "",
            jsApiList: []
        });
        wx.ready(function() {
            audio.play();
        })
    });
};
wapUtil.swiperArticleList = function(mdId) {
    require(["weuijs"],function() {
        var container = "#swiper-container_" + mdId;
        var swiper_articleList = new Swiper(container, {
            slidesPerView: 'auto',
            paginationClickable: false,
            spaceBetween: 0
        });
    });
}
wapUtil.backToTop = function() {
    if ($("body").hasClass('edit')) {
        var $dom = $("#design_main");
    } else {
        var $dom = $("html,body");
    }
    $dom.animate({
            scrollTop: 0
        },
        200)
}
/*手机轮播组件的展示方式一*/
wapUtil.swiperCorousel = function(mdId, autoTime, speed) {
    require(["weuijs"],function() {
        var container = ".swiper-container_" + mdId;
        var swiper_img = new Swiper(container, {
            pagination: '.swiper-p1',
            paginationClickable: true,
            autoplay: autoTime,
            speed: speed,
            loop: true,
            autoplayDisableOnInteraction: false,
            spaceBetween: 30
        });
    })
}
/*手机轮播组件的展示方式二*/
wapUtil.swiperCorouselTwo = function(mdId, autoTime, speed) {
    require(["weuijs"],function() {
        var container = ".swiper-container_" + mdId;
        $(container).find('.swiper-button-prev').css('display', 'block');
        $(container).find('.swiper-button-next').css('display', 'block');
        $(container).find('.swiper-p1').css('display', 'none');
        var swiper_img2 = new Swiper(container, {
            autoplay: autoTime,
            speed: speed,
            loop: true,
            autoplayDisableOnInteraction: false,
            nextButton: '.swiper-button-next1',
            prevButton: '.swiper-button-prev1',
            spaceBetween: 30
        });
    })
}
/*手机端的photoswipe*/
wapUtil.photoSwipes = function(mdId) {
    var container = "#swiper_" + mdId;
    require(["photoswipejs"],function() {
        $(container + " a").photoSwipe();
    })
}
/*文章详情页滚动事件的*/
wapUtil.TopScroll = function(template) {
    $("#design_edu_main").removeClass('webAnimation');
    $('#webProductType').css({
        'display': 'none'
    });
    $('#member_lan').css({
        'display': 'none'
    });
    var $dom = $(window);
    if ($("body").hasClass("edit")) {
        $dom = $("#design_main");
    }
    $dom.scroll(function() {
        var tempName = 0;
        if (template == 'articleDetail') {
            var topBg = $("#news_img");
            if ($("#tempName").attr("class") == 'default0') {
                tempName = 1;
            }
        } else {
            var topBg = $(".display_bigImg");
            if ($("#tempName").attr("class") == '1') {
                tempName = 1;
            }
        }
        var top = $dom.scrollTop() - 1;
        if ($("body").hasClass("edit")) {
            $(".iconImg").css("top",top);
        }        
        if (tempName == 1) {
            if (top >= 10) {
                $('.iconImg').css({
                    "background": "rgba(255, 255, 255, " + 0.005 * top + ")"
                });
            } else {
                $('.iconImg').css({
                    "background": "rgba(255, 255, 255, 0)"
                });
            }
        }

        if (top >= topBg.height()) {
            $('.iconImg').css({
                'border-bottom': '1px solid #ddd'
            });
        } else {
            $('.iconImg').css({
                'border-bottom': 'none'
            });
        }
    });
}

/*文章详情页分享页面的构成*/
wapUtil.shareTool = function(obj) {
    $(".iconImg").find('.open-popup').css("display", "block");
    $(".iconImg .index-menu").css('display', 'none');
    var shareHtml = "";
    shareHtml += '<div id="half" class="weui-popup__container popup-bottom mainSidebarBox">';
    shareHtml += '<div class="weui-popup__overlay"></div>';
    shareHtml += '<div class="weui-popup__modal">';
    shareHtml += ' <div class="modal-content">';
    shareHtml += '<div class="weui-grids">';
    $.each(obj,
        function(i, item) {
            if (item.value == true) {
                if (item.name == "weixin") {
                    shareEvent = item.event + "()";
                } else if (item.name == "copy") {
                    shareEvent = "copyWapUrl()";
                } else {
                    shareEvent = item.event + "(event)";
                }
                shareHtml += '<a class="weui-grid js_grid  close-popup" hidefocus="true" title="' + item.sharetitle + '" href="javascript:;" onclick="' + shareEvent + '" >';
                shareHtml += '<div class="shareIcon" id="' + item.shareid + '"></div>';
                shareHtml += '<p style="text-align: center;">' + item.label + '</p>';
                shareHtml += '</a>';
            }
        });
    shareHtml += '</div>';
    shareHtml += '</div>';
    shareHtml += '</div>';
    shareHtml += '</div>';
    $('#web_design_main').append(shareHtml);
}
/*图片延迟加载*/
wapUtil.lazyloadList = function(img, rebox) {
    require(["jquerylazyload"],function() {
        $(img).lazyload({
            re_box: rebox,
            data_attribute: "src",
            effect: "fadeIn",
            effectspeed: 200,
            threshold: 0
        });
    })
};
/*产品列表展示效果*/
wapUtil.productShow = function(modelstyle, productStyle, picWidth, picHeight, mdId) {
    require(["swiper.jquery.min"],function() {
        if ((modelstyle == "1" || modelstyle == "3" || modelstyle == "4") && productStyle != 0) {
            var a = $("#proList_" + mdId);
            if (modelstyle == 3) {
                var $nmu = a.width() - 10;
                var $dom = ".swiper-slide a span";
            } else {
                var $nmu = (a.width() - 10) / 2;
                var $dom = ".img div";
            }
            a.find($dom).css({
                height: $nmu * picWidth / picHeight + "px"
            });
            $(a).resize(function() {
                a.find($dom).css({
                    height: $nmu * picWidth / picHeight + "px"
                });
            });
        }
        $('#proList_' + mdId + '.swiper-container_pro').css({
            position: "relative"
        });
        if (modelstyle == 3) {
            var swiper_prolist_1 = new Swiper('#proList_' + mdId + ' .swiper-container_pro', {
                pagination: '.swiper-p2',
                paginationClickable: true,
                nextButton: '#products_' + mdId + ' .swiper-button-next',
                prevButton: '#products_' + mdId + ' .swiper-button-prev',
                spaceBetween: 30
            });
        } else if (modelstyle == 4) {
            var swiper_prolist_2 = new Swiper('#proList_' + mdId + ' .swiper-container_pro', {
                slidesPerView: 2,
                paginationClickable: false,
                spaceBetween: 0
            });
        } else {
            wapUtil.lazyloadList("#proList_" + mdId + " img.lazy");
        }
    });
};
/*产品放大页选项卡切换*/
wapUtil.disTabShow = function(mdId) {
    var $tab = $("#" + mdId + " ." + mdId + "_tab");
    var $con = $("#" + mdId + " ." + mdId + "_tab_con");
    $tab.click(function(event) {
        $tab.removeClass('on pub_bg pub_o_bg');
        $con.hide();
        $(this).addClass('on pub_bg pub_o_bg');
        var tab_con = $(this).data("tab");
        $("#" + tab_con).css({
            "display": "block"
        });
    });
};
/*产品放大页多图滑动效果*/
wapUtil.disProSwiper = function(mdId) {
    require(["weuijs"],function() {
        var disProSwiper = new Swiper('#swiper_' + mdId, {
            pagination: '.swiper-pagination',
            paginationClickable: true
        })
    })
}
/*魔方导航组件开始*/
wapUtil.setWidth = function(type, total, dom) {
    if (type == "4" || type == "8") {
        if (total % 2 == 1) {
            dom.css({
                width: "99%"
            });
        }
    } else if (type == "6") {
        if (total % 3 == 2) {
            dom.css({
                width: "49.3%"
            });
            dom.prev().css({
                width: "49.3%"
            });
        } else if (total % 3 == 1) {
            dom.css({
                width: "98.5%"
            });
        }
    }
}
/*魔方导航组件结束*/

/*滚动公告组件开始*/
wapUtil.scrollFunc = function(SpeedType, stayTime, direction) {
    var speed = null;
    var obj = ".marqueeBox";
    if (SpeedType == "slow") {
        speed = 1500
    } else if (SpeedType == "normal") {
        speed = 1000
    } else {
        speed = 500
    };
    if (direction == "up") {
        $(obj).find("ul").animate({
                top: "-3.375rem"
            },
            speed,
            function() {
                $(this).css({
                    top: "0"
                }).find("li:first").appendTo(this);
            })
    } else if (direction == "down") {
        $(obj).find("ul").animate({
                bottom: "-3.375rem"
            },
            speed,
            function() {
                $(this).css({
                    bottom: "0"
                }).find("li:last").prependTo(this);
            })
    }
}
/*滚动公告组件结束*/

/*产品搜索开始*/
wapUtil.createSearchPage = function(searchTip, searchTypes, searchBoxStyle, keywordsList, historyRecord, dom, mdId) {
    /*拼接弹出层*/
    var key_bg = "";
    var html = '';
    html += '<div class="searchWindow" id="searchWindow' + mdId + '">';
    html += '<div class="searchInputBar">';
    html += '<div class="kenfor-icons-back5 backIcon" id="backIcon' + mdId + '"></div>';
    if (searchTypes == "1") {
        tempClass = "sear_1";
        tempHtml = '<div class="submitBtn pub_bg pub_o_bg">' + langUtil.wPro_search + '</div>';
    } else if (searchTypes == "2") {
        tempClass = "sear_2";
        tempHtml = '<div class="sear_2_div pub_border_r pub_o_b_r"></div><div class="submitBtn pub_bg pub_o_bg">GO</div>';
    } else if (searchTypes == "4") {
        tempClass = "submitBtn pub_bg pub_o_bg";
        tempHtml = "";
    } else if (searchTypes == "5") {
        tempClass = "submitBtn pub_bg pub_o_bg";
        tempHtml = "";
        key_bg = "pub_bg pub_o_bg";
    } else {
        tempClass = "submitBtn pub_color pub_o_color";
        tempHtml = "";
    }
    html += '<div class="placeholderColor ' + searchBoxStyle + '">';
    html += '<form action="search.html" method="post" name="searchForm"  id="searchForm' + mdId + '" accept-charset="UTF-8"><input type="hidden" name="wjs"  value="">';
    html += '<div class="kenfor-icons-search4 ' + tempClass + '" ></div>';
    html += '<input type="text" class="' + key_bg + '" onChange="chageValue(this)" name="kw" placeHolder="' + searchTip + '" >' + tempHtml;
    html += '</form></div>';
    html += '</div>';
    /*判断热门搜索关键字是否生成显示*/
    if (keywordsList) {
        html += '<div class="hotTopicWrap" style="width:100%;height:auto;padding:1.25rem 0 0 1.25rem;"><div>' + langUtil.wPro_hotSearch + '</div></div>';
    }
    /*判断是否开启历史搜索功能*/
    if (historyRecord == "1") {
        html += '<div class="historyTopicWrap" style="width:100%;height:auto;padding:7px 0 0 15px;"><p style="display:block;margin:0;">' + langUtil.wPro_historySearch + '</p></div>';
    }
    html += '</div>';

    dom.append(html);

    /*生成页面的JS*/
    $("#backIcon" + mdId).click(function() {
        $("#searchWindow" + mdId).remove();
    });

    $("#searchForm" + mdId).find("input").focus();

    /*热门搜索关键字*/
    var keywords = $("#keywords" + mdId).find("span");
    var html = "";
    $.each(keywords,
        function(key, item) {
            html += "<span>";
            html += $(item).text();
            html += '</span>';
        });
    $(".hotTopicWrap").append(html);

    /*点击进行热门搜索*/
    $(".hotTopicWrap span").click(function() {
        $('input[name=wjs]').val('{sk:"' + $(this).text() + '"}');
        /*提交输入数据*/
        $("#searchForm" + mdId).submit();
    })

    function searSubmit(k) {
        if (WebModel == "edit") {
            k.preventDefault();
            wapUtil.showTip2("编辑页面不能进行此操作！");
        } else {
            var words = "";
            var searchWords = $("#searchForm" + mdId).find("input[name=kw]").val();
            if (searchWords) {
                /*把搜索内容存到cookie里面*/
                var cookieWords = $.cookie("historyWords");
                if (cookieWords) {
                    words = searchWords + "&" + cookieWords;
                } else {
                    words += searchWords;
                }
                $.cookie("historyWords", words);
                /*提交输入数据*/
                $("#searchForm" + mdId).submit();
            } else {
                k.preventDefault();
            }
        }
    }

    /*鼠标点击进行搜索*/
    $(".submitBtn").click(function(e) {
        searSubmit(e);
    });

    /*按下enter回车键进行搜索*/
    $("#searchForm" + mdId).keydown(function(e) {
        /*兼容FF和IE和Opera*/
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            /*回车键对应的码*/
            searSubmit(e);
        }
    });
    /*读出搜索cookie并渲染出来*/
    require(["jquery.cookie"],function() {
        var historyWords = $.cookie("historyWords");
        var historyWordsArr = [];
        if (historyWords == undefined) {
            $(".historyTopicWrap").hide();
        } else {
            /*切割cookie成数组*/
            historyWordsArr = historyWords.split("&");
            var wordHtml = "";
            $.each(historyWordsArr,
                function(key, item) {
                    wordHtml += "<span>";
                    wordHtml += item;
                    wordHtml += "</span>";
                });
            wordHtml += "<div>" + langUtil.wPro_clearAll + "</div>";
            $(".historyTopicWrap").append(wordHtml);

            /*点击进行历史记录搜索*/
            $(".historyTopicWrap span").click(function(e) {
                if (WebModel == "edit") {
                    e.preventDefault();
                    wapUtil.showTip2("编辑页面不能进行此操作！");
                } else {
                    $('input[name=wjs]').val('{sk:"' + $(this).text() + '"}');
                    /*提交输入数据*/
                    $("#searchForm" + mdId).submit();
                }
            })

            /*删除搜索历史记录*/
            $(".historyTopicWrap div").click(function() {
                $(".historyTopicWrap").remove();
                $(".saveHistoryWord").find("span").remove();
                /*删除cookie*/
                $.cookie("historyWords", null, {
                    expires: -1
                });
            })

        }
    });

}
/*产品搜索结束*/

/*列表多图*/
wapUtil.listPhotoSwipe = function(mdId, picOutMode, value, imgSizeMode, picWidth, picHeight, aotuPlayMode, playDir, playSpeed) {
    if ($("#picList_" + mdId).hasClass("swiper-wrapper")) {
        var playTimer = "",
            loop = false;
        if (aotuPlayMode == "0") {
            if (playSpeed == "slow") {
                playTimer = 5000;
            } else if (playSpeed == "normal") {
                playTimer = 3000;
            } else if (playSpeed == "fast") {
                playTimer = 1000;
            }
            if (playDir == "right") {
                loop = true;
            }
        }
        require(["weuijs", "weui/js/swiper.min"],function() {
            var baseSet = {
                slidesPerView: 'auto',
                paginationClickable: false,
                spaceBetween: 10,
                preventClicks: true,
                /*默认true*/
                loop: loop
            }
            if (aotuPlayMode == "0") {
                if (playDir == "left") {
                    baseSet.autoplay = playTimer;
                }
            }
            var listswipe = new Swiper('#listPhotoBox_' + mdId, baseSet);
            if (aotuPlayMode == "0") {
                if (playDir == "right") {
                    if (timer) {
                        clearInterval(timer);
                    }
                    var timer = setInterval(function() {
                            listswipe.slidePrev();
                        },
                        playTimer);
                }
            }
        });
        if (picOutMode == "1") {
            if ($("#picList_" + mdId + " li").length > 0) {
                require(["photoswipejs"],function() {
                    $("#picList_" + mdId).find("a").photoSwipe();
                });
            }
        }
        wapUtil.listPhotoScale(imgSizeMode, picWidth, picHeight);
    }
}
/*图片比例*/
wapUtil.listPhotoScale = function(imgSizeMode, picWidth, picHeight) {
    if (imgSizeMode == "1") {
        $(function() {
            var a = $("#picList_" + mdId);
            a.find(".listPhotoClass").css({
                height: (a.width() - 10) / 2 * picHeight / picWidth + "px"
            });
            $(a).resize(function() {
                a.find(".listPhotoClass").css({
                    height: (a.width() - 10) / 2 * picHeight / picWidth + "px"
                });
            });
        });
    }
}
wapUtil.listPhotoPage = function(mdId, num_entries, showCount, pageNum, imgSizeMode, picWidth, picHeight, picOutMode2,showPageMode) {
    if (picOutMode2) {
        var picOutMode = Number(picOutMode2);
    } else {
        picOutMode = 1;
    }
    if (showPageMode) {//是否显示分页
        var showPageMode = Number(showPageMode);
    } else {
        showPageMode = 0;
    }
    if(showPageMode){
        if (picOutMode == 1) {
            require(["photoswipejs"],function() {
                $("#picList_" + mdId).find("a").photoSwipe();
            });
        } 
    }else{
        require(["wap/jquery.pagination"],function() {
            var initPagination = function() {
                /*创建分页*/
                // var langId=dataUtil.currentLangId();
                // var prev_text="上一页";
                // var next_text="下一页";
                // if(langId==2){
                //     prev_text="上一頁";
                //     next_text="下一頁";
                // }else if(langId==3){
                //     prev_text="Previous";
                //     next_text="Next";
                // }
                $("#Pagination_" + mdId).pagination(num_entries, {
                    prev_text: langUtil.Global_prePage,
                    next_text: langUtil.Global_nextPage,
                    num_edge_entries: 1,
                    pageSel: "#Pagination_" + mdId,
                    callback: pageselectCallback,
                    items_per_page: showCount
                });
            } ();
            function pageselectCallback(page_index, jq) {
                /*by 防止传过来为字符串，进行转换*/
                var outModel = $(jq).data("outmodel");
                page_index = parseInt(page_index);
                var max_elem = Math.min((page_index + 1) * showCount, num_entries);
                $("#picList_" + mdId).html("");
                for (var i = page_index * showCount; i < max_elem; i++) {
                    var resultId = $("#result_" + mdId).children("span").eq(i);
                    var resultHtml = $("#photo_tpl_" + mdId);
                    var data_img = resultId.data("img");
                    var data_link = resultId.data("link");
                    var data_name = resultId.data("name");
                    var imgHref = "";
                    // if(!picOutMode && picOutMode!=""){
                    //     picOutMode=1;
                    // }
                    if (picOutMode == 0) {
                        if (data_link == "") {
                            imgHref = "javascript:void(0)"
                        } else {
                            imgHref = data_link
                        }
                    } else if (picOutMode == 1) {
                        imgHref = data_img;
                    } else if (picOutMode == 2) {
                        imgHref = "javascript:void(0)";
                    }
                    resultHtml.find("a").attr("href", imgHref);
                    resultHtml.find("img").attr("src", data_img);
                    resultHtml.find(".listPhotoDes").children("span").html(data_name);
                    $("#photo_tpl_" + mdId).children("li").clone().appendTo("#picList_" + mdId);
                    if ((i + 1) % pageNum == 0) {
                        var html = '<div style="clear: both;"></div>';
                        $(html).appendTo("#picList_" + mdId);
                    }
                    wapUtil.listPhotoScale(imgSizeMode, picWidth, picHeight);
                    if (picOutMode == 1) {
                        require(["photoswipejs"],function() {
                            $("#picList_" + mdId).find("a").photoSwipe();
                        });
                    }
    
                }
                return false;
            }
        });   
    }
}
/*在线留言*/
wapUtil.msgSubmit = function(mdId) {
    if ($("body").hasClass("edit")) {
        require(["wap/msgSubmit"],function() {
            var msg = "";
            $.ajax({
                url: '/w/msg/listMsgProCfg.do',
                type: 'GET',
                dataType: 'json',
                contentType: "application/json",
                success: function(json) {
                    if (json.result === "SUCCESS") {
                        msg = json.data;
                        createForm(msg);
                        console.log(msg);
                    } else {
                        $("#form_submit" + mdId).html("数据加载错误");
                    }
                },
            });

            /*生成表单*/
            function createForm(data) {
                var str = "";
                /*渲染在页面上的script代码，需要在DOM渲染完后，加载脚本*/
                var html = "";
                /*渲染在页面上的html代码*/
                var $container = $("#form_submit" + mdId);
                var nums = 1;
                html += '<div class="msgNotice"><div class="submit-tips">当前为编辑状态，提交无效</div></div>';
                $.map(data,
                    function(item, key) {
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
                                    html += '<div class="msgLine">' + '<input class="' + fisrq + ' msgInput saveinput" type="text" name="' + mdId + '_' + item.msgpropcfgid + '" data-ftip="' + propn + '" data-itype="' + finptp + '" placeholder="' + propn + ((item.isrq) ? langUtil.wMsg_Required: '') + '">' + '<span class="iyong-icons-contact2"></span>';
                                    break;
                                case "phone":
                                    html += '<div class="msgLine">' + '<input class="' + fisrq + ' msgInput saveinput" type="tel" name="' + mdId + '_' + item.msgpropcfgid + '" data-ftip="' + propn + '" data-itype="' + finptp + '" placeholder="' + propn + ((item.isrq) ? langUtil.wMsg_Required: '') + '">' + '<span class="iyong-icons-call2"></span>';
                                    break;
                                case "mail":
                                    html += '<div class="msgLine">' + '<input class="' + fisrq + ' msgInput saveinput" type="email" name="' + mdId + '_' + item.msgpropcfgid + '" data-ftip="' + propn + '" data-itype="' + finptp + '" placeholder="' + propn + ((item.isrq) ? langUtil.wMsg_Required: '') + '">' + '<span class="iyong-icons-mail2"></span>';
                                    break;
                            }
                            html += '</div>'
                        }
                        nums++;
                    });
                html += '<div class="msgLine"><textarea class="msgTextarea form_isrq" maxlength="10000" type="textarea" name="content" data-ftip="' + langUtil.wMsg_content + '" data-itype="textarea" placeholder="' + langUtil.wMsg_ConPla + '"></textarea><span class="iyong-icons-message2"></span></div>';
                html += '<div style="clear: both;"></div>';
                html += '<div class="msgLine"><input class="msgInput captchaText form_isrq langInput" type="text" name="' + mdId + '_code" maxlength="4" placeholder="' + langUtil.wMsg_Code + '"><img class="captchaImg SetReCode" onclick="wapUtil.SetReCode(this,\'' + mdId + '\')"></div>';
            //    html += '<div class="msgLine"><input class="msgBtn" type="button" data-id="' + mdId + '" onclick="submitForm(\'' + mdId + '\');" value="' + langUtil.Global_submit + '" /></div>';
                html += '<div class="msgLine"><input class="msgBtn" type="button" data-id="' + mdId + '" onclick="submitMsgForm(\'' + mdId + '\');" value="' + langUtil.Global_submit + '" /></div>';
                $container.html(html);
                // if(!$("body").hasClass("edit")){
                // 	$("#msgSubmit"+mdId).find(".SetReCode").trigger("click");
                // }
                wapUtil.SetReCode($("#" + mdId + " .SetReCode"), mdId);
            }
        });
    } else {
        wapUtil.SetReCode($("#" + mdId + " .SetReCode"), mdId);
        
        var prevMsgBtn=$("#"+mdId+" .msgBtn");
        if(prevMsgBtn.attr("onclick").indexOf("submitForm")>-1)
        {
            var curMsgBtnHtml=prevMsgBtn[0].outerHTML.replace("submitForm","submitMsgForm");
            prevMsgBtn.replaceWith(curMsgBtnHtml);
        }
    }
};
//文件下载分页
wapUtil.fileDownPages = function(mdId, fileStyleMode, pageNum, fileSize) {
    var ul = $("#fileItemBox_" + mdId).find(".fileList");
    //分页处理
    require(["wap/jquery.pagination"],function() {
        var initPagination = function() {
            /* 创建分页*/
            $("#Pagination_" + mdId).pagination(fileSize, {
                first_text: langUtil.Global_first,
                end_text: langUtil.Global_endPage,
                prev_text: langUtil.Global_prePage,
                next_text: langUtil.Global_nextPage,
                num_edge_entries: 1,
                /*边缘页数*/
                num_display_entries: 6,
                /*主体页数*/
                callback: pageselectCallback,
                items_per_page: pageNum
                /*每页显示1项*/
            });
        } ();

        /*上面的回调函数*/
        function pageselectCallback(page_index, jq) {
            //先清空再填充分页数据
            ul.empty();
            var max_elem = Math.min((page_index + 1) * pageNum, fileSize);
            for (var i = page_index * pageNum; i < max_elem; i++) {
                var resultId = $("#allFileResults_" + mdId).children("span").eq(i),
                //每一个span
                    resultHtml = $("#oneFileTpl_" + mdId); //装着一个li模板的盒子
                //得到一个span中保存着的数据
                var data_imgLink = "",
                    data_iconClass="",
                    data_color="";
                if (resultId.attr("data-imgLink") != "") {
                    data_imgLink = resultId.attr("data-imgLink");
                } else {
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
                if (fileStyleMode == '0') {
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

                    if (data_fileId && data_fileId != "undefined" && data_type!="torrent") {
                        resultHtml.find(".title a").attr("href", "/w/download.do?fileId=" + data_fileId);
                        resultHtml.find(".contect .btnaSet").attr("href", "/w/download.do?fileId=" + data_fileId);
                    }else {
                        resultHtml.find(".title a").attr("href", data_fileurl);
                        resultHtml.find(".contect .btnaSet").attr("href", data_fileurl);
                    }
                    resultHtml.find(".title a").attr("title", data_title);
                    resultHtml.find(".title a").text(data_title);
                    resultHtml.find(".brief .defaultSet").text(data_description);
                    resultHtml.find(".issinfo .timesSet").text(data_date);
                    resultHtml.find(".issinfo .userSet").text(data_author);
                } else {
                    resultHtml.find(".fileNameWrap").attr("title", data_title);
                    resultHtml.find(".fileNameWrap").text(data_title);
                    resultHtml.find(".fileSize").text(data_fsize);
                    if (data_fileId && data_fileId != "undefined" && data_type!="torrent") {
                        resultHtml.find(".fileOperate a").attr("href", "/w/download.do?fileId=" + data_fileId);
                    } else {
                        resultHtml.find(".fileOperate a").attr("href", data_fileurl);
                    }
                }
                resultHtml.children("li").clone(true).appendTo(ul);
            }
            return false;
        }
    })
}
wapUtil.SetReCode = function(thiz, mdId) {
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
/*地图*/
wapUtil.onlineMap = function(mdId, province, address) {
    $("#mapContainer_" + mdId).attr("src", "//map.baidu.com/mobile/webapp/search/search/qt=s&wd=" + province + address + "&c=348&searchFlag=bigBox&version=5&exptype=dep/vt=map/?fromhash=1");
}
wapUtil.onlineMap2 = function(mdId, province, address, lng, lat, imgUrl, markerInfor) {
    require(["async!BMap"],function() {
        var map = new BMap.Map("dituContent_" + mdId); //在百度地图容器中创建一个地图
        //地图事件设置函数：
        function setMapEvent() {
            if (!$("body").hasClass("edit")) {
                map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
            } else {
                map.disableDragging(); //启用地图拖拽事件，默认启用(可不写)
                map.disableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
            }
        }

        //地图控件添加函数：
        function addMapControl() {
            //向地图中添加缩放控件
            var ctrl_nav = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_LARGE
            });
            map.addControl(ctrl_nav);
            //向地图中添加缩略图控件
            var ctrl_ove = new BMap.OverviewMapControl({
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                isOpen: 1
            });
            map.addControl(ctrl_ove);
            //向地图中添加比例尺控件
            var ctrl_sca = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_BOTTOM_LEFT
            });
            map.addControl(ctrl_sca);
        }

        map.clearOverlays();
        var point = new BMap.Point(lng, lat); // 创建点坐标
        map.centerAndZoom(point, 18);
        var icon = '';
        if (imgUrl) {
            icon = new BMap.Icon(imgUrl, new BMap.Size(20, 32), {
                anchor: new BMap.Size(10, 30)
            });
        }
        var marker = new BMap.Marker(point, {
            icon: icon
        });
        map.addOverlay(marker);
        var label = new BMap.Label(markerInfor, {
            offset: new BMap.Size(15, -25)
        });
        label.setStyle({
            maxWidth: "none",
            padding: '0 7px',
            color: '#fff',
            backgroundColor: 'rgba(255,0,0,0.7)',
            border: '1px solid "rgba(255,0,0,0.7)"',
            borderRadius: "5px",
            textAlign: "center",
            height: "26px",
            lineHeight: "26px"
        });
        if (markerInfor) {
            marker.setLabel(label);
        }
        if (!$("body").hasClass("edit")) {
            addMapControl();
        }
        setMapEvent();
    });
}

wapUtil.showTip = function(tip, time, type, yy) {
    require(["weuijs"],function() {
        $(".weui-toast").remove();
        var t = time ? Number(time) : 1;
        t = t * 1000;
        $.toast.prototype.defaults.duration = t;
        if (type) {
            if (yy) {
                $.toast(tip, type,
                    function() {},
                    1);
            } else {
                $.toast(tip, type);
            }
        } else {
            if (yy) {
                $.toast(tip, "text",
                    function() {},
                    1);
            } else {
                $.toast(tip, "text",
                    function() {
                        //$(".weui-toast--text").remove();
                    });
            }

        }
    })
}
wapUtil.showTip2 = function(tip, time, type) {
    dataUtil.iyongShowTips(tip, time);
    // var t = time ? time : 1;
    // var fileHtml = '<div id="webupload_tip"><div class="webupload_body"><font class="wl_tip"></font><span class="tclose close_tip"></span></div></div>';
    // if($("#webupload_tip").length == 0){
    //     $("body").append(fileHtml);
    //     $("#webupload_tip").fadeIn(500);
    // }
    // var $dom = $("#webupload_tip");
    // $dom.find(".wl_tip").html(tip);
    // setTimeout(function(){
    //     $dom.fadeOut(500).remove();
    // }, t * 1000);
    // $(".close_tip").click(function(){
    //     $dom.fadeOut(500).remove();
    // })
}
//新增参数iframeSrc：外部视频的地址。如果在线视频是外部视频，后台显示黑色背景和播放按钮，不生成iframe视频结构。
//前台点击播放后才在播放滑出页中生成iframe视频结构。
//如果用户没重新保存，则页面不变，iframeSrc为空，前台视频组件还是照以往那般为iframe视频结构，播放滑出页
//的视频结构是由前台视频组件的iframe视频结构拷贝而来。
wapUtil.setOnlineVideo = function(dom,viewDom,iframeSrc,videoType,videoUrl,loop,poster) {
    if (navigator.userAgent.match(/mobile/i)) {
        var video_h = $(window).width()*0.56;
        $(dom).css({
            "height": video_h
        });
    }

    /* -----------------------------------弹窗播放---------------------------------------*/
    // if($(viewDom).find(".onlineVideoMask").length<1)
    // {   
    //     $(viewDom +" .videoBox").prepend('<div class="onlineVideoMask"></div>');
    // }
    // //新保存的外部视频，或者存在代替外部视频的假视频容器，则把背景换成黑色。
    // if(videoType=="0"||!videoType&&$(viewDom).find(".fakeVideoContainer").length>0)
    // {
    //     $(viewDom).find(".fakeVideoContainer").css("background-color","#000");
    // }
    // $(viewDom).off("click").on("click", ".onlineVideoMask", function(e)
    // {
    //     if(window.WebModel=="view")
    //     {
    //         wapUtil.showVideoPlay("playMp4","","",viewDom,iframeSrc,false);
    //     }
    // });    
    // // $(".onlineVideoMask").click(function(e){wapUtil.showVideoPlay(e.target);});
    /* -----------------------------------弹窗播放---------------------------------------*/

    /* -----------------------------------非弹窗播放---------------------------------------*/
    var mdId=dom.replace("#videoId_",""),
        videoElem=$("#"+mdId+" .videoBox").children().not(".onlineVideoMask"),
        videoElemNodeName=videoElem[0].nodeName.toLowerCase();

    var fakeVideoContainer=$(viewDom+" .fakeVideoContainer");
    if(videoType=="0")
    {
        //展示为假视频结构的外部视频
        if(fakeVideoContainer.length>0 && fakeVideoContainer.hasClass("outerVideo"))
        {
            if(/^http:/.test(iframeSrc))
            {
                iframeSrc=iframeSrc.replace("http","https");
            }
            var iframeHtml=`<iframe class="mobiVideoOnlineIframe video_height" frameborder="0" src="${iframeSrc}" allowfullscreen=""></iframe>`;
            $(viewDom+" .videoBox").html(iframeHtml);
        }
    }
    else if(videoType=="1")
    {
        if(window.WebModel=="view")
        {
            // require(["video.min","css!csspath/css/wap/video-js.min.css"],function()
            // {
            //     var vVideoUrl=videoUrl,
            //         vLoop=loop=="0",
            //         vPoster=poster;
            //     //如果这三个参数未定义，则组件为弹窗时保存的，须从原video标签中取相应数据
            //     if(!videoUrl && !loop && !poster)
            //     {
            //         vVideoUrl=$(dom+">source").prop("src");
            //         vLoop=$(dom).prop("loop");
            //         vPoster=$(dom).prop("poster");
            //     }
            //     var videoContainerWidth=$("#"+mdId+" .videoBox").width(),
            //         videoContainerHeight=$("#"+mdId+" .videoBox").height(),
            //         options = 
            //         {
            //             autoplay:false,
            //             width:videoContainerWidth,
            //             // height:videoContainerHeight,
            //             loop:vLoop,
            //             poster:vPoster,
            //         };
            //         // domNodeName=$(dom).length>0?$(dom)[0].nodeName.toLowerCase():"";
            //     // if(videoElemNodeName=="video"&&!videoElem.hasClass("video-js"))
            //     // {
            //     //     var videoUrl=$(dom+">source").attr("src")?$(dom+">source").attr("src"):$(dom).attr("src"),
            //         var videoHtml=`
            //                 <video id="${mdId}_VideoJSPlayer" class="video-js vjs-big-play-centered" controls preload="auto" data-setup='{}'>
            //                     <source src="${vVideoUrl}" type="video/mp4"></source>
            //                 </video>
            //             `;
            //         $("#"+mdId+" .videoBox").html(videoHtml);
            //     // }
            //     var player=videojs(mdId+"_VideoJSPlayer",options);
            // });

            var loopStr=loop==="0"?"loop":"",
                videoWidth=$(window).width(),
                videoHeight=videoWidth*0.56;
            if(videoElemNodeName!=="video")
            {
                var videoHtml=`
                    <video id="videoId_${mdId}" class="video_height video_bg" controls poster="${poster}" ${loopStr} style="width:${videoWidth}px;height:${videoHeight}px;">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                `;
                $("#"+mdId+" .videoBox").html(videoHtml);
            }
            
        }
    }

    if(window.WebModel=="edit")
    {
        if($(viewDom).find(".onlineVideoMask").length<1)
        {   
            $(viewDom +" .videoBox").prepend('<div class="onlineVideoMask"></div>');
        }
    }
    /* -----------------------------------非弹窗播放---------------------------------------*/
}
//点击视频时弹窗
/*
*idenStr:区别视频是mp4还是torrent格式，分别使用playMp4和playTorrent
*videoSrc:torrent格式的种子地址，或者编辑器的视频地址。在线视频组件的本地视频结构已经在页面中生成，采用拷贝节点的方式，不需要视频地址。
*viewDom：在线视频组件的本地视频节点。
*iframeSrc：外部视频的地址。
*isEduiVideo：是否为编辑器视频，true/false。
*/
wapUtil.showVideoPlay=function(idenStr,videoSrc,loop,viewDom,iframeSrc,isEduiVideo)
{
    if(window.WebModel=="view")
    {        
        //若body没有弹窗容器，则添加一个
        if($("body").find("#videoPlayBlock").length<1)
        {
            var videoPlayBlockDom='<div id="videoPlayBlock"><div id="videoPlay"></div>'
                +'<div id="videoPlayMask"></div>'
                +'<div id="videoPlayReturn" onclick="wapUtil.hideVideoPlay()">'
                +'<i class="icon iconfont kenfor-icons-off1"></i></div>'
                +'</div>';
            $("body").append(videoPlayBlockDom);
        }

        if($("#videoPlayMask").hasClass("showing"))
        {//如果正在滑入滑出，则不允许控制。
            return;
        }

        //如果视频不是种子视频
        if(idenStr=="playMp4")
        {
            var videoDom;
            //如果iframeSrc为空，则视频为本地上传的视频或者以前保存的外部视频，组件中已生成了视频结构，
            //滑出播放页从组件中的视频结构中获取视频结构。
            if(!iframeSrc)
            {
                //如果是编辑器中的视频，特殊处理
                if(isEduiVideo)
                {
                    videoDom='<video control><source src="'+videoSrc+'" type="video/mp4"></video>';
                    $("#videoPlay").html(videoDom);
                }
                else
                {
                    var videoComponent=$(viewDom).find(".onlineVideoMask").next();   //组件中的视频结构        
                    videoDom=videoComponent.clone(true);
                
                
                    $("#videoPlay").html(videoDom);
                    if($(videoDom)[0].nodeName.toLowerCase()=="video")  //判断是否为本地上传的视频
                    {                
                        //本地上传的视频结构有id，往弹窗容器添加视频结构副本前要先去掉id
                        $(videoDom).removeAttr("id");        
                        // $("#videoPlay video").attr("autoplay","true");        
                    }
                }        
            }
            else
            {   
                //如果iframeSrc不是空，则视频为外部视频并且用户已重新保存，这时前台组件中显示的是黑色背景和播放按钮，
                //这时就要在滑出播放页添加包含iframeSrc视频地址的iframe，以生成外部视频结构。
                videoDom='<iframe class="mobiVideoOnlineIframe video_height" frameborder="0" src="'+iframeSrc+'" allowfullscreen=""></iframe>';
                $("#videoPlay").html(videoDom);
            }
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

                    document.querySelector("#videoPlay video").play();
                });
            }); 
        }

        $(window).resize(function () { 
            $("#videoPlay video").css({width:$(this).width(),height:$(this).height()});
        });
                
        clearTimeout(videoBlockShowing);
        clearTimeout(videoBlockShown);
        var videoBlockShowing=setTimeout(function()
        {
            $("#videoPlayBlock").addClass("playVideo");
            $("#videoPlayMask").addClass("sliding");
        },0);
        var videoBlockShown=setTimeout(function()
        {
            $("#videoPlayMask").removeClass("sliding");
            if(document.querySelector("#videoPlay video"))
            {
                document.querySelector("#videoPlay video").play();
            }            
        },200);
    }
};
//隐藏视频弹窗容器并清除里面的视频结构
wapUtil.hideVideoPlay=function()
{
    clearTimeout(videoBlockHiding);
    clearTimeout(videoBlockHidden);
    var videoBlockHiding=setTimeout(function()
    {
        $("#videoPlayBlock").removeClass("playVideo");
        $("#videoPlayMask").addClass("sliding");
    },0);
    var videoBlockHidden=setTimeout(function()
    {
        $("#videoPlayMask").removeClass("sliding");
    },200);
    // $("#videoPlayBlock").delay().removeClass("playVideo");
    $("#videoPlay").html("");
};
//种子播放
wapUtil.fakeVideoControl=function(mdId,sourceUrl,loop,poster)
{
    /* -----------------------------------弹窗播放---------------------------------------*/
    // $("#onlineVideo_"+mdId).off("click").on("click", ".fakeVideoContainer", function(e)
    // {
    //     //如果未传入视频，默认视频格式是torrent，但sourceUrl为空。由此判断是否已传入视频文件。
    //     if(window.WebModel=="view" && sourceUrl)
    //     {
    //         var videoLoop=loop=="0"?"loop":"";
    //         wapUtil.showVideoPlay("playTorrent",sourceUrl,videoLoop,"","",false);
    //     }
    // });
    /* -----------------------------------弹窗播放---------------------------------------*/

    /* -----------------------------------非弹窗播放---------------------------------------*/
    var videoBoxStr='#'+mdId+' .videoBox',
        videoContainer=$(videoBoxStr);
    if(window.WebModel=="view")
    {
        if(sourceUrl)
        {
            // require(["webtorrent.min","video.min","css!csspath/css/wap/video-js.min.css"],function(WebTorrent,vJS,vCSS)
            // {
            //     var videoContainer=$("#"+mdId+" .videoBox"),
            //         videoContainerWidth=videoContainer.width(),
            //         videoContainerHeight=videoContainer.height();

            //     var client = new WebTorrent();

            //     client.on('error', function (err) {console.error('ERROR: ' + err.message)});
            //     client.add(sourceUrl, onTorrent);

            //     function onTorrent (torrent)
            //     {
            //         var isLoop=loop=="0",
            //             poster=poster||"",
            //             options = 
            //             {
            //                 autoplay:false,
            //                 controls:true,
            //                 loop:isLoop,
            //                 width:videoContainerWidth,
            //                 height:videoContainerHeight,
            //                 poster:poster,
            //             },
            //             reg=/[^/]\/[^/]/,
            //             hostUrl=sourceUrl.substring(0,sourceUrl.search(reg)+2)+`static/webseed/`,
            //             videoName=sourceUrl.substring(sourceUrl.lastIndexOf("/")+1,sourceUrl.lastIndexOf(".")),
            //             videoUrl=hostUrl+videoName+`.mp4`,
            //             videoHtml=`
            //                 <video id="${mdId}_VideoJSPlayer" class="video-js vjs-big-play-centered" controls preload="auto" data-setup='{}'>
            //                     <source src="${videoUrl}" type="video/mp4"></source>
            //                 </video>
            //             `;
                    
            //         videoContainer.html(videoHtml);
            //         var player=videojs(mdId+"_VideoJSPlayer",options);
            //     }
            // });

            require(["webtorrent.min"],function(WebTorrent)
            {
                var client = new WebTorrent();
                client.on('error', function (err) 
                {
                    // console.error('ERROR: ' + err.message);
                    videoContainer.click(function()
                    {
                        wapUtil.showTip("找不到该视频！",1.5);
                    });
                    return false;
                });
                client.add(sourceUrl, onTorrent);

                function onTorrent (torrent)
                {
                    torrent.on("error",function()
                    {
                        wapUtil.showTip("找不到该视频！",1.5);
                        return false;
                    });
                    
                    var reg=/[^/]\/[^/]/,
                        hostUrl=sourceUrl.substring(0,sourceUrl.search(reg)+2)+`static/webseed/`,
                        videoName=sourceUrl.substring(sourceUrl.lastIndexOf("/")+1,sourceUrl.lastIndexOf(".")),
                        videoUrl=hostUrl+videoName+`.mp4`,
                        loopStr=loop==="0"?"loop":"",
                        videoWidth=$(window).width(),
                        videoHeight=videoWidth*0.56,
                        videoHtml=`
                            <video controls preload="auto" ${loopStr} poster="${poster}" style="width:${videoWidth}px;height:${videoHeight}px;">
                                <source src="${videoUrl}" type="video/mp4"></source>
                            </video>
                        `;
                    videoContainer.html(videoHtml);
                }
            });
        }
        else
        {
            $("#"+mdId).click(function()
            {
                wapUtil.showTip("未添加视频！",1.5);
            });
        }
    }
    

    if(window.WebModel=="edit")
    {
        if(videoContainer.find(".onlineVideoMask").length<1)
        {   
            videoContainer.prepend('<div class="onlineVideoMask"></div>');
        }
    }
    /* -----------------------------------非弹窗播放---------------------------------------*/
};
//编辑器视频点击播放
$(document).ready(function()
{
    /* -----------------------------------弹窗播放---------------------------------------*/
    // $(".edui-upload-video").off("click").on("click",function()
    // {    
    //     var videoSrc=$(this).attr("src"),
    //         videoType=videoSrc?videoSrc.split(".").pop():"",
    //         playType=videoType?videoType=="mp4"?"playMp4":"playTorrent":"";
    //     if(videoSrc)
    //     {
    //         wapUtil.showVideoPlay(playType,videoSrc,"","","",true);
    //     }
    //     else
    //     {
    //         return false;
    //     }           
    // });
    /* -----------------------------------弹窗播放---------------------------------------*/

    /* -----------------------------------非弹窗播放---------------------------------------*/
    var eduiVideo=$(".edui-upload-video");
    if(window.WebModel=="view" && eduiVideo.length>0)
    {
        eduiVideo.each(function(i,item)
        {
            var videoSrc=$(this).attr("src"),
                videoType=videoSrc?videoSrc.split(".").pop():"",
                videoWidth=$(this).attr("width"),
                videoHeight=$(this).attr("height");
            if(videoSrc)
            {
                if(videoType=="mp4")
                {
                    var videoHtml=`
                        <video class="eduiVideo" controls style="width:${videoWidth}px;height:${videoHeight}px;">
                            <source src="${videoSrc}" type="video/mp4">
                        </video>
                    `;
                    $(this).replaceWith(videoHtml);
                }
                else
                {
                    var thisParent=$(this).parent(),
                        videoPoster=$(this).attr("middtbnurl");
                    require(["webtorrent.min"],function(WebTorrent)
                    {
                        var client = new WebTorrent();
                        client.on('error', function (err) 
                        {
                            // console.error('ERROR: ' + err.message);
                            thisParent.click(function()
                            {
                                wapUtil.showTip("找不到该视频！",1.5);
                            });
                            return false;
                        });
                        client.add(videoSrc, function(torrent)
                        {
                            torrent.on("error",function()
                            {
                                wapUtil.showTip("找不到该视频！",1.5);
                                return false;
                            });
    
                            var reg=/[^/]\/[^/]/,
                                hostUrl=videoSrc.substring(0,videoSrc.search(reg)+2)+`static/webseed/`,
                                videoName=videoSrc.substring(videoSrc.lastIndexOf("/")+1,videoSrc.lastIndexOf(".")),
                                videoUrl=hostUrl+videoName+`.mp4`,
                                videoHtml=`
                                    <video class="eduiVideo" controls poster="${videoPoster}" style="width:${videoWidth}px;height:${videoHeight}px;">
                                        <source src="${videoUrl}" type="video/mp4"></source>
                                    </video>
                                `;
                            thisParent.html(videoHtml);
                        });
                    });
                }
            }
        });
    }
    /* -----------------------------------非弹窗播放---------------------------------------*/
});

wapUtil.memberLogin_psw = function(dom1, dom2, mdId) {
    var showPwd = $('#' + dom1 + mdId),
        passwordeye = $("#" + dom2 + mdId);
    passwordeye.off('click').on('click',
        function() {
            if (passwordeye.hasClass('showPsw')) {
                passwordeye.removeClass('icon-yanjing showPsw').addClass('icon-watch');
                showPwd.prop('type', 'text');
            } else {
                passwordeye.removeClass('icon-watch').addClass('icon-yanjing showPsw');
                showPwd.prop('type', 'password');
            };
        });
}
wapUtil.lg_submit = function(user, psw, urlType) {
    require(["public/langUtil", "jquery.cookie"],function() {
        if ($("body").hasClass("edit")) {
            wapUtil.showTip(langUtil.showTip, 2);
        } else {
            var checkUtil = require("kenfor/kenforJsUtil");
            var username = $("#" + user).val().trim(),
                password = $("#" + psw).val().trim();
            if (!checkUtil.isEmpty(username)) {
                // wapUtil.showTip(langUtil.enterAccount,"forbidden");
                $.toast(langUtil.enterAccount, "forbidden");
                return false;
            } else if (!checkUtil.isEmpty(password)) {
                // wapUtil.showTip(langUtil.enterPsw,1.5);
                $.toast(langUtil.enterPsw, "forbidden");
                return false;
            } else {
                $.ajax({
                    type: "POST",
                    url: "/w/cst/loginCst.do",
                    data: {
                        cstacc: username,
                        cstpsw: password,
                    },
                    success: function(data) {
                        if (data.result == "SUCCESS") {
                            // wapUtil.showTip(langUtil.loginSucc,1);
                            $.toast(langUtil.loginSucc);
                            //判断是否自动登录
                            var autoLgInfo = "";
                            if (data.data.config.isautoln == '1') {
                                $.cookie('autoLgInfo', null);
                                autoLgInfo = JSON.stringify({
                                    "autoName": data.data.azdgAccount,
                                    "autoPsw": data.data.azdgPassword
                                });
                                $.cookie("autoLgInfo", autoLgInfo, {
                                    expires: 14
                                });
                            } else {
                                if ($.cookie('autoLgInfo') != "null") {
                                    $.cookie('autoLgInfo', null);
                                }
                            }
                            if (urlType && urlType != "0") {
                                window.location.href = urlType;
                            } else if (data.data.config.lnfwtp == "1") {
                                //window.open(data.data.config.lnfw,"_blank")
                                if (data.data.config.mblnfw) {
                                    window.location.href = data.data.config.mblnfw;
                                } else {
                                    window.location.href = data.data.config.lnfw;
                                }
                            } else {
                                window.location.href = "member/index.html";
                            }
                        } else {
                            var errorTips = "";
                            if (data.result == "LOGINERROR" || data.result == "PWDERROR") {
                                errorTips = langUtil.account_psw_error;
                            } else if (data.result == "ACCOUNTNOTEXIST") {
                                errorTips = langUtil.noAccount;
                            } else if (data.result == "ACCOUNTFROZEN") {
                                errorTips = langUtil.freezeAccount;
                            } else if (data.result == "NOTACTIVE") {
                                errorTips = langUtil.noMail;
                            } else if (data.result == "ACCOUNTNOTPERMISSION") {
                                errorTips = langUtil.accountPermision;
                            } else {
                                errorTips = langUtil.loginError;
                            }
                            // wapUtil.showTip(errorTips,1.5);
                            $.toast(errorTips, "forbidden");
                        }
                    }
                });
            }
        }
    })
}
wapUtil.lg_autoSubmit = function(urlType) {
    require(["jquery.cookie"],function() {
        if ($.cookie('autoLgInfo') && $.cookie('autoLgInfo') != "null") {
            var autoLgInfo = JSON.parse($.cookie('autoLgInfo'));
            $.ajax({
                type: "POST",
                url: "/w/cst/loginCst.do",
                data: {
                    "autologon": 1,
                    "azdgAccount": autoLgInfo.autoName,
                    "azdgPassword": autoLgInfo.autoPsw
                },
                success: function(data) {
                    if (data.result == "SUCCESS") {
                        if (urlType != "0") {
                            window.location.href = urlType;
                        } else if (data.data.config.lnfwtp == "1") {
                            window.location.href = data.data.config.lnfw;
                        } else {
                            window.location.href = "member/index.html";
                        }
                    }
                }
            });
        }
    })
}
wapUtil.delAutoLgInfo = function(pageurl) {
    require(["jquery.cookie"],function() {
        if ($.cookie('autoLgInfo') != "null") {
            $.cookie("autoLgInfo", null, {
                path: '/'
            });
        }
        if (!pageurl) {
            pageurl = "login.html";
        }
        window.location.href = "/w/cst/logout.do?uri=" + realpath + pageurl;
    })
}
wapUtil.getMemberInfor = function() {
    var userPic = "";
    var defer = $.Deferred();
    $.ajax({
        url: '/w/customer/infoDisplayCustomer.do',
        type: 'GET',
        async: false,
        success: function(data) {
            if (data.result == "SUCCESS") {
                userPic = data.data.csthi;
                defer.resolve(userPic);
            } else {
                wapUtil.showTip(data.errorMsg.msg, 1.5);
            }
        }
    });
    // return userPic;
    return defer.promise();
}
wapUtil.forgetPsw = function(mdId, dom) {
    if ($("body").hasClass("edit")) {
        wapUtil.showTip(langUtil.showTip, 2);
    } else {
        var html = '';
        html += '<div id="getPswDiv' + mdId + '" class="getPswDiv clearfix">' + '<div class="psw_header">' + '<div class="backIcon kenfor-icons-back5" id="backIcon' + mdId + '"></div>' + '<div class="stepTitle">安全检测</div>' + '</div>' + '<div class="firstStep step">' + '<label for="lgAccount_' + mdId + '">手机号码：</label>' + '<input type="text" id="lgAccount_' + mdId + '" placeholder="请输入手机号码">' + '<div id="step_btn1_' + mdId + '" class="step_btn pub_bg">下一步</div>' + '</div>' + '<div class="secondStep step">' + '<p><i class="lg_reg_icon icon-jinggao"></i> 为确保是您本人操作，请完成以下验证</p>' + '<p>我们已经发送了校验码到您的手机：</p>' + '<p id="checkPhNum">*******8000</p>' + '<div class="checkCodeBox">' + '<label for="checkCode_' + mdId + '">校验码：</label>' + '<input type="text" id="checkCode_' + mdId + '" placeholder="短信校验码">' + '<b></b>' + '<span id="timer_' + mdId + '">点击获取校验码</span>' + '</div>' + '<div id="step_btn2_' + mdId + '" class="step_btn pub_bg">下一步</div>' + '</div>' + '<div class="thirdStep step">' + '<p><i class="lg_reg_icon icon-jinggao"></i> 安全验证已通过，请重新设置密码。</p>' + '<p>当前操作账号：<span id="curAccout' + mdId + '">13800138000</span></p>' + '<div class="checkCodeBox" style="margin-top:2rem;">' + '<label for="checkCode_' + mdId + '">设置密码：</label>' + '<input type="text" id="checkCode1_' + mdId + '" placeholder="请输入新密码">' + '</div>' + '<div class="checkCodeBox" style="margin-top:0.5rem;">' + '<label for="checkCode_' + mdId + '">确认密码：</label>' + '<input type="text" id="checkCode2_' + mdId + '" placeholder="请再次输入新密码">' + '</div>' + '<p class="pswTips">必须是6-20个英文字母、数字和符号(除空格)</p>' + '<div id="step_btn3_' + mdId + '" class="step_btn pub_bg">确认</div>' + '</div>' + '<div class="fourthStep step">' + '<p>密码修改操作成功！</p>' + '<a href="index.html" class="step_btn pub_bg" style="display:block;">返回首页</a>' + '</div>' + '</div>';
        $("#" + dom).append(html);
        /*点击返回按钮*/
        $("#backIcon" + mdId).click(function() {
            $("#getPswDiv" + mdId).remove();
        });
        /*检验方法*/
        var checkUtil = require("kenfor/kenforJsUtil");
        /*点击按钮进行下一步操作*/
        $('#lgAccount_' + mdId).keydown(function(e){
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                $("#step_btn1_" + mdId).click();
            }
        })
        $("#step_btn1_" + mdId).click(function() {
            /*获取手机号码并校验*/
            var lgAccount = $("#lgAccount_" + mdId).val();
            if (!checkUtil.isEmpty(lgAccount)) {
                // wapUtil.showTip("登录账号不能为空",1.5);
                $.toast("登录账号不能为空", "forbidden");
                return false;
            } else if (!checkUtil.isPhone(lgAccount)) {
                // wapUtil.showTip("登录账号不正确",1.5);
                $.toast("登录账号不正确", "forbidden");
                return false;
            } else {
                var sendtext, ckResult, getRes;
                var ckResult = dataUtil.forgetByPhone("#lgAccount_" + mdId);
                if (ckResult) {
                    sendtext = dataUtil.lookforPassword("#lgAccount_" + mdId, "#timer_" + mdId, "setRegCol");
                };
                if (sendtext) {
                    getRes = dataUtil.getResult();
                };
                if (ckResult && sendtext && getRes) {
                    $(".step").hide();
                    $("#checkPhNum").text(lgAccount);
                    $(".secondStep").show();
                    $("#timer_" + mdId).click(function() {
                        dataUtil.lookforPassword("#lgAccount_" + mdId, this, "setRegCol")
                    })
                }
            }
        });
        $('#checkCode_' + mdId).keydown(function(e){
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                $("#step_btn2_" + mdId).click();
            }
        })
        $("#step_btn2_" + mdId).click(function() {
            var ckCode = $("#checkCode_" + mdId).val();
            if (!checkUtil.isEmpty(ckCode)) {
                // wapUtil.showTip("校验码不能为空",1.5);
                $.toast("校验码不能为空", "forbidden");
                return false;
            } else {
                var checkResult = dataUtil.forgetByPhone("#lgAccount_" + mdId, "#checkCode_" + mdId);
                var getResult = dataUtil.getResult();
                if (checkResult && getResult) {
                    $("#curAccout" + mdId).text($("#lgAccount_" + mdId).val());
                    $(".step").hide();
                    $(".thirdStep").show();
                }
            }
        });
        $('#checkCode1_'+mdId+',#checkCode2_'+mdId).keydown(function(e){
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                $("#step_btn3_" + mdId).click();
            }
        })
        $("#step_btn3_" + mdId).click(function() {
            var getResult = dataUtil.getResult();
            if (getResult) {
                var pswVal = $("#checkCode1_" + mdId).val().trim(),
                    pswVla1 = $("#checkCode2_" + mdId).val().trim();
                if (pswVal == "" || pswVal.length < 6 || pswVal.length > 20) {
                    // wapUtil.showTip(langUtil.pswLenError,1.5);
                    $.toast(langUtil.pswLenError, "forbidden");
                    return false;
                } else if (pswVal != pswVla1) {
                    // wapUtil.showTip(langUtil.twoPswError,1.5);
                    $.toast(langUtil.twoPswError, "forbidden");
                    return false;
                } else {
                    var status = dataUtil.resetPSW("#checkCode2_" + mdId);
                    if (status) {
                        $(".step").hide();
                        $(".fourthStep").show();
                    }
                }
            }
        });
    }
}
// wapUtil.getRegArea = function(dom){
// 	var AreaArr = ["中国大陆 +86","香港 +852","澳门 +853","台湾 +886","韩国 +82","日本 +81","美国 +1","加拿大 +1","英国 +44","马来西亚 +60","泰国 +66","越南 +84","法国 +33","菲律宾 +63","印度尼西亚 +62","意大利 +39","俄罗斯 +7","新西兰 +64","荷兰 +31","瑞典 +46","澳大利亚 +61","德国 +49"];
// 	var options = '';
// 	$.each(AreaArr,function(k,item){
// 		options += '<option>' + item + '</option>';
// 	});
// 	$(dom).html(options);
// }
wapUtil.getRegItem = function(mdId, dom, AgreementContent) {
    var str = '';
    str += '<div id="mbReg_' + mdId + '" class="memberReg">' + '<ul>' + '<li>' + '<label class="lgNorText">国家地区</label>' +
            // '<select id="Area_'+mdId+'" class="Area regFormItem" data-isrq="1" data-inptp="select" data-propn="国家地区" dir="rtl"></select>' +
        '<div id="Area_' + mdId + '" class="Area regFormItem lgNorText">中国大陆 +86</div>' +
            // '<span class="iconicon icon-icon arrowIcon"></span>' +
        '</li>' + '<li>' + '<label class="lgNorText">手机号码：</label>' + '<input type="number" id="phoneNum_' + mdId + '" class="regFormItem" placeholder="请输入手机号码" data-isrq="1" data-inptp="phone" data-propn="' + langUtil.phoneNum + '">' + '<span class="spot">*</span></li>';
    $.ajax({
        type: "GET",
        url: "/w/cst/infoRegister.do",
        dataType: 'json',
        success: function(data) {
            //	var regType = data.regTp   注册类型：1.普通账号 2.手机注册 3.邮箱注册
            var formItem = data.data.propcfList; //表单项数组
            console.log(formItem);
            $.each(formItem,
                function(k, i) {
                    var selectItem = i.propvList; //下拉项数组
                    if (i.rgsdp == 1) {
                        if (i.inptp == "text") {
                            str += '<li><label class="lgNorText">';
                        } else if (i.inptp == "select") {
                            str += '<li class="lg_afterIcon"><label class="lgNorText">';
                        }
                        // str += '<li><label>';
                        str += i.propn;
                        str += '：</label>';
                        if (i.inptp == "text") {
                            str += '<input type="text" class="regFormItem" data-inptp="' + i.inptp + '" data-isrq="' + i.isrq + '" data-propn="' + i.propn + '" name="' + i.cstpropcfgid + '" placeholder="请输入' + i.propn + '">';
                        } else if (i.inptp == "select") {
                            str += '<select class="selectItem regFormItem" data-inptp="' + i.inptp + '" data-isrq="' + i.isrq + '" data-propn="' + i.propn + '" name="' + i.cstpropcfgid + '">';
                            $.each(selectItem,
                                function(key, item) {
                                    if (item.isdef == 1) {
                                        str += '<option selected value ="' + item.propv + '" data-name="' + item.cstpropvid + '" data-isdef="' + item.isdef + '" name="' + item.cstpropcfgid + '">';
                                    } else {
                                        str += '<option value ="' + item.propv + '" data-name="' + item.cstpropvid + '" data-isdef="' + item.isdef + '" name="' + item.cstpropcfgid + '">';
                                    };
                                    str += item.propv;
                                    str += '</option>';
                                });
                            str += "</select>";
                            // str += '<span class="lg_reg_icon icon-icon arrowIcon"></span>';
                        } else {
                            //其他类型
                        };
                        if (i.isrq == 1) {
                            str += '<span class="spot">*</span>';
                        }
                        str += "</li>";
                    }
                });
            str += '</ul></div>';
            if (AgreementContent.status == "1") {
                str += '<p class="btnText"><input type="checkbox" id="protocol_' + mdId + '" checked style="vertical-align:sub;"/> 同意<a href="javascript:void(0);" class="linkText" id="linkText_' + mdId + '">《会员服务协议》</a></p>';
            }
            str += '<div class="regBtn btnBg pub_bg" id="toRegister_' + mdId + '">注 册</div>';
            //插入节点
            $("#" + dom + mdId).html(str);
            //获取地区区号
            // wapUtil.getRegArea($("#Area_"+mdId));
            //弹出协议层
            $("#linkText_" + mdId).click(function() {
                wapUtil.showProtocol(mdId, "web_design_main", AgreementContent);
            })
            //弹出注册层
            $("#toRegister_" + mdId).click(function() {
                var mbName = $("#phoneNum_" + mdId).val();
                wapUtil.toRegister(mdId, "web_design_main", mbName);
            })
            $("#phoneNum_" + mdId).keydown(function(e){
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    var mbName = $("#phoneNum_" + mdId).val();
                    wapUtil.toRegister(mdId,"web_design_main",mbName);
                }
            });
            //协议CheckBox
            if (!$("body").hasClass("edit")) {
                if (AgreementContent.status == "1") {
                    $("#protocol_" + mdId).change(function() {
                        if ($(this).prop("checked") == true) {
                            $("#toRegister_" + mdId).removeClass("disabled");
                        } else {
                            $("#toRegister_" + mdId).addClass("disabled");
                        }
                    })
                }
            }
        },
        error: function(data) {
            alert(data.errorMsg.msg);
        }
    });
}
wapUtil.showProtocol = function(mdId, dom, AgreementContent) {
    if ($("body").hasClass("edit")) {
        wapUtil.showTip(langUtil.showTip, 2);
    } else {
        var html = '';
        html += '<div id="protocolDiv' + mdId + '" class="protocolDiv clearfix">' + '<div class="protoco_header">' + '<div class="backIcon kenfor-icons-back5" id="backIcon' + mdId + '"></div>' + '<div class="stepTitle">' + AgreementContent.rgamtt + '</div>' + '</div>' + '<div class="textDiv">' + AgreementContent.rgamctt + '</div>' + '<div id="comfirmBtn_' + mdId + '" class="comfirmBtn">同 意</div>' + '</div>';
        $("#" + dom).append(html);
        /*点击返回按钮*/
        $("#backIcon" + mdId).click(function() {
            $("#protocolDiv" + mdId).remove();
        });
        $("#comfirmBtn_" + mdId).click(function() {
            $("#protocolDiv" + mdId).remove();
            $("#protocol_" + mdId).prop("checked", true);
            if ($("#toRegister_" + mdId).hasClass("disabled")) {
                $("#toRegister_" + mdId).removeClass("disabled");
            }
        });
    }
}
wapUtil.toRegister = function(mdId, dom, mbName) {
    if ($("body").hasClass("edit")) {
        wapUtil.showTip(langUtil.showTip, 2);
    } else {
        var checkUtil = require("kenfor/kenforJsUtil"),formItemList=$("#phoneNum_"+mdId),
        //formItemList = $("#mbReg_" + mdId).find(".regFormItem"),
        //找到所有的表单项
            info = {}; //需提交的data数据
        var flag = true;
        $.each(formItemList,
            function(k, i) {
                var itemType = $(i).attr("data-inptp"),
                    itemName = $(i).attr("data-propn"),
                    itemIsrq = $(i).attr("data-isrq"),
                    isItemHasName = $(i).attr("name"),
                    itemVal = $(i).val().trim();
                if (itemIsrq == "1") { //必填
                    //先判断是否为空
                    if (!checkUtil.isEmpty(itemVal)) {
                        // wapUtil.showTip(itemName+langUtil.noEmpty,1.5);
                        $.toast(itemName + langUtil.noEmpty, "forbidden");
                        flag = false;
                        return false;
                    }
                    //按类型校验
                    switch (itemType) {
                        case "phone":
                            var checkOnlyPhNum = dataUtil.checkAccount("#phoneNum_" + mdId);
                            if (!checkOnlyPhNum) {
                                flag = false;
                                return false;
                            }
                            info["cstacc"] = itemVal;
                            info["regTp"] = "2";
                            break;
                        case "text":

                            break;
                        case "select":

                            break;
                        default:

                    }
                }
                //必填非必填都需要提交数据
                if (isItemHasName) {
                    info[isItemHasName] = itemVal;
                }
            })
        //提交数据注册
        if (flag) {
            var html = '';
            html += '<div id="toRegisterDiv' + mdId + '" class="toRegisterDiv clearfix">' + '<div class="reg_header">' + '<div class="backIcon kenfor-icons-back5" id="backIcon' + mdId + '"></div>' + '<div class="stepTitle" id="stepTitle' + mdId + '">填写校验码</div>' + '</div>' + '<div class="oneStep step">' + '<p>我们已经发送了校验码到您的手机：</p>' + '<p id="regPhNum_' + mdId + '">'+mbName+'</p>' + '<div class="checkCodeBox">' + '<label for="checkCode_' + mdId + '">校验码：</label>' + '<input type="text" id="checkCd_' + mdId + '" placeholder="请输入校验码">' + '<b></b>' + '<span id="timer_' + mdId + '">90秒后重新获取</span>' + '</div>' + '<div id="step_btn1_' + mdId + '" class="step_btn">下一步</div>' + '</div>' + '<div class="twoStep step">' + '<div class="checkCodeBox">' + '<label for="checkCode_' + mdId + '">输入新密码：</label>' + '<input type="password" id="checkCd1_' + mdId + '" placeholder="请输入新密码">' + '</div>' + '<div class="checkCodeBox">' + '<label for="checkCode_' + mdId + '">确认新密码：</label>' + '<input type="password" id="checkCd2_' + mdId + '" placeholder="请确认新密码">' + '</div>' + '<p>必须是6-20个英文字母、数字和符号(除空格)</p>' + '<p style="margin-top: 0.5rem;"><input type="checkbox" id="showRegPsw_' + mdId + '" style="vertical-align:sub;"> 显示密码</p>' + '<div id="step_btn2_' + mdId + '" class="step_btn">保存</div>' + '</div>' + '<div class="threeStep step">' + '<p style="margin-top: 1.5rem">注册成功！</p>' + '<p>会员账号 <span id="mbPhoneNum' + mdId + '">'+mbName+'</span></p>' + '<div id="step_btn3_' + mdId + '" class="step_btn">立即登录</div>' + '<p><a href="index.html" style="display:block;">返回首页</a></p>' + '</div>' + '</div>';
            $("#" + dom).append(html);
            /*获取注册时的用户名*/
            //$("#regPhNum_" + mdId).text(mbName);
            /*执行获取手机验证码*/
            var result = dataUtil.sendSmsCode('#phoneNum_' + mdId, '#timer_' + mdId, null, "setRegCol");
            if (result) {
                /*绑定获取手机验证码*/
                $("#timer_" + mdId).click(function() {
                    dataUtil.sendSmsCode('#phoneNum_' + mdId, this, "reset", "setRegCol")
                })
                /*点击返回按钮*/
                $("#backIcon" + mdId).click(function() {
                    $("#toRegisterDiv" + mdId).remove();
                });
                /*检验方法*/
                var checkUtil = require("kenfor/kenforJsUtil");
                /*点击按钮进行下一步操作*/
                $('#checkCd_' + mdId).keydown(function(e){
                    var theEvent = e || window.event;
                    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                    if (code == 13) {
                        $("#step_btn1_" + mdId).click();
                    }
                })
                $("#step_btn1_" + mdId).click(function() {
                    var ckCode = $("#checkCd_" + mdId).val();
                    //校验验证码
                    $.ajax({
                        type: "POST",
                        url: "/sendSms/checkValidationCode.do",
                        data: {
                            "code": ckCode,
                            "phone": mbName
                        },
                        success: function(data) {
                            if (data.result == "SUCCESS") {
                                info["code"] = ckCode;
                                $(".step").hide();
                                $(".twoStep").show();
                                //显示密码
                                $("#showRegPsw_" + mdId).change(function() {
                                    if ($(this).prop("checked") == true) {
                                        $("#checkCd1_" + mdId).prop('type', 'text');
                                        $("#checkCd2_" + mdId).prop('type', 'text');
                                    } else {
                                        $("#checkCd1_" + mdId).prop('type', 'password');
                                        $("#checkCd2_" + mdId).prop('type', 'password');
                                    }
                                })
                            } else {
                                $.toast(data.data.message, "forbidden");
                            }
                        }
                    });
                });
                $('#checkCd1_'+mdId+',#checkCd2_'+mdId).keydown(function(e){
                    var theEvent = e || window.event;
                    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                    if (code == 13) {
                        $("#step_btn2_" + mdId).click();
                    }
                })
                $("#step_btn2_" + mdId).click(function() {
                    var pswVal = $("#checkCd1_" + mdId).val().trim(),
                        pswVla1 = $("#checkCd2_" + mdId).val().trim();
                    if (pswVal == "" || pswVal.length < 6 || pswVal.length > 20) {
                        // wapUtil.showTip(langUtil.pswLenError,1.5);
                        $.toast(langUtil.pswLenError, "forbidden");
                        return false;
                    } else if (pswVal != pswVla1) {
                        // wapUtil.showTip(langUtil.twoPswError,1.5);
                        $.toast(langUtil.twoPswError, "forbidden");
                        return false;
                    } else {
                        info["cstpsw"] = pswVla1;
                        $.ajax({
                            type: "POST",
                            url: "/w/cst/registerCst.do",
                            data: info,
                            success: function(data) {
                                if (data.result == "SUCCESS") {
                                    $(".step").hide();
                                    $(".threeStep").show();
                                    $("#mbPhoneNum" + mdId).text(mbName);
                                    $("#step_btn3_" + mdId).click(function() {
                                        wapUtil.lg_submit("phoneNum_" + mdId, "checkCd2_" + mdId)
                                    })
                                } else {
                                    // wapUtil.showTip(data.errorMsg.msg,1.5);
                                    $.toast(data.errorMsg.msg, "forbidden");
                                }
                            }
                        });
                    }
                })
            } else {
                $("#toRegisterDiv" + mdId).remove();
            }
        }
    }
}
wapUtil.infoAgreement = function() {
    var AgreementContent = {};
    var defer = $.Deferred();
    $.ajax({
        type: "GET",
        url: "/w/customer/infoCustomerAgreement.do",
        dataType: 'json',
        //async: false,
        success: function(data) {
            if (data.result == "SUCCESS") {
                var data = data.data[0];
                AgreementContent["status"] = data.isrgsagt;
                if (data.isrgsagt == 1) {
                    AgreementContent["rgamtt"] = data.rgamtt;
                    AgreementContent["rgamctt"] = data.rgamctt;
                }
                defer.resolve(AgreementContent);
            }
        }
    });
    // return AgreementContent;
    return defer.promise();
}

/*
 购买产品的 函数整合开始  2017年10月25日  小奇
 */

// 弹窗页面
wapUtil.dialog = function(text) {
    if ($('#web_customer').length > 0) {
        $("#dialogBg,.dialog").show();
        $(".dialog").find('.footer').attr('data-text', text);
        setTimeout(function() {
                $('.dialog_cope').show();
                $(".dialog").find('img').css('display', 'block');
                $(".dialog").css({
                    'bottom': '0px'
                });
                $('.dialog_cope').css('opacity', 0.4);
            },
            100);
    } else {
        $.toast("请先登录！", 'text');
        var test1 = window.location.pathname;
        var test2 = window.location.search;
        setTimeout(function() {
                window.location.href = 'login.html?urlType=' + test1 + test2;
            },
            1500);
    }
}
//关闭弹窗页面
wapUtil.closeDialog = function() {
    $(".dialog").css({
        'bottom': '-60%'
    });
    $("#dialogBg,.dialog").hide();
    $(".dialog").find('img').css('display', 'none');
    $('.dialog_cope').css({
        'display': 'none',
        'opacity': 0.2
    });
    $('.amount').val(1);
}
// 减少产品数量
wapUtil.amountCut = function() {
    var quantity = Number($('.amount').val()) - 1;
    if (quantity == 0) {
        quantity = 1;
        $.toast("该商品1件起售", "text");
    }
    $('.amount').val(quantity);
}
// 增加产品数量
wapUtil.amountAdd = function() {
    var quantity = Number($('.amount').val()) + 1;
    $('.amount').val(quantity);
}
// 加入购物车函数
wapUtil.submitProduct = function(text) {
    if (Number($('.inventory').find('span').text()) == 0) {
        $.toast("库存不足", "text");
        return false;
    } else if (Number($('.amount').val()) > Number($('.inventory').find('span').text())) {
        $.toast("选择数量超过库存", "text");
        return false;
    } else {
        var sumprodouct = $('.amount').val();
        var productIdText = $('#footerInfoId').attr('data-pdText');
        var dataJson = {
            "wsctid": "",
            "pdid": productIdText,
            "ct": sumprodouct,
            "rm": ""
        };
        $.ajax({
            url: "/w/shop/saveWebsiteCustomerCart.do",
            dataType: "json",
            //async:false,
            data: dataJson,
            //参数值
            type: "post",
            //请求方式
            success: function(req) {
                wapUtil.closeDialog();
                if (text) {
                    wapUtil.setShopNum();
                    $.toast("添加成功", 'success');
                    $('.shopcart').find('span').animate({
                            fontSize: '4rem'
                        },
                        500,
                        function() {
                            $(this).css({
                                fontSize: '3rem'
                            });
                        });
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
}
// 立即购买
wapUtil.purchaseFast = function() {
    if (Number($('.inventory').find('span').text()) == 0) {
        $.toast("库存不足", "text");
        return false;
    } else if (Number($('.amount').val()) > Number($('.inventory').find('span').text())) {
        $.toast("选择数量超过库存", "text");
        return false;
    } else {
        wapUtil.submitProduct();
        require(["jquery.cookie"],function() {
            var dataJson = [];
            var productIdText = $('#footerInfoId').attr('data-pdText');
            dataJson.push(productIdText);
            $.cookie('pdid', dataJson, {
                expires: 7,
                path: '/member'
            });
            if ($('#web_customer').length > 0) {
                window.location.href = '/member/orderinfo.html';
            } else {
                window.location.href = 'login.html?urlType=/member/orderinfo.html';
            }
        });
    }
}

// 点击确定按钮触发的函数
wapUtil.confirmPurchase = function() {
    var textInfo = $(".dialog").find('.footer').attr('data-text');
    console.log(textInfo);
    if (textInfo == '加入购物车') {
        wapUtil.submitProduct(textInfo);
    } else {
        wapUtil.purchaseFast();
    }
}

//收藏的函数
wapUtil.productFavorites = function() {
    var productIdText = $('#footerInfoId').attr("data-pdText");
    var productIdName = $('#footerInfoId').attr("data-pdName");

    var ajaxData = {
        "pdid": productIdText,
        "pdn": productIdName
    }
    console.log(ajaxData);
    $.ajax({
        url: "/w/product/saveProductCollectionR.do",
        dataType: "json",
        async: true,
        data: ajaxData,
        type: "post",
        success: function(req) {
            console.log(req);
            if (req.result != "SUCCESS") {
                //后续可以根据状态做些事情
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

// 是否收藏查询收藏
wapUtil.singleProdoct = function() {
    var productIdText = $('#footerInfoId').attr('data-pdText');
    var singledata = {
        "pdid": productIdText
    }
    $.ajax({
        url: "/w/product/infoProductCollectionR.do",
        dataType: "json",
        async: true,
        data: singledata,
        //参数值
        type: "post",
        //请求方式
        success: function(req) {
            if (req.result == "SUCCESS") {
                if (req.data == 1) {
                    $('.prodoctCollect').find('p').eq(0).css('color', '#ff3333');
                    $('.prodoctCollect').find('p').eq(0).removeClass('one');
                    $('.prodoctCollect').find('p').eq(1).text("已收藏");
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}
// 收藏成功
wapUtil.prodoctCollect = function() {
    if ($('#web_customer').length > 0) {
        if ($('.prodoctCollect').find('p').eq(0).hasClass('one')) {
            $('.prodoctCollect').find('p').eq(0).css('color', '#ff3333');
            $.toast("收藏成功", 'text');
            $('.prodoctCollect').find('p').eq(1).text("已收藏");
            $('.prodoctCollect').find('p').eq(0).removeClass('one');
            //  调用收藏的接口
            wapUtil.productFavorites();
        } else {
            $('.prodoctCollect').find('p').eq(0).css('color', 'black');
            $.toast("取消收藏", 'text');
            $('.prodoctCollect').find('p').eq(1).text("收藏");
            $('.prodoctCollect').find('p').eq(0).addClass('one');
            //  再次调用收藏的接口
            wapUtil.productFavorites();
        }
    } else {
        $.toast("请先登录！", 'text');
        var test1 = window.location.pathname;
        var test2 = window.location.search;
        setTimeout(function() {
                window.location.href = 'login.html?urlType=' + test1 + test2;
            },
            1500);
    }
}
// 跳转到购物车
wapUtil.prodoctService = function() {
    if ($('#web_customer').length > 0) {
        window.location.href = "/member/ordercart.html";
    } else {
        $.toast("请先登录！", 'text');
        var test1 = window.location.pathname;
        var test2 = window.location.search;
        setTimeout(function() {
                window.location.href = 'login.html?urlType=' + test1 + test2;
            },
            1500);
    }
}

/*
 购买产品的 函数整合结束  2017年10月25日  小奇
 */
/* 更新产品详情购物车按钮 */
wapUtil.setShopNum = function() {
    if ($('#web_customer').length > 0) {
        var data = {
            sortPdid: [1, 0]
        }
        $.ajax({
            url: "/w/shop/listWebsiteCustomerCart.do",
            data: data,
            //async:false,
            type: "POST",
            success: function(data) {
                if (data.result == "SUCCESS") {
                    var cartData = data.data;
                    if (cartData.length > 0) {
                        $(".proShopNum").html("<span>" + cartData.length + "</span>");
                    }
                }
            }
        });
    } else {
        $(".proShopNum").html("");
    }

};
/* 转账支付 */
wapUtil.paymentShowPop = function() {
    var html = '';
    html += '<div id="paymentPop" class="weui-popup__container popup-bottom">' + '<div class="weui-popup__overlay"></div>' + '<div class="weui-popup__modal">' + '<div class="toolbar">' + '<div class="toolbar-inner">' + '<a href="javascript:;" class="picker-button close-popup">取消</a>' + '<h1 class="title">请选择付款方式</h1>' + '</div>' + '</div>' + '<div class="modal-content">' + '<div class="weui-grids">' + '<ul class="paymentList">' + '<li>' + '<div class="paymentItem"><img src="http://192.168.4.43:8080/swift/v1/iyong_public/iyong_0/file/20170825/1503631195115049655.png" alt="通联支付宝支付" width="23"><span>通联支付宝支付</span></div>' + '<i class="paymentIcon paymentActive iconfont kenfor-icons-right1"></i>' + '</li>' + '<li>' + '<div class="paymentItem"><img src="http://192.168.4.43:8080/swift/v1/iyong_public/iyong_0/file/20170825/1503631195115091298.png" alt="通联微信支付" width="23"><span>通联微信支付</span></div>' + '<i class="paymentIcon iconfont"></i>' + '</li>' + '<li>' + '<div class="paymentItem"><img src="http://192.168.4.43:8080/swift/v1/iyong_public/iyong_0/file/20170825/1503631431870070329.png" alt="通联个人银行支付" width="23"><span>通联个人银行支付</span></div>' + '<i class="paymentIcon iconfont"></i>' + '</li>' + '</ul>' + '<div class="paymentButtom">立即付款</div>' + '</div>' + '</div>' + '</div>' + '</div>';
    var popNum = $("#web_design_main > .weui-popup__container").length;
    if (popNum == 0) {
        $("#web_design_main").append(html);
    }
    //弹出遮罩
    $("#paymentPop").popup();
    // 点击选中
    $("#paymentPop .paymentList li").click(function() {
        $(this).find(".paymentIcon").addClass("paymentActive kenfor-icons-right1").end().siblings().find(".paymentIcon").removeClass('paymentActive kenfor-icons-right1');
    });
};
wapUtil.listenScroll = function(mShop) {
    //前台
    var scrollTop = 0;
    var $dom = $(window);
    if (WebModel == "edit") {
        $dom = $("#design_main");
    }
    $dom.scroll(function() {
        var themeType = $("#webset_com_9").data("themetype");
        var charskin = $("#webset_com_9").data("charskin");
        if (themeType == "shop" || (themeType == "character" && charskin == "char01")) {
            scrollTop = $dom.scrollTop();
            //var scrollTop = $(this)[0].scrollTop;
            var opcaity = (scrollTop / 100 > 1) ? 1 : scrollTop / 100;
            if (scrollTop > 48) {
                $(mShop).css({
                    "background": "rgba(255, 255, 255," + opcaity + ")",
                    "border-bottom": +opcaity + "px solid rgba(221,221,221," + opcaity + ")"
                });
                $(mShop).find("span").css({
                    "color": "rgba(51,51,51," + opcaity + ")"
                });
            } else {
                $(mShop).css({
                    "background-color": "rgba(240, 240, 240,0.4)",
                    "border-bottom": "0"
                });
                $(mShop).find("span").css({
                    "color": "#333"
                });
            }
        }
    });
};
wapUtil.setCharLogoWidth = function() {
    var logoW = $("#logo_com_2 .webLogo").width();
    $("#navbar .char_header .m_logo").width(logoW);
    var logoP = logoW + 40 + "px";
    var titleW = "calc(100% - " + logoP + ")";
    $("#navbar .char_header .m_title").css({
        "width": titleW
    });
};
if (typeof toastr == "undefined") { //重定向toastr方法
    toastr = {};
}
toastr.clear = function() {
    // var $dom = $("#webupload_tip");
    // $dom.remove();
};
toastr.error = function(tip) {
    wapUtil.showTip2(tip);
};
wapUtil.pushState = function(type) {
    var turl = window.location.href;
    if (turl.indexOf("fwType=") > -1) {
        turl = turl.replace("\&fwType=0", "\&fwType=" + type);
        turl = turl.replace("?fwType=0", "?fwType=" + type);
        turl = turl.replace("\&fwType=1", "\&fwType=" + type);
        turl = turl.replace("?fwType=1", "?fwType=" + type);
    } else {
        if (turl.indexOf("?") > -1) {
            turl = turl + '&fwType=' + type;
        } else {
            turl = turl + '?fwType=' + type;
        }
    }
    // history.pushState(null, null, turl);
};
wapUtil.renderResultHtml = function(mdId, tab) {
    var mdId = mdId ? mdId: '';
    if (tab) {
        var fwType = tab; // 区分0产品，1门店
    } else {
        var fwType = $("#" + mdId + " .origin_tab span.on").attr("data-tab")||'0'; // 区分产品，门店
    }
    var $dom = $("#" + mdId + " .queryCodeStep3 .queryResult"),
        html = '',
        $cInput = $("#" + mdId + " input[name=codeInput]");
    $("#" + mdId + " .origin_tab span").removeClass("on pub_color pub_border pub_o_color pub_o_border");
    $("#" + mdId + " .origin_tab span[data-tab='" + fwType + "']").addClass("on pub_color pub_border pub_o_color pub_o_border");
    if (fwType == "0") {
        html += '<div class="productCodeInfo">' + '<h4 class="productCodeInfoH4">产品信息</h4>' + '<p>产品编号：<span id="fwProdCode"></span></p>' + '<p>产品名称：<span id="fwProdName"></span></p>' + '<p>产品防伪码：<span id="fwProdCodeShow"></span></p>' + '</div>' + '<div class="productCodeOriginal">' + '<h4 class="productCodeInfoH4">追踪溯源</h4>' + '<p>查询次数：<span id="fwProdCount" class="pub_color pub_o_color"></span></p>' + '<p>最后鉴定时间：<span id="fwProdTime"></span></p>' + '<p>最后查询地：<span id="fwProdPlace"></span></p>' + '</div>';
        $("#" + mdId + " #storeTips").remove();
        $cInput.attr("placeholder", "请输入产品防伪码");
    } else {
        html += '<div class="productCodeInfo">' + '<h4 class="productCodeInfoH4">门店信息</h4>' + '<p class="list">门店编号：<span id="fwShopCode"></span></p>' + '<p class="list">门店防伪码：<span id="fwShopCodeShow"></span></p>' + '<p class="list">门店名称：<span id="fwShopName"></span></p>' + '<p class="list">门店地址：<span id="fwShopAddr"></span></p>' + '<p class="list">联系方式：<span id="fwShopPhone"></span></p>' + '<p>门店介绍：<span id="fwsShopDesc"></span></p>' + '</div>' + '<div id="storeDistance" class="pub_bg pub_o_bg">查询结果：<span></span></div>';
        $cInput.attr("placeholder", "请输入门店防伪码");
    }
    $dom.find(".queryResult_content").html(html);
    if (fwType == "1") {
        $("#" + mdId + " #storeTips").remove();
        $dom.after('<div id="storeTips" class="pub_bg pub_o_bg"></div>');
    }
    /*    $cInput.val('');
     $("#"+mdId+" #fw-phone-input").val('');
     $("#"+mdId+" #fw-code-input").val('');*/
    $("#" + mdId + " .queryCodeStep1 .querySearch").unbind().on('click',
        function(e) {
            $(e.currentTarget).addClass("yy-disable");
            wapUtil.queryCode("querySearch_", mdId, '', fwType,0)
        });
    /*    $("#"+mdId+" .queryCodeStep2 .querySearch").unbind().on('click',function(e){wapUtil.queryCode("querySearch_",mdId,'',fwType)});*/
    $("#" + mdId + " .queryCodeStep3 .querySearch").unbind().on('click',
        function() {
            wapUtil.getBackStep("#" + mdId)
        });
    $("#" + mdId + " .queryCodeStep1").show();
    $("#" + mdId + " .queryCodeStep2,#" + mdId + " .queryCodeStep3").hide();
};
wapUtil.getOriginType = function(mdId, isPro, isShop) {
    if (!$("body").hasClass("edit")) {
        $.when(wapUtil.getFwIsNeedPhone()).done(function(data) {
            $("#design").attr("data-isNeedPhone",data);
        });
    };
    var wxFlag=false;
    var type = '0',
        mId = mdId ? '#' + mdId + ' ': '';
    if (isPro == "0" && isShop == "1") {
        type = '1';
    } else if (isPro == "1" && isShop == "0") {
        type = '0';
    } else if (isPro == "0" && isShop == "0") {
        type = '0';
    }
    type=$("#" + mdId + " .origin_tab span.on").attr("data-tab")||type;
    // wapUtil.pushState(type);
    /*  wapUtil.queryCode("querySearch_",mdId,type);*/
    wapUtil.renderResultHtml(mdId, type);
    if (isPro == "1" && isShop == "1") {
        $("#" + mdId + " .origin_tab").show();
    } else {
        $("#" + mdId + " .origin_tab").hide();
    }
    $("#" + mdId + " .queryCodeStep2>h1>i").on('click',
        function(e) {
            $("#" + mdId + " .queryCodeStep2").hide();
            $("#" + mdId + " .queryCodeStep1").show();
            $("#" + mdId + " .queryCodeStep1 .querySearch ").removeClass("yy-disable");
        });
    if (!$("body").hasClass("edit")) {
        $("#" + mdId + " .origin_tab span").on('click', function(e) {
            wapUtil.clickOriginTab(e);
        });
        var elId='scanQRCode_origin';
        //dataUtil.addCookie('wxJsApiConfig','');
        if (mId == '') {
            var elId='scanQRCode'; //自定义扫码框ID
        } else if ($(mId).hasClass('box_storeOrigin')) {
            var elId='scanQRCode_shop'; //自定义扫码框ID
        } else if ($(mId).hasClass('box_queryCode')) {
            var elId='scanQRCode'; //自定义扫码框ID
        }
        dataUtil.wxScanQRCode(elId);
    }else{
        require(["kenfor/global"], function(global) {
            // isNewTemp?$("#oldStyle").remove():'';
            global.getWebVersion() == '1.0' ? $("#" + mdId + " #oldStyle").remove() : '';
        })
    }
};
wapUtil.clickOriginTab = function(e) {
    var $dom = $(e.currentTarget);
    var mdId = $dom.parents(".box_origin_v1").attr("id"),
        tab = $dom.attr("data-tab");
    //wapUtil.pushState(tab);
    wapUtil.renderResultHtml(mdId, tab);
};
//type==1 门店
wapUtil.queryCode = function(el, mdId, isNeedPhone, type,isScan) {
    var originType = type || 0,
        mId = mdId ? '#' + mdId + ' ': '';
    if (!$("body").hasClass("edit")) {
/*        if ($(mId).hasClass('box_origin_v1')) {
            $.when(wapUtil.getFwIsNeedPhone()).done(function(data) {
                isNeedPhone = data;
            })
        }*/
        isNeedPhone=$("#design").attr("data-isNeedPhone")|| 0;
    }
    require(["jquery.cookie"],function() {
        var allOperate = function() {
            if ($("body").hasClass("edit")) {
                wapUtil.showTip("当前为编辑状态，不能进行操作");
                return false;
            } else {
                var qCode = $(mId + "input[name=codeInput]").val();
                if (!qCode) {
                    wapUtil.showTip("请先输入防伪码");
                    $("#" + el + mdId).removeClass("yy-disable"); //防止多次点击按钮
                    return false;
                } else {
                    if (isNeedPhone == "1") {
                        var fwCookie = false;
                        if ($.cookie('fwCookie')
                        /* && !code*/
                        ) {
                            fwCookie = JSON.parse($.cookie('fwCookie'));
                        }
                        if (fwCookie && fwCookie.code == qCode && fwCookie.fwType == originType) {
                            $(mId + ".queryCodeStep1").hide(); //隐藏第一步
                            $(mId + ".queryCodeStep2").hide();
                            var dataInfo = {};
                            dataInfo["phone"] = fwCookie.fwPhone;
                            dataInfo["checkCode"] = fwCookie.fwCode;
                            wapUtil.getProductDetail(2, dataInfo, mId, originType,isScan); //查询产品信息
                        } else {
                            $(mId + ".queryCodeStep1").hide(); //隐藏第一步
                            $(mId + ".queryCodeStep2").fadeIn();
                            $('#nextStep_' + mdId).unbind().on('click',
                                function() {
                                    if ($(mId).hasClass('box_origin_v1')) { //新版
                                        var fwPhone = $(mId + "#or-phone-input").val().trim(),
                                            fwCode = $(mId + "#or-code-input").val().trim();
                                    } else {
                                        if (originType == 1) {
                                            var fwPhone = $(mId + "#shop-phone-input").val().trim(),
                                                fwCode = $(mId + "#shop-code-input").val().trim();
                                        } else {
                                            var fwPhone = $(mId + "#fw-phone-input").val().trim(),
                                                fwCode = $(mId + "#fw-code-input").val().trim();
                                        }
                                    }
                                    //手机验证格式
                                    var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/,
                                        reg1 = new RegExp(/^\d{6}$/);
                                    if (fwPhone == "" || reg.test(fwPhone) == false) {
                                        wapUtil.showTip("请输入正确的手机号码", "2");
                                        $("#" + el + mdId).removeClass("yy-disable"); //防止多次点击按钮
                                        return;
                                    };
                                    //验证验证码
                                    if (fwCode == "" || reg1.test(fwCode) == false) {
                                        wapUtil.showTip("请确保验证码输入正确", "2");
                                        $("#" + el + mdId).removeClass("yy-disable"); //防止多次点击按钮
                                        return;
                                    };
                                    var cData = {
                                        phone: fwPhone,
                                        checkCode: fwCode,
                                        code: qCode
                                    };
                                    $.ajax({
                                        type: "POST",
                                        url: "/w/product/checkPhoneCode.do",
                                        data: cData,
                                        dataType: "json",
                                        success: function(checkRes) {
                                            if (checkRes.result == "SUCCESS") {
                                                $(mId + ".queryCodeStep2 .querySearch").addClass("query-disable");
                                                wapUtil.getProductDetail(1, '', mId, originType,isScan); //查询产品信息
                                            } else {
                                                wapUtil.showTip("查询失败，请核对您的验证码", "2");
                                                $("#" + el + mdId).removeClass("yy-disable"); //防止多次点击按钮
                                            }
                                        }
                                    });
                                })
                        }
                    } else {
                        wapUtil.getProductDetail(0, '', mId, originType,isScan); //查询产品信息
                    }
                }
            }
        }
        if ($(mId).hasClass('box_origin_v1')) {
            allOperate();
        } else {
            $("#" + el + mdId).click(function() {
                allOperate();
            })
        }
    })

}
//防伪的点击获取验证码
/*wapUtil.getFwCode = function(btn){
 var fwPhone = $("#fw-phone-input").val().trim();
 var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/;
 if(fwPhone == "" || reg.test(fwPhone) == false){
 wapUtil.showTip("请输入正确的手机号码","2");
 return;
 }else{
 var _this = $(btn), i = 89;
 if(!_this.hasClass("fw-disable")){
 _this.addClass("fw-disable");
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
 wapUtil.showTip("短信已发出，请注意查收","2");
 _this.text("90秒");
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
 clearInterval(window.Timer);
 }
 },1000);
 }else if(res.errorMsg.tips == '2001'){
 wapUtil.showTip("短信已超过当日限额","2");
 _this.text("发送验证码");
 _this.removeClass("fw-disable");
 }else{
 wapUtil.showTip("短信发送失败，请稍后重试","2");
 _this.text("发送验证码");
 _this.removeClass("fw-disable");
 }
 }
 });
 }
 }*/

wapUtil.getFwCode = function(type, phoneID, codeID) {
    if ($('body').hasClass('edit')) {
        wapUtil.showTip("当前为编辑状态，不可操作");
    } else {
        if (type == "reser") {
            /*			var fwPhone = $("input[name=reserPhone]").val().trim();*/
            if (phoneID) {
                var fwPhone = $("#" + phoneID).val().trim();
            } else {
                var fwPhone = $("input[name=reserPhone]").val().trim();
            }
        } else {
            var fwPhone = $("#fw-phone-input").val().trim();
        }
        var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/;
        if (fwPhone == "" || reg.test(fwPhone) == false) {
            wapUtil.showTip("请输入正确的手机号码", "2");
            return;
        } else {
            if (type == "reser") {
                wapUtil.setInterval(0, type, codeID);
            } else {
                wapUtil.setInterval(0);
            }
            //调用接口获取验证码
            $.ajax({
                type: "get",
                url: "/sendSms/sendRandomCode.do",
                data: {
                    "phone": fwPhone
                },
                dataType: "json",
                success: function(res) {
                    if (res.result == "SUCCESS") {
                        if (type == "reser") {
                            wapUtil.setInterval(1, type, codeID);
                        } else {
                            wapUtil.setInterval(1);
                        }
                    } else {

                        switch (res.errorMsg.tips) {
                            case "1000":
                                tips = '手机号码不合法';
                                break;
                            case "1001":
                                tips = '手机号码不合法';
                                break;
                            case "1002":
                                tips = 'uc密码错误';
                                break;
                            case "1003":
                                tips = '短信数量不足';
                                break;
                            case "1004":
                                tips = '短信内容为空';
                                break;
                            case "1005":
                                tips = '大于短信模板为空';
                                break;
                            case "1006":
                                tips = '大于模板参数为空';
                                break;
                            case "1007":
                                tips = 'token错误';
                                break;
                            case "1008":
                                tips = 'uc账号格式不正确';
                                break;
                            case "1009":
                                tips = '通道不存在';
                                break;
                            case "1010":
                                tips = '公司账号所拥有的短信少于100条';
                                break;
                            case "1010":
                                tips = '管理员账号所拥有的短信少于100条';
                                break;
                            case "2001":
                                tips = '短信已超过当日限额';
                                break;
                            default:
                                tips = '短信发送失败，请稍后重试';
                        }
                        if (type == "reser") {
                            wapUtil.setInterval("", type, codeID);
                        } else {
                            wapUtil.setInterval();
                        }
                        wapUtil.showTip(tips, "2");
                    }
                }
            });
        }
    }
}
wapUtil.setInterval = function(state, type, codeID) {
    var _this = $(".fw-timer-button");
    if (type == "reser") {
        if (codeID) {
            _this = $("#" + codeID);
        } else {
            _this = $(".sendCode-text");
        }
    }
    if (state == 0) {
        if (!_this.hasClass("fw-disable")) {
            _this.addClass("fw-disable");
        }
        _this.text("正在发送...");
    } else if (state == 1) {
        wapUtil.showTip("短信已发出，请注意查收", "2");
        _this.text("90秒");
        var i = 89;
        window.Timer = setInterval(function() {
                var tickText = '';
                if (i >= 10) {
                    tickText = i + "秒";
                } else {
                    tickText = "0" + i + "秒";
                }
                _this.text(tickText);
                i--;
                if (i < 0) {
                    _this.text('发送验证码');
                    _this.removeClass("fw-disable");
                    clearInterval(Timer);
                }
            },
            1000);
    } else if (state == 2) {
        _this.text('发送验证码');
        _this.removeClass("fw-disable");
        if (window.Timer) {
            clearInterval(window.Timer);
        }
    } else {
        _this.text("发送验证码");
        _this.removeClass("fw-disable");
    }
}
var visPhoneReg=/^(7950|86|11)?(13[0-9]|15[012356789]|17[035678]|18[0-9]|14[57]|16[68]|199|198)[0-9]{8}$/;
wapUtil.getBackStep = function(mdId) {
    if (mdId) {
        var mId = mdId;
    } else {
        var e = arguments.callee.caller.arguments[0] || window.event;
        var mId = "#" + $(e.currentTarget).parents(".modulebox").attr("id") + " ";
    }
    $(mId + " .queryCodeStep2").hide();
    $(mId + " .queryCodeStep3").hide();
    $(mId + " .queryCodeStep1").fadeIn();
    $(mId + " #fw-phone-input").val("");
    $(mId + " #fw-code-input").val("");
    $(mId + " input[name=codeInput]").val("");
    $(mId + " .queryCodeStep2 input").val("");
    $(mId + " .fw-timer-button").text('发送验证码');
    $(mId + " .fw-timer-button").removeClass("fw-disable");
    $(mId + " .queryCodeStep1 .querySearch").removeClass("query-disable");
    $(mId + " .queryCodeStep2 .querySearch").removeClass("query-disable");
    clearInterval(window.Timer);
};
wapUtil.getProductDetail = function(type, cookieData, mId, originType,isScan) {
    var Fwdata = cookieData || {};
    Fwdata[isScan==1?"code":"codeShow"] = $(mId + "input[name=codeInput]").val();
    if (type == '1') {
        Fwdata["phone"] = $(mId + ".fw-form-box input:eq(0)").val();
        Fwdata["checkCode"] = $(mId + ".fw-form-box input:eq(1)").val();
    }
    require(["async!BMap"],function() {
        $(mId + ".queryCodeStep1 .querySearch").addClass("query-disable");
        $(mId + ".queryCodeStep2 .querySearch").addClass("query-disable");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                ProductOrigin(r.point.lng, r.point.lat, Fwdata);
            } else {
                wapUtil.showTip('获取经纬度失败，' + this.getStatus(), "2");
                ProductOrigin("", "", Fwdata);
            }
        });
    });
    if (originType == 1) {
        function ProductOrigin(lng, lat, dataInfo) {
            var portName=isScan==1?"getShopByCode":"getShop";
            $.when(wapUtil.commonThird(portName, "fw", dataInfo)).done(function(res) {
                if (res.result == "SUCCESS" && res.data) {
                    $(mId + " .queryCodeStep1 .querySearch").removeClass("yy-disable"); //防止多次点击按钮
                    var fwProData = res.data;
                    $(mId + "#fwShopCode").text(fwProData.productNo);
                    $(mId + " #fwShopCodeShow").text(fwProData.codeShow);
                    $(mId + "#fwShopName").text(fwProData.productName);
                    if (fwProData.productDesc) {
                        $(mId + "#fwShopAddr").text(fwProData.productDesc.split("||")[0]);
                        $(mId + "#fwShopPhone").text(fwProData.productDesc.split("||")[1]);
                        $(mId + "#fwsShopDesc").text(fwProData.productDesc.split("||")[2]);
                    }
                    /*				$(mId+" #fwProdTime").text(fwProData.lastQueryDate);*/

                    $(mId + ".queryResult").show();
                    $(mId + "#storeTips").hide();
                    $(mId + ".queryCodeStep1").hide();
                    $(mId + ".queryCodeStep2").hide();
                    $(mId + ".queryCodeStep3").fadeIn();
                    $(mId + ".queryCodeStep3 .queryResult").show();
                    if (mId == '') {
                        var mapName = 'fwBMapwrapperStore';
                    } else if ($(mId).hasClass('box_storeOrigin')) {
                        var mapName = 'fwBMapwrapperStore';
                    } else {
                        var mapName = 'fwBMapwrapper_origin';
                    }
                    if (fwProData.shopLng) {
                        $("#" + mapName).css("height", "260px");
                        var addrData = [{
                            lng: fwProData.shopLng,
                            lat: fwProData.shopLat,
                            labelTxt: fwProData.productName
                        },
                            {
                                lng: lng,
                                lat: lat,
                                labelTxt: '我的位置'
                            }];
                        dataUtil.renderBMapNew(mapName, addrData);
                    }
                    if (type == '1') {
                        $.cookie('fwCookie', '', {
                            expires: -1
                        }); // 删除旧的cookie
                        var fwCookie = JSON.stringify({
                            "fwPhone": Fwdata.phone,
                            "fwCode": Fwdata.checkCode,
                            "code": Fwdata.codeShow,
                            "fwType": originType
                        });
                        $.cookie("fwCookie", fwCookie, {
                            expires: 1
                        }); //再存储cookie
                    }
                } else {
                    $(mId + " .queryCodeStep1 .querySearch").removeClass("yy-disable"); //防止多次点击按钮
                    if (res.result == 'OTHERERROR') {
                        wapUtil.getBackStep(mId);
                        wapUtil.showTip("查询失败，请核对您的防伪码", "2");
                    } else {
                        $.cookie('fwCookie', '', {
                            expires: -1
                        }); // 删除旧的cookie
                        if (res.errorMsg.errorMsg) {
                            $(mId + ".queryCodeStep2").hide();
                            $(mId + ".queryCodeStep1").hide();
                            $(mId + "#storeTips").html(res.errorMsg.errorMsg + '，请谨慎购买！').show();
                            $(mId + ".queryCodeStep3").fadeIn();
                            $(mId + ".queryResult").hide();
                        } else {
                            wapUtil.getBackStep(mId);
                            $(mId + " .queryResult").show();
                            $(mId + " #storeTips").hide();

                        }
                    }

                }
            })
        }
    } else {
        function ProductOrigin(lng, lat, dataInfo) {
            dataInfo["lng"] = lng;
            dataInfo["lat"] = lat;
            var funCode=function(res){
                if (res.result == "SUCCESS" && res.data.codeShow) {
                    $(mId + " .queryCodeStep1 .querySearch").removeClass("yy-disable"); //防止多次点击按钮
                    var fwProData = res.data;
                    $(mId + "#fwProdCode").text(fwProData.no);
                    $(mId + "#fwProdName").text(fwProData.name);
                    $(mId + " #fwProdCodeShow").text(fwProData.codeShow);
                    $(mId + "#fwProdCount").text(fwProData.queryCount);
                    $(mId + "#fwProdTime").text(fwProData.lastQueryDate);
                    $(mId + ".queryCodeStep1 .querySearch").removeClass("query-disable");
                    $(mId + ".queryCodeStep2 .querySearch").removeClass("query-disable");
                    $(mId + ".queryCodeStep1").hide(); //隐藏第一步
                    $(mId + ".queryCodeStep2").hide();
                    $(mId + ".queryCodeStep3").fadeIn();
                    $(mId + ".queryResult").show();
                    if (mId == '') {
                        var mapName = 'fwBMapContainer';
                    } else if ($(mId).hasClass('box_queryCode')) {
                        var mapName = 'fwBMapContainer';
                    } else {
                        var mapName = 'fwBMapwrapper_origin';
                    }
                    $("#" + mapName).css("height", "260px");
                    var addrData=[{lng:fwProData.lng,lat:fwProData.lat,labelTxt:''}];
                    dataUtil.renderBMapNew(mapName, addrData);
                   // dataUtil.renderBMap(mapName, fwProData.lng, fwProData.lat);
                    if (type == '1') {
                        $.cookie('fwCookie', '', {
                            expires: -1
                        }); // 删除旧的cookie
                        var fwCookie = JSON.stringify({
                            "fwPhone": fwProData.phone,
                            "fwCode": Fwdata.checkCode,
                            "code": fwProData.codeShow,
                            "fwType": originType
                        });
                        $.cookie("fwCookie", fwCookie, {
                            expires: 1
                        }); //再存储cookie
                        data = {
                            name: '',
                            num: '',
                            fwCookies: ''
                        }
                    }
                } else {
                    $(mId + " .queryCodeStep1 .querySearch").removeClass("yy-disable"); //防止多次点击按钮
                    if (res.errorMsg.errmsg) {
                        $.cookie('fwCookie', '', {
                            expires: -1
                        }); // 删除旧的cookie
                        wapUtil.showTip("查询失败，" + res.errorMsg.errmsg, "2");
                    } else {
                        wapUtil.showTip("查询失败，请核对您的防伪码", "2");
                    }
                    wapUtil.getBackStep(mId);
                }
            }
            if(isScan==1){
                $.when(wapUtil.commonThird("getPrductByCode", "fw", dataInfo)).done(function(res) {
                    funCode(res);
                });
            }else{
                $.ajax({
                    type: "POST",
                    url: "/w/product/infoProductOriginResult.do",
                    data: dataInfo,
                    dataType: "json",
                    success: function(res) {
                        funCode(res);

                    }
                });
            }







            /*            $.ajax({
             type: "POST",
             url: "/w/product/infoProductOriginResult.do",
             data: dataInfo,
             dataType: "json",
             success: function(res) {
             console.log(res);
             if (res.result == "SUCCESS" && res.data.codeShow) {
             $(mId + " .queryCodeStep1 .querySearch").removeClass("yy-disable"); //防止多次点击按钮
             var fwProData = res.data;
             $(mId + "#fwProdCode").text(fwProData.no);
             $(mId + "#fwProdName").text(fwProData.name);
             $(mId + " #fwProdCodeShow").text(fwProData.codeShow);
             $(mId + "#fwProdCount").text(fwProData.queryCount);
             $(mId + "#fwProdTime").text(fwProData.lastQueryDate);
             if (mId == '') {
             var mapName = 'fwBMapContainer';
             } else if ($(mId).hasClass('box_queryCode')) {
             var mapName = 'fwBMapContainer';
             } else {
             var mapName = 'fwBMapwrapper_origin';
             }
             $("#" + mapName).css("height", "260px");
             dataUtil.renderBMap(mapName, fwProData.lng, fwProData.lat);
             $(mId + ".queryCodeStep1 .querySearch").removeClass("query-disable");
             $(mId + ".queryCodeStep2 .querySearch").removeClass("query-disable");
             $(mId + ".queryCodeStep1").hide(); //隐藏第一步
             $(mId + ".queryCodeStep2").hide();
             $(mId + ".queryCodeStep3").fadeIn();
             $(mId + ".queryResult").show();
             if (type == '1') {
             $.cookie('fwCookie', '', {
             expires: -1
             }); // 删除旧的cookie
             var fwCookie = JSON.stringify({
             "fwPhone": fwProData.phone,
             "fwCode": Fwdata.checkCode,
             "code": fwProData.codeShow,
             "fwType": originType
             });
             $.cookie("fwCookie", fwCookie, {
             expires: 1
             }); //再存储cookie
             data = {
             name: '',
             num: '',
             fwCookies: ''
             }
             }
             } else {
             $(mId + " .queryCodeStep1 .querySearch").removeClass("yy-disable"); //防止多次点击按钮
             if (res.errorMsg.errmsg) {
             $.cookie('fwCookie', '', {
             expires: -1
             }); // 删除旧的cookie
             wapUtil.showTip("查询失败，" + res.errorMsg.errmsg, "2");
             } else {
             wapUtil.showTip("查询失败，请核对您的防伪码", "2");
             }
             wapUtil.getBackStep(mId);
             }
             }
             });*/
        }
    }

}
wapUtil.setPreview = function(type, c) {
    var preview = dataUtil.GetQueryString("preview") || '',
        code = dataUtil.GetQueryString("codeShow") || '',
        codeParms;
    var url = window.location.href;
    if (type == 1) {
        preview == 0 ? preview = 1 : '';
        codeParms = code ? "&codeShow=" + code: "&codeShow=" + c;
    } else {
        preview == 1 ? preview = 0 : '';
    }
    //history.pushState(null, null, url + "&preview=" + preview + codeParms);
};
wapUtil.getFwIsNeedPhone = function() {
    var isNeedPhone = "";
    var defer = $.Deferred();
    $.ajax({
        url: '/w/product/getIsNeedPhoneCheck.do',
        type: 'GET',
        async: false,
        success: function(data) {
            if (data.result == "SUCCESS") {
                isNeedPhone = data.data.isNeedPhone;
                defer.resolve(isNeedPhone);
            } else {
                wapUtil.showTip("网络错误", 1.5);
            }
        }
    });
    return defer.promise();
};
/* 预约组件 */
wapUtil.commonThird = function(apicode, syscode, params) {
    var apicode = apicode || '',
        syscode = syscode || 'yy',
        params = params || '';
    var defer = $.Deferred();
    var yyParams = {};
    apicode == '' ? '': yyParams.apicode = apicode;
    syscode == '' ? '': yyParams.syscode = syscode;
    params == '' ? '': yyParams.params = JSON.stringify(params);
    $.ajax({
        url: '/w/thirdSys/commonThird.do',
        type: 'POST',
        data: yyParams,
        success: function(data) {
            if (data.result == "SUCCESS") {
                defer.resolve(data);
            } else {
                if(apicode=='getShop' || apicode=='getShopByCode' || apicode=='getShopById' || apicode=='addBookingV2'|| apicode == 'getPrductByCode') {
                    defer.resolve(data);
                } else {
                    var tips = (data.errorMsg && data.errorMsg.errorMsg) ? data.errorMsg.errorMsg: '获取数据失败';
                    wapUtil.showTip(tips, 1.5);
                };
            }
        }
    });
    return defer.promise();
}
var tempTime = [];
wapUtil.getProjectList=function(pID,mdId,flag,isNewTemp){
    isNewTemp ? $("#" + mdId + " #oldStyle").remove() : '';
    $.when(wapUtil.commonThird("listMemberProject","yy"),wapUtil.commonThird("queryMsgCheck","yy")).done(function(data,msgStatus){
        var html='';
        if(mdId){
            var mId='#'+mdId;
        }else{
            var mId='';
        }
        if(flag=="1"){
            $.each(data.data,function(i,item){
                if(item.projectId==pID){
                    html+='<div data-id="'+item.projectId+'" data-class="'+item.projectClass+'" data-code="'+item.projectCode+'" class="clickDetail_only yy_bgColor edit_bg"><a><span>预约服务</span></a></div>';
                }
            })
            $(mId+" #projectList").html(html);
        }else if(flag=="0"){
            html='<ul>';
            var dataFun=function(item){
                var timeType=item.eventDurationUnitType==1?'分钟':'小时';
                var lng=item.eventLongitude,lat=item.eventLatitude,labelTxt=item.eventLocation;
                var projectDescription=item.projectDescription?item.projectDescription:'';
                /*					var mapHtml='',aClass='';
                 if(lng && lat){
                 mapHtml='<div class="addrIcon icon iconfont kenfor-icons-sc-Other7" data-lng="'+lng+'" data-lat="'+lat+'"><input type="hidden" value="'+labelTxt+'"></div>';
                 }else{
                 aClass='all';
                 }*/
                var imgUrl=item.projectPicture?item.projectPicture:imgPath+'images/visual/reservation.jpg',
                    timeHtml=item.projectClass=="01"?'<span>时长：'+item.eventDurationValue+timeType+'</span>':'',
                    descHtml=item.projectDescription?'<text>简介：'+projectDescription+'</text>':'';
                html+='<li data-id="'+item.projectId+'" data-code="'+item.projectCode+'" data-class="'+item.projectClass+'" class="clickDetail"><div><label>'+item.projectName+'</label>'+timeHtml+descHtml+'</div><p><img src="'+imgUrl+'"></p></li>';
            };
            if(pID){
                $.each(data.data,function(i,item){
                    if(pID && pID.indexOf(String(item.projectId)) !=-1){
                        dataFun(item);
                    }
                })
            }else{
                $.each(data.data,function(i,item){
                    dataFun(item);
                })
            }

            html+='</ul>';
            $(mId+" #projectList").html(html);
            /*			$(".addrIcon").on('click',function(e){
             if($("body").hasClass("edit")){
             wapUtil.showTip("编辑状态不可点击","1");
             }else{
             var el=$(e.currentTarget);
             var txt=el.find("input").val();
             var lng=el.data("lng");
             var lat=el.data("lat");
             $("#yyBMapwrapper").remove();
             el.parents("li").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div><div id="mapIcon" class="icon iconfont kenfor-icons-upward1"></div></div>');
             $("#yyBMapwrapper").css("margin-top","10px");
             wapUtil.renderBMap("yyMapWrap",lng,lat,txt);
             $("#mapIcon").on('click',function(){
             $("#yyBMapwrapper").remove();
             })
             }
             })*/
        }
        $(mId+" .clickDetail,"+mId+" .clickDetail_only").on('click',function(e){
            if($("body").hasClass("edit")){
                wapUtil.showTip("编辑状态不可点击","1");
            }else{
                $("body").animate({scrollTop:0},0);
                var $el=$(e.currentTarget);
                wapUtil.getListBooking($el.data("code"),$el.data("class"),msgStatus.data.msgCheck,mdId);
            }
        })

    })
};


/*wapUtil.getProjectList = function(pID, mdId, flag, isNewTemp) {
 isNewTemp ? $("#" + mdId + " #oldStyle").remove() : '';
 $.when(wapUtil.commonThird("listMemberProject", "yy")).done(function(data) {
 var html = '';
 if (mdId) {
 var mId = '#' + mdId;
 } else {
 var mId = '';
 }
 if (flag == "1") {
 $.each(data.data,
 function(i, item) {
 if (item.projectId == pID) {
 html += '<div data-id="' + item.projectId + '" data-code="' + item.projectCode + '" class="clickDetail_only pub_bg pub_o_bg"><a><span>预约服务</span></a></div>';
 }
 });
 $(mId + " #projectList").html(html);
 } else {
 html = '<ul>';
 $.each(data.data,
 function(i, item) {
 if (pID && pID.indexOf(String(item.projectId)) != -1) {
 var timeType = item.eventDurationUnitType == 1 ? '分钟': '小时';
 var lng = item.eventLongitude,
 lat = item.eventLatitude,
 labelTxt = item.eventLocation;
 var projectDescription = item.projectDescription ? item.projectDescription: '';
 var mapHtml = '',
 aClass = '';
 if (lng && lat) {
 mapHtml = '<div class="addrIcon icon iconfont kenfor-icons-sc-Other7" data-lng="' + lng + '" data-lat="' + lat + '"><input type="hidden" value="' + labelTxt + '"></div>';
 } else {
 aClass = 'all';
 }
 html += '<li data-id="' + item.projectId + '" data-code="' + item.projectCode + '" class="clickDetail pub_border_t pub_o_b_t"><a href="javascript:void(0)" class="' + aClass + '"><p class="pub_color pub_o_color">' + item.projectName + '</p><span>' + item.resourcesNum + '个服务人员</span><span>服务时长' + item.eventDurationValue + timeType + '</span><span>' + projectDescription + '</span></a>' + mapHtml + '</li>';
 }
 });
 html += '</ul>';
 $(mId + " #projectList").html(html);
 $(".addrIcon").on('click',
 function(e) {
 if ($("body").hasClass("edit")) {
 wapUtil.showTip("编辑状态不可点击", "1");
 } else {
 var el = $(e.currentTarget);
 var txt = el.find("input").val();
 var lng = el.data("lng");
 var lat = el.data("lat");
 $("#yyBMapwrapper").remove();
 el.parents("li").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div><div id="mapIcon" class="icon iconfont kenfor-icons-upward1"></div></div>');
 $("#yyBMapwrapper").css("margin-top", "10px");
 wapUtil.renderBMap("yyMapWrap", lng, lat, txt);
 $("#mapIcon").on('click',
 function() {
 $("#yyBMapwrapper").remove();
 })
 }
 })
 }
 $(mId + " .clickDetail a," + mId + " .clickDetail_only").on('click',
 function(e) {
 if ($("body").hasClass("edit")) {
 wapUtil.showTip("编辑状态不可点击", "1");
 } else {
 var $el = $(e.currentTarget).hasClass("clickDetail_only") ? $(e.currentTarget) : $(e.currentTarget).parent();
 wapUtil.getListBooking($el.data("code"), mdId);
 }
 })

 })
 }*/
wapUtil.getListBooking = function(code,type,msgStatus,mdId,isModify){ //项目ID,项目类型，短信状态，是否刷新页面
    var proType=type||'01',portName=proType=='01'?'listProjectABooking':'listProjectABookingMany',isModify=isModify||'';
    var params={projectCode:code};
    $("#projectInfo").remove();
    $('body').append('<div id="projectInfo" data-code="'+code+'" data-type="'+proType+'" data-status="'+msgStatus+'"></div>');
    $.when(wapUtil.commonThird(portName,"yy",params)).done(function(data){
        var tempData=data.data;
        console.log(tempData);
        if(proType=='01'){
            if(tempData.dateList.length>0){
                var minDay=tempData.dateList[0].date+' 00:00:00';
                var maxDay=tempData.dateList[tempData.dateList.length-1].date+' 23:59:59';
                var lng=tempData.eventLongitude,lat=tempData.eventLatitude,labelTxt=tempData.eventLocation;
                tempTime=tempData.dateList;
                var html='';
                html+='<div id="windowPop"><input id="msgCheck" type="hidden" value="'+msgStatus+'"><input id="projectCode" type="hidden" value="'+code+'"><input id="selectResourcesWay" type="hidden" value="'+tempData.selectResourcesWay+'"><input id="eventDuration" type="hidden" value="'+tempData.eventDuration+'"><input id="projectName" type="hidden" value="'+tempData.projectName+'">';
                /*				html+='<div class="windowPop_head"><span class="icon iconfont kenfor-icons-back5"></span></div>';*/
                html+='<div class="windowPop_body">';
                html+='<div class="windowPop_content">';
                html+='<div class="re_service">';
                html+='<label>'+tempData.projectName+'</label>';
                html+=tempData.projectIntroduce?'<span>简介：</span><text>'+tempData.projectIntroduce+'</text>':'';
                html+='</div>';
                html+='<div class="setInfo">';
                html+='<div class="setInfo_list" onclick="laydate({elem:\'#bookingDay\', start: \''+minDay+'\',fixed:true,min: \''+minDay+'\', max:\''+maxDay+'\'})"><label>选择日期和时间</label><p class="re_select"><span id="bookingDay">未指定</span><span id="bookingTime" data-endtime=""></span><i class="icon iconfont kenfor-icons-forward1"></i></p></div>';
                html+='<div class="setInfo_list" onclick="wapUtil.layService()"><label>服务人员(可选)</label><p class="re_select"><span id="staffName" data-id="">未指定</span><i class="icon iconfont kenfor-icons-forward1"></i></p></div>';
                html+='</div>';
                html+='<div class="re_title">客户信息</div>';
                html+='<div class="setInfo">';
                html+='<div class="setInfo_list"><input class="enterInput" type="text" placeholder="姓名" name="re_info" value=""></div>';
                html+='<div class="setInfo_list"><input class="enterInput" type="tel" placeholder="手机号码" name="re_phone" id="re_phone" value=""></div>';
                if(msgStatus==1){
                    html+='<div class="setInfo_list"><input class="enterInput" type="tel" placeholder="验证码" name="re_code"><span class="v_code" id="v_code">发送验证码</span></div>';
                }
                html+='</div>';
                html+='<div class="re_title">留言</div>';
                html+='<textarea class="remark" id="re_remark" placeholder="有其他备注请留言" maxlength="255"></textarea>';
                html+='</div></div>';
                /*				html+='<div class="windowPop_bottom yy_bgColor" onclick="wapUtil.saveData()"><span>提交预约</span></div>';*/
                html+='</div>';
                wapUtil.hiddenPop();
                $("body").addClass("windowPopBody");
                $("body").addClass("only_"+mdId);
                $("#web_design_main").append(html);
                $(".windowPop_body .windowPop_content").css({"padding-bottom":"42px"});
                $("body").append('<div class="windowPop_head"><span class="icon iconfont kenfor-icons-back5"></span>服务详情</div><div id="saveData" class="windowPop_bottom yy_bgColor edit_bg"><span>提交预约</span></div>');
                $("html,body").animate({"scrollTop":top});
                //document.documentElement.style.overflowY = 'hidden';
                wapUtil.hiddenDesign();
                if(lng && lat){
                    $("#windowPop .windowPop_content").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div></div>');
                    $("#yyBMapwrapper").css({"border-top":"15px solid #f8f8f8","z-index":"999"});
                    wapUtil.renderBMap("yyMapWrap",lng,lat,labelTxt);
                };

/*                $(".showInfo_main").delegate('.showInfo a','click',function(e){
                    wapUtil.saveDataMany($(e.currentTarget).attr('data-s'),$(e.currentTarget).attr('data-e'),$(e.currentTarget).attr('data-id'))
                })*/

                $("#saveData").unbind().on('click',function(){
                    wapUtil.saveData(mdId);
                });
                $(".windowPop_head span").unbind().on('click',function(){
                    wapUtil.hiddenPop();
                    $(".windowPop_bottom,.windowPop_head").remove();
                    $("body").removeClass("only_" + mdId);
                })
                $("#windowPop .v_code").unbind().on('click',function(){
                    wapUtil.getFwCode("reser","re_phone","v_code")
                })
            }else{
                wapUtil.showTip("预约已满","2");
            }
        }else{
            if(tempData){
                $("#projectInfo").remove();
                $('body').append('<div id="projectInfo" data-code="'+code+'" data-type="'+type+'" data-status="'+msgStatus+'"></div>');
                /*				var minDay=tempData.dateList[0].date+' 00:00:00';
                 var maxDay=tempData.dateList[tempData.dateList.length-1].date+' 23:59:59';
                 tempTime=tempData.bookingList;*/
                var lng=tempData.eventLongitude,lat=tempData.eventLatitude,labelTxt=tempData.eventLocation,html='';
                html+='<div id="windowPop"><input id="msgCheck" type="hidden" value="'+msgStatus+'"><input id="projectCode" type="hidden" value="'+code+'"><input id="projectName" type="hidden" value="'+tempData.projectName+'">';
                /*				html+='<div class="windowPop_head"><span class="icon iconfont kenfor-icons-back5"></span></div>';*/
                html+='<div class="windowPop_body">';
                html+='<div class="windowPop_content">';
                html+='<div class="re_service">';
                html+='<label>'+tempData.projectName+'</label>';
                html+=tempData.projectIntroduce?'<span>简介：</span><text>'+tempData.projectIntroduce+'</text>':'';
                html+='</div><div class="showInfo_main">';
                $.each(tempData.bookingList,function(i,item){
                    var aHtml=item.f==0?'立即预约':'预约已满';
                    var aClass=item.f==0?'':'fw-disable';
                    html+='<div class="showInfo"><p>服务时间</p><span>'+item.s+' 至 '+item.e+'</span><p>已预约人数</p><span>'+item.u+'/'+item.m+'</span><a class="'+aClass+' yy_bgColor edit_bg" data-s="'+item.s+'" data-e="'+item.e+'" data-id="'+item.p+'">'+aHtml+'</a></div>';
                });
                html+='</div></div>';
                /*				html+='<div class="windowPop_bottom yy_bgColor" onclick="wapUtil.saveData()"><span>提交预约</span></div>';*/
                html+='</div>';
                if(isModify){
                    $("#windowPop").remove();
                }else{
                    wapUtil.hiddenPop();
                    $("body").addClass("windowPopBody");
                    $("body").addClass("only_"+mdId);
                }
                $("#web_design_main").append(html);
                $("body").append('<div class="windowPop_head"><span class="icon iconfont kenfor-icons-back5"></span>服务详情</div><!--<div class="windowPop_bottom yy_bgColor" onclick="wapUtil.saveData()"><span>提交预约</span></div>-->');
                wapUtil.hiddenDesign();
                if(lng && lat){
                    $("#windowPop .windowPop_content").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div></div>');
                    $("#yyBMapwrapper").css({"border-top":"15px solid #f8f8f8","z-index":"999"});
                    wapUtil.renderBMap("yyMapWrap",lng,lat,labelTxt);
                }
                $(".showInfo_main").delegate('.showInfo a','click',function(e){
                    wapUtil.saveDataMany($(e.currentTarget).attr('data-s'),$(e.currentTarget).attr('data-e'),$(e.currentTarget).attr('data-id'),mdId)
                })
                /*				$(".showInfo a").unbind().on('click',function(e){
                 wapUtil.saveDataMany($(e.currentTarget).attr('data-s'),$(e.currentTarget).attr('data-e'),$(e.currentTarget).attr('data-id'))
                 })*/
                $(".windowPop_head span").unbind().on('click',function(){
                    wapUtil.hiddenPop();
                    $(".windowPop_bottom,.windowPop_head").remove();
                    $("body").removeClass("only_" + mdId);
                });
                /*				$("#windowPop .v_code").on('click',function(){
                 wapUtil.getFwCode("reser","re_phone","v_code")
                 })*/
            }
        }
    })
};
wapUtil.hiddenPop=function(){
    $("#popStyle").remove();
    $("#design_main").show();
    $("#windowPop").remove();
    $(".windowPop_many，#projectInfo").remove();
    $("body").removeClass("windowPopBody");
    $("#bookingDay,#staffName").html("未指定");
    $("#bookingTime").html("");
    $("#laydate_time_define > p>span").html('未指定').attr("data-endtime",'').attr("data-people",'').attr("data-name",'')
};
wapUtil.hiddenDesign=function(){
   // $("body").append('<style id="popStyle">#design_main{display:none!important}</style>');
   // $(".windowPopBody #design_main").css({"display":"none!important"})
};
wapUtil.layService=function(){
    var $date=$("#bookingDay").html();
    var $time=$("#bookingTime").html();
    if($time && !($date=='' || $date=='未指定')){
        var html='',$staff=$("#staffName");
        html+='<div class="reservation_staff"><div class="staff_list"><div class="laytime_title">选择服务人员<span><i class="icon iconfont kenfor-icons-back5"></i></span></div><ul>' ;
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
        html+='</ul><div class="staff_bottom yy_bgColor edit_bg">确认</div></div></div></div>';
        $("body").append(html);
        $(".staff_list ul li").on('click',function(){
            $(".staff_list ul li").removeClass('staff_click');
            $(this).removeClass('staff_click').addClass("staff_click");
            $staff.html($(this).find("span").html());
            $staff.attr("data-id",$(this).attr("data-id"));
        })
        $(".staff_bottom,.staff_list ul li").on('click',function(e){
            var temp=$(e.currentTarget).find(".staff_click");
            if(temp.length>0){
                $staff.html(temp.find("span").html());
                $staff.attr("data-id",temp.attr("data-id"));
            }else{
                $staff.html($(".staff_list .staff_click span").html());
                $staff.attr("data-id",$(".staff_list .staff_click").attr("data-id"));
            }
            $(".reservation_staff").remove();
        })
        $(".laytime_title span").on('click',function(e){
            $(".reservation_staff").remove();
        })

    }else{
        wapUtil.showTip("请选择时间","1");
    }
};
//处理中间日期预约已满
wapUtil.checkTimeValue=function(y,m,d){
    var m=m<10?"0"+m:m,d=d<10?"0"+d:d;
    var date=y+"-"+m+"-"+d;
    var date1 = new Date(date),flag=false,$el=$("#laydate_time_define");
    $.each(tempTime,function(i,item){
        var date2 = new Date(item.date);
        if(date1.getTime() == date2.getTime()){
            flag=true;
            return false
        }
    });
    if(flag){
        $("#laydate_time_tip").remove();
        $el.attr("onclick",'wapUtil.layTime()');
    }else{
        $el.attr("onclick",'');
        $("#laydate_ok").addClass('disable');
        $("#laydate_time_tip").remove();
        $el.prepend('<div id="laydate_time_tip" class="reser-code-remind">无可预约时间,请选择其它日期！</div>')
    }
    return flag
};
wapUtil.layTime=function(){
    var $dom=$("#laydate_table .laydate_click");
    var $obj=$("#laydate_time_define span");
    if($dom.length>0 && !$dom.hasClass("laydate_void")){
        var html='';
        html+='<div class="laytime"><div class="laytime_title">选择预定时间<span onclick="wapUtil.hideLayTime()"><i class="icon iconfont kenfor-icons-back5"></i></span></div><ul>' ;
        console.log(tempTime);
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
        html+='</ul><div class="laytime_bottom yy_bgColor edit_bg">确认</div></div> </div>';
        $(".laydate_body #laydate_box_yy").append(html);
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
            wapUtil.hideLayTime();
        })
        $(".laytime").siblings().hide();
    }
};
wapUtil.hideLayTime=function(){
    wapUtil.clickOk();
    $(".laytime").siblings().show();
    $(".laytime").remove();
};
wapUtil.clickOk=function(){
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

};
wapUtil.saveData=function(mdId){
    require(["jquery","jquery.cookie"], function ($) {
        $(".windowPop_bottom").removeClass("yy-disable").addClass("yy-disable");
        var $day=$("#bookingDay"),$time=$("#bookingTime");
        var $projectCode=$("#projectCode").val(),
            $projectName=$("#projectName").val(),
            $bookingName=$("input[name=re_info]").length>0?$("input[name=re_info]").val().trim():$("input[name=re_info]").val(),
            $bookingComment=$("#re_remark").val().substr(0,255),
            $resourcesId=$("#staffName").attr("data-id"),
            $msgCheck=$("#msgCheck").val(),
            $bookingMobile=$("input[name=re_phone]").length>0?$("input[name=re_phone]").val().trim():$("input[name=re_phone]").val(),
            $phoneCode=$("input[name=re_code]").length>0?$("input[name=re_code]").val().trim():'',
            $bookingStartTime=$day.html()+$time.html(),
            $bookingEndTime=$day.html()+' '+$time.attr("data-endtime"),
            $projectClass='01';
        //$eventDuration=$("#eventDuration").val();
        //手机验证格式
        var reg = visPhoneReg,
            reg1 = new RegExp(/^\d{6}$/);
        if($msgCheck==1){// 1需要手机验证
            $phoneCode=$("input[name=re_code]").val().trim();
        }
        var errorTip=function(tips){
            wapUtil.showTip(tips,"1");
            $(".windowPop_bottom").removeClass("yy-disable");
            return false
        }
        if($day.html()=='' || $day.html()=='未指定' || $time.html()==''){
            errorTip("请选择日期和时间");
        }else if($resourcesId=='' || $resourcesId=='未指定') {
            errorTip("请选择服务人员");
        }else if($bookingName=='') {
            errorTip("请输入姓名");
        }else if($bookingMobile == ""){
            errorTip("请输入手机号码");
        }else if(reg.test($bookingMobile) == false){
            errorTip("请输入正确的手机号码");
        }else if($msgCheck==1 && ($phoneCode == "" || reg1.test($phoneCode) == false)){
            errorTip("请确保验证码输入正确");
        } else{
            var $dom=$(".windowPop_head,#windowPop .windowPop_body,.windowPop_bottom");
            $dom.hide();
            var html='';
            html+='<div class="windowPop_repeat"><div class="windowPop_repeat_title"><span class="icon iconfont kenfor-icons-back5"></span>'+$projectName+'</div><ul>';
            html+='<li><span>预约时间</span>'+$bookingStartTime+' - '+$time.attr("data-endtime")+'</li>';
            html+='<li><span>姓名</span>'+$bookingName+'</li>';
            html+='<li><span>手机号码</span>'+$bookingMobile+'</li>';
            html+='<li><span>留言</span>'+$bookingComment+'</li>';
            html+='</ul><div  class="windowPop_repeat_bottom yy_bgColor edit_bg">确认</div></div>';
            $("#windowPop").append(html);
            $(".windowPop_repeat_bottom,.windowPop_repeat_title span").on('click',function(e){
                if($(e.currentTarget).hasClass("windowPop_repeat_bottom")){
                    $(e.currentTarget).removeClass("yy-disable").addClass("yy-disable");
                    $.cookie('yyCookie', '', {expires: -1}); // 删除旧的cookie
                    var a=$bookingStartTime,b=$time.attr("data-endtime"),
                        tempDate= a.substring(0, a.length-3)+'-'+ b.substring(0, b.length-3);
                    var yyCookie = JSON.stringify({"yyProName":$projectName,"yyDate":tempDate,"yyName":$bookingName,"yyPhone":$bookingMobile,"yyContent":$bookingComment});
                    $.cookie("yyCookie",yyCookie,{expires:1}); //再存储cookie
                    var params={projectCode:$projectCode,phoneCode:$phoneCode,bookingName:$bookingName,bookingComment:$bookingComment,bookingMobile:$bookingMobile,phoneNum:$bookingMobile,bookingStartTime:$bookingStartTime,bookingEndTime:$bookingEndTime,resourcesId:$resourcesId,projectClass:$projectClass};
                    wapUtil.savePort(params,'01',mdId);
                }else{
                    $("#windowPop .windowPop_repeat").remove();
                    $dom.show();
                    $(".windowPop_bottom").removeClass("yy-disable");
                    return false
                }
            });
        }
    })
};
wapUtil.saveDataMany=function(timeS,timeE,pId,mdId){
    require(["jquery","jquery.cookie"], function ($) {
        $(".windowPop_bottom").removeClass("yy-disable").addClass("yy-disable");
        var $day=$("#bookingDay"),$time=$("#bookingTime");
        var html='',
            $projectCode=$("#projectCode").val(),
            $projectName=$("#projectName").val(),
            $msgCheck=$("#msgCheck").val(),
            $bookingName='', $bookingComment='', $bookingMobile='', $phoneCode='',$projectClass='02';
        var checkValue=function(){
            $bookingName=$("input[name=re_info]").length>0?$("input[name=re_info]").val().trim():'';
            $bookingComment=$("#re_remark").val().substr(0,255);
            $bookingMobile=$("input[name=re_phone]").length>0?$("input[name=re_phone]").val().trim():'';
            var flag=true;
            //手机验证格式
            var reg = visPhoneReg,
                reg1 = new RegExp(/^\d{6}$/);
            if($msgCheck==1){// 1需要手机验证
                $phoneCode=$("input[name=re_code]").val().trim();
            };
            var errorTip=function(tips){
                wapUtil.showTip2(tips,"1");
                $(".windowPop_bottom").removeClass("yy-disable");
                flag=false
            };
            if($bookingName=='') {
                errorTip("请输入姓名");
            }else if($bookingMobile == ""){
                errorTip("请输入手机号码");
            }else if(reg.test($bookingMobile) == false){
                errorTip("请输入正确的手机号码");
            }else if($msgCheck==1 && ($phoneCode == "" || reg1.test($phoneCode) == false)){
                errorTip("请确保验证码输入正确");
            } else{
                flag=true
            };
            return flag;
        };
        var $dom=$(".windowPop_head");
        $dom.hide();
        html+='<div class="windowPop_many"><div class="windowPop_many_content"><b><i class="icon iconfont kenfor-icons-off1"></i></b>';
        html+='<div class="showInfo"><p>'+$projectName+'</p><span>服务时间：</span><span>'+timeS+' 至 '+timeE+'</span></div>';
        html+='<div class="re_title">客户信息</div>';
        html+='<div class="setInfo">';
        html+='<div class="setInfo_list"><input class="enterInput" type="text" placeholder="姓名" name="re_info" value=""></div>';
        html+='<div class="setInfo_list"><input class="enterInput" type="tel" placeholder="手机号码" name="re_phone" id="re_phone" value=""></div>';
        if($msgCheck==1){
            html+='<div class="setInfo_list"><input class="enterInput" type="tel" placeholder="验证码" name="re_code"><span class="v_code" id="v_code">发送验证码</span></div>';
        }
        html+='</div>';
        html+='<div class="re_title">留言</div>';
        html+='<textarea class="remark" id="re_remark" placeholder="有其他备注请留言" maxlength="255"></textarea>';
        html+='<div class="windowPop_bottom yy_bgColor edit_bg"><span>提交预约</span></div>';
        html+='</div></div>';
        $("body").append(html);
        /*		$("html,body").animate({"scrollTop":top});
         $("#windowPop").css("height",$(window).height()+"px");
         $(".windowPop_body").css("overflow",'hidden');
         document.documentElement.style.overflowY = 'hidden';
         */
        $("body").css({"position":'fixed',"left":'0',"right":'0'});
        $(".windowPop_many .windowPop_bottom,.windowPop_many .windowPop_many_content i").on('click',function(e){
            /*			$("#windowPop").css("height",'auto');
             $(".windowPop_body").css("overflow",'auto');*/
            if($(e.currentTarget).hasClass("windowPop_bottom")){
                $(e.currentTarget).removeClass("yy-disable").addClass("yy-disable");
                if(checkValue()){
                    $.cookie('yyCookie', '', {expires: -1}); // 删除旧的cookie
                    var tempDate= timeS+' 至 '+timeE;
                    var yyCookie = JSON.stringify({"yyProName":$projectName,"yyDate":tempDate,"yyName":$bookingName,"yyPhone":$bookingMobile,"yyContent":$bookingComment});
                    $.cookie("yyCookie",yyCookie,{expires:1}); //再存储cookie
                    var params={projectCode:$projectCode,phoneCode:$phoneCode,bookingName:$bookingName,bookingComment:$bookingComment,bookingMobile:$bookingMobile,phoneNum:$bookingMobile,bookingStartTime:timeS,bookingEndTime:timeE,projectPlanId:pId,projectClass:$projectClass};
                    wapUtil.savePort(params,'02',mdId);
                }
            }else{
                $(".windowPop_many").remove();
                $dom.show();
                $(".windowPop_bottom").removeClass("yy-disable");
                $("body").css("position",'static');
                return false
            }
        });
        $(".windowPop_many .v_code").on('click',function(){
            wapUtil.getFwCode("reser","re_phone","v_code")
        });
    })
};
wapUtil.savePort=function(params,type,mdId){
    require(["jquery","html2canvas"],function($,html2canvas){
        var flag=false,isPc=true,serviceType=type||'01',portName=serviceType=='01'?'addBookingV2':'addBookingV2',domClass=serviceType=='01'?'windowPop_repeat_bottom':'windowPop_bottom';
        var userAgentInfo = navigator.userAgent;//获取游览器请求的用户代理头的值
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];//定义移动设备数组
        for (var v = 0; v < Agents.length; v++) {
            //判断是否是移动设备
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                isPc= false;
                break;
            }
        }
        $.when(wapUtil.commonThird(portName,"yy",params)).done(function(data){
            $("."+domClass).removeClass("yy-disable");
            if(data.result == "SUCCESS"){
                var rHtml='',yyCookie = JSON.parse($.cookie('yyCookie'));
                /*			if(isPc){//电脑版
                 rHtml+='<div class="windowPop_repeat_title"><span class="icon iconfont kenfor-icons-back5"></span></div>';
                 }*/
                rHtml+='<div class="windowPop_repeat_title"><span class="icon iconfont kenfor-icons-back5"></span></div>';
                var tips=data.data.bookingStatus==0?'提交成功（等待确认）':'预约成功！';
                rHtml+='<div class="windowPop_repeat_print">'+
                    '<div class="windowPop_sucess_title">'+tips+'<span>'+yyCookie.yyProName+'</span></div>'+
                    '<div class="windowPop_sucess_code">本次预约码 <span class="edit_color">'+data.data.bookingCode+'</span></div>'+
                    '<div  class="qrcode_content">'+
                    '<div class="qrcode"></div>'+
                    '<div class="barcode"><img id="barcode1"></div>'+
                    '</div>'+
                    '<div class="project_content">'+
                    '<p>服务项目信息</p>'+
                    '<div class="list"><span>服务时间</span>'+yyCookie.yyDate+'</div>'+
                    '<div class="list"><span>姓名   </span>'+yyCookie.yyName+'</div>'+
                    '<div class="list"><span>手机号码</span>'+yyCookie.yyPhone+'</div>'+
                    '<div class="list"><span>留言 </span>'+yyCookie.yyContent+'</div>'+
                    '</div>'+
                    '<div class="windowPop_repeat_print_bottom"><div><a href="#" class="voucher" download="Appointment certificate">';
                rHtml+=isPc?'下载预约凭证':'长按保存预约凭证';
                rHtml+='</a><!--<a href="#" class="yy_bgColor over_print">完成查询</a>--></div><p>本系统由iYong.com提供</p></div></div>';
                /*				rHtml+='<div  class="windowPop_repeat_bottom yy_bgColor">返回</div>';*/
                //wapUtil.hiddenPop();
                if(serviceType=='01'){
                    $(".windowPop_repeat").remove();
                }else{
                    $(".windowPop_many").remove();
                    $(".windowPop_body").hide();
                    $("body").css("position",'static');
                };
                $("#windowPop").append(rHtml);
                if(isPc){//电脑版
                    $(".windowPop_repeat_print").css({'padding':'15px 0'})
                }
                $.when(wapUtil.createQRcode(data.data.bookingCode,".qrcode"),wapUtil.createBarcode(data.data.bookingCode,"#barcode1")).done(function(){
                    //$(".windowPop_repeat_title").hide();
                    $("body,html").animate({scrollTop:0},0);
                    wapUtil.createImg(html2canvas,".windowPop_repeat_print",data.data.bookingCode,isPc);
                    //rHtml+='<div class="windowPop_repeat_title"><span class="icon iconfont kenfor-icons-back5"></span></div>';

                    //$(".windowPop_repeat_title").show();
                });
                $("#windowPop").delegate('.windowPop_repeat_title span','click',function(e){
                    if(serviceType=='01'){
                        $("body").removeClass("windowPopBody");
                        wapUtil.hiddenPop();
                        $(".windowPop_head,.windowPop_bottom").remove();
                    }else{
                        var $el=$("#projectInfo");
                        wapUtil.getListBooking($el.data("code"),$el.data("type"),$el.data("status"),mdId,1);
                        $(".windowPop_repeat_title,.windowPop_repeat_print").remove();
                        $(".windowPop_body,.windowPop_head").show();
                        $("#windowPop").css("height",'auto');
                        document.documentElement.style.overflowY = 'scroll';
                    };
                });

            }else{
                var tips=(data.errorMsg && data.errorMsg.errorMsg)?data.errorMsg.errorMsg:'获取数据失败';
                serviceType=='01'?wapUtil.showTip(tips,1.5):wapUtil.showTip2(tips,1.5);
            }
        })
    })
};
wapUtil.createQRcode=function(code,el){
    var defer = $.Deferred();
    require(["jquery","jquery.qrcode.min","utf"],function(){
        $(el).qrcode({
            width:120,
            height:120,
            text:code
        });
        var image = new Image();
        //$("body").append($(el).children('canvas')[0]);
        image.src=$(el).children('canvas')[0].toDataURL("image/png");
        $(el).html(image);
        defer.resolve();
    });
    return defer.promise();
};
wapUtil.createBarcode=function(code,el){
    var defer = $.Deferred();
    require(["jquery","JsBarcode.all"],function(){
        var options = {
            /*			width: 1.5,//较细处条形码的宽度
             height: 40, //条形码的宽度，无高度直接设置项，由位数决定，可以通过CSS去调整，见下 quite: 10, format: "CODE128",*/
            displayValue: false//是否在条形码下方显示文字
            /*			font:"monospace",
             textAlign:"center",
             fontSize: 12,
             backgroundColor:"",
             lineColor:"#000"//条形码颜色*/
        }
        JsBarcode(el, code,options);
        defer.resolve();
    });
    return defer.promise();
};
wapUtil.createImg=function(html2canvas,el,code,isPc){
    var targetDom = $(el);
    var copyDom = targetDom.clone(),width=targetDom.width(),height=targetDom.height();
    copyDom.width(width + "px");
    copyDom.height(height + "px");
    $('.windowPop_repeat_print').append(copyDom);
    if(!isPc){//移动端
        var scaleBy = 5;
        var canvas = document.createElement('canvas');
        canvas.width = width * scaleBy;
        canvas.height = height * scaleBy+460;
        canvas.style.width = width * scaleBy + 'px';
        canvas.style.height = height * scaleBy + 'px';
        var context = canvas.getContext('2d');
        context.scale(scaleBy, scaleBy);
        html2canvas(copyDom, {
            allowTaint: true,
            taintTest: false,
            background:"#ffffff",
            /*						scale:2,*/
            canvas:canvas,
            onrendered: function (canvas) {
                var image = canvas.toDataURL("image/png");
                //$(".voucher").attr("href",image);
                //$("#windowPop").prepend('<div class="windowPop_repeat_title"><span class="icon iconfont kenfor-icons-back5"></span></div>');

                var pHtml = "<div class='picEl'><img id='touchID' src=" + image + " /></div>";
                $("#windowPop .voucher").html('下载预约凭证');
               // $('.windowPop_repeat_print').html(pHtml);
               // $(".windowPop_repeat_print img").css("width",width+"px");//在将放大的图片用css缩小,在手机上就非常清晰了*/
               // $('.windowPop_repeat_print').append(pHtml);
                $("#windowPop").delegate('.voucher','click',function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $('.windowPop_repeat_print').html(pHtml);    
                    $(".windowPop_repeat_print img").css("width",width+"px");
                });
            }
        });
    }else{//PC端
        html2canvas(copyDom, {
            allowTaint: true,
            taintTest: false,
            background:"#ffffff",
            onrendered: function (canvas) {
                var image = canvas.toDataURL("image/png");
                $(".voucher").attr("href",image);
            }
        });
    }
};
wapUtil.getYyCode=function(){
    var rPhone = $("input[name=reserPhone]").val().trim();
    //手机验证格式
    var phoneReg = visPhoneReg;
    if (rPhone == "") {
        wapUtil.showTip("请输入手机号码");
        return false;
    }else if(phoneReg.test(rPhone) == false){
        wapUtil.showTip("请输入正确的手机号码");
        return false;
    };
    var d={bookingMobile:rPhone};
    $.when(wapUtil.commonThird("queryBookingNum","yy",d)).done(function(res){
        if(res.data[0].bookingNum==0){
            wapUtil.showTip("此手机号未预约过服务");
            return false;
        }else{
            wapUtil.getFwCode('reser');
        }
    })
};
/*
 * 是否通过手机查询
 */
wapUtil.isSearchByPhone=function(){
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
    $.when(wapUtil.commonThird("queryMsgCheck","yy")).done(function(res){
        // 开启短信验证码
        $("input[name=reserCheckType]").val("0");
        $(".search-phone-box").hide();
        if(res.data.msgCheck ==0) {
            $(".search-botton").hide();
            /*$(".search-botton span").unbind()*/
        }else{
            $(".search-botton").show();
        }
    })
};
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
    /*    dom.focus(function(){
     $(this).change(function(){
     if($(this).val().length > 0){
     $resDom.addClass("phone-box-disabled");
     $resDom.find("input").attr({"disabled":true});
     if(type == 1) {
     $resDom.find(".sendCode-text").addClass("fw-disable");
     }
     }
     });
     });
     dom.blur(function(){
     if($(this).val().length < 1){
     $resDom.removeClass("phone-box-disabled");
     $resDom.find("input").attr({"disabled":false});
     if(type == 1){
     $resDom.find(".sendCode-text").removeClass("fw-disable");
     }
     }
     });*/
};
wapUtil.searchReservation = function(){
    if($('body').hasClass('edit')){
        wapUtil.showTip("当前为编辑状态，不可操作");
    }else{
        var vesion=$("input[name=reserPhoneV2]").length>0?'2.0':'1.0',
            rPhone = $("input[name=reserPhone]").val().trim(),
            rPhoneV2 = vesion=='1.0'?'':$("input[name=reserPhoneV2]").val().trim(),
            rCode = $("input[name=reserCode]").val().trim(),
            verfiyCode = $("input[name=verfiyCode]").val().trim(),
            reserCheckType = $("input[name=reserCheckType]").val();

        //手机验证格式
        var phoneReg = visPhoneReg;
        if(reserCheckType==0) {
            if (rCode == "") {
                wapUtil.showTip("请先输入预约码");
                return false;
            }
            if (vesion == '2.0' && rPhoneV2=='') {
                wapUtil.showTip("请输入手机号码");
                return false;
            }else if(vesion == '2.0' && phoneReg.test(rPhoneV2) == false) {
                wapUtil.showTip("请输入正确的手机号码");
                return false;
            }

        } else {
            if (rPhone == "") {
                wapUtil.showTip("请输入手机号码");
                return false;
            }else if(phoneReg.test(rPhone) == false){
                wapUtil.showTip("请输入正确的手机号码");
                return false;
            }
            //验证验证码
            if (verfiyCode == "") {
                wapUtil.showTip("请确保验证码输入正确", "2");
                return;
            }
        }

        //var phoneDis = $("input[name=reserPhone]").prop("disabled");

        var data = {};
        if(reserCheckType==0){
            data["bookingRecordType"]= '01';
            data["bookingCode"]= rCode;
            vesion=='2.0'?data["bookingMobile"]=rPhoneV2:'';
        }else{
            data["bookingRecordType"]= '02';
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
            var params=data,portName=vesion=='2.0'?'queryBookingRecordV2':'queryBookingRecord';
            $.when(wapUtil.commonThird(portName,"yy",params)).done(function(res){
                //查询成功 并返回信息填充数据
                console.log(res);
                $(".reser-title").html(res.data[0].bookingMobile);
                var listStr = "",len=res.data.length,lng='',lat='';
                listStr+='<div id="windowPop">';
                listStr+='<div class="windowPop_head"><span class="icon iconfont kenfor-icons-back5" onclick="wapUtil.backToSearch()"></span>查询结果</div>';
                listStr+='<div class="windowPop_body scrollbar"><div class="windowPop_content">';
                $.each(res.data,function(i,item){
                    var proType = item.projectClass?item.projectClass:'01',
                        startTime = proType=='01'?changeTimeFormat(new Date(item.bookingStartTime.replace(/-/g,'/')),1):item.bookingStartTime,
                        endTime = proType=='01'?changeTimeFormat(new Date(item.bookingEndTime.replace(/-/g,'/')),2):item.bookingEndTime;
                    if(i==0){
                        lng=item.eventLongitude;
                        lat=item.eventLatitude;
                        rlabelTxt=item.eventLocation;
                    }
                    var timeSta = "",staClass="",reserClass="";
                    if(vesion=='2.0'){
                        switch(item.bookingStatus)
                        {
                            case 0:
                                timeSta='待确认';
                                reserClass = "reser-code-remind";
                                break;
                            case 1:
                                timeSta='已确认';
                                reserClass = "reser-code-remind";
                                break;
                            case 2:
                                timeSta='已拒绝';
                                staClass = "reser-expired-state";
                                break;
                            case 3:
                                timeSta='已取消';
                                staClass = "reser-expired-state";
                                break;
                            case 4:
                                timeSta='已过期';
                                staClass = "reser-expired-state";
                                break;
                            case 5:
                                timeSta='完成';
                                reserClass = "reser-code-remind";
                                break;
                            default:
                                timeSta='完成';
                                reserClass = "reser-code-remind";
                        };
                        console.log(timeSta);
                    }else{
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
                    };
                    listStr += '<div class="res-item search-borderBtm '+ staClass +'">' +
                        '<ul class="clearfix">' +
                        '<li>'+ item.projectName +'</li>';
                    if(proType=='01'){
                        listStr += '<li>' +
                            '<span class="item-label">服务人员：</span>' +
                            '<span class="item-value">'+ item.resourcesName +'</span>' +
                            '</li>' ;
                    }
                    var shutComment=item.shutComment && item.shutComment!=''?'（'+item.shutComment+'）':'';
                    listStr += '<li>' +
                        '<span class="item-label">预约人：</span>' +
                        '<span class="item-value">'+ item.bookingName +'</span>' +
                        '</li>' +
                        '<li>' +
                        '<span class="item-label">服务时间：</span>' +
                        '<span class="item-value">'+ startTime +'-' + endTime +'</span>' +
                        '</li>' +
                        '<li class="'+ reserClass +'">' +
                        '<span class="item-label">预约码：</span>' +
                        '<span class="item-value">'+ item.bookingCode +'</span>' +
                        '</li>' +
                        '<li>' +
                        '<span class="item-label">预约状态：</span>' +
                        '<span class="item-value">'+ timeSta +shutComment+'</span>' +
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
                listStr+='</div></div></div>';
                wapUtil.hiddenPop();
                $("body").addClass("windowPopBody");
                $("#design_main").hide();
                $("body,html").animate({scrollTop:0},0);
                $("#web_design_main").append(listStr);
                var renMaps=function(el,rlng,rlat,rlabelTxt){
                    $("#yyBMapwrapper").remove();
                    if(rlng && rlat){
                        el?el.parents(".res-item").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div><div id="mapIcon" class="icon iconfont kenfor-icons-upward1"></div></div>'):$("#windowPop .windowPop_content>.res-item").append('<div id="yyBMapwrapper"><div id="yyMapWrap"></div></div>');
                        /*			$("#yyMapWrap").css({"height":"260px","z-index":"999"});*/
                        wapUtil.renderBMap("yyMapWrap",rlng,rlat,rlabelTxt);
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

                /*

                 $(".reser-content").html("");
                 $(".reser-content").append(listStr);

                 $(".mob-reservation").hide();
                 $(".mob-reserRes").fadeIn();*/
            })
        };
        if(reserCheckType==0 && vesion=='1.0'){
            bookingRecord();
        }else{
            var d={bookingMobile:reserCheckType==0?rPhoneV2:rPhone};
            $.when(wapUtil.commonThird("queryBookingNum","yy",d)).done(function(res){
                if(res.data[0].bookingNum==0){
                    wapUtil.showTip("此手机号未预约过服务");
                    return false;
                }else{
                    bookingRecord()
                }
            })
        };
    }
};
/*返回预约查询*/
wapUtil.backToSearch = function(){
    /*    $(".mob-reservation").show();
     $(".mob-reserRes").hide();*/
    wapUtil.hiddenPop()
};
/*编辑状态下提示*/
wapUtil.editReserTip = function(mdId, isNewTemp) { (mdId && isNewTemp) ? $("#" + mdId + " #oldStyle").remove() : '';
    $(".search-item input").click(function() {
        if ($('body').hasClass('edit')) {
            $(this).attr("disabled", true);
            wapUtil.showTip("当前为编辑状态，不可操作");
        }
    });
    if (!$('body').hasClass('edit')) {
        $(".search-item input").attr("disabled", false);
    }
}
wapUtil.renderBMap = function(el, lng, lat, labelTxt) {
    require(["async!BMap"],function() {
        var map = new BMap.Map(el); // 创建地图实例
        var point = new BMap.Point(lng, lat); // 创建点坐标
        var marker = new BMap.Marker(point); // 创建标注
        if (labelTxt) { // 创建备注
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
                padding: "0 8px"
            });
            marker.setLabel(label);
        }
        map.addOverlay(marker); // 将标注添加到地图中
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
        map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom();
    })
}
/* end of 预约组件 */

/*电子图册books(v1) start*/
//分页
wapUtil.setListBooksPage = function(mdId, num_entries, showCount) {
    require(["wap/jquery.pagination"],function() {
        var initPagination = function() {
            /*创建分页*/
            var langId = dataUtil.currentLangId();
            $("#Pagination_" + mdId).pagination(num_entries, {
                // first_text : langUtil.Global_first,
                // end_text : langUtil.Global_endPage,
                prev_text: langUtil.Global_prePage,
                next_text: langUtil.Global_nextPage,
                num_edge_entries: 1,
                num_display_entries: 6,
                pageSel: "#Pagination_" + mdId,
                callback: pageselectCallback,
                items_per_page: showCount
            });
        } ();

        function pageselectCallback(page_index, jq) {
            var max_elem = Math.min((page_index + 1) * showCount, num_entries);
            $("#bookList_" + mdId).html("");
            for (var i = page_index * showCount; i < max_elem; i++) {
                var resultId = $("#result_" + mdId).children("li").eq(i);
                var resultHtml = '';
                var data_img = resultId.data("img");
                var data_name = resultId.data("name");
                var data_bvrid = resultId.data("bvrid");
                resultHtml += '<li class="books_li" data-bvrid="' + data_bvrid + '"  style="height:auto;width:50%;">' + '<a href="displaybook.html?id=' + data_bvrid + '" target="_blank" title="' + data_name + '" class="books_link">' + '<div class="typeImg" title="' + data_name + '" ><img src="' + data_img + '"></div>' + '<div class="typeName">' + data_name + '</div>' + '</a>' + '</li>';
                $(resultHtml).appendTo($("#bookList_" + mdId));
            }
            wapUtil.toBooks(mdId);
        }
    });
};
//2展示方式
wapUtil.setBooksEffect = function(mdId, opp, delayTime, autoPlay) {
    var loop = false;
    if (autoPlay == "true") {
        if (opp == "true") {
            loop = true;
        }
    }
    require(["weuijs", "weui/js/swiper.min"],function() {
        var baseSet = {
            slidesPerView: 'auto',
            paginationClickable: false,
            spaceBetween: 10,
            preventClicks: true,
            /*默认true*/
            loop: loop
        }
        if (autoPlay == true) {
            if (opp == false) {
                baseSet.autoplay = delayTime;
            }
        }
        var listswipe = new Swiper("#bookswiper_list_" + mdId, baseSet);
        if (autoPlay == true) {
            if (opp == true) {
                if (timer) {
                    clearInterval(timer);
                }
                var timer = setInterval(function() {
                        listswipe.slidePrev();
                    },
                    delayTime);
            }
        }
        wapUtil.toBooks(mdId);
    });
};
//编辑判断
wapUtil.setImageFit = function(dom, mdId) {
    require(["imagefit"],function() {
        //$(dom).imagefit();
        var imgdefereds = [];
        var $imgs = $(dom + ' img');
        if ($imgs.length > 0) {
            $imgs.each(function() {
                var dfd = $.Deferred();
                $(this).bind('load',
                    function() {
                        dfd.resolve();
                    }).bind('error',
                    function() {
                        /*错误返回*/
                    });
                if (this.complete) dfd.resolve();
                imgdefereds.push(dfd);
            });
            $.when.apply(null, imgdefereds).done(function() {
                if (mdId) {
                    $(dom).imagefit(mdId);
                } else {
                    $(dom).imagefit();
                }
            });
        }
    });
};
wapUtil.toBooks = function(mdId) {
    wapUtil.setImageFit('#books_' + mdId + ' .typeImg', mdId);
    if (WebModel == "edit") {
        $('#books_' + mdId + ' a.books_link').on('click',
            function(e) {
                wapUtil.showTip('编辑状态，无法操作');
                return false;
            })
    }
};
wapUtil.setBooksList = function(mdId) {
    var $dom = $("#books_" + mdId + " .booksBox_view");
    var config = eval("(" + $dom.data("config") + ")"); //获取所需的配置信息
    if (config.styleMode == 0) {
        if (config.showMode == 0 && config.nums > 0) {
            wapUtil.setListBooksPage(mdId, config.nums, config.showCount);
        }
    } else {
        wapUtil.setBooksEffect(mdId, config.opp, config.delayTime, config.autoPlay);
    }
    wapUtil.toBooks(mdId);
}
/*电子图册books(v1) end*/

/*新版底部footer使用的方法-start-*/
//追加返回顶部按钮并监听滚动显示/隐藏返回顶部按钮
wapUtil.setToTop = function(mdId, toTopStyle, isShowToTop) {
    var mainDom = WebModel == "edit" ? $("#design_main") : $(window),
    // toTopBtnAddDom = WebModel=="edit"?$("#web_design_main"):$("body")
        toTopBtnAddDom = $("#web_design_main");
    if ($("body").find(".toTop_v2").length > 0) {
        $("body").find(".toTop_v2").remove();
    }

    if (isShowToTop == "1") {
        var toTopDom = '<div class="toTop_v2 edit_bg" onclick="wapUtil.backToTop();">';
        if (toTopStyle == "1") {
            toTopDom += '<div class="toTopIcon icon iconfont kenfor-icons-upward1"></div>';
        } else if (toTopStyle == "2") {
            toTopDom += '<div class="toTopIcon">TOP</div>';
        }
        toTopDom += '</div>'

        toTopBtnAddDom.append(toTopDom);

        if (mainDom.scrollTop() > 0) {
            $(".toTop_v2").css("display", "block");
        }

        mainDom.scroll(function() {
            if (mainDom.scrollTop() > 0) {
                $(".toTop_v2").css("display", "block");
            } else {
                $(".toTop_v2").css("display", "none");
            }
        });
    }
};
/*新版底部footer使用的方法-end-*/

/*网站服务service的“购物车”在设计后台处不可点击-start-*/
wapUtil.serviceMyCartClick=function(mdId)
{
    $(".fitem_mycart").click(function() {
        if ($("body").hasClass("edit")) {
            wapUtil.showTip("当前为编辑状态，不能进行此操作");
            return false;
        }
    });
};
/*网站服务service的“购物车”在设计后台处不可点击-end-*/
/*网站服务service的“电话”一项处理-start-*/
wapUtil.servicePhoneClick = function(mdId, phoneObjStr) {
    wapUtil.serviceMyCartClick(mdId); //兼容旧数据。以前“购物车”在设计后台处不可点击写在这里。
    
    // var phoneList = Array.from(JSON.parse(phoneListStr));
    var phoneObj=phoneObjStr?Object.create(JSON.parse(phoneObjStr)):{};

    $("#show-phone").click(function(event) {
        if ($("body").hasClass('edit')) {
            event.stopPropagation();
            //alert("该功能无法在桌面浏览器启动");
            wapUtil.showTip("当前为编辑状态，不能进行此操作");
            return false;
        } else {
            if ($(window).width() >= 900 && !(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
                event.stopPropagation();
                wapUtil.showTip("桌面端不能拨打电话！");
                return false;
            } else {
                if (phoneObj && phoneObj.value.length > 1) {
                    require(["weuijs"],function() {
                        var tempArr = [];
                        $.each(phoneObj.value,function(k, list)
                        {
                            var tempObj = {};
                            var phoneNum=list.value.replace(/-/g,"");
                            tempObj.text = '<a href="tel:' + phoneNum + '">' + list.name + '：' + list.value + '</a>';
                            tempObj.className = 'color-primary';
                            tempArr.push(tempObj);
                        });

                        $.actions({
                            title: phoneObj.name,
                            onClose: function() {
                                console.log("close");
                            },
                            actions: tempArr
                        });
                    });
                }
                else if(phoneObj && phoneObj.value.length==0)
                {
                    event.stopPropagation();
                    wapUtil.showTip("未添加电话，无法拨打！");
                    return false;
                }
            }
        }
    });
};
/*网站服务service的“电话”一项处理-end-*/

dataUtil.getWxJsShareApi=function(){
    var hostName=window.location.hostname;
    var ispg= 0;//默认公众号
    if(hostName=="xcx.iyong.com" || hostName=="xcx.kenfor.com" || hostName=="xcx-cs.iyong.com" || hostName=="xcx-fb.iyong.com"){//区分是否小程序
        ispg=1;
    }    

    $.ajax({
        url: "/w/wx/getWxJsApiConfig.do",
        type : "GET",
        data:{
            ispg:ispg,
            path:window.location.href.split('#')[0]
        },
        success: function (data) {
            if(data.result=="SUCCESS"){             
                
                require(["//res.wx.qq.com/open/js/jweixin-1.3.2.js"],function(wx){
                    wx.config({
                        debug: false,
                        appId: data.data.appId,
                        timestamp: data.data.timestamp,
                        nonceStr: data.data.nonce_str,
                        signature: data.data.signature,
                        //jsTicket:data.data.jsTicket,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'chooseWXPay'
                        ]
                    });
                    wx.ready(function(){
                        wx.onMenuShareTimeline(webSeoShareObj);
                        wx.onMenuShareAppMessage(webSeoShareObj);
                        wx.onMenuShareQQ(webSeoShareObj);
                        wx.onMenuShareQZone(webSeoShareObj);
                        wx.onMenuShareWeibo(webSeoShareObj);
                    });
                    wx.error(function (res) {
                        //alert(res.errMsg);
                        wapUtil.showTip(res.errMsg,"forbidden",3);
                    });
                });
            }else{
                //wapUtil.showTip("微信配置信息错误","forbidden");
            }
        }
    });
};

//文章评论
wapUtil.articleComment=function(json){
    var props = $.extend({
        articleId: '0',
        readPermission: 0,//阅读权限
        customerImg: '',//当前会员
        customerName: '',//当前会员账号
        isComment: '0', //是否开启评论
        picUrl:jsPath+"/member/images/memberImg.png",//默认头像
        loginUrl:'login.html',//登录跳转链接
        isService:'true',
        isCollection:"1"
    },json);
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
                    wapUtil.showTip("留言提交成功！");
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
                    if(data.length>0){
                    $.each(data,function(i,item){
                        var cImg=item.customerHeadImg==""?props.picUrl:item.customerHeadImg;
                        html+='<div class="article_comment_li">';
                        html+='<div class="article_comment_user"><span><img src="'+cImg+'" /></span>'+item.customerAccount+'</div>';
                        html+='<div>'+item.commentContent+'</div>';
                        if(item.replyList){
                            $.each(item.replyList,function(i,reply){
                                html+='<div class="article_comment_reply"><p class="article_comment_replyAdmin">'+langUtil.wMsg_adminReply+langUtil.Global_symbol+'</p>'+reply.replyContent+'</div>';
                            })
                        }
                        html+='</div>';
                    });
                    }else{
                        html+=langUtil.article_PageInfo;
                    }
                    $el.html(html);
                    if(res.data.totalRecord>pageMax){
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
                    };
                    $("#totalComment b").html(res.data.totalRecord);
                    $("#totalComment b").show();
                }
            }
        });
    };
    initDOM=function(){
        var $el=$(".article_comment_login"),customerPic=props.customerImg==""?props.picUrl:props.customerImg;
        var isFooter=$("#footer_ver_1").is(":hidden");
        if(props.isCollection=='1'){
            var collection='<span id="newsCollection" data-id="" class="icon iconfont kenfor-icons-collect"></span>',
            collectionClass='';
        }else{
            var collection='',
            collectionClass='no_collection';
        }
        var collection=props.isCollection=='1'?'<span id="newsCollection" data-id="" class="icon iconfont kenfor-icons-collect"></span>':'';
        var html='<div class="article_comment_login '+collectionClass+'">'+
            '<div class="article_comment_content">'+
            '<textarea id="commentText" placeholder="'+langUtil.article_placeholder+'"  maxlength="200"></textarea>'+
            '<div class="article_comment_submit icon iconfont kenfor-icons-scWeixin"></div>'+
            '</div>'+
            '<div class="article_comment_button">'+
            '<span id="totalComment" class="icon iconfont kenfor-icons-message2"><b></b></span>'+collection
            '</div>'+
            '<style>#service_ver_1{display:none}}</style>'+
        '</div>';
        $("#web_design_main").append(html);
        props.isService=="false"?$("#web_design_main").append('<style>#footer_ver_1{margin-bottom:50px;}</style>'):'';
        isFooter==true?$("#web_design_main").append('<style>.article_comment_list{margin-bottom:20px;}</style>'):'';
        $("body").delegate('.article_comment_submit,#newsCollection','click',function(event){
            if(event.currentTarget.id=="newsCollection"){
                props.readPermission==0?wapUtil.showTip("请先登录会员！"):wapUtil.setArticleCollection.setCollection(props.articleId);
            }else{
                props.readPermission==0 || props.isComment=="0"?wapUtil.showTip('请先登录会员！'):saveArticleComment();
            }
        });
        $("#commentText").focus(function(e){
            $('body').on('touchmove',function(event){event.preventDefault();});
        }).blur(function(){
            $('body').unbind('touchmove');
        });
    };
    if(props.isComment=="1"){
        initDOM();
        getArticleCommentList();
        wapUtil.setArticleCollection.getStates(props.articleId);
    }
};
wapUtil.setArticleCollection=(function(articleId){
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
                if(res.result=="SUCCESS" && res.data.rows.length>0){
                    $("#newsCollection").removeClass("on").addClass("on");
                    $("#newsCollection").attr("data-id",res.data.rows[0].articleCollectionRecordId);

                }else{
                    $("#newsCollection").removeClass("on");
                    $("#newsCollection").attr("data-id","");
                }
            }
        });
    };
    setCollection=function(articleId){
        var isCollection=$("#newsCollection").hasClass("on")?1:0;
        var postUrl,dataJson={};
        if(isCollection==1){
            postUrl="/w/article/deleteArticleCollectionRecord.do";
            dataJson={"articleId":articleId,"articleCollectionRecordId":$("#newsCollection").attr("data-id")};
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
                    var tips= isCollection==1?"成功取消收藏！":"成功加入收藏！";
                    getStates();
                    wapUtil.showTip(tips);
                }
            }
        });
    };
    return {
        getStates:getStates,
        setCollection:setCollection
    }
}());