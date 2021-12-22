// 10. 기본문제 풀이 : 문자 찾기
    /*
    한 개의 문자열을 입력받고, 특정 문자를 입력받아 해당 특정문자가 입력받은 문자열에 몇 개 
    존재하는지 알아내는 프로그램을 작성하세요.
    문자열의 길이는 100을 넘지 않습니다.
    */

    // for loof를 이용하는 방법
    function solution(s, t) {
      let answer = 0;
      for (const x of s) {
        if (x === t) answer++;
      }
      return answer;
    }

    // 내장함수를 이용하는 방법
    function solution2(s, t) {
      let answer = s.split(t);
      return answer;
    }

    let str = "COMPUTERPROGRAMMING";
    console.log(solution(str, 'G'));
    console.log(solution2(str, 'G'));

    // function solution(s, t) {
    //   let answer = s.split(t).length;
    //   return answer - 1;
    // }

    // let str = "COMPUTERPROGRAMMING";
    // console.log(solution(str, 'R'));
