// 3. 기본문제 풀이 : 연필 개수
function solution(n) {

// 인원수 만큼 나눈 후에 남은 나머지 인원 수에 대한 처리 방법
let answer;
const dozen = 12;

// >> 나머지 연산자(%)를 이용한 방법
if (n % dozen === 0) answer = parseInt(n / dozen);
else answer = parseInt(n % dozen) + 1;

// >> Math.ceil 함수 이용하기
answer = Math.ceil(n / dozen);
return answer;
}

console.log(solution(25)); // 3
console.log(solution(178)); // 15