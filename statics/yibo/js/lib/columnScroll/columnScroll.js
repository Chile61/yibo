/**
 * 以绝对定位的方法对通栏进行滚动切换
 */
(function (define) {
    define(['jquery',"jqueryui"], function ($) {
        return (function () {
            return {
                init: init
            };
            function init($obj, options) {
                var defaults = {
                    interTime: 2,
                    delayTime: 1,
                    autoScroll: false
                };
                var settings = $.extend(defaults, options);
                settings["$obj"] = $obj;
                settings["$page"] = $obj.children("div").children(".column-scroll-page");
                settings["$nav"] = $obj.children("ul").children("li");
                settings["$arrow"] = $obj.children(".scroll-arrow");
                settings["lock"] = true; //锁定点击 true开锁，false闭锁
                settings["mouseOut"] = true; //锁定点击 true开锁，false闭锁
                settings["$page"].eq(0).css("left", 0);
                if (settings["$page"].length) {
                    /* 初始化高度 */
                    /*var heights = [];
                     settings["$page"].each(function (i) {
                     heights.push($(this).height());
                     });
                     settings["$obj"].css("height", Math.max.apply(null, heights) + 20);
                     settings["$page"].children(".column-scroll-content").css("height", Math.max.apply(null, heights));*/
                    settings["$nav"].removeClass("on");
                    settings["$nav"].eq(0).addClass("on");
                    if (defaults.autoScroll) {
                        scroll(settings);
                        settings["$obj"].off("mouseenter.columnScroll").on("mouseenter.columnScroll", function () {
                            clearInterval(settings.timer);
                            settings["mouseOut"] = false;
                        });
                        settings["$obj"].off("mouseleave.columnScroll").on("mouseleave.columnScroll", function () {
                            clearInterval(settings.timer);
                            settings["mouseOut"] = true;
                            if (settings.autoScroll && settings.lock) {
                                scroll(settings);
                            }
                        });
                    }
                    settings["$nav"].off("click").on("click", function () {
                        if (settings["lock"]) {
                            clickNav($(this), settings);
                        }
                    });
                    settings["$arrow"].off("click").on("click", function () {
                        if (settings["lock"]) {
                            clickArrow($(this), settings);
                        }
                    });
                    if($("body").hasClass('edit')){
                        var colUtil = require("kenfor/columnUtils");
                        settings["$obj"].resizable({
                        handles: "s",
                        start: function (event, ui) {
                            var re_height=ui.size.height;
                            $(this).css({"min-height":"",height:re_height,top:"",left:"",position:"relative"});
                            var re_left=$(this).offset().left;
                            ui.helper.css({left:re_left});
                            var size_tip='<div id="resize_tip"></div>';
                            var e = event || window.event;
                            var res_top=e.pageY+20;
                            var res_left=e.pageX-30;
                            var res_h=ui.size.height;
                            webUtil.resizeTip(event,"resizable","start");
                        },
                        resize:function(event, ui) {
                            $(this).css({left:""});
                            webUtil.resizeTip(event,"resizable","resize",ui.size.width,ui.size.height);
                        },
                        stop: function (event, ui) {
                            var re_height=ui.size.height;
                            var re_w=ui.originalSize.width;
                            var _model = $(ui.helper).closest(".modulebox").data("model");
                            _model.attributes.dataAttributes.columnHeight = ui.size.height;
                            $(this).find(".column-scroll-content").css({"min-height":ui.size.height})
                            $(this).css({position:"relative", left:"",top:"","min-height":re_height, height:"auto",width:""});
                            styleModel(_model,$(this));
                            colUtil.getRenewItemModel(_model.attributes.mdId,function (item) {
                                item.attributes.dataAttributes.columnHeight = ui.size.height;
                            });
                            webUtil.resizeTip(event,"resizable","stop");
                        }
                    });

                    }
                }
            }
            function styleModel(thiz,style){//保存模块样式model
                thiz.attributes.style=style.attr("style");
                var viewUtils = require("kenfor/viewUtils");
                viewUtils.operating();
                var mdId=style.attr("id");
                var colUtil = require("kenfor/columnUtils");
                colUtil.getRenewItemModel(mdId,function (item) {
                    item.attributes.style = style.attr("style");;
                });
                //thiz.attributes.style_view=style.children('.view').attr("style");
                //console.log(thiz.model.attributes.style);
            }
            function move(settings, current, index) {
                var temp = settings["$obj"].find(".ui-sortable-placeholder");
                if (!temp.length) {
                    clearInterval(settings.timer);
                    settings["lock"] = false;
                    if (current < index) {
                        settings["$page"].eq(current).stop().animate({
                            left: "-100%"
                        }, settings.delayTime * 1000);
                        settings["$page"].eq(index).css("left", "100%");
                    }
                    if (current > index) {
                        settings["$page"].eq(current).stop().animate({
                            left: "100%"
                        }, settings.delayTime * 1000);
                        settings["$page"].eq(index).css("left", "-100%");
                    }
                    settings["$page"].eq(index).stop().animate({
                        left: "0"
                    }, settings.delayTime * 1000, function () {
                        settings["lock"] = true;
                        if (settings.autoScroll && settings.mouseOut) {
                            scroll(settings);
                        }
                    });
                    settings["$obj"].attr("data-page", index);
                    settings["$nav"].removeClass("on");
                    settings["$nav"].eq(index).addClass("on");
                }
            }

            /**
             * 自动切换
             */
            function scroll(settings) {
                settings.timer = setInterval(function () {
                    var current = parseInt(settings["$obj"].attr("data-page")),
                        index = ((current + 1) > settings["$page"].length - 1) ? 0 : (current + 1);
                    move(settings, current, index);
                }, settings.interTime * 1000);
            }

            /**
             * 点击导航按钮
             */
            function clickNav($self, settings) {
                if (!$self.hasClass("on")) {
                    var current = parseInt(settings["$obj"].attr("data-page")),
                        index = $self.index();
                    move(settings, current, index);
                    settings["$obj"].attr("data-page", index);
                    settings["$nav"].removeClass("on");
                    settings["$nav"].eq(index).addClass("on");
                }
            }

            /**
             * 点击箭头按钮
             */
            function clickArrow($self, settings) {
                var current = parseInt(settings["$obj"].attr("data-page")),
                    index;
                if ($self.attr("prev")) {
                    index = ((current - 1) < 0) ? settings["$page"].length - 1 : (current - 1);

                }
                if ($self.attr("after")) {
                    index = ((current + 1) > settings["$page"].length - 1) ? 0 : (current + 1);
                }
                move(settings, current, index);
            }
        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window.columnScroll = factory(window.jQuery);
    }
}));
