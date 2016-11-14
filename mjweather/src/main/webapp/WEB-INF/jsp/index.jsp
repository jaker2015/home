<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<% 
String lng = request.getParameter("lng");
String lat = request.getParameter("lat");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>天气预报</title>
<meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no,minimal-ui" />
<link rel="stylesheet" href="css/css.css" />
<link rel="stylesheet" href="css/style.css" media="screen" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/css1.css">
<script src="js/rem.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery-1.11.1.js"></script>
<script src='js/city.js'></script>
<script src='js/jquery.min.js'></script>
<script src='js/weather.js'></script>
<script src='js/indexfun.js'></script>
<script src='js/hotcity.js'></script>
<script src="js/jquery.autocomplete.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery.let_it_snow.js"></script>
<script src="js/cities08.js"  type="text/javascript"></script>
<script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script>
<script>
//var w=$(window).width();
//页面加载调用天气接口 ajax请求后台 加载初始变量
var lng =<%=lng%>;
var lat =<%=lat%>
var fiveDate= new Array();
var temp_low ="{\"msgl\":[";
var temp_high = "{\"msgh\":[";
var every8one = new Array();
var every8two = new Array();
var every8three = new Array();
var e81temp = "{\"h\":[";
var e82temp = "{\"h\":[";
var e83temp = "{\"h\":[";
var state= "1";
var city="未知";
var selcity ="";
var zhishu=0;
var zv="";


var w=$(window).width();
var h=$(window).height();
if(w/h<1){
	$(".content,#navLeft").css({
	    position: 'fixed',
    	top: '50%'
	})
}



$(document).ready( function() {
/*	var w=$(window).width();
	var h=$(window).height()
	alert(w)
		alert(h)*/
//		window.devicePixelRatio=2;	
//$('#navLeft').css("display","none");
//$('.load').css("display","block");
//$('.load').css("display","block");
//定位当前所在城市
showCityInfo();
//导航
$('.edit').click(function(){
	$('.content_wrap .addCity li div:last-child').css('display','block')
});
});
function loadcss(numweather){
	$(function(){
		var num =parseInt(numweather);
		$('canvas').hide();
			if(num==1){
				$('body').removeClass('sunny snow').addClass('darkClouds');
				$('.sun,canvas').hide();
				$(".cloud1").css('opacity',.2);
				$(".cloud2").css({'opacity':.2,"top":25+"%"});
			}
			if(num==2){
				$('body').addClass('sunny');
				$('.flake,.sun').show();
				$('.cloud3,canvas').hide();
			}
			if(num==3){
				$('body').removeClass('darkClouds snow').addClass('sunny');
				$('.flake').show();
				$('.sun').hide();
				$(".cloud1").css('opacity',.2);
				$("canvas.flake").let_it_snow({
			    	windPower: -3,
			    	speed: 5,
			    	count: 250,
			    	size: 10,
			  	    image: "images/white-dyu.png"
			    });
			}
			if(num==4){
				$('body').removeClass('darkClouds sunny').addClass('snow');
				$('.snow').show();
				$('.cloud1,.cloud2,.sun').hide();
				$("canvas.snow").let_it_snow({
		    		windPower: 3,
		    	    speed: 1,
		    	    count: 50,
		    	    size: 5,
		    	    image: "images/white-snowflake.png"
		    	});
			}
		});
}


$(function(){
	removeAdds();
});

//去除运营商篡改页面出现的“剩余流量”悬浮球
function removeAdds(){
	setTimeout(function(){
		$("body").children().not($("app.Yesway")).remove();
	}, 200);
}
</script>
</head>
<body>
<app class="Yesway">
  <canvas width="100%" height="100%" class="snow"></canvas>
  
  <canvas width="100%" height="100%" class="flake"></canvas>

	<div id="cloud">
		<div class="cloud1"></div>
		<div class="cloud2"></div>
		<div class="cloud3"></div>
	</div>
	<div class="sun"></div>
	<div id="navLeft" style="display: none">

   		<div id="address">
   			<span onclick="citymanage()"><img src="images/icon-6.png"/>&nbsp<label  id="cname"></label></span><img class="addressImg" src="images/icon-7.png" alt="" onclick="refresh()"/>
   			<p id="hqtime"></p>
   		</div>
   </div>
   <div id="contents">
   		<div class="content">
   			<div class="main" style="display: none">
   				<div class="weatherDetails" id="firstinfo">
   				</div>
   				<ul class="fiveDayForecast" id="fivesimple">
   				</ul>
   				<div class="clear"></div>
   			</div>
   		</div>
   		<div class="content_wrap">
   			<header>
				<div class="title">城市管理</div>
				<span class="back" onclick="returngo()"><img src="images/back.png"/>返回</span>
				<span class="edit"><img src="images/edit.png"/>编辑</span>
				<div class="clear"></div>
   			</header>
   			<div class="addressArea">
   				<div class="addCity">
   					<ul id="list">
	   					<!-- <li class="on"><div><img src="images/icon-18.png"/> 北京</div><div></div></li>
	   					<li><div>北京</div><div class="">删除</div></li>
	   					<li><div>乌鲁木齐</div><div class="">删除</div></li>
	   					<li><div>乌鲁木齐</div><div class="">删除</div></li>
	   					<li><div>乌鲁木齐</div><div class="">删除</div></li>
	   					<li class="add"><div>+</div><div></div></li> -->
	   				</ul>
   				</div>
   				<div class="hotcity">
   					<div class="search"><input id="city_name" type="text" placeholder="请输入城市名称"/><input type="button" onclick="serachcity()" value="搜索" /></div>
   					<ul id="tip"></ul>
   					<p>热门城市</p>
   					<ul id="u"></ul>
   					<ul id="citylist">
   					</ul>
   				</div>
   			</div>
   		</div>
		<div class="popBg" style="display: none;">
		 	<div class="pop">
		 		<p>是否退出墨迹天气？</p>
		 		<button>确定</button><button>取消</button>
			</div>
		</div>
		<div id="fiverb" style="display: none">
			<div class="content">
			 	<div id="container" style="height:300px;margin-top: 0.1rem;margin-left: 30px"></div>
			</div>
		</div>
		<div id="rb24" style="display: none" >
			<div class="content">
		 		<div id="container1" style="height:300px ; margin-top: 90px;margin-left: 20px;margin-right: 20px"></div>
				<span onclick="nexth()"><img src="images/next.png"/></span><span onclick="beforeh()"><img src="images/prev.png"/></span>
			</div>
		</div>
   </div>
   <!-- 数据加载div 显示正在加载************ -->
		<div class="load">
   			<div class="loading">
	   			数据正在加载，请稍候</span>
		   		<!-- 数据加载失败，请点此<a href="#">刷新重试  </a> -->
	   			<!-- <span></span> -->
		   	</div>
   		</div>
	<div class="popBg" style="display: none;">
		<div class="pop">
		 	<p>是否退出墨迹天气？</p>
		 	<button>确定</button><button>取消</button>
		</div>
	</div>
<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=88b6c64534afa1c195ca562820c6215e"></script>
</app>
</body>
</html>