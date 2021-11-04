// 3. 완전탐색(Brute Force) : 멘토링
/*
선생님은 M번의 수학테스트 등수를 가지고 멘토와 멘티를 정합니다. 
만약 A학생이 멘토이고, B학생이 멘티가 되는 짝이 되었다면, A학생은 M번의 수학테스트에서 
모두 B학생보다 등수가 앞서야 합니다. 
M번의 수학성적이 주어지면 멘토와 멘티가 되는 짝을 만들 수 있는 경우가 총 몇 가지 인지 
출력하는 프로그램을 작성하세요.
*/
'use strict';
function solution(test){
  let answer = 0; // 멘토, 멘티가 될 수 있는 경우의 수
  let tmp=[];
  let m = test.length; // 총 시험 횟수
  let n = test[0].length; // 그 시험에 있는 학생 수

  for(let i = 1; i <= n; i++){ // 1 ~ n번 학생까지 * 2 => 그 시험의 총 경우의 수
    for(let j = 1; j<= n; j++){
      let cnt = 0; // 총 시험 통과 횟수로, 매 테스트가 들어가기 전에 0으로 초기화 되어야한다.
      for(let k = 0; k < m; k++){ // 시험의 총 횟수(k) : 0 ~ 3
        let pi = 0, pj = 0; // 멘토의 등수 값(pi), 멘티의 등수 값(pj)
        for(let s = 0; s < n; s++){ // 그 시험의 등수(s) : 0 ~ 4
          if(test[k][s] === i) pi = s; // 멘토의 등수 값
          if(test[k][s] === j) pj = s; // 멘티의 등수 값
        }
        if(pi < pj) cnt++; // 멘토의 등수 값이 뒤에 있는 멘티의 등수보다 높으면 cnt 증가 (등수는 낮을수록 높음)
      }
      if(cnt === m) {
        tmp.push([i, j]);
        answer++; // 멘토가 되려면 상대방 보다 높은 성적으로 통과한 횟수가 총 시험 횟수와 같아야한다.
      }
    }
  }
  console.log(tmp);
  return answer;
}
// 연습용
function solution2(test){
  let answer = 0;
  let tmp = [];
  let m = test.length;
  let n = test[0].length;
  for(let i = 1; i <= n; i++){
    for(let j = 1; j <= n; j++){
      let cnt = 0;
      for(let k = 0; k < m; k++){
        let pi = 0, pj = 0;
        for(let s = 0; s < n; s++){
          if(test[k][s] === i) pi = s;
          if(test[k][s] === j) pj = s;
        }
        if(pi < pj) cnt++;
      }
      if(cnt === m) {
        tmp.push([i, j]);
        answer++;
      }
    }
  }
  console.log(tmp);
  return answer;
}

let arr=[[3, 4, 1, 2], [4, 3, 2, 1], [3, 1, 4, 2]];
console.log(solution(arr)); // 3, (3, 1), (3, 2), (4, 2)와 같이 3가지 경우의 (멘토, 멘티) 짝을 만들 수 있다.
console.log(solution2(arr));