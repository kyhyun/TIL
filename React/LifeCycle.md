# Life Cycle API

- 모든 리액트 컴포넌트에는 라이프 사이클(수명 주기)이 존재하며, 컴포넌트의 수명은 페이지에 렌더링 되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝난다.
- 사용 목적
  - 컴포넌트를 처음으로 렌더링 할 때 어떤 작업 처리
  - 업데이트 전후로 어떤 작업을 처리
  - 불필요한 업데이트를 방지
- 이 메서드는 클래스형 컴포넌트에서만 사용할 수 있다.
- 함수형은 `Hooks` 기능을 사용하여 비슷한 작업을 처리할 수 있다.

---

## 1. 라이프사이클 메서드의 이해

- 라이프 사이클 메서드의 종류는 총 9가지로 구성되어 있다.
  - `Will` 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드를
  - `Did` 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드
- 이 메서드들은 컴포넌트 클래스에서 덮어 써 선언함으로써 사용할 수 있다.
- 라이프 사이클의 카테고리는 `마운트`, `업데이트`, `언마운트` 로 나뉘어진다.

### 1) 마운트(Mount)

- DOM이 생성되고 웹 브라우저 상에 나타나는 것을 말한다.
- **마운트할 때 호출하는 메서드**
  - `constructor` : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
  - `getDerivedStateFromProps` : props에 있는 값을 state에 넣을 때 사용하는 메서드
  - `render` : 우리가 준비한 UI를 렌더링하는 메서드
  - `componentDidMount` : 컴포넌트가 웹 브라우저 상에 나타난 후 호출하는 메서드

### 2) 업데이트(Update == Re-rendering)

- **컴포넌트가 업데이트 하는 경우**

  1. props가 바뀔 때
  2. state가 바뀔 때
  3. 부모 컴포넌트가 리렌더링 될 때
  4. `this.forceUpdate`로 강제로 렌더링을 트리거 할 때

- **업데이트할 때 호출하는 메서드**

  1. `getDerivedStateFromProps` : 이 메서드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출된다. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용한다.

  2. `shouldComponentUpdate` : 컴포넌트가 리렌더링을 해야 할지 말아야 할지 결정하는 메서드

     - 반환 값은 `true` 혹은 `false` 값이다.
     - `true`를 반환하면 다음 라이프사이클 메서드를 계속 실행한다.
     - `false`를 반환하면 작업을 중지한다. ( 컴포넌트 리렌더링을 하지 않는다. )
     - 만약 특정 함수에서 `this.forceUpdate` 함수를 호출하면 이 과정을 생략하고, 바로 render 함수를 호출한다.

  3. `render` : 컴포넌트를 리렌더링 한다.
  4. `getSnapshotBeforeUpdate` : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
  5. `componentDidUpdate` : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드

### 3) 언마운트(Unmount)

- 마운트의 반대 과정으로 컴포넌트를 DOM에서 제거하는 것을 말한다.
- **언마운트할 때 호출하는 메서드**
  - `componentWillUnmount` : 컴포넌트가 웹 브라우저 상에서 사라지기 전에 호출하는 메서드

---

## 2. 라이프사이클 메서드 살펴보기

### 1) `render`

```jsx
render() { ... }
```

- 컴포넌트의 모양새를 정의하는 메서드
- 라이프사이클 메서드 중 유일하게 필수 메서드에 속함
- 내부에서 `this.props`와 `this.state`에 접근할 수 있으며, DOM이나 컴포넌트 요소를 반환
- 아무것도 보여주고 싶지 않은 경우 `null` 혹은 `false` 값을 반환 시켜야 한다.
- 이벤트 설정이 아닌 곳에서 `setState` 사용하거나 브라우저의 DOM 접근은 안된다.
- DOM 정보를 가져오거나 state에 변화를 주는 것은 `componentDidMount`에서 처리해야 한다.

### 2) `constructor`

```jsx
constructor(props) { ... }
```

- 컴포넌트를 만들 때, 처음으로 실행되는 컴포넌트의 생성자 메서드
- 이 메서드를 통해 초기 state를 정할 수 있다.

### 3) `getDerivedStateFromProps`

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
  if(nextProps.value !== prevState.value) { // 조건에 따라 특정 값 동기화
    return { value : nextProps.value };
  }
  return null; // state를 변경할 필요가 없다면 null을 반환
}
```

- 리액트 v.16.3 이후에 새로 만든 라이프사이클 메서드
- props로 받아온 값을 state에 동기화 시키는 용도로 사용
- 컴포넌트가 마운트 혹은 업데이트 될 때, 호출된다.

### 4) `componentDidMount`

```jsx
componentDidMount() { ... }
```

- 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행하는 메서드
- 이 안에서 다른 자바스크립트 라이브러리 혹은 프레임워크의 함수를 호출하거나, 이벤트 등록, `setTimeout`, `setInerval`, 네트워크 요청과 같은 비동기 작업을 처리할 때 사용

### 5) `shouldComponentUpdate`

```jsx
shouldComponentUpdate(nextProps, nextState) { ... }
```

- props 혹은 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드
- 반드시 `true` 혹은 `false` 값을 반환해야 하며, 컴포넌트를 만들 때, 이 메서드를 따로 생성하지 않는다면 기본적으로 언제나 `true`를 반환한다.(`false` 반환 시 업데이트 과정 중지 )
- 이 메서드 안에서 현재 props와 state는 `this.props`와 `this.state`로 접근하고,
  새로 설정될 props 혹은 state는 `nextProps`와 `nextState`로 접근할 수 있다.
- 프로젝트 성능을 최적화 할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 `false` 값을 반환하게 한다.

### 6) `getSnapShotBeforeUpdate`

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  if(prevState.array !== this.state.array) {
    const { scrollTop, scrollHeight } = this.list
    return { scrollTop, scrollHeight };
  }
}
```

- 리액트 v.16.3 이후 만들어진 메서드로 `render`에서 만들어진 결과물이 브라우저에 실제로
  반영되기 직전에 호출된다.
- 메서드에서 반환하는 값은 `componentDidUpdate`에서 세 번째 파라미터인 `snapshot` 값으로
  전달 받을 수 있다.
- 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 사용한다. ( ex. 스크롤 바 위치 유지 )

### 7) `componentDidUpdate`

```jsx
componentDidUpdate(prevProps, prevState, snapshot) { ... }
```

- 리렌더링을 완료한 후 실행하는 메서드
- 업데이트가 끝난 직후이므로, DOM 관련 처리를 할 수 있다.
- `prevProps` 또는 `prevState` 를 사용해서 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다.
- 또 `getSnapshotBeforeUpdate` 에서 반환 값이 있다면 여기서 `snapshot`값을 전달 받을 수 있다.

### 8) `componentWillUnmount`

```jsx
componentWillUnmount() { ... }
```

- 컴포넌트를 DOM에서 제거할 때 실행하는 메서드
- `componentDidMount`에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거한다.

### 9) `componentDidCatch`

```jsx
componentDidCatch(error, info) {
  this.setState({
    error : true
  });
  console.log({ error, info });
}
```

- 리액트 v16.0에서 새롭게 도입되었으며, 컴포넌트 렌더링 도중에 에러가 발생했을 때 애플리케이션이 멈추지 않고 오류 UI를 보여줄 수 있게 해준다.
- `error`는 파라미터에 어떤 에러가 발생했는지 알려 주며, `info` 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 준다.
- 컴포넌트 자신에게 발생하는 에러는 잡아낼 수 없고, 자신의 `this.props.children`으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다.

---

## 3.라이프사이클 메서드 사용하기

### 실습

> 라이프사이클 메서드를 직접 사용해보자.

### 1) 예제 컴포넌트 생성

**< `LifeCycleSample.js` >**

```jsx
import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };
  myRef = null; // ref를 설정할 부분

  constructor(props) {
    // 초기 state 설정
    super(props);
    console.log("constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // props 값을 state 값에 동기화 처리
    console.log("getDreivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    // 비동기 코드 처리하는 메소드
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    //props, state 변경에 대한 리렌더링 처리 판단 메서드
    console.log(`shouldComponentUpdate : ${nextProps}, ${nextState}`);
    return nextState.number % 10 !== 4; // 마지막 자리 숫자가 4면 리렌더링 하지 않는다.
  }

  componentWillUnmount() {
    // 컴포넌트를 DOM에서 제거할 때, 실행하는 메소드
    console.log("componentWilUnmount");
  }

  handleClick = () => {
    // 클릭 메소드 생성
    this.setState({
      number: this.state.number + 1,
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 업데이트하기 직전의 값을 참고할 때 호출하는 메소드
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`componentDidUpdate, ${prevProps}, ${prevState}`);
    if (snapshot) {
      console.log(`업데이트되기 직전 색상 : ${snapshot}`);
    }
  }

  render() {
    console.log("render");
    const style = {
      color: this.props.color,
    };

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color : {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
```

- 이 컴포넌트는 각 라이프사이클 메서드를 실행할 때마다 콘솔 디버거에 기록하고, 부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 `state.number` 값을 1씩 더한다.
- `getDerivedStateFromProps`는 부모에게서 받은 color 값을 state에 동기화 하고, `getSnapshotBeforeUpdate`는 DOM 변화가 일어나지 직전의 색상 속성을 `snapshot` 값으로 반환하여 이것은 `componentDidUpdate`에서 조회한다.
- `shouldComponentUpdate`에서 `state.number` 값의 마지막 자리 수가 4이면 리렌더링을 취소하도록 설정한다.

### 2) App 컴포넌트에서 예제 컴포넌트 사용

**< `App.js` >**

```jsx
import React, { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";

// 랜덤 색상(HexCode)을 생성한다.
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16); // 000000 ~ ffffff
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default App;
```

- `getRandomColor` 함수는 state의 color 값을 랜덤 색상으로 설정한다. `16777215`를 hex 값으로 치환하면 `ffffff`가 되므로 해당 코드는 `000000`부터 `ffffff`값을 반환한다.
- 버튼을 렌더링하고, 누를 때마다 `handleClick` 메서드가 호출되게 이벤트를 설정해서 불러온 `LifeCycleSample` 컴포넌트에 `color` 값을 `props`로 설정한다.

```plain
💡 일부 라이프 사이클이 연속해서 호출되는 현상에 대해
- `React.StrictMode`가 적용되어 있으면 발생하는 현상으로 개발 환경에서만 두 번 호출되는 것으로
프로덕션 환경에서는 정상적으로 호출된다. 개발 환경에서 정상 호출을 확인하고 싶으면
`index.js`에 있는 `React.StrictMode`를 제거하면 된다.
```

### 3) 에러 잡아내기

**< `LifeCycleSample.js` >**

```jsx
render() {
  ( ... )
  return (
    <div>
      {this.props.missing.value}
      ( ... )
    </div>
  );
}
```

- `render` 함수 안에 다음과 같이 존재하지 않는 `props` 인 `missing` 객체의 `value`를 조회해서 렌더링 처리하려고 하면 브라우저에서는 서버 단에서 에러를 어떻게 일으켰는지 알려주지만, 사용자 측면인 브라우저에서는 렌더링 처리가 안되어 화면 상에서 흰 페이지만 남게 된다.
- 사용자에게 웹 서비스에서 에러가 발생했음을 인지할 수 있도록 해주어야 한다.

**< `ErrorBoundary.js` >**

- 에러를 잡아주는 컴포넌트를 생성하고, 화면에 렌더링 처리를 하자.

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log({ error: info });
  }
  render() {
    if (this.state.error) return <div>에러가 발생했습니다!</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;
```

- 에러가 발생하면 `componentDidCatch` 메서드가 호출되며, `this.state.error` 값을 `true`로
  업데이트 해준다.
- `render` 함수는 `this.state.error` 값이 `true`이면 에러를 알려주는 문구를 보여준다.

**< `App.js` >**

```jsx
import React, { Component } from 'react';
import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';

// 랜덤 색상(HexCode)을 생성한다.
function getRandomColor() { ... }

class App extends Component {
  ( ... )

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
```

`App.js` 컴포넌트에 `ErrorBoundary` 컴포넌트를 추가하면, 에러 발생에 대한 화면 처리를 해준다.

---

## 4. 정리

![image](https://user-images.githubusercontent.com/77887712/179416674-79459ca9-a407-4498-8179-11d9c833a08e.png)

- 컴포넌트 상태에 변화가 있을 때마다 실행하는 메서드
- 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 쓰인다.
- 컴포넌트 업데이트의 성능을 개선할 때는 `shouldComponentUpdate`가 중요하게 사용된다.
