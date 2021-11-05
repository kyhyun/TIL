// 6. Efficiency(Hash Map) : 학급 회장
function solution(s){  
  let answer;
  let hs = new Map();
  let max = Number.MIN_SAFE_INTEGER;
  for(let i = 0; i < s.length; i++){
    if(!hs.has(s[i])) { // key 값이 없다면 set 지정
      hs.set(s[i], 1);
    } else if (hs.has(s[i])) { // key 값이 있다면 set 증감
      hs.set(s[i],hs.get(s[i])+1);
    }
  }
  
  for(const [k, v] of hs){
    if(v > max) {
      max = v;
      answer = k;
    }
  }
  console.log(max);
  
  return answer;
}

let str="BACBACCACCBDEDE";
console.log(solution(str));