const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const data = [];
for (let i = 0; ; i++){
  const tempValue = input[i].split(' ').map((el) => +el);
  data.push({ A: tempValue[0], B: tempValue[1]});
  if(tempValue[0] === 0 && tempValue[1] === 0) {
    break;
  }
}
solution(data);

function solution(data){
  let A = data[0].A;
  let B = data[0].B;
  let idx = 1;
  while (A !== 0 || B !== 0) {
    console.log(A + B);
    A = data[idx].A;
    B = data[idx].B;
    idx++;
  }
}