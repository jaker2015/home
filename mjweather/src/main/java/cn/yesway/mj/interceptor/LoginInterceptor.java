package cn.yesway.mj.interceptor;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoginInterceptor implements HandlerInterceptor{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
		
		HttpSession session = request.getSession();
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		//PrintWriter out = null;
		//String temp = request.getServletPath();  //add by jak
		if (session == null || StringUtils.isEmpty((String)session.getAttribute("workNumber"))) {
			//测试加入 完事后删除 add by jak 2015-07-21
			/*if(temp.equals("/test/test.html")||temp.equals("/test/test.do")){
				//response.sendRedirect("/test/test.html");
				return true;
			}else{
				out = response.getWriter();
				out.println("<script type='text/javascript'>window.parent.location.href='" + request.getContextPath() + "/index.html';</script>");
				out.flush();
				out.close();
				return false;
			}*/
		} 
		
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

	}
}
