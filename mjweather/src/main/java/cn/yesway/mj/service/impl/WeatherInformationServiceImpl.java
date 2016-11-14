package cn.yesway.mj.service.impl;


import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import cn.yesway.common.HttpRequest;
import cn.yesway.common.MD5Util;
import cn.yesway.mj.service.WeatherInformationService;
@Service
public class WeatherInformationServiceImpl implements WeatherInformationService{
	private static final Logger log = LoggerFactory.getLogger(WeatherInformationServiceImpl.class);
	private final String URL="http://coapi.moji.com/whapi/json/weather";
	private final String KEY="mojitest20151208";
	private final String TOKEN="fe0062a7548bd737ce079";
	public String getWeather(String id,String lon,String lat) {
        long  l = System.currentTimeMillis();
        Integer a = (int) l;
        String result= "";
		String s = KEY+a.toString();
		StringBuilder sb = new  StringBuilder();
		sb.append("timestamp="+a.toString()).append("&token="+TOKEN);
		if(id==null||id.equals("")&&null!= lon&& null!=lat&&!lon.equals("")&&!lat.equals("")){
			sb.append("&cityId=2");
			s+= id;
		}else{
			sb.append("&cityId="+id);
			s+= id;
		}
		sb.append("&key="+MD5Util.md5String(s));
		if(null!= lon&& null!=lat&&!lon.equals("")&&!lat.equals("")){
			sb.append("&lon="+lon+"&lat="+lat);
		}
		result= HttpRequest.sendGet(URL,sb.toString());
		log.info("wjweather interface return : "+result);
		byte[] bs = result.getBytes();
		String newResult = null;
		try {
			newResult = new String(bs,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return newResult;
	}

}
