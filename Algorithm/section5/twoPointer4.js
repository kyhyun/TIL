// 4. Efficiency(Two Pointer Algorithm) : 연속 부분 수열 2
function solution(m, arr){
  let answer=0, lt = 0, sum = 0;
  const n = arr.length;
  
  for(let rt = 0; rt < n; rt++) {
    sum += arr[rt];
    // sum이 m보다 크면 lt만큼 sum에서 감산하고, 끝에 추가된 연속 부분 수열의 인덱스를 1 증가시킨다. 
    while(sum > m){
      sum -= arr[lt++];
    }
    // 추가된 숫자를 포함하는 연속 부분 수열을 구한다.
    answer += rt - lt + 1;
  }
  return answer;
}

let a=[1, 3, 1, 2, 3];
console.log(solution(5, a)); // 10