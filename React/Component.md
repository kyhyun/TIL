# 1. 클래스와 함수형 컴포넌트

### 1) 클래스형 컴포넌트

- `render`함수가 있어야 하고, 그 안에서 보여주어야 할 JSX 문법을 반환해야 한다.
- 장점
  - state 및 라이프 사이클 API 사용 가능
  - 임의 메서드를 정의할 수 있음

```jsx
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    const name = "react";
    return <div className='react'>{name}</div>;
  }
}

export default App;
```

### 2) 함수형 컴포넌트

- `App` 함수 안에서 보여주어야 할 화면을 JSX 문법으로 반환한다.
- 장점
  - 클래스형 컴포넌트보다 문법이 복잡하지 않아 선언하기 편하다.
  - 메모리 자원도 클래스형 컴포넌트보다 덜 사용한다.
  - 리액트 v.16.8 업데이트 이후 `Hooks` 기능 도입으로 state와 라이프 사이클 API 사용 가능

```jsx
import React from "react";
import "./App.css";
function App() {
  const name = "react";
  return <div className='react'>{name}</div>;
}
export default App;
```

---

# 2. 모듈 내보내기 및 불러오기

### 1) 모듈 내보내기 ( export )

- 다른 파일에서 이 파일을 import 할 때, 선언한 컴포넌트를 불러오도록 설정한다.
- 컴포넌트의 맨 아래에 선언한다.

**< `MyComponent.js` >**

```jsx
export default MyComponent;
```

### 2) 모듈 불러오기 ( import )

- 컴포넌트의 상단에 선언하며, 또 다른 컴포넌트 간에 복수로 불러올 수 있다.
- 불러오게 되면 해당 파일을 내부에서 컴포넌트를 불러올 수 있다.

```jsx
import React from "react";
import MyComponent from "./MyComponen";

const App = () => <MyComponent />;

export default App;
```

---

# 3. props

- Properties의 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소
- 이 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정해야 한다.
- 자기 자신은 직접 수정할 수 없으며, 읽기 전용(read-only)으로서 사용한다.

### 1) JSX 내부에 props 렌더링

```jsx
const MyComponent = (props) => {
  return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
};
```

### 2) 컴포넌트를 사용할 때, props 값 지정하기

- 부모 컴포넌트 `App.js`에서 컴포넌트의 props 값을 `name`을 통해서 전달할 수 있다.

```jsx
const App = () => {
  return <MyComponent name='React' />;
};
```

### 3) props 기본 값 설정 : `defaultProps`

- props 값을 따로 지정하지 않았을 때 보여줄 기본 값을 설정하는 방법

**< `MyComponent.js` >**

```jsx
const MyComponent = (props) => (
  <div>안녕하세요, 제 이름은 {props.name}입니다.</div>
);
MyComponent.defaultProps = {
  name: "기본 이름",
};
```

### 4) 태그 사이의 내용을 보여주는 props : `children`

- 컴포넌트 태그 사이의 내용을 보여주는 props 속성
- 부모 컴포넌트에서 사용하는 컴포넌트 태그 사이의 내용을 자신의 컴포넌트에서 가져와 사용

**< `App.js` >**

```jsx
const App = () => <MyComponent>리액트</MyComponent>;
```

**< `MyComponent.js` >**

```jsx
const MyComponent = (props) => {
  return (
    <div>
      안녕하세요, 제 이름은 {props.name} 입니다. <br />
      childeren 값은 {props.children}
      입니다.
    </div>
  );
};
```

**< 결과 >**

![image](https://user-images.githubusercontent.com/77887712/155874405-d301ec4d-de28-4345-b644-0d9aa91f434b.png)

---

### 5) 비구조화 할당 문법을 통해 props 내부 값 추출하기

- ES6의 비구조화 할당이라는 구조 분해 문법을 이용해 더 짧은 코드로 작성할 수 있다.

```jsx
const MyComponent = (props) => {
  const { name, children } = props;
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children} 입니다.
    </div>
  );
};
```

- 함수의 파라미터에도 사용할 수 있기 때문에 다음과 같이 사용할 수도 있다.

```jsx
const MyComponent = ({ name, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children} 입니다.
    </div>
  );
};
```

---

### 6) propTypes를 통한 props 검증

- 컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때, 사용한다.
- 코드 상단에 `import` 구문으로 `PropTypes`를 불러와야 한다.

```jsx
import PropTypes from "prop-types";
```

- 코드 하단에 `컴포넌트명.propTypes` 를 통해 props의 타입을 지정한다.

```jsx
MyComponent.propTypes = {
  name: PropTypes.string,
};
```

- 이렇게 되면 해당 `name`의 값은 무조건 문자열(string) 형태로 전달되어야 하며, 그 외의 값을 전달하면 Console에서 경고 메시지를 출력한다.

```jsx
const App = () => <MyComponent name={3}>리액트</MyComponent>;
```

![image](https://user-images.githubusercontent.com/77887712/155874443-931327e5-99df-4bc1-8073-69d2b85914c7.png)

현재 `name`에 숫자 ‘3’ 이라는 값이 들어가서, 값이 잘못 됐음을 경고로 보여주고 있다.

### ✅ **필수 propTypes 설정 : `isRequired`**

- prop의 Type을 지정하지 않았을 때, 경고 메시지를 띄울 수 있도록 하는 설정
- `PropTypes.type.isRequired` 방식으로 지정한다.

**< `MyComponent.js` >**

```jsx
const MyComponent = ({ name, favoriteNumber, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children} 입니다.
      <br />
      제가 좋아하는 숫자는 {favoriteNumber} 입니다.
    </div>
  );
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired,
};
```

이후 `favoriteNumber`에 값을 지정해주지 않으면 아래와 같은 경고를 보여준다.

![image](https://user-images.githubusercontent.com/77887712/155874468-42bca004-ddea-42bc-84c2-95caf244e00d.png)

**< `App.js` >**

```jsx
const App = () => (
  <MyComponent name='React' favoriteNumber={1}>
    리액트
  </MyComponent>
);
```

경고에 대한 에러에 대해 `favoriteNumber`값을 잘 전달하면 경고 없이 잘 동작한다.

- 더 많은 `PropTypes` 종류 ( 펼쳐보기 )
  - array : 배열
  - arrayOf(다른 PropType) : 특정 PropType으로 이루어진 배열 ( ex. 숫자로 이루어진 배열 등 )
  - bool : true 혹은 false 값
  - func : 함수
  - number : 숫자
  - object : 객체
  - string : 문자열
  - symbol : ES6의 symbol
  - node : 렌더링할 수 있는 모든 것 ( 숫자, 문자열, 혹은 JSX 코드 )
  - instanceOf(클래스) : 특정 클래스의 인스턴스 ( ex. instanceOf(MyClass) )
  - oneOf([’dog’, ‘cat’]) : 주어진 배열 요소 중 값 하나
  - oneOfType([React.PropTypes.string, PropTypes.number]) : 주어진 배열 안의 종류 중 하나
  - objectOf(React.PropTypes.number) : 객체의 모든 키 값이 인자로 주어진 PropType인 객체
  - shape({ name : PropTypes.string, num : PropTypes.number }) : 주어진 스키마를 가진 객체
  - any : 아무 종류
  더 자세한 정보는 [http://github.com/facebook/prop-types](https://github.com/facebook/prop-types) 에서 확인할 수 있다.

<aside>
💡 `defaultProps` 와 `propType` 는 꼭 사용해야 할까 ?
- 이 두 가지 설정은 컴포넌트의 필수 사항은 아니라서 꼭 사용할 필요는 없지만
큰 규모의 프로젝트를 통해 다른 개발자들과 협업하게 되면 해당 컴포넌트에 어떤
props가 필요한지 쉽게 알 수 있어 개발 능률을 높여줄 수 있다.

</aside>

---

### 7) 클래스형 컴포넌트에서 props 사용하기

- `render`함수에서 `this.props` 로 조회할 수 있으며, 나머지는 똑같은 방식으로 설정할 수 있다.

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent2 extends Component {
  render() {
    const { name, favoriteNumber, children } = this.props;
    return (
      <div>
        안녕하세요, 제이름은 {name} 입니다.
        <br />
        childeren 값은 {children} 입니다.
        <br />
        제가 좋아하는 숫자는 {favoriteNumber} 입니다.
      </div>
    );
  }
}

MyComponent2.defaultProps = {
  name: "기본 이름",
};

MyComponent2.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired,
};

export default MyComponent2;
```

- 클래스형은 `static` 을 이용하면 `defaultProps`와 `propTypes`를 클래스 안에서 지정할 수 있다.

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent2 extends Component {
  static defaultProps = {
    name: '기본 이름',
  };

  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };

  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (...);
  }
}

export default MyComponent2;
```

---

# 4. state

- 컴포넌트 내부에서 바뀔 수 있는 값
- state의 종류는 클래스형 컴포넌트의 `state` 와 함수형 컴포넌트의
  `useState`라는 함수를 통해서 사용하는 `state` 가 있다.

### 1) 클래스형 컴포넌트의 state 사용하기

- `Counter.js` 파일을 `src` 디렉터리에 생성
- 컴포넌트 state를 설정할 때는 다음과 같이 `constructor` 메서드를 작성하여 설정한다.

```jsx
constructor(props) {
	super(props);
	//state의 초기 값 설정하기
	this.state = {
		number : 0,
	};
}
```

이 생성자 메서드는 클래스형 컴포넌트에서 `constructor` 형식으로 작성하며, 반드시 `super(props)` 를 호출해야 한다. 이 함수에 의해 현재 클래스형 컴포넌트가 상속 받고 있는 React의 `Component`
클래스가 지난 생성자 함수를 호출할 수 있다. `this.state` 값에 초기 값을 설정하며, 이 `state`는
객체 형식으로 전달한다.

```jsx
render () {
	const { number } = this.state; // state를 조회할 때는 this.state로 조회
	return (
	<div>
		<h1>{number}</h1>
		<button
			onClick={()=> {
				// this.setState를 사용하여 새로운 값을 넣을 수 있다.
				this.setState({ number: number + 1});
			}}
		>
			+1
			</button>
		</div>
	);
}
```

`render()`함수에서는 현재 state를 조회할 때는 `this.state`를 통해 조회하며, `button` 안에 `onClick`이라는 값을 `props`로 넣어주면, 이 버튼이 클릭 됨에 따라 호출 시킬 함수를
설정할 수 있다.

이벤트로 설정할 함수는 `this`의 값이 바뀌지 않도록 화살표 함수 문법을 사용해서 넣어주며,
함수 내부에서는 `this.setState`라는 함수를 이용해서 내부의 `state`값을 바꿀 수 있다.

**< `App.js` >**

```jsx
import React from "react";
import Counter from "./Counter";

const App = () => {
  return <Counter />;
};

export default App;
```

`Counter` 컴포넌트를 `App`에서 불러와 렌더링 한다.

**a. state 객체 안에 여러 값이 있을 때**

```jsx
class Counter extends Component {
  constructor(props) {
    super(props);
    // state의 초기값 설정하기
    this.state = {
      number: 0,
      fixedNumber: 0,
    };
  }
  render() {
    const { number, fixedNumber } = this.state; // state를 조회할 때, this.state로 조회
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : {fixedNumber}</h2>
        <button
          // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정
          onClick={() => {
            // this.setState를 사용해서 state에 새로운 값을 넣을 수 있다.
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}
```

`state` 안에 `fixedNumber`라는 또 다른 값을 추가했으며, 버튼이 클릭될 때, `fixedNumber` 값은 그대로 두고 `number` 값만 바꾼다. 이때 `this.setState` 함수를 통해 인자로 전달되는 인자만 값이 바뀌기 때문에 `setState` 함수 내부에 없는 인자들은 업데이트 요소에서 제외된다.

**b. state를 constructor에서 꺼내기**

```jsx
class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0,
  };
  render() {
    const { number, fixedNumber } = this.state; // state를 조회할 때, this.state로 조회
    return (...);
  }
}
```

`state`의 초기 값 설정의 또 다른 방법으로 `constructor` 메서드를 선언하지 않고, `state` 초기 값을 설정할 수 있다.

**c. this.setState에 객체 대신 함수 인자 전달하기**

```jsx
onClick={() => {
  // this.setState를 사용해서 state에 새로운 값을 넣을 수 있다.
  this.setState({ number: number + 1 });
  this.setState({ number: this.state.number + 1 });
}}
```

`this` `this.setState`를 사용한다고 해서 `state`의 값이 바로 바뀌지 않는다. 이 경우에는 `this.setState` 안에 객체가 아닌 함수를 인자로 넣어주는 방식을 이용하면 된다.

```jsx
this.setState((prevState, props) => {
  return {
    // 업데이트하고 싶은 내용
  };
});
```

여기서 첫 번째 인자 `prevState` 는 기존 상태이고, 두 번째 인자 `proops` 는 현재 지니고 있는 `props`

를 가리킨다. 업데이트 과정에 현재 지닌 값이 필요 없는 경우 `props` 인자는 생략할 수 있다.

```jsx
<button
  // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정
  onClick={() => {
    // this.setState를 사용해서 state에 새로운 값을 넣을 수 있다.
    this.setState((prevState) => {
      return { number: prevState.number + 1 };
    });

    this.setState((prevState) => ({ number: prevState.number + 1 }));
  }}
>
  +1
</button>
```

첫 번째 `this.setState`는 화살표 함수에서 `return{}` 코드 블록을 생략하지 않은 문법이고, 두 번째 `this.setState`는 바로 객체를 반환하도록 하기 때문에 `prevState => ({})` 와 같은 형태로 코드를 이룬다. 결과는 이벤트에서 이전의 값을 1 증가 시킨 상태에서 1을 다시 증가 시키기 때문에 클릭 이벤트가 발생할 때마다 숫자가 2 씩 증가한다.

**d. this.setSate가 끝난 후 특정 작업 실행하기**

값을 업데이트하고 난 후에 특정 작업을 하고 싶은 경우에는`setState`의 두 번째 파라미터로
콜백 함수를 등록하여 작업을 처리할 수 있다.

```jsx
<button
  // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정
  onClick={() => {
    // this.setState를 사용해서 state에 새로운 값을 넣을 수 있다.
    this.setState(
      (prevState) => {
        return { number: prevState.number + 1 };
      },
      () => {
        console.log("방금 setState가 호출되었습니다.");
        console.log(this.state);
      }
    );
  }}
>
  +1
</button>
```

---

### 2) 함수형 컴포넌트의 useState 사용하기

1. 배열 비구조화 할당

배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해주는 문법으로 다음과 같은 코드가 있다고 할 때,

```jsx
const array = [1, 2];
const one = array[0];
const two = arra[1];
```

배열의 비구조화 할당을 이용하면 다음과 같이 표현할 수 있다.

```jsx
const array = [1, 2];
const [one, two] = array;
```

b. useState 사용하기

`src` 디렉터리에 `Say.js`라는 파일을 생성하고 다음과 같은 코드로 작성할 수 있다.

```jsx
import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState("");
  const onClickEnter = () => setMessage("안녕하세요.");
  const onClickLeave = () => setMessage("안녕히 가세요!");

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </div>
  );
};
export default Say;
```

`useState` 함수의 인자에는 상태의 초기 값을 넣어준다. 클래스형 컴포넌트와 달리 반드시 객체 형태의 값이 아닌 숫자, 문자열, 객체, 배열 등 어떠한 값이 와도 상관 없다.

함수를 호출하면 배열이 반환되며, 배열의 첫 번째 원소에는 현재 상태(getter)가 들어오고, 두 번째 원소에는 바뀔 상태(setter)가 들어와 상태를 바꾸어준다. 이것은 비구조화 할당을 통해 이름을 자유롭게 지정해 줄 수 있다.

c. 한 컴포넌트에서 useState 여러 번 사용하기

`useState`는 한 컴포넌트에서 여러 번 사용해도 상관 없으며, 다른 상태를 받아서 관리할 수 있다.

```jsx
const Say = () => {
  const [message, setMessage] = useState("");
  const onClickEnter = () => setMessage("안녕하세요.");
  const onClickLeave = () => setMessage("안녕히 가세요!");

  const [color, setColor] = useState("black");
  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
      <button style={{ color: "red" }} onClick={() => setColor("red")}>
        빨간색
      </button>
      <button style={{ color: "green" }} onClick={() => setColor("green")}>
        초록색
      </button>
      <button style={{ color: "blue" }} onClick={() => setColor("blue")}>
        파랑색
      </button>
    </div>
  );
};
```

---

### 3) state를 사용할 때 주의 사항

클래스형, 함수형 모두 공통적으로 주의해야 할 사항으로는 `state` 값을 바꾸어야 할 때는
`setState`와 `useState`를 통해 전달 받는 `Setter` 함수를 사용해야 한다.

- 잘못된 코드의 예)

```jsx
// 클래스형 컴포넌트에서 ...
this.state.number = this.state.number + 1;
this.state.array = this.array.push(2);
this.state.object.value = 5;

// 함수형 컴포넌트에서 ...
const [object, setObject] = useState({ a: 1, b: 1 });
object.b = 2;
```

배열이나 객체를 업데이트해야할 경우, 배열이나 객체 사본을 만들고 그 사본에 값을 업데이트한 후 그 사본의 상태를 `setState` 혹은 `useState`의 `Setter` 함수를 통해 업데이트를 한다.

- 사본 만들어서 업데이트하는 예시

```jsx
// 객체 업데이트하기
const object = { a : 1, b ; 2, c : 3 };
const nextObject = { ... object, b : 2 }; // 사본을 만들어 b 값만 덮어 쓰기

// 배열 업데이트하기
const array = [
	{ id : 1, value : true},
	{ id : 2, value : true},
	{ id : 3 , vlaue : false}
];
let nextArray = array.concat({ id : 4}) // 새 항목 추가
nextArray.filter(item => item.id !==2 ); // id가 2인 항목 제거
nextArray.map(item => (item.id === 1 ? {...item, value : false } : item));
// id가 1인 항목의 value를 false로 설정
```

### 4) 정리

- `props`는 부모 컴포넌트가 설정하고, `state`는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트 할 수 있다.
- `props`의 값을 바꾸기 위해서는
  - 부모 컴포넌트의 `state`를 자식 컴포넌트의 `props`로 전달
  - 자식 컴포넌트에서 이벤트가 발생할 때 부모 컴포넌트의 메소드를 호출하면 `props`도 유동적으로 사용할 수 있다.
