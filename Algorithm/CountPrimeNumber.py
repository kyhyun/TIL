# 에라토스테네스의 체
n = int(input())

# True로 리스트들을 담아서 초기화
array = [True for i in range(n+1)]

# 반복을 하는데, i가 sqrt(n)까지 인덱싱해야하므로 아래와 같이 작성 
for i in range(2, int(n**0.5)+1):
  if array[i]==True: # 인덱싱한 값이 True라면
    for j in range(i+i, n, i): # 해당 i의 배수에 대하여, False를 부여한다.
      array[j] = False

# 소수 개수 출력
answer = [i for i in range(2, n+1) if array[i] == True] # 나머지 True가 된 목록들을 뽑는다.
print(answer)
print(len(answer)) # 그 목록의 개수를 더해서 출력한다.
