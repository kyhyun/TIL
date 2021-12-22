![JavaScript](https://user-images.githubusercontent.com/77887712/129447765-a115b7d2-feb8-4ded-9d1c-9b59eef9612d.png)

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.



# Chapter_03. 변수와 상수



### 1. 변수(Variable)

> 사용자나 서버로부터 입력받은 정보를 처리하기 위해 데이터를 저장하는 저장소

 ```javascript
 // 변수의 선언과 생성
 let message;
 ```

위 코드처럼 키워드로 `let` 으로 변수를 생성하고, 'message'라는 이름을 지어 변수를 생성한다.

```javascript
let message;
message = 'Hello'; // message라는 이름의 변수에 'Hello'라는 문자열 값을 대입 
```

대입 연산자 `=` 를 이용해서 변수 안에 'Hello'라는 문자열 데이터를 저장한다. 이렇게 되면 문자열은 해당 변수의 메모리 영역에 저장되고, 변수명을 사용함으로써 문자열에 접근할 수 있게 된다.

```javascript
let message = 'Hello!'; // 변수를 정의하고 값을 대입
alert(message); // Hello!

// 한 줄에 여러 변수를 선언하는 예제 ( 가능은 하지만, 권장하는 방법은 아님 )
let user = 'Kim', age = 30, message = 'Hi';

// 한 줄에 한 개의 변수를 작성 ( 가독성을 높이기 때문에 좋은 방법임 )
let user = 'Kim';
let age = 30;
let messgae = 'Hi';
```

이외에도 다양하게 작성하는 방식이 있지만 기술적으로 차이가 있지는 않으므로, 속하게 되는 그룹의 코드 작성 규칙(Convention)을 따르거나 개인이 맞는 방식으로 작성하면 된다.



- **변수 명명 규칙**
  - 변수명에는 오직 문자와 숫자, 그리고 기호 $와 _(under bar)만 들어갈 수 있다.
  - 첫 글자는 숫자가 될 수 없다.
  - 여러 단어 조합 시, 카멜 표기법(cemelCase)을 사용한다. (예 : myClassType)
  - 대/소문자가 구별 된다. (예 : love와 Love는 서로 다른 변수)
  - 예약어를 변수명으로 사용할 수 없다. (예 : let, class, return, function 등)

---

- **변수 키워드** `var` **에 대해**

  오래된 변수 선언 키워드로, 현재는 잘 사용하지 않는 키워드로 대부분의 경우에는 키워드 `let`와 큰 차이가 없지만 오래된 변수 선언 키워드인 만큼 많은 문제점이 존재한다.

  - **블록 스코프의 부재**

  var 키워드는 함수 혹은 전역 스코프로 블록 밖에서도 접근이 가능하다.

  ```javascript
  if(true){
      var test = true;
  }
  
  alert(test); // true, if문의 블록이 끝나도 'test'는 전역 변수이므로 여전히 접근 가능
  ```

  조건문 외에도 반복문에서도 var는 루프 밖의 블록에서 여전히 그 값을 사용할 수 있다.

  ```javascript
  for (var i = 0; i < 10; i++) {
    // 이하 생략
  }
  
  alert(i); // 10, 반복문이 종료되었지만 'i'는 전역 변수이므로 여전히 접근 가능
  ```

  하지만 코드 블록이 함수 안에 있다면, var는 함수 레벨 변수로 바뀐다.

  ```javascript
  function sayHi() {
    if (true) {
      var phrase = "Hello";
    }
  
    alert(phrase); // Hello
  }
  
  sayHi();
  alert(phrase); // Error: phrase is not defined 
  ```

  - **재선언 허용**

  let 키워드의 경우에는 같은 이름의 변수명을 다시 선언하면 에러를 발생시키지만 var 키워드는 언제든지 재선언할 수 있으며, 이미 전에 선언했던 변수가 있다면 그 값은 무시된다.

  ``` javascript
  // let 키워드 재선언 에러 예제
  let name = 'Daniel';
  let name = 'Jake'; // SyntaxError: 'name' has already been declared
  
  // var 키워드 재선언 예제
  var color = 'red';
  var color = 'yellow';
  
  alert(color); // yellow
  ```

  - **선언 전 사용 가능** 

  var의 선언은 함수가 시작될 때 처리되며, 전역에서 선언한 변수는 스크립트가 시작될 때 처리된다.  함수 안에서 var로 선언한 변수는 선언 위치와 상관 없이 함수 본문이 시작되는 지점에서 정의된다.

  ```javascript
  function sayHi() {
    phrase = "Hello";
  
    alert(phrase);
  
    var phrase;
  }
  sayHi();
  
  /*
  동일하게 작성되는 코드
  function sayHi(){
  	var phrase;
  	
  	phrase = "Hello";
  	
  	alert(phrase);
  }
  sayHi();
  */
  
  // if문의 코드 블록으로 처리해도 호이스팅은 전혀 영향을 받지 않고 변수 선언이 이루어짐
  /*
  function sayHi() {
    phrase = "Hello";
  
    if (false) {
      var phrase;
    }
  
    alert(phrase);
  }
  sayHi();
  */
  ```

  이렇게 선언 전에 사용할 수 있는 것은 변수의 선언이 함수 최상단으로 끌어 올려져서 이루어지기 때문에 가능한 것인데, 이렇게 변수가 끌어올려지는 현상을 호이스팅(hoisting)이라고 한다.

  ```javascript
  function sayHi() {
    var phrase; // 선언은 함수 시작 시 처리됩니다.
  
    alert(phrase); // undefined
  
    phrase = "Hello"; // 할당은 실행 흐름이 해당 코드에 도달했을 때 처리됩니다.
  }
  
  sayHi();
  ```

  이 처럼 var의 선언은 함수 시작 시 처리되어 어디든 참조할 수 있지만 할당은 호이스팅되지 않기 때문에 값을 할당하기 전에 alert()함수로 호출하면 값이 없기 때문에 undefined가 출력되는 것을 알 수 있다.

---

### 2. 상수(Constant)

> 값이 변하지 않는 변수

```javascript
const pi = 3.141592;
```

이렇게 `const` 키워드로 선언한 변수를 상수라고 부르며, 상수는 재할당할 수 없는 변수라서 값을 변경하려고 하면 다음과 같이 에러가 발생한다.

```javascript
const pi = 3.141592;
pi = 1; // error, can't reassign the constant!
```

변수 값이 변경되는 것을 막으면서 공동으로 작업하는 개발자에게 이 값을 상수라는 것을 알 수 있도록 하는 목적으로 사용하는 키워드다.

* **상수 이름 표기법**

  * **대문자 상수**

    ```javascript
    const COLOR_RED = "#F00";
    const COLOR_GREEN = "#0F0";
    const COLOR_BLUE = "#00F";
    const COLOR_ORANGE = "#FF7F00";
    
    // 색상을 고르고 싶을 때 별칭을 사용할 수 있게 되었습니다.
    let color = COLOR_ORANGE;
    alert(color); // #FF7F00
    ```

    이렇게 표기하는 방식이 안의 컬러 값(#F00)보다 COLOR_RED가 사람이 봤을 때, 기억하기 쉽고 의미가 부여되어 가독성이 높아지는 장점이 있다. 대문자 상수로 작성하는 경우는 코드가 복잡해졌을 때, 기억하기 쉬운 별칭을 주고자 할 때 사용하면 된다.

    

  * **일반적인 변수(카멜 케이스)**

    ```javascript
    const pageLoadTime = /*웹 페이지 로드하는데 걸린 시간*/;
    ```

    코드가 실행되기 전 까지는 그 값을 알 수 없는 경우 일반적인 방식으로 상수를 명명한다.

