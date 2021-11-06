const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

solution(input[0]);

function solution (N){
  let cycle = 0;
  let tmp = 0;
  if(+N < 10) {
    N = '0' + N;
  }
  let origin = N;
  while(true){
    tmp = Number(N[0]) + Number(N[1]);
    if(tmp < 10){
      tmp = '0' + tmp;
    }
    tmp = tmp.toString();
    N = N[1] + tmp[1];
    cycle ++;
    if(N === origin) {
      break;
    }
  }
  console.log(cycle);
}