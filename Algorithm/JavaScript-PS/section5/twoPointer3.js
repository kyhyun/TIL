// 3. Efficiency(Two Pointer Algorithm) : 연속 부분 수열 1
function solution(m, arr){
  let result = [];
  let lt = 0, rt = 0, sum = 0, answer = 0;
  const n = arr.length;

  // rt : sum의 값을 증가시키면서 m과 일치하는지 확인
  // lt : sum의 값을 감소시키면서 m과 일치하는지 확인
  while(rt < n){
    if(sum === m) {
      result = arr.slice(lt, rt).join(' ');
      console.log(result);
      sum -= arr[lt++];
      answer++;
    } else {
      if(sum < m) sum += arr[rt++];
      if(sum > m) sum -= arr[lt++];
    }
  }
  return answer;
}

let a=[1, 2, 1, 3, 1, 1, 1, 2];
console.log(solution(6, a)); // 3 ==> {2, 1, 3}, {1, 3, 1, 1}, {3, 1, 1, 1}