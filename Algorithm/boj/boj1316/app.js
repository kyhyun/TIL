const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let testCase = +input[0];

solution(testCase, input.slice(1));

function solution (N, arr) {
  let answer = 0;
  for(let i = 0; i < N; i++){
    let nowS = arr[i];
    
    let obj = {};
    
    let nowContC = nowS[0];
    obj[nowContC] = true;
    
    let isGroupWord = true;
    for(let j = 1; j < nowS.length; j++){
      if(nowContC !== nowS[j]) {
        if(obj[nowS[j]]) {
          isGroupWord = false;
        } else {
          nowContC = nowS[j];
          obj[nowS[j]] = true;
        }
      }
    }
    if(isGroupWord) {
      answer++;
    }
  }
  console.log(answer);
}