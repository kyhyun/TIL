// 16. 기본문제 풀이 : 중복 문자 제거(indexOf)
// 방법 1. Set
function solution(s) {
  let answer = '';
  const set = new Set(s);
  const setArr = [...set];
  answer = setArr.join('');
  return answer;
}

// 방법 2. indexOf() & filter()
function solution2(s) {
  let answer = '';
  for (let i = 0; i < s.length; i++) {
    // console.log(s[i], i, s.indexOf(s[i]));
    if (s.indexOf(s[i]) === i) answer += s[i];
  }
  return answer;
}

// 방법 3. forEach(), includes()
function solution3(s) {
  let answer = [];
  const strArr = s.split('').map((el) => el);
  strArr.forEach((e) => {
    if (!answer.includes(e)) answer.push(e);
  });
  return answer.join('');
}

// indexOf로 Count 하기 ( 추가로 복습하기 )
function solution4(s) {
  let answer = 0;
  let pos = s.indexOf('k'); // 0
  while (pos !== -1) {
    answer++;
    pos = s.indexOf('k', pos + 1);
  }
  return answer;
}

// for of 이용
function solution5(s) {
  let answer = '';
  for (const x of s) {
    if (answer.indexOf(x) === -1) answer += x;
  }
  return answer;
}

console.log(`set method : ${solution("ksekkset")}`);
console.log(`indexOf & forEach : ${solution2("ksekkset")}`);
console.log(`forEach & includes : ${solution3("ksekkset")}`);
console.log(`indexOf로 Count : ${solution4("ksekkset")}`);
console.log(`for ~ of : ${solution5("ksekkset")}`);
