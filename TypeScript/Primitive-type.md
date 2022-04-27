## 타입스크립트 - 기본 타입

**1. boolean**
참과 거짓(true/false) 값을 담는 데이터 타입
```ts
let isDone: boolean = false;
```
---
**2. number**
부동 소수의 숫자 값을 담는 데이터 타입으로 진수 표현식도 담을 수 있다.
```ts
let decimal: number = 31;
let hex: number = 0x1f;
let binary: number = 0b1111;
let octal: number = 0o37;
```
---
**3. string**

큰 따옴표나 작은 따옴표로 문자열 데이터를 담는 데이터 타입으로
템플릿 문자열을 사용하면 표현식을 포함시킬 수 있다.
```ts
let color: string = 'Purple';
color = "SkyBlue";
let sentence: strong = `${color} is my favorite color`; 
```
---
**4. array**
- **배열 타입을 명시적으로 선언하는 방법**
  첫 째로 배열 요소들을 나타내는 타입 뒤에 `[]`를 사용하는 방법이 있다.
  ```ts
  let list: number[] = [1, 2, 3];
  ```
  두 번째는 제네릭 배열 타입 `Array<elemType>`을 쓰는 방법이 있다.
  ```ts
  let list: Array<number> = [1, 2, 3];
  ```
---
**5.tuple**
요소 타입과 개수가 고정된 배열을 표현할 때 사용한다.
```ts
let x: [string, number];
x = ['hello', 10]; // 초기화 성공
x = [10, 'hello']; // 초기화 실패
```
정해진 인덱스 외에 다른 인덱스의 요소에 접근하면, 오류가 발생한다.
```ts
x[2] = 'world'; // 에러, '[string, number]' 타입에는 프로퍼티 '2'가 없습니다.
```
---
**6. enum**
상수들의 집합을 정의하는 열거형 데이터 타입, 멤버라고 불리는 명명된 값의 집합을 이루는 자료형이다.
```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
각 멤버들의 번호를 0부터 매길 수 있으며, 각 값들을 관리할 수 있는 번호를 수동으로 지정할 수도 있다. (값이 할당되지 않은 아이템은 이전 아이템의 값에 +1된 값이 설정된다.)
```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```
enum에 설정된 아이템에 값을 이용해서 enum 값의 멤버 이름을 찾을 수 있다.
```ts
enum Color {Red =1 , Green, Blue}
let colorName: string = Color[2];
console.log(colorName); // 값이 2인 'Green'이 출력된다.
```
---
**7. any**
어떤 타입도 존재할 수 있음을 나타내는 타입이다.
```ts
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;
```
보통 명시적으로 데이터 유형을 설정해서 사용하는 것이 TypeScript의 권장 사항이기 때문에 여러 다른 타입이 섞인 배열 등 타입의 일부만 알고 전체를 알기 어려울 때 사용한다.
```ts
let list: any[] = [1, true, "free"];

list[1] = 100;
```
변수 선언과 초기화 과정에서 값을 할당하지 않으면, 암시적으로 any 타입이 지정된다.
```ts
// 암시적으로 any 타입이 지정
let user_id;
user_id = 1234;
user_id = '1234';
```
---
**8. void**
어떤 타입도 존재할 수 없음을 나타내며, 보통 함수에는 반환 값이 없을 때, 사용한다.
```ts
function warnUser(): void {
  console.log("This is my warning message');
}
```
---
**9. null and undefined**
null과 undefined는 다른 모든 타입의 하위 타입으로 오직 any와 각자 자신인 타입에만 할당이 가능하다.(예외적으로 undefined는 void에 할당 가능)
```
let u: undefined = undefined;
let n: null = null;
```
다른 값이 들어가는 경우 오류를 출력하게 되는데, 이러한 부분은 tsconfig.json에 설정할 수 있는 옵션에 따라 오류 여부를 결정할 수 있다.
```json
"strictNullChecks": true, /* 엄격한 null 검사 허용*/
```
보통 다른 값들이 할당될 수 있도록 처리하기 위해서는 애니(any) 또는 유니온(`|`) 타입을 사용해야 하며, 그 중에서도 특정 타입으로 제한하기 위해서는 유니온 타입을 사용하는 것이 적절하다.
```ts
let assign_name: string|null = null;

if(!assign_name) {
  assign_name = '홍길동';
}
```
---
**10. never**
절대 발생할 수 없는 타입을 나타내며, 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 않는 반환 타입으로 사용한다.
```ts
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
  throw new Error(message);
}
// 반환 타입이 never로 추론된다.
function fail(){
  return error('Something failed);
}

// never 반환 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
  while( true) {

  }
}
```
이 타입이 사용되는 경우는 항상 오류를 출력하거나 반환 값이 절대로 내보내지 않음을 의미하며, 이는 곧 무한 루프에 빠지는 것과 같다.

---

**11. Object**
원시 타입(number, string, boolean, bigint, symbold, null, undefined)을 제외한 타입을 나타낸다.
```ts
declare function create(o: object | null): void;

// 성공
create({prop: 0});
create(null);

//오류
create(42); 
create('string');
create(false);
crate(undefined);
```