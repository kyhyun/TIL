![JavaScript](https://user-images.githubusercontent.com/77887712/129542514-660441b5-38ce-4f19-91ce-7eee88434645.png)

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 09. null 병합 연산자 '??'

`??`을 사용하면 짧은 문법으로 여러 피연산자 중 그 값이 '확정되어있는' 변수를 찾을 수 있다.

`a ?? b`의 평과 결과

- `a` 가 `null`도 아니고 `undefined`도 아니라면 `a`
- 그 외의 경우는 `b`

```javascript
// ?? 연산자 없이 x = a ?? b와 동일하게 동작하는 코드
x = (a !== null && a !== undefined) ? a : b;
```

 &nbsp;&nbsp;이렇게 비교 연산자와 논리 연산자만으로 null 병합 연산자와 같은 기능을 구현하면 코드가 길어진다.<br>
이 연산자를 이용해서 다음과 같이 값이 정해진 변수를 찾는데 용이하다.

```javascript
let firstName = null;
let lastName = null;
let nickName = '청포도';

// null이나 undefined가 아닌 첫 번째 피연산자를 찾는다.
alert(firstName ?? lastName ?? nickName ?? '익명의 사용자'); // 청포도
```

---

- **'??' 병합 연산자와 '||' OR 연산자의 차이**

  - `||` **첫 번째 truthy 값을 반환**
  - `??` **첫 번째 정의된(defined) 값을 반환**

  이것은 null과 undefined, 숫자 0을 구분해야할 때, 중요하다.

  ```javascript
  height = height ?? 100;
  ```

  height에 값이 정의되어있지 않으면 height에는 100이 할당된다.

  ```javascript
  let height = 0;
  
  alert(height || 100); // 100
  alert(height ?? 100); // 0
  ```

  &nbsp;&nbsp;`height || 100`은 height에 0을 할당하여 0을 falsy한 값으로 취급하여 `null` 이나 `undefined`에 대해서 동일하게 처리한다. <br>
  그래서 `height || 100`의 평과 결과는 100이 된다.

  &nbsp;&nbsp;`height ?? 100`의 평과 결과는 height가 `null` 혹은 `undefined`일 경우에만 100이 출력된다.<br> 
  지금은 height 값에 0이 할당되어 있기 때문에 0으로 처리된다.<br>
  이렇게 0이 할당 될 수 있는 변수를 사용할 경우에는 `||`보다 `??`가 더 적합하다.

------

- **연산자 우선순위**

  ```javascript
  let height = null;
  let width = null;
  
  let area = (height ?? 100) * (width ?? 50);
  
  alert(area); // 5000
  ```

  &nbsp;&nbsp; `??`의 연산자 우선순위는 5로 낮은 편으로 `=`와 `?`를 제외한 대부분의 연산자보다 늦게 평가된다.<br>
  따라서 복잡한 표현식을 사용하는 경우 괄호를 사용하여 처리해주는 것이 중요하다. 

  ```javascript
  // 괄호를 사용하지 않아 발생하는 에러 예시
  let x = 1 && 2 ?? 3; // SyntaxError: Unexpected token '??'
  
  // 괄호를 이용해 제대로 동작하는 '??' 사용 예시
  let x = (1 && 2) ?? 3;
  
  alert(x); // 2
  ```

   &nbsp;&nbsp;그리고 현재 `??`는 안정성 관련 이슈가 있기 때문에 괄호 없이 `&&`나 `||`와 함께 사용하지 못한다. <br>
  이러한 제약을 피하려면 역시 괄호를 사용해서 처리하면 문제 없이 동작한다.
  
