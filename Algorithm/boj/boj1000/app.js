const fs = require('fs');
const filePath = process.platform === 'linux'?'/dev/stdin':'./input.txt';
const input = fs.readFileSync(filePath).toString().split(' ');

answer(Number(input[0]), Number(input[1]));

function answer(a, b) {
  console.log(a + b);
}