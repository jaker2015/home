var weatherName = ['中到大雨','中雨','中雪','冰粒','冰针',
                   '冰雹','冻雨','冻雾','大到暴雨','大暴雨',
                   '大部晴朗','大雨','大雪','小到中雨','小到中雪',
                   '小阵雨','小阵雪','小雨','小雪','少云',
                   '尘卷风','局部阵雨','强沙尘暴','强阵雨','扬沙',
                   '晴','暴雨','暴雪','沙尘暴','浮尘',
                   '特大暴雨','阴','阵雨','阵雪','雨',
                   '雨夹雪','雪','雷暴','雷电','雷阵雨',
                   '雷阵雨伴有冰雹','雾','霾','多云'];
var weatherId=['','19','15','','',
               '','','','','',
               '','9','16','7','',
               '','','8','14','',
               '','','','','',
               '0','','10','','',
               '','2','','5','7',
               '6','','','','',
               '','','45','1']

function loadingDate(id,lon,lat){
	//ajax 后台请求天气数据
	//ajax请求后台获取偏好数据
	//alert(id);
	var url = "getWeather.do";
	var pars = {
		cityId:id,
		lon:lon,
		lat:lat//城市iD
	};
	$.post(url, pars, function(data,status) {
		if(status=="success"){
			if(data.length>0){
				var dataObj=eval("("+data+")");
				if(dataObj.msg=="success"){
					//获取 阴晴雨雪 
					var numweather=0;
					//alert(dataObj.data.forecast[1].conditionDay.indexOf("晴"));
					if(dataObj.data.forecast[1].conditionDay.indexOf("阴")>-1||dataObj.data.forecast[1].conditionDay.indexOf("云")>-1){
						numweather = 1
					}else if (dataObj.data.forecast[1].conditionDay.indexOf("晴")>-1){
						numweather = 2
					}else if (dataObj.data.forecast[1].conditionDay.indexOf("雨")>-1){
						numweather = 3
					}else if (dataObj.data.forecast[1].conditionDay == "雪"){
						numweather = 4
					}
					loadcss(numweather);
					//获取城市名称 citynamecn
					var cityname = dataObj.data.city.name;
					var rcity = cityname.replace("市","");
					var rcity1 = rcity.replace("区","");
					var rcity2 = rcity1.replace("县","");
					if(rcity2.indexOf("大港")==0){
						rcity2 = "大港";
					}	
					//如果经纬度存在 则赋值定位城市变量
					if(lon!=""&&lat!=""){
						city = rcity2;
					}
					localStorage.setItem(rcity2, dataObj.data.city.cityId);
					if(selcity!=""){
						$('#cname').text(selcity);
					}else{
						$('#cname').text(rcity2);
					}
					var firstinfo = document.getElementById("firstinfo");
					//读取湿度 如果没数据或者undefined默认为0
					var shidu = 0;
					if(undefined!=dataObj.data.forecast[1].humidity){
						shidu = dataObj.data.forecast[1].humidity
					}
					
					var firstResult="<div class='temperature'>"+dataObj.data.forecast[1].tempDay+"<sup>°</sup></div>"+
					"<p class='data'>"+dataObj.data.forecast[1].predictDate+" "+dataObj.data.forecast[1].conditionDay+"</p>"+
					"<p><img src='images/icon-14.png'/>"+dataObj.data.forecast[1].windDirDay+dataObj.data.forecast[1].windLevelDay+"级"+"<img src='images/icon-17.png'/>湿度"+
					shidu+"</p>"+"<p><img src='images/icon-15.png'/>气压 "+0+" hPa";
					firstinfo.innerHTML=firstResult;
					
					//初始化 城市列表
					var citylist = "";
					//加载 五日的简单气温显示
					//截取时间当前时间 
					var date1=new Date();
			        var date2=getDate(dataObj.data.forecast[1].updatetime);
					var date3=date1.getTime()-date2.getTime()  //时间差的毫秒数
					var leave2=date3%(3600*1000);
					var minutes=Math.floor(leave2/(60*1000));
					$('#hqtime').html(minutes+"分钟前");
					////// 储存 五天的预报的日期
					var arrs = dataObj.data.forecast;
					//五天的最高气温数组  和五天最低的气温数组
					var wryb =[];
					var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
					for(var i=1;i<6;i++){
						 //天气情况 
						var week = weekArray[(new Date(dataObj.data.forecast[i].predictDate).getDay())];
						if(i==1){
							wryb[i]='<li><img src=\"images/w'+getWeatherId(dataObj.data.forecast[i].conditionDay)+'.png\" alt=\"\" /><span>今天&nbsp&nbsp&nbsp&nbsp</span><div><p>'+dataObj.data.forecast[i].predictDate+'</p><p>'+dataObj.data.forecast[i].conditionIdNight+'° - '+dataObj.data.forecast[i].conditionIdDay+'°</p></div></li>';
						}else{
							wryb[i]='<li><img src="images/w'+getWeatherId(dataObj.data.forecast[i].conditionDay)+'.png" alt="" /><span>'+week+'</span><div><p>'+dataObj.data.forecast[i].predictDate+'</p><p>'+dataObj.data.forecast[i].conditionIdNight+'° - '+dataObj.data.forecast[i].conditionIdDay+'°</p></div></li>';
						}
					}
					var fsp = document.getElementById("fivesimple");
					fsp.innerHTML = wryb.join("");	
					//填充热门城市
					var citylist = document.getElementById("citylist");
					var citys=[];
					for(var i=0;i<hotcities.length;i++){
						citys [i]= "<li"+" onclick=\"add(\'"+hotcities[i].id+"\',\'"+hotcities[i].name+"\')\">"+hotcities[i].name+"</li>";
					}
					citylist.innerHTML =citys.join("");
				}else{
					$('.load').css("display","block");
					$('.loading').addClass("loadingFailed");
					$('.loading').html("数据加载失败，请点此<a href=\"javaScript:refresh()\">刷新重试  </a><span></span>");
					$('.main').css("display","none");
				}
			}
		}else{
			$('.loading').html("数据加载失败，请点此<a href=\"javaScript:refresh()\">刷新重试  </a><span></span>");
			$('.loading').addClass("loadingFailed");
		}
		 //导航显示
	    $("#navLeft").fadeIn();
	});
	
	$('.load').css("display","none");
	$('.main').css("display","block");
	$("#address").fadeIn()
}

function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
     function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}
//根据天气获取对应天气图标id 列如 天气晴 对应id是0 
function getWeatherId(wName){
	return weatherId[weatherName.indexOf(wName)];
}
