# Context API

- 프로젝트 안에서 환경 설정, 사용자 정보 같이 전역에서 처리해야하는 부분에 대해 데이터(상태)를 관리할 수 있도록 도와준다.
- 보통 최상위 컴포넌트(App)에서 props를 내려주는 방식을 하지만 이렇게 여러 회차를 거쳐서 값을 넘겨주는 방식은 상태가 어디로 이동되는지 한눈에 파악하기가 쉽지 않다.(하나를 바꾸면 그 props를 넘겨주는 모든 부분에 수정이 필요)
- 따라서 이렇게 전역으로 상태를 관리할 수 있게 도와주는 Context API는 유지보수성도 높고 손쉽게 전역 상태를 관리할 수 있다.

## 초기 설정

```js
// contexts/color.js
import { createContext } from "react";

const colorContext = createContext({ color: "black" });

export default ColorContext;
```

- 파일을 생성해서 그곳에 `createContext` 함수를 사용해서 기본 상태를 지정

## Consumer

```js
import React from "react";
import ColorContext from "./contexts/color";

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {(value) => (
        <div
          style={{
            width: "64px",
            height: "64px",
            background: value.color,
          }}
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
```

- Render Props라는 컴포넌트의 children 자리에 함수를 전달해주는 문법을 이용해서 ColorBox 파일에 전에 지정한 기본 상태 값을 div 스타일에 집어 넣어줄 수 있다.

## Provider

- Provider를 사용하면 Context의 value를 변경 할 수 있으며, 처음에 설정한 기본 값은 이 Provider가 사용되지 않을 때만 사용되고, 만약 Provider가 사용됐는데 value를 명시하지 않는 경우, 이 기본 값을 사용하지 않기 때문에 오류가 발생한다.

```js
import ColorBox from "./ColorBox";
import ColorContext from "./contexts/color";

function App() {
  return (
    <ColorContext.Provider value={{ color: "yellow" }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
}

export default App;
```

---

## 동적 Context 사용하기

### Context 파일 수정하기

- Context의 값을 업데이트하는 경우 어떻게 사용할까
  1. context/color.js 에서 Consumer랑 Provider 를 한꺼번에 처리한다.

```js
// contexts/color.js
import React, { createContext, useState } from "react";

// Consumer(초기 값)을 createContext를 통해 생성
const ColorContext = createContext({
  state: { color: "black", subColor: "red" },
  actions: {
    setColor: () => {},
    setSubColor: () => {},
  },
});

// Provider(변경되는 값)을 children으로 받고, 그것을 useState로 관리
const ColorProvider = ({ children }) => {
  // 기본 값과 Provider에 들어가는 value를 일치시켜야 내부 구성
  // 파악이 쉽고, 실수했을 때 Provider가 적용되지 않는 경우에 대한 에러를
  // 방지할 수 있음
  const [color, setColor] = useState("black");
  const [subColor, setSubColor] = useState("red");
  // state와 action 객체를 묶으면 나중에 다른 컴포넌트에서
  // Context값 쓰기 편함
  const value = {
    state: { color, subColor },
    actions: { setColor, setSubColor },
  };
  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

// const ColorConsumer = ColorContext.Consumer;
const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider와 ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };

export default ColorContext;
```

2. 새롭게 바뀐 Context 를 적용한다.
   - Provider랑 Consumer 구조 분해 할당으로 반영시키기

```js
// App.js (Provider 적용)
import React from "react";
import ColorBox from "./components/ColorBox";
import { ColorProvider } from "./contexts/color";

const App = () => {
  return (
    <ColorProvider>
      <div>
        <ColorBox />
      </div>
    </ColorProvider>
  );
};

export default App;
```

```js
// components/ColorBox.js (Consumer 적용)
import React from "react";
import { ColorConsumer } from "../contexts/color";

const ColorBox = () => {
  return (
    <ColorConsumer>
      {({ state }) => (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: state.color,
            }}
          />
          <div
            style={{
              width: "32px",
              height: "32px",
              background: state.subColor,
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
};

export default ColorBox;
```

---

#### 색상 선택 컴포넌트 생성

- actions에 넣어준 함수를 호출하는 컴포넌트 만들기

```js
import React from "react";
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <div style={{ display: "flex" }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default SelectColors;
```

- App.js에 적용

```js
import ColorBox from "./ColorBox";
import { ColorProvider } from "./contexts/color";
import SelectColors from "./components/SelectColors";
function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
```

- 마우스 왼쪽 클릭 : 메인 색상 변경, 마우스 우른쪽 클릭 : 보조 색상 변경 되도록 ColorConsumer 적용하기

```js
import React from "react";
import { ColorConsumer } from "../contexts/color";
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => actions.setColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함
                  actions.setSubColor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </div>
  );
};

export default SelectColors;
```

---

#### Consumer 이외 또 다른 방식

1. useContext Hook

- 리액트 내장 Hooks로 함수형 컴포넌트에서 Context를 아주 편하게 사용할 수 있도록 도와준다.

```js
// components/ColorBox.jsx 수정하기

import React, { useContext } from "react";
import ColorContext from "./contexts/color";

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color,
        }}
      />
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subColor,
        }}
      />
    </>
  );
};

export default ColorBox;
```

- children에 함수를 전달하는 Render Props 패턴이 불편한 경우, 이 함수를 이용하면 쉽게 Context 값을 조회할 수 있다.
- 하지만 함수형 컴포넌트에서만 적용하다는 한계점이 있다.

2. static contextType

- 클래스형 컴포넌트에서 Context를 조금 더 쉽게 사용할 수 있는 방법

```js
// components/SelectColors.jsx 클래스 컴포넌트 변경
import React, { Component } from "react";
import ColorContext from "../contexts/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

class SelectColors extends Component {
  // 클래스 상단에 static contextType 값을 지정
  // this.context 조회하면 Context의 value를 가리키게 된다.
  static contextType = ColorContext;

  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };

  handleSetSubColor = (subColor) => {
    this.context.actions.setSubColor(subColor);
  };
  render() {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <div
          style={{
            display: "flex",
          }}
        >
          {colors.map((color) => (
            <div
              key={color}
              style={{
                background: color,
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              onClick={() => this.handleSetColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                this.handleSetSubColor(color);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  }
}

export default SelectColors;
```

- 이 경우 한 클래스에 하나의 Context 만 사용하지 못한다는 단점이 존재한다.
- 새로운 컴포넌트를 작성하는 경우 클래스형으로 작성하는 경우는 거의 없기 때문에 useContext를 사용하는 편이 낫다.

---

### 정리

- 기존 컴포넌트 간에 전역적으로 여기저기서 상태가 사용되고 컴포넌트의 개수가 많은 상황이라면, Context API를 도입해보자.
- 단순한 전역 상태 관리의 경우 Context API를 이용하고, 조금 더 복잡한 애플리케이션을 구현하고자 하는 경우 리덕스를 고려한다.
  - 리덕스의 미들웨어 기능, 강력한 개발자 도구, 코드의 높은 유지보수성을 제공하기 때문에 조금 더 어렵고 복잡하지만 상황에 따라서 기용할 가치가 있다.
