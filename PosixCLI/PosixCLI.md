# POSIX CLI

## 배우는 이유

  운영체제를 조작하기 위한 방법 중에는 크게 GUI와 CLI가 있습니다. 모두 아시겠지만 지금 컴퓨터를 보고 계신 화면 그 자체가 GUI (Graphic User Interface) 이고, 옛날 컴퓨터에서 볼법한 새까만 화면에 영어로 된 명령어로 컴퓨터를 조작하는 것을 CLI (Command Line Interface) 라고 보시면 편할 것 같습니다. 학습 난이도는 이 CLI 가 더 어렵고, 외워야 하는 내용도 있습니다.

  그럼에도 이 내용을 배우는 이유는 보다 구체적인 명령을 컴퓨터에게 쉽게 전달할 수 있고, 순차적인 명령을 내릴 수 있게 함으로써 자동화가 가능해지기 때문입니다. 그리고 GUI는 그 환경을 구축하기 위해 컴퓨터의 자원을 많이 사용하지만 CLI는 그것보다 훨씬 작은 자원으로 컴퓨터를 조작할 수 있다는 점에서 효율적인 상황을 고려할 때, 필요할 수 있습니다.

유닉스 계열의 컴퓨터들을 서로 동일한 방법으로 조작하기 위한 표준 POSIX(Portable Operating System Interface)를 통해서 Unix, Linux, MacOS를 모두 다룰 수 있게 되기 때문에 운영체제의 조작하는 폭이 넓어진다는 점에서 다양한 상황에 대비가 (2종이 아닌 1종 운전면허를 따는 느낌...?) 가능해집니다.


## 학습 내용

- [ ]  **File과 Directory의 조작(CRUD)**
- [ ]  **CLI에 대한 장점 이해하기**

## 실습 준비

POSIX 기반의 운영체제는 그냥 터미널에서 조작하면 사용할 수 있지만 저 같은 Non POSIX 기반의 운영체제 (Windows, IOS, Android)들은 POSIX 기반의 명령어를 사용하기 위해서는 두 가지 방법이 있습니다.

1. **Emulator 설치**
2. **POSIX Server 원격 제어 (SSH : Secure Shell)**

저는 이 중에서 Emulator를 설치해서 이용하려고 합니다. 현재는 검색 창에 `posix emulator for windows`검색하면 나오는 최신의 것을 이용하거나 git의 `git Bash` , 가상 머신 중 `ubuntu` 를 설치해서 터미널을 이용하는 방식 등이 있습니다.

---

## File과 Directory

|  | File | Directory |
| --- | --- | --- |
| Create | editor, touch | mkdir |
| Read | editor, cat, ls | ls |
| Update | editor, mv | mv |
| Delete | rm | rm |

---

### 경로 위치 파악 / 이동하기

- **현재 위치한 디렉터리 확인 →** `pwd` (Print Working Directory)
- **Root Directory(=최상위 디렉터리)** → `/`
- **Current Directory (=현재 디렉터리)** → `./`
- **Home Directory(처음 터미널 실행하면 위치하는 디렉터리)** → `/c/Users/yeong-hyeon kim`,
    - 사용자 마다 모두 다른 디렉터리를 가지고 있습니다.
- **디렉터리 이동** → `cd` (Change Directory)
    
    > **cd 뒤에 현재 디렉터리 위치를 생략하면 `./` (= 현재 디렉터리)가 묵시적으로 적용됩니다.**
    - `cd /` :  Root Directory 이동
    - `cd ~` : Home Directory 이동
    - `cd (./)(path)` : 해당 path 이동,
    - `cd "(./)(path)"` : 공백을 가진 path 이동
    
---

### 현재 Directory의 상태 보기 와 명령어의 형식

- **명령어 도움말 보기**
    - `(command) --help`  : Simple Manual 보기
    - `man command` : Manual 보기
- **빈 파일 생성** → `touch [FileName.Extension]`
    - 숨김 파일 → `[.FileName.Extension]` , `ls` 에서 보이지 않음
- **디렉터리 내 콘텐츠 목록 확인** → `ls` (List Directory Contents)<br>
    ![Untitled](https://user-images.githubusercontent.com/77887712/144636764-05151343-4f02-4d32-a2f8-6b4360310fc1.png)<br>
    
    - 디렉터리 내 상세 콘텐츠 목록 확인 → `ls -l` (List in Long Format)
    ![Untitled 1](https://user-images.githubusercontent.com/77887712/144636802-52bf0963-b02c-4bf6-af93-b7597ee963bf.png)<br>

    - 디렉터리 내 모든 콘텐츠 목록 확인(숨김 파일 포함) → `ls -a` (List in All Format)

```
💡 2개 이상의 속성은 띄어쓰기 혹은 속성을 합쳐서 표현할 수 있습니다.
```

ex ) 디렉터리 내 모든 상세 콘텐츠 목록 확인 (숨김 파일 포함)

- 띄어쓰기 표현 방법 : `ls -a -l` 혹은 `ls -l -a`
- 더해서 표현하는 방법 : `ls -al` 혹은 `ls -la`

---

### Directory의 CRUD

- **디렉터리 생성** : `mkdir [DirectoryName]` (Make Directory)
- **디렉터리 읽기** : `ls`
- **디렉터리 수정 :** `mv [CurrentDirectoryName] [ChangeDirectoryName]` (Move)
- **디렉터리 삭제** : `rm -r [DirectoryName]` (Remove)
    - 디렉터리가 한 번에 삭제되는 것을 막기 위한 안전 장치로 `-r` 속성을 추가해주어야 합니다.

---

### 절대 경로와 상대 경로 (Absolute & Relative Path)

> 홈 디렉터리 : `/c/Users/yeong-hyeon kim`

1. **절대 경로 :** 항상 명시되어 있는 위치로 결정되는 경로
- **최상위 디렉터리로 이동**: `cd /`
    - **결과** : `/`
- **명시된 절대 경로로 이동** : `cd (path)`

ex ) `/c/Users/yeong-hyeon kim/posix` 의 경로로 이동 : `cd /c/Users/yeong-hyeon kim/posix`

2. **상대 경로 :** 내가 어디인지 따라서 위치가 결정되는 경로
- **현재 위치(홈)에서 부모(=상위) 디렉터리로 이동** : `cd ../` **혹은** `cd ..`
    - **결과 :**  `/c/Users`
- **현재 위치에서 자식(=하위) 디렉터리로 이동** : `cd (./)(path)` 혹은 `cd "(./)(path)"`

ex ) `/c/Users`에서 `posix` 자식 디렉터리로 이동 → `cd "./yeong-hyeon kim/posix"`<br>
![Untitled 2](https://user-images.githubusercontent.com/77887712/144637034-95641455-6e7e-49fb-87e0-1bad58a25e9a.png)<br>

---

### File의 CRUD

- **파일 생성** : `nano` (text editor)
    - **빈 파일 생성** : `touch [FileName.Extension]`
- **파일 읽기 :** `ls [FileName.Extension]` 혹은 `nano [FileName.Extension]`
    - **Easy Read** :  `cat [FileName.Extension]`
- **파일 수정** : `mv [CurrentFileName] [ChangeFileName]`
- **파일 삭제** : `rm [FileName.Extension]`

---

### 구분자와 연산자

- `;` : 연속된 명령을 마치고 이어가기 위한 명령의 구분 역할을 수행
    
    ex ) `dummy` 디렉터리를 만들고, 그곳으로 이동해서 `hello.txt` 파일을 만들고, 다시 부모 디렉터리로 이동한 다음 파일의 하위 목록을 조회하는 명령어를 수행
    
    → `mkdir dummy;cd dummy;touch hello.txt;cd ..;ls -R`
    
- `&&` : 연속된 명령어 중 동작 가능한 명령어(=참인 경우)만을 수행해서 보다 안정적인 조작 가능
    
    ex ) `dummy` 디렉터리에서 이동할 때, 오타가 발생한다면 그 뒤에 명령어는 수행하지 않도록 처리
    
    → `mkdir dummy&&cd dumy&&touch hello.txt&&cd ..&&ls -R`<br>
    ![Untitled 3](https://user-images.githubusercontent.com/77887712/144637079-3c475bb6-c0b3-41dd-b54e-58fe6f4d0593.png)<br>

---

### 유용한 단축키

- **자동 완성** : `tab`
- **실행 취소** : `ctrl + c`
- **복사** : `ctrl + ins`
- **붙여 넣기** : `shift + ins`
- **터미널 내 스크롤 이동** :  `shift + ↑, ↓`
- **현재 입력 창으로 이동** :  `ctrl + q`

---

## 정리

프로그래밍 언어와 같이 순차적인 명령어를 주어 자동화 할 수 있고, CLI를 통해 컴퓨터에게 보다 풍부하고 정확한 의미를 전달할 수 있기 때문에 언어의 고유한 장점에 있어서 CLI를 배우는 것은 그만한 가치가 있다고 생각합니다.
