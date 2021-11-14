// 2. Efficiency(Two Pointer Algorithm) : 공통 원소 구하기
function solution(arr1, arr2){
  let answer=[];
  let n = arr1.length; // 5
  // 1) 반복문을 통해서 공통 원소를 answer배열에 push
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      if(arr1[i] === arr2[j]) answer.push(arr1[i]);
    }
  }

  // 2) 오름차순 정렬 처리
  answer = answer.sort((a, b) => a-b).join(' ');
  return answer;
}

function solution2 (arr1, arr2){
  let answer= [];
  let n = arr1.length;
  let m  = arr2.length;
  let p1 = 0, p2 = 0;

  // 두 배열의 오름차순 정렬을 해준다.
  arr1.sort((a,b) => a - b);
  arr2.sort((a,b) => a - b);

  // 두 포인터 중에 어느 한 쪽의 순회가 종료된다면, 해당 반복문을 종료한다.
  while(p1 < n && p2 < m) {
    if(arr1[p1] === arr2[p2]) {
      answer.push(arr1[p1]);
      p2++;
    } else if(arr1[p1] < arr2[p2]) p1++;
    else p2++;
  }
  return answer;
}
let a=[1, 3, 9, 5, 2];
let b=[3, 2, 5, 7, 8];
console.log(`my solution : ${solution(a, b)}`); // 시간 복잡도 O(n^2)
console.log(`two pointer solution : ${solution2(a, b)}`); // 시간 복잡도 O(n + m) -> O(n)