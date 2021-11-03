// 3. 1,2차원 배열 탐색 : 가위 바위 보
    'use strict';
    /*
    A, B 두 사람이 가위바위보 게임을 합니다. 총 N번의 게임을 하여 A가 이기면 A를 출력하고, 
    B가 이기면 B를 출력합니다. 비길 경우에는 D를 출력합니다. 
    가위, 바위, 보의 정보는 1:가위, 2:바위, 3:보로 정하겠습니다.
    두 사람의 각 회의 가위, 바위, 보 정보가 주어지면 각 회를 누가 이겼는지 출력하는 프로그램
    작성하세요.
    */

// 1. 내가 푼 방법
function solution(a, b) {
  let answer = "";
  for (let i = 0; i < 5; i++) {
    //무승부인 경우
    if (a[i] === b[i]) answer += 'D ';
    // A가 가위의 경우
    if (a[i] === 1) {
      if (b[i] === 3) answer += 'A ';
      if (b[i] === 2) answer += 'B ';
    }
    // A가 바위인 경우
    if (a[i] === 2) {
      if (b[i] === 1) answer += 'A ';
      if (b[i] === 3) answer += 'B ';
    }
    // A가 보인 경우
    if (a[i] === 3) {
      if (b[i] === 2) answer += 'A ';
      if (b[i] === 1) answer += 'B ';
    }
  }
  return answer;
}

// 2. 강의에서 설명해준 방법
function solution2(a, b) {
  let answer = '';
  for (let i = 0; i < 5; i++) {
    // 무승부인 경우
    if (a[i] === b[i]) answer += 'D ';
    // A가 이기는 경우
    else if (a[i] === 1 && b[i] === 3) answer += 'A ';
    else if (a[i] === 2 && b[i] === 1) answer += 'A ';
    else if (a[i] === 3 && b[i] === 2) answer += 'A ';
    // B가 이기는 경우
    else answer += 'B ';
  }
  return answer;
}

let a = [2, 3, 3, 1, 3];
let b = [1, 1, 2, 2, 3];
console.log(solution(a, b)); // A B A B D

console.log(solution2(a, b)); // A B A B D
