function showCityInfo() { 
	//加载城市查询插件
	for(var i=0;i<localStorage.length;i++){
		//key(i)获得相应的键，再用getItem()方法获得对应的值
		if(localStorage.key(i).indexOf("_AMap")==0){
			console.log(localStorage.key(i));
			localStorage.removeItem(localStorage.key(i));
		}
	}
	if(lat!=null&&lat!=""&&lng!=null&&lng!=""){
		loadingDate("",lng,lat);
		return ;
	}else{
		loadingDate("2","","");
		return ;
	}
	 
	 //第一次进来加载经纬度传入后台 返回当前城市名称和id 储存本地以便显示切换城市
	/* var map, geolocation;
	    //加载地图，调用浏览器定位服务
	    map = new AMap.Map('mapContainer', {
	        resizeEnable: true
	    });
	    map.plugin('AMap.Geolocation', function() {
	        geolocation = new AMap.Geolocation({
	            enableHighAccuracy: true,//是否使用高精度定位，默认:true
	            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
	            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
	            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
	            showButton: true,        //显示定位按钮，默认：true
	            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
	            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
	            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
	            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
	            zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	        });
	        map.addControl(geolocation);
	        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
	    });
	 
	    function onComplete(data) {
	    	alert();
	    	//alert(data.position.getLng());
	    	//alert(data.position.getLat());
	    	loadingDate("",data.position.getLng(),data.position.getLat());
	    }*/
	   
	 /* localStorage.removeItem("_AMap_AMap.CitySearch");
	    localStorage.removeItem("_AMap_maintmcvpvt");
	    localStorage.removeItem("_AMap_mainmcvpvt");
	    localStorage.removeItem("_AMap_maintcvpvt");
	    localStorage.removeItem("_AMap_AMap.Geolocation");
	    for(var i=0;i<localStorage.length;i++){
	    	  //key(i)获得相应的键，再用getItem()方法获得对应的值
	    	if(localStorage.key(i).indexOf("_AMap")>0){
	    		console.log(localStorage.key(i));
	    		localStorage.removeItem(localStorage.key(i));
	    	}
	    }
	    setTimeout(function(){
	    	 geolocation.getCurrentPosition();
	    }, 2000);*/
	   
}


function clickDiv(id){
	$('#d1').css("display","none");
	$('#d2').css("display","none");
	$('#d3').css("display","none");
	$('#d4').css("display","none");
	$('#d5').css("display","none");
	$('#d6').css("display","none");
	//更改样式
	$('.life').addClass("detailed");
	$('#'+id+'').css("display","block");
}

function citymanage(){
	//从本地取出 已经保存的城市
	loadcity();
	$('.main').css("display","none"); //首页div
	//$('.content_wrap').css("display","none");//城市管理div
	$('.hotcity').css("display","none");
	$('#navLeft').css("display","none");
	//$('.content').css("display","none");
	$('.content_wrap').css("display","block");
	$('.addCity').css("display","block");
}
function loadcity(){
	//localStorage.clear();
	localStorage.removeItem("_AMap_AMap.Geolocation");
	var list = document.getElementById("list"); 
	var result="";
	result +="<li class='on'><div onclick=\"tabcity(\'"+city+"\')\" ><img src='images/icon-18.png'/>"+city+"</div></li>";
	if(localStorage.length>0){ 
		for(var i=0;i<localStorage.length;i++){
			var name = localStorage.key(i);
			if(name != city){
				result += "<li><div onclick="+'"tabcity('+"'"+name+"'"+')">'+name+"</div><div onclick='del(\""+name+"\")'"+">删除</div></li>";  
			}
		}
	}
	//默认显示+号 和当前定位的城市
	result +="<li class='add'><div onclick='cityselect()'>+</div><div></div></li>";
	list.innerHTML = result;
}
function returngo(){
	$('.content_wrap').css("display","none");
	$('#navLeft').css("display","block");
	$('.main').css("display","block");
	$('#navLeft li:last').addClass("on").siblings().removeClass("on");
	$("#u").html("");
	document.getElementById("city_name").value="";
}
function del(city){
	localStorage.removeItem(city);
	loadcity();
}
function cityselect(){
	$('.addCity').css("display","none");
	$('.hotcity').css("display","block");
	$('#citylist').css("display","block");
}
function refresh (){
	var name = $('#cname').text();
	tabcity(name);
}
function tabcity(name){
	var id =localStorage.getItem(name);
	selcity=name;
	$('.main').css("display","none"); //首页div
	$('.content_wrap').css("display","none");//城市管理div
	$('.hotcity').css("display","none");
	$('#navLeft').css("display","block");
	$('#navLeft li').removeClass("on").eq(4).addClass("on");
	loadingDate(id,"","");
}
function add(id,name){
	localStorage.setItem(name,id);
	loadcity();
	$("#u").html("");
	//添加完成后返回成城市管理界面
	$('.hotcity').css("display","none");
	$('.content_wrap').css("display","block");
	$('.addCity').css("display","block");
}


function serachhotcity(){
	//alert($("#txt").val().length);
	if($("#city_name").val().length<2){
		$("#u").html("");
		$("#citylist").show();
		$("#tip").hide();
		//return;
	}else{
		// 获取输入值 检索数组 把需要的值取出来
		var str = $("#city_name").val();
		$("#citylist").hide(0);
		$("#tip").html("");
		$("#tip").show();
		var k=0;
		for(var i=0;i<citiesall.length;i++){
			//如果name包含 用户输入 或者 province也包含输入 就显示出来
			//alert(hotcities[i].name.indexOf(str));name_py
			if(citiesall[i].name.indexOf(str)>-1||citiesall[i].province==str/* ||citiesall[i].name_py.indexOf(str)>-1 */){
				if(k<11){
					$("#tip").append("<li>"+citiesall[i].name+"</li>");
					$('#tip li').bind('click',function(){
						$('#city_name').val($(this).html())
						$('#tip li').hide()
					});
					k++;
				}else{
					break;
				}				
			}
		}
	}
}

function serachcity(){
	$('#tip li,#citylist').hide();
	var str = $("#city_name").val();
	$("#u").html("");
	var k=0;
		for(var i=0;i<citiesall.length;i++){
			//如果name包含 用户输入 或者 province也包含输入 就显示出来
			//alert(hotcities[i].name.indexOf(str));name_py
			if(citiesall[i].name.indexOf(str)>-1||citiesall[i].province==str/* ||citiesall[i].name_py.indexOf(str)>-1 */){
				if(k<24){
					$("#u").append("<li onclick=\"add(\'"+citiesall[i].id+"\',\'"+citiesall[i].name+"\')\">"+/* citiesall[i].province+"-"+ */citiesall[i].name+"</li>");
					k++;
				}else{
					break;
				}				
			}
		}
}
