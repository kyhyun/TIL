## 타입스크립트 - 함수

### 함수의 기본적인 타입 선언

보통 자바스크립트 함수는 아래와 같은 모습을 하고 있다.
```js
function sum(a,b) {
  return a + b;
}
```
타입스크립트에서는 매개변수와 반환 값에 타입을 추가해서 선언한다.
```ts
function sum(a: number, b: number): number {
  return a + b; 
}
```


### 함수의 인자
타입스크립트에서 함수의 인자를 모두 필수로 넣어야하는 값으로 처리하며, 정의된 매개변수 값만 받을 수 있고 추가로 인자를 받을 수 없다.
```ts
function sum(a: nubmer, b: number): number {
  return a + b;
}
sum(10, 20); // 30
sum(10, 20, 30); // error, too many parameters
sum(10) // error, too few paraters
```
상황에 따라서 정의된 매개변수의 갯수 만큼 인자를 넘기지 않아도 에러가 발생하지 않도록 `?`이라는 옵셔널 인자를 사용해서 정의할 수 있다.
```ts
function sum(a: number, b?: number): number {
  return a + b;
}
sum(10, 20); // 30
sum(10, 20, 30); // error, too many parameters
sum(10); // 10
```
이외에도 매개변수 초기화는 ES6 문법과 동일하다.
```ts
function sum(a: number, b = '100'): number {
  return a + b;
}
sum(10, undefined); // 110
sum(10, 20, 30); // error, too many parameters
sum(10); // 110
```
### REST 문법이 적용된 매개변수
ES6 문법의 Spread Operator를 이용해 타입스크립트에서도 다음과 같이 이용할 수 있다.
```ts
function sum(a: number, ...nums: number[]): number {
  const totalOfNums = 0;
  for(let key of nums) {
    totalofNums += nums[key];
  }
  return a + totalOfNums;
}
```
