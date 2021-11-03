// 7. 기본문제 풀이 : 차량 10부제

function solution(day, arr) {
  let answer = 0;
  for (const x of arr) {
    // 어떤 숫자를 10으로 나누면 나머지 값은 일의 자리 숫자가 된다.
    // 그 일의 자리 숫자와 day를 비교한다.
    if (x % 10 === day) answer++;
  }
  // 방법 2) filter 함수를 이용한 JS스러운 방법
  // let answer2 = arr.filter(el => el % 10 === day);
  // return answer2;
  return answer;
}

const arr = [25, 23, 11, 47, 53, 17, 33];
console.log(solution(3, arr)); // 3
