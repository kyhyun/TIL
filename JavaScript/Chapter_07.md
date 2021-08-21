![JavaScript](https://user-images.githubusercontent.com/77887712/129447765-a115b7d2-feb8-4ded-9d1c-9b59eef9612d.png)

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 07. if 조건문과 삼항 연산자

#### 1. if 문

```javascript
let year = prompt('ECMAScript-2015 명세는 몇 년도에 출판되었을까요?', '');

if (year == 2015) alert( '정답입니다!' );
```

`if(...)` 이 처럼 괄호 안에 들어가는 조건을 평가하며, 그 결과가 true이면 if 만의 코드 블록이 실행되는 조건 처리를 수행한다. 1줄인 경우에는 괄호가 필요 없지만 복수의 줄인 경우 if에 중괄호로 코드 블록을 형성시켜야된다.

```javascript
if (year == 2015) {
  alert( "정답입니다!" );
  alert( "짝짝짝" );
}
```

구문이 한 줄이라도 중괄호를 사용해야 해당 구문이 어디 구간에서 끝나는지 파악하기 용이하기 때문에 되도록이면 `{}`를 사용하여 코드 블록을 형성하는 것이 더 바람직하다.

##### 1) 표현식의 평가 

`if(...)` 문은 괄호 안의 표현식을 평가하고 그 결과를 논리 값(불린)으로 변환하여 돌려준다. 그래서 다른 자료형이 해당 괄호 안에 들어가는 경우, 불린형에 맞도록 자동 형변환이 이루어진다.

- `false`로 변환되는 자료형은 다음과 같다.
  - 숫자 `0`, 빈 문자열 `''`, `null`, `undefined`, `NaN`, `document.all`
- 그 외에는 모두 `true`로 변환된다. 

```javascript
if (0) { ... } // 절대 실행되지 않는 코드, 0은 불린형으로 변환시 false
if (1) { ... } // 항상 실행되는 코드, 1은 불린형으로 변환시 true

// 동등 비교를 수행한 내용을 cond 변수에 담아서 확정된 논리 값을 if 문에 전달
let cond = (year == 2015); 
        
if (cont) {
    ...
}
```

##### 2) else 절 ( 해당하는 조건이 아닌 조건 처리)

`if`문 뒤 또는 `else if`절 뒤에  `else` 절을 붙일 수 있으며, 뒤에 이어지는 코드 블록은 앞의 if 조건이 수행되지 않는 내용을 실행한다.

```javascript
let year = prompt('ECMAScript-2015 명세는 몇 년도에 출판되었을까요?', '');

if (year == 2015) {
  alert( '정답입니다!' );
} else {
  alert( '오답입니다!' ); // 2015 이외의 값을 입력한 경우
}
```

##### 3) else if 절 ( 복수 조건 처리 )

다양한 조건을 처리하기 위해 사용하는 절로 `if`문 뒤에 `else if` 절을 붙일 수 있다.

```javascript
let year = prompt('ECMAScript-2015 명세는 몇 년도에 출판되었을까요?', '');

if (year < 2015) {
  alert( '숫자를 좀 더 올려보세요.' );
} else if (year > 2015) {
  alert( '숫자를 좀 더 내려보세요.' );
} else {
  alert( '정답입니다!' );
}
```

`year < 2015` 을 먼저 평가하고 이 조건이 거짓인 경우 아래의 `else if`절의 조건인 `year > 2015`의 평가를 수행한다. 그리고 이 조건 또한 거짓인 경우 마지막으로 `else`절 안에 있는 내용을 수행한다. `else if` 블록을 더 많이 붙일 수도 있으며, `else if`와 `else`절은 필수가 아닌 선택 사항이다.



#### 2. 조건부 연산자 '?' ( == 삼항 연산자 == 물음표 연산자 )

조건에 따른 다른 값을 변수에 할당해주고 반환 값을 다르게 처리할 때, 사용한다. 단순히 여러 분기를 만들어 처리할 경우에는 `if`를 사용하는 것이 원래 사용하려는 목적에도 부합하고 가독성 측면에서  좋다.

```javascript
let result = condition ? value1 : value2;
```

`condition`의 결과가 `true`인 경우 `value1`을, 그렇지 않으면 `value2`를 반환하여 `result`에 할당한다.

```javascript
let accessAllowed = (age > 18) ? true : false;

// 동일하게 동작하는 코드
let accessAllowed2 = age > 18; // 단순 true, false 반환에 조건부 연산자 사용 불필요
```

`age > 18`의 평가를 수행하고 `?` 연산자에 따라 조건부 처리를 수행하며 `()`의 경우 생략 가능하지만 가독성 향상을 위해 사용하는 것을 권고하는 편이다.

##### 1) 다중 '?'

물음표 연산자`?`를 여러 개 연결하여 복수의 조건을 처리하는 방법이다.

```javascript
let age = prompt('나이를 입력해주세요.', 18);

let message = (age < 3) ? '아기야 안녕?' :
  (age < 18) ? '안녕!' :
  (age < 100) ? '환영합니다!' :
  '나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!';

alert( message );

```

`if..else`를 사용하여 위 예시를 아래처럼 처리할 수도 있다.

```javascript
if (age < 3) {
  message = '아기야 안녕?';
} else if (age < 18) {
  message = '안녕!';
} else if (age < 100) {
  message = '환영합니다!';
} else {
  message = '나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!';
}
```

