const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input[0];
input = input.split(' ').map((el) => +el);

solution(input[0], input[1]);

function solution(A, B){
  //write your answer
  console.log(A / B);
}