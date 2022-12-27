> 본 내용은 정재남 님의 [코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB) 책을 읽고 정리한 내용을 작성했습니다.

# Chapter 06. 프로토타입

## 01. 프로토타입의 개념 이해

> 특정 객체의 원형(`Prototype`) 을 복제하여 클래스 기반 언어에서 사용하는 상속의 개념을 유사하게 사용할 수 있다.

- **모든 객체는 자신의 부모 역할을 하는 프로토타입의 참조 링크를 가지고 있고, 이 링크를 통해서 프로토 타입으로부터 프로퍼티나 메소드를 전달받는다.**

## 1-1. constructor, prototype, instance

<p align='center'>
  <img src="https://user-images.githubusercontent.com/77887712/209682155-3503c1e0-06cc-46bb-a227-dc3ad4538f47.png" />
</p>
```jsx
var instance = new Constructor(); // 위 그림을 추상화한 코드
```

<p align='center'>
  <img src="https://user-images.githubusercontent.com/77887712/209682233-12cc85db-f594-4510-9b4c-0671bf501937.png" width="350"/>
</p>
- 윗변(=실선) 기준 왼쪽 꼭짓점에는 `Constructor(생성자 함수)` , 오른쪽 꼭짓점에는 `Constructor.prototype` 프로퍼티를 위치시켰다.
- 왼쪽에는 아래를 향한 화살표 중간에 `new` 키워드가 있고, 화살표의 종점에는 instance 를 가리킨다.
- 오른쪽에는 아래를 향한 화살표 종점에 `instance.__proto__` 이라는 프로퍼티를 가리킨다.

### 흐름 따라가기

1. 어떤 생성자 함수를 `new` 연산자와 함께 호출하면, Constructor에 정의된 내용을 바탕으로 새로운 instance 가 생성된다.
2. 이때 생성된 instance 에는 `__proto__` 라는 프로퍼티가 자동으로 부여된다.
3. 이 `__proto__` 프로퍼티는 Constructor 의 prototype이라는 프로퍼티를 참조한다.
4. prototype 객체 내부에는 인스턴스가 사용할 메서드를 저장하며, 이 생성된 instance에서도 숨겨진 프로퍼티인 `__proto__` 를 통해 이 메서드에 접근할 수 있다.

> 💡 **프로토타입의 참조 링크의 형태에 대하여 ( 권장사항 )**
>
> ES5.1 명세 기준 `__proto__`가 아니라 `[[ prototype ]]` 이라는 명칭으로 정의돼있다. 또한 `instance.__proto__` 와 같은 방식으로 직접 접근하는 것을 허용하지 않고 오직 `Object.getPrototypeOf(instance)` 나 `Reflect.getPrototypeOf(instance)` 를 통해서만 접근할 수 있도록 정의됐다. 이런 명세에도 불구하고 대부분의 브라우저들이 `__proto__`에 직접 접근하는 방식을 명세에 따르면 생길 리스크로 인해 포기하지 않았고, 결국 ES6에서는 이를 브라우저에서 동작하는 레거시 코드에 대한 호환성 유지 차원에서 정식으로 인정하게 됐다.

하지만 어디까지나 브라우저에서의 호환성을 고려한 지원이며 권장되는 방식이 아니고, 다른 환경(=노드)에서는 이 방식이 지원되지 않을 가능성이 열려있기 때문에 실무에서는 `__proto__`를 통해 참조 링크에 직접 접근하는 것이 아니라 `Object.getPrototypeOf()` / `Object.create()` 등을 이용하는 것을 권장한다.

> 프로토타입 예시 - `__proto__` 이해하기

- Person이라는 생성자 함수의 prototype 에 getName 메서드를 만들어 지정했다.

```jsx
var Person = function (name) {
  this._name = name; // 프로퍼티 정의
};

Person.prototype.getName = function () {
  return this._name;
};
```

- instance의 `__proto__` 과 Constructor의 prototype은 서로 참조하고 있는 관계로 결국 같은 객체다.

```jsx
Person.prototype === ethan.__proto__; // true
```

그래서 아래와 같이 Person의 인스턴스는 `__proto__` 를 통해 `getName` 을 호출할 수 있게 된다.

```jsx
var ethan = new Person('Ethan');
ethan.__proto__.getName(); // undefined
```

- 메서드의 호출 예상 결과는 생성자의 매개변수를 전달받기 때문에 이름이 출력될 것을 예상하지만 `undefined`가 나온 것을 확인할 수 있다.
  - 타입 에러 혹은 참조 에러가 발생하지 않고 이 값이 나왔다는 것으로 호출할 수 있는 함수에 해당한다는 것을 유추할 수 있다.
- 이는 this 의 바인딩 대상이 잘못 된 것으로 현재 this가 가리키고 있는 객체는 `ethan` 이 아니라 `ehtan.__proto__` 이다.
  - 객체 내부에 name 프로퍼티가 없으므로 찾고자 하는 식별자가 정의돼 있지 않을 때, undefined 를 반환하는 자바스크립트 규칙에 의해 해당 결과 값을 받게 된 것이다.

따라서 `__proto__` 에 `name` 프로퍼티를 전달한다면, 이전과 다른 결과를 출력하게 된다.

```jsx
var ethan = new Person('Ethan');
ethan.__proto__._name = 'ETHAN';
ethan.__proto__.getName(); // ETHAN
```

이 `__proto__`프로퍼티는 **생략이 가능한 속성**으로, 이 속성 없이 인스턴스에 곧바로 메서드를 사용하면 `this`가 해당 인스턴스를 가리키는 객체와 바인딩 되어 `this` 의 조작 없이 메서드를 사용할 수 있다.

```jsx
var ethan = new Person('Ethan', 31);
ethan.getName(); // Ethan

var bob = new Person('Bob', 29);
bob.getName(); // Bob
```

이는 `__proto__` 를 생략하여 `this` 를 `ethan` 인스턴스를 바라보게 할 수 있도록 만든 것이고, 도식으로 보면 다음과 같다. (언어를 창시한 사람이 전체 구조를 이렇게 설계한 것이기 때문에 이해의 영역이 아니므로 그냥 그런가보다 하고 넘어가면 된다.😓)

<p align='center'>
  <img src="https://user-images.githubusercontent.com/77887712/209682761-94efdbb1-cad6-4d0d-9dac-bb833a1e6f3f.png" width=350/>
</p>

### **요약**

1. new 연산자로 Constructor를 호출하면 instance가 만들어진다.
2. 이 instance에는 생략 가능한 프로퍼티로 `__proto__` 가 있다.
3. `__proto__` 는 Constructor의 prototype을 참조한다.
4. 따라서 생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면 instance에서도 자신의 것처럼 해당 메서드나 프로퍼티에 접근하여 사용할 수 있게 된다.

### 내장 생성자 함수 살펴보기 (feat. Array)

```jsx
var arr = [1, 2];
console.dir(arr);
console.dir(Array);
```

<p align='center'>
  <img src="https://user-images.githubusercontent.com/77887712/209683053-f4bc2c9b-13dd-47f7-9d7f-2158c2d2c612.png" />
  <p align='center'> arr 변수 출력 결과(일부)</p>
</p>
<p align='center'>
<img src="https://user-images.githubusercontent.com/77887712/209683125-ddddd053-abfd-465d-a760-e0cceac45c6d.png"/>
 <p align='center'>생성자 함수 Array 출력 결과(일부)</p>
</p>

- **arr 변수 출력 결과** : Array 생성자 함수를 원형으로 삼아서 출력되어, 인덱스 0과 1을 키로 가지고 1과 2를 값으로 가진 형태에 length 프로퍼티가 2인 것을 확인할 수 있다.

  - `[[ Prototype ]]` 속성을 열거하면 그 안에 다양한 배열 메서드가 들어 있는 것을 확인할 수 있다.

- **생성자 함수(Array) 출력 결과 :** Array 생성자 함수 자체로 `f` 라는 함수를 의미하는 키워드가 붙어있다. 함수의 기본 프로퍼티인 arguments, call, name 등이 있고, 여기서도 Array 함수의 메서드가 열거되어 있는 것을 확인할 수 있다.

<p align='center'>
  <img src="https://user-images.githubusercontent.com/77887712/209683365-358c0762-acab-4f46-b259-fe3db7cc1bd5.png" width="460"/>
</p>

Array를 new 연산자와 함께 호출해서 인스턴스를 만드는 방식을 사용하든 그냥 배열 리터럴을 생성하는 방식을 하든 인스턴스인 [1, 2] 가 만들어지고, 이 인스턴스의 `__proto__` 는 Array.prototype 을 참조하고, 생략 가능하도록 설계되어 있어 인스턴스가 마치 배열 메서드를 자신의 것처럼 호출하여 사용할 수 있게 된다.

```jsx
var arr = [1, 2];
arr.forEach(function () {}); // (O)
Array.isArray(arr); // (O)
arr.isArray(); // (X) TypeError : arr.isArray is not a function
```

다만 Array 함수에 정적 메서드인 `from`, `isArray` 등은 인스턴스에서 직접 호출할 수 없고, Array 생성자 함수에서 직접 호출해야한다.

> 💡 **정적 메서드(static/class method)와 인스턴스 메서드(instance method)**
>
> - **정적 메서드** : 공통의 속성, 메소드에 메모리를 효율적으로 사용하기 위한 목적으로 해당 클래스에서 직접 호출하는 방식으로만 호출할 수 있다. (GC의 대상이 아니므로 무분별한 사용은 메모리 누수의 원인이 된다.)
>
> - **인스턴스 메서드 :** 인스턴스 객체를 생성하고, 인스턴스변수.method명() 형태로 호출하는 방식으로 재사용성이 좋고, 상황에 따라 분리하기 좋다는 장점이 있지만 리소스를 많이 잡아먹는다.

---

## 1-2. 생성자 constructor

- 생성자 함수의 프로퍼티인 prototype 객체 내부에는 constructor 라는 프로퍼티가 있으며, 생성자 함수인 자기 자신을 참조한다. ( = 인스턴스와의 관계에 있어서 필요한 정보로 원형을 알아내는 수단에 사용된다. )

> constructor 프로퍼티 예시

```jsx
var arr = [1, 2];
Array.prototype.constructor === Array; // true
arr.__proto__.constructor === Array; // true
arr.constructor === Array; // true

var arr2 = new arr.constructor(3, 4); // new arr(.__proto__).constructor(3, 4)
console.log(arr2); // [3, 4]
```

- 인스턴스의 `__proto__` 가 생성자 함수의 prototype 프로퍼티를 참조하고 이를 통해 인스턴스에 직접 constructor에 접근할 수 있는 수단이 된다. 따라서 arr2와 같은 경우도 문제 없이 동작하게 된다.
  - 읽기 전용 속성이 부여된 예외적인 경우(기본형 리터럴 변수)를 제외하고 값을 바꿀 수 있다.

> constructor의 변경 예시

```jsx
var NewConstructor = function () {
  console.log('this is new constructor!');
};

var dataTypes = [
  1, // Number & false
  'test', // String & false
  true, // Boolean & false
  {}, // NewConstructor & false
  [], // NewConstructor & false
  function () {}, // NewConstructor & false
  /test/, // NewConstructor & false
  new Number(), // NewConstructor & false
  new String(), // NewConstructor & false
  new Boolean(), // NewConstructor & false
  new Object(), // NewConstructor & false
  new Array(), // NewConstructor & false
  new Function(), // NewConstructor & false
  new RegExp(), // NewConstructor & false
  new Date(), // NewConstructor & false
  new Error(), // NewConstructor & false
];

dataTypes.forEach(function (d) {
  d.constructor = NewConstructor;
  console.log(d.constructor.name, '&', d instanceof NewConstructor);
});
```

- 모든 데이터가 `d instanceof NewConstructor` 에 대해 false를 반환한다.
  - instanceof는 prototype 속성이 객체의 프로토타입 체인 어딘가에 존재하는지 판별한다.
  - 즉 constructor를 변경하더라도 참조하는 대상이 변경될 뿐 이미 만들어진 인스턴스의 원형이 바뀌거나 데이터 타입이 변하지 않는다.

> 다양한 constructor 접근 방법

```jsx
var Person = function (name) {
  this.name = name;
};

var p1 = new Person('사람1'); // { name: "사람1" } true
var p1Proto = Object.getPrototypeOf(p1);
var p2 = new Person.prototype.constructor('사람2'); // { name: "사람2" } true
var p3 = new p1Proto.constructor('사람3'); // { name: "사람3" } true
var p4 = new p1.__proto__.constructor('사람4'); // { name: "사람4" } true
var p5 = new p1.constructor('사람5'); // { name: "사람5" } true

[p1, p2, p3, p4, p5].forEach(function (p) {
  console.log(p, p instanceof Person);
});
```

- p1부터 p5까지 모두 Person의 인스턴스로 결과가 나오는 것을 알 수 있다.
- 따라서 다음 두 공식이 성립한다.

  1. 다음 각 줄은 모두 동일한 대상을 가리킨다.

  ```jsx
  [Constructor][instance].__proto__.constructor[instance].constructor;
  Object.getPrototypeOf([instance]).constructor[Constructor].prototype.constructor;
  ```

  1. 다음 각 줄은 모두 동일한 객체(prototype)에 접근할 수 있다.

  ```jsx
  [Constructor].prototype[instance].__proto__[instance];
  Object.getPrototypeOf([instance]);
  ```

## 02. 프로토타입 체인

### 2-1. 메소드 오버라이드

- 의미 그대로 원본의 상태 위에 덮어쓰는 것을 의미하며, **원본의 위에 새로 추가되는 대상이 있는 형태의 메소드**를 말한다.

> 메소드 오버라이드 예시

Person에 getName 함수를 정의하고, constructor에 의해 생성된 인스턴스에 동일한 이름의 메서드를 새로 정의한다면 어떤 일이 발생할까?

```jsx
var Person = function (name) {
  this.name = name;
};

Person.prototype.getName = function () {
  // 1. getName 함수 정의
  return this.name;
};

var ethan = new Person('Winters');
ethan.getName = function () {
  // 2. Person 인스턴스를 통해 getName 함수 정의(=오버라이드)
  return 'Ethan ' + this.name;
};

console.log(ethan.getName()); // Ethan Winters
```

- 결과는 2번의 ethan 이라는 인스턴스에서 정의된 getName 메서드가 호출됐다.
- 자바스크립트 엔진이 getName 메서드를 찾는 방식 역시 가장 가까운 대상인 자신의 프로퍼티를 검색하고, 찾을 수 없으면 그다음으로 가까운 대상인 `__proto__` 를 검색하는 순서로 진행하게 된다.
  - 즉 검색 순서에 의해서 `__proto__` 에 있는 원본 메서드 보다 인스턴스로 새롭게 정의되는 메서드를 먼저 검색하게 된다는 뜻이고, 상황에 따라서는 그 원본에 접근할 수도 있다.

### 2-1-1. 생성자 연결

그렇다면 원본의 메서드는 어떻게 접근할 수 있을까?

```jsx
console.log(ethan.__proto__.getName()); // undefined
```

- 현재 원본에 접근하기 위해 `__proto__` 를 명시해서 호출하면 this는 `__proto__`를 가리키고 해당 프로토타입에는 name 프로퍼티가 없어 undefined가 출력된다.

이것은 조금 전 위에서도 다룬 내용이지만 prototype 에서 name 프로퍼티가 없기 때문이며, 아래 코드와 같이 name 프로퍼티를 명시해주면, 원본의 메서드를 사용할 수 있다.

```jsx
Person.__proto__.name = 'Rose';
console.log(ethan.__proto__.getName()); // 'Rose'
```

하지만 인스턴스에 있는 `name` 을 사용하면서 원본에 접근하기 위해서는 this가 prototype이 아닌 instance를 가리키게 해야하므로, **`call`, `apply` 를 통해서 this를 명시적으로 변경해주면 깔끔하게 원본 메서드를 인스턴스의 프로퍼티 값으로 접근할 수 있다.**

```jsx
console.log(ethan.__proto__.getName.call(ethan)); // 'Winters'
```

---

### 2-2. 프로토타입 체인

- **상위 프로토타입과 하위 프로토타입 간에 연결되어 값을 참조할 수 있는 관계**
- **체인을 따라 내부에서 바깥으로 값을 찾아나가는 과정**을 **프로토타입 체이닝** 이라고 부른다.
- 모든 객체의 `__proto__` 에는 `Object.prototype` 이 연결되어 있다.

> 프로토타입 체인 예시

- 아래 코드에서는 아무 문제 없이 `obj` 객체에서 toString 메서드를 정상적으로 호출할 수 있다.

```jsx
const obj = {
  name: 'prototype',
};
console.log(obj.toString()); // '[Object object]'
```

<p align='center'>
  <img src="https://user-images.githubusercontent.com/77887712/209684148-2cf41825-6258-4c48-80a1-de92f606b659.png">
  <p align='center'>obj 객체의 크롬 개발자 도구 출력 결과</p>
</p>

- 당연히 `obj` 객체에는 toString 메소드가 없지만 프로토타입 체인을 통해 prototype에 있는 toString 메서드를 찾아서 호출할 수 있는 것이다.
- 이처럼 객체 내부에는 `__proto__` 를 통해 prototype 에 접근할 수 있고, 계속해서 상위의 객체에 접근할 수 있게 된다. 그렇다면 이 프로토타입 체인의 끝에는 뭐가 있을까?

### 최상위 프로토타입

`Object.prototype`

- **모든 객체가 가진 프로토타입 체인의 종점으로 프로토타입 체인의 최상위에 있는 프로토타입**
- 즉 모든 객체는 Object.prototype 을 프로토타입으로써 공유하여 연결되고 있다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/77887712/209684276-6ce7d540-d99c-40ba-86ac-a09f1b9da6f0.png" width="460" />
</p>

아래 코드는 배열에서 배열 메서드 + 객체 메서드 실행하는 예제다.

```jsx
var arr = [1, 2];
arr(.__proto__).push(3);
arr(.__proto__)(.__proto__).hasOwnProperty(2); //true
```

- 이렇게 어떤 데이터의 `__proto__` 프로퍼티 내부에서 다시 또 다른 `__proto__` 프로퍼티가 연쇄적으로 이어진 관계를 프로토타입 체인이라고 하고, 이 체인을 따라가며 검색하는 일련의 과정을 프로토타입 체이닝이라고 부른다.

> 💡 **전체 프로토타입 구조에 대하여**
>
> - 각 생성자 함수는 모두 함수이기 때문에 Function 생성자 함수의 prototype과 연결된다.
>   그리고 Function 생성자 함수 역시 함수이므로 다시 Function 생성자 함수의 prototype과 연결된다.
>
> - 이는 `__proto__` 의 constructor가 다른 `__proto__` 를 재귀적으로 반복하여 참조하고 있는 형태로 실제 메모리 상에서 데이터를 무한대의 구조 전체를 들고 있는 것이 아니라, 사용자가 이런 루트를 접근하는 순간 해당 정보를 보여주는 것이며 메모리 상에서 같은 내용을 가리키고 있는 것이기 때문에 메모리에 대한 문제 또한 없다.
>
> - 어떤 인스턴스가 해당 생성자 함수의 인스턴스인지 확인하는 경우 외에 이런 식으로 접근할 이유가 없기 때문에 일반적으로 인스턴스와 “직접적인 연관”이 있는 경우에 대해서만 다룬다.

- 아래 그림과 같이 `__proto__` 를 따라가는 루트에 대한 접근 가능한 모든 경우를 표기하면 매우 복잡해진다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/77887712/209684510-5982c0c2-7ef0-4be2-b1e9-7fc1296b3310.png" width="480" />
  <p align="center">전체 프로토타입 구조(일부)</p>
</p>

---

### 2-3. 객체 전용 메서드의 예외사항

- 객체에서만 사용할 메서드는 프로토타입 객체 안에 정의할 수 없다.
- 그 이유는 `Object.prototype` 이 참조형 뿐만 아니라 기본형 데이터까지 프로토타입 체이닝을 통해 값에 도달할 수 있는 최상위 값이기 때문에 `Object.prototype` 에서 객체에서만 사용할 수 있는 정적 메소드를 가지고 있는 것이다. 반대로 어떤 데이터에서도 활용할 수 있도록 범용적인 메소드 또한 제공하고 있어 모든 변수에서 사용할 수 있는 것 (toString, hasOwnProperty, valueOf, insPrototypeOf 등)이 있다.

> Object.prototype에 추가한 메서드 접근 예시

- 이제 아래 예시를 통해 객체 전용 메서드가 왜 필요한지에 대해 알아보자.
- 아래 코드는 객체에서만 사용할 의도로 getEntries 메서드를 정의하고, 그것을 데이터 타입별로 출력하여 값을 확인하는 예시다.

```jsx
Object.prototype.getEntries = function () {
  // 객체 정의
  var res = [];
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      // 객체가 특정 프로퍼티를 가지고 있는지 검사하는 메소드
      res.push([prop, this[prop]]);
    }
  }
  return res;
};

var data = [
  ['object', { a: 1, b: 2, c: 3 }], // [["a", 1], ["b", 2], ["c", 3]]
  ['number', 345][('string', 'abc')], // [] // [["0", "a"], ["1", "b"], ["2", "c"]]
  ['boolean', false], // []
  ['func', function () {}], // []
  ['array', [1, 2, 3]], // [["0", 1], ["1", 2], ["2", 3]]
];
data.forEach(function (datum) {
  console.log(dataum[1].getEntries());
});
```

- 객체 내부에서만 사용하려는 목적과 달리 다른 데이터 타입에서도 getEntries 메서드를 에러 없이 출력하고 있다. 본래 의도는 다른 데이터 타입에서 사용할 경우 오류를 생성하게 해야하는데, 어느 데이터 타입이든 모두 프로타입 체이닝을 통해 getEntries 메서드에 접근할 수 있으니 이와 같은 현상이 발생하는 것이다.
- 이러한 이유로 객체 전용 메서드들은 `Object.prototype` 이 아닌 Object에 정적 메소드(Static method)로 부여해야한다. 또 this가 아닌 대상 인스턴스를 `call/apply` 를 통해 인자로 직접 주입해주어 사용하는 방식으로 구현되어 있다.

---

### 2-4. 다중 프로토타입 체인

- `__proto__` 를 연결해나가기만 하면 무한대로 이 체인 관계를 이어나갈 수 있다.
- 연결 방법은 `__proto__` 가 가리키는 대상인 **생성자 함수의 prototype이 연결하고자 하는 상위 생성자 함수의 인스턴스를 가리키면 된다.**

> 다중 프로토타입 체인 예시 - 생성자 함수를 이용해 배열 메서드 사용하기

`call/apply` 를 사용하지 않고 유사배열 객체에 배열 메서드를 사용할 수 있도록 만들어보자.

1. 현재 g 변수는 Grade의 인스턴스를 바라보고, Grade의 인스턴스는 여러 개의 인자를 받아 유사 배열의 형태를 가지고 있는 유사배열객체로 정의되어 있다.

```jsx
var Grade = function () {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};

var g = new Grade(100, 80);
```

2. 간단히 현재 인스턴스로 생성한 g 변수에 `g.__proto__` 가 가리키고 있는 `Grade.prototype` 이 배열의 인스턴스를 바라보게 만들면 된다.

```jsx
Grade.prototype = [];
var g = new Grade(100, 80);
```

3. 위 명령을 실행하면서 별개에 분리되어 있던 데이터가 아래의 그림과 같이 하나의 프로토타입 체인 형태로 재구축하게 된다.

- 이제 g 인스턴스의 기준에서 프로토타입 체인에 따라 `g 객체가 지닌 멤버`, `Grade의 prototype에 있는 멤버`, `Array.prototype에 있는 멤버`, `Object.prototype`에 있는 멤버에 접근할 수 있게 된다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/77887712/209684694-b96bc487-6b2b-4c0e-9eed-bb38811921a1.png" width="680" />
  <p align="center">다중 프로토타입 체이닝(1) - 분리되어 있던 프로토타입 체인 구조</p>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/77887712/209684660-56fa8f95-558a-4ccd-b976-534e2e84fe96.png" width="480" />
  <p align="center">다중 프로토타입 체이닝(2) - Grade에 배열 인스턴스를 합쳐 배열 메서드까지 확장한 프로토타입 체인 구조</p>
</p>

```jsx
console.log(g); // Grade(2) [100, 80]
g.pop();
console.log(g); // Grade(1) [100]
```

그리고 위 코드와 같이 Grade의 인스턴스인 g를 통해 직접 배열 메서드를 사용할 수 있게 된다.

---

### 참조

[코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB)
