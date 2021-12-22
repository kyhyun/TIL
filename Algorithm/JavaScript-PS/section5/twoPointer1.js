// 1. Efficiency(Two Pointer Algorithm) : 두 배열 합치기
// 1) 메서드를 이용한 방법
function solution(arr1, arr2){
  let answer=[];
  answer = arr1.concat(...arr2).sort((a, b)=>a-b);
  return answer;
}

// 2) Two Pointer를 이용한 방법
function solution2(arr1, arr2){
  let answer=[];
  let n = arr1.length;
  let m = arr2.length;
  let p1 = 0, p2 = 0;

  // p1과 p2가 각 배열의 길이의 조건을 한 쪽이 넘을 때 까지 반복
  while(p1 < n && p2 < m) {
    // 두 배열 중 작은 값을 answer에 넣고 포인터를 증가 시킨다.
    if(arr1[p1] <= arr2[p2]) answer.push(arr1[p1++]);
    else answer.push(arr2[p2++]);
  }
  // 조건을 못충족한 배열에 대해 남은 값을 answer에 넣고 포인터를 증가시킨다.
  while(p1 < n) answer.push(arr1[p1++]);
  while(p2 < m) answer.push(arr2[p2++]);
  return answer;
}

let a=[1, 3, 5];
let b=[2, 3, 6, 7, 9];
console.log(`used functions : ${solution(a, b)}`);
console.log(`two pointer method : ${solution2(a, b)}`); 