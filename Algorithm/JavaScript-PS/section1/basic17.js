// 17. 기본문제 풀이 : 중복단어 제거하기

// 1. Set을 이용한 방법
function solution(s) {
let answer;
answer = Array.from(new Set(s));
return answer;
}

// 2. indexOf & for을 이용한 방법
function solution2(s) {
let answer = [];
for (const x of s) {
if (answer.indexOf(x) === -1) answer.push(x);
}
return answer;
}

// 3. filter을 이용한 방법
function solution3(s) {
let answer = s.filter((el, i) => {
return s.indexOf(el) === i;
});
return answer;
}

let str = ["good", "time", "good", "time", "student"];
console.log(`1. Set : ${solution(str)}`);
console.log(`2. indexOf & for : ${solution2(str)}`);
console.log(`3. filter : ${solution3(str)}`);