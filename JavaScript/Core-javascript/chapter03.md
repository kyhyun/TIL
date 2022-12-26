> 본 내용은 정재남 님의 [코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB) 책을 읽고 정리한 내용을 작성했습니다.

# Chapter 03. this

# 1. 상황에 따라 달라지는 this

- 자바스크립트의 this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다. 즉, 함수를 호출할 때 this가 결정된다는 뜻이다. 함수가 어떤 방식으로 호출 하는지에 따라 값이 달라지며, 각 상황별로 this가 어떤 값을 가지게 되는지 알아보자.

## 1-1. 전역 공간에서의 this

- 전역 공간에서 this는 전역 객체를 가리킨다. 전역 컨텍스트를 생성하는 주체가 전역 객체이기 때문이고, 이 객체는 자바스크립트 런타임 환경에 따라 다른 이름과 정보를 가지고 있다.
- **브라우저 환경의 전역 객체 : window**

![image](https://user-images.githubusercontent.com/77887712/209552845-e65f219e-cef7-438e-9442-fdae009a375c.png)

- **노드 환경의 전역 객체 : global(module.exports, exports)**

![image](https://user-images.githubusercontent.com/77887712/209552896-7aae65e6-ca33-4d04-90d4-ae8479d1c9c6.png)

### 전역 변수와 전역 객체

- 자바스크립트의 모든 변수는 특정 객체(실행 컨텍스트의 렉시컬 환경)의 프로퍼티로서 동작한다.
- 이 말은 전역 객체에 선언되는 전역 변수들은 그 객체의 프로퍼티로 할당하게 된다는 의미다.

> **전역변수와 전역객체**

```jsx
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); // 1
```

- 전역 공간에서 선언한 변수 a에 할당했지만, window.a와 this.a 모두 1이 출력된다.
- 변수 a에 접근하고자 하면 스코프 체인에 있는 a를 탐색하고, 전역 스코프의 렉시컬 환경인 전역 객체에 도달하게 된다. 따라서 전역에서 선언되는 것은 앞에 window를 체이닝 하는 과정이 생략 됐다고 봐도 된다.

```jsx
var a = 1;
window.b = 2;
console.log(a, window.a, this.a); // 1 1 1
console.log(b, window.b, this.b); // 2 2 2
```

- 전역변수가 곧 전역객체의 프로퍼티이므로 window의 프로퍼티에 직접 할당하는 것과 변수 키워드를 직접 선언하는 것과 똑같이 동작할 것이라고 예상할 수 있다.

**전역변수와 전역객체 프로퍼티로 선언된 값의 차이점**

```jsx
var a = 1;
delete window.a; // false
console.log(a, window.a, this.a); // 1 1 1

window.c = 3;
delete window.c; // true
console.log(c, window.c, this.c); // Uncaught ReferenceError : c is not defined
```

- 전역변수가 곧 전역객체의 프로퍼티이므로 `delete` 연산자를 사용할 수 있다. 하지만 위 코드를 보면 전역변수로 선언한 경우에는 삭제가 되지 않는 것을 확인할 수 있다.
- 이것은 변수로 선언하는 경우 사용자가 의도치 않게 삭제하는 것을 방지하고자 막아 놓은 것이다.
  - 전역변수를 선언하게 되면 전역객체의 프로퍼티로 할당하고 해당 프로퍼티의 `configurable` 속성을 false로 처리해서 변경 및 삭제가 안되도록 막아둔 것이다.

**즉, 키워드로 선언한 전역변수와 전역객체의 프로퍼티는 호이스팅 및 configurable 여부에서 차이를 보인다.**

## 1-2. 메서드로서 호출할 때, 그 메서드 내부에서의 this

### 1-2-1. 함수와 메서드

- 함수와 메서드는 미리 정의한 동작을 수행하는 코드 뭉치로 이 둘을 구분하는 유일한 차이는 독립성에 있다.
  함수는 그 자체로 독립적인 기능을 수행하지만 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행 한다.
- 메서드는 객체의 메서드로서 호출할 경우에만 메서드로 동작하고, 그렇지 않으면 함수로 동작한다.

> **함수로서 호출 & 메서드로서 호출**

```jsx
// 함수로서 호출하는 예시
var func = function (x) {
  console.log(this, x);
};
func(1); // Window { ... } 1

// 메서드로서 호출하는 예시
var obj = {
  method: func,
};
obj.method(2); // { method: f } 2
obj['method'](3); // { method: f } 3
```

- 함수로 호출한 경우에는 **this가 전역 객체(Window)**로 출력된다.
- obj 객체의 프로퍼티에 할당하고 그것을 호출한 경우 this가 obj 객체로 출력된다.

> **메서드 내부에서의 this**

```jsx
var obj = {
  methodA: function () {
    console.log(this);
  },
  inner: {
    methodB: function () {
      console.log(this);
    },
  },
};

obj.methodA(); // { methodA: f, inner: { ... } } ( === obj)
obj['mehitdA'](); // { methodA: f, inner: { ... } } ( === obj)

obj.inner.methodB(); // { methodB: f } ( === obj.inner)
obj['inner']['methodB'](); // { methodB: f } ( === obj.inner)
```

- this에는 호출한 주체의 정보가 담기게 되므로 호출 주체는 함수명(프로퍼티) 앞의 객체가 된다.
  - **함수 앞에 점`.` 표기법 혹은 대괄호 표기법 `[]`을 사용하면 앞에 명시된 객체의 this로 바인딩 된다.**

## 1-3. 함수로서 호출할 때 그 함수 내부에서의 this

### 1-3-1. 함수 내부에서의 this

- 어떤 함수를 함수로서 호출한 경우에는 this가 지정되지 않는다.
- 호출 주체의 정보를 알 수 없기 때문에 **this는 전역 객체(Window)에 바인딩 된다.**

### 1-3-2. 메서드의 내부함수에서의 this

- 다음 코드의 결과를 예측해보자.

```jsx
// 메서드의 내부함수에서의 this 예시
var obj1 = {
  outer: function () {
    console.log(this); // (1)
    var innerFunc = function () {
      console.log(this); // (2) (3)
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod();
  },
};

obj1.outer();
```

- **정답**

  **(1) { outer: ƒ } (outer) / (2) window (global) / (3) { innerMethod : f } (obj2)**

  - this 바인딩에 관해서는 함수를 실행하는 당시의 주변 환경이 아니라 해당 함수를 호출하는 구문 앞에 이를 확인할 수 있는 **객체 표기법(점 `.` 혹은 대괄호 `[]` 표기)에 의해 바인딩이 결정**된다.

### 1-3-3. 메서드의 내부 함수에서 객체 표기법 외 this를 바꾸는 방법

> 💡 호출 주체가 없을 때 전역 객체를 바인딩 하지 않고, 호출 당시 주변 환경(LE)에 있는 this를 그대로 상속 받아 사용하는 방법은 없을까?

**1) ES5 이전에 내부 함수에 this를 바꾸는 방법 - 변수 사용하기**

```jsx
var obj = {
  outer: function () {
    console.log(this); // (1) { outer : f }
    var innerFunc1 = function () {
      console.log(this); // (2) Window { ... }
    };
    innerFunc1();

    var self = this; // outer 컨텍스트 시점의 this(outer : f) 변수 저장
    var innerFunc2 = function () {
      console.log(self); // (3) { outer : f }
    };
    innerFunc2();
  },
};
obj.outer();
```

- 특정 스코프 안에서 그때 시점의 this를 변수에 저장한다.
- 그리고 내부 함수인 innerFunc2 안에서 그 변수를 가져다 참조하면 된다.
  - 보통 this를 참조하는 변수는 `self` 를 관례적으로 많이 사용한다.

**2) this를 바인딩하지 않는 함수 (화살표 함수)**

- 화살표 함수는 실행 컨텍스트를 생성할 때, this 바인딩 과정 자체가 생략되어 있으며 대신 상위 스코프의 this를 사용한다.
  - ES6 이상의 문법에서 사용할 수 있다.
  - 명시적으로 this를 지정할 수 있게 해주는 메서드(call, apply, bind)를 무시한다.
  - 바인딩 과정이 없었기 때문에 arguments 등 함수의 기존 공통 속성을 받아 사용할 수 있는 것을 사용할 수 없다.

```jsx
// 화살표 함수 예시
var obj = {
  outer: function () {
    console.log(this); // (1) { outer: f }
    var innerFunc = () => {
      console.log(this); // (2) { outer: f }
    };
    innerFunc();
  },
};
obj.outer();
```

(2) : 내부 함수인 innerFunc에서 this가 자신의 상위 스코프(`outer`) 를 사용하고 있다는 사실을 알 수 있다.

## 1-4. 콜백 함수 내부에서의 this

- **콜백** : **실행 흐름 A가 제어권을 또 다른 흐름 B에게 넘겨주는 경우 B의 기준에서 A를 지칭할 때 사용하는 말**
  - A는 B의 내부 로직에 의해 실행되어지며, this 또한 B 내부에서 정해진 내용에 따라 값이 결정된다.
  - 기본적으로는 this가 전역 객체를 참조한다.
  - 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정하면 그 대상을 참조한다.

```jsx
// 콜백 함수 내부에서 this 값 예시
setTimeout(function () {
  console.log(this);
}, 300); // (1)

[1, 2, 3, 4, 5].forEach(function (x) {
  // (2)
  console.log(this, x);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a').addEventListener('click', function (e) {
  // (3)
  console.log(this, e);
});
```

- **정답**

  (1) setTiemout : Window(전역객체)

  (2) forEach : Window(전역객체)

  (3) addEventListener : 이벤트가 발생했던 해당 앨리먼트

  ![image](https://user-images.githubusercontent.com/77887712/209552997-6384f9c9-69b4-4842-ac9f-5484379ae5f7.png)

## 1-5. 생성자 함수 내부에서의 this

- `new` 키워드로 불리는 이 생성자는 구체적인 인스턴스를 만들기 위한 모형의 역할을 수행한다.
- 따라서 이 키워드로 호출하게 되는 함수는 생성자 함수라는 특별한 역할을 부여받게 되고, **내부에서 this는 새로 구체화되는 인스턴스를 가리키게 된다.**
  - 프로토타입 프로퍼티를 참조하는 `__proto__` 라는 프로퍼티가 있는 객체를 만든다.
  - 공통된 속성 및 특징(순회, 읽기, 쓰기 등의 여부)를 해당 객체(this)에 부여한다.

```jsx
// 생성자 함수 예시
var Cat = function (name, age) {
  this.bark = '야옹';
  this.name = name;
  this.age = age;
};

var choco = new Cat('초코', 6);
var vanilla = new Cat('바닐라', 2);
console.log(choco, vanilla);

/*
 Cat { bark : '야옹', name: '초코', age: 6 }
 Cat { bark : '야옹', name: '바닐라', age: 2 }
*/
```

- Cat 함수 내부에서는 this를 통해 각 객체 프로퍼티를 대입하고 외부에서 new 키워드와 함께 해당 인스턴스를 출력하면 각 생성자 함수 내부에서 this는 각자 자기 자신의 인스턴스(`choco`, `vanilla`)를 가리켜 구분되는 것을 알 수 있다.

---

# 2. 명시적으로 선언하는 this

- 상황별로 this가 바인딩 되는 규칙을 무시하고, 사용자가 원하는 대상으로 바인딩 시키는 방법

## 2-1. call

**메서드의 호출 주체인 함수를 즉시 실행하는 메서드** (임의의 객체를 this 로 지정할 수 있음 )

```js
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

1. 첫 인자 `thisArg`: 바인딩 할 대상(this)
2. 그 이후 인자 `[, arg1[, arg2[, ...]]]`: 호출할 함수의 매개변수들

```jsx
// call 메서드 예시 1
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // Window { ... } 1 2 3
func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6

// call 메서드 예시 2
var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.method(2, 3); // 1 2 3
obj.method.call({ a: 4 }, 5, 6); // 4 5 6
```

- 예시 2번 : obj 내부에 있는 a 프로퍼티의 값 1이 안나온 것은 현재 `this.a`가 가리키는 것이 call로 받은
  `{ a : 4}` 이기 때문이다.

## 2-2. apply

1. **메서드의 호출 주체인 함수를 즉시 실행하는 메서드** (=call 메서드와 기능적으로는 완전히 동일)
2. **call 메서드와 차이점**

- `call` : 첫 번째 인자 이후 모든 인자들을 호출 함수의 매개변수로 지정
- `apply` : 두 번째 인자를 배열로 받고, 그 요소들을 호출할 함수의 매개변수로 지정

```jsx
Function.prototype.apply(thisArg[, argsArray])
```

1. 첫 인자 `thisArg`: 바인딩 할 대상(this)
2. 두 번째 인자 `[, argsArray]`: 배열 형태의 호출할 함수의 매개변수(유사 배열)

## 2-3. call / apply 활용

### 2-3-1. 유사배열 객체에 배열 메서드 적용

- **유사배열 :** **키가 0과 양의 정수 프로퍼티로 구성되고, length 프로퍼티 값이 0 또는 양의 정수인 객체**
- **유사배열 종류** : `유사배열 형태의 객체`, `Node List`, `arguments`, `문자열`

> **call/apply 활용 예시 - 1번 유사 배열 객체에서 배열 메서드 사용하기**

- call, apply 메서드를 이용해서 배열 메서드 처럼 사용할 수 있다.

```jsx
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};
Array.prototype.push.call(obj, 'd');
console.log(obj); // { 0: 'a',1: 'b', 2: 'c', 3: 'd', length: 4 }

var arr = Array.prototype.slice.call(obj); // (A)
console.log(arr); // ['a', 'b', 'c', 'd']
```

(A) : 유사배열 형태인 값을 배열 형태로 만들었지만 사실 slice 메서드는 배열 형태를 복사하기 위한 기능이 아니기 때문에 의도에 맞는 Array.from 같은 메서드를 사용하는것이 더 의미에 맞는 쓰임이라고 할 수 있다.

**Array.from으로 유사배열을 배열로 만드는 예시**

```jsx
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};
var arr = Array.from(obj);
console.log(arr); // ['a', 'b', 'c']
```

> **call/apply 활용 예시 - arguments, nodeList를 이용한 배열 메서드 사용하기**

```jsx
function a() {
  var argv = Array.prototype.slice.call(arguments);
  argv.forEach(function (arg) {
    console.log(arg);
  });
}
a(1, 2, 3);

document.body.innerHTML = `<div>a</div><div>b</div><div>c</div>`;
var nodeList = document.querySeletorAll('div');
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node) {
  console.log(node);
});
```

- `querySelectorAll` , `getElementByClassName`, `argument` 등 모두 유사배열객체로 똑같이 call, apply 메서드를 사용할 수 있다.

> **call/apply 활용 예시 - 문자열에 배열 메서드 사용하기**

```jsx
var str = 'abc def';

Array.prototype.push.call(str, ', pushed string'); // 에러

Array.prototype.concat(str, 'string'); [String {"abc def"}, "string"]

Array.prototype.every.call(str, function(char) { return char !== ' ';}); // false

Array.prototype.some.call(str, function(char) { return char === ' ';}); // true
```

- 문자열의 경우에는 모든 배열 메서드를 적용할 수는 없다.
- length 프로퍼티가 읽기 전용으로 잡혀있기 때문에 원본 문자열에 변경을 가하는 메서드 `push, pop, shift, unshift, splice` 등에 대해서는 에러를 발생시키고, 반드시 배열 대상에만 적용 가능한 `concat` 등은 에러가 나지 않지만 의도된 결과를 얻기 힘들다.

### 2-3-2. 생성자 내부에서 다른 생성자 호출하기

- 생성자 내부에 다른 생성자와 공통된 내용에 한해서 `call`, `apply`를 이용해 다른 생성자를 호출하면 반복을 줄일 수 있다.

```jsx
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender); // Person의 this를 사용
  this.school = school;
}

function Employee(name, gender, company) {
  Person.apply(this, [name, gender]);
  this.compnay = company;
}

const jm = new Student('재민', 'male', '한국대');
var br = new Employee('보라', 'female', '구글');
```

- 위 예시는 `Person`이라는 공통의 클래스를 하나로 두고 `Student` 와 `Employee` 클래스의 생성자 함수 내부에서 `Person` 생성자 함수를 호출하여 인스턴스 속성을 정의하고 있다.

### 2-3-3. 여러 인수를 묶어 하나의 배열로 전달하기 ( apply 활용 )

- 여러 개의 인수를 받는 메서드에 하나의 배열로 인수를 전달하고자 할때 `apply` 메서드를 활용하면 좋다.
- ES5 이하의 환경에서는 전개 연산자(Spread Operator)를 사용할 수 없으므로 배열 메서드 중 여러 인자를 받아 최솟값, 최대 값을 구할 수 있는 방법에는 인자를 하나씩 전달하기 보다 `apply` 를 이용하면 간결하게 인자를 전달하여 구현할 수 있다.

```jsx
var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);
console.log(max, min); // 45 3
```

- 전개 연산자를 사용할 수 있는 ES6 이상의 환경에서는 굳이 `this`를 바인딩하지 않고도 이러한 문제를 간결하게 구현할 수 있다.

```jsx
const numbers = [10, 20, 3, 16, 45];
const max = Math.max(...numbers);
const min = Math.min(...numbers);
console.log(max, min); // 45 3
```

## 2.4. bind

- **메서드의 호출 주체인 함수와 this 및 인수를 이용해 새로운 함수를 반환하는 메서드**
- 새로 생성된 함수를 다시 호출해서 인수를 넘기면 그 인수들은 기존 bind 메서드를 호출 했을 때 전달한 인수들의 뒤에 이어서 등록된다. ( = 함수에 this 바인딩을 미리 적용하고, 함수를 분리하는 등에서 사용 )

```jsx
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```

1. 첫 인자 `thisArg`: 바인딩 할 대상(this)
2. 그 이후 인자 `[, arg1[, arg2[, ...]]]`: 호출할 함수의 매개변수들

> bind 메서드 - this 지정과 부분 적용 함수 구현 예시

```jsx
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4); // Window { ... } 1 2 3 4

var bindFunc1 = func.bind({ x: 1 });
bindFun1(5, 6, 7, 8); // { x: 1 } 5 6 7 8

var bindFunc2 = func.bind({ x: 1 }, 4, 5); // (b) 부분 적용 함수
bindFunc2(6, 7); // { x: 1 } 4 5 6 7
bindFunc2(8, 9); // { x: 1 } 4 5 8 9
```

- (**B) 부분 적용 함수** : 클로저의 개념이 들어가 있는 형태로 실무에서는 디바운스와 같은 성능 최적화와 관련된 기법으로 자주 사용된다.

### bind 메소드 내에서 name 프로퍼티

- name 프로퍼티는 함수의 이름을 반환하는 속성으로 사용된다. (익명함수는 빈문자열을 반환)
- 여기서 bind 메서드를 적용해서 만든 함수에 name 프로퍼티를 붙이면 bind 의 수동태인 `bound` 가 붙는다.
- 원본 함수에 bind 메서드를 적용한 새로운 함수로 식별할 수 있어 코드 추적에 용이하다.

```jsx
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
var bindFunc = func.bind({ x: 1 }, 4, 5);
console.log(func.name); // func
console.log(bindFunc.name); // bound func
```

### 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

- 변수를 우회하는 방법 말고 `call`, `apply`, `bind` 메서드를 이용하면 더 깔끔하게 처리할 수 있다.

> 내부함수에 this 전달 - call vs bind 예시

```jsx
// call 예시
var obj = {
 outer: function() {
  console.log(this);
  var innerFunc = function() {
   console.log(this);
  };
 };
 innerFunc.call(this); // innerFunc를 호출하는 시점에 상위 컨텍스트의 this를 전달
};
obj.outer();
```

vs

```jsx
// bind 예시
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this); // 내부 함수의 this를 고정해서 innerFunc 변수에 할당
    innerFunc();
  },
};
obj.outer();
```

## 2.5. 화살표 함수의 예외사항

- 화살표 함수의 실행 컨텍스트를 생성할 시 this를 바인딩하는 과정이 제외된다.
- 내부에 this가 없기 때문에 이를 참조하면 상위 함수의 스코프체인을 통해 가장 가까운 this를 찾게 된다.
- 이것을 사용하면 굳이 변수로 this를 우회하거나 call, apply, bind를 쓰지 않고 간결한 흐름으로 this를 이용할 수 있게 된다. ( 어디까지나 ES6 이상에서만 말한다. )

## 2.6. 별도의 인자로 this를 받은 경우 (콜백 함수 내부에서의 this)

- 콜백 함수 인자로 this를 인자로 받는 경우로, 콜백 함수 내부에서 this 값을 원하는대로 변경할 수 있다.
  - 보통 내부 요소에 같은 동작을 수행하는 배열 메서드에서 자주 볼 수 있는 패턴
- **콜백 함수와 함께 `thisArg` 를 인자로 받는 메서드**
  - `forEach, map, filter, some, every, find, findIndex` 등 외에도 많다.

```jsx
// thisArg를 받는 경우 예시 - forEach 메서드
var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this); // (1) 바인딩 지점
  },
  average: function () {
    return this.sum / this.count;
  },
};
report.add(60, 85, 95);
console.log(report.sum, report.count, report.average()); // 240 3 80
```

- (1) : `report.add` 는 콜백 함수 안에서 this가 add 메서드의 this로 전달한 상태기 때문에 `report` 객체를 그대로 가리키게 되고, 따라서 내부를 순회 하면서 값을 계속 더해갈 수 있게 된다.

---

### 참조

[코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB)
