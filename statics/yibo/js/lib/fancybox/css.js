(function(global){var createElement="createElement",parentNode="parentNode",setTimeout=global.setTimeout,doc=global.document,head,shouldCollectSheets=doc&&doc.createStyleSheet&&!(doc.documentMode>=10),ieCollectorSheets=[],ieCollectorPool=[],ieCollectorQueue=[],ieMaxCollectorSheets=12,loadSheet,msgHttp="HTTP or network error.",hasEvent={};if(doc){head=doc.head||doc.getElementsByTagName("head")[0];if(shouldCollectSheets){loadSheet=loadImport}else{loadSheet=loadLink}}function setLoadDetection(event,hasNative){hasEvent[event]=hasEvent[event]||hasNative}function createLink(){var link;link=doc[createElement]("link");link.rel="stylesheet";link.type="text/css";return link}function loadHandler(link,cb){link.onload=function(){setLoadDetection("load",true);cb()}}function errorHandler(link,cb){link.onerror=function(){setLoadDetection("error",true);cb()}}function loadImport(url,cb,eb){var coll;ieCollectorQueue.push({url:url,cb:cb,eb:function failure(){eb(new Error(msgHttp))}});coll=getIeCollector();if(coll){loadNextImport(coll)}}function loadNextImport(coll){var imp,collSheet;imp=ieCollectorQueue.shift();collSheet=coll.styleSheet;if(imp){coll.onload=function(){imp.cb(imp.ss);loadNextImport(coll)};coll.onerror=function(){imp.eb();loadNextImport(coll)};imp.ss=collSheet.imports[collSheet.addImport(imp.url)]}else{finalize(coll);returnIeCollector(coll)}}function returnIeCollector(coll){ieCollectorPool.push(coll)}function getIeCollector(){var el;el=ieCollectorPool.shift();if(!el&&ieCollectorSheets.length<ieMaxCollectorSheets){el=doc.createElement("style");ieCollectorSheets.push(el);head.appendChild(el)}return el}function isLinkReady(link){var ready,sheet,rules;if(!link.href||!isDocumentComplete()){return false}ready=false;try{sheet=link.sheet;if(sheet){rules=sheet.cssRules;ready=rules===null;if(!ready&&rules){sheet.insertRule("-curl-css-test {}",0);sheet.deleteRule(0);ready=true}}}catch(ex){ready=Object.prototype.toString.call(window.opera)!="[object Opera]"&&/security|denied/i.test(ex.message)}return ready}function finalize(link){link.onload=link.onerror=noop}function isFinalized(link){return link.onload==noop||!link.onload}function loadWatcher(link,wait,cb){if(hasEvent["load"]){return}if(isLinkReady(link)){cb(link.sheet)}else{if(!isFinalized(link)){setTimeout(function(){loadWatcher(link,wait,cb)},wait)}}}function errorWatcher(link,wait,eb){if(hasEvent["error"]){return}}function linkLoaded(link,wait,cb){function load(){if(isFinalized(link)){return}finalize(link);cb(link.sheet)}loadHandler(link,load);loadWatcher(link,wait,load)}function linkErrored(link,wait,cb){function error(){if(isFinalized(link)){return}finalize(link);cb(new Error(msgHttp))}errorHandler(link,error);errorWatcher(link,wait,error)}function loadLink(url,cb,eb,period){var link;link=createLink();linkLoaded(link,period,cb);linkErrored(link,period,eb);link.href=url;head.appendChild(link)}function isDocumentComplete(){return !doc.readyState||doc.readyState=="complete"}function nameWithExt(name,defaultExt){return name.lastIndexOf(".")<=name.lastIndexOf("/")?name+"."+defaultExt:name}function noop(){}define({"normalize":function(resourceId,normalize){var resources,normalized;if(!resourceId){return resourceId}resources=resourceId.split(",");normalized=[];for(var i=0,len=resources.length;i<len;i++){normalized.push(normalize(resources[i]))}return normalized.join(",")},"load":function(resourceId,require,callback,config){var sheets,resources,cssWatchPeriod,cssNoWait,loadingCount,i;sheets=[];resources=(resourceId||"").split(",");cssWatchPeriod=config["cssWatchPeriod"]||50;cssNoWait=config["cssNoWait"];loadingCount=resources.length;function loaded(ss){if(resources.length>1){sheets.push(ss)}if(--loadingCount==0){callback(resources.length==1?ss:sheets)}}function failed(ex){var eb;eb=callback.reject||function(ex){throw ex};eb(ex)}for(i=0;i<resources.length;i++){resourceId=resources[i];var url,link;url=nameWithExt(require["toUrl"](resourceId),"css");if(cssNoWait){link=createLink();link.href=url;head.appendChild(link);loaded(link.sheet||link.styleSheet)}else{loadSheet(url,loaded,failed,cssWatchPeriod)}}},"cramPlugin":"../cram/css"})})(this);