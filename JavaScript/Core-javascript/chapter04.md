# Chapter 04. 콜백 함수

## 1. 콜백 함수란

> 어떤 함수(A)의 인자로 들어가서 제어권을 위임하는 함수(B)

- 함수 A를 고차 함수(Higher-Order Function)라고 하고, 내부에 전달되는 함수 B를 콜백 함수라고 부른다.

### 특징

- 함수(A)는 즉시 실행(`동기`)할 수도 있고, 상황에 따라 나중에 실행(`비동기`)할 수도 있다.
- 배열 고차함수, 함수형 프로그래밍 관련 패러다임에 중요한 패턴으로 사용된다.
- 비동기 처리에 대한 문제를 해결할 수 있다. (타이머, 이벤트, 네트워크 통신 등에 주로 활용)

### **각종 예시**

- 반복 실행하는 콜백 함수

```jsx
/* forEach, map, filter 등 iterator가 가능한 콜백 (주로 배열 메소드) */
const arr = [1, 2, 3];
const newArr = arr.map((element) => {
  return element + 1; // 호출 조건 : 배열 인자를 전부 순회할 때 까지, 콜백이 실행된다.
});
console.log(newArr); // [2, 3, 4]
```

- 이벤트에 의해 실행되는 콜백 함수

```jsx
document.querySelector('.button').addEventListener('click', function () {
  console.log('cliked'); // 호출 조건 : 해당 버튼이 클릭 됐을 때, 콜백이 실행 된다.
});
```

- 타이머 관련 메서드에 의해 실행되는 콜백 함수

```jsx
setTimeout(function () {
  console.log('1초 경과'); // 호출 조건 : 1000ms(1초) 경과 후 콜백이 실행된다.
}, 1000);
```

### 단점

- 코드의 가독성을 떨어트린다. ( = 콜백 지옥 / 파멸의 피라미드)
- 에러 핸들링이 어렵다.

## 2. 제어권

> 고차 함수에서 콜백 함수를 통해 가지게 되는 제어권은 크게 세 가지가 있다.

### 2-1. 호출 시점

```jsx
var count = 0;
var callback = function () {
  console.log(count);
  if (++count > 4) clearInterval(timer); // 종료 조건
};
var timer = setInterval(callback, 1000); // 호출 조건 : 1초에 1번씩 콜백 실행
```

- 현재 `callback` 같은 경우는 `setInterval` 이 해당 함수의 제어권을 가져가서 실행해겠다는 판단을 스스로 하게 되고, 특정 조건(1초)이 됐을 때, 해당 함수를 실행하게 된다.
- 이처럼 콜백 함수의 제어권을 넘겨받은 코드는 **콜백 함수 호출 시점에 대한 제어권을 가지게 된다.**

### 2-2. 인자

- 콜백 함수의 인자로 들어오는 값은 정의된 규칙에 따라 그 인자의 값 형태와 순서를 지켜야 한다.
- 콜백 함수의 제어권을 넘겨받은 함수에서 **콜백 함수를 호출할 때 인자에 어떤 값들을 어떠한 순서로 전달할 지에 대한 제어권을 가지게된다.**

### 2-3. this

- 기본적으로는 전역객체를 참조하지만, 콜백 함수 안에서 this를 별도로 지정하면 그 대상을 참조한다.
- 제어권을 넘겨받는 고차함수로부터 call/apply 에 의해 명시적으로 첫 인자에 **콜백 함수 내부의 this가 어디에 바인딩 할지에 대한 제어권을 갖는다.**

### 예시

- 고차 함수로 동작하는 배열 메소드의 경우 내부에서 순회하는 콜백으로 이루어져 있다.
  - 여기서 this가 가리키는 대상을 콜백으로 받은 객체에 this를 가리키게 해야 정상적으로 배열을 가리킬 것이다.
  - 배열 메소드는 어떤 원리에서 이 this를 전역으로 안바라보고, 대상 객체를 참조할 수 있는 것일까?
  - 여러 배열 메소드 중에서 map에 대한 예시를 통해 콜백 내에서 this가 바인딩 되는 원리에 대해 알아보자.

```jsx
// 사용자 정의 map 메소드 내의 this 바인딩 원리
Array.prototype.map = function (callbak, thisArg) {
  var mappedArr = []; // 새로운 배열을 반환할 빈 배열 공간
  for (var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg || window, this[i], i, this);
    mappedArr[i] = mappedValue; //
  }
  return mappedArr;
};
```

- **콜백 함수 내의 인자**
  - 첫 번째 : this에 인자로 받은 thisArg 값인 경우 그 값을 하고, 없을 경우는 전역 객체를 바라보도록 한다.
  - 두 번째 이후 : call메서드는 2번째 인자부터 함수의 매개변수로 받는다.
    - 첫 인자 : this가 배열을 가리키기 때문에 this[i]는 그 배열의 i 번째 요소 값을 매개변수로 받는다.
    - 두 번째 인자 : 배열 인덱스인 i의 값을 매개변수로 받는다.
    - 세 번째 인자 : this를 지정해서 배열 자체를 매개변수로 받는다.

## 3. 콜백 함수의 this

어떤 함수의 인자에 **객체의 메서드로 전달하더라도 일반 함수의 this 처럼 전역객체를 바라보게 된다.**

### **예시**

```jsx
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    // 콜백함수로 사용할 메서드
    console.log(this, v, i);
  },
};

obj.logValues(1, 2); //  (A) { vals: [1, 2, 3] logValues: f } 1 2

[4, 5, 6].forEach(obj.logValues);
// (B) Window { ... } 4 0 Window { ... } 5 1 Window { ...} 6 2
```

- (A) : `obj` 메서드로 호출되어 this는 `obj` 를 가리키는 상태가 된다.
- (B) : `obj` 의 메서드를 직접 호출하는게 아니라면, forEach의 콜백 함수로서 호출되어 this는 전역객체를 바라보게 된다.

## 4. 콜백 함수 내부의 this에 다른 값 바인딩하기

> 콜백 함수 내부에서 this가 바라보게 하는 방법

### 4-1. 전통적인 방식

- this를 다른 변수에 담아서 내부 함수에서 사용하도록 하는 방법
  - 실제로 this를 사용하는 것이 아닐뿐더러 별로 좋은 방식은 아님

```jsx
var obj1 = {
  name: 'obj1',
  func: function () {
    // 바깥쪽 함수
    var self = this; // 이 시점의 this를 self에 저장함
    return function () {
      // 내부 함수
      console.log(self.name); // 여기서 self.name을 사용해서 바깥 name 프로퍼티를 읽음
    };
  },
};

var callback = obj1.func();
setTimeout(callback, 1000); // 1초 뒤 : obj 출력
```

### 4-2. bind 메서드를 이용한 방법

```jsx
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(this.name);
  },
};

setTimeout(obj1.func.bind(obj1), 1000); // obj1 => this가 바깥 name을 가리킴

var obj2 = { name: 'obj2' };
setTimeout(obj1.func.bind(obj2), 1500); // obj2 => bind 된 name을 가리킴
```

---

## 5. 콜백 지옥과 비동기 제어

![image](https://user-images.githubusercontent.com/77887712/209560407-638b0e89-84ad-4375-bd14-a9b4688e2d40.png)

## 5-1. 콜백 지옥

- 함수를 서로 전달하는 과정이 반복되서 코드의 들여쓰기가 감당하기 힘들어질 정도로 깊어지는 현상
- 주로 이벤트 처리, 서버 통신과 같은 비동기 작업할 때 이와 같은 현상이 흔히 발생한다.
- 이는 가독성이 떨어지고 코드 수정하기도 어렵게 만드는 요인이 된다.

> 콜백 지옥 예시

- 0.5초(500ms) 마다 커피 목록을 수집해서 출력하는 예제

```jsx
setTimeout(
  function (name) {
    var coffeeList = name;
    console.log(coffeeList);

    setTimeout(
      function (name) {
        coffeeList += ', ' + name;
        console.log(coffeeList);

        setTimeout(
          function (name) {
            coffeeList += ', ' + name;
            console.log(coffeeList);

            setTimeout(
              function (name) {
                coffeeList += ', ' + name;
                console.log(coffeeList);
              },
              500,
              '카페라떼'
            );
          },
          500,
          '카페모카'
        );
      },
      500,
      '아메리카노'
    );
  },
  500,
  '에스프레소'
);
```

- 이 코드의 불편한 점은 값이 전달되는 순서가 아래에서 위로 향하고 있어서 코드를 읽기가 사람이 읽기 어렵다는 문제가 있다. `(에스프레소 → 아메리카노 → 카페모카 → 카페라떼)`
- 또 지금 카테고리가 4개 밖에 안됐는데도 들여쓰기 수준이 상당히 깊어져서 지저분한 느낌도 준다.

## 5-2. 콜백 지옥 해결 방법

- 최근의 ECMAScript에서 해결할 수 있는 방법으로는 Promise, Generator, async/await 등 다양한 방법들이 있으며 비동기 제어를 할 수 있는 것들이 점차 많아지고 있다.

### 1) 기명 함수 전환하기

- 가장 간단한 해결 방법으로 코드의 진행 흐름과 가독성 향상을 쉽게 가져올 수 있다.
- 한 번 사용하고 사라지는 함수를 전부 변수로 만들었기 때문에 변수명을 기억하며 흐름을 파악해야하므로 헷갈릴 소지가 있다는 단점이 있다.

> 콜백 지옥 해결 - 기명함수로 변환

```jsx
var coffeeList = '';

var addEspresso = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, '아메리카노');
};

var addAmericano = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, '카페모카');
};

var addMocha = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addLatte, 500, '카페라떼');
};

var addLatte = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
};

setTimeout(addEspresso, 500, '에스프레소');
```

### 2) Promise

- ES6의 Promise를 통해 콜백 지옥을 해결할 수 있다.
- new 연산자와 함께 호출한 Promise 인자로 resolve, reject 메서드를 통해 이행 상태의 fullfilled, reject 상태를 제어한다.

> 비동기 작업의 동기적 표현 - Promise 예시

```jsx
new Promise(function (resolve) {
  setTimeout(function () {
    var name = '에스프레소';
    console.log(name);
    resolve(name);
  }, 500);
})
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ', 아메리카노';
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ', 카페모카';
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ', 카페라떼';
        console.log(name);
        resolve(name);
      }, 500);
    });
  });
```

- 이처럼 new 연산자와 함께 Promise의 인자로 남겨주는 콜백 함수에서 제공되는 resolve와 reject 함수의 호출에 따라 then 또는 catch 구문을 넘겨 비동기 작업을 동기적 표현으로 처리할 수 있다.

> 함수로 분리해서 더욱 간소화 된 Promise 예시

- 위의 예시에서 반복적인 부분을 함수로 분리해서 간소화 해서 표현할 수 있다.

```jsx
var addCoffee = function (name) {
  return function (prevName) {
    // 클로저 발생
    return new Promise(function (resolve) {
      // 클로저 발생
      setTimeout(function () {
        var newName = prevName ? prevName + ', ' + name : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};
addCoffee('에스프레소')().then(addCoffee('아메리카노')).then(addCoffee('카페모카')).then(addCoffee('카페라떼'));
```

- setTimeout 콜백 함수 안에서 바깥의 함수에서 전달하는 변수(=매개변수)를 참조하고 있어 클로저가 발생하고 있다.

### 3) Generator

- ES6의 Generator 문법으로도 비동기 작업을 동기적으로 표현할 수 있다.

> 비동기 작업의 동기적 표현 - Generator 예시

```jsx
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    cooffeeMaker.next(prevNAme ? prevName + ', ' + name : name);
  }, 500);
};

var coffeeGenerator = function* () {
  // 제너레이터 문법 적용
  var espresso = yield addCoffee('', '에스프레소');
  console.log(espresso);
  var americano = yield addCoffee(espresso, '아메리카노');
  console.log(americano);
  var mocha = yield addCoffee(mocha, '카페모카');
  console.log(mocha);
};

var coffeeMaker = coffeeGenerator();
coffeeMakrer.next();
```

- Generator 함수 `function*` 가 실행되면 Interator가 반환되고, next 메서드가 존재해서 함수 내부에서 가장 먼저 등장하는 `yield` 키워드에서 함수의 실행을 멈춘다.
- 이후 다시 next 메서드를 호출하면 앞서 멈춘 부분부터 시작해서 다음에 등장하는 `yield` 에서 함수의 실행을 멈춘다.
- 즉 비동기 작업이 완료되는 지점마다 next 메서드를 호출함으로써 Generator 함수가 내부의 소스를 순차적으로 실행할 수 있도록 도와준다.

### 4) Promise + Async/await

- ES2017에서 추가 된 async/await 문법을 이용한 방법이 있다.
- Promise로 개선하더라도 콜백 지옥과 유사한 `then` 체이닝이 발생하여 이를 개선할 수 있다.
- 비동기 작업을 수행하려는 함수 앞에 async 키워드를 붙이고 함수 내부에서 실질적인 비동기 작업이 필요한 위치에 await 키워드를 붙이면 해당 내용을 Promise 객체로 반환해서 이를 사용할 수 있다.

> 비동기 작업의 동기적 표현 - Promise + Async/await 예시

```jsx
var addCoffee = function(name) {
 return function (prevName) {
  setTimeout(function () {
   resolve(name);
  }, 500);
 });
};

var coffeeMaker = async function () {
 var coffeeList = '';
 var _addCoffee = async function (name) {
  coffeeList += (coffeeList) ? ',' : '') + await addCoffee(name);
 };
 await _addCoffee('에스프레소');
 console.log(coffeeList);
 await _addCoffee('아메리카노');
 console.log(coffeeList);
 await _addCoffee('카페모카');
 console.log(coffeeList);
 await _addCoffee('카페라떼');
 console.log(coffeeList);
};
coffeeMaker();
```
