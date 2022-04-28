## 타입스크립트 - 타입 별칭
특정 타입이나 인터페이스를 참조할 수 있는 타입 변수를 말하며, 인터페이스와 사용 방법이 거의 유사하다.

```ts
// string 타입을 사용할 때
const name: string = 'kyh';

// 타입 별칭을 사용할 때
type MyName = string;
const name: MyName = 'kyh';
```
단순히 단일의 타입을 명시하는 것 뿐 아니라 interface 레벨의 복잡한 타입에도 별칭을 이용할 수 있다.

```ts
type Job = {
  name: string;
  skil: string;
}
```
타입 별칭에 제네릭도 사용할 수 있다.
```ts
type User<T> = {
  name: T
}
```
---

### 타입 별칭과 인터페이스의 차이점

**1. 타입 정의 내에서 Union 연산자를 사용하는 경우, 타입 별칭이 있는 클래스에 `implements`를 사용할 수 없다.**
```ts
{
  class Point {
    x : number
    y: number
  }

  interface Shape {
    area(): number
  }

  type Perimeter = {
    perimater(): number
  }

  type RectangleShape = (Shpe | Perimater) & Point

  class Rectangle implements RectangleShape {
    // error, A class may only implement another class or interface.
    x = 2
    y = 3
    area() {
      return this.x * this.y
    }
  }
}
```
Union의 타입 별칭을 객체 리터럴에 바르게 사용하는 예시는 다음과 같다.
```ts
const rectangle: RectangleShape = {
  x: 12
  y: 133

  perimeter() {
    return 2 * (rectangle.x + ractangle.y)
  },

  area() {
    return rectangle.x * ractangle.y
  }
}
```
이렇게 객체 리터럴 안에는 구현할 메소드를 모두 정의해주어야 한다.


**2. 타입 정의 내에서 Union 연산자를 사용하는 경우 타입 별칭이 있는 인터페이스에서 extends를 사용할 수 없다.**
```ts
type ShapeOrPerimeter = Shape | Perimeter;
interface RectangleShape extends ShapeOrPerimeter, Point {}
// error, An interface may only extend a class or another interface.
```

**3. 선언 병합은 타입 별칭과 함께 작동하지 않는다.**
```ts
interface Box { 
  height: number
  width: number
}

interface Box {
  scale: number
}

const box: Box = { height: 5, width: 6, scale: 10 }
```
인터페이스는 동일한 이름으로 여러 번 정의할 수 있으며 해당 정의는 위와 같이 병합된다.

```ts
type Box = { // Duplicate identifier 'Box'
  height: number
  width: number
}

type Box = { // Duplicate identifier 'Box'
  scale: number
}

const box: Box = { height: 5, width: 6, scale: 10 }
// error, Type '{ height : number; width: number; scale: number;}' is not assignable to type 'Box'
// Object literal may only specify known properties, and 'scale' does not exist in type 'Box'.

```
반면에 타입 별칭은 고유한 개체이기 때문에 하나로 병합되지 않는다.


**React의 `Props`와 `State` 타입 적용**
- 일관성을 유지하고 원하는 것 (타입 별칭/인터페이스)를 사용하며, 권장사항으로는 타입 별칭을 사용하는 것을 추천하며, 그 이유는 다음과 같다.
  - 작성하기에 코드가 짧다.
  - 일관된 구문을 유지하는데 도움이 된다.
  - 확장에 필요한 HOC(고차 컴포넌트) 등과 같이 정의된 패턴을 제외하고서는 인터페이스 선언 병합을 활용할 필요가 없다.
  ```ts
  // React의 타입 적용에 대한 예시로 Good Practice는 타입 별칭을 이용한다.
  // BAD
  interface Props extends OwnProps, InjectedProps, StoreProps {}
  type OwnProps = {...}
  type StoreProps = {...}

  // GOOD
  type Props = OwnProps & InjectedProps & StoreProps
  type OwnProps = {...}
  type StoreProps = {...}
  ```

이 두 차이점에 대한 상세한 내용은 아래의 링크에서 자세하게 확인할 수 있다.
- **Link: [인터페이스와 타입의 차이점](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)**
