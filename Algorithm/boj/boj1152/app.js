const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

solution(input[0]);

function solution (str){
  let word = str.split(' ');
  let cnt = 0;
  for(let i = 0; i < word.length; i++){
    if(word[i] !== ''){
      cnt++;
    }
  }
  console.log(cnt);
}