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
<div align="center">
	<img src="http://www.itworld.co.kr/sites/default/files/image/2018/09/jw_jvm_overview_3x2_1200x800-100758586-large(1).jpg" alt="img"/><br>
	[참조] : <a href="https://gyoogle.dev/blog/computer-language/Java/Java%20Virtual%20Machine.html">[Java] 자바 가상 머신(Java Virtual Machine)</a>
</div><br>

의미를 그대로 해석하면 자바 가상 기계를 뜻하며 자바를 실행에 필요한 실행 주체로 바이트코드를 해석하는 역할을 한다.<br>
(컴퓨터와 유사한 기계를 소프트웨어로 구현한 형태) 자바의 특징 중에서는 운영체제(OS)에 독립적이라는 특성이 대표적인 특성으로 꼽힌다.
그것은 JAVA 라는 언어가 지향하고 있는 이상의 목표인 '한 번 작성하면, 어디서나 실행된다.'
WORA(Write once, run anywhere)에 의해 여러 운영체제에 설치할 수 있는 서로 다른 버전의 JVM을 썬에서 제공하고 있으며, 
자바 애플리케이션이 실행되기 위해서는 JVM과 OS를 거치고 하드웨어에 전달하며 
JVM은 애플리케이션과 OS 사이의 중간에 위치하여 다양한 운영체제에  역할을 맡는다.

## 컴파일 하는 방법

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/127755057-96eb6c50-971d-4000-861c-c45a3355040f.png" alt="컴파일환경"><br>
java 소스 컴파일 과정 </p>
프로그램 코드를 컴퓨터가 이해할 수 있는 언어로 변환해주는 과정을 컴파일이라고 하며, 
이 작업을 수행하는 소프트웨어를 컴파일러라고 부른다.
Java에서는 javac가 자바 소스를 바이트코드로 변환시키는 컴파일러로 이용된다.
(.java)라는 소스파일을 javac.exe를 통해서 컴파일을 진행하고 (.class)라는 클래스 파일의 바이트코드로 변환시킨다.
자바 컴파일러는 jdk를 설치하면 bin 폴더 안에 있는 javac.exe라는 이름의 폴더로 설치되며 이용할 수 있다.
대부분은 통합개발도구인 IDE를 통해 컴파일을 수행하기 때문에 직접 컴파일 하는 경우는 거의 없으나, 
경우에 따라서는 터미널을 이용해 컴파일을 할 수도 있다.

터미널의 경우에는 change directory(cd)로 컴파일한 소스코드가 있는 디렉토리(bin 폴더)에
이동한 다음 `javac [소스코드파일명].java` 를 통해 컴파일을 수행할 수 있다.


```java
class Hello {
	public static void main(String[] args){
	
	System.out.println("Hello, World!");

	}

}
```
우선 이와 같이 소스파일(Hello.java)의 컴파일 과정을 예로들면 ..

![image](https://user-images.githubusercontent.com/77887712/127742463-43816753-d7b8-4508-a9a7-dd03cdf5fa18.png)<br>
1.소스파일이 담긴 bin 폴더로 이동 <br>

![image](https://user-images.githubusercontent.com/77887712/127742477-5671e574-9b0f-4dda-9037-7f54482467cb.png)<br>
2.Hello.java라는 파일을 javac.exe를 실행시켜 컴파일 진행<br>

![image](https://user-images.githubusercontent.com/77887712/127742668-30946cc6-f8c3-4193-8eec-3c4efd320423.png)<br>
3.컴파일 진행 후 결과 : Hello.class라는 바이트코드로 변환된 결과물이 생성 <br>


## 실행하는 방법

생성된 (.class)파일은 현재 클래스 파일이 있는 디렉토리에서 `java [실행할 클래스 파일명]`을 통해서 실행시킬 수 있다.

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/127757202-a4137a0e-f160-4b7d-8a51-17815f068073.png" alt="JVM구성요소"><br>
자바 코드의 전체적인 수행 과정</p><br>

이 처럼 명령어를 통해 JVM 내부에서는 런타임이 발생하면 클래스 로더(Class Loader)를 통해서 해당 클래스(.class)를 로드하고 메모리 영역인
Runtime Data Area(JVM Memoey)에 배치시키는 작업이 이루어진다. 그 후에 Execution Engine을 통해 로드된 클래스 파일의 바이트코드가
인터프리터 혹은 JIT 컴파일러를 통해 기계어를 번역하고 해당 내용에 대한 동작을 수행하게 된다.

![image](https://user-images.githubusercontent.com/77887712/127742801-a15c10a5-aef5-4613-a706-390bf349d7b6.png)<br>
1.바이트코드로 변환된 Hello.class파일을 실행<br>

![image](https://user-images.githubusercontent.com/77887712/127742849-e7b80d9a-1b3a-4586-bd04-0087e7caedc4.png)<br>
2.Hello.class 파일의 내용을 출력한 결과<br>


## 바이트코드란 무엇인가

Java와 기계어 사이의 중간 코드로 자바 코드를 배포하는 단위 중에 가장 작은 단위(1 byte)다.
JVM에서는 이 바이트코드를 읽고 컴퓨터가 이해할 수 있는 언어로 변환하는 작업을 수행한다.
때문에 JVM 환경에서 수행되는 언어 (Scala, Java, JRUBY, Kotlin ...)는 모두 이와 같이 사용자의 언어인 자바와 기계어 사이의 중간 언어인
"자바 바이트코드를 이용한다."는 특성을 가진다.

## JIT 컴파일러란 무엇이며 어떻게 동작하는가?

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/127754826-a5c1b6f9-70f5-4aa8-982d-b3b065975a7c.png" alt="JIT 컴파일러 작동원리"><br>
[참조] : <a href="https://www.geeksforgeeks.org/just-in-time-compiler/">Working of JIT Compiler</a></p>

JIT 컴파일은 동적 번역이라고 부르며, 이것은 프로그램을 실제로 실행하는 시점에 기계어로 번역하는 컴파일 기법이라는 의미다.
기존에 기계어를 번역할 때는 두 가지 방법으로 인터프리터 번역과 컴파일러를 이용한 번역이 있다.
인터프리터 방식은 실행 중 프로그래밍 언어를 읽으며 해당 기능에 대응하는 기계어 코드를 실행하며
정적 컴파일은 실행하기 전에 프로그램 코드를 기계어로 번역하는 과정을 거친다.
JIT 컴파일은 이 두 가지의 방식을 혼합한 형태라고 보면 된다.

바이트코드는 기본적으로 인터프리터에 의해 기계어 코드로 변환되어 실행된다. 번역 과정은 코드를 한 줄 씩 실행하며, 여러 번 실행하는 환경에서는 다소 느리다는 단점이 있다.
JIT 컴파일러는 이러한 인터프리터의 단점을 보완한 형태의 컴파일러로 빈번하게 혹은 반복적으로 사용되는 코드에 대해서 매번 인터프리터에 의해 기계어로 변환되지 않고
바로 사용할 수 있도록 전체 바이트코드를 캐시를 이용해서 기계어 코드로 변환시키며 코드의 수행시간에 최적화를 제공한다.
같은 코드에 수정사항이 발생하면 바뀐 부분만 컴파일하고 나머지는 캐싱된 코드를 사용한다.

## JVM 구성 요소
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/127758107-5147f56b-a5b5-4ab0-96ae-0eb745f3aa99.png" alt="JVM Architecture Diagram"><br>
[참조] : <a href="https://javatutorial.net/jvm-explained">JVM 구조 다이어그램</a></p><br>

JVM은 위 그림과 같이 크게 세 가지 구성 요소(클래스 로더, 런타임 데이터 영역, 실행엔진)로 이루어져 있으며<br>
각 구성요소에 대해 자세히 살펴보고자 한다.

1. Class Loader
런타임에서 클래스를 처음으로 참조할 때 해당 클래스를 로드하고 메모리 영역에 배치시킨다.<br> 
실질적으로 동적 로드를 담당하는 부분이라고 할 수 있다.

- Class Loader의 구성
	- Loading : class를 읽어오는 과정
 		- 읽는 절차로는 Class가 이미 로드 되었는지 확인 후, 
 		로드가 안됐다면 부모 class loader에 class를 로드하도록 요청하고 부모 클래스가 로드를 할 수 없다면 이 클래스 로더에 로드를 하는 방식이다.
 		(클래스 로더는 계층적으로 끝지점에 도달했을 때도 class를 찾지 못하면 `ClassNotFoundException`으로 RuntimeException 에러가 발생한다.)
 
	- link : reference를 연결하는 과정
	- initialization : static 값을 초기화 하고 변수에 할당하는 과정

2. Runtime Data Area
운영체제 위에 실행되면서 할당받는 메모리 영역이다. 이 런타임 데이터 영역은 총 6개의 영역으로 나누어지며, 스레드 생성 방식에 따라 2가지 분류로 구분된다.
스레드마다 하나씩 생성되는 방식으로는 `PC Register`, `Stack Area`, `Native Method Stack`이 있으며
모든 스레드가 공유해서 사용하는 방식으로는 `Heap`, `Method Area`, `Runtime Constant Pool`이 있다.
```
- PC Register
    스레드가 어떤 명령으로 실행될지가 기록되는 부분으로 현재 수행중인 JVM 명령의 주소를 가지고 있는 공간이다.
    
- Stack Area
   지역변수, 매개변수, 메서드 정보, 임시 데이터 등을 저장하는 공간으로 
   메서드를 호출할 때 마다 새 프레임이 생성되고(push), 완료되면 삭제된다.(pop)
   스택은 공유자원이 아니기 때문에 스레드 세이프하며, 
   내부에서는 LocalVariable Array, Operand Stack, Frame Data의 영역으로 나뉘어 있다.
   
- Native Method Stack
    자바 외의 언어로 작성된 네이티브 코드를 위한 스택으로 "JNI(Java Native Interface)"를 통해
    C/C++ 등의 코드를 수행하기 위해 언어에 맞는 스택이 생성된다.
    
- Heap
    런타임에 동적으로 할당되는 데이터가 저장되는 영역으로 객체나 배열 같은 참조형 데이터 타입의 생성은 여기에서 이루어진다.
    (Heap에 할당되는 데이터들은 Garbage Collector(GC)의 대상으로 JVM 성능 이슈에 가장 중요한 공간이다.)
    
- Method Area
    JVM이 시작될 때 생성되고, JVM이 읽은 각각의 클래스와 인터페이스에 대한 
    런타임 상수풀, 필드 및 메서드 코드, 정적 변수, 메서드의 바이트코드 등을 보관한다.
    
- Runtime Constant Pool
    Constant_pool 테이블에 해당하는 영역으로 메서드 영역에 포함되는 부분이지만 
    JVM 명세에서 따로 중요하게 기술하기 때문에 분류되었다.
    각 클래스와 인터페이스의 상수뿐만 아니라, 메서드와 필드에 대한 
    모든 레퍼런스까지 담고 있는 테이블로 어떤 메서드나 필드를 참조할 때
    JVM은 이 영역을 통해 메서드나 필드의 실제 메모리상 주소를 찾아서 참조하게 된다.
```
3. Execution Engine
로드된 class의 바이트코드를 실행하는 런타임 모듈이다. 실행엔진은 이 코드를 명령어 단위로 읽어서 실행하며
바이트코드를 실제 JVM 내부에서 기계가 실행할 수 있는 형태로 변경하는 방식(인터프리터, JIT 컴파일)으로 이루어진다.
실행엔진의 구성요소는 Interpreter, JIT Compiler, Garbage Collector가 있다.
- Interpreter
	- 바이트코드를 더 빨리 해석하지만 실행속도가 느리다.
	- 하나의 메서드가 여러 번 호출 될 때마다, 항상 새로운 해석을 해야한다.
- JIT(Just-In-Time) Compiler
	- Interpreter의 단점을 보완한 형태
	- 인터프리터 방식으로 실행하다가 특정 시점에서 바이트코드 전체를 컴파일하여 네이티브 코드로 변경하고
	 이후에는 해당 메서드를 더 이상 인터프리팅하지 않고 코드 전체를 컴파일하여 네이티브 코드로 직접 실행하는 방식이다.
	 - 바이트코드를 컴파일하는 과정은 Interpreter 방식보다 느리지만 한 번 컴파일된 네이티브 코드는 캐시에 보관하여 실행될 때 마다 사용하기 때문에 수행속도가 빠르다.
	 - 따라서 JVM 내부에서 해당 메서드의 실행 빈도가 높은 경우, JIT 컴파일을 수행한다.
- Garbage Collector
	- 프로세스의 전반적인 메모리 관리를 담당하며, 참조되지 않은 객체를 모아서 제거하는 역할을 수행한다.
	- **실행 순서** 
		- 참조되지 않은 객체 탐색 후 삭제 > 삭제된 객체의 메모리 반환 > 힙 메모리 재사용

## JDK와 JRE의 차이
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/127759800-38148a16-1f7f-4ecd-8494-188cea740e95.png" alt="jdk architecture" width="500px"><br>
	[참조]: <a href="https://www.javacodemonk.com/">포함관계 도식도</a><br></p>

- JRE(Java Runtime Environment)
	- 자바 프로그램을 실행하기 위한 환경(라이브러리, JVM, 기타 컴포넌트)을 제공하는 도구로 자바 프로그램을 단순히 실행하기 위해 사용된다. 
- JDK(Java Development Kit)
	-  JRE에 추가로 Java 프로그램을 개발하는데 필요한 컴파일러, 디버거 등과 같은 개발 도구를 추가한 것으로 JDK 안에 JRE가 포함되어 있다.
서로 포함 관계를 나타내자면 `JVM ⊂ JRE ⊂ JDK` 라고 볼 수 있다.

