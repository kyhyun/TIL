const fs = require('fs');
const filePath = process.platform === 'linux'?'/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

solution(+input[0], input[1]);

function solution (inputValue, number){
  let sum = 0;
  for(let i = 0; i < inputValue; i++){
    sum += +number[i];
  }
  console.log(sum);
}