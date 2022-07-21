# Chapter 16. Redux 라이브러리 이해하기

## 개념 정리

- 현재 리액트에서 가장 많이 사용하는 상태 관리 라이브러리
- 리액트에 종속되는 라이브러리는 아니기 때문에 다른 UI 라이브러리와 프레임워크에서도 함께 사용된다.

### 액션 ( Action )

- 어떤 행위에 대한 변화를 객체로 표현해 놓은 것
- 기본적으로 `type`필드를 반드시 가지고 있으며, 액션의 이름을 담는 키가 된다.
- 이외의 값들은 상태에 대한 업데이트 시 참고해야하는 값으로 작성자가 임의로 설정할 수 있다.

```json
// 예시 1
{
  type: 'TOGGLE_VALUE'
}

// 예시 2
{
  type: 'ADD_TODO',
  data: {
    id: 1,
    text: '리덕스 배우기'
  }
}

// 예시 3
{
  type: 'CHANGE_INPUT',
  text: '안녕하세요'
}
```

### 액션 생성 함수

- 액션 객체를 만들어 주는 함수
- 직접 액션 객체를 작성하는 것은 실수할 수 있고, 매번 작성하는 것에 번거로움이 있으므로 함수로 만들어 관리한다.

```js
// 선언문 함수
function addTodo(data) {
  return {
    type: 'ADD_TODO',
    data,
  };
}

// 화살표 함수
const changeInput = (text) => {
  return {
    type: 'ADD_TODO',
    text,
  };
};
```

### 리듀서 ( Reducer )

- 실제 변화를 일으키는 함수
- 액션을 만들어 그 행위가 발생하면 리듀서가 현재 상태와 액션 객체를 인자로 전달 받는다.
- 그리고 그 두 값을 참고하여 새로운 상태를 만들어 반환해주는 역할을 한다.

```js
const initialState = {
  counter: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}
```

### 스토어 ( Store )

- 전역 상태를 저장하는 공간으로 한 프로젝트에 하나의 스토어만 존재한다.
- 현재 애플리케이션의 상태와 리듀서, 그리고 디스패치와 스토어 같은 내장 함수를 가지고 있다.

### 디스패치 ( Dispatch )

- 스토어의 내장 함수로 액션을 발생시키는 주체
- Dispatch(action) 과 같은 형태로 액션 객체를 파라미터로 넣어서 호출한다.
- 호출한 후 스토어는 리듀서 함수를 실행하여 디스패치가 발생시킨 액션에 따라 새로운 상태를 반환한다.

### 구독 ( Subscribe )

- 스토어의 내장 함수로 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출된다.
- 보통 이 함수를 직접 사용하는 일은 별로 없으며, connect 함수나 useSelector Hook 을 사용하여 구독한다.

```js
const listener = () => {
  console.log('상태가 업데이트 됨');
};
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

---

## 리덕스 규칙

### 1. 하나의 애플리케이션에는 단일의 스토어를 둔다.

- 여러 개의 스토어를 둘 수는 있지만, 상태 관리가 복잡해질 수 있으므로 권장되는 사항이 아니다.

### 2. 상태는 읽기 전용의 값으로써 사용한다.

- 내부 데이터가 변경되는 것을 감지하는 것은 얕은 비교를 통해 이루어지기 때문에 (빠른 비교를 위해서) 불변성을 유지해야한다.

### 3. 리듀서 => 순수한 함수

- 순수 함수를 만족하는 조건

  - 이전 상태와 액션 객체를 파라미터로 받는다.
  - 파라미터 외의 값에 의존하지 않는다.
  - 이전 상태는 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어 반환한다.
  - 똑같은 파라미터로 호출된 함수는 언제나 똑같은 결과 값을 반환해야 한다. ( 같은 인풋 => 같은 아웃풋 )

- 즉, 랜덤 값을 다루거나 Date 객체, 네트워크 요청 등에 대한 것은 파라미터가 같아도 다른 결과를 만들 수 있으므로 리듀서 함수 바깥에서 처리해주어야 한다.
  - 액션을 만드는 과정에서 처리해주거나 리덕스 미들웨어, 리액트 쿼리와 같은 것을 통해서 처리할 수 있다.

---

## 리덕스 모듈 만들기

- 보통 store 인스턴스를 직접 사용하기 보다는 react-redux 라이브러리에서 제공하는 유틸 함수와 컴포넌트를 사용하여 리덕스 관련 작업을 수행한다.

### 리덕스 모듈

- 액션 타입
- 액션 생성함수
- 리듀서

위 세 항목이 모두 들어 있는 자바스크립트 파일을 의미하며, 각 항목들은 다른 파일에 저장할 수도 있지만 코드 수정이 불편하기 때문에 이 모듈의 구성을 모두 하나의 파일에 작성하는 `Ducks` 패턴을 자주 사용한다.

리액트 프로젝트에서 리덕스를 사용하는 경우 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리해서 작업하는 것이 일반적인 패턴으로 프레젠테이셔널 컴포넌트는 props를 받아 화면에 UI를 그려주기만 하는 컴포넌트, 컨테이너 컴포넌트는 리덕스와 연동되어 리덕스로부터 상태를 받고 스토어에 액션을 디스패치하는 역할을 담당한다.

### counter 리덕스 모듈 만들기 ( 단순한 구조 )

```js
// modules/counter.js

// 액션 객체 정의
const INCREASE = 'modules/INCREASE';
const DECREASE = 'modules/DECREASE';
const SET_DIFF = 'counter/SET_DIFF';

// 액션 생성 함수 만들기
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const setDiff = () => ({ type: SET_DIFF, diff });

// 초기 상태 값 선언
const initialState = {
  number: 0,
  diff: 1,
};

// 리듀서 선언
function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      };
    default:
      return state;
  }
}
```

### todos 리덕스 모듈 만들기 ( 객체 속성이 2개 이상인 복잡한 구조 )

```js
// modules/todos.js

// 액션 객체 정의
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';

// 액셩 생성 함수 만들기
let nextId = 1;
export const addTodo = (text) => ({
  type: ADD_TODO,
  todo: {
    id: nextId++,
    text,
  },
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id,
});

// 초기 상태 값 선언 (원시 타입, 객체 타입 모두 가능)
const initialState = [
  {
    id: 1,
    text: 'example',
    done: false,
  },
];

// todos 리듀서 선언
function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}
```

### Root 리듀서 만들기

- 복수의 리듀서를 한 프로젝트에서 하나의 리듀서로 합쳐서 사용하는 것
- 리덕스의 내부 함수인 `combineReducers`를 사용한다.

```js
// modules/index.js

import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

- 프로젝트 내의 루트 Index.js 에 리덕스 스토어를 만든다.

```js
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools()); // 스토어를 만든다.
console.log(store.getState()); // 스토어의 상태를 확인해본다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
```

- Provider로 store를 props로 보내고 App 컴포넌트를 감싸게 되면 렌더링 하는 어느 위치에서든 리덕스 스토어에 접근할 수 있다.

- 리덕스 개발자 도구 활성화

  - 스토어의 상태를 개발자 도구에서 조회할 수 있게 해주는 익스텐션, 크롬 웹 스토어에서 설치하고 라이브러리를 적용한다.

  - composeWithDevTools를 사용하여 리덕스 개발자 도구를 활성화 할 수 있다.

    ```sh
    $npm i redux-devtools-extension
    ```

  - import 한 후 createStore 함수의 두 번째 인자에 해당 함수를 호출한다.

### 프레젠테이셔널 컴포넌트 - 카운터 구현

- 리덕스 스토어에 직접 접근하지 않고 필요한 값 혹은 함수를 props로만 받아와서 사용하는 컴포넌트

```js
// components/Counter.js

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = (e) => {
    // e.target.value의 타입은 문자열이기 때문에 숫자(10진수)로 변환
    onSetDiff(parseInt(e.target.value, 10));
  };
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type='number' value={diff} min='1' onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
```

#### 컨테이너 컴포넌트 만들기

- 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치할 수 있는 컴포넌트로 html 태그를 사용하지 않고 다른 프리젠테이셔널 컴포넌트를 불러와서 사용한다.

```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../componenets/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook
  const { number, diff } = useSelector((state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));

  // useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할 수 있게 해주는 Hook
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수 생성
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = () => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태를 전달하는 props
      number={number}
      diff={diff}
      // 액션을 디스패치 시키는 함수들을 props로 전달
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
```

- App 컴포넌트에서 CounterContainer를 불러와서 렌더링하기

```js
import React from 'react';
import CounterContainer from './containers/CounterContainer';

function App() {
  return (
    <div>
      <CounterContainer />
    </div>
  );
}

export default App;
```

### 프레젠테이셔널 컴포넌트 - 할 일 목록 구현

- 보통 TodoItem, TodoList, Todos 컴포넌트를 분리해서 리렌더링 성능을 최적화 하기 위해 작성하지만 지금은 편의상 한 컴포넌트에 작성

```js
// components/Todo.js

import React, { useState, memo } from 'react';

const TodoItem = memo(function TodoItem({ todo, tonToggle }) {
  return (
    <li style={{ textDecoration. todo.done ? 'line-through' : 'none' }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
});

const TodoList = memo(function TodoList({ todos, onToggle }){
  return (
    <ul>
      {todos.map(todo =>(
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

function Todos({ todos, onCreate, onToggle }) {
  const [text, setText] = useState('');
  const onChange = e => setText(e.currentTarget.value);
  const onSubmit = e => {
    e.preventDefault(); // Submit 고유 이벤트 발생 방지
    onCreate(text);
    setText(''); // input 초기화
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder='할 일을 입력하세요.'
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default Todos;
```

#### 할일 목록 컨테이너 컴포넌트 만들기

```js
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer() {
  // useSelector 에서 꼭 객체를 반환 할 필요는 없습니다.
  // 한 종류의 값만 조회하고 싶으면 그냥 원하는 값만 바로 반환하면 됩니다.
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const onCreate = (text) => dispatch(addTodo(text));
  const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]); // 최적화를 위해 useCallback 사용

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
```

- 할일 목록 컴포넌트를 App에서 렌더링하기

```js
import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
```
