if (window["context"] == undefined) {
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    window["context"] = location.origin+"/V6.0";
}
var domain = location.origin.replace(/(http||https):\/\//,"");
var domain_1 = domain.split(".")[0];
var domain_2 = domain.split(".")[1];
var domain_3 = domain.split(".")[2];
var resource="";
var designjs="";
if(domain_1=='iyongwebsite' || domain_2=="iyongweb" || domain_3=="iyongweb" || domain_1=="xcx-fb"){
    var cssurl="//css.iyong.kenfor.com";
        jsurl="//js.iyong.kenfor.com";
}else if(domain_1=='iyongwebsite-cs' || domain_2=="iyongweb-cs" || domain_3=="iyongweb-cs" || domain_1=="xcx-cs"){
    var cssurl="//css.iyong-cs.kenfor.com";
        jsurl="//js.iyong-cs.kenfor.com";
}else{
    var cssurl="//css.j-cc.cn";
    jsurl="//js.j-cc.cn";
}
jsurl = '/statics/yibo/m';
cssurl = '/statics/yibo/m';
weburl="//"+domain;
require.config({
    baseUrl : jsurl+"/js/lib/",
    urlArgs : "v=ud_201812262",
    shim : {
        backbone : {
            deps : [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        underscore : {
            exports : '_'
        },
        bootstrap : {
            deps : [ 'jquery' ,'css!bootstrap/css/bootstrap.css']
        },
        jqueryui: {
            deps: ['jquery','css!csspath/css/jquery-ui.min.css']
        },
        Minicolors: {
            deps: ['jquery','css!csspath/css/jquery.minicolors.css']
        },
        artDialog : {
            deps : ['jquery','artDialog/plugins/iframeTools','css!artDialog/skins/black_wap.css']
        },
        columnScroll: {
            deps: ['jquery']
        },
        SuperSlide: {
            deps: ['jquery']
        },
        imagefit: {
            deps: ['jquery']
        },
        weuijs : {
            deps : [ 'jquery','weui/js/swiper.min'],
        },
        photoswipejs : {
            deps : [ 'jquery','css!photoswipe3/photoswipe.css','photoswipe3/klass.min'],
        },
        webupload: {
            deps: ['jquery']
        },
        jquerylazyload: {
            deps: ['jquery']
        },
        BMap: {
            deps: ['jquery'],
            exports: 'BMap'
        },
        fastclickjs : {
            exports : 'FastClick'
        }
    },
    paths : {
        app : jsurl+"/website/",
        jquery : ["jquery"],
        backbone : ["backbone"],
        bootstrap : ["bootstrap"],
        collections : "../collections",
        data : ["../data"],
        json : [weburl+"/website/js/data"],
        models : ["../models"],
        helper : ["../helper"],
        weuijs : "weui/js/jquery-weui",
        photoswipejs : "photoswipe3/jquery-photoswipe",
        templates : [weburl+"/design/website/js/templates"],
        views : ["/website/js/views"],
        comdata :["../comdata"],
        htmldata : ["../htmldata"],
        jqueryui:["jqueryui"],
        Minicolors: ["jquery.minicolors"],
        kenfor : ["../kenfor"],
        public : ["../public"],
        fastclickjs:["fastclick/fastclick"],
        jquerylazyload:["jquerylazyload"],
        csspath : [cssurl+"/"],
        jspath : [jsurl+"/js/lib/"],
        columnScroll: ["columnScroll/columnScroll"],
        SuperSlide: ["SuperSlide/SuperSlide"],
        imagefit:["imagefit"],
        webupload: ["webuploader/webuploader.min"],
        //BMap: ["//api.map.baidu.com/api?v=2.0&ak=P9c7lyUVQyP4yR2UtRRIwYinxCpKNDWp"],
        BMap: ["//map.iyong.com/api?v=2.0&ak=P9c7lyUVQyP4yR2UtRRIwYinxCpKNDWp"],
        async: "async"
    },
    waitSeconds: 0
});
require(["weuijs"]);
require(["SuperSlide"]);
require(["jquerylazyload"]);
