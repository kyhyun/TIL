package algorithm;

import java.util.Scanner;

public class ChangeCase {

	// 문자열에 구성된 개별 문자에 대해 대소문자를 반전시켜주는 메소드
	public String Solution(String str) {

		String answer = "";

		/* for each문과 Character 메소드를 이용한 방법
		for(char x : str.toCharArray()) {			
			if(Character.isLowerCase(x)) {
				answer += Character.toUpperCase(x);
			} else {
				answer += Character.toLowerCase(x);
			}
		}
		 */

		// ASCII Number를 이용한 방법
		for(char x : str.toCharArray()) {
			if(x >= 65 && x <= 97) { // A~Z 사이의 문자가 있다면 true를 반환, 그렇지 않다면 false 반환하여 else 분기로 빠진다. 
				answer += (char)(x + 32);
			} else {
				answer += (char)(x - 32);
			}
		}

		return answer;

	}

	public static void main(String[] args) {
		Scanner kb = new Scanner(System.in);
		ChangeCase T = new ChangeCase();
		String inputString = kb.next();

		System.out.println(T.Solution(inputString));
		kb.close();
	}

}
