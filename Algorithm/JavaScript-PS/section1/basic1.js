// 1. 기본문제 풀이 : 세 수 중 최솟값

// 세 숫자의 인자 a, b, c를 입력받는다.
function solution(a, b, c) {
  let answer;
  // 1. a와 b의 비교
  if (a < b) answer = a; // a가 작으면 answer에 a 저장
  else answer = b; // 그렇지 않으면 answer에 b 저장

  // 2. answer에 a와 b 중 가장 작은 값이 if문을 통해서 저장되어있는 상태에서
  // c와 현재 최솟값인 answer 간의 비교를 한다.
  if (c < answer) answer = c;
  return answer;
}

console.log(solution(2, 5, 1)); // 1