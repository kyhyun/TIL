> 이 글은 “리액트를 다루는 기술” 를 보고, 공부한 내용을 복습 및 기록하기 위해 작성됐습니다.

# Iteration Component

웹 애플리케이션을 만들 때 반복되는 코드가 증가하는 것은 파일 용량도 커질 뿐더러 유지 및 보수가 어렵다. `src` 디렉터리 안에 `IterationSample.js` 파일을 작성하고 코드를 적어보자.

**< `IterationSample.js` >**

```jsx
import React from "react";

const IterationSample = () => {
  return (
    <ul>
      <li>눈사람</li>
      <li>얼음</li>
      <li>눈</li>
      <li>바람</li>
    </ul>
  );
};

export default IterationSample;
```

코드에서 다음과 같이 `<li> ... </li>` 와 같은 형태가 반복되는 것을 볼 수 있으며, 이러한 형태가 지속적으로 반복되면 절대 장기적으로 관리하기 힘들다. 이 장에서는 반복되는 내용을 효율적으로 보여 주고 관리하는 방법을 배운다.

---

## 1. 자바스크립트의 map 함수

> 배열 객체의 내장 함수인 `map` 함수를 사용하면 반복되는 컴포넌트를 렌더링 할 수 있다.

map 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과를 새로운 배열을 생성한다.

### 1) 문법 Syntax

```jsx
arr.map(callback, [thisArg]);
```

- 이 함수의 파라미터는 다음과 같다.
  - callback : 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세 가지이다.
    - currentValue : 현재 처리하고 있는 요소
    - index : 현재 처리하고 있는 요소의 index 값
    - array : 현재 처리하고 있는 원본 배열
  - thisArg(선택 항목) : callback 함수 내부에서 사용할 this reference

### 2) 예제

`map` 함수를 사용하여 배열 [1,2,3,4,5] 의 각 요소를 제곱해서 새로운 배열 생성하기

```jsx
// before ES6
var number = [1, 2, 3, 4, 5];
var processed = number.map(function (num) {
  return num * num;
});
console.log(processed); // [1, 4, 9, 16, 25]

// after ES6
const number = [1, 2, 3, 4, 5];
const processed = number.map((num) => num * num);
console.log(processed); // [1, 4, 9, 16, 25]
```

---

## 2. 데이터 배열을 컴포넌트 배열로 변환

### 1) 컴포넌트 수정하기

```jsx
import React from "react";

const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const nameList = names.map((name) => <li>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

- 문자열로 이루어진 배열을 선언하고 그 배열의 값을 사용하여 `<li> ... </li>` JSX 코드로 된 배열을 새로 생성한 후 `nameList`에 담는다.
- `map` 함수 안의 JSX를 작성할 때는 DOM 요소나 컴포넌트 모두 사용 가능하다.

### 2) App 컴포넌트에서 예제 컴포넌트 렌더링

```jsx
import React, { Component } from "react";
import IterationSample from "./IterationSample";
class App extends Component {
  render() {
    return <IterationSample />;
  }
}

export default App;
```

렌더링은 정상적으로 동작하지만 콘솔에서는 `key` 가 없다는 경고 메시지를 보여준다.

![image](https://user-images.githubusercontent.com/77887712/155878586-a0669c1a-4a4b-4929-963d-fb900bd9bbbd.png)

---

## 3. key

> 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내기 위해 사용하는 값

- 유동적인 데이터를 다룰 때 원소를 새로 추가, 수정, 삭제를 할 수 있기 때문에 이 값이 변화할 때마다 새로 기존의 DOM과 `Virtual DOM`을 비교하는 과정을 거친다
- 각 요소에 대해 `key`가 없다면 리스트를 순차적으로 비교하면서 변화를 감지하기 때문에 찾는 속도가 느리다.
- 반면에 `key`가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있어서 렌더링으로 바뀐 데이터를 보여주는 속도 면에서 차이가 있다.

### key 설정

- map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 `props`를 설정하는 것처럼 설정하면 된다.
- `key` 값은 언제나 유일해야 한다.

```jsx
// 게시판의 게시물 번호 key 값 설정 예시
const articleList = articles.map(article => (
	<Article
		title={article.title}
		writer={article.writer}
		key={article.id}
	/>
);
```

만약 위 예시와 다르게 컴포넌트에 사용할 고유 번호가 없는 경우 `map`함수에 전달되는 콜백 함수인 `index` 값을 사용하여 설정할 수 있다.

**< `IterationSample.js` >**

```jsx
import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample; ****
```

이렇게 하면 전에 있던 경고 메시지를 지울 수 있지만 이러한 방식은 고유한 값이 없을 때만 `index` 값을 `key`로 사용해야 한다. 왜냐하면 `index`를 `key`로 사용하면 배열이 변경될 때 효율적으로 리렌더링 하지 못하기 때문이다.

---

## 4. 응용 : 동적인 배열을 렌더링 하기

### 실습

- 고유한 `key` 값을 만드는 방법에 대해 배우고 동적인 배열을 렌더링 하는 방법을 배운다.

### 1) 초기 상태 설정하기

- `useState` 상태를 설정하고, 세 가지 상태를 관리한다.
  - 리스트 값을 담는 데이터 배열 상태
  - 텍스트 입력을 받을 input의 상태
  - 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유한 id를 위한 상태
- 데이터 배열에는 문자열이 아닌 객체 형태의 배열로 고유 `id` 와 `text` 정보를 담는다.

```jsx
import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때, 사용할 id
  const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

`map` 함수 사용할 때, `key` 값 대체로 쓰던 기존 `index` 값을 제외 시키고 `name.id` 값으로 지정한다.

---

### 2) 데이터 추가 기능 구현하기

- 새로운 `text` 값을 등록할 수 있도록 ul 태그 상단에 input과 button을 렌더링하고
  input의 상태를 관리한다.

```jsx
import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때, 사용할 id

  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1); // nextId 값에 1을 더해준다.
    setNames(nextNames); // names 값을 업데이트한다.
    setInputText(""); // inputText를 비운다.
  };
  const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);
  return (
    <>
      <input type='text' value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample;
```

- 버튼을 클릭 했을 때, 호출할 `onClick` 함수를 선언하여 버튼의 `onClick` 이벤트로 설정한다.
- `onClick` 함수에서는 배열의 내장 함수 `concat`을 사용하여 새로운 항목을 추가한 배열을
  만들고, `setNames`를 통해 상태를 업데이트 해준다.
- 배열의 `push` 함수는 기존의 배열 값을 변경하므로, 아예 새로운 배열을 만들어서 기존의 값을 보존할 수 있는 `concat` 을 통해 상태를 업데이트 해주어야 **불변성**을 유지할 수 있다.
- `onClick`함수를 통해서 새로운 항목이 추가 될 때, 객체의 id 값은 `nextId`를 사용하도록 하고, 클릭할 때 마다 값이 1씩 증가하고, input 내용을 비우도록 처리한다.

---

### 3) 데이터 제거 기능 구현하기

- 각 항목을 더블 클릭 했을 때, 해당 항목이 화면에서 사라지는 기능 구현
- 마찬가지로 불변성을 유지하면서 업데이트해 주어야 한다.
- 불변성을 유지하면서 배열의 특정 항목을 지울 때는 배열의 내장 함수 `filter`를 사용한다.

### 간단한 사용 예시

```jsx
// filter 함수 사용 예시
const numbers = [1, 2, 3, 4, 5, 6];
const biggerThanTree = numbers.fitler((number) => number > 3);
// 결과 : [4, 5, 6]
```

`filter` 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 주면 쉽게 분류할 수 있다.

또한 특정 배열에서 특정 원소만 제외 시킬 수도 있다.

```jsx
// numbers 배열에서 3만 없애고 싶을 때
const numbers = [1, 2, 3, 4, 5, 6];
const withoutThree = numbers.filter((number) => number !== 3);
// 결과 : [1, 2, 4, 5, 6]
```

---

**< `IterationSample.js` >**

`filter` 함수를 이용해서 `IterationSample` 컴포넌트의 항목 제거 기능 구현하기

```jsx
const IterationSample = () => {
  (...)
  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));
  return (
    (...)
  );
};
```

- button 요소에 `onDoubleClick` 이벤트를 등록하고, `onRemove` 라는 함수를 만들어 각 `li` 요소에 이벤트를 등록한다.
- 마찬가지로 처음 렌더링 될 때, `onRemove` 안의 `id` 값을 가져올 때 `undefined`이므로 화살표 함수 문법을 사용하여 아예 새로운 함수를 만들고 그 내부에서 `onRemove` 메서드가 실행되어 더블 클릭 될 때, 값을 읽어오기 때문에 오류가 발생하지 않는다.

---

## 5. 정리

- 컴포넌트 배열을 렌더링 할 때는 `key` 값의 설정에 항상 주의해야 한다.
  - 유일성에 대한 고려
  - 배열 내 index 값을 사용하는 것은 자제해야 한다는 점
- DOM과 컴포넌트 모두 `map` 함수를 통해서 쉽게 중복 요소를 간결하게 구현할 수 있다.
- 상태 안에서 배열을 변형할 때는 배열에 직접 접근하는 것이 아니라 배열 내장 함수를 사용한다.
  - 내용을 추가 할 때는 `concat` 함수를 사용한다.
  - 내용을 삭제 할 때는 `filter` 함수를 사용한다.
