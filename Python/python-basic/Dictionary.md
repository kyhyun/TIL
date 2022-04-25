## 05. 사전 자료형(Dictionary)

- 순서와 상관 없이 키(Key)와 값(Value)의 쌍을 데이터로 가지는 자료형
  - 리스트와 튜플의 값을 순차적으로 저장하는 것과 대비되는 방법
- 변경 불가능한 자료형을 키(Key)로 사용할 수 있다.
- 해시 테이블을 이용하므로 데이터 조회 및 수정에 있어서 O(1)의 시간에 처리할 수 있다.

**< 사전 자료형 예제 >**

```python
data = dict()
data['사과'] = 'Apple'
data['바나나'] = 'Banana'
data['코코넛'] = 'Coconut'

print(data)

if '사과' in data:
  print("'사과'를 키로 가지는 데이터가 존재합니다.")
```

| 키(Key) | 값(Value) |
| ------- | --------- |
| 사과    | Apple     |
| 바나나  | Banana    |
| 코코넷  | Coconut   |

**< 실행 결과 >**

```python
{'사과' : 'Apple','바나나' : 'Banana','코코넛':'Coconut'}
"'사과'를 키로 가지는 데이터가 존재합니다."
```

### 사전 자료형 관련 메서드

- 키 데이터 추출 후 dict_keys 객체 반환 `keys`
- 값 데이터 추출 dict_values 객체 반환 `values`
  - 각 추출된 값들은 `list` 함수로 형 변환해서 리스트로 사용할 수 있다.
    **< 사전 자료형 관련 함수 예제 >**

```python
data = dict()
data['사과'] = 'Apple'
data['바나나'] = 'Banana'
data['코코넛'] = 'Coconut'

# 키 데이터만 담은 리스트
key_list = data.keys()
# 값 데이터만 담은 리스트
value_list = data.values()
print(key_list)
print(value_list)

# 각 키에 따른 값을 하나 씩 처리
for key in key_list:
  print(data[key])
```

**< 실행 결과 >**

```python
dict_keys(['사과', '바나나', '코코넛'])
dict_values(['Apple', 'Banana', 'Coconut'])
Apple
Banana
Coconut
```
