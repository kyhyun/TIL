![JavaScript](https://user-images.githubusercontent.com/77887712/129440754-15f66e64-f1fe-41eb-9c13-b413bb7f3500.png)

> 이 글은 모던 JavaScript 튜토리얼의 내용을 참조하였으며, 공부한 내용을 기록하고 복습하기 위한 용도로 작성하였습니다.

# Chapter 11. switch문

복수의 `if` 조건문을 처리하기 위해 나온 문법으로 `switch`가 있으며 사용방법은 다음과 같다.

```javascript
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- 변수 `x`의 값과 첫 번째 `case`문의 값 `value1`가 일치하는지 비교하고,<br> 일치하지 않으면 아래의 다음 `case`문과 비교하는 일련의 과정을 거친다. 

- 변수 `x` 의 값과 일치하는 값을 찾으면 해당 `case`문에 있는 코드가 실행되는데,<br> `break`문을 만나거나 `switch`문이 종료되면 코드의 실행을 종료한다.

- 값과 일치하는 `case`문이 없다면, `default`문의 코드를 실행한다. ( 없으면 그대로 종료 )
- `default` 문과 `break`은 생략 가능하며, 없는 경우 문제 없이 그대로 프로세스를 진행한다.

---

### switch 예시

```javascript
let a = 2 + 2;

switch (a) {
  case 3:
    alert( '비교하려는 값보다 작습니다.' );
    break;
  case 4:
    alert( '비교하려는 값과 일치합니다.' ); // a == 4이므로, 해당 case문이 실행된다.
    break;
  case 5:
    alert( '비교하려는 값보다 큽니다.' );
    break;
  default:
    alert( "어떤 값인지 파악이 되지 않습니다." );
}
```

위 예시에서는 모든 `case`문에 `break`지시자를 사용하여, 해당 값을 일치하면 switch문을 종료한다.<br>
case 문안에 `break`가 없다면 조건에 부합하는지 여부를 따지지 않고, 아래의 `case`문을 모두 실행한다.

```javascript
let a = 2 + 2;

switch (a) {
  case 3:
    alert( '비교하려는 값보다 작습니다.' );
  case 4:
    alert( '비교하려는 값과 일치합니다.' );
  case 5:
    alert( '비교하려는 값보다 큽니다.' );
  default:
    alert( "어떤 값인지 파악이 되지 않습니다." );
}
```

이 처럼 `break`가 없다면 `case` 4 이후에 있는 코드들이 전부 실행된다.

```javascript
alert( '비교하려는 값과 일치합니다.' );
alert( '비교하려는 값보다 큽니다.' );
alert( "어떤 값인지 파악이 되지 않습니다." );
```

---

- **switch/case문의 인수 표현식**

`switch`문과 `case`문은 모든 형태의 표현식을 인수로 받을 수 있다.

```javascript
let a = "1";
let b = 0;

swtich (+a) {
    case b + 1:
        alert("표현식 +a는 1, 표현식 b+1는 1이므로 코드가 실행된다.")
        break;
    default:
    	alert("이 코드는 실행되지 않음")
}
```

표현식 `+a`를 평가하면 `1`이 되므로 `switch` 안의 인수는 `1`이 되며, <br>
`b + 1`은 `0 + 1`을 평가한 값인 `1`이므로 `case`문 안에 있는 코드가 실행된다.

---

- **여러 'case' 묶기**

코드가 같은 `case`문은 묶어서 표현할 수 있다.

예시로 `case 3`과 `case 5`에서 실행하는 코드가 같은 경우 다음과 같이 처리한다.

```javascript
let a = 3;

switch (a) {
  case 4:
    alert('계산이 맞습니다!');
    break;

  case 3: // (*) 두 case문을 묶음
  case 5:
    alert('계산이 틀립니다!');
    alert("수학 수업을 다시 들어보는걸 권유 드립니다.");
    break;

  default:
    alert('계산 결과가 이상하네요.');
}
```

결과는 `case 3`과 `case 5`가 동일한 메시지를 보여준다. 

`case 3`에서 `break`문이 없는 경우 조건을 확인하지 않고 `break`를 만나거나 종료될 때까지 <br>
다음 `case`문 안에 있는 코드들을 실행하기 때문에 `case 5`의 조건을 확인하지 않고 코드를 실행하고,<br>
그 아래의 `break`를 만남으로써 `default`까지 실행하지 않고 프로세스를 종료한다.
