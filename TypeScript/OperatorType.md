## 타입스크립트 - 연산자를 이용한 타입
> 연산자를 이용한 타입은 이미 존재하는 타입을 새로 구성하거나 결합하는 방식을 지원한다.
### Union Type
- 해당 조건 중 하나라도 해당하면 만족하는 연산자로 하나의 타입 이상을 확장할 수 있게 도와준다.
- 연산자 기호 : `|`

```ts
function logMessage(value: any) {
  console.log(value);
}
logMessge('hello');
logMessage(100);
```
- any 타입을 이용하면 문자열과 숫자 외에도 다른 타입 모두 문제 없이 사용할 수 있지만, 컴파일하는 타입스크립트 입장에서는 값이 들어오기 전까지 이 값이 어떤 값인지 유추할 수 없다.
```ts
function logMessage(value: string | number) {
  console.log(value);
}
logMessgae('hello');
logMessage(100);

```
- 파라미터에 인자가 `string`이나 `number` 중 하나가 들어올 수 있는 경우, 범위를 명시적으로 좁힐 수 있기 때문에 유니온 타입을 더 권장한다.
- any와는 다르게 이 연산자를 이용해서 만든 타입 변수는 사용하려고 하면 타입추론에 의해 내부 IDE에서는 해당 타입에 맞는 내부 API를 제공한다.

**타입을 명시적으로 좁히는 방법**

```ts
function logMessage(value: string | number) {
  if(typeof value === 'number'){
    value.toLocaleString();
  }
  if(typeof value === 'string') {
    value.toString();
  }
}
logMessgae('hello');
logMessage(100);
```
- 특정 타입으로 범위를 좁혀나가는 과정을 타입 가드라고 불리며, 보통 이렇게 유니온 타입으로 파라미터를 제한한 후 조건문으로 타입을 분기로 나누어 처리한다.

**유니온 타입의 특징**
```ts
interface Developer = {
  name: string;
  skill: string;
}

interface Person = {
  name: string;
  age: snumber;
}

function askSomeone(someone: Developer | Person) {
  someone.name; // OK
  someone.skill; // X
  someone.age; // X
}
 
askSomeone({name: '김영현', skill: '웹 개발'});
askSomeone({name: '홍길동', age: -1})
```
- 두 인터페이스를 유니온 타입으로 결합하는 경우, 이는 합집합과 같이 두 인터페이스의 속성을 모두 접근하는 것이 아닌, 공통의 속성인 것에만 접근이 가능하다.
- 그 이유는 타입스크립트 입장에서 Developer 타입과 Person 타입을 모두 충족해야하기 때문에 두 인터페이스 사이에 공통으로 보장된 속성만을 제공하게 된다.
- 호출하는 관점에서는 Developer 타입 또는 Person 타입을 파라미터로 지정되어 있기 때문에 이에 맞춰 인자를 전달해야 에러가 발생하지 않는다.

### Intersection Type
- 조건에 모두 해당되어야 만족되는 연산자로 새로운 타입을 구성하게 도와준다.
- 연산자 기호 : `&`

```ts
var kyh = string & boolean & number; // Never Type
```
이렇게 변수에 이 연산자를 이용하면, 일치하는 타입이 어떠한 것도 없기 때문에 Never 타입이 나온다.

```ts
interface Developer = {
  name: string;
  skill: string;
}

interface Person = {
  name: string;
  age: snumber;
}

function askSomeone(someone: Developer & Person) {
  someone.name; // OK
  someone.skill; // OK
  someone.age; // OK
}

askSomeone({name: '개발자', skill:'웹 개발', age:32})
```
- 두 인터페이스를 이용해서 someone은 Developer의 타입과 Person 이라는 타입을 모두 만족시키는 새로운 타입으로 구성된다.
- 호출 관점에서는 3개의 속성을 모두 보장하기 때문에 3개의 인자를 모두 호출해주어야 에러가 발생하지 않는다.