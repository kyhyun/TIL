> 본 내용은 정재남 님의 [코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB) 책을 읽고 정리한 내용을 작성했습니다.

# Chapter 05. 클로저

## 01. 클로저의 의미 및 원리 이해

### 1.1 클로저란?

- **어떤 함수에서 선언한 변수를 참조하는 상태로 내부 함수에서 발생하는 현상**
  - 어떤 함수 A에서 선언한 변수를 참조하는 내부 함수 B를 외부로 전달하는 경우 함수 A의 실행 컨텍스트가 종료된 이후에도 참조하고 있는 변수가 사라지지 않는다.
- 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성이다.

### 1.2 클로저 원리 이해하기

> 외부 함수의 변수를 참조하는 내부 함수 예시(1) - 일반적인 함수 및 내부 함수의 경우

```jsx
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
};
outer();
```

1. outer 함수에서 변수 a 선언한다.
2. outer의 내부 함수인 inner 함수에서 a의 값을 1 증가시키고 출력한다.
   - inner 함수 내부에서는 a를 선언하지 않아, Environment Record에서 값을 찾지 못한다.
   - Outer Environment Reference에 지정된 상위 컨텍스트인 outer의 Lexcial Environment에 접근해서 다시 a 식별자를 탐색하고 1의 값을 가져온다.
3. 4번째 줄의 결과는 1의 값을 가져온 상태에서 1을 증가시키고 출력하기 때문에 2가 출력된다.
4. inner 함수와 outer 함수의 실행 컨텍스트가 종료되면 가지고 있던 식별자 정보들에 대한 참조를 지운다.
   - 각 주소에 저장되어 있던 값들은 자신을 참조하는 변수가 모두 사라지게 되므로 가비지 컬렉터의 수집 대상에 들어간다.

> 외부 함수의 변수를 참조하는 내부 함수 예시(2) - 클로저가 발생한 경우

```jsx
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outerFunc = outer();
console.log(outerFunc()); // 2
console.log(outerFunc()); // 3
```

1. 3~5번째 줄의 inner 함수 내부에서 외부 변수 a를 참조하여 값을 증가시킨 것을 반환한다.
2. 6번째 줄에서 외부 함수인 outer는 반환 값으로 inner 함수 자체를 반환한다.
3. 7번째 줄 시점에서 outer 함수의 실행 컨텍스트가 종료되는 지점으로 식별자의 참조 관계가 지워져야 한다.
   - 하지만 반환 값을 inner 함수 자체가 계속 참조하고 있는 상태이기 가비지 컬렉션의 제거 대상에서 제외되고 때문에 지워지지 않은 상태로 해당 함수를 사용함으로써 값을 계속 접근할 수 있게 된다.
4. 8번째 줄에서 outer 호출한 것 (inner 함수 정의부)을 outerFunc에 할당한다.
5. 9번째 줄에서 outerFunc 식별자를 호출한다.( inner 함수의 호출 ⇒ 2 출력 )
   - 식별자 a를 탐색한다.
   - inner 함수의 실행 컨텍스트의 Environment Record 에는 수집할 정보가 없다.
   - Outer Environment Reference에 inner 함수가 선언된 위치의 Lexical Environment가 참조 된다.
   - inner 함수는 outer 함수 내부에서 선언되어, outer 함수의 Lexical Environment 가 담겨있다.
   - 따라서 스코프 체이닝에 의해 outer에서 선언한 변수 a에 접근할 수 있고 값을 1만큼 증가시킨 후 그 값인 2를 반환하게 된다.
6. 10번째 줄에서 다시 한번 outerFunc 식별자를 호출한다. ( inner 함수의 호출 ⇒ 3 출력 )
7. 외부 함수의 Lexical Environment가 가비지 컬렉팅되지 않는 현상을 말한다.

> 클로저가 발생하는 다양한 경우 - time 관련 함수( setTimeout, setInterval )

- 외부 객체인 window의 메서드에 전달할 콜백 함수 내부에서 지역변수를 참조한다.

```jsx
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (a++ >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```

> 클로저가 발생하는 다양한 경우 - 이벤트 리스너

- 외부 객체인 DOM의 메서드에 등록할 콜백 함수 내부에서 지역변수를 참조한다.

```jsx
(function () {
  var count = 0;
  var button = document.createElement('button');
  button.innerText = 'click';

  button.addEventListener('click', function () {
    console.log(++count, 'clicked');
  });

  document.body.appendChild(button);
})();
```

---

## 02. 클로저와 메모리 관리

- 클로저는 객체지향과 함수형 모두를 아우르는 매우 중요한 개념이지만 가비지컬렉터의 수거 대상이 되지 않기 때문에 메모리 소모에 대한 문제를 항상 염두 해야한다.

### 2-1. **클로저의 메모리 해제 방법**

- 클로저를 참조하고 있는 관계를 끊어주어 가비지 컬렉터의 수집 대상에 들어가게 만들면 된다.
  - 식별자에 참조형 데이터가 아닌 기본형 데이터( 보통 없음을 의미하는 null 값을 사용한다 )를 할당한다.

> 클로저의 메모리 관리 예시(1) - return에 의한 클로저 메모리 해제

![image](https://user-images.githubusercontent.com/77887712/209681004-898184ec-913f-42b5-bcfe-e66b32c6ad71.png)

> 클로저의 메모리 관리 예시(2) - setInterval에 의한 클로저 메모리 해제

![image](https://user-images.githubusercontent.com/77887712/209681052-9c048deb-1841-470f-a7b8-d9f0ce654b87.png)

> 클로저의 메모리 관리 예시(3) - 이벤트 리스너에 의한 클로저 메모리 해제

![image](https://user-images.githubusercontent.com/77887712/209681103-ebb2cd9d-916e-48ec-8d05-e460c21a6004.png)

---

## 03. 클로저 활용 사례

## 3-1. 콜백 함수 내부에서 외부 데이터 사용

- 클로저를 활용해서 콜백 함수 안에 외부 변수를 직접 참조하는 방법, bind 메서드를 사용하는 방법, 고차 함수를 사용하는 방법으로 3개가 존재한다. 각기 장단점과 상황을 고려해서 알맞는 상황에 사용해야한다.

### 3-1-1. **콜백 함수를 내부 함수로 선언해서 외부변수를 직접 참조하는 방법**

> 콜백 함수와 클로저 예시(1) - 콜백 함수를 내부 함수로 선언해서 외부변수를 직접 참조하는 방법

![image](https://user-images.githubusercontent.com/77887712/209681139-569e2332-1215-466e-b7a1-9a53d12c4f01.png)

- fruits 변수를 순회하며 li를 생성하고, 각 li를 클릭하면 해당 리스너에 기억된 콜백 함수를 실행하는 코드
- 4번째 줄의 forEach 메서드에 넘겨준 익명의 콜백 함수 (A)
  - 내부에서 외부 변수를 사용하지 않고 있으므로 클로저가 없다.
- 7번째 줄의 addEventListener의 인자로 전달되고 있는 콜백 함수 (B)
  - 함수 내부에서 외부 변수 fruit을 참조하고 있으므로 클로저가 존재한다.
  - (A)는 fruits의 개수만큼 실행되고, 그때마다 새로운 실행 컨텍스트가 생성된다.
  - (A)의 실행 종료 여부와 무관하게 클릭 이벤트에 의해 각 컨텍스트의 (B)가 실행될 때는 (B)의 Outer Environment Reference가 (A)의 Lexical Environment 를 참조하기 때문에 GC의 수집 대상에서 제외되어 계속 참조가 가능해진다.

### 3-1-2. **bind 메서드를 활용하는 방법**

> 콜백 함수와 클로저 예시(2) - bind 메서드를 활용하는 방법 1/2

![image](https://user-images.githubusercontent.com/77887712/209681166-7d951595-32df-47ca-95d2-2e6b54034eb4.png)

- 4~6번째 줄 : 함수의 역할과 분리를 위해서 기존에 (B)의 콜백함수를 분리한 부분으로 클로저가 제거된다.
- 11번째 줄 : (B)에 있던 콜백 함수의 자리를 alertFruit 이라는 변수를 전달하여 함수를 직접 실행할 수 있다.
  - 하지만 각 li 클릭에 대해 대상의 과일 이름이 아닌 [object MouseEvent] 라는 값이 출력된다.
  - 콜백 함수의 인자에 대한 제어권을 addEventListener가 가진 상태로, 이 함수는 콜백 함수를 호출할 때 첫 번째 인자에 이벤트 객체를 주입하기 때문에 이와 같은 문제가 발생한다.
  - 이러한 문제는 bind 메서드를 활용하면 해결할 수 있다.

> 콜백 함수와 클로저 예시(3) - bind 메서드를 활용하는 방법 2/2

![image](https://user-images.githubusercontent.com/77887712/209681192-9a78c5e7-84ce-4d6b-a8ae-3852c21e70dc.png)

- 11번째 줄의 alertFruit 변수에 bind 메서드를 호출한다.
  - 첫 번째 인자는 새로 바인딩 할 this로 매개변수를 생략할 수 없어 null을 전달한다.
  - 두 번째 인자에 이벤트 객체가 전달된다.
- 클로저를 사용하지 않고 외부변수를 참조할 수 있게 됐지만 이벤트 객체가 인자로 넘어오는 순서가 두 번째로 바뀌는 점, 함수 내부에서 this가 달라지는 등의 감안해야할 문제점들이 존재한다.

### 3-1-3. **고차 함수를 활용한 방법**

> 콜백 함수와 클로저 예시(4) - 고차함수를 활용한 방법

![image](https://user-images.githubusercontent.com/77887712/209681221-3e9df580-c414-4ec9-b37f-f2049f38c8ef.png)

- 4~8번째 줄 : alertFruitBuilder 함수에서 다시 익명함수를 반환한다.
  - 이 익명함수가 기존의 alertFruit 함수 역할을 수행한다.
- 12번째 줄 : alertFruitBuilder 함수가 실행하면서 fruit 값을 인자로 전달한다.
  - 이 함수의 실행 결과가 다시 함수가 되어, 이렇게 반환된 함수를 리스너에 콜백 함수로 전달한다.
  - 이후 클릭 이벤트가 발생하면 이 함수의 실행 컨텍스트가 활성화되어 alertFruitBuilder의 인자로 넘어온 fruit를 Outer Environment Reference에 의해 참조할 수 있게 된다.(즉, 반환된 함수의 내부에는 클로저가 존재한다.)

---

## 3-2. 접근 권한 제어(정보 은닉)

- 어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자 하는 프로그래밍 언어의 중요한 개념 중 하나

### 3-2-1. **접근 권한에 대한 제어자 키워드**

- 언어마다 상이하지만 보통 사용되는 접근 제어자는 public, protected, private 세 종류가 있다.
  - public : 접근 제한이 없어 외부에서 모두 접근이 가능한 상태
  - protected : 자기 자신의 클래스 + 파생된 관계(상속되어 있는 자식 클래스)까지만 접근이 가능한 상태
  - private : 클래스 내부에서만 사용할 수 있는 상태, 외부에서 값 접근 불가

### 3-2-2. 자바스크립트의 접근 권한 제어

- 자바스크립트에서 기본적으로 변수 자체에 접근 권한을 부여하도록 설계되어 있지 않다.
- 하지만 클로저를 통해 함수 단위에서 public과 private한 값을 구분할 수 있도록 처리하는 것이 가능하다.
  - 외부 스코프에서 함수 내부의 일부 변수에 대해 return을 전달하여 접근 권한을 설정할 수 있다.
    - return한 변수 : 공개 멤버(public member)
    - 반환하지 않고 내부에서 사용하는 변수 : 비공개 멤버(private member)

### 3-2-2. 접근 권한 제어하기

- 접근 권한 제어를 해보기 위해 간단한 자동차 경주 게임을 만들어보자.

```jsx
- 각 턴마다 주사위를 굴려 나온 숫자(km) 만큼 이동한다.
- 차량별로 연료량(fuel)과 연비(power)는 무작위로 결정된다.
- 남은 연료가 이동거리에 필요한 연료보다 부족하면 이동하지 못한다.
- 모든 유저가 이동할 수 없는 턴에 게임이 종료된다.
- 게임 종료 시점에 가장 멀리 이동해 있는 사람이 승리
```

> 간단한 자동차 객체 예시

![image](https://user-images.githubusercontent.com/77887712/209680323-50071741-0768-4287-9d3b-1cbb2648df3c.png)

- car 변수에 객체를 직접 할당해서, fuel과 power 프로퍼티 값을 무작위로 생성하고, moved 프로퍼티로 총 이동거리를 부여한다.
- run 메서드가 호출될 때마다 car 객체의 fuel, moved 값이 변하게 해서 소비되는 연비만큼 연료가 있지 않으면 이동 불가하도록 한다. (매번 이동할 거리도 호출할 때마다 달라진다.)

```jsx
car.fuel = 10_000;
car.power = 100;
car.moved = 1_000;
```

- 만약 이런 식으로 무작위로 정해지는 연료, 연비, 이동거리를 사용자가 바꿔버리게 된다면 어떻게 될까?
  사용자가 마음껏 값을 바꾸지 못하도록 할 필요가 있으며, 이때 활용할 수 있는게 클로저다.

> 클로저로 변수를 보호한 자동차 객체(1)

![image](https://user-images.githubusercontent.com/77887712/209680230-f46ae8c3-20b1-487d-82df-0093dc19959d.png)

- createCar 함수를 실행 함으로써 객체를 생성한다.
- fuel, power 변수는 비공개 멤버로 지정해 외부에서 접근을 제한한다.
- moved 변수는 getter를 이용해서 읽기 전용 속성을 부여하고 run 함수와 함께 객체 형태로 반환한다.
  - 이렇게되면 외부에서는 오직 run 메서드를 실행하는 것과 현재 moved 값을 확인하는 두 가지 동작만 사용자에게 제한시킬 수가 있다.

![image](https://user-images.githubusercontent.com/77887712/209680178-3988b696-ee59-46a6-a761-11d1fd7bc03f.png)

- 다음과 같이 fuel, power, moved 값을 변경하고자 하지만 값이 변경되지 않게 된다.

> 클로저로 변수를 보호한 자동차 객체(2)

![image](https://user-images.githubusercontent.com/77887712/209679995-3d754013-672a-4eb5-b1d0-c65959707b99.png)

- 반환하는 객체를 다른 내용으로 덮어씌우는 문제는 반환하기 전에 객체를 변경할 수 없게 조치를 취해야한다.
  - 반환할 객체를 publicMembers 라는 새 변수에 담고 Object.freeze 메서드에 인자로 넣어 처리한다.

### 3-3. 부분 적용 함수

- 여러 개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억 시켰다가, 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수

> bind 메서드를 활용한 부분 적용 함수 예시

![image](https://user-images.githubusercontent.com/77887712/209680516-b9acc395-e7d8-4914-8e11-2180a01aa81d.png)

- 위 코드는 addPartial 함수가 인자 5개를 미리 적용한 후, 추후 추가적으로 들어오는 인자들을 전달하면 모든 인자를 모아 원래의 함수가 실행되는 부분 적용 함수다.
- 메서드가 실행되지 않아 this의 값을 변경할 일이 없는 경우 위와 같이 bind 메서드만으로 구현할 수 있다.

> 부분 적용 함수 구현(1)

this에 관여하지 않는 범용성이 넓은 부분 적용 함수를 구현해보자.

![image](https://user-images.githubusercontent.com/77887712/209679995-3d754013-672a-4eb5-b1d0-c65959707b99.png)

1. bind를 대체할 partial 함수를 생성한다.
   - 첫 번째 인자에는 원본 함수를 받고 두 번째 인자 이후 부터 미리 적용할 인자들을 모아 전달한다.
2. 반환할 함수에서는 다시 나머지 인자들을 받아 원본 함수를 호출(apply) 한다.
   - 실행 시점의 this를 그대로 반영해서 컨텍스트 내의 this에 영향을 주지 않고 원하는 만큼의 인자를 전달할 수 있게 된다.

> 부분 적용 함수 구현(2) - 인자를 비워둔 함수 개선 1/2 (ES5 이전)

여기서 인자들을 원하는 위치에 미리 넣어두고 이후 빈 자리에 인자를 채워넣어 실행할 수 있는 함수로 개선해보자.

![image](https://user-images.githubusercontent.com/77887712/209679942-830c556c-1d5f-4d34-9a75-e3174314b8a2.png)

- 1~6번째 줄 : 실제 인자에 빈자리를 대신하기 위해 미리 전역객체에 `_` 라는 프로퍼티를 만들고 삭제, 변경 등의 접근에 대한 제어 설정을 처리한다.
- 17~21번째 줄 : 처음 넘겨준 인자들 중 \_로 비워 둔 공간마다 나중에 넘어온 인자들이 차례대로 끼워들어가도록 구현한다.
  - 이렇게 하면 실행할 함수의 모든 인자 개수를 맞춰 빈 공간을 확보하지 않아도 된다.

```js
 💡Object.defineProperty(obj, prop, descriptor)

 - 객체의 속성을 직접 정의하는 Object 메소드
 - 프로퍼티 접근 권한 설정 및 getter/setter 설정을 한다.
 - 메서드 인자 설명
   - obj : 정의할 객체
   - prop : 새로 만들거나 수정하려는 속성 이름
   - descriptor : 객체 속성을 기술하는 객체 (writable, configurable, enumerable 등)
```

> 부분 적용 함수 구현(3) - 인자를 비워둔 함수 개선 2/2 (ES6 이후)

- ES6에서는 비워 놓는 문자를 만들어 쓰는 대신 Symbol.for을 사용해 볼 수 있다.

![image](https://user-images.githubusercontent.com/77887712/209674570-e1eb22bd-5887-432a-a6ed-426cb507cf57.png)

- 전역 심볼공간에 인자로 넘어온 문자열이 이미 있으면 해당 값을 참조하고, 선언돼 있지 않으면 새로 만드는 방식으로 어디서든 접근 가능한 유일무이한 상수를 만들고자 할 때 적합하다.

> 부분 적용 함수 - 디바운스

![image](https://user-images.githubusercontent.com/77887712/209674515-aecd4d65-2c62-4795-a6bb-90c390a101a9.png)

- 이벤트 이름을 출력할 eventName, 실행할 함수 func, 마지막으로 발생한 이벤트인지 판단하기 위한 대기 시간 wait 을 인자로 받는다.
- 4번째 줄 : setTimeout을 사용하기 위한 this를 변수에 담는다.
- 6번째 줄 : 대기하고 있는 큐를 초기화한다.
  - 이전과 동일한 이벤트가 발생하면 앞서 저장한 대기열을 초기화 시킨다.
- 7번째 줄 : setTimeout으로 wait 시간만큼 지연시킨 다음, 원래의 func를 호출한다.
  - 이벤트가 발생하면 timeout 대기열에 wait 시간 뒤에 func를 실행할 것이라는 내용을 timeoutId에 담는다. ( 콜백 큐에 대기열로 등록된다. )
- 전 이벤트에 대해서는 초기화 되고 마지막에 발생한 이벤트만 초기화되지 않고 무사히 실행하게 된다.
- debounce 함수에서 클로저로 처리되는 변수로 eventName, func, wait, timeoutId가 있다.

> 💡 **디바운스란?**
>
> - 짧은 시간 동안 동일한 이벤트가 많이 발생했을 경우, 이를 전부 처리하지 않고 처음 혹은 마지막에 발생한 이벤트에 대해 한 번만 처리하는 것으로 프론트엔드 성능 최적화에 많은 도움을 주는 기능 중 하나다.
> - 주로 Scroll, Wheel, MouseMove, Resize 등 작은 동작에 이벤트가 무수히 발생할 수 있는 이벤트에 이 최적화 기법을 적용한다.

---

### 3-4. 커링 함수

- 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 함수
- 부분 적용 함수는 여러 개의 인자를 전달할 수 있고, 실행 결과를 재실행 할 때 원본 함수가 반드시 실행 된다는 차이가 존재한다.

#### **커링 함수 특징**

- 한 번에 하나의 인자만 전달하는 것을 원칙으로 한다.
- 중간 과정상의 함수를 실행한 결과는 그 다음 인자를 받기 위한 대기만 수행한다.
- 마지막 인자가 전달되기 전까지 실제 동작을 수행하는 원본 함수가 실행되지 않는다.

#### **커링 함수를 사용하기 좋은 예**

- 원하는 시점까지 지연시켰다가 실행하는 것이 필요로 하는 상황 (지연 실행)
- 자주 사용하는 함수의 매개변수가 항상 비슷하고 일부만 변경되는 경우

> 커링 함수 예시(1)

![image](https://user-images.githubusercontent.com/77887712/209674155-ac4e30bf-4d52-491f-909e-47a007f0e77d.png)

- 필요한 인자 개수만큼 함수를 계속해서 만들어 반환하다가 마지막에 조합해서 리턴하는 형식이다.

  - 다만 인자가 많아질수록 가독성이 떨어진다는 단점이 있다.

    ![image](https://user-images.githubusercontent.com/77887712/209674033-e9f00a9f-42e2-46f0-8113-0ca275da7c75.png)

  - 이를 개선해서 가독성을 고려하자면 ES6 이상 부터는 화살표 함수를 써서 해결할 수 있다.

    ![image](https://user-images.githubusercontent.com/77887712/209673952-0cc51a04-3d0c-4233-90e8-dfa7f311f256.png)

- 각 단계에서 받은 인자들은 모두 마지막 단계에서 참조될 것이므로 GC에 수거되지 않고 메모리에 쌓였다가 마지막 호출로 실행 컨텍스트가 종료된 이후 한꺼번에 GC의 수거 대상이 된다.

> 커링 함수 예시(2)

데이터를 받아오기 위해 공통적인 요소(baseUrl)을 기억시켜 두고, 특정한 값(id)만으로 서버 요청을 수행하는 함수를 만들 때, 커링 함수를 적용하기 좋다.

![image](https://user-images.githubusercontent.com/77887712/209673874-bfc3d75f-51bf-4ade-a000-6b602a700901.png)

```jsx
var imageUrl = 'http://imageAddress.com/';
var productUrl = 'http://productAddress.com/';

// 이미지 타입별 요청 함수 준비
var getImage = getInformation(imageUrl); // http://imageAddress.com/
var getEmotion = getImage('emotion'); // http://imageAddress.com/emotion
var getIcon = getImage('icon'); // http://imageAddress.com/icon

// 재품 타입별 요청 함수 준비
var getProduct = getInformation(productUrl); // http://productAddress.com/
var getFruit = getProduct('fruit'); // http://productAddress.com/fruit
var getVegetable = getProduct('vegetable'); // http://productAddress.com/vegetable

// 실제 요청
var emotion1 = getEmotion(100); // http://imageAddress.com/emotion/100
var emotion2 = getEmotion(200); // http://imageAddress.com/emotion/200
var icon1 = getIcon(205); // http://imageAddress.com/icon/205
var icon2 = getIcon(312); // http://imageAddress.com/icon/312
var fruit1 = getFruit(300); // http://imageAddress.com/icon/300
var fruit2 = getFruit(400); // http://imageAddress.com/icon/400
var vegetable1 = getVegetable(356); // http://productAddress.com/vegetable/356
var vegetable2 = getVegetable(789); // http://productAddress.com/vegetable/789
```

> 커링 함수 예시(3) - Redux의 미들웨어

- store, next, action 순서로 인자를 받는데, 여기서 action의 값은 매번 달라지므로 내부에서 인자를 미리 넘긴 후에 반환된 함수를 저장시켜놓고, 이후에 action만 받아서 처리할 수 있도록 구현되어 있다.

![image](https://user-images.githubusercontent.com/77887712/209673823-3b867472-5418-43e6-804c-275a0879a9c0.png)

## 04. 정리

### 4-1. 클로저

- 어떤 함수에서 선언한 변수를 참조하는 내부함수를 외부로 전달할 경우, 함수의 실행 컨텍스트가 종료된 후에도 변수가 사라지지 않는 현상
- 내부 함수가 외부 함수의 식별자를 참조해서 외부로 반환하는 경우와 타이머 함수, 그리고 이벤트 리스너의 콜백에서 발생할 수 있다.

### 4-2. 클로저와 메모리 관리

- 클로저를 참조하고 있는 식별자에 불필요한 지점에서 기본형 데이터(null or undefined)를 할당 해준다.
- 보통 외부로 return 하는 식별자가 그 대상이 된다.
- return이 없는 클로저의 경우
  - 이벤트 리스너, 타이머 함수에서 해당 메서드의 콜백을 지우기 위한 식별자가 대상이 된다.

### 4-3. 클로저의 활용 사례

#### 4-3-1. 콜백 함수 내부에서 외부 데이터 참조

1. **콜백 함수를 내부 함수로 선언해서 외부변수를 직접 참조하는 방법**
   - 특징
     - 가장 간단한 방법
     - 클로저를 사용한다.
   - 고려해야할 점
     - 그 함수가 순회되는 사이클에 있다면 매번 컨텍스트가 생성된다.
     - 메모리를 클로저가 계속 잡고 있기 때문에 불필요한 경우 참조를 해제 시켜주는 과정이 필요하다.
2. **bind 메서드를 활용하는 방법**
   - 특징
     - 클로저를 사용하지 않는다.
     - 함수가 분리되어 순회되는 사이클에서 무분별한 컨텍스트가 생성되는 것을 피할 수 있다.
   - 고려해야할 점
     - bind로 인한 함수 내부의 this 변경
     - 주입되는 인자가 있는 메서드의 경우 그 인자의 순서가 변경될 수 있음 ex) 이벤트 객체
3. **고차 함수를 활용하는 방법 (함수형 프로그래밍에서 자주 쓰이는 방식)**
   - 특징
     - 클로저를 사용한다.
     - bind 메서드에 의한 문제점이 발생하지 않고 함수 분리가 가능하다. (무분별한 컨텍스트 생성 방지)
   - 고려해야할 점
     - 메모리를 클로저가 계속 잡고 있기 때문에 불필요한 경우 참조를 해제 시켜주는 과정이 필요하다.

#### 4-3-2. 접근 권한 제어

- 클로저를 활용해 접근 권한을 제어하는 방법
  - 함수에서 지역 변수 및 내부함수 등을 생성
  - public : 외부에 접근 권한을 주고자 하는 경우 참조형 데이터를 return 한다.
    - 대상이 많으면 객체 혹은 배열 / 하나일 때는 함수
  - private : return 하지 않은 나머지 멤버 변수들은 비공개 멤버가 된다.

#### 4-3-3. 부분 적용 함수

- 여러 개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억 시켰다가, 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수
- 실무에서는 주로 이벤트의 디바운스 처리를 해주기 위한 함수를 만들 때 사용한다.

#### 4-3-4. 커링 함수

- 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 함수
- 지연 실행 혹은 대부분의 코드가 비슷한데 함수의 매개 변수 일부분이 변경되는 코드 등에 적용하기 좋다.

---

### 참조

[코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788?pid=123487&cosemkid=go15677587165719959&gclid=Cj0KCQiA1sucBhDgARIsAFoytUsc33dTsO_bVGYK1o_Yq6-DM1zjrx6VfLg1tALEQPMwts4j-FBpyjkaAmOLEALw_wcB)
