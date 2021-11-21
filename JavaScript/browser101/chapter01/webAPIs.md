# Chapter 1. Web APIs 이해와 실전



## 1. 이해하기

## APIs ( Application Programming Interfaces )

- 각 애플리케이션에서 제공하는 API(윈도우, 맥IOS, 안드로이드, 유튜브 등)를 이용해서 우리가 원하는 기능을 이용할 수 있다. ( 유튜브 데이터 받아오기, 웹 사이트 만들기 등)
- **예시 1)** 자판기에서 내부적으로 어떻게 동작하는지 몰라도 자판기 앞에서 제공하는 동전 투입구, 메뉴 선택 버튼을 통해 자판기를 이용해 우리가 원하는 기능(음료 마시기)을 이용할 수 있다.
- **예시 2)** 전원 케이블에 우리가 소켓을 꽂기만 하면 내부적으로 어떻게 전원을 공급받고 집에 연결되어 처리되는지 모르더라도 손쉽게 전력을 공급받아 전자제품을 사용할 수 있다.
- **예시 3)** 우리가 작성하는 프로젝트에서 userStorage라는 클래스에서 login을 할 수 있는 함수, logout을 할 수 있는 함수가 있다면 이것도 해당 개발자가 작성한 APIs 라고 볼 수 있다.  (그렇기 때문에 이런 API를 사용하는 사람은 userStorage가 어떻게 생격먹었는지 모르더라도 그 안에 있는 login과 logout을 이용하여 로그인과 로그아웃의 기능을 이용할 수 있게 된다.)



## Web APIs

브라우저 자체에서 공통적으로 제공하기로 규약한 APIs

 ( 아래 나열한 것들을 제외하고도 많은 APIs가 존재한다... )

- **DOM APIs** : 웹페이지의 요소 조작 기능
- **Network APIs** : 서버와 통신 기능
- **Graphics ApIs** : 그래픽 관련
- **Audio/Video APIs** : 멀티미디어 관련
- **Device APIs** : 사용자 장치 관련
- **File APIs** : 파일 관련
- **Storage APIs** : 저장소 관련

프로젝트를 할 때, 사용할 API는 MDN 사이트에 가서 검색하고 찾아서 사용하는 것 정도만 숙지



#### Web APIs Security

- 사용자의 관한 요청이나 HTTPs 를 요구할 수 있음



#### External APIs

- 트위터, 트렐로, 핀터레스트, 유튜브 등의 서비스를 회사에서 APIs를 무료로 오픈하여 제공해주는 경우가 있기 때문에 이 APIs를 이용하여 나만의 멋진 앱들을 만들 수도 있다 !



## HTTP & HTTPS

#### HTTP( Hyper Text Transfer Protocol )

- 웹 클라이언트가 서버에게 정보를 요청하고 다시 서버에서 정보를 받아오는 통신 규약으로request를 하고와 response로 돌려주는 방식을 취한다.



#### HTTPS( Hyper Text Transfer Protocol Secure )

- 기존 통신 규약에서 정보가 잘 감싸져있는 보안 처리가 된 HTTP 프로토콜을 말한다. 네트워크에 전송된 정보가 encrypted가 되어, 해커가 그 정보를 훔쳐보더라도 그 글자가 무슨 글자인지 암호키로 처리되어 기존의 정보가 어떤 정보였는지 알 수 없다.



## 브라우저 객체 구조

![image-20211121203004813](C:\Users\yeong-hyeon kim\AppData\Roaming\Typora\typora-user-images\image-20211121203004813.png)

#### window

- 브라우저에서 현재 열려있는 전체적인 창을 의미한다. DOM, BOM, JavaScript를 모두 아우르는 브라우저의 최상위 Object이다. 브라우저는 기본적으로 this를 선언하면 window 객체를 가리키고 있다.

#### 

#### document

- window 안에 페이지가 표기 되는 부분으로 HTML이 작성되어 구조화되어지는 부분을 말한다.



#### navigator

- 전체적으로 브라우저와 운영체제에 관련된 정보를 담고 있는 Object



## window 구성 요소

- **DOM(Document Object Model)** : 웹 페이지 내의 모든 콘텐츠를 객체로 나타내며, 수정이 가능하다. ( 페이지의 기본 진입점 )
  - document

- **BOM(Browser Object Model)** : 문서 외 모든 것을 제어하기 위해 브라우저가 제공해주는 추가 객체로 **HTML 명세의 일부**이다.
  - Navigator, location, fetch, storage ... etc
- **JavaScript**
  - Array, Map, Data ... etc


대체로 이런 구성이기 때문에, 자바스크립트로 DOM과 BOM 등의 Web API를 같이 조작할 수 있는 것이다.

- 자주 사용하는 window object : size, scrolling, page load 확인 등에 사용한다.

---

#### 실행컨텍스트 간략하게 공부해보기 ~

- **this Binding ( this 바인딩 )**

​	실행 컨텍스트의 내부에서 this를 사용할 때 접근할 대상을 저장하고 있다.

- **this가 결정되는 시점** 

​	실행 컨텍스트가 만들어지는 시점

- **실행컨텍스트가 만들어지는 시점** 

​	함수의 호출(=메서드의 호출)이 발생 시, 생성된다.

---

**함수 or 메소드 호출 시 어떻게 this가 결정되는가 ?**

- **메소드의 경우**  

  Object.method ... 이런식으로 메소드를 사용하기 전에 `Object.` 로 지정이 되는데,

  그러면 앞에 지정한 객체가 바로 this의 대상이 되어 thisBinding에 저장되어 진다.

  그렇기 때문에 method 내부에서 this를 사용하는 경우 `Obejct.`를 대상으로 접근하게 된다.

- **함수의 경우** 

  `Object.` 이런식으로 호출이 이루어지지 않기 때문에 기본적으로 일반적인 함수의 호출은 this 바인딩에 명시되지 않아 default인 global object 인 window가 매칭된다.

보다 더 자세한 사항은 실행 컨텍스트를 공부하면서 익혀보도록 하자.



## 2. 실전 연습

## **1) Size**

#### Window Size 실습하기

1. **window.screen** : 브라우저 바깥 모니터의 전체 사이즈

2. **window.outer**: 브라우저 전체 사이즈

3. **window.inner** : 브라우저 페이지 내의 사이즈 ( 스크롤 바 포함 )

4. **document.documentElement.clientWidth** : 브라우저 페이지 내의 사이즈 ( 스크롤 바 제외 )

- 브라우저 사이즈가 변경이 될 때마다, 값이 따라서 업데이트 되어 변경됨



## **2) coordinates**(좌표)

###  x와 y 좌표 

- x : 수평축 , y : 수직축

- 브라우저의 좌표 (0, 0)의 지점은 페이지 부분에 좌상단 끝부분으로 시작점이다.

- x 축의 값이 증가하면 시작점 기준에서 오른쪽으로 이동

- y 축의 값이 증가하면 시작점 기준에서 아래로 이동

- ***Element*.getBoundingClientRect()** 함수

  - Element 객체 내에 존재하는 API

  - Element는 브라우저 위에 올라가 있는 DOM 안의 모든 요소(태그)를 의미한다.

  - 해당 API를 통해서 해당 요소에 대한 다양한 위치 관련 정보를 얻을 수 있다.

  - width, height 값이 얼마인지, top과 left의 position 정보 등을 얻을 수 있다.

    - left : 해당 요소의 x축 시작 부분이 브라우저 시작점으로 부터 얼마나 떨어져있는지에 대한 거리
    - top : 해당 요소의 y축 시작 부분이 브라우저 시작점으로 부터 얼마나 떨어져있는지에 대한 거리
    - right : 해당 요소의 x축 끝부분이 시작점으로부터 얼마나 떨어져있는지에 대한 거리
    - bottom : 해당 요소의 y축 끝부분이 시작점으로부터 얼마나 떨어져있는지에 대한 거리

    **※ CSS의 Position에 대한 right, bottom의 방향의 개념과 다르기 때문에 혼선되지 않도록 주의**

    - **CSS position에서 right** >> 브라우저 제일 오른쪽부터 떨어져 있는 거리
    - **CSS position에서 bottom** >> 브라우저 제일 밑에서부터 떨어져 있는 거리

  ![image-20211022175210078](C:\Users\yeong-hyeon kim\AppData\Roaming\Typora\typora-user-images\image-20211022175210078.png)



## **client와 page**

클라이언트가 버튼을 눌러서 발생하는, 그 클릭 이벤트에 대한 x와 y의 값 페이지에 존재하는 x, y의 값이 다르다.

- **client x, y** 

  클릭을 하면 우리가 등록한 event가 리스너에 전달되는데, 이벤트에는 client x, y에 대한 값이 들어있다. 사용자가 보는 페이지의 좌표는 상관 없이  브라우저 윈도우 창(시작점 0,0)이 이벤트 발생한 지점으로부터 얼마나 떨어져있는지에 대한 좌표 정보가 전달이 된다. **즉, 브라우저 윈도우 창의 시작점에서 이벤트 발생한 지점에 대한 x와 y가 client x, y의 값이 된다.**

  ![image-20211022181136484](C:\Users\yeong-hyeon kim\AppData\Roaming\Typora\typora-user-images\image-20211022181136484.png)



- **page x, y**

  페이지 문서 전체 길이를 놓고 봤을 때, 그 문서 위치의 시작점부터 이벤트가 발생한 지점이 얼마나 떨어져 있는지에 대한 좌표 정보가 전달이 된다. 

  ![image-20211022181227872](C:\Users\yeong-hyeon kim\AppData\Roaming\Typora\typora-user-images\image-20211022181227872.png)



## 3) Scrolling

 **`Window.scroll()`**

> 창을 문서의 특정 위치로 스크롤한다.

**Syntax**

```javascript
window.scrollBy(x-coord, y-coord); // 각 좌표는 양수, 음수, 숫자 0의 표현이 모두 가능하다.
window.scrollBy(options)
```

**parameters**

- x-coord : 스크롤 하려는 가로 픽셀의 값
- y-coord : 스크롤 하려는 세로 픽셀의 값

**options**

- top : 창이나 요소를 스크롤할 Y 축의 픽셀 수를 지정한다.
- left : 창이나 요소를 스크롤할 X 축의 픽셀 수를 지정한다.
- behavior : 스크롤 애니메이션이 부드럽게 진행될지(smooth), 한 번의 끊어진 동작으로 스크롤 이동을 처리할지(instant)에 대해 처리할 수 있고, 브라우저의 선택에 맡길지에 대한 옵션을 설정할 수 있다.(auto, default)

```javascript
// Using options example
window.scrollBy({
  top: 100,
  left: 100,
  behavior: 'smooth'
});
```



**`window.scrollBy()`**

> 창의 문서를 지정된 양만큼 스크롤한다.

**Syntax, Parameters, Options는 위 API와 동일**



**`window.scrollTo()`**

> 문서의 특정 좌표 세트로 스크롤한다.

**Syntax, Parameters, Options는 위 API와 동일**



**`Element.scrollIntoView()`**

> 해당 메서드가 호출된 요소가 사용자에게 표시되도록 요소의 부모 컨테이너를 스크롤한다.

**Syntax**

```javascript
element.scrollIntoView(); // 여기서 element는 HTML의 태그 요소들을 의미한다.
element.scrollIntoView(alignToTop); // Boolean parameter(True or False)
element.scrollIntoView(scrollIntoViewOptions); // Object parameter
```

**Parameters**

- **alignToTop** `optional` : 논리(부울) 값으로 아래와 같은 기능을 수행한다.
  - True : 요소의 상단이 스크롤 가능한 조상의 가시 영역의 상단으로 맞춰 정렬된다.
  - False : 요소의 맨 아래가 스크롤 가능한 조상의 가시 영역의 맨 아래로 정렬된다.
- **scrollIntoViewOPtions** `optional` : 아래의 기능들을 수행하는 개체이다.
  - behavior`optional` : 전환 애니메이션을 정의하며 auto 또는 smooth를 선택할 수 있다. (기본 값 : auto)
  - block `optional` : 수직 정렬을 정의하며 start, center, end, nearest를 선택할 수 있다. (기본 값 : start)
  - inline `optional` : 수평 정렬을 정의하며 start, center, end, nearest를 선택할 수 있다. (기본 값 : nearest)

---



## 4) Load

 Load는 브라우저가 파일에서 document(HTML)나 다른 리소스(이미지, 폰트, 동영상 등)을 불러오는 프로세스로 이벤트에 따라서 document를 먼저 불러온 후에 나머지 리소스를 처리하는 방식을 취하거나, 모든 리소스를 불러온 후에 함수를 호출하는 방식 등을 선택할 수 있다.



**이벤트 : load vs DomContentLoaded**

- **load** : 페이지 안의 모든 리소스(document 이외 이미지, 폰트, 동영상, 음성녹음 등)의 자원에 대한 로드까지 끝마쳐야 함수의 호출이 이루어지는 이벤트 키워드로 실행 시킬 Js 파일에 document 이외의 자원을 사용하고 있다면 load를 사용하여 처리한다.
- **DomContentLoaded** : Document(HTML)의 리소스 로딩이 완료되면 콜백 함수가 호출된다. Js 파일에 다른 리소스를 사용하지 않는다면, 이 이벤트로 처리하는 것이 웹 사용성이나 성능 측면에서 빠르고 좋다.



**이벤트 : unload vs beforeunload**

- **unload** : 페이지 안의 모든 리소스를 받아오지 못하는 상황에 콜백 함수를 호출시키는 이벤트로 
- **beforeunload** : 사용자가 페이지에서 나갈 때, 종료 직전의 상황에 콜배 함수를 호출시키는 이벤트로 사용자가 브라우저를 종료하기 전에 처리해주어야 하는 작업 (쿠키, 캐시 등의 필요 없는 정보 삭제 등)을 수행할 때 사용한다.

