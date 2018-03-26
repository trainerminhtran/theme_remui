/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2017 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */

!function(factory){"use strict";"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof exports?module.exports=factory(require("jquery")):factory(jQuery)}(function($){"use strict";var namespace="animsition",__={init:function(options){options=$.extend({inClass:"fade-in",outClass:"fade-out",inDuration:1500,outDuration:800,linkElement:".animsition-link",loading:!0,loadingParentElement:"body",loadingClass:"animsition-loading",loadingInner:"",timeout:!1,timeoutCountdown:5e3,onLoadEvent:!0,browser:["animation-duration","-webkit-animation-duration"],overlay:!1,overlayClass:"animsition-overlay-slide",overlayParentElement:"body",transition:function(url){window.location.href=url}},options),__.settings={timer:!1,data:{inClass:"animsition-in-class",inDuration:"animsition-in-duration",outClass:"animsition-out-class",outDuration:"animsition-out-duration",overlay:"animsition-overlay"},events:{inStart:"animsition.inStart",inEnd:"animsition.inEnd",outStart:"animsition.outStart",outEnd:"animsition.outEnd"}};var support=__.supportCheck.call(this,options);return support||!(options.browser.length>0)||support&&this.length?(__.optionCheck.call(this,options)&&$("."+options.overlayClass).length<=0&&__.addOverlay.call(this,options),options.loading&&$("."+options.loadingClass).length<=0&&__.addLoading.call(this,options),this.each(function(){var _this=this,$this=$(this),$window=$(window),$document=$(document);$this.data(namespace)||(options=$.extend({},options),$this.data(namespace,{options:options}),options.timeout&&__.addTimer.call(_this),options.onLoadEvent&&$window.on("load.animsition",function(){__.settings.timer&&clearTimeout(__.settings.timer),__.in.call(_this)}),$window.on("pageshow.animsition",function(event){event.originalEvent.persisted&&__.in.call(_this)}),$window.on("unload.animsition",function(){}),$document.on("click.animsition",options.linkElement,function(event){event.preventDefault();var $self=$(this),url=$self.attr("href");2===event.which||event.metaKey||event.shiftKey||-1!==navigator.platform.toUpperCase().indexOf("WIN")&&event.ctrlKey?window.open(url,"_blank"):__.out.call(_this,$self,url)}))})):("console"in window||(window.console={},window.console.log=function(str){return str}),this.length,__.destroy.call(this))},addOverlay:function(options){$(options.overlayParentElement).prepend('<div class="'+options.overlayClass+'"></div>')},addLoading:function(options){$(options.loadingParentElement).append('<div class="'+options.loadingClass+'">'+options.loadingInner+"</div>")},removeLoading:function(){var options=$(this).data(namespace).options;$(options.loadingParentElement).children("."+options.loadingClass).fadeOut().remove()},addTimer:function(){var _this=this,options=$(this).data(namespace).options;__.settings.timer=setTimeout(function(){__.in.call(_this),$(window).off("load.animsition")},options.timeoutCountdown)},supportCheck:function(options){var $this=$(this),props=options.browser,propsNum=props.length,support=!1;0===propsNum&&(support=!0);for(var i=0;i<propsNum;i++)if("string"==typeof $this.css(props[i])){support=!0;break}return support},optionCheck:function(options){var $this=$(this);return!(!options.overlay&&!$this.data(__.settings.data.overlay))},animationCheck:function(data,stateClass,stateIn){var options=$(this).data(namespace).options,dataType=typeof data,dataDuration=!stateClass&&"number"===dataType,dataClass=stateClass&&"string"===dataType&&data.length>0;return dataDuration||dataClass?data=data:stateClass&&stateIn?data=options.inClass:!stateClass&&stateIn?data=options.inDuration:stateClass&&!stateIn?data=options.outClass:stateClass||stateIn||(data=options.outDuration),data},in:function(){var _this=this,$this=$(this),options=$this.data(namespace).options,thisInDuration=$this.data(__.settings.data.inDuration),thisInClass=$this.data(__.settings.data.inClass),inDuration=__.animationCheck.call(_this,thisInDuration,!1,!0),inClass=__.animationCheck.call(_this,thisInClass,!0,!0),overlayMode=__.optionCheck.call(_this,options),outClass=$this.data(namespace).outClass;options.loading&&__.removeLoading.call(_this),outClass&&$this.removeClass(outClass),overlayMode?__.inOverlay.call(_this,inClass,inDuration):__.inDefault.call(_this,inClass,inDuration)},inDefault:function(inClass,inDuration){var $this=$(this);$this.css({"animation-duration":inDuration+"ms"}).addClass(inClass).trigger(__.settings.events.inStart).animateCallback(function(){$this.removeClass(inClass).css({opacity:1}).trigger(__.settings.events.inEnd)})},inOverlay:function(inClass,inDuration){var $this=$(this),options=$this.data(namespace).options;$this.css({opacity:1}).trigger(__.settings.events.inStart),$(options.overlayParentElement).children("."+options.overlayClass).css({"animation-duration":inDuration+"ms"}).addClass(inClass).animateCallback(function(){$this.trigger(__.settings.events.inEnd)})},out:function($self,url){var _this=this,$this=$(this),options=$this.data(namespace).options,selfOutClass=$self.data(__.settings.data.outClass),thisOutClass=$this.data(__.settings.data.outClass),selfOutDuration=$self.data(__.settings.data.outDuration),thisOutDuration=$this.data(__.settings.data.outDuration),isOutClass=selfOutClass||thisOutClass,isOutDuration=selfOutDuration||thisOutDuration,outClass=__.animationCheck.call(_this,isOutClass,!0,!1),outDuration=__.animationCheck.call(_this,isOutDuration,!1,!1),overlayMode=__.optionCheck.call(_this,options);$this.data(namespace).outClass=outClass,overlayMode?__.outOverlay.call(_this,outClass,outDuration,url):__.outDefault.call(_this,outClass,outDuration,url)},outDefault:function(outClass,outDuration,url){var $this=$(this),options=$this.data(namespace).options;$this.css({"animation-duration":outDuration+1+"ms"}).addClass(outClass).trigger(__.settings.events.outStart).animateCallback(function(){$this.trigger(__.settings.events.outEnd),options.transition(url)})},outOverlay:function(outClass,outDuration,url){var _this=this,$this=$(this),options=$this.data(namespace).options,thisInClass=$this.data(__.settings.data.inClass),inClass=__.animationCheck.call(_this,thisInClass,!0,!0);$(options.overlayParentElement).children("."+options.overlayClass).css({"animation-duration":outDuration+1+"ms"}).removeClass(inClass).addClass(outClass).trigger(__.settings.events.outStart).animateCallback(function(){$this.trigger(__.settings.events.outEnd),options.transition(url)})},destroy:function(){return this.each(function(){var $this=$(this);$(window).off(".animsition"),$this.css({opacity:1}).removeData(namespace)})}};$.fn.animateCallback=function(callback){var end="animationend webkitAnimationEnd";return this.each(function(){var $this=$(this);$this.on(end,function(){return $this.off(end),callback.call(this)})})},$.fn.animsition=function(method){return __[method]?__[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof method&&method?void $.error("Method "+method+" does not exist on jQuery."+namespace):__.init.apply(this,arguments)}});