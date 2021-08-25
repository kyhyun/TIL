![JavaScript](https://user-images.githubusercontent.com/77887712/130802277-c1e981fc-a379-4eb5-a125-910ed72a11e8.png)


> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 12. 함수
프로그램을 구성하는 주요 구성요소로 함수를 이용한다면 중복 없이 유사한 동작을 하는 코드를 쉽게 호출할 수 있다. 크게 프로그램 마다 기본적으로 구성해서 갖추고 있는 내장 함수와 사용자가 직접 함수를 만들어 사용하는 외부 함수가 있다.

#### 함수 선언

함수 선언 방식은 다음과 같이 작성할 수 있다.

```javascript
function showMessage() {
    alert('안녕하세요');
}
```

`function` 키워드, 함수 이름, `()`괄호로 둘러싼 매개변수를 차례로 사용하면 이 처럼 함수를 선언할 수 있다. 현재 이 함수는 매개변수가 없는 함수이며, 매개변수를 구성하는 함수는 다음과 같이 작성한다.

```javascript
function name(paramaters) {
    // 함수 본문
}
```

`parameters`(매개변수) 는 호출할 때, 받을 수 있는 값을 받을 수 있는 인자로 이러한 매개변수가 여러 개라면 콤마로 구분해서 써준다.  `{}`괄호 안에는 함수가 호출되면 동작하는 코드가 담긴 본문 내용이 들어가는 자리다.

```javascript
function showMessage() {
  alert( '안녕하세요!' );
}

showMessage();
```

이렇게 `showMessage`라는 이름의 함수를 작성하여 호출하면 함수 본문에 있던`alert()`이 동작하여 메시지가 출력된다. 

---

#### 지역 변수

함수 내에서 선언한 변수는 지역 변수로써 함수 안에서만 접근 할 수 있게 된다.

```javascript
function showMessage() {
  let message = "안녕하세요!"; // 지역 변수

  alert( message );
}

showMessage(); // 안녕하세요!

alert( message ); // ReferenceError: message is not defined, 지역 변수 호출 불가
```

---

#### 외부 변수

반면에 함수 외부의 변수(전역 변수)는 함수 내부에 외부 변수로써 접근할 수 있다.

```javascript
let userName = 'John';

function showMessage() {
  userName = "Bob"; // (1) 외부 변수를 수정함

  let message = 'Hello, ' + userName;
  alert(message);
}

alert( userName ); // 함수 호출 전이므로 John 이 출력됨

showMessage();

alert( userName ); // 함수에 의해 Bob 으로 값이 바뀜
```



#### 매개 변수

#### 기본 값

#### 반환 값
