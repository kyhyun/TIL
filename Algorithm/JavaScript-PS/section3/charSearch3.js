'use strict';
// 숫자만 추출

// charcodeAt을 이용한 방법
function solution(str){
  let answer="";
  let n = str.length;
  for(let i = 0; i < n; i++){
    if(str[i].charCodeAt() >= 48 && str[i].charCodeAt() <= 57) answer+=str[i];
  }
  return parseInt(answer);
}

// replace와 정규식을 이용하는 방법
function solution2(str){
  let answer='';
  str = str.replace(/[^0-9]/g,'');
  answer = +str;
  return answer;
}

// isNaN 메서드를 이용하는 방법
function solution3(str){
  let answer=0;
  for(const x of str){
    //answer가 x를 만났을 때, 그 값이 숫자인 경우 answer에 배수를 올린 x의 값을 할당한다.
    if(!isNaN(x)) answer=answer*10+Number(x);
    console.log(x, answer);
  }
  return answer;
}

let str="g0en2T0s8eSoft";
console.log(`charCodeAt(): ${solution(str)}`);
console.log(`replace() Method: ${solution2(str)}`);
console.log(`isNaN() Mathod: ${solution3(str)}`);