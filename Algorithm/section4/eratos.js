// 소수 찾기 - 에라토스테네스의 체

'use strict';

function solution(n){
  let count = 0;
  let ch = Array.from({lengh:n+1}, () => 0);
  for(let i = 2; i <= n; i++){
    if(ch[i]===0){
      count++;
      for(let j = i; j <= n; j+=1){
        ch[j]=1;
      }
    }
  }
  return count;
}
console.log(solution(20));