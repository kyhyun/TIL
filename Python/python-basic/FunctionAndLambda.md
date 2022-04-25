## 10. 함수와 람다 표현식 (Function and Lambda Expression)

### 10.1 함수

- 특정한 작업을 하나의 단위로 묶어 놓은 것을 의미한다.
- 불필요한 소스코드의 반복을 줄일 수 있다.

### 함수의 종류

- 내장 함수 : 파이썬이 기본적으로 제공하는 함수
- 사용자 정의 함수 : 개발자가 직접 정의하여 사용할 수 있는 함수

### 함수 정의하기

- 매개변수(Parameter) : 함수 내부에서 사용하는 변수
- 반환 값(Return Value): 함수에서 처리된 결과를 반환
- 인자(Arguments) : 함수를 호출할 때, 내부에 사용하기 위헤 넣는 값
- 이 값들은 옵션으로써 필요한 경우에만 사용한다.

```python
def 함수명(매개변수):
  실행할 소스코드
  return 반환 값
```

**< 함수 사용 예시 >**

```python
# 더하기 함수 예시 1
def add(a, b):
  return a + b

print(add(3, 7))

# 더하기 함수 예시 2
def add(a, b):
  print("함수의 결과: ", a + b)

add(3, 7)
```

**< 실행 결과 >**

```python
# 더하기 함수 에시 1
10

# 더하기 함수 예시 2
함수의 결과 : 10
```

### 파라미터 지정하기

- 파라미터의 변수를 직접 지정할 수 있다.
  - 매개변수의 순서가 달라도 상관 없다.

**< 파라미터 지정하기 사용 예제 >**

```python
def add(a, b):
  print('함수의 결과:', a + b)

add(b = 3, a = 7)

# 실행 결과
함수의 결과 : 10
```

### global 키워드

- 해당 키워드로 지정된 변수는 내부에 지역 변수를 만들지 않고, 함수 바깥에 선언된 변수를 바로 참조하게 된다.
  - 전역에 있는 변수를 단순히 참조해서 `print` 등의 출력 및 연산 그리고 리스트 내부 메서드로 값을 넣는 것은 가능하다.
  - 하지만 전역에 있는 변수에 참조되고 있는 내부의 값을 직접 변경하거나 새로운 값으로 할당하는 경우 에러를 발생시킨다.
- 전역과 지역 내부에 동일한 이름의 변수가 존재한다면, 함수는 내부에 있는 지역 변수를 우선적으로 처리한다.

**< global 키워드 사용 예제 >**

```python
a = 0

def func():
  global a
  a += 1

for i in range(10):
  func()

print(a)

# 실행 결과
10
```

### 여러 개의 반환 값

- 파이썬의 함수는 여러 개의 반환 값을 가질 수 있다.
  - Packing : 여러 개의 변수가 하나로 묶어서 한 번에 반환된다.
  - Unpacking : 함수를 호출하는 측면에서 반환 된 값들을 특정 변수에 각각 할당한다.

```python
def operator(a, b):
  add_var = a + b
  substract_var = a - b
  multiply_var = a * b
  divide_var = a / b
  return add_var, substract_var, multiply_var, divide_var

a, b, c, d = operator(7, 3)
print(a, b, c, d)
```

### 10.2 람다 표현식 (Lambda Expression)

- 특정한 기능을 수행하는 함수를 간단하게 작성할 수 있게 해주는 표현식
- `(lambda 매개변수 : 반환 값)(인자 값)`
  - **< 람다 표현식 예제 >**

```python
def add(a ,b):
  return a + b

# 일반적인 add() 메서드 사용
print(add(3, 7))

# 람다 표현식으로 구현한 add() 메서드
print((lambda a, b: a + b)(3,7))
```

**< 실행 결과 >**

```python
10
10
```

### 람다 표현식 예시 : 내장 함수에서 자주 사용하는 람다 함수

**< 람다 표현식 예시 - sort, sorted 정렬 함수의 정렬 기준을 정하는 경우 >**

```python
array = [('홍길동', 50), ('이순신' , 32), ('아무개', 74)]

def my_key(x):
  return x[1]

print(sorted(array, key=my_key))
print(sorted(array, key=lambda x: x[1]))
```

< 실행 결과 >

```python
[('이순신', 32), ('홍길동', 50), ('아무개', 74)]
[('이순신', 32), ('홍길동', 50), ('아무개', 74)]
```

**< 람다 표현식 예시 - 여러 개의 리스트에 함수를 적용하는 경우 >**

```python
list1 = [1, 2, 3, 4, 5]
list2 = [6, 7, 8, 9, 10]

result = map(lambda a, b: a + b, list1, list2)

print(list(result))
```

< 실행 결과 >

```python
[7, 9, 11, 13, 15]
```
