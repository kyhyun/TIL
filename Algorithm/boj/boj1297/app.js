const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [inputD, inputW, inputH] = input[0].split(' ').map(el => +el);

solution(inputD, inputW, inputH);

// 피타고라스의 정리를 이용해서 대각선 비율을 구하고 그 비율로 너비, 높이를 곱하면 tv의 넓이가 나온다.
function solution(d, w, h){
  let dRatio = d / Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
  console.log(`${parseInt(dRatio * w)} ${parseInt(dRatio * h)}`);
}
