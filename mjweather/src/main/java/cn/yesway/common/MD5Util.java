package cn.yesway.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
  
public class MD5Util {  
	
	public static String md5String(String str) { 
		MessageDigest md;
		StringBuffer buf = new StringBuffer("");
		try {
			md = MessageDigest.getInstance("MD5");
			byte[] b = md.digest(str.getBytes());
			int i;
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return buf.toString();
	}	
}  
