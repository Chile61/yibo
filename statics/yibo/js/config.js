if (window["context"] == undefined) {
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    window["context"] = location.origin+"/V6.0";
}
var domain = location.origin.replace(/(http||https):\/\//,"");
var domain_1 = domain.split(".")[0];
var domain_2 = domain.split(".")[1];
var resource="";
var designjs="";
if(domain_1=='iyongwebsite' || domain_2=="iyongweb"){
    var cssurl="//css.iyong.kenfor.com";
        jsurl="//js.iyong.kenfor.com";
}else if(domain_1=='iyongwebsite-cs' || domain_2=="iyongweb-cs"){
    var cssurl="//css.iyong-cs.kenfor.com";
        jsurl="//js.iyong-cs.kenfor.com";
}else{
    var cssurl="//css.j-cc.cn";
    jsurl="//js.j-cc.cn";
}
cssurl = '/statics/yibo/css';
jsurl = '/statics/yibo';
weburl="//"+domain;
require.config({
    baseUrl : jsurl+"/js/lib/",
    urlArgs : "v=ud_20181122",
    shim : {
        backbone : {
            deps : [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        underscore : {
            exports : '_'
        },
        //bootstrap : {
        //    deps : [ 'jquery' ,'css!bootstrap/css/bootstrap.css','bootstrap/js/select2.min','css!bootstrap/css/select2.css']
        //},
        jqueryui: {
            deps: ['jquery','css!csspath/css/jquery-ui.min.css']
        },
        Minicolors: {
            deps: ['jquery','css!csspath/css/jquery.minicolors.css']
        },
        artDialog : {
            deps : ['jquery','artDialog/plugins/iframeTools','css!artDialog/skins/black.css']
        },
        columnScroll: {
            deps: ['jquery']
        },
        SuperSlide: {
            deps: ['jquery']
        },
        fancyJs:{
            deps:["jquery","fancybox/jquery.mousewheel.pack","css!csspath/css/jquery.fancybox-thumbs.css","css!csspath/css/jquery.fancybox.css"]
        },
        imagefit: {
            deps: ['jquery']
        },
        jquerylazyload: {
            deps: ['jquery']
        },
        webupload: {
            deps: ['jquery']
        },
        BMap: {
            deps: ['jquery'],
            exports: 'BMap'
        },
        "Vue":{
            exports: "Vue"
        },
        "axios":{
            exports: "axios"
        }
    },
    paths : {
        app : jsurl+"/website/",
        jquery : ["jquery"],
        backbone : ["backbone"],
        //bootstrap : ["bootstrap"],
        collections : "../collections",
        data : ["../data"],
        json : [weburl+"/website/js/data"],
        models : ["../models"],
        helper : ["../helper"],
        templates : [weburl+"/design/website/js/templates"],
        views : ["/website/js/views"],
        comdata :["../comdata"],
        htmldata : ["../htmldata"],
        jqueryui:["jqueryui"],
        Minicolors: ["jquery.minicolors"],
        kenfor : ["../kenfor"],
        public : ["../public"],
        csspath : [cssurl+"/"],
        jspath : [jsurl+"/js/lib/"],
        columnScroll: ["columnScroll/columnScroll"],
        SuperSlide: ["SuperSlide/SuperSlide"],
        fancyJs:["fancybox/jquery.fancybox.pack"],
        imagefit:["imagefit"],
        jquerylazyload:["jquerylazyload"],
        webupload: ["webuploader/webuploader.min"],
        BMap: ["//api.map.baidu.com/api?v=2.0&ak=P9c7lyUVQyP4yR2UtRRIwYinxCpKNDWp"],
        async: "async",
        Vue:"vue.min",
        axios:"axios.min"
    },
    waitSeconds: 0
});
require(["imagefit"]);
require(["SuperSlide"]);
require(["jquerylazyload"]);