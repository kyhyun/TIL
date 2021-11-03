// 9. 기본문제 풀이 : A를 #으로
/*
대문자로 이루어진 영어단어가 입력되면 단어에 포함된 ‘A'를 모두 ’#‘으로 바꾸어 출력하는 
프로그램을 작성하세요.
*/

function solution(s) {
  let answer = "";

  for (const x of s) {
    if (x === 'A') {
      answer += '#';
    } else {
      answer += x;
    }
  }
  return answer;
}

let str = "BANANA";
console.log(solution(str));

/* 또 다른 풀이 방법 ( replace를 이용하는 방법 with RegExr )
    function solution(s) {
  let answer = s; 
  // 문자열은 배열과 달리 참조 주소가 할당되는게 아니라 값 자체를 할당하기 때문에 서로 다른 두 개의 값이 존재하는 상태다.
  // answer = s.replaceAll(/A/, '#'); 혹은 answer = s.replace(/A/g, '#');
  return answer;
}

let str = "BANANA";
console.log(solution(str));
*/
