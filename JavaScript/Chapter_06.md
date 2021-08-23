![JavaScript](https://user-images.githubusercontent.com/77887712/129684849-2b719287-96cb-4c24-833a-df4e90e96273.png)


> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 06. 연산자(Operator)



#### 1. 기본 연산자

- **단항, 이항, 피연산자**
  - **피연산자** : 연산자가 연산을 수행하는 대상으로 인수라고도 부른다.
  - **단항 연산자** : 피연산자를 하나만 받는 연산자로 기존 피연산자에 수식하는 `±`부호를 말한다.
  - **이항 연산자** : 두 개의 피연산자를 받는 연산자
  
  

- **산술 연산자**
  - 덧셈 `+` , 뺄셈 `-`, 곱셈`*`, 나눗셈`/`, 나머지`%`, 거듭제곱`**` 이 있다.

  - **나머지 연산자 (`%`, modular)**

  ```javascript
  alert( 5 % 2 ); // 1
  ```

  - **거듭제곱 연산자 `**`**

  ```javascript
  alert( 2 ** 3); // 8 (2 * 2 * 2)
  ```


---
#### 2. 연산자 우선순위

연산자에는 우선순위에 의해 실행순서가 결정된다. 정의한 우선순위를 바꾸기 위해서는 괄호를 이용해서 우선순위를 변경할 수 있으며 우선순위가 높은 순으로, 순위가 같다면 왼쪽에서 오른쪽으로 연산이 수행된다.

| 순위 | 연산자 이름 | 기호 |
| ---- | ----------- | ---- |
| 17   | 단항 덧셈   | +    |
| 17   | 단항 부정   | -    |
| 16   | 지수        | **   |
| 15   | 곱셈        | *    |
| 15   | 나눗셈      | /    |
| 13   | 덧셈        | +    |
| 13   | 뺄셈        | -    |
| 3    | 할당        | =    |

위 테이블은 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence" alt="연산자 우선순위 테이블">우선순위 테이블</a>의 일부를 발췌한 것으로 순위가 높을 수록 먼저 실행된다. 여기서 중요한 포인트는 단항 연산이 이항 연산자의 우선순위보다 커서 만약 두 피연산자가 연산을 이루려고 한다면, 이항 연산을 수행한 후에 이루어진 다는 점을 염두해야한다. 


---
#### 3. 할당 연산자

- **값을 반환하는 특징**

  할당 연산자는 사칙연산 외에도 `=` 역시 값을 반환하는 특징이 있다.

  ```javascript
  let a = 1;
  let b = 2;
  
  let c = 3 - (a = b + 1);
  
  alert( a ); // 3
  alert( c ); // 0
  ```

  이와 같은 예제처럼 (a = b + 1)에서 a에 값을 할당하고, 그 값인 3을 그대로 반환하여 이어지는 표현식에 사용할 수 있다. 하지만 이러한 방식은 가독성을 해치고 명확성이 떨어지기에 권장하지 않는다.

- **체이닝**

할당 연산자를 이용해 변수를 여러 개 연결하여 모두 같은 값을 가지게 할 수 있다.

```javascript
// 연산자 체이닝을 이용한 단일 값 공유하는 예제
let a, b, c;

a = b = c = 2 + 2;

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4

// 줄을 나누어 단일 값 공유하는 예제(권장)
c = 2 + 2;
b = c;
a = c;
```

가독성을 위해 아래의 예제처럼 줄을 나누어 코드를 작성하는 것이 바람직하다.

- **복합 할당 연산자** 

  할당 연산자에 다른 연산자가 합쳐져 더 적은 코드로 동일한 연산을 할 수 있게 해준다. 우선순위는 할당 연산자와 동일하여 대부분 다른 연산자의 실행을 마치고 수행된다.

  ```javascript
  let n  = 2;
  n = n += 5; // n = n + 5와 동일
  n = n *= 2; // n = n * 2와 동일
  
  alert ( n ); // 14
  ```

  
---

#### 4. 증감 연산자

변수의 숫자를 하나 늘리거나 줄이는 연산자로 증가 연산자는 `++`이 있으며, 감소 연산자는 `--`를 사용한다. 변수의 앞에 오는 경우 전위형, 변수의 뒤에 오는 경우 후위형이라고 부른다. 

```javascript
// 전위형 예시
let counter = 0;
alert(++counter); // counter를 증가시키고 새로운 값 1을 반환한다.

// 후위형 예시
let counter = 0;
alert(counter++); // counter를 증가시키지만, 증가 전의 기존 값인 0을 반환한다.
```

전위형은 값을 바로 증가시키기 때문에 alert()함수로 출력하는 경우 바로 증가된 값을 볼 수 있다. 그리고 후위형은 화면에 출력하고 그 다음 연산을 수행하기 때문에 alert()함수로 출력하면 아직 연산이 이루어지지 않은 이전의 값인 0을 확인하게 된다.

---

#### 5. 비트 연산자

인수를 32bit 정수로 변환하여 이진 연산을 수행한다.

- 비트 AND(`&`)
- 비트 OR(`|`)
- 비트 XOR(`^`)
- 비트 NOT(`~`)
- 왼쪽 시프트 LEFT SHIFT(`<<`)
- 오른쪽 시프트 RIGHT SHIFT (`>>`)
- 부호 없는 오른쪽 시프트(ZERO-FILL RIGHT SHIFT)(`>>>`)

---

#### 6. 쉼표 연산자

코드를 짧게 쓰려는 의도로 사용되는 연산자로 여러 표현식을 코드 한줄에서 평가할 수 있게 해준다.

```javascript
let a(1 + 2, 3 + 4);
alert( a ); // 7 ( 3 + 4의 결과 )

// 한 줄에 세 개의 연산이 수행되는 예
for (a = 1, b = 3, c = a * b; a < 10; a++){
    // 중략
}
```

우선 순위는 할당 연산자보다 낮기 때문에 괄호로 우선순위를 잘 처리해주는 것이 중요하다.

---
#### 7.비교 연산자

- **비교 연산자 종류**
  - `a > b`, `a < b`
  - `a >= b `, `a <= b`
  - `a == b`
  - `a != b`
- **비교 값 반환**

```javascript
alert( a > 1 ); // true
alert( 2 == 1 ); // false

let result = 5 > 4;
alert( result ); // true
```

비교 연산을 수행한 결과는 이처럼 참이면 `true`를 반환하고, 거짓이면 `false`를 반환한다.

- **문자열 비교**

  ```javascript
  alert( 'Z' > 'A' ); // true
  alert( 'Glow' > 'Glee'); // true
  alert( 'Bee' > 'Be' ); // true
  alert( 'a' > 'A'); // true
  ```

  뒤 쪽의 문자열보다 앞쪽의 문자열이 더 크다고 판단하기 때문에 `Z` 보다 `A` 가 더 크다고 판단하며, 문자열의 경우 각 문자를 첫 글자부터 하나 씩 비교하며 중간에 비교 결과가 결정되면 그 이후의 비교는 수행하지 않고 결과를 도출한다. 비교가 종료될 때, 두 문자열의 길이가 다르면 더 긴 문자열이 크다는 판단을 내린다.

  그리고 유니코드 순으로 비교를 진행하기 때문에 대문자 `A`와 소문자 `a` 를 비교하는 경우 소문자 `a`가 더 인덱스가 크기 때문에 값이 더 크다는 판단을 내린다. 

- **다른 자료형 간의 비교**

```javascript
// 문자형과 숫자의 비교
alert( '2' > 1 ); // true, 문자열 '2'가 숫자 2로 변환된 후 비교 진행
alert( '01' == 1 ); // true, 문자열 '01'은 숫자 1로 변환된 후 비교 진행

// 논리형과 숫자의 비교
alert( true == 1 ); // true
alert( false == 0 ); // true
```


- **일치 연산자와 동등 연산자**
  - 동등 연산자 `==` 은 값만을 비교하는 연산자로 0과 false 를 구별하지 못한다. 
  - 일치 연산자 `===` (불일치 연산자 : `!==`) 를 사용하면 타입의 비교도 수행하기 때문에 형 변환 없이 값을 비교할 수 있다. 그래서 동등 연산자와 달리 0과 false를 비교하면  false를 반환한다.

```javascript
alert( 0 == false ); // true
alert( '' == false ); // true

alert( 0 === false ); // false
```

- **null과 undefined 비교**

```javascript
// 일치 연산자로 비교 시
alert( null === undefined ); // false

// 동등 연산자로 비교 시
alert( null == undefined ); // true

// 산술 혹은 기타 연산자(>, <, <=, >=)로 비교 시
alert( null > undefined ); // false
```

3번째 예제와 같이 null과 undefined가 위와 같이 수행되면 null은 0으로 변환되고, undefined는 NaN으로 변환하여 비교를 수행한다.