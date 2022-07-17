# Chapter 14. 외부 API를 연동하여 뉴스 뷰어 만들기

- 뉴스 카테고리에 따라 관련 기사를 보여주는 뉴스 뷰어 기능 구현

<p align="center">
  <img src="https://user-images.githubusercontent.com/77887712/179391755-dec4110f-88e9-4ea6-a5ed-753dc38a1ff0.gif" width="600">
</p>

## 사용한 기술

- React-Router(v6)
- React
- Axios
- open api : [news api](https://newsapi.org/)

## 구현

- `news api`에서 제공하는 API를 이용하여 최신 뉴스를 불러온 후 카테고리를 클릭함에 따라 라우터의 파라미터를 바꾸어 해당 카테고리에 해당되는 뉴스 아티클을 보여주는 SPA 구현

- React-Router v6 이후 NavLink와 useParam에 대한 사용법에 대해 더 익숙해질 필요 있음

- useEffect 안에서 async/await 문법을 사용하기 위해서는 내부에 또 다른 async 문법을 사용하기 위한 함수를 사용해야한다.

- usePromise라는 Custom Hook을 만들어 사용함으로써 비동기 통신에 대해 대기, 완료, 실패에 대한 상태 관리를 간결하게 처리할 수 있다.

```javaScript
// src/lib/userPromise.js
import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 대기 중, 완료, 실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [loading, resolved, error];
}

```

## 참조

[리액트를 다루는 기술 - github Link](https://github.com/velopert/learning-react)
