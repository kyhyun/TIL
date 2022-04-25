## 02. 문자열 자료형(String)

### 문자열의 사용 방법

- 문자, 단어 등으로 구성된 문자들의 집합을 다루는 자료형
- 문자열 변수 초기화는 큰따옴표`"` 혹은 작은따옴표`'`를 한다.
- 문자열 안에 큰따옴표나 작은따옴표가 포함되어야 하는 경우
  - 전체 문자열을 큰따옴표로 구성하는 경우, 내부에 작은따옴표를 포함할 수 있음
  - 전체 문자열을 작은따옴표로 구성하는 경우, 내부에 큰따옴표를 포함할 수 있음
  - 혹은 백슬래시`\`를 이용하면, 큰따옴표나 작은따옴표를 원하는 만큼 포함시킬 수 있음

**< 문자열 사용 예제 >**

```python
data = 'Hello World'
print(data)

data = "Don't you know \"Python\"?"
print(data)
```

**< 실행 결과 >**

```python
Hello World
Don't you know "Python"?
```

### 문자열 연산

- 문자열 값에 덧셈을 하게 되면 문자열이 더해져서 연결된다.
- 문자열 값에 양의 정수와 곱하는 경우, 문자열이 그 값만큼 여러 번 더해진다.
- 문자열에 대해서도 인덱싱과 슬라이싱을 이용할 수 있다.
  - 그렇지만 특정 인덱스의 값을 변경할 수 없다.(Immutable)

**< 문자열 연산 >**

```python
a = "Hello"
b = "World"
print(a + " " + b)

a = "String"
print(a * 3)

a = "ABCDEF"
print(a[2:4])

a = "Life is too short, You need Python"
print(a[0:5])
```

**< 실행 결과 >**

```python
Hello World
StringStringString
CD
Life
```

### 슬라이싱 문자열 나누기

- 문자열을 두 부분으로 나누는 기법으로 세미콜론`:`을 기준으로 문자열을 슬라이싱해서 값을 넣는다.
  **< 슬라이싱 문자열 나누기 예제 >**

```pyhton
a = "20010331Rainy"
date = a[:8] # 처음부터 a[7]까지
print(date)
weather = a[8:] # a[8]부터 마지막까지
print(weather)
```

**< 실행 결과 >**

```python
20010331
Rainy
```

### 문자열 관련 함수

- 문자 개수 세기 `count`

```python
# 문자열 count 함수 예제
a = 'hobby'
a.count('b')
# 실행 결과 : 문자열 중 문자 b의 개수를 반환
2
```

- 위치(인덱스 번호) 알려주기 `find`, `index`

```python
# find 함수 예제
a = "Python is best choice"
a.find('b')
# 실행 결과 : 문자열에서 b가 처음 나온 위치를 반환
10
a.find('k')
# 실행 결과 : 찾는 문자 혹은 문자열이 존재 하지 않는 경우 -1을 반환
-1

# index 함수 예제
a = "Life is too short"
a.index('t')
# 실행 결과 : 마찬가지로 처음 나온 위치를 반환
8
a.index('k')
# 실행 결과 : 찾는 문자나 문자열이 존재 하지 않는 경우 오류를 발생
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError : substring not found
```

- 문자열 삽입 `join`

```python
# join 함수 예제
a = ","
a.join('abcd')
# 실행 결과 : 문자열의 각 문자 사이에 구분자를 삽입한다.
'a,b,c,d'
```

- 소문자를 대문자로 바꾸기 `upper`

```python
# upper 함수 예제
a = 'hi'
a.upper()
# 실행 결과 : 문자열 전체를 대문자로 바꾸어 준다.
'HI'
```

- 대문자를 소문자로 바꾸기 `lower`

```python
# lower 함수 예제
a = 'HI'
a.lower()
# 실행 결과 : 문자열 전체를 소문자로 바꾸어 준다.
'hi'
```

- 왼쪽 공백 지우기 `lstrip`

```python
# lstrip 함수 예제
a = ' hi '
a.lstrip()
# 실행 결과 : 가장 왼쪽에 있는 연속된 공백을 모두 지운다.
'hi '
```

- 오른쪽 공백 지우기 `rstrip`

```python
# rstrip 함수 예제
a = ' hi '
a.rstrip()
# 실행 결과 : 가장 오른쪽에 있는 연속된 공백을 모두 지운다.
'  hi'
```

- 양쪽 공백 지우기 `strip`

```python
# strip 함수 예제
a = ' hi '
a.strip()
# 실행 결과 : 양쪽에 있는 연속된 공백을 모두 지운다.
'hi'
```

- 문자열 바꾸기 `replace`

```python
# replace 함수 예제
a = 'Life is too short'
a.replace("Life", "Your leg")
# 실행 결과 : 가장 왼쪽에 있는 한 칸 이상의 연속된 공백을 모두 지운다.
'Your leg is too short'
```

- 문자열 나누기 `split`

```python
# split 함수 예제
a = "Life is too short"
a.split()
# 실행 결과 : 값이 없는 경우 공백을 기준으로 문자열을 나눔
['Life', 'is', 'too', 'short']

a = "a:b:c:d"
a.split(':')
# 실행 결과 : : 기호를 기준으로 문자열 나눔
['a', 'b'. 'c'. 'd']
```
