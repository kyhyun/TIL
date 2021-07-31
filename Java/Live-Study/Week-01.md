# [1주차] JVM은 무엇이며 자바 코드는 어떻게 실행 되는 것일까?

### 목표
자바 소스 파일(.java)을 JVM으로 실행하는 과정을 이해하기

### 학습할 것 (필수)
- JVM이란 무엇인가
- 컴파일 하는 방법
- 실행하는 방법
- 바이트코드란 무엇인가?
- JIT 컴파일러란 무엇이며 어떻게 동작하는가?
- JVM 구성 요소
- JDK와 JRE의 차이
--- 
## JVM이란 무엇인가
<img src="http://www.itworld.co.kr/sites/default/files/image/2018/09/jw_jvm_overview_3x2_1200x800-100758586-large(1).jpg" alt="img"/><br>
[참조] : https://gyoogle.dev/blog/computer-language/Java/Java%20Virtual%20Machine.html

의미를 그대로 해석하면 자바 가상 기계를 뜻하며 
자바를 실행에 필요한 실행 주체로 byte 코드를 해석하는 역할을 한다.(컴퓨터와 유사한 기계를 소프트웨어로 구현한 형태)
자바의 특징 중에서는 운영체제(OS)에 독립적이라는 특성이 대표적인 특성으로 꼽힌다.
그것은 JAVA 라는 언어가 지향하고 있는 이상의 목표인 '한 번 작성하면, 어디서나 실행된다.'
WORA(Write once, run anywhere)에 의해 여러 운영체제에 설치할 수 있는 서로 다른 버전의 JVM을 썬에서 제공하고 있으며, 
자바 애플리케이션이 실행되기 위해서는 JVM과 OS를 거치고 하드웨어에 전달하며 
JVM은 애플리케이션과 OS 사이의 중간에 위치하여 다양한 운영체제에  역할을 맡는다.

## 컴파일 하는 방법

프로그램 코드를 컴퓨터가 이해할 수 있는 언어로 변환해주는 과정을 컴파일이라고 하며, 
이 작업을 수행하는 소프트웨어를 컴파일러라고 부른다.
Java에서는 javac가 자바 소스를 바이트 코드로 변환시키는 컴파일러로 이용된다.
(.java)라는 소스파일을 javac.exe를 통해서 컴파일을 진행하고 (.class)라는 클래스 파일의 바이트 코드로 변환시킨다.
자바 컴파일러는 jdk를 설치하면 bin 폴더 안에 있는 javac.exe라는 이름의 폴더로 설치되며 이용할 수 있다.
대부분은 통합개발도구인 IDE를 통해 컴파일을 수행하기 때문에 직접 컴파일 하는 경우는 거의 없으나, 
경우에 따라서는 터미널을 이용해 컴파일을 할 수도 있다.

터미널의 경우에는 change directory(cd)로 컴파일한 소스코드가 있는 디렉토리(bin 폴더)에
이동한 다음 javac [소스코드파일명].java를 통해 컴파일을 수행할 수 있다.


```java
class Hello {
	public static void main(String[] args){
	
	System.out.println("Hello, World!");

	}

}
```
우선 이와 같이 소스파일(Hello.java)의 컴파일 과정을 예로들면 ..

![image](https://user-images.githubusercontent.com/77887712/127742463-43816753-d7b8-4508-a9a7-dd03cdf5fa18.png)<br>
[그림-1] 소스파일이 담긴 bin 폴더로 이동 <br>

![image](https://user-images.githubusercontent.com/77887712/127742477-5671e574-9b0f-4dda-9037-7f54482467cb.png)<br>
[그림-2] Hello.java라는 파일을 javac.exe를 실행시켜 컴파일 진행<br>

![image](https://user-images.githubusercontent.com/77887712/127742668-30946cc6-f8c3-4193-8eec-3c4efd320423.png)<br>
[그림-3] 컴파일 진행 후 결과 : Hello.class라는 바이트 코드로 변환된 결과물이 생성 <br>

## 실행하는 방법
생성된 (.class)파일은 현재 클래스 파일이 있는 디렉토리에서 java [실행할 클래스 파일명]을 통해서 실행시킬 수 있다.

![image](https://user-images.githubusercontent.com/77887712/127742801-a15c10a5-aef5-4613-a706-390bf349d7b6.png)<br>
[그림-4] 바이트 코드로 변환된 Hello.class파일을 실행<br>

![image](https://user-images.githubusercontent.com/77887712/127742849-e7b80d9a-1b3a-4586-bd04-0087e7caedc4.png)<br>
[그림-5] Hello.class 파일의 내용을 출력한 결과<br>






## 바이트코드란 무엇인가

## JIT 컴파일러란 무엇이며 어떻게 동작하는가?

## JVM 구성 요소

## JDK와 JRE의 차이

