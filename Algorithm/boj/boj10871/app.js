const fs = require('fs');
const filePath =  process.platform === 'linux' ? '/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const data = input[1].split(' ').map((item) => +item);
input = input[0].split(' ').map((item) => +item);
solution(input[0], input[1]);

function solution(N, X){
  let answer = [];
  for(let i = 0; i < N; i++){
    if(X > data[i]){
      answer.push(+data[i]);
    }
  }
  console.log(answer.join(' '));
}