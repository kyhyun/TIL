![JavaScript](https://user-images.githubusercontent.com/77887712/131281159-6ea032f7-3752-4ba9-8955-126be5ad5e7a.png)

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 13. 함수 표현식

자바스크립트는 함수를 `특별한 동작을 하는 구조`가 아닌 특별한 종류의 값으로 취급한다. 

그래서 함수 선언 방식 말고 함수 표현식으로 함수를 생성할 수도 있다.

```javascript
let sayHi = function() {
  alert( "Hello" );
};
```

함수를 생성하고 변수에 값을 할당하는 것과 같이 함수를 변수에 할당할 수 있다.

```javascript
function sayHi() {
    alert( "Hello" );
}
alert( sayHi ); // sayHi 함수의 코드가 문자형으로 alert창에 그대로 호출된다.
```

`sayHi` 변수가 함수로 실행되기 위해서는 `()`가 있어야 하며, 괄호 없이 호출하는 경우 함수를 값으로써 사용하게 된다. 그래서 변수를 복사해서 다른 변수에 할당할 수도 있다.

```javascript
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi; // 괄호가 없어야 온전히 그 함수 그 자체를 복사하게 된다.
// ...
```

위 예시코드와 같이 함수 `sayHi`는 아래와 같이 함수 표현식을 사용해 정의할 수 있다.

---

### 콜백 함수

```javascript
/*
-- ask()의 매개변수에 대한 설명 --
question : 질문
yes : "Yes"라고 답한 경우 실행되는 함수
No : "No"라고 답한 경우 실행되는 함수
*/
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "동의하셨습니다." );
}

function showCancel() {
  alert( "취소 버튼을 누르셨습니다." );
}

// 사용법: 함수 showOk와 showCancel가 ask 함수의 인수로 전달됨
ask("동의하십니까?", showOk, showCancel);
```

함수는 반드시 `question`을 해야 하고, 사용자의 답변에 따라 `yes()` 나 `no()` 를 호출한다.

함수 `ask` 의 인수로 `showOk` 와 `showCancel` 은 **콜백 함수** 또는 **콜백**이라고 하며, 함수의 인수로 전달하고, 필요한 경우 인수로 전달한 함수를 나중에 호출한다.

```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "동의하십니까?",
  function() { alert("동의하셨습니다."); },
  function() { alert("취소 버튼을 누르셨습니다."); }
);
```

`ask()` 안에 선언된 함수들은 **익명 함수**라고 하는데, 

이 함수는 변수에 할당된 것이 아니기 때문에 `ask()` 바깥에서 접근할 수 없다.

---

### 함수 표현식과 함수 선언문 차이점

- **문법**

```javascript
// 함수 선언문
function sum(a, b) {
  return a + b;
}

```

함수를 사용하는 방식에는 이 두 방법은 우선 문법적으로 차이가 있다.

함수 선언문은 함수 주요 코드 흐름 중간에 독자적인 구문 형태로 있는 반면에

```javascript
// 함수 표현식
let sum = function(a, b) {
  return a + b;
};
```

 함수 표현식은 표현식이나 구문 구성의 내부에서 생성되고, 할당 연산자`=` 를 통해서 생성된다.

---

- **함수 생성 시기**

함수 선언문은 선언문이 정의되기 전에도 호출할 수 있다. 스크립트를 실행하기 전에 전역에서 선언된 함수 선언문을 찾고, 해당 함수를 생성하는 단계를 거치기 때문에 스크립트 어디서든 함수 선언문으로 선언한 함수를 접근할 수 있다.

```javascript
sayHi("John"); // Hello, John

function sayHi(name) { // 이미 실행 전에 생성했기 때문에 위쪽에서도 사용할 수 있다.
  alert( `Hello, ${name}` );
}
```

`sayHi`는 스크립트 실행 준비 단계에서 생성하기 때문에, 스크립트 전역에서 접근할 수 있다.

```javascript
sayHi("John"); // 실행 흐름이 도달해서 생성하기 전까지는 사용할 수 없다.

let sayHi = function(name) {  // sayHi가 호출되어 에러를 일으킨 후, 생성을 시작한다.
  alert( `Hello, ${name}` );
};
```

반면 함수 표현식은 실제 실행 흐름이 해당 함수에 도달했을 때, 함수를 생성하기 때문에 그 전까지는 그 함수를 사용할 수 없다. 

---

- **스코프(scope)**

`strict mode` 기준으로 함수 선언문이 코드 블록 내에 위치하면 해당 함수는 블록 내 어디서든 접근할 수 있다. 하지만 블록 밖에서는 함수에 접근할 수 없다.

```javascript
let age = prompt("나이를 알려주세요.", 18);

// 조건에 따라 함수를 선언함
if (age < 18) {

  function welcome() {
    alert("안녕!");
  }

} else {

  function welcome() {
    alert("안녕하세요!");
  }

}

// 함수를 나중에 호출합니다.
welcome(); // Error: welcome is not defined
```

함수 선언문은 함수가 선언된 코드 블록 안에서만 유효하기 때문에 범위를 벗어나는 경우 선언된 코드는 블록 안에서만 유효하기 때문에 에러를 발생시킨다.

```javascript
let age = prompt("나이를 알려주세요.", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("안녕!");
  };

} else {

  welcome = function() {
    alert("안녕하세요!");
  };

}

welcome(); // 제대로 동작합니다.
```

`if`문 블록 밖에서 `welcome()` 함수를 호출하기 위해서는 함수 표현식을 사용하면 블록 밖에서도 자유롭게 호출할 수 있게 된다.

```javascript
let age = prompt("나이를 알려주세요.", 18);

let welcome = (age < 18) ?
  function() { alert("안녕!"); } :
  function() { alert("안녕하세요!"); };

welcome(); // 제대로 동작합니다.
```

삼항 연산자를 이용해서 위의 코드를 단순화 시킬 수도 있다.

---

- **결론**

함수를 사용할 때는, 우선 함수 선언문을 이용해서 선언하는 것을 우선해서 고려하는 것이 가독성과 코드 구성 측면에서 자유롭기 때문에 좋으며, 함수 표현식은 블록의 범위를 넘어서 특정한 상황을 처리해야할 때 사용하는 편이 좋다.

