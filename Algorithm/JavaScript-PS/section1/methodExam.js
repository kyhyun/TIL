// 고차함수 문법 익히기(forEach, map, filter, reduce)

// 1. forEach
/*
Array<number>.forEach(callbackfn: (value: number, index: number, array: number[]) => void, thisArg?: any): void
*/
let a = [10, 11, 12, 13, 14, 15];
a.forEach(function (v, i) {
  console.log(v, i, this); // first loof : 0, 10 (2) [1, 2]
}, [1, 2]);

// 2. map : 기존의 배열로 각 요소를 이용해서 새로운 배열을 만드는 함수
// Array<number>.map<number>(callbackfn: (value: number, index: number, array: number[]) => number, thisArg?: any): number[]

let answer = a.map(function (v, i) {
  return v * v;
}, [1, 2]);
console.log(answer); // [100, 121, 144, 169, 196, 225]

let answer2 = a.map((v, i) => {
  if (v % 2 === 0) return v;
}, [1, 2]);
// map은 원본 배열의 길이와 똑같은 길이를 반환하기 때문에 
// 원래 배열의 길이인 6만큼 push를 수행하기 때문에, push가 진행되지 않는 루프에서는 undefined가 들어간다.
console.log(answer2); // [10, undefined, 12, undefined, 14, undefined]

// 3. filter : 콜백함수에 지정된 조건을 충족시키는 배열의 요소를 반환한다. 이때, 원본 배열의 길이를 따르지 않는다.
// 즉, 조건부에 따라서 해당 요소를 조작하기 위해서는 map보다 filter가 보다 적합한 메서드라고 볼 수 있다.
// Array<number>.fill(value: number, start?: number, end?: number): number[]
let answer3 = a.filter(function (v, i) {
  return v % 2 === 0; // true인 요소만 return하기 때문에, 조건에 대한 것을 if문이 아니라 return문에 제시해주어야한다.
}, [1, 2]);
console.log(answer3); // [10, 12, 14]

// 4. reduce : 배열의 모든 요소에 대해 지정된 콜백함수를 호출, 콜백함수의 반환 값은 누적된 결과로 다음 콜백함수 호출시 인수로 제공된다.
// Array<number>.reduce<number[]>(callbackfn: (previousValue: number[], currentValue: number, currentIndex: number, array: number[]) => number[], initialValue: number[]): number[] (+2 overloads), 대부분 총합을 구하는 용도로 많이 사용함
/*
function reduce(predicate, val){
  let result = val;
  for(let i = 0; i < a.length; i++){
    result = predicate(result, a[i]);
  }
  return result;
}
*/
let answer4 = a.reduce(function (acc, v) {
  return acc + v;
}, 0);
console.log(answer4); // 75