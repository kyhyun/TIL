package algorithm;

import java.util.Scanner;

public class SearchChar {

	// ���ڿ����� Ư�� ���ڿ��� ã�� �޼ҵ�
	public int Solution(String str, char t) {

		int answer = 0;
		str = str.toUpperCase();
		t = Character.toUpperCase(t);

		/* �Ϲ� for�� ���
		for(int i = 0; i < str.length(); i++) {
			if(str.charAt(i) == t) {
				answer++;
			}
		}
		 */
		
		// ���� for�� (for each) ���
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