//5. 1,2차원 배열 탐색 : 등수 구하기

//N(1<=N<=100)명의 학생의 국어점수가 입력되면 각 학생의 등수를 입력된 순서대로 출력하는 프로그램을 작성하세요.

function solution(arr) { 
  let n=arr.length; let
  answer=new Array(5).fill(1); // let answer=Array.from({length: n}, ()=> 1);
  for (let i = 0; i < n; i++) { 
    for (let j=0; j < n; j++) { 
      if (arr[j]> arr[i]) answer[i]++;
    }
  }
    return answer;
  }

    let arr = [87, 89, 92, 100, 76];
    let arr2 = [92, 92, 92, 100, 76];
    console.log(solution(arr)); // 4 3 2 1 5
    console.log(solution(arr2)); // 2 2 2 1 5