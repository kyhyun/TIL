// 15. 가운데 문자 출력
/*
소문자로 된 단어(문자열)가 입력되면 그 단어의 
가운데 문자를 출력하는 프로그램을 작성하세요. 
단 단어의 길이가 짝수일 경우 가운데 2개의 문자를 출력합니다.
*/
// substring(startIndex, preEndIndex)
function solution(s) {
  let answer = '';
  let mid = Math.floor(s.length / 2);
  if (s.length % 2 === 0) {
    // answer += s[mid - 1];
    // answer += s[mid];
    answer = s.substring(mid - 1, mid + 1);
  } else {
    answer = s.substring(mid, mid + 1);
  }
  return answer;
}

// substr(strartIndex, extractIndexCount)
function solution2(s) {
  let answer = '';
  let mid = Math.floor(s.length / 2);
  if (s.length % 2 === 0) answer = s.substr(mid - 1, 2);
  else answer = s.substr(mid, 1);
}
// substring을 이용한 방법
console.log(`substring : ${solution("study")}`); // u
console.log(`substring : ${solution("good")}`); // oo
console.log(`substring : ${solution("length")}`); // ng

// substr을 이용한 방법
console.log(`substr : ${solution("study")}`); // u
console.log(`substr : ${solution("good")}`); // oo
console.log(`substr : ${solution("length")}`); // ng