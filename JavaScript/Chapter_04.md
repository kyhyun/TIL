<img src="C:\Users\yeong-hyeon kim\Pictures\깃 블로그 게시용 이미지\JavaScript.png" alt="JavaScript" style="zoom:50%;" />

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.



# Chapter 04. 자료형

자바스크립트에서는 8 가지의 기본 자료형이 있다. 또 자바스크립트의 변수는 자료형과 관계 없이 모든 데이터를 담을 수 있기 때문에 동적 타입언어라고 부른다.

 ```javascript
 // 선언된 변수에 어떤한 자료형을 담아도 문제가 없음
 let messege = 'hi'; // hi
 message = 100; // 100
 ```

#### 1. 숫자형(Number)

```javascript
let n = 123;
n = 12.345;
```

정수와 부동소수점 숫자를 나타낼 수 있으며, 이와 관련된 연산으로는 대표적으로 사칙연산( `+` `-` `*` `/` )이 있다. 일반적인 숫자를 제외하고 `Infinity`, `-Infinity`, `NaN` 같은 특수한 숫자 값도 있다.

```javascript
alert(1/0); // 무한대(Infinity)로 어떤 숫자보다 더 큰 특수 값을 의미한다.
alert('나는 문자 값이다' / 2); // NaN(Not a Number), 계산 중에 에러가 발생했음을 알려주는 기호
```

- **BIGInt**

  자바스크립트에서 표현할 수 있는 숫자 범위를 넘어서 표현해야하는 경우 사용하는 숫자 자료형으로 길이에 상관없이 정수를 나타낼 수 있으며 정수 리터럴 끝에 `n`을 붙여서 표현한다.

  ```javascript
  // BigInt형의 표현 예시
  const bigInt = 1234567890123456789012345678901234567890n;
  ```

  호환성 문제로 Firefox, Chrome, Edge, Saferi에서만 지원하며, IE에서는 지원하지 않는다.



#### 2. 문자형(String)

```javascript
// 자바스크립트로 문자열(String)을 표현하는 방법
let str = "HEllo"; // 큰따옴표(double quote)
let str2 = 'Single quotes are ok too'; // 작은따옴표(single quote)
let phrase = qcan embed another `#{str}`; //역 따옴표(backtick)
```

큰따옴표와 작은따옴표의 경우 기본적인 따옴표로, 자바스크립트에서는 이 두 표현방법에 차이는 없다. 역 따옴표는 변수나 표현식을 감싼 후에 ${내용}안에 넣어주면, 아래와 같이 원하는 변수나 표현식을 문자열 중간에 쉽게 넣을 수 있다.

```javascript
let name = 'John';
// 변수를 문자열 중간에 삽입
alert(`Hello, ${name}!`); // Hello, John!

// 표현식을 문자열 중간에 삽입
alert(`the result is {$1 + 2}`); // the result is 3
```

자바스크립트에서의 문자형은 글자 하나 혹은 여러 글자 모두 이 문자형으로 표현이 가능하지만, 일부 다른 언어(C 언어, Java 등)의 경우 하나의 단일 문자를 다루는 문자 자료형(Character)을 지원한다.



#### 3. 논리형(Boolean)

```javascript
let userRegistChecked = true; // 네, user resist가 확인되었습니다.(checked)
let acceptAgreeChecked = false; // 아니오, accept agree가 확인되지 않았습니다. (not checked)

let mathScore = 90;
let testPassCutLine = 80 <= mathScore; // 80점 이상인 경우 : true(예/통과)
alert( testPassCutLine ); // true
```

참(true)와 거짓(false)이라는 값을 가지고 있는 자료형으로 긍정의 의미를 표현할 때, true, 부정의 의미는 false를 사용한다. 또 비교한 후에 나온 결과 값을 저장하는 용도로 사용할 수도 있다.

#### 4. null

```javascript
let age = null;
```

자바스크립트에서 `null`은 존재하지않는 값, 비어 있는 값, 알 수 없는 값을 표현할 때 사용한다.

#### 5. undefined 

```javascript
let age;
alert(age); // 'undefined'가 출력
```

값이 할당되지 않은  상태를 의미한다. 변수를 선언하고, 값을 넣지 않은 경우 해당 변수에 이 자료형이 자동으로 할당된다. 변수가 비어있거나 알 수 없는 값을 표현하기 위해서는 null을 사용하는 것이 권장사항이며 undefined는 값이 할당되지 않은 변수의 초기값을 위한 예약어로 두는 것이 좋다.

#### 6. object

다른 기본(primitive) 자료형들과 다르게 복잡한 데이터 구조를 표현하기 위한 자료형

#### 7. symbol

객체의 고유한 식별자를 만들 때 사용하는 자료형

#### 8. typrof 연산자

인수의 자료형을 문자열로 반환하는 연산자로 주로 자료형에 따라 처리방식을 다르게 하거나, 변수의 자료형을 빠르게 확인할 때 사용한다.

1. 연산자 `typeof x`
2. 함수 `typeof(x)`

이렇게 두 가지 형태의 문법을 지원하며, 결과는 동일하다.

```javascript

typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof symbol("id") // "symbol"

typeof Math // "object"

typeof null // "object", null은 객체가 아니지만 언어상 오류로 object가 출력된다.

typeof alert // "function"
```

