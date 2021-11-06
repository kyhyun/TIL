const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

solution(input[0]);
function solution(S){
  let check = Array(26).fill(-1);
  for(let i = 0; i < S.length; i++){
    let newChar = S[i];
    let idxCheck = newChar.charCodeAt() - 97;
    if(check[idxCheck] === -1){
      check[idxCheck] = i;
    }
  }
  for(const n of check){
    process.stdout.write(`${n} `);
  }

}