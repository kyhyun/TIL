// 8. 기본문제 풀이 : 일곱 난쟁이
/*
입력 >> 9개의 줄에 걸쳐 난쟁이들의 키가 주어진다. 
주어지는 키는 100을 넘지 않는 자연수, 아홉 난쟁이의 키는 모두 다르다.
*/
function solution(arr) {
  let answer = arr; // arr을 answer 변수에 얕은 복사
  let sum = arr.reduce((acc, v) => acc + v, 0); // reduce 함수를 이용해서 총합을 구한다.
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length + 1; j++) {
      if ((sum - (answer[i] + answer[j])) === 100) {
        answer.splice(j, 1);
        answer.splice(i, 1);
        break;
      }
    }
  }
  return answer;
}

let arr = [20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(solution(arr)); // 20 7 23 19 10 8 13