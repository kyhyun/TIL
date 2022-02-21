> 이 글은 “리액트를 다루는 기술” 를 보고, 공부한 내용을 복습 및 기록하기 위해 작성됐습니다.

## JSX 란 ?

- 자바스크립트 확장 문법으로 JavaScript + XML의 조합한 형태
- 번들링 과정에서 바벨이 JSX 코드를 JavaScript로 변환
- `React.createElement` 함수를 `HTML`코드와 비슷하게 만들어 사용하기 편하게 만듦

```jsx
- ReactDOM.render
컴포넌트를 페이지에 렌더링하는 역할을 하며, react-dom 모듈을 통해 사용할 수 있는 함수

- React.StrictMode
리액트 레거시 기능들을 사용하지 못하게 하는 기능의 JSX 문법
```

---

## JSX 기본 규칙

### 1) 감싸인 요소

- 컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다.
- 방법 : `<Parent> <Child 1/>,<Child 2/>, ..., <Child N/> </Parent>`

```jsx
<div>
  <h1>리액트 안녕!</h1>
  <h2>잘 작동하니?</h2>
</div>
```

- 스타일에 관련 해서 중첩된 블록 (`div`) 이 필요하지 않을 때는 Fragment 문법 적용
  - 방법 : `<></>` 혹은 `<Fragment></Fragment>` (React v16.0 이상에서 지원)

```jsx
<Fragment>
	<h1>리액트 안녕!</h1>
	<h2>잘 작동하니?</h2>
</Fragment>

// 혹은

<>
	<h1>리액트 안녕!</h1>
	<h2>잘 작동하니?</h2>
</>
```

---

### 2) 자바스크립트 표현

- JSX 안에서 코드를`{}` 으로 감싸서 자바스크립트 문법을 내부에서 사용할 수 있다.

```jsx
function App() {
  const name = "리액트";
  return (
    <>
      <h1>{name} 안녕!</h1> {/* 리액트 안녕!*/}
      <h2>잘 작동하니?</h2>
    </>
  );
}
```

---

### 3) If 문 대신 조건부 연산자( 삼항 연산자 )

- JSX 내부의 자바스크립트 표현식에서는 if문을 사용할 수 없다.
- 조건 처리를 위해서는 JSX 밖에서 if문을 사용하여 사전에 값을 정해야 한다.
- 혹은 `{}` 안에서 조건부(삼항) 연산자를 이용해야 한다.

```jsx
function App() {
  const name = "뤼액트";
  return (
    <>
      {name === "리액트" ? ( {/*리액트가 아닙니다.*/}
        <h1>리액트 입니다.</h1>
      ) : (
        <h2>리액트가 아닙니다.</h2>
      )}
    </>
  );
}
```

---

### 4) AND 연산자(`&&`)를 사용한 조건부 렌더링

- 조건부 연산자에 따른 렌더링 처리보다 더 짧은 코드로 작업할 수 있는 방법
- 특정 조건을 만족하면 내용을 보여주고, 만족하지 않으면 내용을 보여주지 않도록 렌더링 처리할 때, 사용한다.
- 리액트에서 `false`를 렌더링할 때는 `null`과 마찬가지로 아무것도 나타나지 않는다.

```jsx
// 조건부 연산자를 이용한 조건부 렌더링 처리 ( not bed )
function App() {
  const name = "뤼액트";
  return <div>{name === "리액트" ? <h1>리액트입니다.</h1> : null}</div>;
}

// AND(&&) 연산자를 이용한 조건부 렌더링 처리 ( good )
function App() {
  const name = "리액트";
  return <div>{name === "리액트" && <h1>리액트입니다.</h1>}</div>;
}
```

- 단, `falsy`한 값 중에 숫자 `0`은 예외적으로 화면에 렌더링 된다.

```jsx
// 예외적으로 숫자 0에 대해서 null이 아닌 화면에 출력
function App() {
  const number = 0;
  return <div>{number && <h1>내용</h1>}</div>;
  {
    /* 0 */
  }
}
```

---

### 5) OR 연산자(`||`)를 이용한 `undefined` 렌더링 막기

- 컴포넌트 안의 함수에서 `undefined`만 반환하여 렌더링을 하게 되면 오류를 발생 시킨다.

```jsx
Error: App(...): Nothing was returned from render. This usually means a return
statement is missing. Or, to render nothing, return null
```

- 어떤 값이 `undefined`일 수도 있다면, OR(`||`) 연산자를 사용하면 오류를 방지할 수 있다.

```jsx
function App() {
  const name = undefined;
  return name || "이 값은 undefined 입니다.";
  {
    /*이 값은 undefined 입니다.*/
  }
}
```

- JSX 내부에서 `undefined`를 렌더링 하는 것은 `falsy` 값으로 처리되어 렌더링에 문제가 없다.

```jsx
function App() {
  const name = undefined;
  return <div>{name}</div>;
  {
    /* 에러 없이 빈 화면이 렌더링 된다.*/
  }
}
```

- 값이 `undefined`일 때, 처리해야 하는 조건이 필요한 경우에 이용할 수도 있다.

```jsx
function App() {
  const name = undefined;
  return <div>{name || "리액트"}</div>; {/* 리액트 */}

```

---

### 6) 인라인 스타일링 : Inline Styling

- DOM 요소에 스타일은 객체 형태로 값을 넣어주어야 한다.
- 스타일 이름 작성 규칙
  - `-`가 포함된 문자의 경우 `-`를 제거
  - 카멜 표기법(`camelCase`)으로 작성
  - 예) `background-color` ⇒ `backgroundColor`

```jsx
function App() {
  const name = "리액트";
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: "48px",
    fontWeight: "bold",
    padding: 16, // 단위 생략시, px로 지정된다.
  };
  return <div style={style}>{name}</div>;
}
```

- 혹은 미리 선언하지 않고 바로 style 속성을 지정할 수 있다.

```jsx
function App() {
  const name = "리액트";
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "aqua",
        fontSize: "48px",
        fontWeight: "bold",
        padding: 16, // 단위 생략시, px로 지정된다.
      }}
    >
      {name}
    </div>
  );
}
```

**<결과>**

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/154973806-7450e48f-4c55-4d47-aaad-c3f00264653d.png" height="150px"/></p>

---

### 7) class 대신 className

- HTML에서 CSS 클래스 지정할 때, `class`라는 속성을 설정하는 것의 연장선
- JSX에서는 `className`으로 설정
- v16.0 버전 이상부터는 `class`를 사용하면 `className`으로 변환 시켜 주고 경고를 띄운다.

```jsx
Warning : Invalid DOM property `class`. Did you mean `className`?
```

**<** `**src/App.css` >\*\*

```css
.react {
  background: aqua;
  color: black;
  font-size: 48px;
  font-weight: bold;
  padding: 16px;
}
```

**< `src/App.js` >**

```jsx
function App() {
  const name = "리액트";
  return <div className='react'>{name}</div>;
}
```

**<결과>**

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/154974295-34eb346d-6179-4ed9-80ac-a888455f3b71.png"></p>

---

### 8) 반드시 닫힌 태그로 작성

- HTML에 존재하는 닫지 않는 태그인 빈 태그들을 대상으로 JSX에서는 꼭 닫아주어야 한다.
- 닫아주지 않으면 파싱(Parsing) 과정에서 에러가 발생한다.
- 이렇게 빈 태그들은 스스로 선언과 동시에 닫는 `self-closing`태그로 작성할 수 있다.

```jsx
function App() {
  const name = "리액트";
  return (
    <>
      <div className='react'>{name}</div>
      <input />
    </>
  );
}
```

---

### 9) 주석

- JSX 내부에서 주석을 작성할 때는 `{/* 내용 */}`와 같은 형식으로 여러 줄 주석을 작성한다.
- 시작 태그가 여러 줄인 경우, 안에서 `//내용` 과 같은 형태로 한 줄 주석을 작성할 수 있다.
