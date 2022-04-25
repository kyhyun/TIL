## 타입스크립트 환경 설정
> 타입스크립트 환경 설정에 대해 알아본다.

**타입스크립트 프로젝트 생성**
```
$ mkdir ts-practice
$ cd ts-practice
$ npm init -y
```
ts-practice 폴더 안에 package.json 이라는 파일이 생성된다.

**타입스크립트 설치**

타입스크립트를 전역으로 설치하는 방법으로는 다음과 같다.
```
$ npm i -g typescript
```
전역에 설치하고 싶지 않다면 npx를 이용해서 다음 명령어를 이용할 수도 있다.
```
$ npx tsc --init
```
프로젝트 디렉터리에 다음 명령어를 입력하면 tsconfig.json 파일이 자동으로 생성된다.
```
$ tsc --init
```

**설정파일(`tsconfig.json`) 생성하기**


tsconfig.json 파일을 프로젝트 파일 안에 만들어 다음과 같이 컴파일 옵션을 작성한다.
```json
{
  "compilerOptions" : {
    "target": "es5", // 컴파일 될 JavaScript 버전 설정
    "module": "commonjs", // 모듈 방식 설정
    "strict": true,// 엄격한 타입 검사 수행 여부
    "allowJs": true, // 해당 프로젝트 안에서 JavaScript 문법 허용
    "checkJs": true, // JavaScript의 타입 체크 여부
    "noImplicitAny": true, // any 타입 금지 여부
    "esModuleInterop" :true, // commonjs 모듈 형태로 이루어진 파일을 ES2015 모듈 형태로 불러옴
    "outDir": "./dist", //컴파일 된 js 파일들이 저장되는 경로 지정
  }
}
```
이외에도 여러가지 있으며, 필요한 경우 아래 링크를 참조하면 좋다.
[TypeScript Hanbook 한글 문서](https://typescript-kr.github.io/)

**타입스크립트 파일 만들기**
프로젝트에 src 폴더를 만들고 그 안에 practice.ts 파일을 작성한다.

`src/practice.ts`
```ts
const message: string = 'hello world';
console.log(message);
```
타입스크립트의 확장자는 `*.ts`를 사용하며, jsx 문법을 사용하는 경우 `*.tsx`를 사용한다.
변수 뒤에 `: string` 과 같이 해당 const 값이 문자열이라는 것을 명시하며, 이 변수에 숫자가 아닌 다른 값을 설정하게 되면 에디터에서 오류가 나타난다.

프로젝트의 디렉터리에 위치한 터미널에서 `tsc` 명령어를 이용하면 아까 tsconfig에서 설정했던 outDir에 해당하는 경로에 es5문법으로 컴파일된 파일이 생성된다.
```js
"use strict";
var message = 'hello world';
console.log(message);
```


**타입스크립트 패키지를 이용한 컴파일**
일반적으로 타입스크립트를 사용하는 프로젝트에 적용할 때, 사용하는 방법으로 다음과 같이 로컬 패키지에 타입스크립트를 설치한다.
```
$ npm i typescript
```

이후 package.json 파일을 열어서 다음과 같이 build 스크립트를 작성한다.
```json
{
  "name": "ts-practice",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "ts-node": "^8.4.1",
    "typescript": "^3.6.3"
  },
  "scripts": {
    "build": "tsc"
  }
}
```
이후에 `npm run build` 명령어 입력을 통해 타입스크립트로 컴파일을 할 수 있다.