// 6. 기본문제 풀이 : 홀수
    /*
    7개의 자연수가 주어질 때, 
    이들 중 홀수인 자연수들을 모두 골라 그 합을 구하고, 
    고른 홀수들 중 최소값을 찾는 프로그램을 작성하세요.*/

function solution(arr) {
  let answer = [];
  let sum = 0;
  let min = Number.MAX_SAFE_INTEGER;

  // 1. 홀수 조건을 이용해서, 합계 + 최솟값 구하기(반복문 이용)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 1) {
      sum += arr[i];
      if (arr[i] < min) min = arr[i];
    }
  }

  // 결과 값 배열에 할당 시키기
  answer.push(sum);
  answer.push(min);
  return answer;

  // 2. 내장 함수를 이용한 방법
  // min = Math.min.apply(null, oddNumber);
  // OR min = Math.min(...arr);

  // 3. forEach 방식
  // arr.forEach((num) => {
  //   if(num % 2 === 1) {
  //     sum += num;
  //     if(num < min) min = num;
  //   }
  // });
}

arr = [12, 77, 38, 41, 53, 92, 85];
console.log(solution(arr));
