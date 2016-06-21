/********************通用**********************/
var readFn={}
    $(document).ready(function(){
        $.each(readFn,function(index,fn){
            fn();
        });
    });
/*是否IE*/
function isIE(){
	    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var iIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 ; //判断是否IE浏览器
    if (iIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
		return fIEVersion;
    }else{
		return false;
		}
	}
/*是否手机*/
function is_mobile() {  
var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini)/i;  
var u = navigator.userAgent;  
if (null == u) {  
return true;  
}  
var result = regex_match.exec(u);  
if (null == result) {  
return false  
} else {  
return true  
}  
}
var is_mobile=is_mobile();
/*导航*/
    $("#head button").unbind("click").bind("click",function(){
        window.location.href=$(this).attr("href");
    });
/*lazyload*/
$("[lazyload='0']").each(function(){
	$(this).attr("src",$(this).attr("srcL")).attr("lazyload","1");
});
/*下载app*/
$("#foot #second #downloadApp").unbind("click").bind("click",function(){
	window.open("http://wx.zoteri.net/用户/软件下载");
});
/********************自适应**********************/
var myScroll={
	refresh:function(){}
	}
var scrollFn={}
if(!(isIE()&&isIE()<9)){
$("[animate='false']").each(function(){
		 if($(this).offset().top<$(window).height()){
			 $(this).attr("animate","ture");
			 $(this).addClass("an");
			 }
		 });
myScroll = new IScroll('#IS', { probeType: 3, mouseWheel: !is_mobile ,scrollbars: !is_mobile,click: true,bounce:is_mobile});
$("img").on("load",function(){
	myScroll.refresh();
});
 myScroll.on('scroll', function(){
 	var that=this;
 	$.each(scrollFn,function(i,f){
 		f(that);
 	});
	 }); 
scrollFn.an=function(s){
	$("[animate='false']").each(function(){
		 if($(this).offset().top<$(window).height()){
			 $(this).attr("animate","ture");
			 $(this).addClass("an");
			 }
		 });
}	 
}
/*自适应处理*/
    function resize(){
		var showSize = 1;
		if(is_mobile){
			showSize = $(window).width()/750;
			$("html,body").width(750);
			$("body").addClass("phone");
			$("body").removeClass("browser");
			}else{
			if($(window).width()<1200&&$(window).width()>750){
			$("html,body").width(1200);
			showSize = $(window).width()/1200;
			$("body").addClass("browser");
			$("body").removeClass("phone");
			}else if($(window).width()<=750){
				$("html,body").width(750);
				showSize = $(window).width()/750;
				$("body").addClass("phone");
				$("body").removeClass("browser");
				}else{
					$("html,body").width("100%");
					$("body").addClass("browser");
					$("body").removeClass("phone");
					}
			}
	$("#IS").height($(window).height()/showSize);
	if(isIE()&&isIE()<9){
		$("body").css({
        "zoom":showSize
        });
		$("#IS").css("overflow","auto");
		$("#IS").width($(window).width()/showSize);
		}else{
		$("html").css({
        "-webkit-transform":"scale("+showSize+")",
        "transform":"scale("+showSize+")"
        });	
		myScroll.refresh();
			}
    }
    /*先执行一次*/
    readFn.resize=resize;
    /*屏幕有变动的时候再执行*/
    $(window).on("resize",resize);
/********************menu**********************/
$("#menuButton").unbind("click").bind("click",function(){
	$("#menu").toggleClass("open");
	myScroll.scrollTo(0, 0);
	var delay=setTimeout(function(){
		myScroll.refresh();
		},1000);
	});
$("#menu .point").unbind("click").bind("click",function(){
	window.location.href=$(this).attr("href");
});
/********************index**********************/
/*banner*/
var bannerclock=0;
var bannerLock=false;
(function(){
	if(!$("#index_page").length){
return false;
}
$(".browser #head button#index").addClass("hl");
	var bannerData=[
	'<div class="point" style="background-image:url(/community/images/banner0.jpg); background-color:#22b4de;">'+
                '<div class="pointCenter">'+
                    '<button id="downApp">下载app</button>'+
                '</div>'+
            '</div>',
            '<div class="point" style="background-image:url(/community/images/banner1.jpg); background-color:#78be8c;">'+
                '<div class="pointCenter">'+
                    '<img src="/community/images/ercode3.jpg" id="erCode"/>'+
                '</div>'+
            '</div>',
            '<div class="point" style="background-image:url(/community/images/banner2.jpg); background-color:#ea5671;">'+
                '<div class="pointCenter">'+
                    '<button id="go">查看合作社区<div class="icon">GO</div></button>'+
                '</div>'+
            '</div>'
	];
	var centerPoint=$(bannerData[0]).css("left","0%").attr("state","now").appendTo("#index_page #banner");
	centerPoint.find("#downApp").unbind("click").bind("click",function(){
		window.open("http://wx.zoteri.net/用户/软件下载");
	})
	centerPoint.find("#go").unbind("click").bind("click",function(){
		window.location.href="http://sq.zoteri.net/";
	})
	function bannerLeft(){
	bannerLock=true;
	bannerclock=bannerclock%3;
	if(bannerclock<0){
		bannerclock=3+bannerclock;
	}
	var newPoint=$(bannerData[bannerclock]).css("left","100%").attr("state","next").appendTo("#index_page #banner");
	newPoint.find("#downApp").unbind("click").bind("click",function(){
		window.open("http://wx.zoteri.net/用户/软件下载");
	})
	newPoint.find("#go").unbind("click").bind("click",function(){
		window.location.href="http://sq.zoteri.net/";
	})
	var importDelay=setTimeout(function(){
	$("#index_page #banner [state='now']").css("left","-100%");
	$("#index_page #banner [state='next']").css("left","0%");	
	},10);
	var bannerRollDelay=setTimeout(function(){
		$("#index_page #banner [state='now']").remove();
		$("#index_page #banner [state='next']").attr("state","now");
		bannerLock=false;
	},2000);
	$("#banner .whitePoint").removeClass("hl");
	$("#banner .whitePoint").eq(bannerclock).addClass("hl");
	}
	function bannerRight(){
	bannerLock=true;
	bannerclock=bannerclock%3;
	if(bannerclock<0){
		bannerclock=3+bannerclock;
	}
	var newPoint=$(bannerData[bannerclock]).css("left","-100%").attr("state","pre").appendTo("#index_page #banner");
	newPoint.find("#downApp").unbind("click").bind("click",function(){
		window.location.href="http://wx.zoteri.net/用户/软件下载";
	})
	newPoint.find("#go").unbind("click").bind("click",function(){
		window.location.href="http://sq.zoteri.net/";
	})
	var importDelay=setTimeout(function(){
	$("#index_page #banner [state='now']").css("left","100%");
	$("#index_page #banner [state='pre']").css("left","0%");	
	},10);
	var bannerRollDelay=setTimeout(function(){
		$("#index_page #banner [state='now']").remove();
		$("#index_page #banner [state='pre']").attr("state","now");
		bannerLock=false;
	},2000);
	$("#banner .whitePoint").removeClass("hl");
	$("#banner .whitePoint").eq(bannerclock).addClass("hl");	
	}
	$("#banner").unbind("swipeleft").bind("swipeleft",function(){
		if(bannerLock){
			return false;
		}
		bannerclock++;
		bannerLeft();
	});
	$("#banner").unbind("swiperight").bind("swiperight",function(){
		if(bannerLock){
			return false;
		}
		bannerclock--;
		bannerRight();
	});
	$("#banner .whitePoint").unbind("click").bind("click",function(){
		if(bannerLock){
			return false;
		}
		var to=Number($(this).attr("num"));
		if(to>bannerclock){
			bannerclock=to;
			bannerLeft();
		}
		if(to<bannerclock){
			bannerclock=to;
			bannerRight();
		}
	});
	var bannerdelay=setInterval(function(){
		if(bannerLock){
			return false;
		}
		bannerclock++;
		bannerLeft();
	},5000);
	})();
/********************news**********************/
(function(){
	if(!$("#news_page").length){
return false;
}
$(".browser #head button#news").addClass("hl");
$("#nav .point").unbind("click").bind("click",function(){
	$(".multiFrame .mulitiRoll").css("left","-"+(Number($(this).attr("num"))%3)+"00%");
	$("#nav .point").removeClass("hl");
	$(this).addClass("hl");
	$(".multiFrame .mulitiPage").removeClass("now");
	$(".multiFrame .mulitiPage[num='"+$(this).attr("num")+"']").addClass("now");
	});
/*手机版顶部刷新*/
var reflashLock=0;
function pageReflash(){
	var page=Number($(".mulitiPage.now").attr("num"));/*要更新的地方*/
	/*更新代码*/
	$(".mulitiPage.now").attr("src","/新闻/列表?分类编号="+page+"&位置="+(nowPage[page-1]+1));
	/*更新后运行*/
	reflashLock=0;
}
if(!(isIE()&&isIE()<9)){/*非ie9以下*/
scrollFn.news=function(s){
	if(is_mobile){
	if($(".phone").length&&s.y>100){
		if(!reflashLock){
			reflashLock=1;
			pageReflash();
		}
	}	
}else{
	if($(".phone").length&&s.y==0){
		if(!reflashLock){
			reflashLock=1;
			pageReflash();
		}
	}
}
}
}else{/*ie9以下*/
	$("#IS").on("scroll",function(e){
		if($(".phone").length&&$("#IS").scrollTop()==0){
			if(!reflashLock){
			reflashLock=1;
			pageReflash();
		}
		}
	})
}
})();
/********************newsDetail_page**********************/
(function(){
	if(!$("#newsDetail_page").length){
return false;
}
$(".browser #head button#index").addClass("hl");
$("#backButton").unbind("click").bind("click",function(){
	window.location.href="/新闻/首页";
});
})();
/****兼容****/
var android =function(){
      var u = window.navigator.userAgent;
      var num ;

        //移动端
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
          //android
          num = u.substr(u.indexOf('Android') + 8, 3);
          return num;
        }else{
          return false;
        }
    }

if(android()){
  var v=android().split(".");
  if(Number(v[0])<=4&&Number(v[1])<4){
        $("body").append('<style>'+
'.phone #newsDetail_page .text p{ '+
'background-color:#fff;'+
'} '+
    '</style>')
  }
}
