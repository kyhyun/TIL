> 이 글은 “리액트를 다루는 기술” 를 보고, 공부한 내용을 복습 및 기록하기 위해 작성됐습니다.

# ref 란

- Reference 의 약어로 HTML에서 `id`를 사용해서 `DOM`에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법으로 특정 DOM을 식별할 때 도움을 준다.

```
💡 **리액트 컴포넌트 안에서는 `id`를 사용하면 안될까 ?**

- 리액트 컴포넌트 안에서도 `id`를 사용할 수 있지만 JSX 안에서 DOM에 `id`를 달면 해당 DOM을 렌더링할 때
그대로 전달된다. 하지만 특수한 경우가 아니면 사용에 권장되지 않는다.

- 왜냐하면 컴포넌트는 상황에 따라 재사용 될 수 있고, HTML에서 DOM의 `id`는 유일(Unique)해야 하는데,
이런 상황에서는 중복을 가진 `id`를 가진 DOM이 발생하며, 이것은 잘못된 사용으로 용례에 어긋난다.

- 반면에 `ref`는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 이러한 문제가 발생되지 않는다.

- 만약 다른 라이브러리 혹은 프레임워크에 의해 어쩔 수 없이 `id`를 사용하게 되는 경우 중복을 방지하기 위해
`id` 뒷 부분에 추가 텍스트를 붙여 중복 `id` 발생을 방지해야 한다.

```

---

# 1. ref은 어떤 상황에 사용해야 하는가 ?

- **DOM을 꼭 직접 건드려야 할 때 사용하며, 주로 아래와 같은 상황에서 사용한다.**
  - 특정 input에 포커스 주기 (예, 유효성 검사)
  - 스크롤 박스 조작하기
  - Canvas 요소에 그림 그리기

---

### 실습

> 유효성 검증 컴포넌트를 만들고, input에 `ref`를 달아서 버튼 클릭에 따라 포커스 주기

### 1) 예제 컴포넌트 생성

- 함수형 컴포넌트는 추후 `Hooks`를 통해 `ref` 사용 방법을 배우므로, 클래스형으로 구현

`src` 디렉터리 안에 `ValidationSample.css`와 `ValidationSample.js` 파일을 만든다.

**< `ValidationSample.css` >**

```jsx
.success {
  background-color: lightgreen;
}

.failure {
  background-color: lightcoral;
}
```

**< `ValidationSample.js` >**

```jsx
import React, { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
  state = {
    password: "",
    clicked: false,
    validation: false,
  };

  handleChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validation: this.state.password === "0000",
    });
  };
  render() {
    return (
      <div>
        <input
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validation
                ? "success"
                : "failure"
              : ""
          }
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;
```

- input에서는 `onChange` 이벤트가 발생하면 `handleChange`를 호출하여 `state`의 `password` 값을 업데이트한다.
- button에서 `onClick` 이벤트가 발생하면 `handleButtonClick`을 호출하여 `clicked` 값을 참으로 변경하고, `validated` 값을 검증 결과로 설정한다.
- input className 값을 버튼을 누르기 전에는 비어 있는 문자열을 전달하다가, 버튼을 누른 후에는 검증 결과에 따라 `success` 값 혹은 `failure` 값을 설정하며, 이 값에 따라 `input` 색상이 초록색 또는 빨간색으로 나타난다.

### 2) App 컴포넌트에서 예제 컴포넌트 렌더링

**< `App.js` >**

- 추후 `App` 컴포넌트에 `ref`를 사용하므로 클래스형 컴포넌트로 작성한다.

```jsx
import React, { Component } from "react";
import ValidationSample from "./ValidationSample";
class App extends Component {
  render() {
    return <ValidationSample />;
  }
}

export default App;
```

---

# 2. ref 사용하기

> `ref`를 사용하는 방법에는 크게 두 가지로 나누어진다.

- **`콜백(callback)` 함수를 통한 `ref` 설정**
  - `ref`를 달고자 하는 요소에 `ref` 라는 콜백 함수를 `props`로 전달해서 설정한다.
  - 이 콜백 함수는 `ref` 값을 파라미터로 전달 받고 함수 내부에서 파라미터로 받은 `ref` 를 컴포넌트의 멤버 변수로 설정해준다.
  ```jsx
  // 콜백 함수 사용 예시
  <input
    ref={(ref) => {
      this.input = ref;
    }}
  />
  ```
  앞으로 `this.input`은 input 요소의 DOM을 가리키게 되며, `ref`의 이름은 사용자가 자유롭게 지정할 수 있다. ( ex. `this.suerman = ref`)
- **`createRef`를 통한 `ref` 설정**
  - 리액트에 내장되어 있는 `createRef`라는 함수를 사용해서 설정할 수 있다.
  - 이 기능은 리액트 v.16.3부터 도입되어 이전 버전에는 작동하지 않는다.
    ```jsx
    // createRef 사용 예시
    import React, { Component } from "react";

    class RefSample extends Componene {
      input = React.createRef();

      handleFocus = () => {
        this.input.current.focus();
      };

      render() {
        return (
          <div>
            <input ref={this.input} />
          </div>
        );
      }
    }

    export default RefSample;
    ```
  - `createRef` 를 사용하여 `ref`를 만들려면 우선 컴포넌트 내부에서 멤버 변수로`React.createRef()`를 `input`에 담아 주고, 해당 멤버 변수를 `ref`를 달고자 하는 요소에 `ref props`로 넣어 주면 `ref`가 설정된다.
  - `ref` 를 설정한 DOM에 접근하려면 `this.input.current`를 조회하면 된다.

---

# 3. 컴포넌트에 ref 달기

- 이 방법은 주로 해당 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓴다.
- DOM에 ref를 다는 방법과 똑같이 적용된다.

```jsx
<MyComponent
  ref={(ref) => {
    this.myComponent = ref;
  }}
/>
```

이를 통해 `MyComponent` 내부의 메서드 및 멤버 변수에도 접근할 수 있게 된다.

( ex. `myComponent.handleClick`, `myComponent.input` 등 )

---

### 실습

> 스크롤 박스가 있는 컴포넌트를 만들고, 아래로 내리는 작업을 부모 컴포넌트에서 진행하기

### 1) 컴포넌트 초기 설정

```jsx
import React, { Component } from "react";

class ScrollBox extends Component {
  render() {
    const style = {
      border: "1px solid black",
      height: "300px",
      width: "300px",
      overflow: "auto",
      position: "relative",
    };

    const innerStyle = {
      width: "100%",
      height: "650px",
      background: "linear-gradient(white, black)",
    };

    return (
      <div
        style={style}
        ref={(ref) => {
          this.box = ref;
        }}
      >
        <div style={innerStyle}></div>
      </div>
    );
  }
}
export default ScrollBox;
```

`ScrollBox` 컴포넌트 파일을 생성하고 JSX의 인라인 스타일링 문법으로 스크롤 박스를 정의한다.

그리고 최상위 DOM에 `ref`를 달아준다.

### 2) App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링

```jsx
import React, { Component } from "react";
import ScrollBox from "./ScrollBox";

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox />
      </div>
    );
  }
}

export default App;
```

### 3) 컴포넌트 메서드 생성

- 자바스크립트로 스크롤 바를 내릴 때는 DOM 노드가 가진 다음 값들을 이용한다.
  - `scrollTop` : 스크롤 세로 바 위치 ( 0 ~ 350 )
  - `scrollHeight` : 스크롤이 있는 박스 안의 div 높이 ( 650 )
  - `clientHeight` : 스크롤이 있는 박스의 높이 ( 300 )
  스크롤 바를 맨 아래쪽으로 내리려면 `scrollHeight` 에서 `clientHeight` 높이를 뺀다.

```jsx
import React, { Component } from 'react';

class ScrollBox extends Component {
  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    /* 앞 코드에는 비구조화 할당 문법을 사용했습니다.
      다음 코드와 같은 의미다.
      const scrollHeight = this.box.scrollHeight;
      const clientHeight = this.box.clientHeight;
    */
    this.box.scrollTop = scrollHeight - clientHeight;
  };

  render() {...}
}
export default ScrollBox;
```

이렇게 만들어진 `scrollBottom` 메서드는 부모 컴포넌트인 `App` 컴포넌트에서 `ScrollBox`에 `ref`를 달면 사용할 수 있다.

### 4) 컴포넌트에 ref 달고 내부 메서드 사용

```jsx
import React, { Component } from "react";
import ScrollBox from "./ScrollBox";

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox
          ref={(ref) => {
            this.scrollBox = ref;
          }}
        />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;
```

- 컴포넌트가 처음 렌더링 될 때는 `this.scrollBox` 값이 `undefined`이므로 `this.scrollBox.scrollBottom` 값을 읽어 오는 과정에서 오류가 발생한다.
- 따라서 화살표 함수 문법을 사용해서 아예 새로운 함수를 만들고 그 내부에서 `this.scrollBox.scrollBottom`메서드를 실행하도록 한다.
- 그러면 버튼을 누를 때, 이미 한 번 렌더링을 하고 난 시점의 값을 읽어 와서 실행하면
  오류가 발생하지 않는다.

---

# 4. 정리

- 컴포넌트 내부에서 DOM에 직접 접근할 때는 `ref`를 사용한다.
- 반드시 `ref`를 사용하지 않고도 원하는 기능을 구현할 수 있는지 고려한 후 사용한다.
- 서로 다른 컴포넌트끼리 데이터를 교류할 때 사용하는 것은 용례에 어긋난다.
- 컴포넌트끼리 데이터를 교류하는 것은 언제나 부모와 자식 흐름에서 교류해야 한다.
