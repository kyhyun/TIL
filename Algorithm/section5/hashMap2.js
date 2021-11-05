// 7. Efficiency(Hash Map) : 아나그램(Anagram)

function solution(str1, str2){
  // 접근법 : str1을 map 객체로 변환하고 str2를 반복문을 이용해 비교 검사
  let answer="YES"; 
  let sh1 = new Map();
  for(const x of str1){
    if(sh1.has(x)) sh1.set(x,sh1.get(x)+1);
    else sh1.set(x,1);
  }
  for(const x of str2){
    // key가 없거나, value값이 0이면 NO 반환
    if(!sh1.has(x) || sh1.get(x) === 0) return "NO";
    sh1.set(x, sh1.get(x)-1);
  }

  return answer;
}

let a="AbaAeCe";
let b="baeeACA";
let c="abaCC";
let d="Caaab";
console.log(solution(a, b)); // YES
console.log(solution(c, d)); // NO
