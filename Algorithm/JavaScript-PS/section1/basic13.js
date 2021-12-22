// 13. 기본문제 풀이 : 대소문자 변환
/*
대문자와 소문자가 같이 존재하는 문자열을 입력받아 대문자는 소문자로 소문자는 대문자로 
변환하여 출력하는 프로그램을 작성하세요.
*/
// LowerCase와 UpperCase를 이용한 방법
function solution(s) {
  let answer = "";
  for (const x of s) {
    if (x === x.toUpperCase()) answer += x.toLowerCase();
    else if (x === x.toLowerCase()) answer += x.toUpperCase();
  }
  return answer;
}

// ASCII Code를 이용한 방법
function solution2(s) {
  let answer = "";
  for (const x of s) {
    let num = x.charCodeAt();
    if (num >= 65 && num <= 90) answer += String.fromCharCode(num + 32);
    else if (num >= 97 && num <= 122) answer += String.fromCharCode(num - 32);
  }
  return answer;
}

console.log(`case_method : ${solution("StuDY")}`); // sTUdy
console.log(`ascii_code_method : ${solution2("StuDY")}`); // sTUdy