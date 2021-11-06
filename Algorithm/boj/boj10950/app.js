const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

// 좀 더 쉬운 코드
// for (let i = 1; i < input[0]; i++){
//   const num = input[i].split(' ');
//   console.log(Number(num[0]) + Number(num[1]));
// }

// 좀 더 어렵고 복잡한 코드
const testCaseArray = [];
for (let i = 1; i <= +input[0]; ++i){
  const tempValue = input[i].split(' ').map((el) => +el);
  testCaseArray.push({A : tempValue[0], B : tempValue[1]});
}
solution(+input[0], testCaseArray);

function solution(T, testCaseArray){
  
  for(let i = 0; i < T; i++){
    const {A, B} = testCaseArray[i];
    console.log(A + B);
  }
}