// 4. 기본문제 풀이 : 1부터 N가이즤 합

// 자연수 N이 입력되면 1부터 N까지의 합을 출력하는 프로그램을 작성하세요.
function solution(n) {
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    answer += i;
  }
  return answer;
}
// 20 이하의 자연수 입력
console.log(solution(6)); // 21
console.log(solution(10)); // 55
