![JavaScript](https://user-images.githubusercontent.com/77887712/131299241-8ae29178-1bc8-4a5e-be0d-df0d67bf9823.png)

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.


# Chapter 14. 화살표 함수

함수를 보다 더 간결한 문법으로 함수를 표현할 수 있는 방법으로는 표현식 말고 화살표 함수(arrow function)을 사용하는 방법이 있다.

```javascript
let func = function(args1, args2, ..., argN) {
    return expression;
};

```

먼저 `func` 변수에 함수 표현식을 이용하여 반환 값을 `expression`을 반환하는 함수가 있다고 할 때,<br>
화살표 함수로 표현하면 다음과 같이 작성할 수 있다.

```javascript
let func = (arg1, arg2, ... argN) => expression
```

이렇게 함수 표현식보다 간결하게 화살표 함수를 통해 함수를 코드로 표현할 수 있다.

코드에 따라 인자(arg1, ... , argN)를 받는 함수 `func` 이 생성된다. <br>
`func` 은 화살표(`=>`) 기호에 따라 오른쪽의 표현식을 평가하고 그 평가 결과를 반환한다.



- **인수가 1개인 경우, 인수를 감싸고 있는 괄호를 생략할 수 있다.**

```javascript
let double = n => n * 2;
// let double = function(n) { return n * 2} 와 거의 같다.

alert( double(3) ); // 6
```



- **인수가 없는 경우, 괄호를 비울 수 있다. ( 단, 이 때 괄호는 생략할 수 없다. )**

```javascript
let sayHi = () => alert('안녕하세요!');

sayHi();
```



- **화살표 함수는 함수 표현식과 같은 방법으로 응용해서 사용할 수 있다.**

```javascript
let age = prompt('나이를 알려주세요.', 18);

let welcome = (age < 18)?
    () => alert('안녕') :
	() => alert('안녕하세요!');

welcome();
```

---

### 본문이 여러 줄인 화살표 함수

표현식이나 구문이 여러 개인 함수도 화살표 함수로 만들 수 있다.

이때, 중괄호`{}` 를 이용해서 안에 평가할 코드를 구분해서 넣어주어야하고,<br>
`return` 지시자를 사용해 며시적으로 결과 값을 반환하도록 해야한다.

```javascript
let sum = (a, b) => { // 중괄호는 본문이 여러 줄로 구성되어 있음을 알려준다.
    let result = a + b;
    return result; // 중괄호를 사용한다면, return 지시자로 결과 값을 반환해주어야 한다.
};

alert( sum(1,2) );//3
```



>  **화살표 함수의 추가적인 기능은 뒤에 자바스크립트 공부를 더 진행한 뒤에 이어서 추가하도록 하자.**
