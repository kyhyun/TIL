## 타입스크립트 컴파일 설정
> tsconfig.json 파일은 컴파일 명령어를 매번 입력하지 않고 편리하게 사용할 수 있게 해주며 이 파일은 프로젝트의 루트 디렉토리에 설정된다.

**타입스크립트 프로젝트 생성**
```sh
$ mkdir ts-practice
$ cd ts-practice
$ npm init -y
```
ts-practice 폴더 안에 package.json 이라는 파일이 생성된다.

**타입스크립트 설치**

타입스크립트를 전역으로 설치하는 방법으로는 다음과 같다.
```sh
$ npm i -g typescript
$ tsc
```
전역에 설치하고 싶지 않다면 npx를 이용해서 다음 명령어를 이용할 수도 있다.
```sh
$ npx tsc
```

**설정 파일(`tsconfig.json`) 생성하기**
- tsconfig.json 파일 생성 방법
  - 프로젝트의 루트 디렉터리 위치에 직접 파일을 생성하고 컴파일 옵션(compilerOptions)을 설정하는 방법
  - `tsc --init`을 통해 기본 값이 설정되어 있는 tsconfig 파일을 자동으로 생성하는 방법

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
이외에도 더 다양한 옵션이 있으며, 필요한 경우 타입스크립트 공식 문서를 참조하거나 tsc를 초기화 후 생성되는 파일의 주석 내용을 참조하면 된다.

**files 속성**
타입스크립트 변환 명령어를 입력할 때마다 대상 파일의 경로를 지정하지 않고 설정 파일에 미리 정의할 수 있다.
```json
{
  "files" :["app.ts","./utils/math.ts"]
}
```

**include와 exclude 속성**
tsconfig.json에서 컴파일에 포함할 디렉토리와 파일 경로를 설정하거나 제외시킬 수 있는 설정으로 각 항목에는 glob 패턴을 사용해서 표기할 수 있다.

`*` : 0 이상의 모든 문자와 일치 (디렉토리 분리 기호 제외)
`?` : 1개 문자와 일치 (디렉토리 간의 분리기호 제외)
`**/` : 모든 하위 디렉토리까지 포함
```json
{
  // 컴파일 포함
  "include": [
    "src/**/*.tsx?"
  ],
  // 컴파일 제외
  "exclude" : [
    "node_modules",
    "build",
    "**/*.(spec|test).ts"
  ],
  // 컴파일 옵션
  "compilerOptions" : {...}
}
```
**extends 속성**
특정 타입스크립트 설정 파일에서 다른 타입스크립트 설정의 내용을 가져와 추가할 수 있는 속성으로 파일의 내용을 가져다가 덮어쓰거나 새로 정의할 수 있다.
```json
// config/base.json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```
```json
// tsconfig.json
{
  "extends": "./config/base"
}
```

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
```sh
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