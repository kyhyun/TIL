# Git Basic

## 배우는 이유

예전에는 편집하기 전에 파일을 미리 복사해서 파일이나 폴더명 뒤에 편집 날짜나 버전 등을 붙여주는 식으로 관리했었지만, 이 방식으로 매번 복사하는 일은 번거롭기도 하고 실수하기도 쉽습니다.

<center><img src="https://user-images.githubusercontent.com/77887712/147036613-b738ab99-b805-4f09-8ba5-1fa6744b4f79.png" witdh="500px"></center>

위 그럼처럼 특정한 규칙 없이 이름을 기재한다면, 어느 파일이 최신인지, 또 파일의 어떤 부분이 변경된 것인지 파악하기 어렵습니다.

또 여러 명이 공동의 작업을 목적으로 공유 폴더를 통해 동시에 편집을 하면서 다른 사람이 변경하고 있던 내용을 지우거나 변경해서 문제를 일으키기도 합니다. Git은 이러한 문제를 해결하기 위해 만들어진 버전 관리 시스템 입니다.

## 학습 내용

- [ ] 버전 관리를 통해 프로젝트 및 학습 기록으로 활용
- [ ] 특정 상황에서 이전 분기로 백업
- [ ] 다양한 상황의 협업 도구로 활용

## 실습 준비 및 초기 설정

현재 제 PC가 Windows이므로 이 운영체제의 방식으로 실습 준비를 진행했습니다.

Git 웹 사이트에서 설치하고, `Git Bash` 파일을 실행하면, 정상적으로 설치 됐는지 확인할 수 있습니다.

```jsx
// 정상적인 설치 확인은 터미널(Git Bash)에서 version 명령어를 실행하여 확인
git --version
```

다음에는 기본적인 초기 설정으로 `Bash` 에서 다음과 같이 입력해 사용자 정보 설정(사용자 이름, 메일 주소)을 합니다.

```jsx
git config --list // git에 관련된 모든 환경 설정 확인
git config --global user.name "<github 계정의 사용자 이름>"
git config --global user.email "<github 계정의 메일 주소>"
```

이외에 Git의 출력 메시지 색상을 설정과 명령어들의 단축키 등을 설정할 수 있습니다.

```jsx
git config --global color.ui auto // git 출력 메시지 색상 설정
git config --global core.quotepath off // 한글 파일명 한국어로 표기하는 설정
git config --global core.editor <사용할 에디터> // 외부 editor와 연동
git config --global core.autocrlf true // OS(Windows, Mac)의 개행문자 호환 설정
gin config --global alias.<단축 명령어> <명령어> // 명령어(command)의 단축 명령어 설정

// Git 명령어에 대한 도움말 보기
git help <verb>
man git-<verb>
```

---

## 저장소 Repository

파일이나 폴더를 저장해두는 공간으로 Git 저장소에서는 파일이 변경 이력 별로 구분되기 때문에 내용 일부 문구가 조금이라도 다르면 서로 다른 파일로 인식되어 변경 사항 별로 구분해 저장할 수 있습니다. 크게 원격 저장소와 지역 저장소로 나뉩니다.

- **원격 저장소 Remote Repository**
  파일이 원격 저장소 전용 서버에서 관리되어 여러 사람이 함께 공유할 수 있는 저장소
- **지역 저장소 Local Repository**
  내 PC에 파일이 저장되는 개인 전용 저장소

> 평소 로컬 저장소에서 작업하다가 작업한 내용을 공유해야 할 때, 원격 저장소에 업로드합니다.

실습에 필요한 Git 저장소를 만드는 방법으로 어딘가 Git 저장소를 내 로컬 디렉토리에 clone 하는 방법과 내 로컬 디렉토리를 선택해서 Git 저장소로 지정하는 방법이 있습니다.

**기존 디렉토리를 Git 저장소로 만들기**

```jsx
//Windows OS 기준
mkdir projects
cd projects

// 위 경로에 저장소로써 필요한 뼈대 파일(.git) 하위 디렉토리 생성
git init
```

**기존 저장소를 Clone하기**

```xml
// 해당 저장소의 데이터를 모두 가져와서 가장 최선의 버전으로 Checkout
git clone <remote-url>
```

**원격 저장소 추가**

```xml
// 로컬 저장소를 원격 저장소와 연결
git remote add origin <remote-url>

// 원격저장소 url 변경
git remote set-url origin <remote-url>
```

---

## 공간

git에는 크게 세 공간으로 나누어져 있습니다.

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/148734171-08c204e6-8713-4a7c-b1db-b2334dbea2ae.png" width="500px"></p>

- **Working Directory ( 작업 디렉토리 )**
  - 파일을 추가, 수정, 삭제하는 공간으로 `.git` 디렉토리를 제외한 프로젝트 디렉토리 내의 모든 공간을 의미합니다.
- **Staging Area ( 인덱스, Index )**
  - 작업 디렉토리와 저장소 사이에 있는 공간으로 파일들이 커밋 되기 전에 모여있는 임시 저장 공간을 의미합니다. 모든 파일은 이 공간을 거쳐 작업 디렉토리로 돌아가거나 저장소로 이동하게 됩니다.
- **git Directory ( 저장소, Repository )**
  - 프로젝트의 메타 데이터와 객체 데이터베이스를 저장하는 공간을 의미합니다.

---

## 파일의 상태

작업 공간에서 파일은 크게 `Tracked` 와 `Untracked` 로 분류되고, 이 디렉토리에서 파일에 대한 추가, 수정, 삭제 등의 정보들을 관리하기 위해 스냅샷이라는 단위를 이용해서 커밋을 진행합니다.

`Tracked` 은 또 다시 `Unmodified`, `Modified`, `Staged`로 나뉘어집니다.

<center><img src="https://user-images.githubusercontent.com/77887712/147036203-535e9844-ccdd-475d-8dbd-b3a733419e96.png" width="500"></center>

- **untracked (추적되지 않음 = 관리 대상이 아닌)**
  - 작업 디렉토리에 있는 상태지만, 인데스나 저장소에 한번도 들어간 적이 없거나 예외로 `ignore` 상태의 파일의 상태를 의미합니다.
  - **ingored (무시됨)** : `.gitIgnore` 혹은 `.git/info/exclude` 에 설정된 패턴에 의해 파일 혹은 폴더가 무시되는 대상이다.
- **tracked (추적됨 = 관리 대상)**
  - **unmodified (수정되지 않음)** : 저장소에 커밋 된 파일 중 변경 사항이 없는 파일
  - **modified (수정됨)** : 커밋 된 파일 중 변경 사항이 발생한 파일
  - **staged/indexed (인덱싱됨)** : 수정된 파일이 인덱스에 포함된 파일

---

## 커밋 Commit

파일 및 폴더의 추가하거나 변경되는 사항을 저장소에 기록하는 것은 이 `커밋`을 통해서 이루어집니다. 이를 통해 이전 `커밋` 상태부터 현재 상태까지 변경 이력이 기록된 `커밋`이 만들어지기 때문에 시간 순으로 저장됩니다.

이 이력에는 영문/숫자로 이루어진 40자리의 고유 코드(Hash Code)가 붙게 되고 저장소에서는 이것을 보고 각 저장된 내역을 구분할 수 있습니다.

> ❗ 각 `커밋`에는 이력을 남길 수 있는 메시지를 작성할 수 있으며, 이는 특정한 의미를 갖는 업데이트 단위로 작업 별로 구분해야 추후에 이력을 통해 이전 변경 내용을 찾기 쉽습니다.

**메시지 작성 Tip**

```jsx
// Git에서 권장하는 메시지 형식은 아래와 같습니다.
<type>(<scope>): <subject> -- 헤더
<BLANK LINE> -- 빈 줄
<body> -- 본문
<BLANK LINE> -- 빈 줄
<footer> -- 바닥 글
```

`type` 은 해당 commit이 어떤 성격을 가졌는지 나타내며 보통 아래와 같은 종류가 있습니다.

```xml
1. feat : 새로운 기능 추가
2. fix : 버그
3. chore : 빌드, 패키지 매니저 등 (기타 변경 사항)
4. ci : CI 관련
5. docs : 문서
6. style : 코드 스타일 혹은 포맷 (코드 자체 변경이 없는 경우)
7. refactor : 코드 리팩토링
8. test : 테스트 코드
```

`body` 본문으로 헤더의 내용에 대한 자세한 설명을 작성합니다. (생략 가능)

`footer` 는 바닥글로 어떤 이슈에서 왔는지, 참조 정보를 추가하는 용도로 사용합니다.

**Commit 메시지의 7가지 규칙**

1. 제목과 본문을 빈 행으로 구분합니다.
2. 제목을 50글자 이내로 제한합니다.
3. 제목의 첫 글자는 대문자로 작성합니다.
4. 제목의 끝에는 마침표를 넣지 않습니다.
5. 제목은 명령문으로! 과거형을 사용하지 않습니다.
6. 본문의 각 행은 72글자 내로 제한합니다.
7. 어떻게 보다는 무엇과 왜를 설명합니다.

---

## 추가 정리

이전에 이 버전을 관리할 수 있는 프로그램은 이미 있었습니다. 중앙에서 버전을 관리할 있는 `CVCS`(Centralized Version Control System)로 **SubVersion(SVN)** 과 같은 프로그램을 사용했었습니다. 하지만 이것은 중앙에서 서버에 문제가 생기면 대처하기 힘들다는 점에서 분산으로 버전 관리를 하는 **Git**과 같은 `DVCS`(Distributed Version Control System)가 사용되고 있습니다.

## 참조

- [누구나 쉽게 이해할 수 있는 Git 입문 | Backlog](https://backlog.com/git-tutorial/kr/)

- [Git Book](https://git-scm.com/book/ko/v2)
