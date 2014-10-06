/*! EaseStepper (https://github.com/Takazudo/EaseStepper)
 * lastupdate: 2013-05-21
 * version: 1.1.0
 * author: 'Takazudo' Takeshi Takatsudo <takazudo@gmail.com>
 * License: MIT */
(function(){var t,e,n=[].slice,i={}.hasOwnProperty,r=function(t,e){function n(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};e={},e.Event=function(){function t(){}return t.prototype.on=function(t,e){var n,i,r,s,a;for(null==this._callbacks&&(this._callbacks={}),n=t.split(" "),s=0,a=n.length;a>s;s++)i=n[s],(r=this._callbacks)[i]||(r[i]=[]),this._callbacks[i].push(e);return this},t.prototype.once=function(t,e){return this.on(t,function(){return this.off(t,arguments.callee),e.apply(this,arguments)}),this},t.prototype.trigger=function(){var t,e,i,r,s,a,o;if(t=arguments.length>=1?n.call(arguments,0):[],i=t.shift(),r=null!=(o=this._callbacks)?o[i]:void 0){for(s=0,a=r.length;a>s&&(e=r[s],e.apply(this,t)!==!1);s++);return this}},t.prototype.off=function(t,e){var n,i,r,s,a,o;if(!t)return this._callbacks={},this;if(r=null!=(o=this._callbacks)?o[t]:void 0,!r)return this;if(!e)return delete this._callbacks[t],this;for(i=s=0,a=r.length;a>s;i=++s)if(n=r[i],n===e){r=r.slice(),r.splice(i,1),this._callbacks[t]=r;break}return this},t}(),t=function(t){function e(t){this.options=t,this._tweakOptions(),this._whileEasing=!1,this._stopRequested=!1}return r(e,t),e.prototype._tweakOptions=function(){var t;return t=this.options,t.interval||(t.interval=13),t.done&&this.done(t.done),t.beginningValue||(t.beginningValue=0),t.valueInChange||(t.valueInChange=t.endValue-t.beginningValue),this},e.prototype._triggerEvent=function(t,e,n,i){return this._currentData={elapsedTimeRate:e,valueChangeRate:n,value:i+this.options.beginningValue},this.trigger(t,this._currentData),this},e.prototype.start=function(){var t,e,n,i,r=this;return n=this.options,this._triggerEvent("start",0,0,0),e=0,t=0,this._whileEasing=!0,this._timerId=null,i=function(){var i,s;if(r._stopRequested!==!0)return e>=n.duration?(r._whileEasing=!1,r._triggerEvent("end",1,1,n.valueInChange),r._clearTimer(),void 0):(i=e/n.duration,s=n.easing(i,e,0,1,n.duration),t=n.valueInChange*s,r._triggerEvent("step",i,s,t),e+=n.interval)},this._timerId=setInterval(i,n.interval),this},e.prototype._clearTimer=function(){return this._timerId&&(clearInterval(this._timerId),this._timerId=null),this},e.prototype.stop=function(){return this._whileEasing===!1?!1:(this._clearTimer(),this._stopRequested=!0,this._triggerEvent("stop",this._currentData),this)},e.prototype.done=function(t){var e=this;return this.on("end",function(){return t(e)}),this},e}(e.Event),window.EaseStepperNs=e,window.EaseStepper=t}).call(this);


/*! jQuery.EaseScroller (https://github.com/Takazudo/jQuery.EaseScroller)
 * lastupdate: 2013-07-04
 * version: 1.1.2
 * author: 'Takazudo' Takeshi Takatsudo <takazudo@gmail.com>
 * License: MIT */
(function(){var t={}.hasOwnProperty,e=function(e,r){function n(){this.constructor=e}for(var o in r)t.call(r,o)&&(e[o]=r[o]);return n.prototype=r.prototype,e.prototype=new n,e.__super__=r.prototype,e};(function(t,r,n){var o,s,i;return i={},s=t(r),o=t(n),i.normalizeEasing=function(e){return"string"===t.type(e)?t.easing[e]:e},i.yOf=function(t){var e;for(e=0;t.offsetParent;)e+=t.offsetTop,t=t.offsetParent;return e},i.isHash=function(t){return/^#.+$/.test(t)},i.getWhereTo=function(e){var r;return r=t(e),r.data("scrollto")||r.attr("href")},i.calcY=function(e){var r,n;if("number"===t.type(e))return e;if("string"===t.type(e)){if(!i.isHash(e))return!1;r=o.find(e)}else r=t(e);return r.size()?n=i.yOf(r[0]):null},i.scrollTop=function(){return o.scrollTop()||n.documentElement.scrollTop||n.body.scrollTop||r.pageYOffset||0},i.ua=function(){var e,r,n;return r={},n=navigator.userAgent,e=function(e){var o;return o=!1,t.each(e,function(t,e){var s;return s=RegExp(e,"i"),Boolean(n.match(s))?(r[e]=!0,o=!0):r[e]=!1,!0}),o},e(["iphone","ipod","ipad"]||e(["android"]))&&(r.mobile=!0),r}(),i.Scroller=function(n){function l(e){null==e&&(e={}),this.options=t.extend({},i.Scroller.defaults),e&&this.option(e),this._handleMobile()}var a;return e(l,n),a=["scrollstart","scrollend","scrollcancel"],l.defaults={speed:13,duration:350,changehash:!0,userskip:!0,selector:"a[href^=#]:not(.apply-noscroll)",adjustEndY:!1,dontAdjustEndYIfSelectorIs:null,dontAdjustEndYIfYis:null,easing:"swing"},l.prototype._handleMobile=function(){return i.ua.mobile?(this.options.userskip=!1,this):this},l.prototype._invokeScroll=function(){var e,n=this;return e=function(){var e,o,s;return n._scrollDefer=t.Deferred(),n._scrollDefer.always(function(){return n._reservedHash=null,n._scrollDefer=null}),e=n.options,o=new EaseStepper({interval:e.speed,easing:e.easing,duration:e.duration,beginningValue:n._startY,endValue:n._endY}),s=function(t){return r.scrollTo(n._startX,t.value)},o.on("start",function(){return n.trigger("scrollstart",n._endY,n._reservedHash)}),o.on("step",function(t){return n._cancelNext?(n._cancelNext=!1,n._scrollDefer.reject(),o.stop(),n.trigger("scrollcancel",n._endY,n._reservedHash)):s(t)}),o.on("end",function(t){return s(t),n.options.changehash&&n._reservedHash&&(location.hash=n._reservedHash),n._scrollDefer.resolve(),n.trigger("scrollend",n._endY,n._reservedHash),n._startX=null}),o.start()},this._scrollDefer?this.stop().then(e):e(),this},l.prototype._prepareForScroll=function(e,r){var n,s,l;return l=!0,this.options.changehash&&(l=!1),this.options.adjustEndY===!1&&(l=!1),(null!=r?r.adjustEndY:void 0)===!1&&(l=!1),i.isHash(e)&&(this._reservedHash=e,this.options.dontAdjustEndYIfSelectorIs&&o.find(e).is(this.options.dontAdjustEndYIfSelectorIs)&&(l=!1)),s=i.calcY(e),s===!1?this:(this._startY=i.scrollTop(),s===this._startY?this:(this._startX=o.scrollLeft(),"number"===t.type(this.options.dontAdjustEndYIfYis)&&s===this.options.dontAdjustEndYIfYis&&(l=!1),n=0,null!=(null!=r?r.adjustEndY:void 0)?n=r.adjustEndY:this.options.adjustEndY!==!1&&(n=this.options.adjustEndY),s+=n,this._endY=this._normalizeEndYOverDoc(s),this))},l.prototype._normalizeEndYOverDoc=function(t){var e,r;return e=o.height(),r=s.height(),t+r>e&&(t=e-r),0>t&&(t=0),t},l.prototype.stop=function(){var e=this;return t.Deferred(function(t){return e._scrollDefer?(e._cancelNext=!0,e._scrollDefer.fail(function(){return t.resolve()})):t.resolve()}).promise()},l.prototype.option=function(e){var r=this;return e?(this.options=t.extend({},this.options,e),this._handleMobile(),t.each(a,function(t,e){return r.options[e]&&r.on(e,r.options[e]),!0}),this.options.easing=i.normalizeEasing(this.options.easing),this):this.options},l.prototype.live=function(t){var e;return t=t||this.options.selector,e=this,o.delegate(t,"click",function(t){var r;return t.preventDefault(),r=i.getWhereTo(this),e.scrollTo(r)}),this},l.prototype.scrollTo=function(t,e){return this._prepareForScroll(t,e),this._invokeScroll(),this._scrollDefer.promise()},l}(r.EaseStepperNs.Event),t.fn.easescrollable=function(e){var r;return r=new i.Scroller(e),this.each(function(){var e;return e=t(this),e.data("easescroller",r),e.data("easescrollerattached")?this:(e.bind("click",function(t){return t.preventDefault(),r.scrollTo(i.getWhereTo(this))}),e.data("easescrollerattached",!0))})},t.EaseScrollerNs=i,t.EaseScroller=i.Scroller})(jQuery,window,document)}).call(this);



// ----------------------------------------------------------------------------
// navToggle
// ----------------------------------------------------------------------------
(function($) {
  $.fn.navToggle = function() {
    if (this.length === 0) { return false; };
    
    var body = $('body');
    var openClass = 'js-nav-show';
    var navItem = $('.nav__item');
    
    this.on('click', function() {
      body.toggleClass(openClass);
    });
    
    navItem.on('click', function() {
      body.removeClass(openClass);
    });
    
    return this;
  };
})(jQuery);


// ----------------------------------------------------------------------------
// owl
// ----------------------------------------------------------------------------
$(function() {
  // carousel-product
  $("#js-carousel-products").owlCarousel({
    itemsCustom : [
      [0, 2],
      [480, 3],
      [640, 4],
      [980, 5],
      [1200, 7]
    ],
    slideSpeed: 400,
    navigation : true,
    scrollPerPage: true,
    pagination: false,
    afterAction : afterAction
  });
  function afterAction(){
    $(".product-list-count__all").text(Math.ceil(this.owl.owlItems.length / this.owl.visibleItems.length));
    $(".product-list-count__current").text(Math.ceil((this.owl.currentItem) / this.owl.visibleItems.length) + 1);
  }
  
  // carousel-about
  $("#js-carousel-about").owlCarousel({
    singleItem:true,
    navigation : false,
    autoPlay: 5000,
    paginationSpeed: 1200
  });
  
});


// ----------------------------------------------------------------------------
// boxer
// ----------------------------------------------------------------------------
$(function() {
  $(".boxer").boxer({
    formatter: function($target) {
      return '<p class="caption">' + $target.data('caption') + '</p>';
    }
  });
})


// ----------------------------------------------------------------------------
// init
// ----------------------------------------------------------------------------
$(function () {
  // EaseScroll
  $('a[href^=#]:not(.notEasescroll)').easescrollable();
  
  // nav
  $('.js-nav-toggle').navToggle();
});