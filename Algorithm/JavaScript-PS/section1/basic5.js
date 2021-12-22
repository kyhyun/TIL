//5. 기본문제 풀이 : 최솟값 구하기

// Test Case로 배열 안의 7개의 수가 주어지면,
// 그 숫자 중 가장 작은 수를 출력하는 프로그램을 작성
function solution(arr) {
  // 최소값을 담을 변수에 비교할 수 있는 큰 정수 값으로 초기화 해준다.
  let answer;
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) { // 현재 index가 저장된 min보다 작으면 안의 구문을 실행한다.
      min = arr[i]; // min 변수에 현재 index를 할당한다.
    }
  }
  answer = min; // 최종적으로 남은 min의 값을 answer에 할당한다.

  // 이 방식 외에도 내장함수 Math.min 혹은 Math.max를 이용해서 최소, 최댓값 문제를 해결할 수 있다.
  // Math.min(...arr); 
  // 인자 값만 받기 때문에 전체 배열인 arr을 모두 넣을 수 없으므로,
  // 비구조화 할당에 사용되는 전개 연산자, Spread Operator(...배열이름) 을 사용한다.
  // arr[0], arr[1], arr[2], ..., arr[arr.length-1]까지 내용을 펼쳐주는 연산자
  return answer;
}

let arr = [5, 3, 7, 11, 2, 15, 17];
// let arr = [5, 7, 1, 3, 2, 9, 11];

console.log(solution(arr)); // 2
