const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

solution(+input[0]);

// 입력 받은 숫자에 대해 한수를 판별하는 함수
function f(num){
  const strNum = String(num);
  // 두 자릿수 이하는 비교할 공차가 첫, 두 번째 원소만 해당되므로 true(참)을 반환
  if(strNum.length <= 2) {
    return true;
  }
  // 세 자릿수(3개의 값) 이상 부터 한수 체크
  const diff = +strNum[1] - +strNum[0]; // 현재 공차
  let beforeNum = +strNum[1]; // 이전 후위 피연산자 저장
  for(let i = 2; i < strNum.length; i++){ // 1과 0에 대한 자릿수 비교는 위에서 진행하므로.. i의 값은 2부터 시작한다, 
    if(strNum[i] - beforeNum !== diff) { // i번째 자릿수의 값이 이전 후위 피연산자를 '-'연산해서 그 공차가 현재 공차와 다르다면
      return false; // false(거짓)을 반환
    }
    beforeNum = +strNum[i]; // i번째 자릿수의 값을 이전 후위 피연산자로 할당시켜, 다음 반복에 대한 연산을 준비한다.
  }
  // 비교가 중간에 문제 없이 완료되면 true(참)을 반환
  return true;
}

function solution(N){
  let cnt = 0;
  for(let i = 1; i <= N; i ++){
    if(f(i)){ // 한수 판별 후 참인 값에 대해 cnt의 값을 증감시킨다.
      cnt++;
    }
  }
  console.log(cnt);
}