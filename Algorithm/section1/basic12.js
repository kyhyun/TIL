// 12. 기본문제 풀이 : 대문자로 통일
/*
대문자와 소문자가 같이 존재하는 문자열을 입력받아 대문자로 모두 통일하여 문자열을 출력
하는 프로그램을 작성하세요
*/
// toLowerCase로 변환하여 idx를 비교하는 방법
function solution(s) {
  let answer = "";
  for (const x of s) {
    if (x === x.toLowerCase()) {
      answer += x.toUpperCase();
    } else answer += x;
  }
  return answer;
}

// ASCII Code를 이용한 방법
function solution2(s) {
  let answer = "";
  for (const x of s) {
    let num = x.charCodeAt();
    if (num >= 97 && num <= 122) answer += String.fromCharCode(num - 32); // 유니코드의 값을 문자로 변환하는 메서드
    else answer += x;
  }
  return answer;
}

let str = "ItisTimeToStudy";
console.log(`case method : ${solution(str)}`);
console.log(`charCodeAt method : ${solution2(str)}`);