package cn.yesway.mj.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.yesway.mj.service.WeatherInformationService;




@Controller
@RequestMapping(value = "/*")
public class WeatherController {
	
	private static final Logger log = LoggerFactory
			.getLogger(WeatherController.class);
	
	@Autowired
	WeatherInformationService weatherInformationService;
	
	@RequestMapping(value = "index.html")
	public String goIndex() {
		log.info("goIndex Start");
		log.info("goIndex End");
		//GsonBuilder gb = new GsonBuilder();
	   // Gson g = gb.create();
		//请求获取天气
		//s.replace("[", "");
		//s.replace("]", "");
		//System.out.println(s);
		//Map<String, String> map = g.fromJson(s, new TypeToken<Map<String, String>>() {}.getType()); 
		//解析返回的json数组 返回前台页面
		return "index";
	}
	
	@RequestMapping(value = "/getWeather.do")
	public  @ResponseBody String getWeatherInfo(String cityId,String lon,String lat){
		log.info("getWeatherData start");
		log.info(weatherInformationService.getWeather(cityId, lon, lat));
		log.info("getWeatherData end");
		return weatherInformationService.getWeather(cityId, lon, lat);
	}
}
