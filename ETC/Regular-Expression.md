# 정규 표현식 : Regular Expression

> ZVON.org에서 정규 표현식에 대한 튜토리얼을 진행한 내용 입니다.

## 배우는 이유

- [ ] 사용자 입력이나 유효성 검사에 활용할 수 있다.
- [ ] 문자열의 처리를 유연하게 할 수 있다.

![1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dd200b6d-171d-46ea-9849-15ebf2258143/1.png)

- 오른쪽 내비게이션의 Page가 1~26까지 준비되어 있으며, 목차대로 공부하면서 예제를 직접 따라할 수 있도록 구성되어 있습니다.
- Source : 처리하고자 하는 문자열 세트
- Regular Expression : Source에 적용할 정규 표현식
- First match : 해당되는 첫 번째 키워드를 보여줌
- All matches : 해당하는 모든 키워드를 보여줌

## 목차

### Page 1 ~ 6 | 패턴 기본, 위치, 이스케이프, 모든 문자

### Page 1 : Case

Source : `Hello, world!`

```xml
<!-- Case 1 -->
Regular Expression:	Hello
	First match:	Hello, world!
	All matches:	Hello, world!

<!-- Case 2 -->
Regular Expression:	hello
	First match:	Hello, world!
	All matches:	Hello, world!
```

정규식은 대소문자를 구분하기 때문에 Case 1은 지정된 텍스트를 찾지만 Case 2는 못 찾는다.

### Page 2 : White Space

Source : `Hello, world!`

```xml
<!-- Case 1 -->
Regular Expression:	Hello, world
	First match:	Hello, world!
	All matches:	Hello, world!

<!-- Case 2 -->
Regular Expression:	Hello,    world
	First match:	Hello, world!
	All matches:	Hello, world!
```

공백 문자(공백, 탭, 새 줄) 또한 검색 패턴에 영향을 미친다. 특별한 문자가 없는 키워드는 지정된 키워드만 탐색하기 때문에 Case 2의 경우 결과를 찾을 수 없다.

### Page 3 : Location (`^` ,`$`)

Source : `who is who`

```xml
<!-- Case 1 -->
Regular Expression:	^who
	First match:	who is who
	All matches:	who is who

<!-- Case 2 -->
Regular Expression:	who$
	First match:	who is who
	All matches:	who is who
```

Case 1의 경우는 `^` 문자를 사용하여 줄의 시작 부분과 일치

Case 2의 경우는 `$` 문자를 사용하여 줄의 끝 부분과 일치

### Page 4 : Literal Value of a Special Character Escape (`\`)

Source : `$12$\-\$25$`

```xml
<!-- Case 1 -->
Regular Expression:	^$
	First match:	$12$ \-\ $25$
	All matches:	$12$ \-\ $25$

<!-- Case 2 -->
Regular Expression:	\$
	First match:	$12$ \-\ $25$
	All matches:	$12$ \-\ $25$

<!-- Case 3 -->
Regular Expression:	^\$
	First match:	$12$ \-\ $25$
	All matches:	$12$ \-\ $25$

<!-- Case 4 -->
Regular Expression:	\$$
	First match:	$12$ \-\ $25$
	All matches:	$12$ \-\ $25$

<!-- Case 5 -->
Regular Expression:	\\
	First match:	$12$ \-\ $25$
	All matches:	$12$ \-\ $25$
```

특수 문자의 리터럴 값이 필요한 경우 `\` 문자로 Escape 처리해야 한다. 일전에 사용한 `$`, `^` 등 혹은 `\` 를 문자로서 찾고자 한다면, Case 2, 3, 4, 5번 과 같은 방식을 사용한다.

### Page 5 : All Characters (`.`)

Source : `Regular expressions are powerful!!!`

```xml
<!-- Case 1 -->
Regular Expression:	.
First match:	Regular expressions are powerful!!!
All matches:	Regular expressions are powerful!!!

<!-- Case 2 -->
Regular Expression:	......
First match:	Regular expressions are powerful!!!
All matches:	Regular expressions are powerful!!!
```

`.` 문자는 모든 문자와 일치하는 키워드로 개수에 따라 일치하는 문자열의 수도 달라진다.

Case 2번의 경우 6개의 문자가 한 단위로 잡기 때문에 뒤에 5개의 문자가 오는 `ul!!!` 은 선택되지 않는다.

### Page 6 : The point Escape (`\.`)

Source : `O.K.`

```xml
<!-- Case 1 -->
Regular Expression:	.
	First match:	O.K.
	All matches:	O.K.

<!-- Case 2 -->
Regular Expression:	\.
	First match:	O.K.
	All matches:	O.K.

<!-- Case 3 -->
Regular Expression:	\..\.
	First match:	O.K.
	All matches:	O.K.
```

마찬가지로 `.` 문자도 리터럴 값으로 사용하기 위해서는 `\` 문자로 Escape 처리해야 한다.

### Page 7 ~ 10 | 문자 리스트, 서브 패턴

### Page 7 : List of Characters (`[]`)

Source : `How do you do?`

```xml
<!-- Case 1 -->
Regular Expression:	[oyu]
	First match:	How do you do?
	All matches:	How do you do?

<!-- Case 2 -->
Regular Expression:	[dH].
	First match:	How do you do?
	All matches:	How do you do?

<!-- Case 3 -->
Regular Expression:	[owy][yow]
	First match:	How do you do?
	All matches:	How do you do?
```

대괄호 `[]` 에 해당하는 문자 1개를 찾아주며, 문자 순서와 상관 없이 괄호 안의 문자열 중에 문자가 하나라도 일치하면 식은 유효하다.

### Page 8 : A Range of Characters (`[-]`)

Source : `ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789`

```xml
<!-- Case 1 -->
Regular Expression:	[C-K]
	First match:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	All matches:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789

<!-- Case 2 -->
Regular Expression:	[CDEFGHIJK]
	First match:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	All matches:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789

<!-- Case 3 -->
Regular Expression:	[a-d]
	First match:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	All matches:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789

<!-- Case 4 -->
Regular Expression:	[2-6]
	First match:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	All matches:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789

<!-- Case 5 -->
Regular Expression:	[C-Ka-d2-6]
	First match:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	All matches:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
```

문자의 범위는 `[-]` 로 표현할 수 있으며, Case 1과 Case 2의 결과는 서로 같은 결과를 의미한다. Case 5와 같이 한 번에 문자의 범위를 여러 범위로 지정할 수도 있다.

### Page 9 : Exclusion of Specified Character Ranges (`[^]`)

Source : `ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789`

```xml
<!-- Case 1 -->
Regular Expression:	[^CDghi45]
	First match:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	All matches:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789

<!-- Case 2 -->
Regular Expression:	[^W-Z]
	First match:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	All matches:	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
```

기존의 `^` 특수 문자를 `[]` 안에 사용하면 그 의미는 `Not` 인 부정의 의미를 갖는다. 지정된 문자 리스트 혹은 문자의 범위를 가진 리스트에서 제외된 문자를 선택한다.

### Page 10 : Sub Pattern (`|`)

Source : `Monday Tuesday Friday`

```xml
<!-- Case 1 -->
Regular Expression:	(on|ues|rida)
	First match:	Monday Tuesday Friday
	All matches:	Monday Tuesday Friday

<!-- Case 2 -->
Regular Expression:	(Mon|Tues|Fri)day
	First match:	Monday Tuesday Friday
	All matches:	Monday Tuesday Friday

<!-- Case 3 -->
Regular Expression:	..(id|esd|nd)ay
	First match:	Monday Tuesday Friday
	All matches:	Monday Tuesday Friday
```

서브 패턴을 사용하면 그것을 구분자로 삼아 그룹 안의 키워드에 포함되는 문자를 선택한다.

### Page 11 ~ 17 | 수량자

### Page 11 : Quantifier and Letters(`*`, `+`, `?`)

Source : `aabc abc bc`

```xml
<!-- Case 1 -->
Regular Expression:	a*b
	First match:	aabc abc bc
	All matches:	aabc abc bc

<!-- Case 2 -->
Regular Expression:	a+b
	First match:	aabc abc bc
	All matches:	aabc abc bc

<!-- Case 3 -->
Regular Expression:	a?b
	First match:	aabc abc bc
	All matches:	aabc abc bc
```

Case 1에서 `*` 수량자는 앞에 문자 `a`가 `0번 이상` 을 허용하기 때문에 a가 2번 오는 `aab` , 1번 오는 `ab`, 그리고 0번인 `b` 의 경우도 조건에 일치한다.

Case 2의 `+` 수량자는 `1번 이상`을 허용하며, Case 3의 `?` 수량자는 `0 또는 1번` 을 허용한다.

### Page 12 : Quantifiers and Special Characters(`*`)

Source : `-@- *** -- "*" -- *** -@-`

```xml
<!-- Case 1 -->
Regular Expression:	.*
	First match:	-@- *** -- "*" -- *** -@-
	All matches:	-@- *** -- "*" -- *** -@-

<!-- Case 2 -->
Regular Expression:	-A*-
	First match:	-@- *** -- "*" -- *** -@-
	All matches:	-@- *** -- "*" -- *** -@-

<!-- Case 3 -->
Regular Expression:	[-@]*
	First match:	-@- *** -- "*" -- *** -@-
	All matches:	-@- *** -- "*" -- *** -@-
```

### Page 13 : Quantifiers and Special Characters(`+`)

Source : `@@@- * ** - - "*" -- * ** -@@@-`

```xml
<!-- Case 1 -->
Regular Expression:	\*+
	First match:	-@@@- * ** - - "*" -- * ** -@@@-
	All matches:	-@@@- * ** - - "*" -- * ** -@@@-

<!-- Case 2 -->
Regular Expression:	-@+-
	First match:	-@@@- * ** - - "*" -- * ** -@@@-
	All matches:	-@@@- * ** - - "*" -- * ** -@@@-

<!-- Case 3 -->
Regular Expression:	[^ ]+
	First match:	-@@@- * ** - - "*" -- * ** -@@@-
	All matches:	-@@@- * ** - - "*" -- * ** -@@@-
```

### Page 14 : Quantifiers and Special Characters(`?`)

Source : `-XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-`

```xml
<!-- Case 1 -->
Regular Expression:	-X?XX?X
	First match:	--XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-@@-
	All matches:	--XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-@@-

<!-- Case 2 -->
Regular Expression:	-@?@?@?-
	First match:	--XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-@@-
	All matches:	--XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-@@-

<!-- Case 3 -->
Regular Expression:	[^@]@?@
	First match:	--XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-@@-
	All matches:	--XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-@@-
```

### Page 15 : Quantity Specifier (`{}`)

Source : `One ring to bring them all and in the darkness bind them`

```xml
<!-- Case 1 -->
Regular Expression:	.{5}
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them

<!-- Case 2 -->
Regular Expression:	[els]{1,3}
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them

<!-- Case 3 -->
Regular Expression:	[a-z]{3,}
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them
```

중괄호를 이용하면 판별할 문자의 개수를 지정할 수 있다. `{m}` 은 정확하게 m회를, `{m, n}` 의 경우 최소 m 부터 최대 n까지, `{m,}` 은 최소 m에 대해 지정할 수 있다.

### Page 16 : Substitution of Quantity Specifiers

Source : `AA ABA ABBA ABBBA`

```xml
<!-- Case 1 -->
Regular Expression:	AB*A
First match:	AA ABA ABBA ABBBA
All matches:	AA ABA ABBA ABBBA

<!-- Case 2 -->
Regular Expression:	AB{0,}A
First match:	AA ABA ABBA ABBBA
All matches:	AA ABA ABBA ABBBA

<!-- Case 3 -->
Regular Expression:	AB+A
First match:	AA ABA ABBA ABBBA
All matches:	AA ABA ABBA ABBBA

<!-- Case 4 -->
Regular Expression:	AB{1,}A
First match:	AA ABA ABBA ABBBA
All matches:	AA ABA ABBA ABBBA

<!-- Case 5 -->
Regular Expression:	AB?A
First match:	AA ABA ABBA ABBBA
All matches:	AA ABA ABBA ABBBA

<!-- Case 6 -->
Regular Expression:	AB{0,1}A
First match:	AA ABA ABBA ABBBA
All matches:	AA ABA ABBA ABBBA
```

중괄호를 통한 수량 지정 표기 방법을 이용하면 수량자의 문법 `*`, `+`, `?` 과 같이 사용할 수 있다. Case 1, 2의 경우 `*` 수량자에 대한 내용이고 Case 3, 4는 `+` 수량자를, Case 5, 6은 `?` 수량자에 대한 설명이다.

### Page 17 : Greedy and Lazy Quantifier (`.*`, `.+`, `.?` && `.*?`, `.+?`, `.??`)

Source : `One ring to bring them all and in the darkness bind them`

```xml
<!-- Case 1 -->
Regular Expression:	r.*
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them

<!-- Case 2 -->
Regular Expression:	r.*?
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them

<!-- Case 3 -->
Regular Expression:	r.+
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them

<!-- Case 4 -->
Regular Expression:	r.+?
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them

<!-- Case 5 -->
Regular Expression:	r.?
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them

<!-- Case 6 -->
Regular Expression:	r.??
	First match:	One ring to bring them all and in the darkness bind them
	All matches:	One ring to bring them all and in the darkness bind them
```

Case 1, 3, 5 는 Greedy Quantifier의 예문이고, Case 2, 4, 6은 Lazy Quantifier의 예문이다. Greedy Quantifier는 전체 길이를 대상으로 하기 때문에 모든 범위에 대해 처리를 하지만 Lazy Quantifier의 경우에는 최소의 길이를 대상으로 해서 처리하기 때문에 한정적으로 처리하고자 할 때는 후자의 방법을 선택한다.

수량자 `*`, `+`, `?` 의 뒤에 `?` 와 합쳐지면 앞에 있던 수량자의 의미가 최소의 의미로 변화되어

`.*?` 는 0개, `.+?` 는 1개, `.??` 는 0개를 의미하게 된다.

---

## 참조

- [Regular Expressions Tutorial](https://zvon.org/comp/r/tut-Regexp.html#intro)
