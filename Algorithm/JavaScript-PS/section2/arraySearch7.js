// 7. 1,2차원 배열 탐색 : 봉우리

function solution(arr) {
  let answer = 0;
  let n = arr.length;
  // 좌표 4 방향 이동에 대한 좌표 값 설정 ( 암기 필수 )
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {

      // 플래그 변수 처리
      let flag = 1;
      // 해당 이차원 배열의 좌표일 때, 방향 탐색 수행
      for (let k = 0; k < 4; k++) {
        let _x = i + dx[k]; // 방향이 이동되는 x 좌표
        let _y = j + dy[k]; // 방향이 이동되는 y 좌표

        // _x와 _y좌표가 배열 범위를 벗어나지 않도록 조건 처리 and 이동된 좌표값과 비교군을 조건 처리
        if (_x >= 0 && _x < n && _y >= 0 && _y < n && arr[_x][_y] >= arr[i][j]) {
          flag = 0; // 해당 조건이 만족되면, 봉우리가 아니므로, 플래그를 0으로 변환
          break;
        }
      }
      if (flag) answer++; // 플래그를 만족시킬때, 즉 k 변수를 한 반복문의 조건이 만족되지 않을때, 봉우리이므로 answer를 증가시킨다.
    }
  }
  return answer;
}

let arr = [
  [5, 3, 7, 2, 3],
  [3, 7, 1, 6, 1],
  [7, 2, 5, 3, 4],
  [4, 3, 6, 4, 1],
  [8, 7, 3, 5, 2]
];
console.log(solution(arr)); // 10