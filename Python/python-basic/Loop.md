## 09. 반복문 (Loop)

- 특정한 소스코드를 반복적으로 실행하고자 할 때 사용하는 문법
- 대표적으로 `while`과 `for`이 있으며, 어떤 것을 사용해도 상관 없다.
  - 주어진 반복 조건이 명시가 되어 있는 경우 `for`이 보다 적합하고, 알 수 없는 경우 `while`을 사용하는게 일반적이다.

### 반복문 : while

**< while문 사용 예시 >**

```python
# 1부터 9까지 홀수의 합 구하기
i = 1
result = 0

# i 가 9보다 작거나 같을 때 아래 코드를 반복적으로 실행
while i <= 9:
  if i % 2 == 1:
    result += i
  i += 1

print(reulst)
```

**< 실행 결과 >**

```python
25
```

### 무한 루프

- 반복 조건이 끝나지 않아 끊임없이 반복되는 반복 구문을 말한다.
  - 반복문을 작성한 뒤에는 항상 반복문의 종료 조건으로 나올 수 있는지 고려해야 한다.

**< 무한루프 예시 >**

```python
x = 10

while x > 5:
  print(x)
```

**< 실행 결과 >**

```
10
10
10
...
(중략)
```

### 반복문 : for

- 특정한 변수를 이용하여 `in` 뒤에 오는 데이터(리스트, 튜플 등)에 포함되어 있는 원소를 첫 번째 인덱스부터 차례대로 하나씩 방문한다.

```python
for 변수 in 리스트:
  실행할 소스코드
```

**< for문 사용 예시 >**

```python
array = [9, 8, 7, 6, 5]

for x in array:
  print(x)
```

**< 실행 결과 >**

```python
9
8
7
6
5
```

- for문에서 연속적인 값을 차례대로 순회할 때는 `range` 함수를 사용한다.
  - range(시작 값, 끝 값 + 1) 형태로 사용한다.
  - 인자를 하나만 넣으면 자동으로 시작 값은 0으로 된다.

```python
result = 0

# i 는 1부터 9까지의 모든 값을 순회
for i in range(1, 10):
  result += i
print(result)

# 실행 결과
45
```

### continue 키워드

- 반복문에서 남은 코드의 실행을 건너뛰고, 다음 반복을 진행하고자 할 때 사용한다.

**< continue 키워드 사용 예제 >**

```python
result = 0

for i in range(1, 10):
  if i % 2 == 0:
    continue
  result += i
print(result)
```

**< 실행 결과 >**

```python
25
```

### break 키워드

- 반복문을 즉시 탈출하고자 할 때 사용한다.

**< break 키워드 사용 예제 >**

```python
i = 1
while True:
  print("현재 i의 값 ; ", i)
  if i == 5:
    break;
  i += 1
```

**< 실행 결과 >**

```python
현재 i의 값 : 1
현재 i의 값 : 2
현재 i의 값 : 3
현재 i의 값 : 4
현재 i의 값 : 5
```

**< 반복문 추가 예제 1 >**

```python
scores = [90, 85, 77, 65, 97]

for i in ragne(5):
  if scores[i] >= 80:
    print(i + 1, "번 학생은 합격입니다.")
```

**< 실행 결과 >**

```python
1 번 학생은 합격입니다.
2 번 학생은 합격입니다.
5 번 학생은 합격입니다.
```

**< 반복문 추가 예제 2 >**

```python
scores = [90, 85, 77, 65, 97]
cheating_student_liet = {2, 4}

for i in range(5):
  if i + 1 in cheating_student_list:
    continue
  if scroes[i] >= 80:
    print(i + 1, "번 학생은 합격입니다.")
```

**< 실행 결과 >**

```python
1 번 학생은 합격입니다.
5 번 학생은 합격입니다.
```

**< 반복문 추가 예제 3 >**

```python
for i in range(2, 10):
  for j in range(1, 10):
    print(i, "X", j, "=", i * j)
  print()
```

**< 실행 결과 >**

```python
2 X 1 = 2
2 X 2 = 4
2 X 3 = 6
2 X 4 = 8
2 X 5 = 10
2 X 6 = 12
2 X 7 = 14
2 X 8 = 16
2 X 9 = 18

3 X 1 = 3
3 X 2 = 6
3 X 3 = 9
3 X 4 = 12
...
(중략)
```
