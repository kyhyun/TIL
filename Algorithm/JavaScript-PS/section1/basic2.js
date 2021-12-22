// 2. 기본문제 풀이: 삼각형 판별하기

// 삼각형의 가장 긴 길이가, 두 선의 길이를 더한 값보다 커야 삼각형이 된다.
function solution(a, b, c) {
let answer = "YES";
let max;
const sum = a + b + c;
// 1. 가장 긴 선의 길이를 구한다.
if (a > b) max = a;
else max = b;
if (c > max) max = c;

// 2. 세 길이를 모두 더 한 총합과 가장 긴 길이의 값을 빼서
// 나머지 두 선의 길이를 더한 값을 구하고 대소 비교를 한다.
return ((sum - max) >= max) ? answer : 'NO';
}

console.log(solution(5, 5, 5));