const fs = require('fs');
const filePath = process.platform === 'linux'?'dev/stdin':'./input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

// 1. 체스판 입력받기
function solution(input){


let [size, ...board] = input;
let [row, col] = size.split(' ').map(el=>+el);
board = board.map(el=>{
  return el.trim('\r');
});
const answer = [];
const line = ['BWBWBWBW','WBWBWBWB'];

// 2. 체스판 탐색하기 
//( 8 * 8 크기의 체스판을 잘라서 붙이므로 보드의 크기에서 체스판의 크기만큼을 뺀다.)

  for(let i = 0; i <= row - 8; i++){ // 순회해야할 보드판의 행
    for(let j = 0; j <= col - 8; j++){ // 순회해야할 보드판의 열
      // 시작점이 B(흑색) or W(흰색) 두 경우를 고려하여
      for(let k = 0; k < line.length; k++){ // 시작점에 따라 진행되는 케이스
        let count = 0;// 규칙에 어긋난 갯수를 더할 변수 선언 및 초기화

        // 8 * 8 정사각형을 조회하는 for 문
        for(let x = 0; x < 8; x++){ // 체스판의 행
          for(let y = 0; y < 8; y++){ // 체스판의 열
            const cur = board[i + x][j + y]; // 현재 위치
            if(cur !== line[(x + k) % 2][y]) count++;
          }
        }
        answer.push(count);
      }
    }
  }
  return Math.min(...answer);
}

// 3. 체스판 다시 칠할 정수 값 출력하기
console.log(solution(input));