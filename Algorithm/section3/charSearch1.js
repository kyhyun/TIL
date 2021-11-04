'use strict';

// 회문 문자열
// reverse 메서드를 이용한 방법
function solution(s){
  let answer="YES";
  // reverse 함수는 배열을 받기 때문에, 해당 문자열을 split 메서드를 이용해 배열로 바꾸는게 우선이다.
  s = s.toUpperCase();
  // split을 사용하면 원본의 손상 없이 새로운 배열이 만들어지기 때문에 이와 같이 비교가 가능하다.
  if(s.split('').reverse().join('') !== s) return "No";
  return answer;
}

// for문을 이용하여 직접 비교하는 방법
function solution2(s){
  let answer="YES";
  const len = s.length;
  s = s.toLowerCase();

  for(let i = 0; i < Math.floor(len/2); i++){
    if(s[i] !== s[len-i-1]) return "No";
  }
  return answer;
}

let str="gooog";
console.log(`reverse method를 이용한 방법 : ${solution(str)}`);
console.log(`for문을 이용한 방법 : ${solution2(str)}`);