// 1. 1,2차원 배열 탐색 : 큰 수 출력하기
/*
N(1<=N<=100)개의 정수를 입력받아, 자신의 바로 앞 수보다 큰 수만 출력하는 프로그램을 작성하세요.(첫 번째 수는 무조건 출력한다)
*/
function solution(arr) {
  let answer = [];
  answer.push(arr[0]);
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] > arr[i - 1]) answer.push(arr[i]);
  }
  return answer;
}

// reuduce 함수를 이용하는 방법
function solution2(arr) {
  let answer = [];
  arr.reduce((prev, cur) => {
    if (prev < cur) answer.push(cur);
    return cur;
  }, 0);
  return answer;
}

let arr = [7, 3, 9, 5, 6, 12];
console.log(solution(arr)); // 7 9 6 12
console.log(solution2(arr)); // 7 9 6 12