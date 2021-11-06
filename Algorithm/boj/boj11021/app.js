const fs = require('fs');
const filePath = process.platform === 'linux'?'/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let testCaseArray = [];
for(let i = 1; i <= input[0]; i++){
  const arrayValue = input[i].split(' ').map((el) => +el);
  testCaseArray.push({A : arrayValue[0], B : arrayValue[1]});
}

solution(+input[0], testCaseArray);

function solution(T, testCaseArray){
  for(let i = 0; i < T; i++){
    const A = testCaseArray[i].A;
    const B = testCaseArray[i].B;
    console.log(`Case #${i+1}: ${A + B}`);
  }
}