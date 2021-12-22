// 2. 완전탐색(Brute Force) : 뒤집은 소수

// 소수인지 판별하는 함수 
//(1과 자신의 숫자 전 까지 다른 수로 약분되면, 소수 아님)
function isPrime(num){
  if(num === 1) return false;
  for(let i = 2; i <= parseInt(Math.sqrt(num/2)); i++){
    if(num % i === 0) return false;
  }
  return true;
}

// 1) 숫자만을 이용한 방법
function solution(arr){
  let answer=[];
  for(let x of arr){
    let num = 0;
    // x의 숫자를 반전시키는 구문
    while(x){ // 32
      let tmp = x % 10; // 32 % 10 = 2, 3 % 10 = 3
      num = num * 10 + tmp; // 0 * 10 + 2 = 2, 2 * 10 + 3
      x = Math.floor(x / 10); // 32 / 10 = 3, 3 / 10 = 0
    }

    //뒤집은 숫자가 소수인지 검사
    if(isPrime(num)) answer.push(num); // 23 2 73 2 3

  }
  return answer;
}
// 2) 함수를 이용하는 방법
function solution2(arr){
  let answer=[];
  for(let x of arr){
    let res = Number(x.toString().split('').reverse().join(''));
    if(isPrime(res)) answer.push(res);
  }
  return answer;
}

let arr=[32, 55, 62, 20, 250, 370, 200, 30, 100];
console.log(solution(arr));
console.log(solution2(arr));