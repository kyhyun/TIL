'use strict';

// 유효한 팰린드롬
function solution(s){
  let answer="YES";
  let n = s.length;
  s = s.toUpperCase();
  console.log(`charCodeAt method : ${s}`);
  for(let i = 0; i < n; i++){
    if(!(s[i].charCodeAt() >= 65 && s[i].charCodeAt() <= 90)) continue;
    if(s[i] !== s[n-i-1]) return "No";
  }
  return answer;
}

function solution2(s) {
  let answer="YES";
  s = s.toLowerCase().replace(/[^a-z]/g, '');
  console.log(`reverse method : ${s}`);
  if(s.split('').reverse().join('') !== s) return "No";
  return answer;
}

let str="found7, time: study; Yduts; emit, 7Dnuof";
console.log(`charCodeAt method : ${solution(str)}`);
console.log(`reverser method : ${solution2(str)}`);