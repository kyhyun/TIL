## 타입스크립트 - 인터페이스
반복되는 타입에 대해 정의할 내용을 규칙으로 정하는 것을 의미하며, 타입스크립트에서의 인터페이스는 다음과 같은 범주에 의해 약속을 정의할 수 있다.
- 객체의 스펙(속성과 속성의 타입)
- 함수의 매개변수
- 함수의 구조(파라미터, 반환 타입 등)
- 배열과 객체를 접근하는 방식
- 클래스 

### 인터페이스 정의하기
```ts
interface User { 
  age: number;
  name: string;
}
```
위와 같이 User 라는 인터페이스에 키와 값을 정의한다.

**변수를 정의하는 인터페이스**
```ts
var kyh: User = { 
  age: 31,
  name: '영현'
}

```
User 인터페이스를 타입으로 받은 변수는 그 내용에 맞게 값을 할당해서 선언 할 수 있다.
**함수의 매개변수를 정의하는 인터페이스**
```ts
function getUser(user: User) {
  console.log(user);
}
getUser({
  name: '홍길동',
  age: -1
});
```
- 함수에도 이와 같이 파라미터에 User 인터페이스를 타입으로 처리하면 호출 시 그 내용에 맞는 인자를 값으로 할당 해주어야 한다.
- API를 받아와서 호출하는 등의 과정에서 사용하므로 매우 많이 사용된다.

**함수의 구조를 정의하는 인터페이스**
```ts
interface SumFunction {
  (a: number, b: number): number;
}

var sum: SumFunction;
sum = function(a, b) {
  return a + b;
}
```
- 함수의 전체적인 구조를 인터페이스로 정의하고 그 내용을 함수에 적용하면, 위에서 정의된 매개변수 개수와 타입, 그리고 반환 값의 타입까지 일치시켜야 한다. 
- 라이브러리를 만들거나, 여러 명이서 동시에 협업할 때, 함수의 규칙을 어떻게 작성할지 아웃라인을 잡아놓을 때 사용한다.

**인덱싱 방식을 정의하는 인터페이스**

```ts
interface StringArray {
  [index: number]: string;
}

var arr: StringArray = ['a', 'b', 'c'];
arr[0] = 10; // error, '10' 형식은 'string' 형식에 할당할 수 없습니다.
arr[0] = '10';
```
배열에 인덱싱의 타입과 반환 값을 인터페이스로 정의하고, 그 내용을 변수에 적용하면 인덱스 안에 들어갈 수 있는 값은 제한된다.

### 인터페이스 딕셔너리 패턴
```ts
interface StringRegexDictionary {
  [key: string]: RegExp;
}

var obj: StringRegexDictionary = {
  sth: /abc/,
  cssFile: /\.css$/,
  jsFile: /\.js$/,
}

obj['cssFile'] = 'a'; // '"a"' 형식은 'RegExp' 형식에 할당할 수 없습니다.

Object.keys(obj).forEach(function(value) {
  // value의 인자는 key 값이므로 타입이 string으로 지정되어 있다.
})

```
객체의 속성을 어떻게 접근할 것인지 정의하는 방식으로 인터페이스를 정의해서`key`를 string 타입으로 지정한 후 객체 리터럴을 가진 변수에 타입으로 지정하면 객체 안의 속성 값을 사용할 때, 정해진 반환 값으로 타입이 제한된다. 

### 인터페이스 상속(확장)

```ts
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  language: string;
}

var john: Developer = {
  language: 'python', 
  // error, Type '{ language: string; }' is missing the following properties from type 'Developer' : name, age
}

var kyh: Developer = {
  name: '김영현',
  age: '31',
  language: 'javascript', // OK (O)
}
```