// 4. 완전탐색(Brute Force) : 졸업선물

function solution(m, product){
  let answer=0; // 선물이 가능한 최대 학생 수
  let n = product.length;
  let max = Number.MIN_SAFE_INTEGER;
  let tmp = [];
  for(let i = 0 ; i < n; i++){
    if(max < product[i][0])max = product[i][0];
  }

  for(let i = 0; i < n; i++){ // 학생 수
    let sum = 0;
    for(let j = 0; j < product[i].length; j++){ // 가격과 배송비
      if(max === product[i][0]) {
        product[i][0] = Math.floor(max/2);
      }
      sum += product[i][j];
    }
    tmp.push(sum);
  }
  tmp.sort((a,b)=> a - b);
  for(let i = 0; i < tmp.length; i++){
    if(m - tmp[i] >= 0) {
      m -= tmp[i];
      answer++;
    }
  }
  return answer;
}

function solution2(m, product){
  let answer = 0;
  let n = product.length;
  // 2차원 배열의 parameter 인자 처리 방법
  product.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
  // 할인된 상품
  for(let i = 0; i < n; i++){
    let money = m - (product[i][0] / 2 + product[i][1]); // money = 예산 - (상품가격/2 + 배송비)
    let cnt = 1;// 구매할 수 있는 상품 수 ( 최소 1개 )
    // 남아있는 상품
    for(let j = 0; j < n; j++){
      if(j!==i && (product[j][0] + product[j][1]) > money) break;
      if(j!==i && (product[j][0] + product[j][1]) <= money){
        money -= (product[j][0] + product[j][1]);
        cnt++;
      }
    }
    answer = Math.max(answer, cnt);
  }
  return answer;
}

let arr=[[6, 6], [2, 2], [4, 3], [4, 5], [10, 3]];
console.log(solution(28, arr));
console.log(solution2(28, arr));