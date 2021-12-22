// 5. 완전탐색(Brute Force) : K 번째 큰 수

function solution(n, k, card){
  let answer = 0;
  let tmp = new Set();

  // n개의 카드 중 3개의 카드를 뽑는다. (삼중 for문 : 10C3)
  for(let i = 0; i < n; i++){ // n-2
    for(let j = i + 1; j < n; j++){ // n-1
      for(let s = j + 1; s < n; s++){
        tmp.add(card[i]+ card[j] + card[s]);
      }
    }
  }
  let a = Array.from(tmp).sort((a, b) => b-a);
  answer = a[k-1]; // 내림차순으로 정렬된 a 배열에, a[k-1]번째 큰 숫자를 answer에 할당
  return answer;
}
let arr=[13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
console.log(solution(10, 3, arr)); // 143