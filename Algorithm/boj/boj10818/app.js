const fs = require('fs');
const filePath = process.platform === 'linux'?'/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const arrayLength = +input[0];
const content = input[1].split(' ').map((el) => +el);

solution(arrayLength, content);

function solution(n, arr){
  let min = 1000000;
  let max = -1000000;
  
  for(let i = 0; i < n; i++){
    if(min > arr[i]){
      min = arr[i];
    }
    if(max < arr[i]){
      max = arr[i];
    }
  }
  console.log(`${min} ${max}`);
}