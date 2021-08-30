![JavaScript](https://user-images.githubusercontent.com/77887712/130802277-c1e981fc-a379-4eb5-a125-910ed72a11e8.png)


> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.



# Chapter 12. 함수

프로그램을 구성하는 주요 구성요소로 함수를 이용한다면 중복 없이 유사한 동작을 하는 코드를 쉽게 호출할 수 있다. 크게 프로그램 마다 기본적으로 구성해서 갖추고 있는 내장 함수와 사용자가 직접 함수를 만들어 사용하는 외부 함수가 있다.

#### 1) 함수 선언

함수 선언 방식은 다음과 같이 작성할 수 있다.

```javascript
function name(paramaters) {
    // 함수 본문
}
```

`function` 키워드, 함수 이름, `()`괄호로 둘러싼 매개변수를 차례로 사용하면 이 처럼 함수를 선언할 수 있다. 현재 이 함수는 매개변수가 없는 함수이며, 매개변수를 구성하는 함수는 다음과 같이 작성한다.

```javascript
function 함수이름(매개변수1, 매개변수2, ..., 매개변수n) {
    /*함수 본문*/
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

#### 2) 지역 변수

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

#### 3) 외부 변수

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

---

#### 4) 매개 변수

매개변수를 이용하면 임의의 데이터를 함수 안에 전달할 수 있다.

```javascript
function showMessage(from, text){ // 인수(argument) : from, text
    alert(from + ' : ' + text);
}

showMessage('Jake', 'Hello!'); // Jake : Hello!
```



함수에 전달된 인자는 `from`과 `text`에 복사된 후 밖에서 호출할 때, 해당 내용을 복사하여 값으로 사용한다.

```javascript
function showMessage(from, text) {

  from = '*' + from + '*'; // "from"을 좀 더 멋지게 꾸며준다.

  alert( from + ': ' + text );
}

let from = 'Jake';

showMessage(from, 'Hello'); // *Jake*: Hello

// 함수는 복사된 값을 사용하기 때문에 바깥의 "from"은 값이 변경되지 않는다.
alert( from ); // Jake
```

---

#### 5) 기본 값

```javascript
function showMessage(from, text){
    alert(from + ' : ' + text);
}

showMessage('Jake'); // 'Jake : undefined' 가 출력된다.
```

매개변수에 값을 전달하지 않으면 그 값은 기본적으로 `undefined`가 된다.

두 번째 매개변수에 값을 전달하지 않았기 때문에 `text`에는 기본 값으로 `undefined`가 들어가서 에러 없이 위와 같이 출력된다. 



```javascript
function showMessage(from, text = "no text") {
  alert( from + ": " + text );
}

showMessage('Jake'); // Ann: no text
```

이처럼 매개변수에 값을 전달하지 않더라도 그 값이 `undefined`가 되지 않도록 기본 값을 설정해주는 방법도 있다. 



```javascript
function showMessage(from, text = anotherFunction()) {
  // anotherFunction()은 text값이 없을 때만 호출됨
  // anotherFunction()의 반환 값이 text의 값이 됨
}
```

기본 값에는 문자열뿐만아니라 또 다른 함수를 값으로 넣을 수 있어서 보다 복잡한 표현식도 기본값으로 설정할 수 있다.

---

#### 6) 반환 값

함수를 호출한 후 그 호출한 곳에 특정 값을 돌려줄 수도 있는데, 이 특정한 값을 반환 값이라고 한다.

```javascript
function sum(a, b) { // 두 인수를 받아 그 값을 더해주는 함수
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

지시자인 `return` 으로 시작해서 `;`으로 종료되는데, 이 지시자는 함수 안에서 어디든 사용할 수 있고, 함수는 실행흐름 중에 이 `return`을 만나면 함수 실행을 중단하고 호출한 위치에 값을 돌려준다. 



```javascript
function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm('보호자의 동의를 받으셨나요?');
  }
}

let age = prompt('나이를 알려주세요', 18);

if ( checkAge(age) ) {
  alert( '접속 허용' );
} else {
  alert( '접속 차단' );
}
```

위 코드 처럼 조건문을 이용하면 `return`을 분기마다 여러 개가 올 수 있도록 처리할 수 있다.



```javascript
// 지시자 return이 없는 경우 반환 값 확인 예시
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true

// 지시자 return만 있는 경우 반환 값 확인 예시
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

`return`이 없는 함수도 반환 값으로 `undefined`를 반환하며,  `return` 지시자만 있는 경우에도 `undefined`를 반환한다.



---

#### 7) 함수 이름짓기

함수는 어떤 `동작`을 수행하기 위한 코드를 모아놓은 집합이기 때문에 대부분 이름을 동사로 작성한다. 어떤 동작을 하는지 이름만 보고 알 수 있도록 간결하고 명확하게 작성하며, 동작을 축약해서 설명할 수 있는 동사에 접두어를 붙여서 이름을 붙이는게 관례적이다.

- **함수의 접두어 예시**
  - `get` : 값을 가져와서 반환
  - `show` : 무언가를 보여줌
  - `calc` : 무언가를 계산
  - `create` : 무언가를 생성
  - `chceck` : 무언가를 확인해서, 논리 값으로 반환

접두어를 사용하면 아래 예시처럼 함수가 어떤 동작을 하고 어떤 값을 반환하는지 알기 쉽다. 

```javascript
showMessage(..)     // 메시지를 보여줌
getAge(..)          // 나이를 나타내는 값을 얻고 그 값을 반환함
calcSum(..)         // 합계를 계산하고 그 결과를 반환함
createForm(..)      // form을 생성하고 만들어진 form을 반환함
checkPermission(..) // 승인 여부를 확인하고 true나 false를 반환함
```

함수는 이름에 언급되어 있는 동작을 정확히 수행해야하고, 그 이외의 동작을 수행해서는 안된다. 

독립적인 여러 개의 동작을 수행하기 위해서는 함수를 그 동작해야할 수 만큼 분류해서 한 함수에는 하나의 동작만이 수행되도록 작성해야 한다. 
