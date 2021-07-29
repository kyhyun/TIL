package algorithm;

import java.util.Scanner;

public class Max3m {

	// 세 개의 정수 중에 최대값을 출력하는 메소드
	public int Max(int a, int b, int c) {

		int maxNumber = a;

		if(b > maxNumber) {
			maxNumber = b;			
		}

		if(c > maxNumber) {
			maxNumber = c;			
		}

		return maxNumber;

	}

	public static void main(String[] args) {

		Scanner stdIn = new Scanner(System.in);
		Max3m T = new Max3m();

		System.out.print("a의 값은 : ");
		int a = stdIn.nextInt();

		System.out.print("b의 값은 : ");
		int b = stdIn.nextInt();

		System.out.print("c의 값은 : ");
		int c = stdIn.nextInt();
		stdIn.close();

		System.out.println("최대값은 " + T.Max(a, b, c) + " 입니다.");

	}

}
