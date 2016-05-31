/********************通用**********************/
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
var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;  
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
/*自适应处理*/
    function resize(){
		var showSize = 1;
		if(is_mobile()){
			showSize = $(window).width()/750;
			$("body").addClass("phone");
			$("body").removeClass("browser");
			}else{
			if($(window).width()<1200&&$(window).width()>750){
			showSize = $(window).width()/1200;
			$("body").addClass("browser");
			$("body").removeClass("phone");
			}else if($(window).width()<=750){
				showSize = $(window).width()/750;
				$("body").addClass("phone");
				$("body").removeClass("browser");
				}else{
					$("body").addClass("browser");
					$("body").removeClass("phone");
					}
			}
		
	if(isIE()&&isIE()<9){
		$("body").css({
        "zoom":showSize
        });
		}else{
		$("body").css({
        "-webkit-transform":"scale("+showSize+")",
        "transform":"scale("+showSize+")"
        });	
			}
    }
    /*先执行一次*/
    resize();
    /*屏幕有变动的时候再执行*/
    $(window).on("resize",resize);
/********************banner**********************/
var bannerclock=0;
function bannerRun(){
	bannerclock=bannerclock%3;
	$("#banner #roll").css("left",-(bannerclock*100)+"%");
	$("#banner .whitePoint").removeClass("hl");
	$("#banner .whitePoint").eq(bannerclock).addClass("hl");
	}
	bannerRun();
var bannerdelay=setInterval(function(){
		bannerclock++;
		bannerRun()
	},3000);