package algorithm;

import java.util.Scanner;

public class SearchChar {

	// 문자열에서 특중 문자열을 찾는 메소드
	public int Solution(String str, char t) {

		int answer = 0;
		str = str.toUpperCase();
		t = Character.toUpperCase(t);

		/* 일반 for문 방법
		for(int i = 0; i < str.length(); i++) {
			if(str.charAt(i) == t) {
				answer++;
			}
		}
		 */
		
		// 향상된 for문 (for each) 방법
		for(char x : str.toCharArray()) {
			if(x == t) {
				answer++;
			}
		}

		return answer;
	}

	public static void main(String[] args) {

		Scanner kb = new Scanner(System.in);
		SearchChar T = new SearchChar();

		String str = kb.next();
		char c = kb.next().charAt(0);
		kb.close();

		System.out.println(T.Solution(str, c));

	}

}