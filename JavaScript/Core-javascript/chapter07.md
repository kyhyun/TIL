> 본 내용은 정재남 님의 [코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB) 책을 읽고 정리한 내용을 작성했습니다.

# Chapter 07. 클래스

## 01. 자바스크립트의 클래스

- 자바스크립트는 프로토타입 기반 언어로 클래스의 개념이 존재하지 않지만 프로토타입을 이용해서 일반적인 의미에서의 클래스 관점으로 해석할 수 있는 요소를 제공하고 있다.

<p algin="center">
  <img src="https://user-images.githubusercontent.com/77887712/210066056-dbd4a660-a4cd-406a-b70c-061c1b1f3eab.png" alt="프로토타입에 클래스 개념 적용" />
  <p align="center">프로토타입에 클래스 개념 적용</p>
</p>

- 그림처럼 Array 내부 프로퍼티에서 prototype 프로퍼티를 제외한 나머지는 인스턴스에 상속되지 않는데, 이렇게 인스턴스에 상속되는 여부에 따라 스태틱 멤버와 인스턴스 멤버로 나뉘게 된다.
  - 자바스크립트 진영에서는 인스턴스에서도 직접 메서드를 정의할 수 있기 때문에 인스턴스 메서드가 프로토타입에서 정의한 메서드와 해석에 혼란이 있어 프로토타입 메서드라는 명칭을 선택해서 부르고 있다.

> 스태틱 메서드와 프로토타입 메서드 예시

```jsx
var Rectangle = function (width, height) {
  // 생성자 필드
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  // (프로토타입) 메서드
  return this.width * this.height;
};

Rectangle.isRectangle = function (instance) {
  // 스태틱 메서드
  return instance instanceof Rectangle && instance.width > 0 && instance.height > 0;
};

var rect1 = new Rectangle(3, 4);
console.log(rect1.getArea()); // 12 (O)
console.log(rect1.isRectangle(rect1)); // Uncaught TypeError: not a function(X)
console.log(Rectangle.isRectangle(rect)); // true
```

- 프로토타입 메서드로 정의한 경우 해당 인스턴스에서 잘 호출하여 사용할 수 있지만 스태틱 메서드로 정의한 경우에는 프로토타입 체이닝을 통해 최상위의 객체까지 접근하더라도 찾지 못해서 실행할 수 없다는 에러를 발생시킨다.
- 스태틱 메서드를 호출할 수 있는 방법은 생성자 함수를 this로 바인딩 해야만 호출할 수 있다.

## 02. 클래스 상속

### 2-1. 기본 구현

- 자바스크립트에서 클래스 상속을 구현 했다는 것은 결국 **프로토타입 체이닝을 잘 연결한 것을 의미**한다.
- 프로토타입 체인을 활용해서 클래스 상속을 구현하는 전통적인 객체지향 언어에서의 클래스 방식으로 ES5 이전의 구현 방식에 대해서 알아보자.

> 클래스 상속의 예시 - 오래된 방법(1)

```jsx
var Grade = function () {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};

Grade.prototype = [];
var g = new Grade(100, 80);
```

- 현재 이렇게 구현한 클래스 상속의 문제점으로는 `length` 프로퍼티가 configurable(변경 가능)하다는 점과 Grade.prototype에 빈 배열을 참조시켰다는 점이다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/77887712/210066737-84c059ad-75ab-4503-b324-bb8579dd99a3.png"/>
  <p align="center">클래스 상속과 프로토타입 체인의 관계</p>
</p>

> 클래스 상속의 예시 - 오래된 방법(2)

우선 문제점 중에 `length` 에 대해서 알아보자

```jsx
...
g.push(90);
console.log(g); // Grade { 0: 100, 1: 80, 2: 90, length: 3 }

delete g.length;
g.push(70);
console.log(g); // Grade { 0: 70, 1: 80, 2: 90, length: 1 }
```

- length 프로퍼티를 삭제하고 다시 push를 하면, push한 값이 0번째 인덱스에 들어가면서, length가 1로 생성된 것을 볼 수 있다.

  - 내장객체인 배열 인스턴스의 length 프로퍼티는 변경 불가능하지만 Grade 클래스의 인스턴스는 배열 메서드를 상속하고 있지만 기본적으로 일반 객체의 성질을 그대로 가지고 있어 삭제가 가능하여 온전한 배열이라고 부를 수 없다.

- push를 했을 때, 0번째 인덱스에 값이 들어가고 length가 1로 갱신되는 이유는 무엇일까?
  - `g.__proto__` 또는 `Grade.prototype`이 빈 배열을 가리키고 있기 때문이다.
  - 즉 `push` 명령에 의해 `g.length`를 참조하려고 하지만 없기 때문에 프로토타입 체이닝을 통해 `g.__proto__.length` 를 읽어온다.
  - 이때 빈 배열의 length가 0이므로 여기에 값을 할당하고 length는 1만큼 증가시키는 명령이 문제 없이 동작할 수 있게 된다.

> 클래스 상속의 예시 - 오래된 방법(3)

Grade.prototype에 요소를 포함한 배열을 전달하면 어떻게 동작할까?

```jsx
...
Grade.prototype = ['a', 'b', 'c', 'd'];
var g = new Grade(100, 80);

g.push(90);
console.log(g); // Grade { 0: 100, 1: 80, 2: 90, length: 3 }

delete g.length;
g.push(70);
console.log(g); // Grade { 0: 100, 1: 80, 2: 90, empty, 4: 70, length: 5 }
```

- prototype에 length가 4인 배열을 할당한 상태로 g 인스턴스를 이용한 배열 메서드가 정상적으로 동작하는 것을 볼 수 있다.
  - 하지만 이 역시 length 프로퍼티를 삭제하자 `g.__proto__.length` 를 찾게 되고, 그 길이 값이 4가 되어 인덱스 4에 70을 넣고, g.length에 5를 부여하는 순서로 동작하게 된다.
- 이처럼 클래스에 있는 값이 인스턴스의 동작에 영향을 주어서는 안되며, 이는 클래스의 추상성을 해치게 된다.

---

## 2-2. 클래스가 구체적인 데이터를 지니지 않게 하는 방법

### **2-2-1. 인스턴스 생성후 프로퍼티 제거하는 방법**

- 가장 간단한 방법으로 클래스를 만들고 나서 프로퍼티를 일일이 지우고 새로운 프로퍼티를 추가할 수 없도록 하는 방법을 사용할 수 있다.

```jsx
delete Square.prototype.width;
delete Square.prototype.height;
Object.freeze(Square.prototype);
```

> 클래스 상속 및 추상화 방법(1) - 인스턴스 생성 후 프로퍼티 제거

프로퍼티가 많은 경우 범용적으로 사용할 수 있도록 함수로 생성하여 작업할 수 있다.

```jsx
// Rectangle 클래스 정의부 생략

var extendClass = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = new SuperClass();
  for (var prop in SubClass.prototype) {
    // SuperClass의 속성 중 SubClass에 있는 속성은 서브 클래스 쪽의 prototype에서 지워준다.
    if (SubClass.prototype.hasOwnProperty(prop)) {
      delete SubClass.prototype[prop];
    }
  }

  SubClass.prototype.constructor = SubClass; // Subclass의 생성자 복구

  if (subMethods) {
    // SubClass에 존재하는 메소드들을 SubClass의 prototype에 전달한다.
    for (var method in subMethods) {
      subClass.prototype[method] = subMethods[method];
    }
  }
  Object.freeze(SubClass.prototype);
  return SubClass;
};

var Square = extendClass(Rectangle, function (width) {
  Rectangle.call(this, width, width);
});
```

- SuperClass와 SubClass에 추가할 메서드들이 정의된 객체를 받아 SubClass의 prototype 내용을 정리한 후 Object.freeze로 고정하는 방법으로 SubClass의 prototype을 정리하는 내용이 복잡해졌지만 범용성 측면에서 나쁘지 않은 방법이다.

### **2-2-2. 빈 함수(Bridge)를 활용하는 방법**

- 더글라스 크락포드가 제시해서 대중적으로 널리 알려진 방법으로 빈 함수를 다리 역할로 세우는 방법이다.
- SubClass의 prototype에 아무런 프로퍼티를 생성하지 않는 빈 함수(Bridge)를 하나 더 생성해서 그 prototype이 SuperClass의 prototype을 할당하고 SubClass의 prototype에는 Bridge의 인스턴스를 할당한다.
  - Bridge의 프로토타입 ← SuperClass의 프로토타입
  - SubClass의 프로토타입 ← Bridge의 프로토타입

> 클래스 상속 및 추상화 방법(2) - 빈 함수(Bridge)를 활용하는 방법

```jsx
var Rectangle = function (width, height) {
  // SuperClass
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

var Square = function (width) {
  // SubClass
  Rectangle.call(this, width, width);
};

var Bridge = function () {}; // Bridge 함수
Bridge.prototype = Rectangle.prototype;
Square.prototype = new Bridge();
Square.prototype.constructor = Square; // SubClass의 생성자 복구
Object.freeze(Square.prototype);
```

Bridge 빈함수를 만들어 서로 참조 관계를 대체하게 되고 인스턴스를 제외하고 프로토타입 체인의 경로에 더 구체적인 데이터가 남지 않게 된다.

그리고 범용성을 고려하면 아래와 같이 함수로 만들어 구현할 수 있다.

```jsx
var extendClass = (function () {
  var Bridge = function () {}; // Bridge 함수
  return function (SuperClass, SubClass, subMethods) {
    Bridge.prototype = SuperClass.prototype;
    SubClass.prototype = new Bridge(); // 내부 함수에서 Bridge를 참조하고 있어서 클로저 발생
    SubClass.prototype.constructor = SubClass; // SubClass의 생성자 복구

    if (subMethods) {
      for (var method in subMethods) {
        SubClass.prototype[method] = subMethods[method];
      }
    }
    Object.freeze(SubClass.prototype); // SubClass.prototype에 속성 변경이 불가능하도록 처리
    return SubClass;
  };
})();
```

- 즉시실행함수 내부에 Bridge 함수를 선언해서 클로저를 형성하고 메모리에 불필요한 함수 선언을 줄인다.
- subMethods에는 SubClass의 prototype에 담길 메서드를 객체로 전달한다.

### **2-2-3. Object.create 활용 방법**

ES5에서 도입된 `Object.create`를 이용하면 앞서 있던 두 방법보다 간단하고 안전하게 상속을 처리할 수 있다.

> 클래스 상속 및 추상화 방법(3) - Object.create를 활용하는 방법

```jsx
var extendsClass = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = Object.create(SuperClass.prototype);
  SubClass.prototype.constructor = SubClass; // SubClass의 생성자 복구

  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }

  Object.freeze(SubClass.prototype);
  return SubClass;
};
```

### **2-2-4. 결론**

클래스 상속 및 추상화를 흉내내기 위한 라이브러리가 많이 있으나 기본적인 접근 방법은 위 세 가지 아이디어를 크게 벗어나지 않는다. 결국 **SubClass.prototype의 `__proto__` 가 SuperClass.prototype을 참조하고, SubClass.prototype에는 불필요한 인스턴스 프로퍼티가 남지 않도록 해야한다는 것이 핵심이다.**

---

## 2-3. 상위 클래스에 접근 수단 제공하기

- 하위 클래스의 메서드에서 상위 클래스의 메서드 실행 결과를 바탕으로 추가적인 작업을 수행하고 싶을 때 `call,apply` 로 해결할 수도 있지만 상당히 번거롭고 가독성이 떨어지는 방식이다.

  ( `SuperClass.prototype.methods.apply(this, arguments)` )

- 다른 객체지향 언어들의 클래스 문법에서는 `super` 키워드를 통해 이를 간편하게 제공해주는데, ES5 이전 자바스크립트에서 이를 유사하게 구현할 수 있는 방법이 있으며, 그 방법에 대해 알아보도록 한다. (ES6 이후에는 클래스 문법을 지원하고 있기 때문에 필요한 상황이 아니라면 당장 익힐 필요는 없다고 생각한다.)

> 상위 클래스 접근자 `super` 메서드 만들기

```jsx
// Object.create 활용 방법의 예제를 바탕으로 구현 (추가 부분의 코드는 동일하므로 다른 방법은 생략)

var extendsClass = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = Object.create(SuperClass.prototype);
  SubClass.prototype.constructor = SubClass;
  // ----------------------- 추가 부분 시작 ----------------------------
  SubClass.prototype.super = function (propName) {
    var self = this;
    if (!propName)
      return function () {
        SuperClass.apply(self, arguments);
      };
    var prop = SuperClass.prototype[propName];
    if (typeof prop !== 'function') return prop;
    return function () {
      // this(self)가 변경되는 것을 고려해서 클로저 생성
      return prop.apply(self, arguments);
    };
  };
  // ----------------------- 추가 부분 끝 ----------------------------
  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }

  Object.freeze(SubClass.prototype);
  return SubClass;
};
```

> super 메서드 사용하기 예시

```jsx
var Rectangle = function (width, height) {
  // SuperClass
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

var Square = extendsClass(
  Rectangle,
  function (width) {
    this.super()(width, width); // super 사용(1)
  },
  {
    getArea: function () {
      console.log('size is :', this.super('getArea')()); // super 사용(2)
    },
  }
);

var sq = new Square(10);
sq.getArea(); // size is : 100
console.log(sq.super('getArea')()); // 100
```

## 03. ES6의 클래스 및 클래스 상속

> ES5와 ES6의 클래스 문법 비교

- ES5 클래스 코드

```jsx
var ES5 = function (name) {
  this.name = name;
};

ES5.staticMethod = function () {
  return this.name + ' staticMethod';
};

ES5.prototype.method = function () {
  return this.name + ' method';
};

var es5Instance = new ES5('es5');
console.log(ES5.staticMethod()); // ES5 staticMethod
console.log(es5Instance.method()); // es5 method
```

- ES6 클래스 문법

```jsx
var ES6 = class {
  constructor(name) {
    this.name = name;
  }
  static staticMethod() {
    return this.name + ' staticMethod';
  }
  method() {
    return this.name + ' method';
  }
};

var es6Instance = new ES6('es6');
console.log(ES6.staticMethod()); // ES6 staticMethod
console.log(es6Instance.method()); // es6 method
```

**ES5와 차이점**

1. class 키워드 뒤에 몸체를 구분할 수 있는 `{}` 본문 영역이 제공된다.
   - 클래스 본문에는 `function` 키워드를 생략하더라도 모두 메서드로 인식한다.
2. constructor 키워드 뒤에 `{}` 본문 영역을 제공하여 ES5의 생성자 함수와 동일한 역할을 수행한다.
3. 메서드 간의 사이는 콤마(`,`) 로 구분하지 않는다.
4. static 키워드를 통해 생성자 함수에 바로 할당하는 메서드처럼 클래스 자신만이 호출할 수 있도록 할 수 있다.
5. static 키워드가 안붙는 메소드는 자동으로 prototype 객체 내부에 할당되는 메서드로 정의된다.
   - ES5.prototype.method 와 동일하게 인스턴스가 프로토타입 체이닝을 하는 것처럼 호출할 수 있다.

---

> ES6의 클래스 상속 구현 예시

```jsx
var Rectangle = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
};

var Square = class extends Rectangle {
  // (A)
  constructor(width) {
    super(width, width); // (B) 상위 클래스의 생성자 함수를 실행한다.
  }
  getArea() {
    console.log('size is :', super.getArea()); // (C)
  }
};
```

(A) : Rectangle 을 상위 클래스를 설정하기 위해 `extends Rectangle` 을 추가하여 상속 관계를 설정한다.

(B) : `constructor` 내부에 super 키워드를 함수로 호출하면 상위 클래스의 constructor를 실행한다.

(C) : 메서드 내에서 super 키워드를 객체처럼 사용할 수 있으며, 상위 클래스의 메서드를 호출할 수 있다.

- 이때 객체는 상위 클래스의 프로토타입을 바라보지만 호출한 메서드의 this는 super가 아닌 원래의 this를 그대로 따른다.

---

### 참조

[코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB)
