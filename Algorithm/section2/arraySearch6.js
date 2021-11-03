// 6. 1,2차원 배열 탐색 : 격자판 최대합

//N*N의 격자판이 주어지면 각 행의 합, 각 열의 합, 두 대각선의 합 중 가 장 큰 합을 출력합니다.

function solution(arr) {
  let answer = Number.MIN_SAFE_INTEGER;
  let n = arr.length;
  let sum1 = sum2 = 0;

  for (let i = 0; i < n; i++) {
    sum1 = sum2 = 0; // 더하고 난 후의 sum1, sum2를 초기화해서 새로운 인덱스의 열과 행의 합을 받도록 한다.
    for (let j = 0; j < n; j++) {
      sum1 += arr[i][j]; // 열의 합
      sum2 += arr[j][i]; // 행의 합
    }
    answer = Math.max(answer, sum1, sum2); // 가장 큰 값을 answer에 저장한다.
  }

  sum1 = sum2 = 0;
  for (let i = 0; i < n; i++) {
    sum1 += arr[i][i]; // 정 대각선 길이의 합
    sum2 += arr[i][n - 1 - i]; // 역 대각선 길이의 합
  }
  answer = Math.max(answer, sum1, sum2); // 가장 큰 값을 answer에 저장한다.

  return answer;
}

let arr = [
  [10, 13, 10, 12, 15],
  [12, 39, 30, 23, 11],
  [11, 25, 50, 53, 15],
  [19, 27, 29, 37, 27],
  [19, 13, 30, 13, 19]
];
console.log(solution(arr));