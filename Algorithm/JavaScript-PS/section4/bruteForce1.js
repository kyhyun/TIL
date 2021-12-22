// 1. 완전탐색(Brute Force) : 자릿수의 합

function solution(arr){
  let answer;
  let max = Number.MIN_SAFE_INTEGER;
  let sum = 0;
  for(const x of arr){
    sum += Math.floor(x / 100);
    sum += Math.floor(x / 10) % 10;
    sum += x % 10;
    /*
    let sum = 0, tmp = x;
    while(tmp) {
      sum+=(tmp % 10);
      tmp = Math.floor(tmp/10);
    }
    */
    if(sum > max) {
      max = sum;
      answer = x;
    } else if(sum === max){
      if(answer < x) answer = x;
    }
    sum = 0;
  }
  return answer;
}

// 내장함수를 이용한 방법
function solution2(arr){
  let answer;
  let max = Number.MIN_SAFE_INTEGER;
  for(const x of arr){
    let sum = x.toString().split('').map(el=>+el);
    sum = sum.reduce((pre, cur)=> pre+cur, 0);
    if(sum > max) {
      max = sum;
      answer = x;
    } else if(sum === max){
      if(answer < x) answer = x;
    }
  }
  return answer;
}

let arr=[128, 460, 603, 40, 521, 137, 123];
console.log(solution(arr));
console.log(solution2(arr));