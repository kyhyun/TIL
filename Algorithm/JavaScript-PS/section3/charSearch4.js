'use strict';

// 가장 짧은 문자 거리
function solution(s, t){
  let answer=[];
  let p=1000; // 시작 값의 종단점을 큰 숫자로 넣기 위해 처리해주는 변수
  const n = s.length;

  // 왼쪽에 있는 t('e')로 부터의 거리
  for(let i = 0; i < n; i++){
    if(s[i]===t) answer.push(p=0);
    else answer.push(++p);
  }

  // 오른쪽에 있는 t('e')로 부터의 거리
  for(let i = n-1; i >= 0; i--){
    if(s[i]===t) p=0;
    else if(answer[i] > p) answer[i] = ++p;
    // else answer[i] = Math.min(answer[i], ++p);
  }
  return answer;
}

let str="teachermode";
console.log(solution(str, 'e')); // 1 0 1 2 1 0 1 2 2 1 0