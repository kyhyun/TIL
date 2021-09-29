# 에라토스테네스의 체 ( 소수 개수 구하기 )
n = int(input())
count = 0

# 에라토스테네스의 체 초기화: n개 요소에 True 설정(소수로 간주)
array = [True for i in range(n+1)]

for i in range(2, int(n**0.5) + 1):
  # i가 소수인 경우, 그의 배수들을 sqrt(n)까지 제거한다. 
    if array[i] == True:
        j = 2
        while i * j <= n:
            array[i * j] = False
            j += 1

# 소수 개수 산출
for i in range(2, n+1):
    if array[i]:
        count += 1
print(count)
