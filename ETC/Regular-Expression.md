# 정규 표현식 : Regular Expression

> ZVON.org에서 정규 표현식에 대한 튜토리얼을 진행한 내용 입니다.

## 배우는 이유

- [ ] 사용자 입력이나 유효성 검사에 활용할 수 있다.
- [ ] 문자열의 처리를 유연하게 할 수 있다.

<img src="https://user-images.githubusercontent.com/77887712/147387840-03eaa364-90eb-408f-8e1e-9604d45fb7cc.png" width="500">

- 오른쪽 내비게이션의 Page가 1~26까지 준비되어 있으며, 목차대로 공부하면서 예제를 직접 따라할 수 있도록 구성되어 있습니다.
- Source : 처리하고자 하는 문자열 세트
- Regular Expression : Source에 적용할 정규 표현식
- First match : 해당되는 첫 번째 키워드를 보여줌
- All matches : 해당하는 모든 키워드를 보여줌

### Page 1 : Case

Source : `Hello, world!`

![image](https://user-images.githubusercontent.com/77887712/147521858-02869007-0018-4698-909f-8341ef8d49a5.png)

정규식은 대소문자를 구분하기 때문에 Case 1은 지정된 텍스트를 찾지만 Case 2는 못 찾는다.

### Page 2 : White Space

Source : `Hello, world!`

![image](https://user-images.githubusercontent.com/77887712/147521943-46f0869a-6e69-4d43-a306-0a32cea462e9.png)

공백 문자(공백, 탭, 새 줄) 또한 검색 패턴에 영향을 미친다. 특별한 문자가 없는 키워드는 지정된 키워드만 탐색하기 때문에 Case 2의 경우 결과를 찾을 수 없다.

### Page 3 : Location (`^` ,`$`)

Source : `who is who`

![image](https://user-images.githubusercontent.com/77887712/147521995-f078fee6-3bf0-4067-a186-8a5d275e07e8.png)

Case 1의 경우는 `^` 문자를 사용하여 줄의 시작 부분과 일치

Case 2의 경우는 `$` 문자를 사용하여 줄의 끝 부분과 일치

### Page 4 : Literal Value of a Special Character Escape (`\`)

Source : `$12$\-\$25$`

![image](https://user-images.githubusercontent.com/77887712/147522047-80ccd6b0-7bbc-4b38-99de-1d0e64da9452.png)

특수 문자의 리터럴 값이 필요한 경우 `\` 문자로 Escape 처리해야 한다. 일전에 사용한 `$`, `^` 등 혹은 `\` 를 문자로서 찾고자 한다면, Case 2, 3, 4, 5번 과 같은 방식을 사용한다.

### Page 5 : All Characters (`.`)

Source : `Regular expressions are powerful!!!`

![image](https://user-images.githubusercontent.com/77887712/147522088-59b403ce-f951-4b1e-b082-01f3e5a1eea5.png)

`.` 문자는 모든 문자와 일치하는 키워드로 개수에 따라 일치하는 문자열의 수도 달라진다.

Case 2번의 경우 6개의 문자가 한 단위로 잡기 때문에 뒤에 5개의 문자가 오는 `ul!!!` 은 선택되지 않는다.

### Page 6 : The point Escape (`\.`)

Source : `O.K.`

![image](https://user-images.githubusercontent.com/77887712/147522135-3fed95c7-aab6-456b-b526-eaa0eeb4779a.png)

마찬가지로 `.` 문자도 리터럴 값으로 사용하기 위해서는 `\` 문자로 Escape 처리해야 한다.

### Page 7 : List of Characters (`[]`)

Source : `How do you do?`

![image](https://user-images.githubusercontent.com/77887712/147522207-b2e94af4-6e39-4586-8084-5cb7fefb3918.png)

대괄호 `[]` 에 해당하는 문자 1개를 찾아주며, 문자 순서와 상관 없이 괄호 안의 문자열 중에 문자가 하나라도 일치하면 식은 유효하다.

### Page 8 : A Range of Characters (`[-]`)

Source : `ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789`

![image](https://user-images.githubusercontent.com/77887712/147522253-c1a28857-00b9-4a57-a03c-960da3a4f2ed.png)

문자의 범위는 `[-]` 로 표현할 수 있으며, Case 1과 Case 2의 결과는 서로 같은 결과를 의미한다. Case 5와 같이 한 번에 문자의 범위를 여러 범위로 지정할 수도 있다.

### Page 9 : Exclusion of Specified Character Ranges (`[^]`)

Source : `ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789`

![image](https://user-images.githubusercontent.com/77887712/147522308-cae3f64e-e7e4-4f6d-b01a-cf39badf5e08.png)

기존의 `^` 특수 문자를 `[]` 안에 사용하면 그 의미는 `Not` 인 부정의 의미를 갖는다. 지정된 문자 리스트 혹은 문자의 범위를 가진 리스트에서 제외된 문자를 선택한다.

### Page 10 : Sub Pattern (`|`)

Source : `Monday Tuesday Friday`

![image](https://user-images.githubusercontent.com/77887712/147522352-6a06e6e3-49b8-405c-a13d-7d715966741a.png)

서브 패턴을 사용하면 그것을 구분자로 삼아 그룹 안의 키워드에 포함되는 문자를 선택한다.

### Page 11 : Quantifier and Letters(`*`, `+`, `?`)

Source : `aabc abc bc`

![image](https://user-images.githubusercontent.com/77887712/147522385-3aa57c08-e825-4d1a-9e2e-827556519b0b.png)

Case 1에서 `*` 수량자는 앞에 문자 `a`가 `0번 이상` 을 허용하기 때문에 a가 2번 오는 `aab` , 1번 오는 `ab`, 그리고 0번인 `b` 의 경우도 조건에 일치한다.

Case 2의 `+` 수량자는 `1번 이상`을 허용하며, Case 3의 `?` 수량자는 `0 또는 1번` 을 허용한다.

### Page 12 : Quantifiers and Special Characters(`*`)

Source : `-@- *** -- "*" -- *** -@-`

![image](https://user-images.githubusercontent.com/77887712/147522421-97283941-f903-416f-ae3c-fa6305811799.png)

### Page 13 : Quantifiers and Special Characters(`+`)

Source : `@@@- * ** - - "*" -- * ** -@@@-`

![image](https://user-images.githubusercontent.com/77887712/147522450-268b5b19-f432-4248-a3c5-47345ed3846b.png)

### Page 14 : Quantifiers and Special Characters(`?`)

Source : `-XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-`

![image](https://user-images.githubusercontent.com/77887712/147522482-8d76bdea-910f-4839-b4e8-72f9e453b8fc.png)

### Page 15 : Quantity Specifier (`{}`)

Source : `One ring to bring them all and in the darkness bind them`

![image](https://user-images.githubusercontent.com/77887712/147522520-da5d3ef3-1f15-4217-9669-2f08fb8d15b9.png)

중괄호를 이용하면 판별할 문자의 개수를 지정할 수 있다. `{m}` 은 정확하게 m회를, `{m, n}` 의 경우 최소 m 부터 최대 n까지, `{m,}` 은 최소 m에 대해 지정할 수 있다.

### Page 16 : Substitution of Quantity Specifiers

Source : `AA ABA ABBA ABBBA`

![image](https://user-images.githubusercontent.com/77887712/147522628-894b7f4a-9176-44e2-830c-c4aca6bc8222.png)

중괄호를 통한 수량 지정 표기 방법을 이용하면 수량자의 문법 `*`, `+`, `?` 과 같이 사용할 수 있다. Case 1, 2의 경우 `*` 수량자에 대한 내용이고 Case 3, 4는 `+` 수량자를, Case 5, 6은 `?` 수량자에 대한 설명이다.

### Page 17 : Greedy and Lazy Quantifier (`.*`, `.+`, `.?` && `.*?`, `.+?`, `.??`)

Source : `One ring to bring them all and in the darkness bind them`

![image](https://user-images.githubusercontent.com/77887712/147522702-8d49fadd-68f5-4611-b261-44199482a1a8.png)

Case 1, 3, 5 는 Greedy Quantifier의 예문이고, Case 2, 4, 6은 Lazy Quantifier의 예문이다. Greedy Quantifier는 전체 길이를 대상으로 하기 때문에 모든 범위에 대해 처리를 하지만 Lazy Quantifier의 경우에는 최소의 길이를 대상으로 해서 처리하기 때문에 한정적으로 처리하고자 할 때는 후자의 방법을 선택한다.

수량자 `*`, `+`, `?` 의 뒤에 `?` 와 합쳐지면 앞에 있던 수량자의 의미가 최소의 의미로 변화되어

`.*?` 는 0개, `.+?` 는 1개, `.??` 는 0개를 의미하게 된다.

### Page 18 : Word Character Class (`\w`)

Source : `A1 B2 c3 d_4 e:5 ffGG77--__--`

![image](https://user-images.githubusercontent.com/77887712/147522752-836e677e-e9ba-4566-9e31-14f2cd2c5d31.png)

`\w` 는 모든 영문(대,소) + 숫자 + `_` 와 일치한다. 간혹 언어마다 이 약어가 지원되지 않을 수 있으며, 이 경우 Case 5번과 같은 표현식으로 대체해서 사용할 수 있다.

### Page 19 : Non Word Character Class (`\W`)

Source : `AS _34:AS11.23 @#$ %12^*`

![image](https://user-images.githubusercontent.com/77887712/147522935-cae36073-3cdf-4cbd-a697-4af6ac6d438c.png)

`\W` 는 영문(대,소) + 숫자 + `_` 를 제외한 모든 문자와 일치하며, Case 1과 Case 2는 서로 비교하는 대조군이고, Case 3은 Case 1의 표현식을 표현하는 또 다른 방법이다.

### Page 20 : Space and Non Space Character Class (`\s` ,`\S`)

Source : `Ere iron was found or tree was hewn, When young was mountain under moon; Ere ring was made, or wrought was woe, It walked the forests long ago.`

![image](https://user-images.githubusercontent.com/77887712/147522975-7085ade3-9db1-4ffe-84d2-9722e4249bb3.png)

`\s` 는 공백, 새 줄 및 탭의 공백 문자와 일치하며, `\S` 는 공백 문자가 아닌 문자와 일치한다.

### Page 21 : Digit and Non Digit Character Class (`\d`, `\D`)

Source : `Page 123; published: 1234 id=12#24@112`

![image](https://user-images.githubusercontent.com/77887712/147523023-ceedbaf2-69f5-461c-a741-70e62ccc0ecc.png)

`\d`는 임의의 숫자와 일치하고, `\D` 는 그 외의 모든 것과 일치한다. 마찬가지로 해당 언어가 이 약어를 지원하지 않는다면 Case 3번과 같이 사용할 수 있다.

### Page 22 : Word Boundary Class (`\b`)

Source : `Ere iron was found or tree was hewn, When young was mountain under moon; Ere ring was made, or wrought was woe, It walked the forests long ago.`

![image](https://user-images.githubusercontent.com/77887712/147523067-f43ce34c-65c7-49d2-93a4-04244ef4704f.png)

단어의 경계와 일치하며, `\w` 와 `\W` 두 문자 사이의 점으로 정의된다.

### Page 23 : Non Word Boundary Class (`\B`)

Source : `Ere iron was found or tree was hewn, When young was mountain under moon; Ere ring was made, or wrought was woe, It walked the forests long ago.`

![image](https://user-images.githubusercontent.com/77887712/147523137-c3be7356-0417-4427-8f1f-6dc3c3f0204e.png)

`\b`가 일치하지 않은 것(비 단어 경계)과 일치하며, `\w` 와 `\W` 두 문자 사이의 점으로 정의된다.

### Page 24 : The Beginning and End of String(`\A`, `\Z`)

Source : `Ere iron was found or tree was hewn, When young was mountain under moon; Ere ring was made, or wrought was woe, It walked the forests long ago.`

![image](https://user-images.githubusercontent.com/77887712/147523181-43229c74-df16-455a-8397-918ace741eb8.png)

`^`과 `$`의 기능과 유사하지만 결정적으로 `multiline`에서 차이가 있다. `\A` 와 `\Z`는`multiline`에서도 전체 문장의 시작 혹은 끝을 선택하는 반면 `^`와 `$`는 라인마다 시작 혹은 끝에 존재하는 요소를 모두 탐색한다.

### Page 25 : Forward Navigation(`(?=<pattern>)`)

Source : `AAAX---aaax---111`

![image](https://user-images.githubusercontent.com/77887712/147523238-766ed546-f7c0-4bf0-b30a-ad0178faca4f.png)

`(?=<pattern>)` 은 앞에서 키워드를 탐색하면서 키워드를 발견하면 즉시 탐색을 중단하고, 그 키워드 이전까지 결과를 반영한다. Case 1의 경우 `(?=X)` 으로 X를 앞에서 탐색하기 시작하고 중간에 X를 발견하면서 그 앞에 있던 문자인 `AAA` 까지만 결과로 반영되는 것을 볼 수 있다.

### Page 26 : Search Backwards(`(?!<pattern>)`)

Source : `AAAX---AAA`

![image](https://user-images.githubusercontent.com/77887712/147523269-3f94b26f-3695-47d8-b95f-0e29570baaf8.png)

`(?!<pattern>)` 도 이와 유사하게 앞에서 키워드를 탐색하여 키워드를 발견하면 탐색을 중단하고, 그 키워드의 이후 결과를 반영한다. Case 1의 경우 `(?!X)` 으로 X를 앞에서 탐색하다가 중간에 X를 발견하면서 그 뒤에 있는 문자인 `AAA` 까지만 결과로 반영되는 것을 볼 수 있다.

---

## 참조

- [Regular Expressions Tutorial | zvon.org](https://zvon.org/comp/r/tut-Regexp.html#intro)
- [RegExr: Learn, Build, & Test RegEx | regexr.com](https://regexr.com/)
