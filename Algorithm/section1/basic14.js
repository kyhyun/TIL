// 14. 기본문제 풀이 : 가장 긴 문자열
function solution(s) {
  let answer;
  let max = Number.MIN_SAFE_INTEGER;
  for (const x of s) {
    if (max < x.length) {
      max = x.length;
      answer = x;
    }
  }
  return answer;
}
let str = ["teacher", "time", "student", "beautiful", "good"];
console.log(solution(str));
