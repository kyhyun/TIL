![JavaScript](https://user-images.githubusercontent.com/77887712/129447765-a115b7d2-feb8-4ded-9d1c-9b59eef9612d.png)

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 08. 논리 연산자

자바스크립트에는 세 종류의 논리 연산자 `||`(OR), `&&`(AND), `!`(NOT)가 있으며 논리형 뿐만 아니라 다양한 타입을 받아서 처리할 수 있다. 이 세 연산자의 우선순위는 다음과 같다.

```
NOT(!) > AND(&&) > OR(||)
```

#### 1. || ( OR 논리 연산자 )

```javascript
result = a || b;

alert( true || true ); // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

두 개의 수직선 기호로 만들어 표현하며, 수학 명제논리와 같이 인수 중 하나라도 `true`이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환한다.

```javascript
f (1 || 0) { // if( true || false ) 와 동일하게 동작합니다.
  alert( 'truthy!' );
}
```

피연산자가 불린형이 아니라면 평가를 위해 불린형으로 형 변환을 수행한다.

##### 1) OR 연산자의 추가 기능 :  OR 연산의 체이닝(Chaining) 

```javascript
result = value1 || value2 || value3;
```

- 가장 왼쪽 피연산자부터 시작해 오른쪽으로 나아가며 피연산자를 평가한다.
- 각 피연산자를 불린형으로 변환한다. ( 변환된 값이 `true`이면 **연산을 멈추고 해당 피연산자의 변환 전 원래 값을 반환**한다. )
- 피연산자 모두를 평가한 경우( 모든 피연산자가 `false`로 평가 )는 마지막 피연산자를 반환한다.
- 반환된 값은 형 변환된 것이 아닌 **형 변환 전인 원래의 값을 반환**한다.



첫 번째 `true`를 찾고, 값을 찾으면 그 즉시 종료한다는 특징을 이용하여 다음과 같이 활용할 수 있다.

1. **변수 또는 표현식으로 구성된 목록에서 첫 번째 true 값 얻기**

   ```javascript
   let firstName = "";
   let lastName = "";
   let nickName = "청포도";
   
   alert( firstName || lastName || nickName || "익명"); // 청포도
   ```

   이렇게 다양한 옵션 값을 처리하는 상황에서 해당되는 값을 표현할 때, 사용할 수 있다.

2. **단락 평가**

왼쪽부터 시작해서 오른쪽으로 평가 진행되며, 중간에 true를 만나면 나머지 값은 거치지 않고 평가를 종료하는 프로세스를 가지고 있다.

```javascript
true || alert("not printed");
false || alert("printed");
```

첫 번째 줄의 경우 `true`로 인해 뒤에 있는 alert() 함수가 실행되지 않고 그대로 종료되는 한편, 두번 째 줄의 문장은 그 뒤의 내용을 수행해야하기 때문에 메시지가 출력된다. 이를 이용해서 `false` 조건일 때만 해당 명령어를 수행하려는 목적으로 자주 사용한다.

---

#### 2. && ( AND 논리 연산자 )

```javascript
result = a && b;
```

두 개의 `&`기호를 사용하여 AND 연산자를 만들 수 있으며, 두 피연산자가 모두 참일 때, `true`를 반환하며 그 외의 경우는 `false`를 반환한다.

```javascript
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

OR 연산자와 마찬가지로 AND 연산자의 피연산자도 타입에 제약이 없다.

```javascript
if (1 && 0) { // 피연산자가 숫자형이지만 논리형으로 바뀌어 true && false가 됩니다.  alert( "if 문 안에 falsy가 들어가 있으므로 alert창은 실행되지 않습니다." );}
```

##### 1. AND 연산자의 추가 기능 : AND 연산의 체이닝( Chaining )

```javascript
result = value1 && value2 && value3;
```

AND 연산자 `&&`는 아래와 같은 순서로 동작한다.

- 가장 왼쪽 피연산자부터 시작해 오른쪽으로 나아가며 피연산자를 평가한다.
- 각 피연산자는 불린형으로 변환된다. 변환 후 값이 `false`이면 평가를 멈추고 해당 피연산자의 변환 전 원래 값을 반환한다.
- 피연산자 모두 평가되는 경우( 모든 피연산자 `ture`인 경우 )는 마지막 피연산자가 반환된다.

OR 연산자의 알고리즘과 유사하며, AND 연산자의 경우 첫 번째 `false`를 반환하고, OR 연산자는 첫 번째 `true`를 반환한다는 차이점이 있다.

---



#### 3. ! ( NOT 논리 연산자 )

```javascript
result = !value;
```

느낌표`!`로 표현하며 인수를 하나만 받고, 다음 순서대로 연산을 수행한다.

1. 피연산자를 불린형(true / false)으로 변환
2. 1번에서 변환된 값의 역을 반환

```javascript
// NOT 연산자 사용 예시
alert( !ture ); // false;
alert( !0 ); // true
```

NOT을 두 개 연달아 사용(`!!`)하면, 해당 값이 가진 불린형으로 변환하기 때문에 타입을 확인할 수도 있다. 

```javascript
alert( !!'I\'m string'); // true
alert( !!null ); // false
```

내장 함수인 `Boolean()`을 이용하면 `!!`을 사용한 것 과 같은 결과를 확인할 수 있다.

```javascript
alert( Boolean( 'I\'m string' ) ); // true
alert( Boolean( null ) ); // false
```
