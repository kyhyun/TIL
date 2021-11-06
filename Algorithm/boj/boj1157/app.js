const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

solution(input[0].toLowerCase());

function solution (str) {
  // a-z까지 빈 배열 만들고, str 자리에 따라 증감 처리
  const ans = new Array(26).fill(0);
  
  for(let i = 0;i < str.length; i++){
    ans[str.charCodeAt(i) - 97]++;

  }

  const max = Math.max(...ans);
  const index = ans.indexOf(max);
  let isEqual = false;

  for(let j = 0; j < ans.length; j++){
    if(ans[j] === max && index !== j){
      isEqual = true;
      break;
    }
  }
  console.log(isEqual ? '?' : String.fromCharCode(index + 65));
}
/*
function solution (str) {
  let obj = {};
  // 1. 각 문자가 몇 번 돌았는지 체크하는 구문
  for(let i = 0; i < str.length; i++){
    let nowChar = str[i].toUpperCase(); // str의 각 자리를 대문자로 변환하고 nowChar에 담는다.
    if(obj[nowChar]){ // obj[] 안에 해당 대문자가 존재한다면, 해당 키 값을 1 증가시킨다.
      obj[nowChar]++;
    } else {
      obj[nowChar] = 1;// 등장한 적이 없다면, 해당 키 값을 1로 셋팅 시킨다.
    }
  }
  // 2. 중복, 최대 값, 최대 값을 저장할 문자에 대한 처리 구문
  let maxValue = -1;
  let maxChar = '';
  let isDuplicated = false;

  for(const el in obj) {
    if(obj[el] > maxValue){
      maxValue = obj[el];
      maxChar = el;
      isDuplicated = false;
    } else if(obj[el] === maxValue) {
      isDuplicated = true;
    }
  }

  if(isDuplicated){
    console.log('?');
  } else {
    console.log(maxChar);
  }
  
}
*/