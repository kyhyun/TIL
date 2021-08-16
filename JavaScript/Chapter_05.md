<img src="C:\Users\yeong-hyeon kim\Pictures\깃 블로그 게시용 이미지\JavaScript.png" alt="JavaScript" style="zoom:50%;" />

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 05. 형 변환

자료형이 함수 또는 연산 과정에서 상황에 맞는 자료형으로 맞춰서 하나의 자료형으로 일치시켜야하며 이러한 과정을 형 변환이라고 한다. 상황에 맞게 자동으로 자료형을 맞춰주는 묵시적인 형 변환과 전달받은 값을 의도적으로 원하는 타입으로 변환해야하는 명시적 형 변환으로 나뉘어진다.

#### 1. 문자 형 변환

```javascript
// 자동 형 변환 예제
let value = true;
alert(typeof value); // boolean

// String(value)함수를 이용한 명시적 형 변환 예제
value = String(value); // 변수 value엔 문자열 "true"가 저장됩니다.
alert(typeof value); // string
```



#### 2. 숫자 형 변환 

```javascript
// 자동 형 변환 예제
alert('6' / '2'); // 3, 문자열이 숫자형으로 자동 형반환 된 후 연산 수행이 이루어진다.

// Number(value)함수를 이용한 명시적 형 변환 예제
let str = '123';
alert(typeof str); // string

let num = Number(str); // 123, 문자열 '123'이 숫자 123으로 변환된다.
alert(typeof num); // number

// 숫자 외의 값 형 변환 처리 실패 예제
let age = Number('임의의 문자열 123');
alert(age); // NaN, 숫자 외 글자가 들어있는 문자열은 숫자형의 형 변환에 실패한다.

```

- **숫자형 변환 시 적용되는 규칙**

  - undefined : `NaN`
  - null : `0`
  - true & false : `1` and `0`
  - string 
    - 문자열의 처음와 끝 공백이 제거되고, 문자열이 없다면 `0` 
    - 그렇지 않다면 문자열에서 숫자를 읽으며 변환에 실패하면 `NaN` 

  ```javascript
  alert( Number("   123   ") ); // 123
  alert( Number("123z") );      // NaN ("z"를 숫자로 변환하는 데 실패함)
  alert( Number(true) );        // 1
  alert( Number(false) );       // 0
  ```

  

#### 3. 논리 형 변환

```javascript
// Boolean(value)를 이용한 명시적 형 변환 예제
alert( Boolean(1) ); // 숫자 1(true)
alert( Boolean(0) ); // 숫자 0(false)

alert( Boolean("hello") ); // 문자열(true)
alert( Boolean("") ); // 빈 문자열(false)
alert( Boolean("0") ); // 문자열(true), 문자열 '0'은 비어 있지 않는 문자열임
alert( Boolean(" ") ); // 문자열(true), 공백(space) 또한 비어 있지 않는 문자열
```

숫자 `0`, 빈 문자열 `null`, `undefined`, `NaN`와 같이 비어있는 값은 `false`, 그 외의 값은 `true`

