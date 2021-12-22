// 11. 기본문제 풀이 : 대문자 찾기
/*
한 개의 문자열을 입력받아 해당 문자열에 알파벳 대문자가 몇 개 있는지 알아내는 프로그램
을 작성하세요.
*/

// 해당 문자 idx를 ASCII Code로 치환하고 그 코드의 범위로 조건 처리하는 방법
function solution(s) {
  let answer = 0;
  for (const x of s) {
    let code = x.charCodeAt();
    if (65 <= code && code <= 90) answer++;
  }
  return answer;
}
// 해당 문자 idx를 대문자로 바꾸고 기존 idx와 비교하는 조건으로 처리하는 방법
function solution2(s) {
  let answer = 0;
  for (const x of s) {
    if (x === x.toUpperCase()) answer++;
  }
  return answer;
}

// metch 메서드를 사용하여, RegExr로 표현하는 방법
function solution3(s) {
  let answer = 0;
  for (const x of s) {
    if (x.match(/[A-Z]/)) { // match되는 idx가 없는 경우, null을 반환하여 false, 있는 경우 일치하는 전체 문자열 첫 요소로 포함하는 Array를 반환
      answer++;
    }
  }
  return answer;
}


let str = "KoreaTimeGood";
console.log(solution(str)); // ASCII Code 방법 : 3
console.log(solution2(str)); // 3
console.log(solution3(str)); // ?