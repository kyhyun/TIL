# 1. 리액트의 이벤트 시스템

### 1. 이벤트 사용 시, 주의 사항

**1) 이벤트 이름은 카멜 표기법으로 작성한다**

예를 들어 HTML의 `onclick`은 리액트에서 `onClick` 으로 작성한다.

**2) 이벤트에 실행할 함수 형태의 값을 전달한다.**

HTML에서 이벤트 설정할 때는 큰따옴표 안에 실행할 코드를 넣지만, 리액트에서는 함수 형태의 객체를 전달한다.

**3) DOM 요소에만 이벤트를 설정할 수 있다.**

`div`, `button`, `input`, `form`, `span` 등의 기존에 있는 DOM 요소에는 이벤트를 설정할 수 있지만, 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다.

- 예를 들어 다음과 같이 `MyComponent`에 `onClick` 값을 설정한다면 `MyComponent`를 클릭할 때, `doSomething` 함수를 실행하는 것이 아니라, 그냥 이름이 `onClick`인 `props`를 `MyComponent`에 전달해주는 것이다.

```jsx
<MyComponent onClick={dosomething} />
```

하지만 전달 받은 `props`를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있다.

```jsx
<div onClick={this.props.onClick}> {/* ( ... ) */} </div>
```

### 2. 이벤트 종류

리액트에서 지원하는 이벤트의 종류는 다음과 같다.

| Clipboard   | Touch      |
| ----------- | ---------- |
| Composition | UI         |
| Keyboard    | Wheel      |
| Focus       | Media      |
| Form        | Image      |
| Mouse       | Animation  |
| Selection   | Transition |

---

# 2. 클래스형 컴포넌트로 구현해보기

## 목차

- **예제 실습 단계**
  1. 컴포넌트 생성 및 불러오기
  2. `onChange` 이벤트 핸들링
  3. 임의 메서드 만들기
  4. input 여러 개 다루기
  5. `onKeyPress` 이벤트 핸들링

---

### 1. 컴포넌트 생성 및 불러오기

`src` 디렉터리 내부에 `EventPratice.js` 파일 생성한 후 컴포넌트 초기 코드 작성

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
      </div>
    );
  }
}

export default EventPractice;
```

`App` 컴포넌트에 `EventPractice` 컴포넌트 렌더링 처리

```jsx
import React from "react";
import EventPractice from "./EventPractice";

const App = () => {
  return <EventPractice />;
};

export default App;
```

---

### 2. onChange 이벤트 핸들링

**1) `onChange` 이벤트 설정**

`EventPractice` 컴포넌트에 `input` 요소를 렌더링하는 코드와 해당 요소에 `onChange` 이벤트를
설정하는 코드를 작성

```jsx
class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type='text'
          name='message'
          placeholder='아무거나 입력해보세요.'
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    );
  }
}
```

여기에서 기록되는 `e` 파라미터는 웹 브라우저의 네이티브 이벤트를 감싸는 객체로 이것을 통해 조작할 때, `SyntheticEvent` 혹은 `NativeEvent`를 사용할 수 있다. `SyntheticEvent`는 이벤트가 종료되는 시점에 초기화되므로 정보를 참조할 수 없기 때문에 비동기적으로 이벤트 객체에 접근하기 위해서는 `persist` 함수를 사용해야 한다.

---

**2) `state`에 input 값 담기**

`constructor` 에서 `state` 초기 값을 설정하고, 이벤트 핸들링 함수 내부에서 `this.setState`
메서드를 호출하여 `state`를 업데이트 한다.

```jsx
class EventPractice extends Component {
  state = {
    message: "",
  };
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type='text'
          name='message'
          placeholder='아무거나 입력해보세요.'
          value={this.state.message}
          onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}
        />
      </div>
    );
  }
}
```

그리고 `input`의 `value` 값을 `state`의 값으로 설정한다.

---

**3) 버튼을 누를 때, comment 값을 공백으로 설정**

input 요소 코드 아래쪽에 `button` 요소를 추가하고, 클릭 이벤트가 발생하면 현재 Comment 값을 메시지 박스로 띄운 후 Comment 값을 공백으로 초기화 한다.

```jsx
class EventPractice extends Component {
  state = {
    message: '',
  };
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
	        (...)
        />
        <button
          onClick={() => {
            alert(this.state.message);
            this.setState({
              message: '',
            });
          }}
        >
          확인
        </button>
      </div>
    );
  }
}
```

---

### 3. 임의 메서드 만들기

함수를 미리 준비해서 전달하는 방법으로 성능 상으로 차이는 없지만, 가독성이 훨씬 높다. 상황에 따라서는 렌더링 할 메서드 내부에서 함수를 만드는 컴포넌트 매핑의 방식이 좋을 때도 있기 때문에 그때 상황에 따라 적절하게 사용하는 것이 중요하다.

**1) 기본 방식**

- 함수가 호출 될 때 `this`는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 `this`의 관계가 끊어져 버린다.
- 이 때문에 임의 메서드가 이벤트로 등록되어도 `this`를 컴포넌트 자신으로 제대로 가리키게 하기 위해서 메서드를 `this`와 바인딩(binding)하는 작업이 필요하다.
- 이때 만약 바인딩 하지 않는다면 `this`는 `undefined`를 가리킨다.

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleClick() {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type='text'
          name='message'
          placeholder='아무거나 입력해보세요.'
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```

현재 `constructor` 함수에서 함수를 바인딩하는 작업이 이루어지고 있기 때문에 정상적으로 `this`와 메서드의 관계가 끊어지지 않고 값을 잘 전달할 수 있다.

```
💡 메서드 이름은 어떻게 정하는가 ?
- 메서드 이름은 사용자 임의로 정하면 되지만, 규칙을 정하고 작성하면 가독성에 좋다.
ex) handle_______ 와 같은 형식으로 작성할 수 있다.
```

**2) Property Initializer Syntax를 사용한 메서드 작성**

메서드 바인딩은 생성자 메서드에서 하는 것이 정석이지만 새 메서드를 만들 때마다 `constructor`도 수정해야 하기 때문에 보다 더 간단하게 할 수 있는 방법이 있다. 바로 `Babel`의 `transform-class-properties` 문법을 사용해서 화살표 함수 형태로 메서드를 정의하는 것이다.

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
  };

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type='text'
          name='message'
          placeholder='아무거나 입력해보세요.'
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```

이렇게 하면 `this`가 바인더로 지정해주지 않더라도 이벤트가 활성화 될 때, 메소드에 담긴 값이 끊어지지 않기 때문에 보다 간결한 코드로 이벤트를 등록할 수 있다.

---

### 4. input 여러 개 다루기

많은 input을 다룰 때는, 메서드를 여러 개 만들어서 해결할 수도 있지만, 더 쉽게 처리할 수 있는 방법으로는 `event` 객체를 활용해서 `e.target.name` 값을 이용한 방법이 있다.

```jsx
class EventPractice extends Component {
  state = {
    username: "",
    message: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    alert(`${this.state.username} : ${this.state.message}`);
    this.setState({
      username: "",
      message: "",
    });
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type='text'
          name='username'
          placeholder='사용자명'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='message'
          placeholder='아무거나 입력해보세요'
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}
```

`state`에 `username` 값을 추가하고, `render`함수에서 `name` 값이 `username`인 `input`을 렌더링 한다. 그리고 `handleChange` 함수의 `key` 값을 `event` 객체를 활용한 형태로 변경한다.

```jsx
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};
```

전체 코드에서 가장 핵심은 이 `handleChange` 함수의 코드 부분이다.

```jsx
const name = "variantKey";
const object = {
  [name]: "value",
};
```

객체 안에서 `key`를 `[]`로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 `key` 값으로 사용된다.

```jsx
{ 'variantKey' : 'value' }
```

이와 같은 코드가 있다고 할 때, 결과는 다음과 같이 출력 된다.

---

### 5. onKeyPress 이벤트 핸들링

키를 눌렀을 때 발생하는 `KeyPress` 이벤트를 처리하는 방법으로 우선 `message` input 에서 Enter 키를 눌렀을 때, `handleClick` 메서드를 호출하도록 코드를 작성한다.

```jsx
class EventPractice extends Component {
  state = {...};

  handleChange = (e) => {...};

  handleClick = () => {...};

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          (...)
        />
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해보세요"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}
```

---

# 3. 함수형 컴포넌트로 구현해보기

```jsx
import React, { useState } from "react";

const EventPractice2 = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeMessage = (e) => setMessage(e.target.value);
  const onClick = () => {
    alert(`${username} : ${message}`);
    setUsername("");
    setMessage("");
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type='text'
        name='username'
        placeholder='사용자명'
        value={username}
        onChange={onChangeUsername}
      />
      <input
        type='text'
        name='message'
        placeholder='아무거나 입력해보세요.'
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice2;
```

위 코드는 `e.target.name` 을 활용하지 않은 `onChange` 관련 함수 두 개로 따로 만들어서
input이 적은 경우 처리할 수 있는 방식으로 처리한 방법이다.

```jsx
import React, { useState } from "react";

const EventPractice2 = () => {
  const [form, setForm] = useState({
    username: "",
    message: "",
  });
  const { username, message } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form, // 기존의 form 내용을 이 자리에 복사한 뒤
      [e.target.name]: e.target.value, // 원하는(추가하는) 값을 덮어 씌우기
    };
    setForm(nextForm);
  };
  const onClick = () => {
    alert(`${username} : ${message}`);
    setForm({
      username: "",
      message: "",
    });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type='text'
        name='username'
        placeholder='사용자명'
        value={username}
        onChange={onChange}
      />
      <input
        type='text'
        name='message'
        placeholder='아무거나 입력해보세요.'
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice2;
```

input이 많은 경우 `e.target.name`을 활용하는 것이 좋으며 아래의 코드는 `useState`를 통해 사용하는 상태에 문자열이 아닌 객체로 구현한 코드다.
